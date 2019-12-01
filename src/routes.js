import Vue from 'vue';
import VueRouter from 'vue-router';
import vueDebounce from 'vue-debounce';

Vue.use(VueRouter);
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup']
})

import {store} from './store/index';
import boardContainer from './components/board-container';
import boardContainerArchive from './components/board-container-archive'
const routes = [
  {
		path: '',
		redirect: {name: 'allTasks'}
	},
	{
    name: 'allTasks',
		path: '/all',
		component: boardContainer,
  },
  {
    name: 'archivedTasks',
		path: '/archive',
		component: boardContainerArchive,
	}
];

export const router = new VueRouter({
	routes,
	mode: 'history'
});
