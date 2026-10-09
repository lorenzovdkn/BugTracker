import type { TicketDto, TicketFilters, TicketFormData, TicketFormErrors } from "../types/api.types";

export class ApiError extends Error {
    violations: TicketFormErrors;

    constructor(message: string, violations: TicketFormErrors = {}) {
        super(message);
        this.violations = violations;
    }

    static async fromResponse(res: Response): Promise<ApiError> {
        const body = await res.json().catch(() => null);
        const violations: TicketFormErrors = {};

        for (const violation of body?.violations ?? []) {
            violations[violation.propertyPath as keyof TicketFormData] = violation.message;
        }

        if (res.status === 422) {
            return new ApiError('Le ticket contient des erreurs, corrige les champs indiqués.', violations);
        }

        return new ApiError(`Le serveur a refusé la demande (erreur ${res.status}).`, violations);
    }
}

// Nombre de tickets renvoyés par page par l'API
const ITEMS_PER_PAGE = 30;

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

    static async getTickets(page: number, filters: TicketFilters = {}): Promise<{ tickets: TicketDto[]; totalPages: number }> {
        const params = new URLSearchParams({ page: String(page) });
        // Un filtre vide ne doit pas être envoyé : l'API chercherait une valeur vide et ne renverrait rien
        if (filters.title) params.set('title', filters.title);
        if (filters.status) params.set('status', filters.status);
        if (filters.priority) params.set('priority', filters.priority);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets?${params}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch tickets: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return {
            tickets: data.member.map((ticket: any) => Ticket.fromJson(ticket)),
            totalPages: Math.ceil(data.totalItems / ITEMS_PER_PAGE),
        };
    }

    static async getTicket(id: string): Promise<TicketDto> {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets/${id}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch ticket: ${res.status} ${res.statusText}`);
        }

        return Ticket.fromJson(await res.json());
    }

    static async createTicket(data: TicketFormData): Promise<TicketDto> {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/ld+json' },
            body: JSON.stringify(data),
        });

        if (res.status !== 201) {
            throw await ApiError.fromResponse(res);
        }

        return Ticket.fromJson(await res.json());
    }

    static async updateTicket(id: string, data: TicketFormData): Promise<TicketDto> {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/merge-patch+json' },
            body: JSON.stringify({ status: data.status, priority: data.priority }),
        });

        if (!res.ok) {
            throw await ApiError.fromResponse(res);
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