<template>
  <section class="board container">
    <div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>

    <div class="board__tasks">
    <task-card v-for = "(task, index) in tasks" :key = "index"
                                                :index = "index"
                                                :id = "task.id"
                                                :description = "task.description"
                                                :color = "task.color"
                                                :data = "task.due_date"
                                                :tags = "task.tags"
                                                :repeatingDays = "task.repeating_days"
                                                :isArchived = "task.is_archived">
    </task-card>
  </div>
  </section>
</template>

<script>
  import taskCard from './task';

  export default {
    components: {
      taskCard,
    },
    data () {
      return {

      }
    },
    computed: {
      tasks () {
        return this.$store.getters.tasks;
      },
    }
  }
</script>
