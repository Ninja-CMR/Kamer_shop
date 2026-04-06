<script setup lang="ts">
import { ref } from 'vue';
import { Store, Menu, X } from 'lucide-vue-next';
import { useShopStore } from '../stores/shop';
import Button from './Button.vue';

const store = useShopStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};


</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
      <div class="flex items-center gap-2">
        <div class="p-1.5 bg-primary rounded-lg text-white">
          <Store :size="20" />
        </div>
        <span class="text-xl font-extrabold tracking-tight text-primary">KamerShop</span>
      </div>
      
      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-8">
        <router-link to="/" class="text-sm font-normal text-gray-600 hover:text-primary transition-colors">Accueil</router-link>
        <router-link to="/#why-us" class="text-sm font-normal text-gray-600 hover:text-primary transition-colors">Pourquoi nous ?</router-link>
        <router-link to="/#pricing" class="text-sm font-normal text-gray-600 hover:text-primary transition-colors">Tarifs</router-link>
      </div>
      
      <div class="hidden md:flex items-center gap-4">
        <router-link v-if="store.name" to="/dashboard">
          <Button size="sm" variant="secondary" class="font-bold border-2 border-primary/10">Mon Dashboard</Button>
        </router-link>
        <router-link to="/create-shop">
          <Button size="sm" variant="primary" class="font-extrabold shadow-lg shadow-primary/20">
            Créer ma boutique
          </Button>
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="md:hidden p-2 text-primary focus:outline-none" @click="toggleMenu">
        <component :is="isMenuOpen ? X : Menu" :size="28" />
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 space-y-6 animate-in slide-in-from-top duration-300">
      <div class="flex flex-col gap-4">
        <router-link to="/" class="text-lg font-bold text-primary" @click="isMenuOpen = false">Accueil</router-link>
        <router-link v-if="store.name" to="/dashboard" class="text-lg font-bold text-primary" @click="isMenuOpen = false">Mon Dashboard</router-link>
        <router-link to="/create-shop" class="text-lg font-bold text-primary" @click="isMenuOpen = false">Créer ma boutique</router-link>
      </div>
      <router-link to="/create-shop" @click="isMenuOpen = false">
        <Button size="lg" variant="primary" class="w-full">
          Lancer ma boutique
        </Button>
      </router-link>
    </div>
  </nav>
</template>
