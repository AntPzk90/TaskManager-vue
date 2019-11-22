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
                  <span class="card__date">{{date}}</span>
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
                    <date-picker v-model= "date" lang = "en" type = "date " format="d: MMMM"></date-picker>
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
  import DatePicker from 'vue2-datepicker';

  export default {
    components: {
      DatePicker
    },
    props:['id', 'description', 'color', 'data', 'tags', 'repeatingDays', 'index', 'isArchived'],
    data () {
      return {
        date: Date.now(),
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

<style>
.mx-datepicker {
    position: relative;
    display: inline-block;
    width: 180px;
    color: #73879c;
    font: 11px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei, sans-serif
}

.mx-datepicker * {
    box-sizing: border-box
}

.mx-datepicker.disabled {
    opacity: .7;
    cursor: not-allowed
}

.mx-datepicker-range {
    width: 320px
}

.mx-datepicker-popup {
    position: absolute;
    margin-top: 1px;
    margin-bottom: 1px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    z-index: 1000
}

.mx-input-wrapper {
    position: relative
}

.mx-input-wrapper .mx-clear-wrapper {
    display: none
}

.mx-input-wrapper:hover .mx-clear-wrapper {
    display: block
}

.mx-input-wrapper:hover .mx-clear-wrapper+.mx-input-append {
    display: none
}

.mx-input {
    display: inline-block;
    width: 100%;
    height: 24px;
    padding: 1px 30px;
    padding-left: 0px;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.4;
    color: #555;
    background-color: #fff;
    border: none;
    border-radius:none;
    border-bottom: 2px solid #000;
}

.mx-input.disabled,
.mx-input:disabled {
    opacity: .7;
    cursor: not-allowed
}

.mx-input:focus {
    outline: none
}

.mx-input::-ms-clear {
    display: none
}

.mx-input-append {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 100%;
    padding: 6px
}

.mx-input-icon {
    display: inline-block;
    font-style: normal;
    text-align: center;
    cursor: pointer
}

.mx-calendar-icon,
.mx-input-icon {
    width: 100%;
    height: 100%;
    color: #555
}

.mx-calendar-icon {
    stroke-width: 8px;
    stroke: currentColor;
    fill: currentColor
}

.mx-clear-icon:before {
    display: inline-block;
    content: "\2716";
    vertical-align: middle
}

.mx-clear-icon:after {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle
}

.mx-range-wrapper {
    width: 496px;
    overflow: hidden
}

.mx-shortcuts-wrapper {
    text-align: left;
    padding: 0 12px;
    line-height: 34px;
    border-bottom: 1px solid rgba(0, 0, 0, .05)
}

.mx-shortcuts-wrapper .mx-shortcuts {
    background: none;
    outline: none;
    border: 0;
    color: #48576a;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    cursor: pointer
}

.mx-shortcuts-wrapper .mx-shortcuts:hover {
    color: #419dec
}

.mx-shortcuts-wrapper .mx-shortcuts:after {
    content: "|";
    margin: 0 10px;
    color: #48576a
}

.mx-shortcuts-wrapper .mx-shortcuts:last-child:after {
    display: none
}

.mx-datepicker-footer {
    padding: 4px;
    clear: both;
    text-align: right;
    border-top: 1px solid rgba(0, 0, 0, .05)
}

.mx-datepicker-btn {
    font-size: 12px;
    line-height: 1;
    padding: 7px 15px;
    margin: 0 5px;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    border: none;
    border-radius: 3px
}

.mx-datepicker-btn-confirm {
    border: 1px solid rgba(0, 0, 0, .1);
    color: #73879c
}

.mx-datepicker-btn-confirm:hover {
    color: #1284e7;
    border-color: #1284e7
}

.mx-calendar {
    float: left;
    color: #73879c;
    padding: 6px 12px;
    font: 14px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei, sans-serif
}

.mx-calendar * {
    box-sizing: border-box
}

.mx-calendar-header {
    padding: 0 4px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    overflow: hidden
}

.mx-calendar-header>a {
    color: inherit;
    text-decoration: none;
    cursor: pointer
}

.mx-calendar-header>a:hover {
    color: #419dec
}

.mx-icon-last-month,
.mx-icon-last-year,
.mx-icon-next-month,
.mx-icon-next-year {
    padding: 0 6px;
    font-size: 20px;
    line-height: 30px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.mx-icon-last-month,
.mx-icon-last-year {
    float: left
}

.mx-icon-next-month,
.mx-icon-next-year {
    float: right
}

.mx-calendar-content {
    width: 224px;
    height: 224px
}

.mx-calendar-content .cell {
    vertical-align: middle;
    cursor: pointer
}

.mx-calendar-content .cell:hover {
    background-color: #eaf8fe
}

.mx-calendar-content .cell.actived {
    color: #fff;
    background-color: #1284e7
}

.mx-calendar-content .cell.inrange {
    background-color: #eaf8fe
}

.mx-calendar-content .cell.disabled {
    cursor: not-allowed;
    color: #ccc;
    background-color: #f3f3f3
}

.mx-panel {
    width: 100%;
    height: 100%;
    text-align: center
}

.mx-panel-date {
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0
}

.mx-panel-date td,
.mx-panel-date th {
    font-size: 12px;
    width: 32px;
    height: 32px;
    padding: 0;
    overflow: hidden;
    text-align: center
}

.mx-panel-date td.today {
    color: #2a90e9
}

.mx-panel-date td.last-month,
.mx-panel-date td.next-month {
    color: #ddd
}

.mx-panel-year {
    padding: 7px 0
}

.mx-panel-year .cell {
    display: inline-block;
    width: 40%;
    margin: 1px 5%;
    line-height: 40px
}

.mx-panel-month .cell {
    display: inline-block;
    width: 30%;
    line-height: 40px;
    margin: 8px 1.5%
}

.mx-time-list {
    position: relative;
    float: left;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
    height: 100%;
    border-top: 1px solid rgba(0, 0, 0, .05);
    border-left: 1px solid rgba(0, 0, 0, .05);
    overflow-y: auto
}

.mx-time-list .mx-time-picker-item {
    display: block;
    text-align: left;
    padding-left: 10px
}

.mx-time-list:first-child {
    border-left: 0
}

.mx-time-list .cell {
    width: 100%;
    font-size: 12px;
    height: 30px;
    line-height: 30px
}

.mx-time-list::-webkit-scrollbar {
    width: 8px;
    height: 8px
}

.mx-time-list::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .05);
    border-radius: 10px;
    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1)
}

.mx-time-list:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .2)
}
</style>
