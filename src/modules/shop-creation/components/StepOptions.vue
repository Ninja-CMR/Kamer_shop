<script setup lang="ts">
import { Bike, Store, Banknote, Smartphone } from 'lucide-vue-next';
import { useShopStore } from '../../../stores/shop';

const store = useShopStore();

const toggleItem = (list: string[], value: string) => {
  const index = list.indexOf(value);
  if (index === -1) {
    list.push(value);
  } else {
    list.splice(index, 1);
  }
};
</script>

<template>
  <div class="space-y-8">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-extrabold text-primary">Options de commande</h3>
      <p class="text-gray-500 font-normal">Comment tes clients récupèrent et payent leurs achats.</p>
    </div>

    <div class="space-y-8">
      <!-- Livraison -->
      <div class="space-y-4">
        <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>🚴</span> Mode de livraison <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            @click="toggleItem(store.deliveryModes, 'delivery')"
            class="p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-4"
            :class="[store.deliveryModes.includes('delivery') ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400']"
          >
            <Bike :size="32" class="flex-shrink-0" />
            <div>
              <p class="font-bold text-lg">Livraison à domicile</p>
              <p class="text-xs font-normal opacity-80 mt-1 italic">Tu livres dans ta zone de vente</p>
            </div>
          </button>
          
          <button 
            @click="toggleItem(store.deliveryModes, 'pickup')"
            class="p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-4"
            :class="[store.deliveryModes.includes('pickup') ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400']"
          >
            <Store :size="32" class="flex-shrink-0" />
            <div>
              <p class="font-bold text-lg">Retrait sur place</p>
              <p class="text-xs font-normal opacity-80 mt-1 italic">Le client vient chercher son colis</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Paiement -->
      <div class="space-y-4">
        <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>💵</span> Mode de paiement accepté <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button 
            v-for="mode in [
              { id: 'cash', label: 'Cash à la livraison', icon: Banknote },
              { id: 'mtn', label: 'MTN MoMo', icon: Smartphone },
              { id: 'orange', label: 'Orange Money', icon: Smartphone }
            ]"
            :key="mode.id"
            @click="toggleItem(store.paymentModes, mode.id)"
            class="p-4 rounded-xl border-2 transition-all space-y-2"
            :class="[store.paymentModes.includes(mode.id) ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-gray-100 text-gray-400']"
          >
            <component :is="mode.icon" :size="24" class="mx-auto" />
            <p class="text-center text-xs font-bold leading-tight">{{ mode.label }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
