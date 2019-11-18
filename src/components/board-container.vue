<template>
  <section class="board container">
    <board-filter>
    </board-filter>

    <board-tasks-list>
    </board-tasks-list>
  </section>
</template>

<script>
  import boardFilter from './board-filter';
  import boardTasksList from './board-tasks-list';

  export default {
    components: {
      boardFilter,
      boardTasksList,
    },
    data () {
      return {

      }
    }
  }
</script>
