<script setup lang="ts">
import { onMounted } from 'vue';
import { useShopStore } from '../stores/shop';
import { ShoppingCart, MapPin, Clock, Truck, CreditCard, ChevronRight, ShoppingBag, Image as ImageIcon } from 'lucide-vue-next';

const store = useShopStore();

onMounted(() => {
    store.incrementVisitors();
});

const getPaymentLabel = (id: string) => {
  const modes: Record<string, string> = {
    'cash': 'Cash',
    'mtn': 'MoMo',
    'orange': 'Orange'
  };
  return modes[id] || id;
};

const getProduct = (id: string) => {
  return store.products.find(p => p.id === id);
};

const sendWhatsApp = (productId: string, productName: string, price: number) => {
    store.trackClick(productId);
    const text = `Salut ! Je suis intéressé par "${productName}" (${price} FCFA) dans ta boutique ${store.name}. Est-ce disponible ?`;
    window.open(`https://wa.me/${store.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-24">
    <!-- Shop Header (Minimalist) -->
    <header class="pt-20 pb-10 px-6 bg-white border-b border-gray-100">
      <div class="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div class="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gray-50 flex items-center justify-center text-4xl border border-gray-100 overflow-hidden shadow-xl mb-6">
          <img v-if="store.logo" :src="store.logo" class="w-full h-full object-cover" />
          <span v-else>{{ store.name ? store.name.charAt(0).toUpperCase() : '🏪' }}</span>
        </div>
        
        <h1 class="text-3xl md:text-5xl font-black mb-2 text-primary tracking-tight">{{ store.name || 'Ma Boutique' }}</h1>
        <p v-if="store.description" class="text-xs md:text-sm font-medium text-gray-500 max-w-xl mx-auto mb-6 italic">" {{ store.description }} "</p>
        
        <div class="flex flex-wrap justify-center gap-3 text-[10px] font-black uppercase tracking-wider">
           <div v-if="store.zone" class="flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/10">
              <MapPin :size="10" /> {{ store.zone }}
           </div>
           <div v-if="store.hours" class="flex items-center gap-1.5 bg-gray-100 text-gray-400 px-3 py-1.5 rounded-full border border-gray-200">
              <Clock :size="10" /> {{ store.hours }}
           </div>
           <div v-if="store.deliveryModes.length > 0" class="flex items-center gap-1.5 bg-secondary text-primary px-3 py-1.5 rounded-full shadow-lg">
              <Truck :size="10" /> Livraison dispo
           </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 md:px-6 -mt-8 space-y-12">
      <!-- Info Badges -->
       <div v-if="store.paymentModes.length > 0" class="flex items-center justify-center gap-2">
          <CreditCard :size="12" class="text-gray-400" />
          <span class="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">{{ store.paymentModes.map(m => getPaymentLabel(m)).join(' • ') }}</span>
       </div>

      <!-- Sections -->
      <template v-for="section in store.sections" :key="section.id">
        <div class="space-y-4">
            <div class="relative h-48 md:h-64 rounded-[3rem] overflow-hidden shadow-2xl group">
               <img v-if="section.coverImage" :src="section.coverImage" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div v-else class="w-full h-full bg-primary/10 flex items-center justify-center text-primary/20">
                  <ImageIcon :size="64" />
               </div>
               <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                  <h2 class="text-2xl md:text-4xl font-black text-white italic tracking-tighter">{{ section.name }}</h2>
                  <p v-if="section.description" class="text-white/80 text-sm md:text-base font-medium mt-1">{{ section.description }}</p>
               </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <template v-for="productId in section.productIds" :key="productId">
                <div 
                  v-if="getProduct(productId)"
                  class="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-xl hover:border-primary/20 transition-all group"
                  :class="{ 'opacity-60 grayscale-[0.5]': !getProduct(productId)!.inStock }"
                >
                  <div class="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 relative">
                      <img v-if="getProduct(productId)!.image" :src="getProduct(productId)!.image" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center text-gray-200">
                           <ShoppingBag :size="32" />
                      </div>
                      <div v-if="!getProduct(productId)!.inStock" class="absolute inset-0 bg-red-900/40 flex items-center justify-center text-white font-black text-xs uppercase italic">Fini</div>
                  </div>
                  <div class="flex-grow min-w-0">
                      <h4 class="font-black text-primary text-lg md:text-xl truncate">{{ getProduct(productId)!.name }}</h4>
                      <p v-if="getProduct(productId)!.description" class="text-xs text-gray-400 line-clamp-1 italic mb-2">{{ getProduct(productId)!.description }}</p>
                      <div class="flex items-center gap-3">
                          <span class="font-black text-secondary text-lg">{{ getProduct(productId)!.price }} FCFA</span>
                          <span v-if="getProduct(productId)!.discountPrice" class="text-xs text-gray-300 line-through">{{ getProduct(productId)!.discountPrice }} FCFA</span>
                      </div>
                  </div>
                  <button 
                      @click="sendWhatsApp(getProduct(productId)!.id, getProduct(productId)!.name, getProduct(productId)!.price)"
                      class="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all flex-shrink-0"
                  >
                      <ShoppingCart :size="20" />
                  </button>
                </div>
              </template>
            </div>
        </div>
      </template>

      <!-- Ungrouped Products -->
      <div v-if="store.products.filter(p => !store.sections.some(s => s.productIds.includes(p.id))).length > 0" class="space-y-6">
          <div class="flex items-center gap-4">
              <div class="h-px bg-gray-200 flex-grow"></div>
              <h3 class="text-xs font-black text-primary uppercase tracking-widest bg-gray-50 px-4">Autres trouvailles</h3>
              <div class="h-px bg-gray-200 flex-grow"></div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <div 
               v-for="p in store.products.filter(p => !store.sections.some(s => s.productIds.includes(p.id)))" 
               :key="p.id"
               class="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
               :class="{ 'opacity-60 grayscale-[0.5]': !p.inStock }"
             >
                <div class="aspect-square bg-gray-50 relative">
                    <img v-if="p.image" :src="p.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-200">
                         <ShoppingBag :size="48" />
                    </div>
                    <div v-if="p.discountPrice" class="absolute top-4 left-4 bg-secondary text-primary text-[10px] font-black px-2 py-1 rounded-lg">Gbich !</div>
                    <div v-if="!p.inStock" class="absolute inset-0 bg-red-900/40 flex items-center justify-center text-white font-black text-sm uppercase italic">Stock fini</div>
                </div>
                <div class="p-6">
                    <h4 class="font-black text-primary text-xl truncate mb-1">{{ p.name }}</h4>
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex flex-col">
                            <span class="text-lg font-black text-secondary">{{ p.price }} FCFA</span>
                            <span v-if="p.discountPrice" class="text-xs text-gray-300 line-through">{{ p.discountPrice }} FCFA</span>
                        </div>
                        <button 
                            @click="sendWhatsApp(p.id, p.name, p.price)"
                            class="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-black text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <ShoppingCart :size="16" /> Commander
                        </button>
                    </div>
                </div>
             </div>
          </div>
      </div>

      <!-- Empty State -->
      <div v-if="store.products.length === 0" class="text-center py-32 space-y-4">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <ShoppingBag :size="48" />
          </div>
          <h3 class="text-2xl font-black text-primary italic">Boutique en pause...</h3>
          <p class="text-gray-400 font-medium">Reviens plus tard, le commerçant chauffe le stock !</p>
      </div>
    </main>

    <!-- Floating Navigation -->
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full shadow-2xl flex items-center gap-8 z-50">
       <div class="flex items-center gap-1">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span class="text-[10px] font-black text-primary uppercase">Ouvert</span>
       </div>
       <div class="flex items-center gap-4">
          <a :href="`https://wa.me/${store.whatsapp.replace(/\D/g, '')}`" target="_blank" class="flex items-center gap-2 text-primary font-black text-xs hover:opacity-70 transition-all">
             Contact <ChevronRight :size="14" />
          </a>
       </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #005F54;
  border-radius: 10px;
}
</style>
