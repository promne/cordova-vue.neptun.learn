<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="username" label="Username" placeholder="email"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="password" label="Password" :append-icon="clearText ? 'visibility' : 'visibility_off'" :type="clearText ? 'text' : 'password'" @click:append="clearText = !clearText"/>
        </v-col>
      </v-row>
      <v-btn @click="login">Login</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import { LOGIN } from '../store/actions.type'
import { mapGetters } from 'vuex'

export default {
  name: 'Neptune',
  data: function () {
    return {
      username: '',
      password: '',
      clearText: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  },
  methods: {
    login: function (event) {
      let self = this
      this.$store.dispatch(LOGIN, {alias: this.username, password: this.password})
        .then(_ => {
          console.log('routing to home')
          self.$router.push('/')
        })
        .catch(e => {
          this.password = ''
          alert(e)
        })
    },
    greet: function (event) {
    }
  }
}
</script>
