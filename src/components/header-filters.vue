<template>
  <section class="main__filter filter container">
    <input
      type="radio"
      id="filter__all"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__all" class="filter__label">
      All <span class="filter__all-count">{{getAllTasksCount}}</span></label
    >
    <input
      type="radio"
      id="filter__overdue"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__overdue" class="filter__label"
      >Overdue <span class="filter__overdue-count">0</span></label
    >
    <input
      type="radio"
      id="filter__today"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__today" class="filter__label"
      >Today <span class="filter__today-count">0</span></label
    >
    <input
      type="radio"
      id="filter__favorites"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__favorites" class="filter__label"
      >Favorites <span class="filter__favorites-count">{{getAllFavoritesTasksCount}}</span></label
    >
    <input
      type="radio"
      id="filter__repeating"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__repeating" class="filter__label"
      >Repeating <span class="filter__repeating-count">{{getAllRepeatingTasksCount}}</span></label
    >
    <input
      type="radio"
      id="filter__tags"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__tags" class="filter__label"
      >Tags <span class="filter__tags-count">{{getAllTagsTasksCount}}</span></label
    >
    <input
      type="radio"
      id="filter__archive"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__archive" class="filter__label"
      >Archive <span class="filter__archive-count">{{getAllArchivedTasksCount}}</span></label
    >
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
      getAllFavoritesTasksCount () {
        if(this.$store.getters.tasks){
          let count = 0;
          for(let task of this.$store.getters.tasks){
            if(task.is_favorite){
              count++
            }
          }
          return count
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
        if(this.$store.getters.tasks){
          let count = 0;
          for(let task of this.$store.getters.tasks){
            if(task.is_archived){
              count++
            }
          }
          return count
        }else{
          return 'loading'
        }
      }
    }
  }
</script>
