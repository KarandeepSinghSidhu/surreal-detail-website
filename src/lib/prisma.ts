import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any | undefined
}

const DATA_FILE = path.join(process.cwd(), '.data', 'local-dev.json')

function readLocalStore() {
  try {
    if (!existsSync(DATA_FILE)) {
      mkdirSync(path.dirname(DATA_FILE), { recursive: true })
      writeFileSync(DATA_FILE, JSON.stringify({ services: [], bookings: [], subscribers: [] }, null, 2))
    }

    return JSON.parse(readFileSync(DATA_FILE, 'utf8')) as {
      services: Array<Record<string, unknown>>
      bookings: Array<Record<string, unknown>>
      subscribers: Array<Record<string, unknown>>
    }
  } catch (error) {
    console.error('Failed to read local Prisma fallback store:', error)
    return { services: [], bookings: [], subscribers: [] }
  }
}

function writeLocalStore(store: { services: Array<Record<string, unknown>>; bookings: Array<Record<string, unknown>>; subscribers: Array<Record<string, unknown>> }) {
  mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(store, null, 2))
}

function normalizeValue(value: unknown) {
  if (value instanceof Date) return value.toISOString()
  return value
}

function matchesWhere(item: Record<string, unknown>, where?: Record<string, unknown>) {
  if (!where) return true

  return Object.entries(where).every(([field, condition]) => {
    if (condition && typeof condition === 'object' && !Array.isArray(condition) && 'not' in condition) {
      return item[field] !== (condition as { not: unknown }).not
    }

    return item[field] === condition
  })
}

function sortItems(items: Array<Record<string, unknown>>, orderBy?: Record<string, string>) {
  if (!orderBy) return items

  const entries = Object.entries(orderBy)
  if (!entries.length) return items

  const [field, direction] = entries[0]
  return [...items].sort((a, b) => {
    const left = a[field]
    const right = b[field]
    if (left === right) return 0
    const result = left > right ? 1 : -1
    return direction === 'desc' ? -result : result
  })
}

function withRelations(modelName: string, item: Record<string, unknown>, include?: Record<string, boolean>) {
  if (modelName !== 'booking' || !include?.service) return item

  const store = readLocalStore()
  const service = store.services.find((entry) => entry.id === item.serviceId)
  return service ? { ...item, service } : item
}

function createLocalModel(modelName: string) {
  const storeKey = modelName === 'service' ? 'services' : modelName === 'booking' ? 'bookings' : modelName === 'subscriber' ? 'subscribers' : modelName

  return {
    async findMany(args?: Record<string, unknown>) {
      const store = readLocalStore()
      const items = (store[storeKey as keyof typeof store] as Array<Record<string, unknown>> | undefined) || []
      const filtered = items.filter((item) => matchesWhere(item, args?.where as Record<string, unknown> | undefined))
      const ordered = sortItems(filtered, args?.orderBy as Record<string, string> | undefined)
      return ordered.map((item) => withRelations(modelName, item, args?.include as Record<string, boolean> | undefined))
    },
    async findFirst(args?: Record<string, unknown>) {
      const items = await this.findMany(args)
      return items[0] || null
    },
    async findUnique(args?: Record<string, unknown>) {
      const store = readLocalStore()
      const items = (store[storeKey as keyof typeof store] as Array<Record<string, unknown>> | undefined) || []
      const item = items.find((entry) => entry.id === args?.where?.id)
      return item ? withRelations(modelName, item, args?.include as Record<string, boolean> | undefined) : null
    },
    async create(args?: Record<string, unknown>) {
      const store = readLocalStore()
      const items = (store[storeKey as keyof typeof store] as Array<Record<string, unknown>> | undefined) || []
      const payload = (args?.data as Record<string, unknown>) || {}
      const created = {
        id: String(payload.id || randomUUID()),
        ...Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, normalizeValue(value)])),
      }
      items.push(created)
      store[storeKey as keyof typeof store] = items as never
      writeLocalStore(store)
      return withRelations(modelName, created, args?.include as Record<string, boolean> | undefined)
    },
    async update(args?: Record<string, unknown>) {
      const store = readLocalStore()
      const items = (store[storeKey as keyof typeof store] as Array<Record<string, unknown>> | undefined) || []
      const where = args?.where as Record<string, unknown> | undefined
      const data = (args?.data as Record<string, unknown>) || {}
      const index = items.findIndex((entry) => entry.id === where?.id)
      if (index === -1) return null
      const updated = {
        ...items[index],
        ...Object.fromEntries(Object.entries(data).map(([key, value]) => [key, normalizeValue(value)])),
      }
      items[index] = updated
      store[storeKey as keyof typeof store] = items as never
      writeLocalStore(store)
      return withRelations(modelName, updated, args?.include as Record<string, boolean> | undefined)
    },
    async upsert(args?: Record<string, unknown>) {
      const store = readLocalStore()
      const items = (store[storeKey as keyof typeof store] as Array<Record<string, unknown>> | undefined) || []
      const where = (args?.where as Record<string, unknown>) || {}
      const existing = items.find((entry) => entry.id === where.id)
      if (existing) {
        const updated = {
          ...existing,
          ...Object.fromEntries(Object.entries(args?.update as Record<string, unknown> || {}).map(([key, value]) => [key, normalizeValue(value)])),
        }
        const index = items.findIndex((entry) => entry.id === where.id)
        items[index] = updated
        store[storeKey as keyof typeof store] = items as never
        writeLocalStore(store)
        return withRelations(modelName, updated, args?.include as Record<string, boolean> | undefined)
      }

      const created = {
        id: String(where.id || randomUUID()),
        ...Object.fromEntries(Object.entries(args?.create as Record<string, unknown> || {}).map(([key, value]) => [key, normalizeValue(value)])),
      }
      items.push(created)
      store[storeKey as keyof typeof store] = items as never
      writeLocalStore(store)
      return withRelations(modelName, created, args?.include as Record<string, boolean> | undefined)
    },
  }
}

function getPrismaClient() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  if (!process.env.DATABASE_URL || (process.env.DATABASE_URL.includes('localhost:5432') && process.env.DATABASE_URL.includes('user:password'))) {
    return null
  }

  try {
    const client = new PrismaClient({ log: ['query'] })
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client
    return client
  } catch (error) {
    console.error('Prisma client initialization failed:', error)
    return null
  }
}

const prismaClient = getPrismaClient()

function createModelStub() {
  return new Proxy(
    {},
    {
      get(_target, prop) {
        const modelName = String(prop)
        if (modelName === '$connect' || modelName === '$disconnect' || modelName === '$transaction') {
          return async () => undefined
        }
        return createLocalModel(modelName)
      },
    }
  )
}

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getPrismaClient()
      if (!client) {
        if (prop === '$connect' || prop === '$disconnect' || prop === '$transaction') {
          return async () => undefined
        }
        return createModelStub()[prop as keyof ReturnType<typeof createModelStub>]
      }

      const value = client[prop as keyof typeof client]
      if (typeof value === 'function') {
        return value.bind(client)
      }
      return value
    },
  }
) as any

if (prismaClient && process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient
