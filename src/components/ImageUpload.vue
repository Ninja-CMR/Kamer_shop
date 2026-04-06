<script setup lang="ts">
import { ref } from 'vue';
import { Camera, X, Upload } from 'lucide-vue-next';

const props = defineProps<{
  modelValue?: string;
  label?: string;
  shape?: 'square' | 'circle' | 'rectangle';
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const preview = ref(props.modelValue || '');
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      preview.value = result;
      emit('update:modelValue', result);
    };
    reader.readAsDataURL(file);
  }
};

const triggerUpload = () => {
  fileInput.value?.click();
};

const removeImage = () => {
  preview.value = '';
  emit('update:modelValue', '');
};
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="text-xs font-bold text-gray-500 uppercase">{{ label }}</label>
    
    <div 
      @click="triggerUpload"
      class="relative group cursor-pointer overflow-hidden transition-all border-2 border-dashed flex items-center justify-center bg-gray-50 hover:bg-gray-100"
      :class="[
        shape === 'circle' ? 'rounded-full w-24 h-24 mx-auto' : 'rounded-2xl w-full h-40',
        preview ? 'border-transparent' : 'border-gray-200'
      ]"
    >
      <input 
        ref="fileInput"
        type="file" 
        accept="image/*" 
        class="hidden" 
        @change="handleFileChange"
      />

      <!-- Preview -->
      <img v-if="preview" :src="preview" class="w-full h-full object-cover" />
      
      <!-- Placeholder -->
      <div v-else class="text-center p-4">
        <Upload :size="24" class="mx-auto text-gray-400 group-hover:text-primary transition-colors" />
        <p class="text-[10px] font-bold text-gray-400 mt-2 uppercase">Choisir une photo</p>
      </div>

      <!-- Overlays -->
      <div v-if="preview" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Camera :size="24" class="text-white" />
      </div>

      <!-- Delete Button -->
      <button 
        v-if="preview"
        @click.stop="removeImage"
        class="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg text-red-500 hover:scale-110 transition-transform"
      >
        <X :size="14" />
      </button>
    </div>
  </div>
</template>
