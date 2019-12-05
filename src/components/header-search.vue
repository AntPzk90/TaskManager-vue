<template>
  <section class="main__search search container">
    <input
      type="text"
      id="search__input"
      class="search__input"
      placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
      v-model = "search"
      v-debounce:1.5s="searching" debounce-events="input"
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
        let type = this.search.split('');
        if(this.search == ''){
          this.$store.commit('pushDatainTasks',this.$store.getters.defaultTasks);
        }
        if (isNaN(parseInt(type[0])) && type[0] != "#") {
          // проверка если первый символ сточный
          let searchForDescription = this.$store.getters.tasks.filter((it) =>{
            return it.description.match(this.search)
          });
          this.$store.commit('pushDatainTasks', searchForDescription);

        } else if (type[0] == '#') {
          // проверка если первый символ решетка хештега
          let searchingWordTag = this.search.slice(1);
          let searchForTags = this.$store.getters.tasks.filter((it) =>{
            console.log(it.tags)
            for(let tag of it.tags){
              if(tag.match(searchingWordTag)){
                return it
              }
            }
          });
          this.$store.commit('pushDatainTasks', searchForTags);

        } else {
          // проверка если первый сивол число
          let searchForDate = this.$store.getters.tasks.filter((it) =>{
            return moment(it.due_date).format('DD MMMM').match(this.search)
          });
          this.$store.commit('pushDatainTasks', searchForDate)

        }
      }
    }
  }
</script>
