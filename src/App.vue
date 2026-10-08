<script setup lang="ts">
import TicketTab from './components/TicketTab.vue';
import { Ticket } from './services/api.ts';
import type { TicketDto } from './types/api.types.ts';

const getTickets = () => Ticket.getTickets();
Ticket.getTickets().then((tickets: TicketDto[]) => {
  console.log('Tickets:', tickets);
}).catch((error) => {
  console.error('Error fetching tickets:', error);
});

</script>

<template>
  <TicketTab />

  <div class="container mt-4">
      <div class="dropdown mt-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"></button>
      </div>
  </div>
</template>
