import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreateShopView from '../views/CreateShopView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/create-shop',
        name: 'CreateShop',
        component: CreateShopView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;
