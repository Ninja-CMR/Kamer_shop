<script setup lang="ts">
import { LayoutDashboard, Package, Settings, ShoppingBag, Folder } from 'lucide-vue-next';
import { useShopStore } from '../stores/shop';

const props = defineProps<{
    activeTab: string;
}>();

const emit = defineEmits(['update:activeTab']);

const store = useShopStore();

const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Stock', icon: Package },
    { id: 'sections', label: 'Blocs', icon: Folder },
    { id: 'settings', label: 'Réglages', icon: Settings }
];

const visitShop = () => {
    const url = '/shop/' + store.name.replace(/\s+/g, '-').toLowerCase();
    window.open(url, '_blank');
};
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-4 py-3 flex items-center justify-around z-50 sm:hidden pb-safe">
    <button 
        v-for="item in navItems" 
        :key="item.id"
        @click="emit('update:activeTab', item.id)"
        class="flex flex-col items-center gap-1 transition-all"
        :class="[activeTab === item.id ? 'text-primary scale-110' : 'text-gray-400']"
    >
        <component :is="item.icon" :size="20" :stroke-width="activeTab === item.id ? 3 : 2" />
        <span class="text-[9px] font-black uppercase tracking-tight">{{ item.label }}</span>
    </button>
    
    <button @click="visitShop" class="flex flex-col items-center gap-1 text-secondary">
        <div class="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-secondary/20 -mt-8 border-4 border-white">
            <ShoppingBag :size="20" :stroke-width="3" />
        </div>
        <span class="text-[9px] font-black uppercase tracking-tight">Ma Gousse</span>
    </button>
  </nav>
</template>

<style scoped>
.pb-safe {
    padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
}
</style>
