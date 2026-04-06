<script setup lang="ts">
import { ShoppingCart, MapPin, Clock, Truck, CreditCard, Info } from 'lucide-vue-next';
import { useShopStore } from '../../../stores/shop';

const store = useShopStore();

const getPaymentLabel = (id: string) => {
  const modes: Record<string, string> = {
    'cash': 'Cash',
    'mtn': 'MoMo',
    'orange': 'Orange'
  };
  return modes[id] || id;
};
</script>

<template>
  <div class="space-y-8">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-extrabold text-primary">Aperçu Vrai-Vrai</h3>
      <p class="text-gray-500 font-normal">Voici comment tes clients verront ta boutique.</p>
    </div>

    <div class="bg-white rounded-[3rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden max-w-sm mx-auto relative">
      <!-- Screen Notch -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>

      <!-- Phone Header -->
      <div class="bg-primary pt-10 pb-6 px-6 text-white relative">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30">
            {{ store.name ? store.name.charAt(0).toUpperCase() : '🏪' }}
          </div>
          <div class="flex-grow">
            <h4 class="text-xl font-extrabold leading-tight">{{ store.name || 'Ma Boutique' }}</h4>
            <div class="flex items-center gap-1 opacity-70 text-[10px] font-bold uppercase tracking-wider mt-1">
               <span class="px-1.5 py-0.5 bg-white/20 rounded">{{ store.category || 'Commerce' }}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 space-y-2">
          <p v-if="store.description" class="text-xs font-normal opacity-90 line-clamp-2 italic">" {{ store.description }} "</p>
          
          <div class="flex flex-wrap gap-3 pt-2">
            <div v-if="store.zone" class="flex items-center gap-1 text-[10px] font-bold">
              <MapPin :size="10" /> {{ store.zone }}
            </div>
            <div v-if="store.hours" class="flex items-center gap-1 text-[10px] font-bold">
              <Clock :size="10" /> {{ store.hours }}
            </div>
          </div>
        </div>
      </div>

      <!-- Phone Content -->
      <div class="p-4 space-y-4 h-[350px] overflow-y-auto bg-gray-50 custom-scrollbar">
        <!-- Badges Info -->
        <div class="flex gap-2 mb-2">
           <div v-if="store.deliveryModes.length > 0" class="flex items-center gap-1 text-[9px] font-bold bg-secondary/10 text-primary px-2 py-1 rounded-full border border-secondary/20">
             <Truck :size="10" /> Livraison dispo
           </div>
           <div v-if="store.paymentModes.length > 0" class="flex items-center gap-1 text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100">
             <CreditCard :size="10" /> {{ store.paymentModes.map(m => getPaymentLabel(m)).join(', ') }}
           </div>
        </div>

        <div v-if="store.products.length === 0" class="text-center py-16 opacity-30 italic flex flex-col items-center">
          <Info :size="32" class="mb-2" />
          <p class="text-sm">Ta boutique est vide...</p>
        </div>
        
        <div 
          v-for="product in store.products" 
          :key="product.id"
          class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden transition-all"
          :class="{ 'opacity-60 grayscale-[0.5]': !product.inStock }"
        >
          <div class="flex-grow">
            <div class="flex items-center gap-2">
               <p class="font-bold text-primary">{{ product.name }}</p>
               <span v-if="!product.inStock" class="text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold uppercase">Épuisé</span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <p class="text-sm font-extrabold text-secondary">{{ product.price }} FCFA</p>
              <p v-if="product.discountPrice" class="text-[10px] text-gray-400 line-through font-normal">{{ product.discountPrice }} FCFA</p>
            </div>
            <p v-if="product.description" class="text-[9px] text-gray-400 mt-1 italic line-clamp-1">{{ product.description }}</p>
          </div>
          <button class="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/20">
            <ShoppingCart :size="14" />
          </button>
        </div>
      </div>

      <!-- Phone Footer -->
      <div class="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <button class="w-full bg-secondary text-primary py-4 rounded-2xl font-extrabold shadow-xl shadow-secondary/20 transform active:scale-95 transition-all text-sm">
          Commander sur WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 0px;
}
</style>
