<script setup lang="ts">
import testimonialImg from '../assets/temoignages/african-teenage-girl-portrait-happy-smiling-face (2).jpg';
</script>

<template>
  <section class="py-24 px-6 bg-white">
    <div class="max-w-4xl mx-auto text-center">
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full overflow-hidden mb-8 border-4 border-secondary shadow-lg">
          <img 
            :src="testimonialImg" 
            alt="Mme Ngano" 
            class="w-full h-full object-cover"
          />
        </div>
        
        <blockquote class="text-2xl md:text-3xl font-extrabold text-primary leading-tight mb-8 italic">
          "Avant, mon téléphone chauffait grave avec les centaines de photos. Mes clients adorent le catalogue et je gère mes livraisons tranquillement sans ndem."
        </blockquote>
        
        <cite class="not-italic">
          <h4 class="text-lg font-extrabold text-primary">Mme Ngano</h4>
          <p class="text-gray-500 font-normal">Vendeuse de pagnes à Marché Central</p>
        </cite>
      </div>
    </div>
  </section>
</template>
