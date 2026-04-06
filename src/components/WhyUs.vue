<script setup lang="ts">
import { Smartphone, Clock, Award } from 'lucide-vue-next';

const benefits = [
  {
    icon: Smartphone,
    title: "Status propres",
    description: "Arrête de poster 50 photos par jour. Envoie un seul lien propre à tes clients."
  },
  {
    icon: Clock,
    title: "Zéro perte de temps",
    description: "Le prix et les stocks sont déjà là. Tu ne réponds plus aux curieux, tu encaisses les commandes."
  },
  {
    icon: Award,
    title: "Plus de confiance",
    description: "Une vraie vitrine en ligne montre que tu es un commerçant sérieux et organisé."
  }
];
</script>

<template>
  <section id="why-us" class="py-20 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="mb-16 text-center">
        <h2 class="text-3xl md:text-5xl font-extrabold text-primary mb-4">
          Pourquoi choisir KamerShop ?
        </h2>
        <p class="text-gray-500 text-lg font-normal italic">
          C'est simple, direct et ça fait le travail.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="benefit in benefits" :key="benefit.title" class="flex flex-col items-center text-center md:items-start md:text-left gap-4">
          <div class="w-12 h-12 bg-secondary/20 text-primary rounded-xl flex items-center justify-center">
            <component :is="benefit.icon" :size="24" />
          </div>
          <h3 class="text-xl font-extrabold text-primary">{{ benefit.title }}</h3>
          <p class="text-gray-600 font-normal leading-relaxed">
            {{ benefit.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
