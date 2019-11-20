<template>
  <article class="card" :class = "[addColorTaskClass, addRepeatingDaysClass]" v-if = "cardEdit">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit" @click = "changeEditFlag">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive" @click = "changeArchivedFlag (index)">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">{{descriptionTask}} {{idTask}}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">23 September</span>
                  <span class="card__time">11:15 PM</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                <span class="card__hashtag-inner" v-for = "(hashtag,index) in tags" :key = "index">
                  <span class="card__hashtag-name">
                    #{{hashtag}}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>

  <article class="card card--edit" :class = "[addColorTaskClass, addRepeatingDaysClass]" v-else>
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
                @input = "changeText(index)"
                v-model = "descriptionTask"
              >{{descriptionTask}}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">yes</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="23 September 11:15 PM"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">{{ifRepeatingDays}}</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    <div class="card__repeat-input-wrapper" v-for = "(input, name, index) in repeatingDaysTask" :key = "index">
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        :id= "name"
                        name="repeat"
                        :value = "name"
                        :checked = "input.name"
                        @change = "changeRepeatingDayFlag(name, indexTask)"
                      />
                      <label class="card__repeat-day" :for = "name"
                        >{{name}}</label
                      >
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  <span class="card__hashtag-inner" v-for = "(hashtag,index) in tags" :key = "index">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <p class="card__hashtag-name">
                      #{{hashtag}}
                    </p>
                    <button type="button" class="card__hashtag-delete" @click = "deleteHashtag(index, indexTask)">
                      delete
                    </button>
                  </span>
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                    v-model = "newHashtag"
                    v-debounce:1s="crateNewHashTag" debounce-events="input"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-4"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                  :checked = "colorTask == 'black'"
                  @change = "changeColor($event, indexTask)"
                />
                <label
                  for="color-black-4"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-4"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                  :checked = "colorTask == 'yellow'"
                  @change = "changeColor($event, indexTask)"
                />
                <label
                  for="color-yellow-4"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-4"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                  :checked = "colorTask == 'blue'"
                  @change = "changeColor($event, indexTask)"
                />
                <label
                  for="color-blue-4"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-4"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                  :checked = "colorTask == 'green'"
                  @change = "changeColor($event, indexTask)"
                />
                <label
                  for="color-green-4"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-4"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                  :checked = "colorTask == 'pink'"
                  @change = "changeColor($event, indexTask)"
                />
                <label
                  for="color-pink-4"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit" @click.prevent = "saveData(id)">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
</template>

<script>
  export default {
    props:['id', 'description', 'color', 'data', 'tags', 'repeatingDays', 'index', 'isArchived'],
    data () {
      return {
        idTask: this.id,
        newHashtag: null,
        cardEdit: true,
        isArchivedTask: this.isArchived,
        descriptionTask: this.description,
        indexTask: this.index,
        colorTask: this.color,
        tagsTask: this.tags,
        repeatingDaysTask: this.repeatingDays,
        colors: {
          'yellow': 'card--yellow',
          'blue': 'card--blue',
          'pink': 'card--pink',
          'green': 'card--green',
          'black': 'card--black',
        },
      }
    },
    computed: {
      addColorTaskClass () {
        for(let keyColor in this.colors){
          if(keyColor == this.colorTask){
            return this.colors[keyColor]
          }
        }
      },
      addRepeatingDaysClass () {
        for(let day in this.repeatingDaysTask){
          if(this.repeatingDaysTask[day]){
            return "card--repeat"
          }
        }
      },
      ifRepeatingDays () {
        for(let day in this.repeatingDaysTask){
          if(this.repeatingDaysTask[day]){
            return "YES"
          }
        }
        return "NO"
      },
    },
    methods: {
      changeEditFlag () {
        this.cardEdit = false;
      },
      changeColor (event, index) {
        let colorData = {
          color: event.target.value,
          index:index,
        }
        this.colorTask = colorData.color;
        this.$store.commit('changeColor', colorData);
      },
      changeText (index) {
        let descriptionData = {
          description: this.descriptionTask,
          index:index,
        }
         this.$store.commit('changeDescription', descriptionData);
      },
      changeArchivedFlag (index) {
        if(this.isArchivedTask == false){
          this.isArchivedTask = true;
        }else if(this.isArchivedTask){
          this.isArchivedTask = false;
        }
        let isArchived = {
          isArchived: this.isArchivedTask,
          index:index,
        }
        this.$store.commit('changeArhivedState', isArchived);
      },
      changeRepeatingDayFlag (name, index) {
        if(!this.repeatingDaysTask[name]){
          this.repeatingDaysTask[name] = true;
        }else if(this.repeatingDaysTask[name]){
          this.repeatingDaysTask[name] = false;
        }
        let dayRepeatData = {
          dayRepeat: name,
          dayState: this.repeatingDaysTask[name],
          index:index,
        }
        this.$store.commit('changeDayRepeatState', dayRepeatData);
      },
      crateNewHashTag (indexTask) {
        let newHashtagsArray = this.tagsTask;
        newHashtagsArray.push(this.newHashtag)
        let hashtagsData = {
          hashTagsArray: newHashtagsArray,
          index: this.indexTask,
        }
        this.tagsTask = newHashtagsArray;
        this.$store.commit('deleteAndAddHashtag', hashtagsData);
      },
      deleteHashtag (index, indexTask) {
        let newHashtagsArray = this.tagsTask.concat();
        newHashtagsArray.splice(index,1);
        let deletedHashtagData = {
          hashTagsArray: newHashtagsArray,
          index: indexTask,
        }
        this.tagsTask = newHashtagsArray;
        this.$store.commit('deleteAndAddHashtag', deletedHashtagData);
      },
      saveData (id) {
        console.log(id)
        this.$store.dispatch('updateTask', id);
        this.cardEdit = true;
      }
    },
  }
</script>
