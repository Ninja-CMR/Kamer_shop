<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Trash2, Package, Tag, ShoppingBag } from 'lucide-vue-next';
import { useShopStore, type Product } from '../../../stores/shop';

const store = useShopStore();
const newProduct = ref<Partial<Product>>({
  name: '',
  price: 0,
  discountPrice: null,
  description: '',
  category: '',
  inStock: true
});

const addProduct = () => {
  if (newProduct.value.name && (newProduct.value.price || 0) > 0) {
    store.addProduct({
      id: Date.now().toString(),
      name: newProduct.value.name!,
      price: newProduct.value.price!,
      discountPrice: newProduct.value.discountPrice,
      description: newProduct.value.description,
      category: newProduct.value.category,
      inStock: true
    });
    newProduct.value = { 
      name: '', 
      price: 0, 
      discountPrice: null, 
      description: '', 
      category: '', 
      inStock: true 
    };
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-extrabold text-primary">Tes produits</h3>
      <p class="text-gray-500 font-normal">Ajoute au moins 1 produit pour ouvrir ta boutique.</p>
    </div>

    <!-- Add Product Form -->
    <div class="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Nom -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
            <ShoppingBag :size="12" /> Nom du produit *
          </label>
          <input 
            v-model="newProduct.name"
            type="text" 
            placeholder="Ex: Ndolé spécial, Robe pagne..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-normal focus:border-primary"
          />
        </div>
        
        <!-- Prix -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
            <Tag :size="12" /> Prix (FCFA) *
          </label>
          <div class="flex gap-2">
            <input 
              v-model.number="newProduct.price"
              type="number" 
              placeholder="Prix"
              class="w-1/2 px-4 py-3 rounded-xl border border-gray-200 outline-none font-normal focus:border-primary"
            />
            <input 
              v-model.number="newProduct.discountPrice"
              type="number" 
              placeholder="Prix barré"
              class="w-1/2 px-4 py-3 rounded-xl border border-gray-200 outline-none font-normal focus:border-primary italic opacity-60"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Catégorie -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase">Catégorie du produit</label>
          <input 
            v-model="newProduct.category"
            type="text" 
            placeholder="Ex: Plats, Boissons..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-normal focus:border-primary"
          />
        </div>
        
        <!-- Description -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase">Description / Détails</label>
          <input 
            v-model="newProduct.description"
            type="text" 
            placeholder="Taille, ingrédients..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-normal focus:border-primary"
          />
        </div>
      </div>

      <button 
        @click="addProduct"
        class="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all transform active:scale-95 shadow-lg shadow-primary/10"
      >
        <Plus :size="20" />
        Ajouter à mon catalogue
      </button>
    </div>

    <!-- Product List -->
    <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
      <div v-if="store.products.length === 0" class="text-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-[2rem]">
        <Package :size="48" class="mx-auto mb-4 opacity-20" />
        <p class="font-normal italic">Aucun produit ajouté pour l'instant.</p>
      </div>
      
      <div 
        v-for="product in store.products" 
        :key="product.id"
        class="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary/30 transition-colors group"
      >
        <div class="flex-grow">
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-primary">{{ product.name }}</h4>
            <span v-if="product.category" class="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-bold uppercase">{{ product.category }}</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span class="font-extrabold text-secondary">{{ product.price }} FCFA</span>
            <span v-if="product.discountPrice" class="text-xs text-gray-400 line-through">{{ product.discountPrice }} FCFA</span>
          </div>
          <p v-if="product.description" class="text-xs text-gray-500 mt-1 line-clamp-1 italic">{{ product.description }}</p>
        </div>
        
        <div class="flex items-center gap-3">
          <!-- Toggle Stock -->
          <button 
            @click="store.toggleStock(product.id)"
            class="px-3 py-1 rounded-full text-[10px] font-bold border transition-colors"
            :class="[product.inStock ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600']"
          >
            {{ product.inStock ? 'En Stock' : 'Épuisé' }}
          </button>
          
          <button @click="store.removeProduct(product.id)" class="text-gray-300 p-2 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all group-hover:text-gray-500">
            <Trash2 :size="18" />
          </button>
        </div>
      </div>
    </div>
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
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
</style>
