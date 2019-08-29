<template>
  <v-layout wrap class="request-form">
    <v-flex xs12 sm12 md12 class="d-flex justify-space-between pa-0">
      <div v-if="action == 'edit'" class="mb-3 d-flex">
        <div class="mr-10">
          <div class="overline">Request Number</div>
          <div class="accent--text">{{ request ? request.number : '' }}</div>
        </div>
        <div>
          <div class="overline">Status</div>
          <div class="accent--text">{{ request && request.status ? request.status.name : '' }}</div>
        </div>
      </div>
      <v-btn
        v-if="action == 'edit'"
        depressed
        small
        color="accent"
        @click="$router.back()"
        class="caption text-none mr-2"
      >Back</v-btn>
    </v-flex>
    <v-flex xs12 sm12 md12 mt-3>
      <v-form v-model="valid" ref="form">
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
                <v-text-field
                  label="Name*"
                  class="pr-2"
                  v-model="model.name"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <country-select
                  v-model="model.country"
                  label="Country*"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  @onSelect="model.country = $event;"
                ></country-select>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field
                  label="Business Phone Number* (e.g. +966-12-3456789)"
                  class="pr-2"
                  v-model="model.businessPhoneNumber"
                  required
                  :rules="[rules.required]"
                  v-mask="[masks.phoneNumber]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field
                  label="Fax Number (e.g. +966-12-3456789)"
                  class="pr-2"
                  v-model="model.faxNumber"
                  v-mask="[masks.phoneNumber]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field
                  label="Email Address*"
                  class="pr-2"
                  v-model="model.emailAddress"
                  required
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Website" class="pr-2" v-model="model.website"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <span class="primary-color half-a-border-on-bottom">Permit Information</span>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <select-field
                  v-model="model.permitType"
                  label="Permit Type*"
                  type="permitTypes"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  @onSelect="model.permitType = $event;getPermitRequirements()"
                ></select-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <select-field
                  v-model="model.purpose"
                  label="Purpose of Landing/Overflying*"
                  type="purposeOfLanding"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  @onSelect="model.purpose = $event;getPermitRequirements()"
                ></select-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <aircraft-select
                  v-model="model.aircraft"
                  label="Aircraft*"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  @onSelect="model.aircraft = $event"
                ></aircraft-select>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <select-field
                  v-model="model.flightType"
                  label="Flight Type*"
                  type="flightTypes"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  @onSelect="model.flightType = $event;getPermitRequirements()"
                ></select-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <span class="primary-color half-a-border-on-bottom">Permit Requirements</span>
                <template v-if="permitRequirements.length > 0">
                  <div class="pr-10 pt-5">
                    <v-file-input
                      v-for="permitReq in permitRequirements"
                      :key="permitReq.id"
                      :label="permitReq.name"
                      v-model="permitReq.file"
                      class="mt-2"
                      :loading="permitReq.uploading"
                      :error="permitReq.documentId == 'failed' || permitReq.documentId == 'required'"
                      :error-messages="permitReq.documentId == 'failed' ? 'Failed to upload' : permitReq.documentId == 'required' ? 'Required.' : ''"
                      :append-outer-icon="permitReq.documentId && permitReq.documentId != 'required' && permitReq.documentId != 'failed' ? 'mdi-download' : ''"
                      :rules="[rules.required]"
                      required
                      @change="uploadDocuments(permitReq)"
                      @click:clear="deleteDocument(permitReq)"
                      @click:append-outer="downloadDocument(permitReq.documentId)"
                    ></v-file-input>
                  </div>
                </template>
                <div
                  class="caption mt-5"
                  v-else-if="permitRequirements.length == 0 && !model.permitType && !model.purpose && !model.flightType"
                >Select Permit Type or Purpose of Landing/Overflying or Flight Type for the list of requirements.</div>
                <div
                  class="caption mt-5"
                  v-else-if="permitRequirements.length == 0"
                >No Permit Requirements for this request.</div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <span class="half-a-border-on-bottom primary-color">ATC Route</span>
            <v-layout wrap mt-3>
              <v-flex xs12 sm12 md6>
                <airport-select
                  v-model="model.originAirport"
                  label="Origin*"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  @onSelect="model.originAirport = $event"
                ></airport-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <airport-select
                  v-model="model.destAirport"
                  label="Destination*"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  @onSelect="model.originAirport = $event"
                ></airport-select>
              </v-flex>
            </v-layout>
            <v-textarea
              v-model="model.atcRoute"
              label="ATC Route*"
              class="pr-2 mt-3"
              required
              :rules="[rules.required]"
              :loading="calculatingNavCharge"
            ></v-textarea>
            <div class="d-flex justify-end">
              <v-btn
                small
                outlined
                class="caption"
                color="accent"
                @click="onATCCalculations"
                :disabled="!model.aircraft || !model.atcRoute"
              >Calculate Navigation Route</v-btn>
            </div>
            <div id="mapCanvas" class="mt-5">
              <atc-map :init="renderMap" :flightPoints="flightPoints" :saudiPoints="saudiPoints"></atc-map>
            </div>

            <div class="d-flex justify-space-between mt-5">
              <div>
                <div class="caption">Estimated Navigation Charge</div>
                <p
                  class="accent-color font-weight-black"
                >{{ model.navigationCharges ? `${model.navigationCharges.toFixed(2)} SAR` : '--' }}</p>
              </div>
              <v-btn
                depressed
                color="primary"
                :disabled="!valid || !model.navigationCharges || loading"
                @click="onRequest"
              >{{ requestBtnText }}</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>

    <app-snackbar :snackbar="snackbar" @snackbarAction="onSnackbarAction($event)"></app-snackbar>
  </v-layout>
</template>
<script>
import Map from '~/components/Map'
import SelectField from '~/components/SelectField'
import CountrySelect from '~/components/CountrySelect'
import AircraftSelect from '~/components/AircraftSelect'
import AirportSelect from '~/components/AirportSelect'
import { mask } from 'vue-the-mask'
import user from '~/testData'
import points from '~/points'

export default {
  props: ['action', 'requestBtnText', 'request'],
  components: {
    'atc-map': Map,
    SelectField,
    CountrySelect,
    AircraftSelect,
    AirportSelect
  },
  directives: { mask },
  data: () => ({
    requestId: null,
    files: [],
    valid: false,
    renderMap: false,
    sectors: [
      JSON.parse(
        `{"departureAirportId":3437,"arrivalAirportId":2137,"departureAirportName":"KTEB","arrivalAirportName":"OPRN","departureAirport":{"id":3437,"name":"Teterboro","fullName":"(KTEB/TEB/TEB) Teterboro, United States","iata":"TEB","icao":"KTEB","faaCode":"TEB","latitude":40.85011111111111,"longitude":-74.06083333333333,"altitude":0,"city":{"id":null,"name":null},"state":{"id":null,"name":null},"country":{"id":81,"name":"United States"}},"arrivalAirport":{"id":2137,"name":"Benazir Bhutto Intl","fullName":"(OPRN) Benazir Bhutto Intl, Islamabad, Pakistan","iata":"","icao":"OPRN","faaCode":null,"latitude":33.61676666666667,"longitude":73.09873888888889,"altitude":0,"city":{"id":5365,"name":"Islamabad"},"state":{"id":546,"name":""},"country":{"id":207,"name":"Pakistan"}},"speed":300,"distance":"5193.885 nautical miles","hours":"17h 18m (add 15 minutes of flextime)"}`
      )
    ],
    useMyDetails: false,
    model: {
      name: '',
      country: '',
      businessPhoneNumber: '',
      faxNumber: '',
      emailAddress: '',
      website: '',
      permitType: '',
      purpose: '',
      flightType: '',
      aircraft: null,
      atcRoute:
        'TOVBA DCT BARDI/N0440F380 UM191 DIPOL UM871 MABUX UT257 LASPO UZ224 NINES UM134 LUXUR/N0440F390 UM134 ANB UA411 TUC UM978 SONAK M978 DOBIX UM978 GZO UM980 GODAK UL874 VANIX UP868 ARLOS UN4 SALUN Q680 DBA UM872 WEJ UL604 GAS UL308 DAROR UP559 NALPO P559 DESDI',
      originAirport: '',
      destAirport: '',
      navigationCharges: ''
    },
    payload: {},
    permitRequirements: [],
    calculatingNavCharge: false,
    snackbar: {
      show: false,
      timeout: 6000,
      text: '',
      actions: ['Close']
    },
    flightPoints: [],
    saudiPoints: [],
    points: {
      routePoints: [],
      firPoints: []
    },
    user: user
  }),

  computed: {
    rules() {
      return this.$store.state.app.inputRules
    },

    masks() {
      return this.$store.state.app.masks
    },

    loading() {
      return this.$store.state.app.loading
    }
  },

  watch: {
    useMyDetails() {
      if (this.useMyDetails) {
        this.model.name = user.name
        this.model.country = user.country
        this.model.businessPhoneNumber = user.businessPhoneNumber
        this.model.emailAddress = user.emailAddress
        this.model.website = user.website
      } else {
        this.model.name = ''
        this.model.country = ''
        this.model.businessPhoneNumber = ''
        this.model.emailAddress = ''
        this.model.website = ''
      }
    },

    request() {
      if (this.request && this.action == 'edit') {
        this.model.name = this.request.operatorName
        this.model.country = this.request.country
        this.model.businessPhoneNumber = this.request.operatorPhone
        this.model.faxNumber = this.request.operatorFax
        this.model.emailAddress = this.request.operatorEmail
        this.model.website = this.request.operatorWebSite
        this.model.permitType = this.request.permitType
        this.model.purpose = this.request.purposeOfLanding
        this.model.aircraft = this.request.aircraft
        this.model.flightType = this.request.flightType
        this.model.atcRoute = this.request.atcRoute
        this.model.navigationCharges = this.request.navigationCharges
        this.permitRequirements = this.request.requestRequirements.map(req => {
          return {
            id: req.requirementId,
            name: req.requirementName,
            description: req.requirementName,
            documentId: req.documentId,
            documentName: req.documentName,
            file: [],
            uploading: false
          }
        })
        this.points.routePoints = JSON.parse(this.request.routePoints)
        this.points.firPoints = JSON.parse(this.request.firValidatedPoints)[
          'firPoints'
        ]
        this.flightPoints = this.points.routePoints.mappingPoints.map(point => {
          return [point.point.latitude, point.point.longitude]
        })
        this.saudiPoints = this.points.firPoints.map(point => {
          return [point.point.latitude, point.point.longitude]
        })

        this.permitRequirements.forEach(req => {
          req.file = this.getFile(req)
        })
      }
    }
  },

  mounted() {
    this.renderMap = true
  },

  methods: {
    getPermitRequirements() {
      let payload = {
        ...(this.model.permitType
          ? { PermitTypeId: this.model.permitType.id }
          : {}),
        ...(this.model.flightType
          ? { FlightTypeId: this.model.flightType.id }
          : {}),
        ...(this.model.purpose ? { POLId: this.model.purpose.id } : {})
      }

      this.$axios.$post('requirement/filter', payload).then(response => {
        this.permitRequirements = response.result
        this.permitRequirements.forEach(req => {
          this.$set(req, 'documentName', '')
          this.$set(req, 'documentId', '')
          this.$set(req, 'file', [])
          this.$set(req, 'uploading', false)
        })
      })
    },

    onRequest() {
      let completeReq = this.permitRequirements.filter(
        req => !req.documentId || req.documentId == 'failed'
      )
      if (completeReq.length > 0) {
        this.permitRequirements.forEach(req => {
          if (!req.documentId) {
            req.documentId = 'required'
            this.valid = false
          }
        })
      } else {
        this.payload = {
          AircraftId: this.model.aircraft ? this.model.aircraft.id : null,
          PermitTypeId: this.model.permitType ? this.model.permitType.id : null,
          PurposeOfLandingId: this.model.purpose ? this.model.purpose.id : null,
          FlightTypeId: this.model.flightType ? this.model.flightType.id : null,
          CountryId: this.model.country ? this.model.country.id : null,
          AirportId: this.model.airport ? this.model.airport.id : null,
          ATCRoute: this.model.atcRoute ? this.model.atcRoute : null,
          OriginAirport: this.model.originAirport
            ? this.model.originAirport.id
            : null,
          DestAirport: this.model.destAirport
            ? this.model.destAirport.id
            : null,
          OperatorName: this.model.name ? this.model.name : null,
          OperatorPhone: this.model.businessPhoneNumber
            ? this.model.businessPhoneNumber
            : null,
          OperatorEmail: this.model.emailAddress
            ? this.model.emailAddress
            : null,
          OperatorFax: this.model.faxNumber ? this.model.faxNumber : null,
          OperatorWebSite: this.model.website ? this.model.website : null,
          NavigationCharges: this.model.navigationCharges
            ? this.model.navigationCharges
            : null,
          requestRequirements: this.permitRequirements.map(req => {
            return {
              ...(this.action == 'edit' ? { requestId: this.request.id } : {}),
              requirementId: req.id,
              documentId: req.documentId,
              documentName: req.documentName
            }
          }),
          ...(this.action == 'edit' ? { id: this.request.id } : {}),
          routePoints: JSON.stringify(this.points.routePoints),
          FIRValidatedPoints: JSON.stringify({
            firPoints: this.points.firPoints
          })
        }

        if (this.action === 'add') this.$emit('generateRequest', this.payload)
        else if (this.action === 'edit')
          this.$emit('updateRequest', this.payload)
      }
    },

    uploadDocuments(req) {
      if (req.file) {
        console.log('req.file', req.file)
        req.uploading = true
        const fd = new FormData()
        fd.append('file', req.file)
        this.$axios
          .$post('document/uploadDocuments', fd)
          .then(response => {
            if (response.success) {
              req.documentId = response.result[0].objectId
              req.documentName = response.result[0].fileName
            } else {
              req.documentId = 'failed'
              req.documentName = ''
            }
          })
          .catch(error => {
            req.documentId = 'failed'
          })
          .finally(() => {
            req.uploading = false
          })
      }
    },

    deleteDocument(doc) {
      doc.documentId = ''
      doc.documentName = ''
    },

    onATCCalculations() {
      this.calculatingNavCharge = true
      this.analyzeNavRoute().then(response => {
        this.flightPoints = response.result.routePoints.mappingPoints.map(
          point => {
            return [point.point.latitude, point.point.longitude]
          }
        )
        this.points.routePoints = response.result.routePoints
        this.getSaudiFir(response.result).then(resp => {
          this.saudiPoints = resp.result.firPoints.map(p => {
            return [p.point.latitude, p.point.longitude]
          })
          this.points.firPoints = resp.result.firPoints
          this.calculateDistance(resp.result).then(res => {
            this.calculateNavCharge(res.result)
              .then(r => {
                this.model.navigationCharges = r.result
              })
              .finally(() => {
                this.calculatingNavCharge = false
              })
          })
        })
      })
    },

    analyzeNavRoute() {
      let payload = {
        FromIATA: 'OPO',
        ToIATA: 'DWC',
        ATCRoute: this.model.atcRoute
      }
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('GIS/AnalyseNavigationRoute', payload)
          .then(response => {
            if (response.success) {
              resolve(response)
            } else {
              this.snackbar = {
                show: true,
                timeout: 6000,
                text: response.message,
                actions: ['Close']
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getSaudiFir(payload) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('GIS/SaudiFIR', payload)
          .then(response => {
            if (response.success) {
              resolve(response)
            } else {
              this.snackbar = {
                show: true,
                timeout: 6000,
                text: response.message,
                actions: ['Close']
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    calculateDistance(payload) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('GIS/CalculateDistanceSaudi', payload)
          .then(response => {
            if (response.success) {
              resolve(response)
            } else {
              this.snackbar = {
                show: true,
                timeout: 6000,
                text: response.message,
                actions: ['Close']
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    calculateNavCharge(data) {
      let distance = _.sumBy(data, 'kilometers')
      let payload = {
        distance: distance,
        distanceUnit: 'km',
        mtow: this.model.aircraft.mtow,
        mtowUnit: this.model.aircraft.mtowUnit
      }

      return new Promise((resolve, reject) => {
        this.$axios
          .$post('request/CalculateNavCharge', payload)
          .then(response => {
            if (response.success) {
              resolve(response)
            } else {
              this.snackbar = {
                show: true,
                timeout: 6000,
                text: response.message,
                actions: ['Close']
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getFile(doc) {
      console.log('doc', doc)
      doc.uploading = true
      var files = []
      this.$axios
        .$request({
          url: `Document/download/${doc.documentId}`,
          method: 'GET',
          responseType: 'blob'
        })
        .then(response => {
          const blob = new Blob([response], { type: 'application/pdf' })
          var file = new File([blob], doc.documentName)
          files.push(file)
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          doc.uploading = false
        })

      return files
    },

    downloadDocument(docId) {
      this.$store.dispatch('app/setLoading', true)
      this.$axios
        .$request({
          url: `Document/download/${docId}`,
          method: 'GET',
          responseType: 'blob' // important
        })
        .then(response => {
          const blob = new Blob([response], {
            type: 'application/pdf'
          })
          const a = document.createElement('a')
          a.href = window.URL.createObjectURL(blob)
          a.style.position = 'fixed'
          a.target = '_blank'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false)
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/global.scss';
</style>
