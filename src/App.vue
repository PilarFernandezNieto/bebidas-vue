<script setup>
import {RouterView} from 'vue-router'
import Header from './components/Header.vue';

</script>

<template>
  <Header />
  <main class="container mx-auto mt-10 px-20">
    <RouterView />
  </main>

</template>

