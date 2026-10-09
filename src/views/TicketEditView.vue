<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormTicket from '../components/FormTicket.vue';
import { ApiError, Ticket } from '../services/api.ts';
import type { TicketDto, TicketFormData, TicketFormErrors } from '../types/api.types.ts';

const route = useRoute();
const router = useRouter();

const ticket = ref<TicketDto | null>(null);
const submitting = ref(false);
const error = ref('');
const apiErrors = ref<TicketFormErrors>({});

onMounted(async () => {
  try {
    ticket.value = await Ticket.getTicket(route.params.id as string);
  } catch (e) {
    console.error('Error fetching ticket:', e);
    error.value = 'Impossible de charger ce ticket.';
  }
});

const updateTicket = async (data: TicketFormData) => {
  if (!ticket.value) return;

  submitting.value = true;
  error.value = '';
  apiErrors.value = {};
  try {
    await Ticket.updateTicket(ticket.value.id, data);
    router.push({ name: 'ticket-details', params: { id: ticket.value.id } });
  } catch (e) {
    console.error('Error updating ticket:', e);
    if (e instanceof ApiError) {
      error.value = e.message;
      apiErrors.value = e.violations;
    } else {
      error.value = "Impossible de joindre le serveur. Vérifie que l'API est démarrée.";
    }
    submitting.value = false;
  }
};
</script>
<template>
  <div class="container">
    <h1 class="my-4 d-flex justify-content-center">Modifier le ticket</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <FormTicket v-if="ticket" :ticket="ticket" :submitting="submitting" :api-errors="apiErrors" @submit="updateTicket" />
  </div>
</template>
