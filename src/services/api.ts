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
}