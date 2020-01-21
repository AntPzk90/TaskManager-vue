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
import boardContainerToday from './components/board-container-today';
import boardContainerOverdue from './components/board-container-overdue';
const routes = [
  {
		path: 'https://antpzk90.github.io/TaskManager-vue/',
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
  },
  {
    name: 'today',
		path: '/today',
		component: boardContainerToday,
  },
  {
    name: 'overdue',
		path: '/overdue',
		component: boardContainerOverdue,
	}

];

export const router = new VueRouter({
	routes,
  mode: 'history',
  linkActiveClass: 'filter__label--active',
});
