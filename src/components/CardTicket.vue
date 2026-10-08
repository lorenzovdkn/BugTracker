<script setup lang="ts">
import type { TicketDto } from '../types/api.types.ts';

defineProps<{ ticket: TicketDto }>();

const statuses = {
    open: { label: 'Ouvert', color: 'text-bg-danger' },
    in_progress: { label: 'En cours', color: 'text-bg-warning' },
    resolved: { label: 'Résolu', color: 'text-bg-success' },
};

const priorities = {
    low: { label: 'Basse', color: 'text-secondary' },
    medium: { label: 'Moyenne', color: 'text-warning' },
    high: { label: 'Haute', color: 'text-danger' },
};
</script>

<template>
    <div class="card h-100">
        <div class="card-header d-flex align-items-center gap-2">
            <span class="badge text-bg-primary">{{ ticket.id }}</span>
            <RouterLink
                class="stretched-link text-reset text-decoration-none fw-semibold flex-grow-1"
                :to="{ name: 'ticket-details', params: { id: ticket.id } }"
            >
                {{ ticket.title }}
            </RouterLink>
            <span class="badge" :class="statuses[ticket.status].color">
                {{ statuses[ticket.status].label }}
            </span>
        </div>

        <div class="card-body">
            <p class="card-text description">{{ ticket.description }}</p>
        </div>

        <div class="card-footer d-flex justify-content-between">
            <span class="text-body-secondary">Priorité</span>
            <span :class="priorities[ticket.priority].color">
                {{ priorities[ticket.priority].label }}
            </span>
        </div>
    </div>
</template>

<style scoped>
/* Zoom léger au survol */
.card {
    transition: transform 0.15s;
}

.card:hover {
    transform: scale(1.03);
}

/* Coupe la description après 3 lignes */
.description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
}
</style>
