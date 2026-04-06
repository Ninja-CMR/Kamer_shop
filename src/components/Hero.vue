<script setup lang="ts">
import { PlayCircle } from 'lucide-vue-next';
import Button from './Button.vue';

// Import images
import img1 from '../assets/heroSection/photorealistic-portrait-african-woman.jpg';
import img2 from '../assets/heroSection/woman-does-video-call-local-store.jpg';
import img3 from '../assets/heroSection/woman-shopping-thrift-store.jpg';
</script>

<template>
  <section id="home" class="max-w-7xl mx-auto px-6 py-12 md:py-24 relative overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
      <!-- Left Content -->
      <div class="text-left">
        <h1 class="text-5xl md:text-7xl font-extrabold text-primary leading-tight max-w-4xl tracking-tight">
          Lance ta boutique en 2-2, fini de saturer les statuts.<br />
          <span class="text-primary font-extrabold">Vends sans ndem.</span>
        </h1>
        
        <p class="mt-8 text-lg md:text-xl font-normal text-gray-600 max-w-2xl leading-relaxed">
          KamerShop est l'extension WhatsApp n°1 au Cameroun. Transforme ton business en catalogue propre, gère tes stocks et tes commandes sans chauffer la tête.
          <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/20 text-primary rounded-full text-xs font-black uppercase tracking-tighter ml-2">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            C'est Gratuit !
          </span>
        </p>
        
        <div class="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <router-link to="/create-shop" class="w-full sm:w-auto">
            <Button size="lg" variant="primary" class="w-full">
              Lancer ma boutique
            </Button>
          </router-link>
          <button class="flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-all px-4 py-2">
            <PlayCircle :size="24" />
            Voir comment ça ndom
          </button>
        </div>
        
        <div class="mt-12">
          <span class="text-xs font-bold tracking-widest text-gray-400 uppercase">
            Déjà +500 "vrai-vrai" commerçants à Douala, Yaoundé & Bafoussam
          </span>
        </div>
      </div>

      <!-- Right Image Grid -->
      <div class="relative">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-4">
            <div class="rounded-[2rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img :src="img1" alt="Marchande KabaShop" class="w-full h-64 md:h-80 object-cover" />
            </div>
            <div class="rounded-[2rem] overflow-hidden shadow-2xl transform translate-x-8 hover:scale-[1.02] transition-transform duration-500">
              <img :src="img2" alt="Appel vidéo boutique" class="w-full h-48 md:h-64 object-cover" />
            </div>
          </div>
          <div class="pt-12">
            <div class="rounded-[2rem] overflow-hidden shadow-2xl transform -translate-x-4 hover:scale-[1.02] transition-transform duration-500">
              <img :src="img3" alt="Shopping en boutique local" class="w-full h-[28rem] md:h-[35rem] object-cover" />
            </div>
          </div>
        </div>
        
        <!-- Decorative blobs behind images -->
        <div class="absolute -top-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
      </div>
    </div>
    
    <!-- Large background blurred shape -->
    <div class="absolute -right-20 top-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
  </section>
</template>
