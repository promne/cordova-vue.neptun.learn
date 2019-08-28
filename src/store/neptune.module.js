import { LOGIN, LOGOUT, INIT_USER, FETCH_GAME_REPORT } from './actions.type'
import NeptuneApi from '@/service/neptune.api'
import { SET_ERROR, SET_USER, CLEAR_USER, SET_GAME_REPORT } from './mutations.type'
import Vue from 'vue'

const state = {
  errors: null,
  user: {},
  isAuthenticated: false,
  universeReports: {}
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  },
  getUserGameSettingById: (state) => (id) => {
    return state.user.open_games ? state.user.open_games.find(i => i.number === id) : {}
  },
  getCurrentGameData: (state) => (id) => {
    return state.universeReports[id] || {}
  }
}

const actions = {
  [INIT_USER] ({commit}) {
    return new Promise((resolve, reject) => {
      NeptuneApi.initPlayer()
        .then(data => {
          if (data[0] === 'meta:init_player') {
            commit(SET_USER, data[1])
            resolve(data[1])
          } else {
            reject(data)
          }
        })
        .catch(({response}) => {
          commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  [FETCH_GAME_REPORT] (context, gameId) {
    return new Promise((resolve, reject) => {
      NeptuneApi.getUniverseReport(gameId)
        .then(data => {
          if (data.event === 'order:full_universe') {
            context.commit(SET_GAME_REPORT, { gameId: gameId, report: data.report })
            resolve(data[1])
          } else {
            reject(data)
          }
        })
        .catch(({response}) => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  [LOGIN] (context, credentials) {
    return new Promise((resolve, reject) => {
      NeptuneApi.login(credentials.alias, credentials.password)
        .then(data => {
          if (data[0] !== 'meta:login_success') {
            reject(data)
          } else {
            resolve()
          }
        })
        .catch(({response}) => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
      .then(context.dispatch(INIT_USER))
  },
  [LOGOUT] (context) {
    return new Promise((resolve, reject) => {
      NeptuneApi.logout()
        .then(data => {
          context.commit(CLEAR_USER)
          resolve(true)
        })
        .catch(({response}) => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  }
}

const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_USER] (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
  },
  [CLEAR_USER] (state) {
    state.isAuthenticated = false
    state.user = {}
  },
  [SET_GAME_REPORT] (state, { gameId, report }) {
    Vue.set(state.universeReports, gameId, report)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
