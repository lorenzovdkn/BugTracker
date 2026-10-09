<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Ticket } from '../services/api.ts';
import type { TicketDto } from '../types/api.types.ts';
import { statuses, priorities } from '../utils/ticketLabels.ts';

const route = useRoute();
const router = useRouter();

const ticket = ref<TicketDto | null>(null);
const error = ref('');

onMounted(async () => {
  try {
    ticket.value = await Ticket.getTicket(route.params.id as string);
  } catch (e) {
    console.error('Error fetching ticket:', e);
    error.value = 'Impossible de charger ce ticket.';
  }
});

const deleteTicket = async () => {
  if (!ticket.value) return;
  if (!confirm('Supprimer ce ticket ?')) return;

  try {
    await Ticket.deleteTicket(ticket.value.id);
    router.push({ name: 'dashboard' });
  } catch (e) {
    console.error('Error deleting ticket:', e);
    error.value = 'Impossible de supprimer ce ticket.';
  }
};
</script>
<template>
  <div class="container">
    <h1 class="my-4 d-flex justify-content-center">Détail du ticket</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="ticket" class="card col-md-6 mx-auto">
      <div class="card-body">
        <h2 class="card-title">{{ ticket.title }}</h2>
        <p>Statut : {{ statuses[ticket.status].label }}</p>
        <p>Priorité : {{ priorities[ticket.priority].label }}</p>
        <p>Créé le : {{ new Date(ticket.createdAt).toLocaleString('fr-FR') }}</p>
        <p>{{ ticket.description }}</p>

        <RouterLink class="btn btn-secondary me-2" :to="{ name: 'dashboard' }">Retour</RouterLink>
        <RouterLink class="btn btn-primary me-2" :to="{ name: 'edit-ticket', params: { id: ticket.id } }">
          Modifier
        </RouterLink>
        <button class="btn btn-danger" @click="deleteTicket">Supprimer</button>
      </div>
    </div>
  </div>
</template>
