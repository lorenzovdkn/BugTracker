<script setup lang="ts">
import type { TicketDto } from '../types/api.types.ts';
import { statuses, priorities } from '../utils/ticketLabels.ts';

defineProps<{ tickets: TicketDto[] }>();
</script>

<template>
  <table class="table table-striped align-middle">
    <thead>
      <tr>
        <th>ID</th>
        <th>Titre</th>
        <th>Statut</th>
        <th>Priorité</th>
        <th>Créé le</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ticket in tickets" :key="ticket.id">
        <td>{{ ticket.id }}</td>
        <td>
          <RouterLink :to="{ name: 'ticket-details', params: { id: ticket.id } }">{{ ticket.title }}</RouterLink>
        </td>
        <td>{{ statuses[ticket.status].label }}</td>
        <td :class="priorities[ticket.priority].color">{{ priorities[ticket.priority].label }}</td>
        <td>{{ new Date(ticket.createdAt).toLocaleDateString('fr-FR') }}</td>
      </tr>
      <tr v-if="tickets.length === 0">
        <td colspan="5" class="text-center">Aucun ticket ne correspond à la recherche.</td>
      </tr>
    </tbody>
  </table>
</template>
