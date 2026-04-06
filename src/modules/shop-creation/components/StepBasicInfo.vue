<script setup lang="ts">
import { useShopStore } from '../../../stores/shop';

const store = useShopStore();

const categories = [
  'Restauration', 'Beauté', 'Mode', 'Électronique', 'Artisanat', 'Épicerie', 'Autre'
];
</script>

<template>
  <div class="space-y-6">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-extrabold text-primary">Infos de la boutique</h3>
      <p class="text-gray-500 font-normal">Ce qui identifie ton commerce au Cameroun.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Nom -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>🏪</span> Nom de la boutique <span class="text-red-500">*</span>
        </label>
        <input 
          v-model="store.name"
          type="text" 
          placeholder="Ex: Chez Mama Rose, Beauty by Sandra..."
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal"
        />
      </div>

      <!-- WhatsApp -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>📱</span> Numéro WhatsApp <span class="text-red-500">*</span>
        </label>
        <input 
          v-model="store.whatsapp"
          type="text" 
          placeholder="Ex: +237 6XX XXX XXX"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal"
        />
      </div>

      <!-- Catégorie -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>🏷️</span> Catégorie d'activité <span class="text-red-500">*</span>
        </label>
        <select 
          v-model="store.category"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal bg-white"
        >
          <option value="" disabled>Choisir une catégorie</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Zone -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>📍</span> Quartier / zone de vente
        </label>
        <input 
          v-model="store.zone"
          type="text" 
          placeholder="Ex: Bonamoussadi, Makepe, Logpom..."
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal"
        />
      </div>

      <!-- Horaires -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>🕐</span> Horaires d'ouverture
        </label>
        <input 
          v-model="store.hours"
          type="text" 
          placeholder="Ex: Lun–Sam 7h–20h"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal"
        />
      </div>

      <!-- Logo Mockup -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>🖼️</span> Photo / logo de boutique
        </label>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
             <span>+</span>
          </div>
          <span class="text-xs text-gray-400 font-normal italic">JPEG ou PNG accepté</span>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="space-y-2 pt-4">
      <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
        <span>📝</span> Description courte
      </label>
      <textarea 
        v-model="store.description"
        rows="2"
        placeholder="Ex: Ndolé, eru, poisson braisé. Livraison Bonamoussadi & Makepe tous les jours."
        class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal resize-none"
      ></textarea>
    </div>
  </div>
</template>
