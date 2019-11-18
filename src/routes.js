import Vue from 'vue';
import VueRouter from 'vue-router';
import vueDebounce from 'vue-debounce';

Vue.use(VueRouter);
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup']
})

import {store} from './store/index';

const routes = [];

export const router = new VueRouter({
	routes,
	mode: 'history'
});
