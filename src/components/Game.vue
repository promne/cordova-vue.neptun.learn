<template>
  <v-treeview :items="gameDataArray" ></v-treeview>
</template>

<script>
import { mapGetters } from 'vuex'

var convertObjectToItems = function (object, counter = 0) {
  var items = []
  for (var key in object) {
    var value = object[key]
    counter++
    var item
    switch (typeof value) {
      case 'object':
        var children = convertObjectToItems(value, counter)
        item = {
          id: counter,
          name: key,
          children: children
        }
        if (Object.keys(children).length > 1) {
          counter = children[children.length - 1].id
        }
        break
      default:
        item = {
          id: counter,
          name: key + ': ' + value
        }
    }
    items.push(item)
  }
  return items
}

export default {
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated']),
    gameId: function () {
      return this.$route.params.gameId
    },
    gameDataArray: function () {
      var gameData = this.currentUser && this.currentUser.open_games ? this.currentUser.open_games.find(i => i.number === this.gameId) : {}
      return convertObjectToItems(gameData)
    }
  },
  methods: {
  }
}
</script>
