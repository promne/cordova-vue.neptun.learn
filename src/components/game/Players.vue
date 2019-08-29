<template>
  <v-data-table
    :headers="headers"
    :items="players"
    :items-per-page="20"
    class="elevation-1"
    hide-default-footer
    dense
  >

      <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <template v-for="property in headers">
            <td :key="property.value" v-bind:style="getColorStyle(item, property)">{{ resolve(property.value, item) }}</td>
          </template>
        </tr>
      </tbody>
    </template>

  </v-data-table>
</template>

<script>

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
        { text: 'Ships production', value: 'ships_production', colorized: true },
        { text: 'Money production', value: 'money_production', colorized: true },
        { text: 'Stars', value: 'total_stars', colorized: true },
        { text: 'Ships', value: 'total_strength', colorized: true },
        { text: 'Industry', value: 'total_industry', colorized: true },
        { text: 'Economy', value: 'total_economy', colorized: true },
        { text: 'Science', value: 'total_science', colorized: true },
        { text: 'Scanning', value: 'tech.scanning.level', colorized: true },
        { text: 'Propulsion', value: 'tech.propulsion.level', colorized: true },
        { text: 'Terraforming', value: 'tech.terraforming.level', colorized: true },
        { text: 'Research', value: 'tech.research.level', colorized: true },
        { text: 'Weapons', value: 'tech.weapons.level', colorized: true },
        { text: 'Banking', value: 'tech.banking.level', colorized: true },
        { text: 'Manufacturing', value: 'tech.manufacturing.level', colorized: true }
      ]
    }
  },
  methods: {
    resolve (path, obj, separator = '.') {
      var properties = Array.isArray(path) ? path : path.split(separator)
      return properties.reduce((prev, curr) => prev && prev[curr], obj)
    },
    getColorStyle (player, property) {
      const res = {}
      if (property.colorized) {
        res['background-color'] = this.getColorShare(player, property.value)
      }
      return res
    },
    getColorShare (player, propertyName, reverse = false) {
      const playerValue = this.resolve(propertyName, player)
      const sorted = Object.values(this.players).map(p => this.resolve(propertyName, p)).sort((a, b) => (a > b) ? 1 : -1).filter((value, index, self) => self.indexOf(value) === index)
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
          ships_production: player.total_industry * (player.tech.manufacturing.level + 5),
          money_production: (player.total_economy * 10) + (player.tech.banking.level * 75)
        }
      })
    }
  }

}
</script>
