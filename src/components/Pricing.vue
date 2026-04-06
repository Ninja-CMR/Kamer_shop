<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import Button from './Button.vue';

const plans = [
  {
    name: 'Le Test',
    price: '0',
    duration: '7 jours',
    description: 'Pour "voir" si c\'est bon avant de s\'engager.',
    features: [
      'Boutique en ligne complète',
      'Catalogue illimité',
      'Commandes WhatsApp illimitées',
      'Support par chat'
    ],
    buttonText: 'Tester en 2-2',
    variant: 'secondary' as const
  },
  {
    name: 'Le Gbich',
    price: '3 000',
    duration: 'mois',
    description: 'Pour les vrais commerçants qui veulent briller.',
    features: [
      'Tout dans Le Test',
      'Gestion des stocks avancée',
      'Statistiques des ventes',
      'Badge "Vendeur Vérifié"',
      'Support prioritaire'
    ],
    buttonText: 'Prendre le Gbich',
    variant: 'primary' as const,
    popular: true
  },
  {
    name: 'Le Boss',
    price: '8 000',
    duration: 'mois',
    description: 'Pour dominer le marché et gérer plusieurs boutiques.',
    features: [
      'Tout dans Le Gbich',
      'Multi-boutiques (jusqu\'à 3)',
      'Publicité Facebook assistée',
      'Conseiller business dédié',
      'Espace de stockage illimité'
    ],
    buttonText: 'Devenir le Boss',
    variant: 'secondary' as const
  }
];
</script>

<template>
  <section class="py-24 px-6 bg-white" id="pricing">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-extrabold text-primary mb-6">
          Des tarifs propres, pas de frais cachés
        </h2>
        <p class="text-gray-600 text-lg md:text-xl font-normal max-w-2xl mx-auto">
          Choisis le plan qui te correspond et commence à vendre comme un pro dès aujourd'hui.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="plan in plans" 
          :key="plan.name"
          class="relative rounded-[2.5rem] p-8 transition-all duration-300 hover:shadow-2xl flex flex-col border border-gray-100 h-full"
          :class="[plan.popular ? 'bg-primary text-white scale-105 z-10 shadow-xl' : 'bg-gray-50 text-primary']"
        >
          <div v-if="plan.popular" class="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-primary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            Plus Populaire
          </div>

          <div class="mb-8">
            <h3 class="text-2xl font-extrabold mb-2">{{ plan.name }}</h3>
            <p :class="[plan.popular ? 'text-white/80' : 'text-gray-500']" class="font-normal">
              {{ plan.description }}
            </p>
          </div>

          <div class="mb-8 flex items-baseline gap-1">
            <span class="text-4xl font-extrabold">{{ plan.price }}</span>
            <span class="text-lg font-bold" :class="[plan.popular ? 'text-white/70' : 'text-gray-400']">FCFA / {{ plan.duration }}</span>
          </div>

          <ul class="space-y-4 mb-10 flex-grow">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-3">
              <div class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center p-1" :class="[plan.popular ? 'bg-secondary text-primary' : 'bg-primary text-white']">
                <Check :size="12" stroke-width="4" />
              </div>
              <span class="text-sm font-normal">{{ feature }}</span>
            </li>
          </ul>

          <Button 
            :variant="plan.variant" 
            size="lg" 
            class="w-full font-bold text-lg"
            :class="[plan.popular ? 'hover:scale-105 active:scale-95' : '']"
          >
            {{ plan.buttonText }}
          </Button>
        </div>
      </div>
      
      <p class="text-center mt-12 text-gray-500 font-normal">
        Paiement sécurisé par <span class="font-bold text-primary">Mobile Money (Orange & MTN)</span>
      </p>
    </div>
  </section>
</template>
