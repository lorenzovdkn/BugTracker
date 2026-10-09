export interface TicketDto {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}

export type TicketFormData = Omit<TicketDto, 'id' | 'createdAt'>

export type TicketFormErrors = Partial<Record<keyof TicketFormData, string>>