<template>
  <section class="board container">
    <div class="board__filter-list">
      <a href="#" class="board__filter"  @click.prevent= "sort('default-sort')" ref = "a">SORT BY DEFAULT</a>
      <a href="#" class="board__filter"  @click.prevent = "sort('up-sort')" ref = "a">SORT BY DATE up</a>
      <a href="#" class="board__filter"  @click.prevent = "sort('down-sort')" ref = "a">SORT BY DATE down</a>
    </div>

    <transition-group tag ="div" class="board__tasks" name="list">
      <task-card v-for = "(task, index) in overdueTasks" v-if = "index < limitation"
                                                  :key = "task.id"
                                                  :index = "index"
                                                  :id = "task.id"
                                                  :description = "task.description"
                                                  :color = "task.color"
                                                  :date = "task.due_date"
                                                  :tags = "task.tags"
                                                  :repeatingDays = "task.repeating_days"
                                                  :isArchived = "task.is_archived"
                                                  :isFavorite = "task.is_favorite"
                                                  >
      </task-card>
    </transition-group>
    <button class="load-more" type="button" @click = "changeLimitation">load more</button>
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
        limitation: 8,
      }
    },
    computed: {
      ...mapGetters([
        'overdueTasks',
      ]),
    },
    methods: {
      sort (type) {
        let sortType = type;
        switch(sortType){
          case 'default-sort':
          let sortedoverdueTasksDefult = this.overdueTasks.slice().sort((a, b) => b.id - a.id);
            for (let [index, task] of sortedoverdueTasksDefult.entries()){
              this.$set(this.overdueTasks, index, task)
            }
            break;
          case 'up-sort':
            let sortedoverdueTasksUp = this.overdueTasks.slice().sort((a, b) => moment(b.due_date).unix() - moment(a.due_date).unix());
            for (let [index, task] of sortedoverdueTasksUp.entries()){
              this.$set(this.overdueTasks, index, task);
            }
            break;
          case 'down-sort':
            let sortedoverdueTasksDown = this.overdueTasks.slice().sort((a, b) => moment(a.due_date).unix() - moment(b.due_date).unix());
            for (let [index, task] of sortedoverdueTasksDown.entries()){
              this.$set(this.overdueTasks, index, task);
            }
            break;
        }
      },
      changeLimitation () {
        this.limitation += 8;
      }
    }
  }
</script>
<style>
  .list-enter-active {
    transform: scale3d(1,1.2,1.2);
    transition: transform .2s;
    z-index: 100;
  }
  .list-enter /* .fade-leave-active до версии 2.1.8 */ {
    transform: scale3d(1,0.1,0.1);
  }
</style>
