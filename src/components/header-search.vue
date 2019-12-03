<template>
  <section class="main__search search container">
    <input
      type="text"
      id="search__input"
      class="search__input"
      placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
      v-model = "search"
      @input = "searching"
    />
    <label class="visually-hidden" for="search__input">Search</label>
  </section>
</template>

<script>
  const moment = require('moment');
  import Vue from 'vue';
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        search: null,
      }
    },
    computed: {
      ...mapGetters([
        'tasks',
      ]),
    },
    methods: {
      searching () {
        let searchForDescription = this.$store.getters.tasks.filter((it) =>{
          return it.description.match(this.search)
        });
        let searchForTags = this.$store.getters.tasks.filter((it) =>{
          for(let [index, tag] of it.tags.entries()){
            if(tag.match(this.search)){
              return it
            }
          }
        });
        let searchForDate = this.$store.getters.tasks.filter((it) =>{
          return moment(it.due_date).format('DD MMMM').match(this.search)
        });
        console.log(searchForDate)
          this.$store.commit('pushDatainTasks', searchForDate)
        console.log(this.$store.getters.defaultTasks)
        //нужно сделать проверку на наличие символов в поисковой строке
      }
    }
  }
</script>
