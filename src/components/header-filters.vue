<template>
  <section class="main__filter filter container">
    <!-- <input
      type="radio"
      id="filter__all"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__all" class="filter__label">
      All <span class="filter__all-count">{{getAllTasksCount}}</span></label
    > -->
    <router-link :to = "{name: 'all'}" class="filter__label" :class = "{'filter__label--disabled': getAllTasksCount == 0}">
      All
      <span class="filter__all-count">{{getAllTasksCount}}</span>
    </router-link>
    <!-- <input
      type="radio"
      id="filter__overdue"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__overdue" class="filter__label"
      >Overdue <span class="filter__overdue-count">0</span></label
    > -->
    <router-link to="/overdue" class="filter__label" :class = "{'filter__label--disabled':  getAllOverdueTasksCount == 0}">
      Overdue
      <span class="filter__all-count">{{ getAllOverdueTasksCount}}</span>
    </router-link>
    <!-- <input
      type="radio"
      id="filter__today"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__today" class="filter__label"
      >Today <span class="filter__today-count">0</span></label
    > -->
    <router-link to="/today" class="filter__label" :class = "{'filter__label--disabled': getAllTodayTasksCount == 0}">
      Today
      <span class="filter__all-count">{{getAllTodayTasksCount}}</span>
    </router-link>
    <!-- <input
      type="radio"
      id="filter__favorites"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__favorites" class="filter__label"
      >Favorites <span class="filter__favorites-count">{{getAllfavoritesTasksCount}}</span></label
    > -->
    <router-link to="/favorite" class="filter__label" :class = "{'filter__label--disabled': getAllfavoritesTasksCount == 0}">
      Favorites
      <span class="filter__all-count">{{getAllfavoritesTasksCount}}</span>
    </router-link>

    <!-- <input
      type="radio"
      id="filter__repeating"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__repeating" class="filter__label"
      >Repeating <span class="filter__repeating-count">{{getAllRepeatingTasksCount}}</span></label
    > -->
    <router-link to="/repeating" class="filter__label" :class = "{'filter__label--disabled': getAllRepeatingTasksCount == 0}">
      Repeating
      <span class="filter__all-count">{{getAllRepeatingTasksCount}}</span>
    </router-link>

    <!-- <input
      type="radio"
      id="filter__tags"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__tags" class="filter__label"
      >Tags <span class="filter__tags-count">{{getAllTagsTasksCount}}</span></label
    > -->
    <router-link to="/tags" class="filter__label" :class = "{'filter__label--disabled': getAllTagsTasksCount == 0}">
      Tags
      <span class="filter__all-count">{{getAllTagsTasksCount}}</span>
    </router-link>
    <!-- <input
      type="radio"
      id="filter__archive"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__archive" class="filter__label"
      >Archive <span class="filter__archive-count">{{getAllArchivedTasksCount}}</span></label
    > -->
    <router-link to="/archive" class="filter__label" :class = "{'filter__label--disabled': getAllArchivedTasksCount == 0}">
      Archive
      <span class="filter__all-count">{{getAllArchivedTasksCount}}</span>
    </router-link>
  </section>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      getAllTasksCount () {
        if(this.$store.getters.tasks){
          return this.$store.getters.tasks.length
        }else{
          return 'loading'
        }
      },
      getAllRepeatingTasksCount () {
        if(this.$store.getters.tasks){
          let count = 0;
          for(let task of this.$store.getters.tasks){
            for(let repeatingTask in task.repeating_days){
              if(task.repeating_days[repeatingTask]){
                count ++
                break
              }
            }
          }
          return count
        }else{
          return 'loading'
        }
      },
      getAllTagsTasksCount () {
        if(this.$store.getters.tasks){
          let count = 0;
          for(let task of this.$store.getters.tasks){
            if(task.tags.length != 0){
              count++
            }
          }
          return count
        }else{
          return 'loading'
        }
      },
      getAllArchivedTasksCount () {
        if(this.$store.getters.archiveTasks){
          return this.$store.getters.archiveTasks.length;
        }else{
          return 'loading'
        }
      },
      getAllfavoritesTasksCount () {
        if(this.$store.getters.favoritesTasks){
          return this.$store.getters.favoritesTasks.length;
        }else{
          return 'loading'
        }
      },
      getAllTodayTasksCount () {
        if(this.$store.getters.todayTasks){
          return this.$store.getters.todayTasks.length;
        }else{
          return 'loading'
        }
      },
      getAllOverdueTasksCount () {
        if(this.$store.getters.overdueTasks){
          return this.$store.getters.overdueTasks.length;
        }else{
          return 'loading'
        }
      },
    }
  }
</script>
