<script setup lang="ts">
import { Store, Share2, MessageSquare } from 'lucide-vue-next';

const steps = [
  {
    icon: Store,
    title: '1. Ouvre ta boutique',
    description: 'Poste tes photos, mets tes prix une seule fois. Ton comptoir est prêt en 2 minutes.',
  },
  {
    icon: Share2,
    title: '2. Envoie ton lien',
    description: 'Plus besoin de saturer les statuts. Balance ton lien partout : WhatsApp, Facebook, Tik Tok.',
  },
  {
    icon: MessageSquare,
    title: '3. Encaisse le ndom',
    description: 'Reçois tes commandes déjà prêtes et bien classées directement dans ton WhatsApp.',
  },
];
</script>

<template>
  <section class="bg-gray-50 py-20 px-6">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-4xl font-extrabold text-primary mb-4">Comment ça marche ?</h2>
      <p class="text-gray-500 font-normal mb-16">Trois étapes simples pour digitaliser votre business</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center">
          <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 transition-transform hover:scale-110">
            <component :is="step.icon" :size="32" />
          </div>
          <h3 class="text-xl font-extrabold text-primary mb-4">{{ step.title }}</h3>
          <p class="text-gray-600 font-normal leading-relaxed max-w-sm">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
