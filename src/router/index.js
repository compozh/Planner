import Vue from 'vue'
import VueRouter from 'vue-router'
// Импорт компонентов
import app from '../components/App.vue'
import prodCard from '../components/prodCard.vue'
import prodList from '../components/prodList.vue'
import orders from '../components/orders.vue'
import test from '../components/test.vue'

Vue.use(VueRouter);

export default new VueRouter ({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: app
        },
        {
            path: '/orders',
            component: orders
        },
        {
            path: '/prodCard/:id',
            component: prodCard
        },
        {
            path: '/nomenclature',
            component: prodList
        },
        {
            path: '/auth',
            component: auth
        },
        {
            path: '/testing',
            component: test
        },
        {
            path: '*',
            component: {
                template: `<h1 style="color: darkred">Страница 404</h1>`
            }
        }
    ]
})