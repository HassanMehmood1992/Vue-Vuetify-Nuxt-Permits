<template>
  <v-layout wrap>
    <v-flex xs12 sm12 md12 class="d-flex justify-end pa-0">
      <v-btn
        depressed
        small
        color="accent"
        @click="$router.back()"
        class="caption text-none mr-2"
      >Back</v-btn>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout wrap>
          <v-flex xs12 sm12 md6 class="pr-10">
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <span class="primary-color half-a-border-on-bottom">Operator Information</span>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-checkbox v-model="useMyDetails" hide-details label="Use my details"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Name" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Country" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Business Phone Number (e.g. +966-12-3456789)`" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Fax Number (e.g. +966-12-3456789)" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Email Address" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Website" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <span class="primary-color half-a-border-on-bottom">Permit Information</span>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Permit Type" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Purpose of Landing / Overflying" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Aircraft" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Flight Type" class="pr-2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <span class="primary-color half-a-border-on-bottom">Permit Requirements</span>
                <div class="pr-10 pt-5">
                  <v-file-input
                    label="Certificate of Registration"
                    append-outer-icon="mdi-delete"
                    append-icon="mdi-upload"
                  ></v-file-input>
                  <v-file-input
                    label="Standard Certificate of Airworthiness COA"
                    append-outer-icon="mdi-delete"
                    append-icon="mdi-upload"
                  ></v-file-input>
                  <v-file-input
                    label="Third Party Liability Insurance"
                    append-outer-icon="mdi-delete"
                    append-icon="mdi-upload"
                  ></v-file-input>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <span class="half-a-border-on-bottom primary-color">ATC Route</span>
            <v-text-field label="ATC Route" class="pr-2 mt-3">
              <template v-slot:append>
                <v-tooltip top>
                  <template v-slot:activator="{on}">
                    <v-icon v-on="on" @click="calculateNavCharge">mdi-calculator</v-icon>
                  </template>
                  Calculate Navigation Charge
                </v-tooltip>
              </template>
            </v-text-field>
            <div id="mapCanvas">
              <atc-map :init="renderMap" :sectors="sectors"></atc-map>
            </div>

            <div class="d-flex justify-space-between mt-5">
              <div>
                <div class="caption">Estimated Navigation Charge</div>
                <p class="accent-color font-weight-black">151 SAR</p>
              </div>
              <v-btn
                depressed
                color="primary"
                v-if="($route.name) == 'new-request'"
              >Generate Performa</v-btn>
              <v-btn
                depressed
                color="primary"
                v-if="($route.name) == 'requests-edit-id'"
              >Update and Submit Performa</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import Map from '~/components/Map'

export default {
  components: { 'atc-map': Map },
  data: () => ({
    valid: false,
    renderMap: false,
    sectors: [
      JSON.parse(
        `{"departureAirportId":3437,"arrivalAirportId":2137,"departureAirportName":"KTEB","arrivalAirportName":"OPRN","departureAirport":{"id":3437,"name":"Teterboro","fullName":"(KTEB/TEB/TEB) Teterboro, United States","iata":"TEB","icao":"KTEB","faaCode":"TEB","latitude":40.85011111111111,"longitude":-74.06083333333333,"altitude":0,"city":{"id":null,"name":null},"state":{"id":null,"name":null},"country":{"id":81,"name":"United States"}},"arrivalAirport":{"id":2137,"name":"Benazir Bhutto Intl","fullName":"(OPRN) Benazir Bhutto Intl, Islamabad, Pakistan","iata":"","icao":"OPRN","faaCode":null,"latitude":33.61676666666667,"longitude":73.09873888888889,"altitude":0,"city":{"id":5365,"name":"Islamabad"},"state":{"id":546,"name":""},"country":{"id":207,"name":"Pakistan"}},"speed":300,"distance":"5193.885 nautical miles","hours":"17h 18m (add 15 minutes of flextime)"}`
      )
    ],
    useMyDetails: false
  }),

  mounted() {
    this.renderMap = true
  },

  methods: {
    calculateNavCharge() {}
  }
}
</script>
