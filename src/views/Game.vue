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
                <ObjectTreeView :value="gameData"/>
            </v-tab-item>
            <v-tab>
                <v-icon>mdi-account-multiple</v-icon>
                Overview
            </v-tab>
            <v-tab-item>
                <Players :value="gameData"/>
            </v-tab-item>
            <v-tab>
                <v-icon>mdi-map</v-icon>
                Map
            </v-tab>
            <v-tab-item>
                <UniverseMap :value="gameData.report"/>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import { FETCH_GAME_REPORT } from '@/store/actions.type'
import { mapGetters } from 'vuex'
import { FETCH_GAME_INTEL } from '../store/actions.type'

export default {
  components: {
    'ObjectTreeView': () => import('@/components/ObjectTreeView'),
    'Players': () => import('@/components/game/Players'),
    'UniverseMap': () => import('@/components/game/UniverseMap')
  },
  computed: {
    ...mapGetters([
      'getUserGameSettingById',
      'getCurrentGameData',
      'getCurrentGameIntel'
    ]),
    gameId () {
      return this.$route.params.gameId
    },
    gameSettings () {
      return this.getUserGameSettingById(this.gameId)
    },
    gameData () {
      return {
        report: this.getCurrentGameData(this.gameId),
        intel: this.getCurrentGameIntel(this.gameId)
      }
    }
  },
  methods: {
    refreshGameData () {
      this.$store.dispatch(FETCH_GAME_REPORT, this.gameId)
      this.$store.dispatch(FETCH_GAME_INTEL, this.gameId)
    }
  },
  mounted: function () {
    !this.$_.isEmpty(this.gameReport) || this.refreshGameData()
  }
}
</script>
