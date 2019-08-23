<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Neptune's pride
          </v-list-item-title>
          <v-list-item-subtitle>
            analysis
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
      >
        <v-list-item
          v-for="item in menuLinks"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="isAuthenticated">
        <div class="pa-2">
          <v-btn block @click="this.$store.dispatch('logout')">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated']),
    defaultLinks: function () {
      return [
        { title: 'Home', icon: 'mdi-home', link: '/' },
        { title: 'Login', icon: 'mdi-key', link: '/login', auth: false },
        { title: 'Neptune', icon: 'mdi-image', link: '/neptune', auth: true },
        { title: this.currentUser.user_email, icon: 'account_box', link: '/profile', auth: true }
      ]
    },
    menuLinks: function () {
      var links = this.defaultLinks.filter(p => typeof p.auth === 'undefined' || (p.auth === this.isAuthenticated))
      return links
    }
  }
}
</script>
