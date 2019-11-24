<template>
  <section class="board container">
    <div class="board__filter-list">
      <a href="#" class="board__filter" @click.prevent= "sortDefault">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" @click.prevent = "sortUp">SORT BY DATE up</a>
      <a href="#" class="board__filter" @click.prevent = "sortDown">SORT BY DATE down</a>
    </div>

    <div class="board__tasks">
      <task-card v-for = "(task, index) in tasks" :key = "task.id"
                                                  :index = "index"
                                                  :id = "task.id"
                                                  :description = "task.description"
                                                  :color = "task.color"
                                                  :date = "task.due_date"
                                                  :tags = "task.tags"
                                                  :repeatingDays = "task.repeating_days"
                                                  :isArchived = "task.is_archived">
      </task-card>
    </div>
  </section>
</template>

<script>
  import taskCard from './task';
  const moment = require('moment');
  export default {
    components: {
      taskCard,
    },
    data () {
      return {
        dataTasks: this.tasks,
      }
    },
    computed: {
      tasks () {
        return this.$store.getters.tasks;
      },
    },
    methods: {
      sortUp () {
        let sortedTasks = this.tasks.slice().sort((a, b) => moment(b.due_date).unix() - moment(a.due_date).unix());
        this.$store.commit('pushDatainTasks', sortedTasks);
      },
      sortDown () {
        let sortedTasks = this.tasks.slice().sort((a, b) => moment(a.due_date).unix() - moment(b.due_date).unix());
        this.$store.commit('pushDatainTasks', sortedTasks);
      },
      sortDefault () {
        this.$store.dispatch('createTasks');
      }
    }
  }
</script>
<style>
.board__tasks{
  transform-style: preserve-3d;
}
</style>
