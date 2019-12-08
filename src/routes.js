import Vue from 'vue';
import VueRouter from 'vue-router';
import vueDebounce from 'vue-debounce';

Vue.use(VueRouter);
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup']
})

import {store} from './store/index';
import boardContainer from './components/board-container';
import boardContainerArchive from './components/board-container-archive';
import boardContainerRepeating from './components/board-container-repeating';
import boardContainerTags from './components/board-container-tags';
import boardContainerFavorite from './components/board-container-favorite';
const routes = [
  {
		path: '',
		redirect: {name: 'all'}
	},
	{
    name: 'all',
		path: '/all',
    component: boardContainer,
  },
  {
    name: 'task',
		path: '/:page/task:id',
    component: boardContainer,
  },
  {
    name: 'archive',
		path: '/archive',
		component: boardContainerArchive,
  },
  {
    name: 'repeating',
		path: '/repeating',
		component: boardContainerRepeating,
  },
  {
    name: 'tags',
		path: '/tags',
		component: boardContainerTags,
  },
  {
    name: 'favorite',
		path: '/favorite',
		component: boardContainerFavorite,
	}

];

export const router = new VueRouter({
	routes,
  mode: 'history',
  linkActiveClass: 'filter__label--active',
});
