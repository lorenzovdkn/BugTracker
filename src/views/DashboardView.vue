<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CardTicket from '../components/CardTicket.vue';
import { Ticket } from '../services/api.ts';
import type { TicketDto } from '../types/api.types.ts';

const tickets = ref<TicketDto[]>([]);
const error = ref('');

onMounted(async () => {
  try {
    tickets.value = await Ticket.getTickets();
  } catch (e) {
    console.error('Error fetching tickets:', e);
    error.value = 'Impossible de charger les tickets.';
  }
});
</script>
<template>
  <div class="container">
    <h1 class="my-4">Dashboard</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="row g-3">
      <div v-for="ticket in tickets" :key="ticket.id" class="col-md-6">
        <CardTicket :ticket="ticket" />
      </div>
    </div>
  </div>
</template>
