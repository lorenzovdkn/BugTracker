<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Ticket } from '../services/api.ts';
import type { TicketDto } from '../types/api.types.ts';
import { statuses, priorities } from '../utils/ticketLabels.ts';

const route = useRoute();
const router = useRouter();

const ticket = ref<TicketDto | null>(null);
const loading = ref(true);
const error = ref('');
const confirmDelete = ref(false);
const deleting = ref(false);

const formatDate = (date: string) =>
  new Date(date).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });

onMounted(async () => {
  try {
    ticket.value = await Ticket.getTicket(route.params.id as string);
  } catch (e) {
    console.error('Error fetching ticket:', e);
    error.value = 'Impossible de charger ce ticket.';
  } finally {
    loading.value = false;
  }
});

const deleteTicket = async () => {
  if (!ticket.value) return;

  deleting.value = true;
  try {
    await Ticket.deleteTicket(ticket.value.id);
    router.push({ name: 'dashboard' });
  } catch (e) {
    console.error('Error deleting ticket:', e);
    error.value = 'Impossible de supprimer ce ticket.';
    deleting.value = false;
    confirmDelete.value = false;
  }
};
</script>
<template>
  <div class="container detail">
    <RouterLink class="d-inline-block my-4 text-decoration-none" :to="{ name: 'dashboard' }">
      &larr; Retour aux tickets
    </RouterLink>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <p v-if="loading" class="text-body-secondary">Chargement...</p>

    <div
      v-if="ticket"
      class="card border-0 border-start border-5 shadow-sm"
      :class="priorities[ticket.priority].border"
    >
      <div class="card-body p-4">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="text-body-secondary">Ticket #{{ ticket.id }}</span>
          <span class="badge" :class="statuses[ticket.status].color">
            {{ statuses[ticket.status].label }}
          </span>
        </div>

        <h1 class="h3 mb-4">{{ ticket.title }}</h1>

        <dl class="row mb-4">
          <dt class="col-sm-3 text-body-secondary fw-normal">Priorité</dt>
          <dd class="col-sm-9 fw-semibold" :class="priorities[ticket.priority].color">
            {{ priorities[ticket.priority].label }}
          </dd>

          <dt class="col-sm-3 text-body-secondary fw-normal">Créé le</dt>
          <dd class="col-sm-9">{{ formatDate(ticket.createdAt) }}</dd>
        </dl>

        <h2 class="h6 text-body-secondary">Description</h2>
        <p class="description mb-0">{{ ticket.description }}</p>
      </div>

      <div class="card-footer bg-transparent d-flex flex-wrap justify-content-end align-items-center gap-2 px-4 py-3">
        <button v-if="!confirmDelete" class="btn btn-outline-danger" @click="confirmDelete = true">
          Supprimer
        </button>
        <template v-else>
          <span class="me-auto">Supprimer définitivement ce ticket ?</span>
          <button class="btn btn-secondary" :disabled="deleting" @click="confirmDelete = false">
            Annuler
          </button>
          <button class="btn btn-danger" :disabled="deleting" @click="deleteTicket">
            Oui, supprimer
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  max-width: 760px;
}

.description {
  white-space: pre-line;
}
</style>
