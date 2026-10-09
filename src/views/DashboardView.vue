<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import FilterBar from '../components/FilterBar.vue';
import PaginationBar from '../components/PaginationBar.vue';
import TicketTable from '../components/TicketTable.vue';
import { Ticket } from '../services/api.ts';
import type { TicketDto } from '../types/api.types.ts';

const tickets = ref<TicketDto[]>([]);
const error = ref('');
const page = ref(1);
const totalPages = ref(1);
const search = ref('');
const status = ref('');
const priority = ref('');

const loadTickets = async (newPage: number) => {
  try {
    const result = await Ticket.getTickets(newPage, {
      title: search.value.trim(),
      status: status.value,
      priority: priority.value,
    });
    tickets.value = result.tickets;
    totalPages.value = result.totalPages;
    page.value = newPage;
  } catch (e) {
    console.error('Error fetching tickets:', e);
    error.value = 'Impossible de charger les tickets.';
  }
};

onMounted(() => loadTickets(1));

// Quand un filtre change, on redemande les tickets à l'API en repartant de la page 1
watch([search, status, priority], () => loadTickets(1));
</script>
<template>
  <div class="container">
    <div class="my-4 d-flex justify-content-between align-items-center">
      <h1 class="my-0">Dashboard</h1>
      <FilterBar v-model:search="search" v-model:status="status" v-model:priority="priority" />
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <TicketTable :tickets="tickets" />

    <PaginationBar :page="page" :total-pages="totalPages" @change="loadTickets" />
  </div>
</template>
