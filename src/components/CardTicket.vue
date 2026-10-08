<script setup lang="ts">
import type { TicketDto } from '../types/api.types.ts';
import { statuses, priorities } from '../utils/ticketLabels.ts';

defineProps<{ ticket: TicketDto }>();
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
.card {
    transition: transform 0.15s;
}

.card:hover {
    transform: scale(1.03);
}

.description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
}
</style>
