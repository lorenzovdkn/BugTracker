<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormTicket from '../components/FormTicket.vue';
import { ApiError, Ticket } from '../services/api.ts';
import type { TicketFormData, TicketFormErrors } from '../types/api.types.ts';

const router = useRouter();

const submitting = ref(false);
const error = ref('');
const apiErrors = ref<TicketFormErrors>({});

const createTicket = async (data: TicketFormData) => {
  submitting.value = true;
  error.value = '';
  apiErrors.value = {};
  try {
    const ticket = await Ticket.createTicket(data);
    router.push({ name: 'ticket-details', params: { id: ticket.id } });
  } catch (e) {
    console.error('Error creating ticket:', e);
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
    <h1 class="my-4 d-flex justify-content-center text-align-center">Nouveau ticket</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <FormTicket :submitting="submitting" :api-errors="apiErrors" @submit="createTicket" />
  </div>
</template>
