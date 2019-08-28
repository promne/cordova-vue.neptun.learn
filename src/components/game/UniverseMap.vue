<template>
  <v-stage :config="configStage" ref="konvaStage">
    <v-layer ref="starLayer">
      <v-circle v-for="star in stars" :key="star.id" :config="star" @mouseleave="starTooltip.visible = false" @mouseover="showStarTooltip(star)"/>
    </v-layer>
    <v-layer ref="starTooltipLayer">
      <v-text :config="starTooltip"/>
    </v-layer>
  </v-stage>
</template>

<script>

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']

export default {
  props: ['value'],
  data () {
    return {
      configStage: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      starTooltip: {
        fontFamily: 'Calibri',
        fontSize: 12,
        padding: 5,
        textFill: 'white',
        fill: 'black',
        alpha: 0.75,
        visible: false
      }
    }
  },
  methods: {
    showStarTooltip (star) {
      this.starTooltip = {
        ...this.starTooltip,
        x: star.x + 5,
        y: star.y + 5,
        text: star.data.n,
        visible: true
      }
    }
  },
  computed: {
    stars: function () {
      const starsData = Object.values(this.value.stars || {})

      const universeDimensions = starsData
        .map((point) => {
          return {x: Number(point.x), y: Number(point.y)}
        })
        .reduce((stat, point) => {
          return {
            minx: stat.minx < point.x ? stat.minx : point.x,
            miny: stat.miny < point.y ? stat.miny : point.y,
            maxx: stat.maxx > point.x ? stat.maxx : point.x,
            maxy: stat.maxy > point.y ? stat.maxy : point.y
          }
        },
        {minx: Number.POSITIVE_INFINITY, miny: Number.POSITIVE_INFINITY, maxx: Number.NEGATIVE_INFINITY, maxy: Number.NEGATIVE_INFINITY})

      const scalingFactor = Math.min(this.configStage.width / Math.abs(universeDimensions.maxx - universeDimensions.minx),
        this.configStage.height / Math.abs(universeDimensions.maxy - universeDimensions.miny))

      const convertPosToCanvas = (point) => {
        return { x: Math.round(Math.abs(Number(point.x) - universeDimensions.minx) * scalingFactor),
          y: Math.round(Math.abs(Number(point.y) - universeDimensions.miny) * scalingFactor)
        }
      }

      return starsData.map(star => {
        return {
          ...convertPosToCanvas(star),
          data: star,
          radius: 5,
          fill: colorArray[star.puid]
        }
      })
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.configStage.width = window.innerWidth
      this.configStage.height = window.innerHeight
    })
  }
}
</script>
