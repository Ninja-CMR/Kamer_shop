import { defineStore } from 'pinia';
import { supabase } from '../lib/supabase';

export interface Product {
    id: string;
    name: string;
    price: number;
    discountPrice?: number | null;
    description?: string;
    category?: string;
    image?: string;
    inStock: boolean;
    clicks?: number;
}

export interface CartItem extends Product {
    quantity: number;
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
    stats: {
        totalSales: number;
        visitors: number;
    };
    cart: CartItem[];
    id?: string;
    loading: boolean;
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
        stats: {
            totalSales: 0,
            visitors: 0,
        },
        cart: [],
        id: undefined,
        loading: false,
    }),
    actions: {
        updateBasicInfo(info: Partial<ShopState>) {
            Object.assign(this, info);
        },
        incrementVisitors() {
            this.stats.visitors++;
        },
        trackClick(productId: string) {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                product.clicks = (product.clicks || 0) + 1;
                // Mock sales logic: 10% of clicks result in a sale for the totalSales stat
                if (Math.random() > 0.9) {
                    this.stats.totalSales += product.price;
                }
            }
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
        async removeProduct(id: string) {
            this.products = this.products.filter(p => p.id !== id);
            // Remove from sections too
            this.sections.forEach(s => {
                s.productIds = s.productIds.filter(pid => pid !== id);
            });

            if (this.id && id.length > 15) {
                await supabase.from('products').delete().eq('id', id);
            }
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
        async removeSection(id: string) {
            this.sections = this.sections.filter(s => s.id !== id);
            if (this.id && id.length > 15) {
                await supabase.from('sections').delete().eq('id', id);
            }
        },
        async toggleStock(id: string) {
            const product = this.products.find(p => p.id === id);
            if (product) {
                product.inStock = !product.inStock;
                await this.syncProduct(product);
            }
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
        },
        addToCart(product: Product) {
            const existing = this.cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(productId: string) {
            this.cart = this.cart.filter(item => item.id !== productId);
        },
        updateQuantity(productId: string, quantity: number) {
            const item = this.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
                if (item.quantity <= 0) {
                    this.removeFromCart(productId);
                }
            }
        },
        clearCart() {
            this.cart = [];
        },

        // Supabase Logic
        async fetchShop(slug?: string) {
            console.log('Fetching shop...', slug);
            this.loading = true;
            try {
                // For now, let's fetch by name or a fixed ID if we're test phase
                const { data: shops, error } = await supabase
                    .from('shops')
                    .select('*')
                    .limit(1);

                if (error) throw error;
                if (shops && shops.length > 0) {
                    const shop = shops[0];
                    this.id = shop.id;
                    this.name = shop.name;
                    this.whatsapp = shop.whatsapp;
                    this.description = shop.description;
                    this.logo = shop.logo;
                    this.zone = shop.zone;
                    this.hours = shop.hours;
                    this.deliveryModes = shop.delivery_modes || [];
                    this.paymentModes = shop.payment_modes || [];
                    this.stats.visitors = shop.visitors;

                    // Fetch Products
                    const { data: products } = await supabase
                        .from('products')
                        .select('*')
                        .eq('shop_id', this.id);

                    this.products = (products || []).map(p => ({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        discountPrice: p.discount_price,
                        description: p.description,
                        image: p.image,
                        inStock: p.in_stock,
                        clicks: p.order_count
                    }));

                    // Fetch Sections
                    const { data: sections } = await supabase
                        .from('sections')
                        .select('*')
                        .eq('shop_id', this.id);

                    this.sections = (sections || []).map(s => ({
                        id: s.id,
                        name: s.name,
                        description: s.description,
                        coverImage: s.cover_image,
                        productIds: s.product_ids || []
                    }));
                }
            } finally {
                this.loading = false;
            }
        },

        async saveShop() {
            if (!this.whatsapp || !this.name) return;

            this.loading = true;
            try {
                const shopData = {
                    name: this.name,
                    whatsapp: this.whatsapp,
                    description: this.description,
                    logo: this.logo,
                    zone: this.zone,
                    hours: this.hours,
                    delivery_modes: this.deliveryModes,
                    payment_modes: this.paymentModes,
                    visitors: this.stats.visitors
                };

                if (this.id) {
                    await supabase.from('shops').update(shopData).eq('id', this.id);
                } else {
                    const { data, error } = await supabase.from('shops').insert([shopData]).select();
                    if (error) throw error;
                    if (data) this.id = data[0].id;
                }
            } finally {
                this.loading = false;
            }
        },

        async syncProduct(product: Product) {
            if (!this.id) return;
            const pData = {
                shop_id: this.id,
                name: product.name,
                description: product.description,
                price: product.price,
                discount_price: product.discountPrice,
                image: product.image,
                in_stock: product.inStock,
                order_count: product.clicks || 0
            };

            // Check if product exists in DB (UUID check)
            if (product.id && product.id.length > 15) { // Simple UUID check
                await supabase.from('products').upsert({ id: product.id, ...pData });
            } else {
                const { data } = await supabase.from('products').insert([pData]).select();
                if (data) product.id = data[0].id;
            }
        },

        async syncSection(section: Section) {
            if (!this.id) return;
            const sData = {
                shop_id: this.id,
                name: section.name,
                description: section.description,
                cover_image: section.coverImage,
                product_ids: section.productIds
            };

            if (section.id && section.id.length > 15) {
                await supabase.from('sections').upsert({ id: section.id, ...sData });
            } else {
                const { data } = await supabase.from('sections').insert([sData]).select();
                if (data) section.id = data[0].id;
            }
        }
    }
});
