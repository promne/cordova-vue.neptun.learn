<template>
  <v-data-table
    :headers="headers"
    :items="players"
    :items-per-page="20"
    class="elevation-1"
    hide-default-footer
    dense
  >
    <template v-slot:item.total_stars="{ item }">
      <v-chip :color="getColorShare(item, 'total_stars')" >{{ item.total_stars }}</v-chip>
    </template>
    <template v-slot:item.tech.weapons.level="{ item }">
      <v-chip :color="getColorShare(item, 'tech.weapons.level')" >{{ item.tech.weapons.level }}</v-chip>
    </template>
  </v-data-table>
</template>

<script>

const resolve = (path, obj, separator = '.') => {
  var properties = Array.isArray(path) ? path : path.split(separator)
  return properties.reduce((prev, curr) => prev && prev[curr], obj)
}

export default {
  props: ['value'],
  data () {
    return {
      headers: [
        {
          text: 'Alias',
          align: 'left',
          value: 'alias'
        },
        { text: 'Ships production', value: 'ships_production' },
        { text: 'Money production', value: 'money_production' },
        { text: 'Stars', value: 'total_stars' },
        { text: 'Ships', value: 'total_strength' },
        { text: 'Industry', value: 'total_industry' },
        { text: 'Economy', value: 'total_economy' },
        { text: 'Science', value: 'total_science' },
        { text: 'Scanning', value: 'tech.scanning.level' },
        { text: 'Propulsion', value: 'tech.propulsion.level' },
        { text: 'Terraforming', value: 'tech.terraforming.level' },
        { text: 'Research', value: 'tech.research.level' },
        { text: 'Weapons', value: 'tech.weapons.level' },
        { text: 'Banking', value: 'tech.banking.level' },
        { text: 'Manufacturing', value: 'tech.manufacturing.level' }
      ]
    }
  },
  methods: {
    getColorShare (player, property, reverse = false) {
      const playerValue = resolve(property, player)
      const sorted = Object.values(this.value.players).map(p => resolve(property, p)).sort((a, b) => (a > b) ? 1 : -1).filter((value, index, self) => self.indexOf(value) === index)
      const index = sorted.indexOf(playerValue)
      const share = index / sorted.length
      const hue = ((reverse ? (1 - share) : share) * 120).toString(10)
      return ['hsl(', hue, ',100%,50%)'].join('')
    }
  },
  computed: {
    players () {
      const usersData = Object.values(this.value.players || {})

      return usersData.map((player) => {
        return {
          ...player,
          alias: player.alias,
          ships_production: player.total_industry * (player.tech.manufacturing.level + 5),
          money_production: (player.total_economy * 10) + (player.tech.banking.level * 75)
        }
      })
    }
  }

}
</script>
