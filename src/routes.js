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
    name: 'task',
		path: '/all/task:id',
    component: boardContainer,
  },
  {
    name: 'archivedTasks',
		path: '/archive',
		component: boardContainerArchive,
  },
  {
    name: 'repeatingTasks',
		path: '/repeating',
		component: boardContainerRepeating,
  },
  {
    name: 'tagsTasks',
		path: '/tags',
		component: boardContainerTags,
	}

];

export const router = new VueRouter({
	routes,
  mode: 'history',
  linkActiveClass: 'filter__label--active',
});
