<script setup lang="ts">
defineProps<{ page: number; totalPages: number }>();

const emit = defineEmits<{ change: [page: number] }>();
</script>

<template>
  <nav v-if="totalPages > 1">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: page === 1 }">
        <button class="page-link" @click="emit('change', page - 1)">Précédent</button>
      </li>
      <li v-for="p in totalPages" :key="p" class="page-item" :class="{ active: p === page }">
        <button class="page-link" @click="emit('change', p)">{{ p }}</button>
      </li>
      <li class="page-item" :class="{ disabled: page === totalPages }">
        <button class="page-link" @click="emit('change', page + 1)">Suivant</button>
      </li>
    </ul>
  </nav>
</template>
