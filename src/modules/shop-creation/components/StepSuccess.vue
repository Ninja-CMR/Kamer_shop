<script setup lang="ts">
import { CheckCircle2, Share2, ExternalLink, ArrowRight } from 'lucide-vue-next';
import { useShopStore } from '../../../stores/shop';
import { useRouter } from 'vue-router';
import Button from '../../../components/Button.vue';

const store = useShopStore();
const router = useRouter();

const goToDashboard = () => {
    router.push('/dashboard');
};

const shareShop = () => {
    const text = `Vient voir ma boutique ${store.name} sur KamerShop ! 🇨🇲`;
    const url = window.location.origin + '/shop/' + store.name.replace(/\s+/g, '-').toLowerCase();
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
};
</script>

<template>
  <div class="text-center py-12 px-6">
    <div class="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <CheckCircle2 :size="48" />
    </div>
    
    <h3 class="text-3xl font-black text-primary italic mb-4">C'est le kiff ! 🎉</h3>
    <p class="text-gray-500 font-medium mb-12 max-w-sm mx-auto">
      Ta boutique <span class="text-primary font-black">{{ store.name }}</span> est maintenant en ligne et prête à recevoir des Gombos !
    </p>

    <div class="grid grid-cols-1 gap-4 max-w-sm mx-auto">
        <Button @click="shareShop" variant="primary" class="flex items-center justify-center gap-3 py-6">
            <Share2 :size="20" /> Partager sur WhatsApp
        </Button>
        <Button @click="goToDashboard" variant="secondary" class="flex items-center justify-center gap-3 py-6">
            <ArrowRight :size="20" /> Aller au Dashboard
        </Button>
    </div>

    <div class="mt-12 p-6 bg-gray-50 rounded-[3rem] border border-gray-100">
        <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Lien de ta boutique</p>
        <div class="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-100">
            <span class="text-primary font-bold text-sm truncate mr-4">{{ '/shop/' + store.name.replace(/\s+/g, '-').toLowerCase() }}</span>
            <ExternalLink :size="16" class="text-gray-300" />
        </div>
    </div>
  </div>
</template>
