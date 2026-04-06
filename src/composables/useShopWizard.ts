import { computed } from 'vue';
import { useShopStore } from '../stores/shop';

export function useShopWizard() {
    const store = useShopStore();

    const isStepValid = computed(() => {
        switch (store.currentStep) {
            case 1:
                return store.name.trim().length > 2 && store.whatsapp.trim().length > 8;
            case 2:
                return store.products.length >= 0; // Allowing empty for now but can be stricter
            default:
                return true;
        }
    });

    const next = () => {
        if (isStepValid.value) {
            store.nextStep();
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
