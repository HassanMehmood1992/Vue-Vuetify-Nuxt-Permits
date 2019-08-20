<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="12" class="d-flex justify-end pa-0">
        <v-btn
          depressed
          small
          color="accent"
          @click="$router.back()"
          class="caption text-none mr-2"
        >Back</v-btn>
        <v-btn depressed small outlined color="accent" class="caption text-none">Edit</v-btn>
      </v-col>
    </v-row>
    <v-layout wrap>
      <v-flex xs12 sm12 md6>
        <v-layout wrap>
          <!-- Operator Information -->
          <v-flex xs12 sm12 md12>
            <span class="primary-color half-a-border-on-bottom">Operator Information</span>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Name</div>
            <div>Click Aviation Network</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Country</div>
            <div>United Arab Emirates</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Business Phone Number (e.g +966-xx-xxxxxxx)</div>
            <div>+966-21-5483439</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Fax Number (e.g +966-xx-xxxxxxx)</div>
            <div>+966-21-5483439</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Email</div>
            <div>support@click.aero</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Website</div>
            <div>www.click.aero</div>
          </v-flex>

          <!-- Permit information -->
          <v-flex xs12 sm12 md12 mt-9>
            <span class="primary-color half-a-border-on-bottom">Permit Information</span>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Permit Type</div>
            <div>OVER - Overflying</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Purpose of Landing/Overflying</div>
            <div>BUSN - Business</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Aircraft</div>
            <div>172 Skyhawk</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Flight Type</div>
            <div>General Aviation</div>
          </v-flex>

          <!-- Permit Requirements -->
          <v-flex xs12 sm12 md12 mt-9>
            <span class="primary-color half-a-border-on-bottom">Permit Requirements</span>
            <v-layout mt-4>
              <v-flex md5>
                <div class="secondary-color caption">Name</div>
              </v-flex>
              <v-flex md4>
                <div class="secondary-color caption">File</div>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md5>
                <div class="subtitle-1">Certificate Registration COR</div>
              </v-flex>
              <v-flex md4>
                <div class="accent-color subtitle-1">cor.pdf</div>
              </v-flex>
              <v-flex md3>
                <v-btn small depressed class="caption" color="primary">Approved</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- ATC Route -->
      <v-flex xs12 sm12 md6>
        <span class="half-a-border-on-bottom primary-color">ATC Route</span>
        <div id="mapCanvas" class="pa-0 mt-5">
          <flight-map :init="renderMap" :sectors="sectors"></flight-map>
        </div>
        <div class="d-flex justify-space-between mt-5">
          <div>
            <div class="secondary-color caption">Navigation Charge</div>
            <div class="accent-color font-weight-bold">151 SR</div>
          </div>

          <div>
            <v-btn
              depressed
              color="primary"
              class="body-2 text-none mt-2"
            >Approve and request payment</v-btn>
            <v-btn depressed outlined color="accent" class="body-2 text-none mt-2">Reject</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Map from '~/components/Map'

export default {
  layout: 'main',
  components: { 'flight-map': Map },
  data: () => ({
    title: 'Request Details',
    renderMap: false,
    sectors: [
      JSON.parse(
        `{"departureAirportId":3437,"arrivalAirportId":2137,"departureAirportName":"KTEB","arrivalAirportName":"OPRN","departureAirport":{"id":3437,"name":"Teterboro","fullName":"(KTEB/TEB/TEB) Teterboro, United States","iata":"TEB","icao":"KTEB","faaCode":"TEB","latitude":40.85011111111111,"longitude":-74.06083333333333,"altitude":0,"city":{"id":null,"name":null},"state":{"id":null,"name":null},"country":{"id":81,"name":"United States"}},"arrivalAirport":{"id":2137,"name":"Benazir Bhutto Intl","fullName":"(OPRN) Benazir Bhutto Intl, Islamabad, Pakistan","iata":"","icao":"OPRN","faaCode":null,"latitude":33.61676666666667,"longitude":73.09873888888889,"altitude":0,"city":{"id":5365,"name":"Islamabad"},"state":{"id":546,"name":""},"country":{"id":207,"name":"Pakistan"}},"speed":300,"distance":"5193.885 nautical miles","hours":"17h 18m (add 15 minutes of flextime)"}`
      )
    ]
  }),
  created() {
    this.$store.commit('app/setAppTitle', 'Permit Approval')
  },
  mounted() {
    console.log('here' + this.$route.name)

    this.renderMap = true
    //this.sectors = []

    this.$store.dispatch('app/setAppTitle', this.title)
  }
}
</script>


<style lang="scss">
@import '@/assets/global.scss';
.permit-border {
  border-bottom: 0.5px solid #cacaca;
}
.half-a-border-on-bottom {
  border-bottom: 1px solid $accent;
  position: relative;
  padding-bottom: 5px;
}
.half-a-border-on-bottom:after {
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
  display: block;
  content: '';
  width: 65%;
  height: 5px;
  background-color: #fafafa;
  position: absolute;
  right: 0;
  bottom: -1px;
}
</style>
