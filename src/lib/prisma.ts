// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any | undefined
}

function getPrismaClient() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  if (!process.env.DATABASE_URL) {
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

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getPrismaClient()
      if (!client) {
        return new Proxy(
          () => Promise.reject(new Error('Database is not configured.')),
          {
            apply() {
              return Promise.reject(new Error('Database is not configured.'))
            },
          }
        )
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
