<script setup lang="ts"></script>

<template>
  <nav class="navbar navbar-expand bg-body-tertiary">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'dashboard' }">Bug Tracker</RouterLink>
      <RouterLink class="btn btn-primary" :to="{ name: 'new-ticket' }">Nouveau ticket</RouterLink>
    </div>
  </nav>

  <main class="container ">
    <RouterView />
  </main>
</template>
