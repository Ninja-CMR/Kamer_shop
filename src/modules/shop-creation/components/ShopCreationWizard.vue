<script setup lang="ts">
import { useShopWizard } from '../../../composables/useShopWizard';
import StepBasicInfo from './StepBasicInfo.vue';
import StepProducts from './StepProducts.vue';
import StepOptions from './StepOptions.vue';
import StepVerification from './StepVerification.vue';
import StepPreview from './StepPreview.vue';
import Button from '../../../components/Button.vue';
import { useRouter } from 'vue-router';

const { store, isStepValid, next, prev } = useShopWizard();
const router = useRouter();

const submit = () => {
  router.push('/dashboard');
};
</script>

<template>
  <div class="max-w-3xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100">
    <!-- Progress Indicator -->
    <div class="flex justify-between mb-12 relative px-4">
      <div class="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2"></div>
      <div 
        class="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500"
        :style="{ width: `${(store.currentStep - 1) * 25}%` }"
      ></div>
      
      <div 
        v-for="i in 5" 
        :key="i"
        class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500"
        :class="[store.currentStep >= i ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-400']"
      >
        {{ i }}
      </div>
    </div>

    <!-- Step Content -->
    <div class="min-h-[450px]">
      <StepBasicInfo v-if="store.currentStep === 1" />
      <StepProducts v-if="store.currentStep === 2" />
      <StepOptions v-if="store.currentStep === 3" />
      <StepVerification v-if="store.currentStep === 4" />
      <StepPreview v-if="store.currentStep === 5" />
    </div>

    <!-- Navigation Buttons -->
    <div class="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
      <button 
        v-if="store.currentStep > 1"
        @click="prev"
        class="text-gray-500 font-bold hover:text-primary transition-colors"
      >
        Retour
      </button>
      <div v-else></div>

      <Button 
        v-if="store.currentStep < 5"
        @click="next"
        variant="primary"
        size="lg"
        class="min-w-[150px]"
        :disabled="!isStepValid"
        :class="[!isStepValid ? 'opacity-50 cursor-not-allowed grayscale' : '']"
      >
        Continuer
      </Button>
      
      <Button 
        v-else
        @click="submit"
        variant="secondary"
        size="lg"
        class="min-w-[150px]"
      >
        Accéder au Dashboard
      </Button>
    </div>
  </div>
</template>
