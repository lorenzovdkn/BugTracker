<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Ticket } from '../services/api.ts';
import type { TicketDto } from '../types/api.types.ts';

const tickets = ref<TicketDto[]>([]);
const getTickets = async () => {
  try {
    tickets.value = await Ticket.getTickets();
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
};

onMounted(async() => {
  try {
    tickets.value = await Ticket.getTickets();
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
});
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ticket in tickets" :key="ticket.id">
                <td>{{ ticket.id }}</td>
                <td>{{ ticket.title }}</td>
                <td>{{ ticket.description }}</td>
                <td>{{ ticket.status }}</td>
                <td>{{ ticket.priority }}</td>
                <td>{{ ticket.createdAt }}</td>
            </tr>
        </tbody>
    </table>
</template>