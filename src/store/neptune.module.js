import { LOGIN, LOGOUT, INIT_USER } from './actions.type'
import NeptuneApi from '@/service/neptune.api'
import { SET_ERROR, SET_USER, CLEAR_USER } from './mutations.type'

const state = {
  errors: null,
  user: {},
  isAuthenticated: false
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
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
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
