<template>
    <div>
        <template v-for="[category,detailData] in Object.entries(info)">
            <v-list two-line :key="category">
                <v-subheader v-text="category"/>

                <v-list-item v-for="(data, index) in detailData" :key="index">
                    <v-list-item-content>
                    <v-list-item-title>{{ data.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ data.subtitle }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </template>
    </div>
</template>

<script>
export default {
  props: ['value'],
  components: {
    'ObjectTreeView': () => import('@/components/ObjectTreeView')
  },
  computed: {
    info () {
      return {
        'technology': this.userTech,
        'infrastructure': this.empireInfrastructure
      }
    },
    empireInfrastructure () {
      return Object.values(this.value.report.players).map((player) => {
        const stars = Object.values(this.value.report.stars).filter((s) => {
          return s.puid === player.uid
        })
        let infraChanges = []

        const industry = this.$_.sum(stars.map(s => s.i))
        if (industry > player.total_industry) {
          infraChanges.push(`Industry ${player.total_industry} -> ${industry}`)
        }

        const economy = this.$_.sum(stars.map(s => s.e))
        if (economy > player.total_economy) {
          infraChanges.push(`Economy ${player.total_economy} -> ${economy}`)
        }

        const science = this.$_.sum(stars.map(s => s.s))
        if (science > player.total_science) {
          infraChanges.push(`Science ${player.total_science} -> ${science}`)
        }

        return infraChanges.length === 0 ? undefined : {
          title: player.alias,
          subtitle: infraChanges.join(', ')
        }
      })
        .filter(o => typeof o !== 'undefined')
    },
    userTech () {
      const rep = Object.values(this.value.report.players).map((player) => {
        return {
          ...player,
          intel: this.$_.find(this.value.intel.stats, {'tick': this.value.report.tick}).players[player.uid]
        }
      })
      const techIntelMap = {
        'propulsion': 'ht',
        'terraforming': 'tt',
        'research': 'gt',
        'weapons': 'wt',
        'banking': 'bt',
        'manufacturing': 'mt'
      }
      let result = []
      for (const player of rep) {
        for (const [tech, intel] of Object.entries(techIntelMap)) {
          if (player.tech[tech].level !== player.intel[intel]) {
            const possibleDonors = rep.filter(u => u.tech[tech].level >= player.tech[tech].level && u.uid !== player.uid).map(u => u.alias).join(', ')
            result.push({
              title: `${player.alias} ${tech}`,
              subtitle: `Upgrade ${player.intel[intel]} to ${player.tech[tech].level} with possible donors: ${possibleDonors}`
            })
          }
        }
      }
      return result
    }
  }
}
</script>
