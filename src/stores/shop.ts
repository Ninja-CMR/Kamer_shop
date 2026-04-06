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

export interface Section {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    productIds: string[];
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
    sections: Section[];
    currentStep: number;
    isVerified: boolean;
    verificationCodeSent: boolean;
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
        sections: [],
        currentStep: 1,
        isVerified: false,
        verificationCodeSent: false,
    }),
    actions: {
        updateBasicInfo(info: Partial<ShopState>) {
            Object.assign(this, info);
        },
        addProduct(product: Product) {
            this.products.push(product);
        },
        updateProduct(product: Product) {
            const index = this.products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                this.products[index] = product;
            }
        },
        removeProduct(id: string) {
            this.products = this.products.filter(p => p.id !== id);
            // Remove from sections too
            this.sections.forEach(s => {
                s.productIds = s.productIds.filter(pid => pid !== id);
            });
        },
        addSection(section: Section) {
            this.sections.push(section);
        },
        updateSection(section: Section) {
            const index = this.sections.findIndex(s => s.id === section.id);
            if (index !== -1) {
                this.sections[index] = section;
            }
        },
        removeSection(id: string) {
            this.sections = this.sections.filter(s => s.id !== id);
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
        },
        sendVerificationCode() {
            this.verificationCodeSent = true;
            // Mock sending code
            console.log('Code envoyé au ' + this.whatsapp);
        },
        verifyCode(code: string) {
            if (code === '1234') { // Mock logic
                this.isVerified = true;
                return true;
            }
            return false;
        }
    }
});
