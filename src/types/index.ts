export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
  active: boolean
}

export interface Booking {
  id: string
  service: Service
  serviceId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  timeSlot: string
  status: BookingStatus
  notes?: string
  createdAt: string
}

export interface BookingFormData {
  serviceId: string
  serviceName?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  timeSlot: string
  notes?: string
}
