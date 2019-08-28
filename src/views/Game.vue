<template>
    <v-card>
        <v-card-title class="text-center justify-center py-6">
            <h1><span v-html="gameSettings.name"/></h1>
             <v-btn @click="refreshGameData">Refresh</v-btn>
        </v-card-title>
        <v-tabs
            grow
            >
            <v-tab>
                <v-icon>mdi-settings</v-icon>
                Settings
            </v-tab>
            <v-tab-item>
                <ObjectTreeView :value="gameSettings"/>
            </v-tab-item>
            <v-tab>
                <v-icon>mdi-database</v-icon>
                Data
            </v-tab>
            <v-tab-item>
                <ObjectTreeView :value="gameReport"/>
            </v-tab-item>
            <v-tab>
                <v-icon>mdi-map</v-icon>
                Map
            </v-tab>
            <v-tab-item>
                <UniverseMap :value="gameReport"/>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import { FETCH_GAME_REPORT } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
  components: {
    'ObjectTreeView': () => import('@/components/ObjectTreeView'),
    'UniverseMap': () => import('@/components/game/UniverseMap')
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
