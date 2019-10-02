<template>
  <div id="map"></div>
</template>
<script>
import { latLng } from 'leaflet'
import marker from '../static/icons/arrival.png'
import markerShadow from '../static/icons/marker-shadow.png'
require('../static/js/Leaflet.Geodesic')
export default {
  props: { init: Boolean, flightPoints: Array, saudiPoints: Array },
  data: () => ({
    mapObject: {},
    markersLayer: new L.LayerGroup()
  }),

  methods: {
    initMap() {
      this.mapObject = L.map('map', {
        dragging: true,
        scrollWheelZoom: false,
        zoomControl: true,
        fullscreenControl: true,
        attributionControl: false,
        center: [51.505, -0.09],
        zoom: 2
      })
      L.tileLayer
        .bing({ bingMapsKey: this.$BingMapKey, imagerySet: 'CanvasLight' })
        .addTo(this.mapObject)
    },

    plotMap() {
      this.markersLayer.clearLayers()

      let origin = L.circleMarker(this.flightPoints[0], {
        fill: true,
        fillOpacity: 1,
        fillColor: '#ffffff',
        color: '#d68e25',
        radius: 7
      })

      let dest = L.circleMarker(
        this.flightPoints[this.flightPoints.length - 1],
        {
          fill: true,
          fillOpacity: 1,
          fillColor: '#d68e25',
          color: '#d68e25',
          radius: 7
        }
      )

      this.markersLayer.addLayer(origin)
      this.markersLayer.addLayer(dest)

      this.saudiPoints.forEach((points, index) => {
        if (index != 0 || index != this.saudiPoints.length - 1) {
          let marker = L.circleMarker(points, {
            fill: true,
            fillOpacity: 1,
            fillColor: '#d68e25',
            color: '#d68e25',
            radius: 4
          })
          this.markersLayer.addLayer(marker)
        }
      })

      var polyline = L.polyline(this.flightPoints, { color: '#d68e25' }).addTo(
        this.mapObject
      )
      this.markersLayer.addLayer(polyline)
      this.markersLayer.addTo(this.mapObject)

      this.mapObject.fitBounds(polyline.getBounds())
    }
  },

  watch: {
    init: {
      handler() {
        this.initMap()
      }
    },

    saudiPoints: {
      immediate: true,
      handler() {
        if (this.saudiPoints.length > 0) this.plotMap()
      }
    }
  }
}
</script>
<style lang="scss">
#map {
  height: 350px;
  width: 100%;
  z-index: 0 !important;
  .sectorPopup {
    bottom: 0 !important;
    .leaflet-popup-content-wrapper {
      border-radius: 0;
      padding: 0.2rem;
    }
  }
  .leaflet-control-zoom a {
    text-decoration: none !important;
    color: unset !important;
  }
}
</style>
