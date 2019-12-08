import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const axios = require('axios');
const moment = require('moment');

export const store = new Vuex.Store({
  state: {
    defaultTasks: null,
    tasks: null,
    archiveTasks: null,
    repeatingTasks: null,
    tagsTasks: null,
    favoritesTasks: null,
    todayTasks: null,
    overdueTasks: null,
  },
  getters: {
    defaultTasks (state) {
      return state.defaultTasks;
    },
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
      return state.tagsTasks;
    },
    favoritesTasks (state) {
      return state.favoritesTasks;
    },
    todayTasks (state) {
      return state.todayTasks;
    },
    overdueTasks (state) {
      return state.overdueTasks;
    }
  },
  mutations: {
    createDefaultTasks (state, payload) {
      state.defaultTasks = payload;
    },
    pushDatainTasks (state, payload) {
      //разобраться с данными которые приходят
      state.tasks = payload.filter(task => task.is_archived == false).sort((a, b) => b.id - a.id);
      state.archiveTasks = payload.filter(task => task.is_archived).sort((a, b) => b.id - a.id);
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
          return repeatingTasks.sort((a, b) => b.id - a.id)
      }
      state.repeatingTasks = getAllRepeatingTasks();
      state.tagsTasks = state.tasks.filter(task => task.tags.length != 0).sort((a, b) => b.id - a.id);
      state.favoritesTasks = payload.filter(task => task.is_favorite).sort((a, b) => b.id - a.id);
      //работа с датой сегодняшний день
      let todayEnd = moment(new Date).toISOString().split("T").slice(0,1)[0] + "T" + "23:59:59.000Z";//конец сегодн. дня
      let todayStart = moment(new Date).toISOString().split("T").slice(0,1)[0] + "T" + "00:00:00.000Z";//начало сегодн. дня
      state.todayTasks = payload.filter(task => moment(task.due_date).unix() <= moment(todayEnd).unix() && moment(task.due_date).unix() >= moment(todayStart).unix()).sort((a, b) => b.id - a.id);;
      state.overdueTasks  = payload.filter(task => moment(task.due_date).unix() < moment(todayStart).unix() && !task.is_archived).sort((a, b) => b.id - a.id);;
      console.log(state.overdueTasks)
    },
    filteredTasks (state, payload) {
      state.tasks = payload;
    },
    updatetTask (state, payload) {
      console.log(payload)
      let stateTask = state.tasks.filter(it => it.id == payload.id)
      stateTask[0].tags = payload.tags;
      for (let [index, task] of payload.tags.entries()){
        Vue.set(stateTask[0].tags, index, task);
      }
    }
  },
  actions: {
    createTasks ({commit}) {
      const AUTHORIZATION = `Basic kTy9gIdsz217xxrD`;
      axios({
        method: 'get',
        url: 'https://htmlacademy-es-9.appspot.com/task-manager/tasks',
        headers: {
          Authorization : AUTHORIZATION,
        }}).then(response => (commit('pushDatainTasks', response.data),commit('createDefaultTasks', response.data)))
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
