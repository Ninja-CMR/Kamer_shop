<script setup lang="ts">
import ShopCreationWizard from '../modules/shop-creation/components/ShopCreationWizard.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-extrabold text-primary mb-6">Crée ta boutique KamerShop</h1>
        <p class="text-gray-500 text-lg md:text-xl font-normal max-w-2xl mx-auto">
          Suis les étapes pour lancer ton business en ligne en quelques minutes.
        </p>
      </div>
      <ShopCreationWizard />
    </div>
  </div>
</template>
