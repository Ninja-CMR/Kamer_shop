import { computed } from 'vue';
import { useShopStore } from '../stores/shop';

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
                return true; // Sections are optional but recommended
            case 4:
                return store.deliveryModes.length > 0 && store.paymentModes.length > 0;
            case 5:
                return store.isVerified;
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
