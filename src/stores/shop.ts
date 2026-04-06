import { defineStore } from 'pinia';

export interface Product {
    id: string;
    name: string;
    price: number;
    discountPrice?: number | null;
    description?: string;
    category?: string;
    image?: string;
    inStock: boolean;
}

export interface ShopState {
    name: string;
    whatsapp: string;
    category: string;
    description: string;
    zone: string;
    logo: string;
    hours: string;
    deliveryModes: string[];
    paymentModes: string[];
    products: Product[];
    currentStep: number;
}

export const useShopStore = defineStore('shop', {
    state: (): ShopState => ({
        name: '',
        whatsapp: '',
        category: '',
        description: '',
        zone: '',
        logo: '',
        hours: '',
        deliveryModes: [],
        paymentModes: [],
        products: [],
        currentStep: 1,
    }),
    actions: {
        updateBasicInfo(info: Partial<ShopState>) {
            Object.assign(this, info);
        },
        addProduct(product: Product) {
            this.products.push(product);
        },
        removeProduct(id: string) {
            this.products = this.products.filter(p => p.id !== id);
        },
        toggleStock(id: string) {
            const product = this.products.find(p => p.id === id);
            if (product) product.inStock = !product.inStock;
        },
        setStep(step: number) {
            this.currentStep = step;
        },
        nextStep() {
            this.currentStep++;
        },
        prevStep() {
            this.currentStep--;
        }
    }
});
