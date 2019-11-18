<template>
  <div class="board__tasks">
    <task-card v-for = "(task, index) in tasks" :key = "index"
                                                :index = "index"
                                                :description = "task.description"
                                                :color = "task.color"
                                                :data = "task.due_date"
                                                :tags = "task.tags"
                                                :repeatingDays = "task.repeating_days"
                                                :isArchived = "task.is_archived">
    </task-card>
  </div>
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
