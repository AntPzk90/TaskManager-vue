import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const axios = require('axios');

export const store = new Vuex.Store({
  state: {
    tasks: null,
    archiveTasks: null,
    repeatingTasks: null,
    tagsTasks: null,
  },
  getters: {
    tasks (state) {
      return state.tasks;
    },
    archiveTasks (state) {
      return state.archiveTasks;
    },
    repeatingTasks (state) {
      return state.repeatingTasks;
    },
    tagsTasks (state) {
      return state.tagsTasks
    }
  },
  mutations: {

    pushDatainTasks (state, payload) {
      state.tasks = payload.filter(task => task.is_archived == false);
      state.archiveTasks = payload.filter(task => task.is_archived);
      function getAllRepeatingTasks () {
          let repeatingTasks = [];
          for(let task of state.tasks){
            for(let repeatingTask in task.repeating_days){
              if(task.repeating_days[repeatingTask]){
                repeatingTasks.push(task)
                break
              }
            }
          }
          return repeatingTasks
      }
      state.repeatingTasks = getAllRepeatingTasks();
      state.tagsTasks = state.tasks.filter(task => task.tags.length != 0);
    },
  },
  actions: {
    createTasks ({commit}) {
      const AUTHORIZATION = `Basic kTy9gIdsz217xxrD`;
      axios({
        method: 'get',
        url: 'https://htmlacademy-es-9.appspot.com/task-manager/tasks',
        headers: {
          Authorization : AUTHORIZATION,
        }}).then(response => (commit('pushDatainTasks', response.data)))
           .catch(error => console.log(error,`error`));
    },
    updateTask({dispatch}, payload) {
      const AUTHORIZATION = `Basic kTy9gIdsz217xxrD`;
      axios({
        method: 'put',
        url: 'https://htmlacademy-es-9.appspot.com/task-manager/tasks/' + payload.id,
        data: JSON.stringify(payload.object),
        headers: {
          Authorization : AUTHORIZATION,
          'Content-Type': `application/json`,
        }}).then(response => (dispatch('createTasks', response.data))).catch(error => console.log(error));
    },
    crateTask ({dispatch}, id) {
      const AUTHORIZATION = `Basic kTy9gIdsz217xxrD`;
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
      const AUTHORIZATION = `Basic kTy9gIdsz217xxrD`
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
