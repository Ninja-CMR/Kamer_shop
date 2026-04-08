import { computed } from 'vue';
import { useShopStore } from '../stores/shop';

export const TOTAL_STEPS = 5;

export function useShopWizard() {
    const store = useShopStore();

    const isStepValid = computed(() => {
        switch (store.currentStep) {
            case 1:
                return store.name.trim().length > 2 &&
                    store.whatsapp.trim().length > 8 &&
                    store.category !== '' &&
                    store.description !== '' &&
                    store.zone !== '';
            case 2:
                return store.products.length >= 1;
            case 3:
                return true; // Verification step
            case 4:
                return true; // Preview step
            case 5:
                return store.isVerified;
            default:
                return true;
        }
    });

    const next = async () => {
        if (isStepValid.value) {
            store.nextStep();
            // Auto-save to Supabase as we progress
            if (store.currentStep > 1) {
                await store.saveShop();
            }
        }
    };

    const prev = () => {
        store.prevStep();
    };

    return {
        store,
        isStepValid,
        next,
        prev,
    };
}
