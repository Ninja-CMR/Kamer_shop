<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<style>
/* Custom animations for entry */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main > * {
  animation: fadeInUp 0.8s ease-out forwards;
}

main > *:nth-child(1) { animation-delay: 0.1s; }
main > *:nth-child(2) { animation-delay: 0.3s; }
main > *:nth-child(3) { animation-delay: 0.5s; }
main > *:nth-child(4) { animation-delay: 0.7s; }
</style>
