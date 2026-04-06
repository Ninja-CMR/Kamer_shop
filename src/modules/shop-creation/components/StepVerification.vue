<script setup lang="ts">
import { ref } from 'vue';
import { useShopStore } from '../../../stores/shop';
import { Smartphone, CheckCircle2, AlertCircle } from 'lucide-vue-next';

const store = useShopStore();
const code = ref('');
const error = ref('');

const sendCode = () => {
    store.sendVerificationCode();
};

const verify = () => {
    if (store.verifyCode(code.value)) {
        error.value = '';
    } else {
        error.value = 'Code pawa, vérifie bien mon frère.';
    }
};
</script>

<template>
  <div class="space-y-8 py-4">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-extrabold text-primary">Vérifie ton WhatsApp</h3>
      <p class="text-gray-500 font-normal">On veut être sûr que c'est bien ton numéro "vrai-vrai".</p>
    </div>

    <div class="max-w-sm mx-auto space-y-6">
        <!-- Phone Display -->
        <div class="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Smartphone :size="20" />
                </div>
                <div>
                    <p class="text-xs font-bold text-gray-400 uppercase">Numéro à vérifier</p>
                    <p class="font-extrabold text-primary">{{ store.whatsapp || '+237 XXXXXXXX' }}</p>
                </div>
            </div>
            <button 
                v-if="!store.verificationCodeSent"
                @click="sendCode"
                class="text-xs font-bold text-secondary hover:underline"
            >
                Envoyer le code
            </button>
        </div>

        <!-- Code Input -->
        <div v-if="store.verificationCodeSent && !store.isVerified" class="space-y-4">
            <div class="space-y-2 text-center">
                <label class="text-sm font-bold text-gray-700">Saisis le code reçu sur WhatsApp</label>
                <input 
                    v-model="code"
                    type="text" 
                    maxlength="4"
                    placeholder="X X X X"
                    class="w-full text-center text-3xl font-black tracking-[1em] py-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition-all"
                />
                <p v-if="error" class="text-xs font-bold text-red-500 flex items-center justify-center gap-1">
                    <AlertCircle :size="12" /> {{ error }}
                </p>
            </div>
            <button 
                @click="verify"
                class="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all"
            >
                Vérifier le numéro
            </button>
            <p class="text-center text-xs text-gray-400 font-normal">
                Pas reçu ? <button @click="sendCode" class="text-primary font-bold">Renvoyer</button>
            </p>
        </div>

        <!-- Success Message -->
        <div v-if="store.isVerified" class="bg-green-50 p-8 rounded-3xl text-center space-y-4 border border-green-100 animate-in fade-in zoom-in duration-300">
            <div class="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-200">
                <CheckCircle2 :size="32" />
            </div>
            <div>
                <h4 class="text-xl font-extrabold text-green-800">C'est gbich !</h4>
                <p class="text-sm text-green-600 font-normal mt-1">Ton numéro est vérifié. Tu es maintenant un vendeur certifié KamerShop.</p>
            </div>
        </div>
    </div>
    
    <div class="text-center">
        <p class="text-[10px] text-gray-400 uppercase font-bold tracking-widest italic opacity-50">Code de test par défaut : 1234</p>
    </div>
  </div>
</template>
