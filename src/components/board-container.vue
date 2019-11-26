<template>
  <section class="board container">
    <div class="board__filter-list">
      <a href="#" class="board__filter"  @click.prevent= "sort('default-sort')" ref = "a">SORT BY DEFAULT</a>
      <a href="#" class="board__filter"  @click.prevent = "sort('up-sort')" ref = "a">SORT BY DATE up</a>
      <a href="#" class="board__filter"  @click.prevent = "sort('down-sort')" ref = "a">SORT BY DATE down</a>
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
  import Vue from 'vue';
  import taskCard from './task';
  const moment = require('moment');
  export default {
    components: {
      taskCard,
    },
    data () {
      return {
        dataTasks: null,
      }
    },
    computed: {
      tasks () {
        return this.$store.getters.tasks
      },
      default() {
        return this.$store.getters.default
      }
    },
    methods: {
      sort (type) {
        let sortType = type;
        let defaultTasks = this.tasks.slice();
        console.log(this.default, `def`)
        switch(sortType){
          case 'default-sort':
            for (let [index, task] of defaultTasks.entries()){
              this.tasks[index] = task;
            }
            break;
          case 'up-sort':
            let sortedTasksUp = this.tasks.slice().sort((a, b) => moment(b.due_date).unix() - moment(a.due_date).unix());
            for (let [index, task] of sortedTasksUp.entries()){
              Vue.set(this.tasks, index, task);
            }
            break;
          case 'down-sort':
            let sortedTasksDown = this.tasks.slice().sort((a, b) => moment(a.due_date).unix() - moment(b.due_date).unix());
            for (let [index, task] of sortedTasksDown.entries()){
              Vue.set(this.tasks, index, task);
            }
            break;
        }
      },
      sortUp () {
        console.log(this.$refs.a.dataset.filter)
        // let sortedTasks = this.tasks.slice().sort((a, b) => moment(b.due_date).unix() - moment(a.due_date).unix());
        // this.$store.commit('pushDatainTasks', sortedTasks);
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
