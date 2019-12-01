<template>
  <section class="board container">
    <div class="board__filter-list">
      <a href="#" class="board__filter"  @click.prevent= "sort('default-sort')" ref = "a">SORT BY DEFAULT</a>
      <a href="#" class="board__filter"  @click.prevent = "sort('up-sort')" ref = "a">SORT BY DATE up</a>
      <a href="#" class="board__filter"  @click.prevent = "sort('down-sort')" ref = "a">SORT BY DATE down</a>
    </div>

    <div class="board__tasks">
      <task-card v-for = "(task, index) in repeatingTasks" :key = "task.id"
                                                  :index = "index"
                                                  :id = "task.id"
                                                  :description = "task.description"
                                                  :color = "task.color"
                                                  :date = "task.due_date"
                                                  :tags = "task.tags"
                                                  :repeatingDays = "task.repeating_days"
                                                  :isArchived = "task.is_archived"
                                                  :isFavorite = "task.is_favorite">
      </task-card>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
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
      ...mapGetters([
        'repeatingTasks',
      ]),
    },
    methods: {
      sort (type) {
        let sortType = type;
        switch(sortType){
          case 'default-sort':
            let sortedTasksDefult = this.archiveTasks.slice().sort((a, b) => a.id - b.id);
            for (let [index, task] of sortedTasksDefult.entries()){
              this.$set(this.archiveTasks, index, task)
            }
            break;
          case 'up-sort':
            let sortedTasksUp = this.archiveTasks.slice().sort((a, b) => moment(b.due_date).unix() - moment(a.due_date).unix());
            for (let [index, task] of sortedTasksUp.entries()){
              this.$set(this.archiveTasks, index, task)
            }
            break;
          case 'down-sort':
            console.log(this.archiveTasks)
            let sortedTasksDown = this.archiveTasks.slice().sort((a, b) => moment(a.due_date).unix() - moment(b.due_date).unix());
            for (let [index, task] of sortedTasksDown.entries()){
              this.$set(this.archiveTasks, index, task);
            }
            break;
        }
      },
    }
  }
</script>
<style>
.board__tasks{
  transform-style: preserve-3d;
}
</style>
