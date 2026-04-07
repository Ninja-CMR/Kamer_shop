<script setup lang="ts">
import { ref, watch } from 'vue';
import { Camera, Trash2, Upload, Check } from 'lucide-vue-next';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps<{
  modelValue?: string;
  label?: string;
  shape?: 'square' | 'circle' | 'rectangle';
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const preview = ref(props.modelValue || '');
const showCropper = ref(false);
const rawImage = ref('');
const fileInput = ref<HTMLInputElement | null>(null);
const cropperRef = ref<any>(null);
const isFreeCrop = ref(false);

watch(() => props.modelValue, (newVal) => {
  preview.value = newVal || '';
});

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      rawImage.value = event.target?.result as string;
      showCropper.value = true;
    };
    reader.readAsDataURL(file);
  }
};

const triggerUpload = () => {
  fileInput.value?.click();
};

const cropImage = () => {
  if (cropperRef.value) {
    const { canvas } = cropperRef.value.getResult();
    if (canvas) {
      const cropped = canvas.toDataURL();
      preview.value = cropped;
      emit('update:modelValue', cropped);
      showCropper.value = false;
    }
  }
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
      <div v-if="preview" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
        <Camera :size="shape === 'circle' ? 32 : 24" class="text-white mb-1" />
        <p v-if="shape === 'circle'" class="text-[8px] text-white font-black uppercase">Modifier</p>
      </div>

      <!-- Delete Button -->
      <button 
        v-if="preview"
        @click.stop="removeImage"
        class="absolute p-2 bg-white rounded-full shadow-xl text-red-500 hover:scale-110 transition-all z-10"
        :class="[shape === 'circle' ? 'bottom-0 right-0 border-2 border-white' : 'top-2 right-2 shadow-lg']"
      >
        <Trash2 :size="14" />
      </button>
    </div>

    <!-- Cropping Modal -->
    <Teleport to="body">
      <div v-if="showCropper" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm">
        <div class="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden flex flex-col max-h-[90vh]">
          <div class="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-xl font-extrabold text-primary">Cadre ta photo</h3>
            <button @click="showCropper = false" class="p-2 hover:bg-gray-100 rounded-full transition-all">
              <X :size="20" />
            </button>
          </div>
          
          <div class="flex-grow overflow-hidden bg-gray-900 flex items-center justify-center">
            <Cropper
              ref="cropperRef"
              :src="rawImage"
              :stencil-props="{
                aspectRatio: isFreeCrop ? 0 : (shape === 'circle' || shape === 'square' ? 1/1 : 16/9),
              }"
              class="w-full h-full"
            />
          </div>

          <div class="p-6 bg-gray-50 flex items-center gap-4">
            <button 
              @click="isFreeCrop = !isFreeCrop"
              class="px-4 py-3 rounded-xl font-bold border-2 transition-all flex items-center gap-2"
              :class="[isFreeCrop ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-gray-100 text-gray-400']"
            >
              {{ isFreeCrop ? 'Ratio Libre' : 'Ratio Fixe' }}
            </button>
            <div class="flex-grow"></div>
            <button 
              @click="showCropper = false" 
              class="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all font-black text-xs uppercase"
            >
              Annuler
            </button>
            <button 
              @click="cropImage" 
              class="px-10 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Check :size="20" /> Valider
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.cropper {
	height: 600px;
	width: 600px;
	background: #DDD;
}
</style>
