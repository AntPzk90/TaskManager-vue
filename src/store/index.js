import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const axios = require('axios');

export const store = new Vuex.Store({
  state: {
    default:null,
    tasks: null,
  },
  getters: {
    tasks (state) {
      return state.tasks;
    },
  },
  mutations: {
    pushDatainTasks (state, payload) {
      state.tasks = payload;
    },
    updateTasks (state, payload) {
      state.tasks = payload
    },
    changeColor (state, payload) {
      state.tasks[payload.index].color = payload.color;
    },
    changeDescription (state, payload) {
      state.tasks[payload.index].description = payload.description;
    },
    changeArhivedState (state, payload) {
      state.tasks[payload.index].is_archived = payload.isArchived;
    },
    changeDayRepeatState (state, payload) {
      state.tasks[payload.index].repeating_days[payload.dayRepeat] = payload.dayState;
    },
    deleteAndAddHashtag (state, payload) {
      console.log(payload)
      state.tasks[payload.index].tags = payload.hashTagsArray;
    },
    changeDate (state, payload) {
      state.tasks[payload.index].due_date = payload.date;
    },
  },
  actions: {
    createTasks ({commit}) {
      const AUTHORIZATION = `Basic kTy9gIdsz2617xxrD`;
      axios({
        method: 'get',
        url: 'https://htmlacademy-es-9.appspot.com/task-manager/tasks',
        headers: {
          Authorization : AUTHORIZATION,
        }}).then(response => (commit('pushDatainTasks', response.data)))
           .catch(error => console.log(error));
    },
    updateTask({dispatch}, payload) {
      console.log(payload)
      const AUTHORIZATION = `Basic kTy9gIdsz2617xxrD`;
      axios({
        method: 'put',
        url: 'https://htmlacademy-es-9.appspot.com/task-manager/tasks/' + payload.id,
        data: JSON.stringify(this.getters.tasks[payload.index]),
        headers: {
          Authorization : AUTHORIZATION,
          'Content-Type': `application/json`,
        }}).then(response => (dispatch('createTasks', response.data))).catch(error => console.log(error));
    },
    crateTask ({dispatch}, id) {
      const AUTHORIZATION = `Basic kTy9gIdsz2617xxrD`;
      console.log(id)
      axios({
        method: 'post',
        url: 'https://htmlacademy-es-9.appspot.com/task-manager/tasks/',
        data: JSON.stringify({ "description": "new task",
                               "due_date": "2019-11-22T10:52:26.006Z",
                               "tags": [],
                               "repeating_days": {
                                  "mo": false,
                                  "tu": false,
                                  "we": false,
                                  "th": false,
                                  "fr": false,
                                  "sa": false,
                                  "su": false
                                },
                                "color": "black",
                                "is_favorite": false,
                                "is_archived": false
                              }),
        headers: {
          Authorization : AUTHORIZATION,
          'Content-Type': `application/json`,
        }}).then(response => (dispatch('createTasks', response.data))).catch(error => console.log(error));
    },
    deleteTask ({dispatch}, id) {
      const AUTHORIZATION = `Basic kTy9gIdsz2617xxrD`
      axios({
        method: 'DELETE',
        url: 'https://htmlacademy-es-9.appspot.com/task-manager/tasks/' + id,
        data: JSON.stringify(this.state.tasks[id]),
        headers: {
          Authorization : AUTHORIZATION,
          'Content-Type': `application/json`,
        }}).then(response => (dispatch('createTasks', response.data))).catch(error => console.log(error));
    }
  }
})
