import { defineStore } from 'pinia';
import { supabase } from '../lib/supabase';

const safeParse = (val: string | null, fallback: any) => {
    try {
        return val ? JSON.parse(val) : fallback;
    } catch {
        return fallback;
    }
};

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
    slug?: string;
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
        deliveryModes: safeParse(localStorage.getItem('ks_delivery_modes'), []),
        paymentModes: safeParse(localStorage.getItem('ks_payment_modes'), []),
        products: safeParse(localStorage.getItem('ks_products'), []),
        sections: safeParse(localStorage.getItem('ks_sections'), []),
        currentStep: parseInt(localStorage.getItem('ks_current_step') || '1'),
        isVerified: false,
        verificationCodeSent: false,
        stats: {
            totalSales: 0,
            visitors: 0,
        },
        cart: [],
        id: localStorage.getItem('ks_active_shop_id') || undefined,
        slug: undefined,
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
            localStorage.setItem('ks_products', JSON.stringify(this.products));
            this.syncProduct(product);
        },
        updateProduct(product: Product) {
            const index = this.products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                this.products[index] = product;
                localStorage.setItem('ks_products', JSON.stringify(this.products));
                this.syncProduct(product);
            }
        },
        async removeProduct(id: string) {
            this.products = this.products.filter(p => p.id !== id);
            localStorage.setItem('ks_products', JSON.stringify(this.products));
            // Remove from sections too
            this.sections.forEach(s => {
                s.productIds = s.productIds.filter(pid => pid !== id);
            });
            localStorage.setItem('ks_sections', JSON.stringify(this.sections));

            if (this.id && id.length > 15) {
                await supabase.from('products').delete().eq('id', id);
            }
        },
        addSection(section: Section) {
            this.sections.push(section);
            localStorage.setItem('ks_sections', JSON.stringify(this.sections));
            this.syncSection(section);
        },
        updateSection(section: Section) {
            const index = this.sections.findIndex(s => s.id === section.id);
            if (index !== -1) {
                this.sections[index] = section;
                localStorage.setItem('ks_sections', JSON.stringify(this.sections));
                this.syncSection(section);
            }
        },
        async removeSection(id: string) {
            this.sections = this.sections.filter(s => s.id !== id);
            localStorage.setItem('ks_sections', JSON.stringify(this.sections));
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
            localStorage.setItem('ks_current_step', step.toString());
        },
        nextStep() {
            this.currentStep++;
            localStorage.setItem('ks_current_step', this.currentStep.toString());
        },
        prevStep() {
            this.currentStep--;
            localStorage.setItem('ks_current_step', this.currentStep.toString());
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
                let query = supabase.from('shops').select('*');

                const storedId = localStorage.getItem('ks_active_shop_id');

                if (slug) {
                    query = query.eq('slug', slug);
                } else if (this.id) {
                    query = query.eq('id', this.id);
                } else if (storedId) {
                    query = query.eq('id', storedId);
                } else {
                    query = query.limit(1); // Final fallback for testing
                }

                const { data: shops, error } = await query;

                if (error) throw error;
                if (shops && shops.length > 0) {
                    const shop = shops[0];
                    console.log('Shop found:', shop.name, shop.id);
                    this.id = shop.id;
                    this.slug = shop.slug;
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
                    console.log('Fetching products for shop:', this.id);
                    const { data: products } = await supabase
                        .from('products')
                        .select('*')
                        .eq('shop_id', this.id);

                    if (products) {
                        this.products = products.map(p => ({
                            id: p.id,
                            name: p.name,
                            price: p.price,
                            discountPrice: p.discount_price,
                            description: p.description,
                            image: p.image,
                            inStock: p.in_stock,
                            clicks: p.order_count
                        }));
                    }

                    // Fetch Sections
                    const { data: sections } = await supabase
                        .from('sections')
                        .select('*')
                        .eq('shop_id', this.id);

                    if (sections) {
                        this.sections = sections.map(s => ({
                            id: s.id,
                            name: s.name,
                            description: s.description,
                            coverImage: s.cover_image,
                            productIds: s.product_ids || []
                        }));
                    }

                    // Sync to local storage
                    localStorage.setItem('ks_products', JSON.stringify(this.products));
                    localStorage.setItem('ks_sections', JSON.stringify(this.sections));
                    localStorage.setItem('ks_delivery_modes', JSON.stringify(this.deliveryModes));
                    localStorage.setItem('ks_payment_modes', JSON.stringify(this.paymentModes));
                    localStorage.setItem('ks_active_shop_id', this.id!);
                } else {
                    console.warn('No shop found matching query');
                }
            } finally {
                this.loading = false;
            }
        },

        async saveShop() {
            if (!this.whatsapp || !this.name) return;

            // Generate slug if missing
            if (!this.slug) {
                this.slug = this.name.toLowerCase().trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            }

            this.loading = true;
            try {
                const shopData = {
                    name: this.name,
                    slug: this.slug,
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
                    localStorage.setItem('ks_active_shop_id', this.id);
                } else {
                    const { data, error } = await supabase.from('shops').insert([shopData]).select();
                    if (error) throw error;
                    if (data) {
                        this.id = data[0].id;
                        localStorage.setItem('ks_active_shop_id', this.id!);

                        // Sync existing products/sections now that we have an active shop ID
                        for (const p of this.products) {
                            await this.syncProduct(p);
                        }
                        for (const s of this.sections) {
                            await this.syncSection(s);
                        }
                    }
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
