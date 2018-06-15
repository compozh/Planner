import Vue from 'vue'
import router from './router'

import VueSocketIO from 'vue-socket.io';
Vue.use(VueSocketIO, 'http://localhost:3000');

import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// Импорт компонентов
import navbar from './components/navbar.vue'

Vue.use(BootstrapVue);

new Vue ({
  el: '#app',
    router,
    components: {
        navbar
    },
    methods: {

    }
});
