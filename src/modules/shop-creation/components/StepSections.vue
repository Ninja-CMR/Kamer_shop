<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Trash2, Folder, Image as ImageIcon, Check } from 'lucide-vue-next';
import { useShopStore, type Section } from '../../../stores/shop';
import ImageUpload from '../../../components/ImageUpload.vue';

const store = useShopStore();
const showModal = ref(false);
const editingSection = ref<Partial<Section> | null>(null);

const openModal = (section?: Section) => {
  editingSection.value = section ? { ...section } : {
    id: Date.now().toString(),
    name: '',
    description: '',
    coverImage: '',
    productIds: []
  };
  showModal.value = true;
};

const saveSection = () => {
  if (editingSection.value && editingSection.value.name) {
    const s = editingSection.value as Section;
    const exists = store.sections.find(item => item.id === s.id);
    if (exists) {
      store.updateSection(s);
    } else {
      store.addSection(s);
    }
    showModal.value = false;
  }
};

const toggleProductInSection = (productId: string) => {
  if (!editingSection.value) return;
  const index = editingSection.value.productIds!.indexOf(productId);
  if (index === -1) {
    editingSection.value.productIds!.push(productId);
  } else {
    editingSection.value.productIds!.splice(index, 1);
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-extrabold text-primary">Tes Blocs de Produits</h3>
      <p class="text-gray-500 font-normal">Groupe tes produits par catégorie (ex: iPhones, Robes, Services...).</p>
    </div>

    <!-- Section List -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="section in store.sections" 
        :key="section.id"
        class="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:border-primary/30 transition-all group"
      >
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
            <img v-if="section.coverImage" :src="section.coverImage" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
              <ImageIcon :size="24" />
            </div>
          </div>
          <div class="flex-grow">
            <h4 class="font-bold text-primary">{{ section.name }}</h4>
            <p class="text-xs text-gray-500 line-clamp-1 italic">{{ section.description || 'Aucune description' }}</p>
            <p class="text-[10px] font-black text-secondary uppercase mt-1">{{ section.productIds.length }} Produits liés</p>
          </div>
          <div class="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click="openModal(section)" class="text-primary p-1.5 hover:bg-gray-50 rounded-lg">
              <Folder :size="16" />
            </button>
            <button @click="store.removeSection(section.id)" class="text-red-500 p-1.5 hover:bg-red-50 rounded-lg">
              <Trash2 :size="16" />
            </button>
          </div>
        </div>
      </div>

      <!-- Add Button -->
      <button 
        @click="openModal()"
        class="border-2 border-dashed border-gray-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-all bg-gray-50/50"
      >
        <Plus :size="32" />
        <span class="font-bold uppercase tracking-wider text-[10px]">Ajouter un bloc</span>
      </button>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
        <div class="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div class="p-8 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-2xl font-black text-primary">{{ editingSection?.id ? 'Modifier le bloc' : 'Nouveau bloc' }}</h3>
            <button @click="showModal = false" class="p-2 hover:bg-gray-100 rounded-full transition-all">
              <X :size="24" />
            </button>
          </div>

          <div class="p-8 space-y-6 overflow-y-auto custom-scrollbar">
            <ImageUpload v-model="editingSection!.coverImage" label="Photo de couverture du bloc" />

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-500 uppercase">Nom du bloc (ex: Collection Été)</label>
                <input 
                  v-model="editingSection!.name" 
                  type="text"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-bold"
                  placeholder="Appareils photo, Robes..."
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-500 uppercase">Description courte</label>
                <textarea 
                  v-model="editingSection!.description"
                  rows="2"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-normal"
                  placeholder="Une petite phrase pour chauffer les clients..."
                ></textarea>
              </div>
            </div>

            <!-- Product Selection -->
            <div class="space-y-3">
               <label class="text-xs font-bold text-gray-500 uppercase">Lier des produits à ce bloc</label>
               <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button 
                    v-for="p in store.products" 
                    :key="p.id"
                    @click="toggleProductInSection(p.id)"
                    class="flex items-center gap-3 p-3 rounded-xl border transition-all text-left"
                    :class="[editingSection!.productIds!.includes(p.id) ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-300']"
                  >
                    <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <img v-if="p.image" :src="p.image" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-grow min-w-0">
                      <p class="font-bold text-xs truncate">{{ p.name }}</p>
                      <p class="text-[10px] font-bold text-secondary">{{ p.price }} FCFA</p>
                    </div>
                    <Check v-if="editingSection!.productIds!.includes(p.id)" :size="16" />
                  </button>
               </div>
               <div v-if="store.products.length === 0" class="text-center py-4 text-gray-400 italic text-sm">
                  Ajoute d'abord des produits dans l'étape précédente.
               </div>
            </div>
          </div>

          <div class="p-8 bg-gray-50 flex gap-4">
             <button @click="showModal = false" class="flex-grow py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all">Annuler</button>
             <button @click="saveSection" class="flex-grow py-4 rounded-2xl font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
               Confirmer
             </button>
          </div>
        </div>
      </div>
    </Teleport>
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
