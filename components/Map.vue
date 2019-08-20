<template>
  <div id="map"></div>
</template>
<script>
import { latLng } from 'leaflet'
import marker from '../static/icons/arrival.png'
import markerShadow from '../static/icons/marker-shadow.png'
require('../static/js/Leaflet.Geodesic')
export default {
  props: { init: Boolean, sectors: Array },
  data: () => ({
    mapObject: {}
  }),
  methods: {
    initMap() {
      let sectorsInfo = []
      let latLngArray = []
      // Get the sector detail and remove the duplication between legs
      _.map(this.sectors, sector => {
        if (sector.departureAirport) {
          sectorsInfo.push({
            latlng: new L.LatLng(
              sector.departureAirport.latitude,
              sector.departureAirport.longitude
            ),
            name: sector.departureAirport.fullName,
            airportId: sector.departureAirportId
          })
          latLngArray.push(
            new L.LatLng(
              sector.departureAirport.latitude,
              sector.departureAirport.longitude
            )
          )
        }
        if (sector.arrivalAirport) {
          sectorsInfo.push({
            latlng: new L.LatLng(
              sector.arrivalAirport.latitude,
              sector.arrivalAirport.longitude
            ),
            name: sector.arrivalAirport.fullName,
            airportId: sector.arrivalAirportId
          })
          latLngArray.push(
            new L.LatLng(
              sector.arrivalAirport.latitude,
              sector.arrivalAirport.longitude
            )
          )
        }
      })
      // Remove the duplicate sectors in between
      sectorsInfo = _.uniqBy(sectorsInfo, 'airportId')
      var myIcon = L.icon({
        iconUrl: marker,
        iconSize: [45, 45],
        iconAnchor: [25, 45],
        popupAnchor: [-3, -30],
        shadowUrl: markerShadow,
        shadowAnchor: [15, 40]
      })
      let zoomLevel = _.size(sectorsInfo) > 1 ? 3 : 12
      this.mapObject = L.map('map', {
        dragging: true,
        scrollWheelZoom: false,
        zoomControl: true,
        fullscreenControl: true,
        attributionControl: false
      }).setView(sectorsInfo[0].latlng, zoomLevel)

      L.tileLayer
        .bing({ bingMapsKey: this.$BingMapKey, imagerySet: 'CanvasLight' })
        .addTo(this.mapObject)

      var Geodesic = L.geodesic([], {
        weight: 2,
        color: '#d68e25',
        dash: 0.5,
        smoothFactor: 2,
        steps: 40
      }).addTo(this.mapObject)

      _.map(sectorsInfo, (sector, index) => {
        let popupContent = `<div> \
        <div>${
          sector.icao ? sector.icao : sector.faaCode ? sector.faaCode : ''
        }</div> \
        <div class="name">${sector.name}</div> \
        </div>`
        var latlng = []
        // Departure Airport Marker
        if (index == 0)
          L.circleMarker(sector.latlng, {
            fill: true,
            fillOpacity: 1,
            fillColor: '#ffffff',
            color: '#d68e25',
            radius: 7
          })
            .bindPopup(popupContent, {
              closeOnClick: false,
              autoClose: false,
              className: 'sectorPopup'
            })
            .addTo(this.mapObject)
        // L.marker(sector.latlng, { icon: myIcon })
        //   .bindPopup(popupContent, {
        //     closeOnClick: false,
        //     autoClose: false,
        //     className: 'sectorPopup'
        //   })
        //   .addTo(this.mapObject)
        else
          L.circleMarker(sector.latlng, {
            fill: true,
            fillOpacity: 1,
            fillColor: '#d68e25',
            color: '#d68e25',
            radius: 7
          })
            .bindPopup(popupContent, {
              closeOnClick: false,
              autoClose: false,
              className: 'sectorPopup'
            })
            .addTo(this.mapObject)
      })
      latLngArray = _.uniqBy(latLngArray, 'lat')
      Geodesic.setLatLngs([latLngArray])
      if (_.size(sectorsInfo) > 1) this.mapObject.fitBounds(latLngArray)
    }
  },
  watch: {
    init: {
      handler() {
        this.initMap()
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
