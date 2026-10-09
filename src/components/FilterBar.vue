<script setup lang="ts">
import searchIcon from '../assets/rechercher.png';
import { statuses, priorities } from '../utils/ticketLabels.ts';

const search = defineModel<string>('search');
const status = defineModel<string>('status');
const priority = defineModel<string>('priority');
</script>

<template>
  <div class="d-flex gap-2">
    <select v-model="status" class="form-select w-auto" aria-label="Statut">
      <option value="">Tous les statuts</option>
      <option v-for="(s, key) in statuses" :key="key" :value="key">{{ s.label }}</option>
    </select>
    <select v-model="priority" class="form-select w-auto" aria-label="Priorité">
      <option value="">Toutes les priorités</option>
      <option v-for="(p, key) in priorities" :key="key" :value="key">{{ p.label }}</option>
    </select>
    <div class="input-group w-auto">
      <input type="search" v-model="search" class="form-control" placeholder="Search" aria-label="Search" />
      <div class="bg-primary d-flex align-items-center justify-content-center px-3">
        <img :src="searchIcon" alt="search" width="20" height="20" />
      </div>
    </div>
  </div>
</template>
