<script setup lang="ts">
import { ref } from 'vue';
import { useShopStore, type Product } from '../stores/shop';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Plus, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Share2,
  Pencil,
  Trash2,
} from 'lucide-vue-next';
import ImageUpload from '../components/ImageUpload.vue';
import Button from '../components/Button.vue';

const store = useShopStore();
const activeTab = ref('products'); // 'overview', 'products', 'settings'

// Product Form Modal state
const showProductModal = ref(false);
const editingProduct = ref<Partial<Product> | null>(null);

const openProductModal = (product?: Product) => {
  editingProduct.value = product ? { ...product } : {
    id: Date.now().toString(),
    name: '',
    price: 0,
    discountPrice: null,
    description: '',
    category: '',
    inStock: true,
    image: ''
  };
  showProductModal.value = true;
};

const saveProduct = () => {
  if (editingProduct.value) {
    const p = editingProduct.value as Product;
    const exists = store.products.find(item => item.id === p.id);
    if (exists) {
      store.updateProduct(p);
    } else {
      store.addProduct(p);
    }
    showProductModal.value = false;
  }
};

const shareShop = () => {
    const text = `Vient voir ma boutique ${store.name} sur KamerShop ! 🇨🇲`;
    const url = window.location.origin + '/shop/' + store.name.replace(/\s+/g, '-').toLowerCase();
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div class="p-8">
        <h2 class="text-2xl font-black text-primary italic">KamerShop<span class="text-secondary text-xs not-italic ml-1">Pro</span></h2>
      </div>
      
      <nav class="flex-grow px-4 space-y-2">
        <button 
          v-for="item in [
            { id: 'overview', label: 'Résumé de la go', icon: LayoutDashboard },
            { id: 'products', label: 'Mes Produits', icon: Package },
            { id: 'settings', label: 'Ma Boutique', icon: Settings }
          ]"
          :key="item.id"
          @click="activeTab = item.id"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all"
          :class="[activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-100']"
        >
          <component :is="item.icon" :size="20" />
          {{ item.label }}
        </button>
      </nav>

      <div class="p-6 border-t border-gray-100">
        <div class="bg-primary/5 p-4 rounded-2xl">
            <p class="text-[10px] font-black text-primary uppercase">Statut</p>
            <div class="flex items-center gap-2 mt-1">
                <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p class="text-sm font-bold text-primary">En ligne</p>
            </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow">
      <!-- Top Bar -->
      <header class="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8">
        <div class="flex items-center gap-4">
            <h1 class="text-xl font-extrabold text-primary">{{ 
              activeTab === 'overview' ? 'Résumé de la go' : 
              activeTab === 'products' ? 'Catalogue Produits' : 'Configuration' 
            }}</h1>
        </div>

        <div class="flex items-center gap-4">
            <button 
                @click="shareShop"
                class="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-primary rounded-xl font-bold text-sm hover:bg-secondary/20 transition-all"
            >
                <Share2 :size="16" /> Partager
            </button>
            <div class="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                <img v-if="store.logo" :src="store.logo" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-primary font-bold">
                    {{ store.name?.charAt(0) }}
                </div>
            </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="p-8">
        <!-- Dashboard Overview -->
        <div v-if="activeTab === 'overview'" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-gray-400 uppercase">Vues de la boutique</p>
                        <h3 class="text-3xl font-black text-primary mt-1">1,204</h3>
                        <p class="text-[10px] text-green-500 font-bold mt-1">+12% cette semaine</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                        <TrendingUp :size="24" />
                    </div>
                </div>
                <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-gray-400 uppercase">Commandes WhatsApp</p>
                        <h3 class="text-3xl font-black text-primary mt-1">86</h3>
                        <p class="text-[10px] text-primary font-bold mt-1">Gbich ! Ça chauffe</p>
                    </div>
                    <div class="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                        <ShoppingBag :size="24" />
                    </div>
                </div>
                <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-gray-400 uppercase">Clients fidèles</p>
                        <h3 class="text-3xl font-black text-primary mt-1">42</h3>
                    </div>
                    <div class="w-12 h-12 bg-secondary/10 text-primary rounded-2xl flex items-center justify-center">
                        <Users :size="24" />
                    </div>
                </div>
            </div>

            <!-- Recent Prods -->
            <div class="bg-white rounded-[2.5rem] border border-gray-100 p-8">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-xl font-extrabold text-primary">Tes Tops Produits</h3>
                    <button @click="activeTab = 'products'" class="text-primary font-bold text-sm">Voir tout</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="p in store.products.slice(0, 4)" :key="p.id" class="space-y-3">
                        <div class="aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 relative">
                            <img v-if="p.image" :src="p.image" class="w-full h-full object-cover" />
                            <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                                <Package :size="32" />
                            </div>
                            <div v-if="p.discountPrice" class="absolute top-2 right-2 bg-secondary text-primary text-[10px] font-black px-2 py-1 rounded-lg">PROMO</div>
                        </div>
                        <div>
                            <p class="font-bold text-primary truncate">{{ p.name }}</p>
                            <p class="text-xs font-bold text-secondary">{{ p.price }} FCFA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Product Management -->
        <div v-if="activeTab === 'products'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h2 class="text-2xl font-black text-primary">Gère ta marchandise</h2>
                    <p class="text-gray-500 text-sm font-normal">Ajoute, modifie ou supprime tes articles en un clic.</p>
                </div>
                <Button @click="openProductModal()" class="w-full sm:w-auto flex items-center gap-2">
                    <Plus :size="20" /> Nouveau Produit
                </Button>
            </div>

            <div class="grid grid-cols-1 gap-4">
                <div v-if="store.products.length === 0" class="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
                    <Package :size="64" class="mx-auto text-gray-200 mb-4" />
                    <h4 class="text-xl font-extrabold text-gray-400">Ton catalogue est vide</h4>
                    <p class="text-gray-400 font-normal">Chauffe le marché en ajoutant tes premiers produits !</p>
                </div>

                <div 
                    v-for="p in store.products" 
                    :key="p.id"
                    class="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-6 group"
                >
                    <div class="w-20 h-20 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                        <img v-if="p.image" :src="p.image" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-200">
                             <Package :size="24" />
                        </div>
                    </div>
                    
                    <div class="flex-grow">
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-lg text-primary">{{ p.name }}</h4>
                            <span v-if="p.category" class="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-black uppercase">{{ p.category }}</span>
                        </div>
                        <div class="flex items-center gap-3 mt-1">
                            <span class="text-secondary font-black">{{ p.price }} FCFA</span>
                            <span v-if="p.discountPrice" class="text-xs text-gray-400 line-through">{{ p.discountPrice }} FCFA</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            @click="openProductModal(p)"
                            class="p-2 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 transition-colors"
                        >
                            <Pencil :size="18" />
                        </button>
                        <button 
                            @click="store.removeProduct(p.id)"
                            class="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                        >
                            <Trash2 :size="18" />
                        </button>
                    </div>

                    <div class="hidden sm:block">
                        <button 
                            @click="store.toggleStock(p.id)"
                            class="px-4 py-2 rounded-xl text-xs font-black uppercase transition-all"
                            :class="[p.inStock ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100']"
                        >
                            {{ p.inStock ? 'Disponible' : 'Épuisé' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Settings -->
        <div v-if="activeTab === 'settings'" class="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="bg-white rounded-[3rem] border border-gray-100 p-10 space-y-8">
                <div>
                   <h2 class="text-2xl font-black text-primary">Configuration Boutique</h2>
                   <p class="text-gray-500 text-sm font-normal">Modifie tes infos visibles par les clients.</p>
                </div>

                <ImageUpload 
                    v-model="store.logo"
                    label="Ton Logo / Photo de profil"
                    shape="circle"
                />

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-gray-500 uppercase">Nom de la boutique</label>
                        <input v-model="store.name" class="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-100 font-bold outline-none focus:border-primary" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-gray-500 uppercase">Numéro WhatsApp</label>
                        <input v-model="store.whatsapp" class="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-100 font-bold outline-none focus:border-primary" />
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-xs font-bold text-gray-500 uppercase">Zone de livraison</label>
                    <input v-model="store.zone" class="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-100 font-bold outline-none focus:border-primary" />
                </div>

                <div class="space-y-2">
                    <label class="text-xs font-bold text-gray-500 uppercase">Description</label>
                    <textarea v-model="store.description" rows="3" class="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-100 font-normal outline-none focus:border-primary resize-none"></textarea>
                </div>

                <Button variant="primary" class="w-full py-4 text-lg">Enregistrer les changements</Button>
            </div>
        </div>
      </div>
    </main>

    <!-- Product Modal -->
    <div v-if="showProductModal" class="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/20">
        <div class="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div class="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 class="text-xl font-extrabold text-primary">{{ editingProduct?.name ? 'Modifier le produit' : 'Nouveau Produit' }}</h3>
                <button @click="showProductModal = false" class="p-2 hover:bg-gray-200 rounded-full transition-all"><Trash2 :size="20" class="rotate-45" /></button>
            </div>
            
            <div class="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <ImageUpload v-model="editingProduct!.image" label="Photo de l'article" />
                
                <div class="space-y-4">
                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-gray-400 uppercase">Nom de l'article *</label>
                        <input v-model="editingProduct!.name" class="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none focus:border-primary font-bold" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-gray-400 uppercase">Prix *</label>
                            <input v-model.number="editingProduct!.price" type="number" class="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none focus:border-primary font-bold" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-gray-400 uppercase">Ancien Prix (Promo)</label>
                            <input v-model.number="editingProduct!.discountPrice" type="number" class="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none focus:border-primary font-bold italic opacity-60" />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-gray-400 uppercase">Catégorie</label>
                        <input v-model="editingProduct!.category" class="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none focus:border-primary font-bold" />
                    </div>

                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-gray-400 uppercase">Détails / Description</label>
                        <textarea v-model="editingProduct!.description" rows="2" class="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none focus:border-primary font-normal resize-none"></textarea>
                    </div>

                    <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                        <input type="checkbox" v-model="editingProduct!.inStock" class="w-5 h-5 accent-primary" />
                        <label class="font-bold text-primary">En Stock (Affiché dans la boutique)</label>
                    </div>
                </div>
            </div>

            <div class="p-8 bg-gray-50 flex gap-4">
                <Button @click="showProductModal = false" variant="secondary" class="flex-grow">Annuler</Button>
                <Button @click="saveProduct" variant="primary" class="flex-grow">Sauvegarder</Button>
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
</style>
