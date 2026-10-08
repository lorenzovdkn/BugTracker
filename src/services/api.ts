import type { TicketDto } from "../types/api.types";

export class Ticket {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'resolved';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;

    constructor({id, title, description, status, priority, createdAt}: TicketDto) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
    }
    
    static fromJson(json: any): TicketDto {
        return new Ticket(json);
    }

    static async getTickets(): Promise<TicketDto[]> {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets`);

        if (!res.ok) {
            throw new Error(`Failed to fetch tickets: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.member.map((ticket: any) => Ticket.fromJson(ticket));
    }

    static async getTicket(id: string): Promise<TicketDto> {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets/${id}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch ticket: ${res.status} ${res.statusText}`);
        }

        return Ticket.fromJson(await res.json());
    }

    static async deleteTicket(id: string): Promise<void> {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets/${id}`, {
            method: 'DELETE',
        });

        if (res.status !== 204) {
            throw new Error(`Failed to delete ticket: ${res.status} ${res.statusText}`);
        }
    }
}