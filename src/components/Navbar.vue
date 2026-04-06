<script setup lang="ts">
import { ref } from 'vue';
import { Store, Menu, X } from 'lucide-vue-next';
import Button from './Button.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const navLinks = [
  { name: 'Accueil', href: '#home' },
  { name: 'Pourquoi nous ?', href: '#why-us' },
  { name: 'Tarifs', href: '#pricing' },
];
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
        <a v-for="link in navLinks" :key="link.name" :href="link.href" class="text-sm font-normal text-gray-600 hover:text-primary transition-colors">
          {{ link.name }}
        </a>
      </div>
      
      <div class="hidden md:block">
        <Button size="sm" variant="primary">
          Créer ma boutique gratuite
        </Button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="md:hidden p-2 text-primary focus:outline-none" @click="toggleMenu">
        <component :is="isMenuOpen ? X : Menu" :size="28" />
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 space-y-6 animate-in slide-in-from-top duration-300">
      <div class="flex flex-col gap-4">
        <a 
          v-for="link in navLinks" 
          :key="link.name" 
          :href="link.href" 
          class="text-lg font-bold text-primary"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </a>
      </div>
      <Button size="lg" variant="primary" class="w-full">
        Créer ma boutique gratuite
      </Button>
    </div>
  </nav>
</template>
