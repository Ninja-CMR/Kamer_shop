<script setup lang="ts">
import Button from './Button.vue';
</script>

<template>
  <section class="px-6 py-12">
    <div class="max-w-6xl mx-auto bg-primary rounded-[32px] p-12 md:p-24 text-center overflow-hidden relative">
      <div class="relative z-10">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Prêt à faire briller ton commerce ?
        </h2>
        <p class="text-white/80 text-lg md:text-xl font-normal mb-12 max-w-2xl mx-auto leading-relaxed">
          Rejoins la révolution du e-commerce au Cameroun. Lance-toi aujourd'hui et commence à vendre sans ndem.
        </p>
        <router-link to="/create-shop" class="inline-block">
          <Button size="lg" variant="secondary" class="font-bold text-lg hover:scale-105 active:scale-95 transition-transform">
            Ouvrir ma boutique (C'est gratuit)
          </Button>
        </router-link>
      </div>
      
      <!-- Abstract decorative elements -->
      <div class="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary/20 rounded-full blur-2xl"></div>
    </div>
  </section>
</template>
