<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import CardTicket from '../components/CardTicket.vue';
import { Ticket } from '../services/api.ts';
import type { TicketDto } from '../types/api.types.ts';

const tickets = ref<TicketDto[]>([]);
const error = ref('');
const search = ref('');
const filteredTickets = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return tickets.value;
  return tickets.value.filter(t =>
    [t.title, t.description].some(f => f?.toLowerCase().includes(q))
  );
});
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
    <div class="container-header my-4 d-flex justify-content-between align-items-center">
      <h1 class="my-0">Dashboard</h1>
      <div class="input-group w-auto">
        <div class="form-outline" data-mdb-input-init>
          <input  type="search" v-model="search" class="form-control" placeholder="Search" aria-label="Search" />
        </div>
        <div class="bg-primary d-flex align-items-center justify-content-center px-3">
          <img src="\src\assets\rechercher.png" alt="search" width="20" height="20" />
        </div>
    </div>
  </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="row g-3">
      <div v-for="ticket in filteredTickets" :key="ticket.id" class="col-md-6">
        <CardTicket :ticket="ticket" />
      </div>
    </div>
  </div>
</template>
