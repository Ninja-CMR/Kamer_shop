<script setup lang="ts">
</script>

<template>
  <footer class="bg-gray-50 py-12 px-6">
    <div class="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
      <div class="text-gray-400 text-sm font-medium text-center md:text-left leading-relaxed">
        © 2024 KabaShop. Propulsé par la communauté WhatsApp Cameroun
      </div>
      
      <div class="flex items-center gap-8">
        <a href="#" class="text-gray-500 text-sm hover:text-primary transition-colors font-medium">Contact</a>
        <a href="#" class="text-gray-500 text-sm hover:text-primary transition-colors font-medium">Conditions</a>
        <a href="#" class="text-gray-500 text-sm hover:text-primary transition-colors font-medium">Connexion Vendeur</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@media (min-width: 768px) {
  footer > div {
    flex-direction: row;
  }
}
</style>
