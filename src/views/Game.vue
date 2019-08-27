<template>
    <v-card>
        <v-card-title class="text-center justify-center py-6">
            <h1><span v-html="gameSettings.name"/></h1>
        </v-card-title>
        <v-tabs
            grow
            >
            <v-tab>
                <v-icon>mdi-settings</v-icon>
                Settings
            </v-tab>
            <v-tab>
                <v-icon>mdi-database</v-icon>
                Data
            </v-tab>
            <v-tab-item>
                <ObjectTreeView :value="gameSettings"/>
            </v-tab-item>
            <v-tab-item>
                <v-btn @click="refreshGameData">Refresh</v-btn>
                <ObjectTreeView :value="gameReport"/>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import { FETCH_GAME_REPORT } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
  components: {
    'ObjectTreeView': () => import('@/components/ObjectTreeView')
  },
  computed: {
    ...mapGetters([
      'getUserGameSettingById',
      'getCurrentGameData'
    ]),
    gameId () {
      return this.$route.params.gameId
    },
    gameSettings () {
      return this.getUserGameSettingById(this.gameId)
    },
    gameReport () {
      return this.getCurrentGameData(this.gameId)
    }
  },
  methods: {
    refreshGameData () {
      this.$store.dispatch(FETCH_GAME_REPORT, this.gameId)
    }
  }

}
</script>
