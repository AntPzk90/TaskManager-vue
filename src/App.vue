<template>
  <div id="app">
    <header-controls>
    </header-controls>

    <header-search>
    </header-search>

    <header-filters>
    </header-filters>

    <router-view></router-view>
    <!-- <ul>
      <li v-for = "(item, index) in tasks" :key = "index">
        {{ item }}
      </li>
    </ul> -->
  </div>
</template>

<script>
  import {store} from './store/index';
  import {router} from './routes';
  //components import
  import headerControls from './components/header-controls';
  import headerSearch from './components/header-search';
  import headerFilters from './components/header-filters';
  import boardContainer from './components/board-container';
  import boardContainerArchive from './components/board-container-archive';


  export default {
    name: 'app',
    store,
    router,
    components: {
      headerControls,
      headerSearch,
      headerFilters,
      boardContainer,
      boardContainerArchive,
    },
    data () {
      return {
        info: null,
      }
    },
    computed: {
      tasks () {
        return this.$store.getters.tasks;
      }
    },
    mounted() {
      this.$store.dispatch('createTasks')
    }
  }
</script>
