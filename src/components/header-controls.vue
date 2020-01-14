<template>
  <section class="main__control control container">
    <h1 class="control__title">TASKMANAGER</h1>
    <section class="control__btn-wrap">
      <!-- <input
        type="radio"
        name="control"
        id="control__new-task"
        class="control__input visually-hidden"
      />
      <label for="control__new-task" class="control__label control__label--new-task" @click = "createTask"
        >+ ADD NEW TASK</label
      > -->
      <button class="control__btn-add control__label--new-task" @click = "createTask"
        >+ ADD NEW TASK</button
      >
      <input
        type="radio"
        name="control"
        id="control__task"
        class="control__input visually-hidden"
        checked
      />
      <label for="control__task" class="control__label">TASKS</label>
      <input
        type="radio"
        name="control"
        id="control__statistic"
        class="control__input visually-hidden"
      />
      <label for="control__statistic" class="control__label"
        >STATISTICS</label
      >
    </section>
  </section>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      createTask () {
        const newId = this.$store.state.tasks.length.toString();
        this.$store.dispatch('crateTask', newId);
      }
    }
  }
</script>
