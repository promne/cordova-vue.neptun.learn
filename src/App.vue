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

      <v-list>
        <template
          v-for="menuLink in menuLinks"
        >
          <v-list-group
            v-if="menuLink.children && menuLink.children.length"
            :prepend-icon="menuLink.icon"
            :key="menuLink.link"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ menuLink.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              link
              v-for="battle in menuLink.children"
              :to="battle.link"
              :key="battle.link"
            >
              <v-list-item-icon>
                <v-icon>{{ battle.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title><span v-html="battle.title"/></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <template
            v-else
          >
            <v-list-item
              link
              :to="menuLink.link"
              :key="menuLink.link"
            >
              <v-list-item-icon>
                <v-icon>{{ menuLink.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ menuLink.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </v-list>
      <template v-slot:append v-if="isAuthenticated">
        <div class="pa-2">
          <v-btn block @click="$store.dispatch('logout')">Logout</v-btn>
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
import { INIT_USER } from '@/store/actions.type'
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
        { title: this.currentUser.user_email, icon: 'account_box', link: '/profile', auth: true },
        { title: 'Login', icon: 'mdi-key', link: '/login', auth: false }
      ]
    },
    menuLinks: function () {
      var links = this.defaultLinks

      if (typeof this.currentUser.open_games !== 'undefined') {
        var gameLinks = this.currentUser.open_games.map(function (g) { return {title: unescape(g.name), icon: 'mdi-battlenet', link: `/game/${g.number}`} })
        links.push({ title: 'Neptune',
          icon: 'mdi-image',
          link: '/neptune',
          auth: true,
          children: gameLinks
        })
      }

      return links.filter(p => typeof p.auth === 'undefined' || (p.auth === this.isAuthenticated))
    }
  },
  mounted: function () {
    this.$store.dispatch(INIT_USER)
  }
}
</script>
