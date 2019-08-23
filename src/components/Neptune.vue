<template>
  <div>
    <v-btn>Butonek</v-btn>
    <v-treeview :items="userDataArray" ></v-treeview>
  </div>
    <!--
  <div>
    <h2>Neptune pride things</h2>
    <button @click="greet">FetchGalaxy</button>
    <div>{{ someData }}</div>
  </div>
      -->
</template>

<script>
import { mapGetters } from 'vuex'

import axios from 'axios'

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
  name: 'Neptune',
  data: function () {
    return {
      someData: {}
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated']),
    userDataArray: function () {
      return convertObjectToItems(this.currentUser)
    }
  },
  methods: {
    greet: function (event) {
      var bodyFormData = new FormData()
      bodyFormData.append('type', 'order')
      bodyFormData.append('order', 'full_universe_report')
      bodyFormData.append('version', '')
      bodyFormData.append('game_number', '5968876432261120')

      var config = {
        url: 'https://np.ironhelmet.com/trequest/order',
        method: 'POST',
        data: bodyFormData,
        withCredentials: true
      }

      axios.request(config)
        .then(r => {
          console.log(r)
          this.someData = r.data
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>
