<template>
  <v-layout wrap class="request-form white-background pa-5">
    <v-flex xs12 sm12 md12 class="d-flex justify-space-between pa-0">
      <div v-if="action == 'edit'" class="mb-3 d-flex">
        <div class="mr-10">
          <div class="caption grey--text">Request Number</div>
          <div class="accent--text">{{ request ? request.number : '' }}</div>
        </div>
        <div>
          <div class="caption grey--text">Status</div>
          <div class="d-flex align-center">
            <div
              class="status-dot mr-1"
              :class="request && request.status ? `${request.status.name.toLowerCase().split(' ').join('-')}-status` : ''"
            ></div>
            <div>{{ request && request.status ? request.status.name : '' }}</div>
          </div>
        </div>
      </div>
      <v-btn
        v-if="action == 'edit'"
        text
        small
        color="accent"
        @click="$router.back()"
        class="text-none mr-2"
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
              <!-- Name -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field class="pr-2" v-model="model.name" required :rules="[rules.required]">
                  <template v-slot:label>
                    <span>Name</span>
                    <span class="red--text">*</span>
                  </template>
                </v-text-field>
              </v-flex>
              <!-- Country -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <country-select
                  v-model="model.country"
                  label="Country"
                  class="pr-2"
                  :required="true"
                  :rules="[rules.required]"
                  @onSelect="model.country = $event;"
                ></country-select>
              </v-flex>
              <!-- Business Phone Number -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field
                  class="pr-2"
                  v-model="model.businessPhoneNumber"
                  required
                  :rules="[rules.required]"
                  v-mask="[masks.phoneNumber]"
                >
                  <template v-slot:label>
                    <span>
                      Business Phone Number
                      <span class="red--text">*</span> (e.g. +966-12-3456789)
                    </span>
                  </template>
                </v-text-field>
              </v-flex>
              <!-- Fax Number -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field
                  label="Fax Number (e.g. +966-12-3456789)"
                  class="pr-2"
                  v-model="model.faxNumber"
                  v-mask="[masks.phoneNumber]"
                ></v-text-field>
              </v-flex>
              <!-- Email Address -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field
                  class="pr-2"
                  v-model="model.emailAddress"
                  required
                  :rules="[rules.required, rules.email]"
                >
                  <template v-slot:label>
                    <span>Email Address</span>
                    <span class="red--text">*</span>
                  </template>
                </v-text-field>
              </v-flex>
              <!-- Website -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-text-field label="Website" class="pr-2" v-model="model.website"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <span class="primary-color half-a-border-on-bottom">Permit Information</span>
              </v-flex>
              <!-- Permit Type -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <select-field
                  v-model="model.permitType"
                  label="Permit Type"
                  type="permitTypes"
                  class="pr-2"
                  :required="true"
                  :rules="[rules.required]"
                  @onSelect="model.permitType = $event;getPermitRequirements()"
                ></select-field>
              </v-flex>
              <!-- Purpose of Landing/Overflying -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <select-field
                  v-model="model.purpose"
                  label="Purpose of Landing/Overflying"
                  type="purposeOfLanding"
                  class="pr-2"
                  :required="true"
                  :rules="[rules.required]"
                  @onSelect="model.purpose = $event;getPermitRequirements()"
                ></select-field>
              </v-flex>
              <!-- Aircraft -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <aircraft-select
                  v-model="model.aircraft"
                  label="Aircraft"
                  class="pr-2"
                  :required="true"
                  :rules="[rules.required]"
                  @onSelect="model.aircraft = $event"
                ></aircraft-select>
              </v-flex>
              <!-- Flight Type -->
              <v-flex xs12 sm12 md6 class="mt-2">
                <select-field
                  v-model="model.flightType"
                  label="Flight Type"
                  type="flightTypes"
                  class="pr-2"
                  :required="true"
                  :rules="[rules.required]"
                  @onSelect="model.flightType = $event;getPermitRequirements()"
                ></select-field>
              </v-flex>
              <v-flex xs12 sm12 md6 class="mt-2">
                <v-menu
                  ref="flightDateMenu"
                  v-model="flightDateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="model.flightDate"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="model.flightDate"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-on="on"
                      class="mr-2"
                      required
                      :rules="[rules.required]"
                    >
                      <template v-slot:label>
                        <span>Flight Date</span>
                        <span class="red--text">*</span>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="model.flightDate" no-title scrollable>
                    <v-container>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          required
                          :rules="[rules.required]"
                          v-mask="{mask:mask,tokens:hexTokens}"
                          v-model="flightTime"
                          placeholder="HH:MM"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-btn text color="primary" @click="flightDateMenu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.flightDateMenu.save(model.flightDate+' '+flightTime)"
                        >OK</v-btn>
                      </v-flex>
                    </v-container>
                  </v-date-picker>
                </v-menu>
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
                      :error="permitReq.status == 'failed' || permitReq.status == 'required'"
                      :error-messages="permitReq.status == 'failed' ? 'Failed to upload' : permitReq.status == 'required' ? 'Required.' : ''"
                      :append-outer-icon="permitReq.documentId ? 'mdi-download' : ''"
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
            <div
              class="caption grey--text mt-2"
            >*Aircraft, Origin and Destination Airport and ATC Route fields are required to calcluate Navigation Route</div>
            <v-layout wrap mt-3>
              <!-- Origin Airport -->
              <v-flex xs12 sm12 md6>
                <airport-select
                  v-model="model.originAirport"
                  label="Origin"
                  class="pr-2"
                  :required="true"
                  :rules="[rules.required]"
                  @onSelect="model.originAirport = $event"
                ></airport-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <!-- Destination Airport -->
                <airport-select
                  v-model="model.destAirport"
                  label="Destination"
                  class="pr-2"
                  :required="true"
                  :rules="[rules.required]"
                  @onSelect="model.destAirport = $event"
                ></airport-select>
              </v-flex>
            </v-layout>
            <!-- ATC Route -->
            <v-textarea
              v-model="model.atcRoute"
              class="pr-2 mt-3"
              required
              :rules="[rules.required]"
              :loading="calculatingNavCharge"
            >
              <template v-slot:label>
                <span>ATC Route</span>
                <span class="red--text">*</span>
              </template>
            </v-textarea>
            <div class="d-flex justify-end">
              <v-btn
                small
                outlined
                class="caption"
                color="accent"
                @click="onATCCalculations"
                :disabled="!model.originAirport || !model.destAirport || !model.aircraft || !model.atcRoute"
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
                :disabled="!model.navigationCharges || loading"
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
      atcRoute: '',
      originAirport: '',
      destAirport: '',
      navigationCharges: '',
      flightDate: ''
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
    flightTime: '',
    flightDateMenu: false,
    mask: 'HH:MM',
    hexTokens: {
      H: {
        pattern: /[0-23]/,
        transform: v => v.toLocaleUpperCase()
      },
      M: {
        pattern: /[0-59]/,
        transform: v => v.toLocaleUpperCase()
      }
    }
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
    },

    user() {
      return this.$store.state.auth.user
    }
  },

  watch: {
    useMyDetails() {
      if (this.useMyDetails) {
        this.model.name = this.user.name
        this.model.country = this.user.country
        this.model.businessPhoneNumber = this.user.businessPhoneNumber
        this.model.emailAddress = this.user.email
        this.model.website = this.user.website
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
        this.model.originAirport = this.request.originAirport
        this.model.destAirport = this.request.destAirport
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
            uploading: false,
            status: ''
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

      if (payload.PermitTypeId || payload.FlightTypeId || payload.POLId) {
        axios.post('requirement/filter', payload).then(response => {
          if (response && response.data.success) {
            this.permitRequirements = response.data.result
            this.permitRequirements.forEach(req => {
              this.$set(req, 'documentName', '')
              this.$set(req, 'documentId', '')
              this.$set(req, 'file', [])
              this.$set(req, 'uploading', false)
              this.$set(req, 'status', '')
            })
          }
        })
      } else this.permitRequirements = []
    },

    onRequest() {
      let completeReq = this.permitRequirements.filter(
        req =>
          !req.documentId || req.status == 'failed' || req.status == 'required'
      )
      if (completeReq.length > 0) {
        this.permitRequirements.forEach(req => {
          if (!req.documentId) {
            req.status = 'required'
            this.valid = false
          }
        })

        let incompleteReq = this.permitRequirements.some(
          req =>
            !req.documentId ||
            req.status == 'required' ||
            req.status == 'failed'
        )
        if (incompleteReq) {
          window.getApp.snackbar = {
            show: true,
            text: 'Please attach and upload Permit Requirements.'
          }
        }
      } else {
        var flightDateConverted = new Date(this.model.flightDate)
        if (this.$refs.form.validate()) {
          this.payload = {
            AircraftId: this.model.aircraft ? this.model.aircraft.id : null,
            PermitTypeId: this.model.permitType
              ? this.model.permitType.id
              : null,
            PurposeOfLandingId: this.model.purpose
              ? this.model.purpose.id
              : null,
            FlightTypeId: this.model.flightType
              ? this.model.flightType.id
              : null,
            CountryId: this.model.country ? this.model.country.id : null,
            AirportId: this.model.airport ? this.model.airport.id : null,
            ATCRoute: this.model.atcRoute ? this.model.atcRoute : null,
            OriginAirportId: this.model.originAirport
              ? this.model.originAirport.id
              : null,
            DestAirportId: this.model.destAirport
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
            FlightDate: flightDateConverted ? flightDateConverted : null,
            NavigationCharges: this.model.navigationCharges
              ? this.model.navigationCharges
              : null,
            requestRequirements: this.permitRequirements.map(req => {
              return {
                ...(this.action == 'edit'
                  ? { requestId: this.request.id }
                  : {}),
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
        } else {
          window.getApp.snackbar = {
            show: true,
            text: 'Please fill out the required fields.'
          }
        }
      }
    },

    uploadDocuments(req) {
      if (req.file) {
        req.uploading = true
        const fd = new FormData()
        fd.append('file', req.file)
        axios
          .post('document/uploadDocuments', fd)
          .then(response => {
            if (response && response.data.success) {
              req.documentId = response.data.result[0].objectId
              req.documentName = response.data.result[0].fileName
              req.status = ''
            } else {
              req.documentId = ''
              req.documentName = ''
              req.status = 'failed'
            }
          })
          .catch(error => {
            req.documentId = ''
            req.documentName = ''
            req.status = 'failed'
          })
          .finally(() => {
            req.uploading = false
          })
      }
    },

    deleteDocument(doc) {
      doc.documentId = ''
      doc.documentName = ''
      doc.status = ''
    },

    onATCCalculations() {
      this.calculatingNavCharge = true
      this.analyzeNavRoute()
        .then(response => {
          this.flightPoints = response.data.result.routePoints.mappingPoints.map(
            point => {
              return [point.point.latitude, point.point.longitude]
            }
          )
          this.points.routePoints = response.data.result.routePoints
          this.getSaudiFir(response.data.result)
            .then(resp => {
              this.saudiPoints = resp.data.result.firPoints.map(p => {
                return [p.point.latitude, p.point.longitude]
              })
              this.points.firPoints = resp.data.result.firPoints
              this.calculateDistance(resp.data.result)
                .then(res => {
                  this.calculateNavCharge(res.data.result)
                    .then(r => {
                      this.model.navigationCharges = r.data.result
                    })
                    .catch(() => {
                      this.calculatingNavCharge = false
                    })
                    .finally(() => {
                      this.calculatingNavCharge = false
                    })
                })
                .catch(() => {
                  this.calculatingNavCharge = false
                })
            })
            .catch(() => {
              this.calculatingNavCharge = false
            })
        })
        .catch(() => {
          this.calculatingNavCharge = false
        })
    },

    analyzeNavRoute() {
      let payload = {
        FromIATA: this.model.originAirport.iata,
        ToIATA: this.model.destAirport.iata,
        ATCRoute: this.model.atcRoute
      }
      return new Promise((resolve, reject) => {
        axios
          .post('GIS/AnalyseNavigationRoute', payload)
          .then(response => {
            if (response && response.data.success) resolve(response)
            else {
              window.getApp.snackbar = {
                show: true,
                text: response.data.message
              }
              reject()
            }
          })
          .catch(error => {
            this.calculatingNavCharge = false
            reject(error)
          })
      })
    },

    getSaudiFir(payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('GIS/SaudiFIR', payload)
          .then(response => {
            if (response && response.data.success) resolve(response)
            else {
              reject()
            }
          })
          .catch(error => {
            this.calculatingNavCharge = false
            reject(error)
          })
      })
    },

    calculateDistance(payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('GIS/CalculateDistanceSaudi', payload)
          .then(response => {
            if (response && response.data.success) resolve(response)
            else {
              reject()
            }
          })
          .catch(error => {
            this.calculatingNavCharge = false
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
        axios
          .post('request/CalculateNavCharge', payload)
          .then(response => {
            if (response && response.data.success) resolve(response)
            else {
              reject()
            }
          })
          .catch(error => {
            this.calculatingNavCharge = false
            reject(error)
          })
      })
    },

    getFile(doc) {
      if (
        !doc.documentId ||
        doc.status == 'failed' ||
        doc.status == 'required'
      ) {
        return
      }

      doc.uploading = true
      var files = []
      axios({
        url: `Document/download/${doc.documentId}`,
        method: 'GET',
        responseType: 'blob'
      })
        .then(response => {
          const blob = new Blob([response], { type: 'application/pdf' })
          var file = new File([blob], doc.documentName)
          files.push(file)
        })
        .finally(() => {
          doc.uploading = false
        })

      return files
    },

    downloadDocument(docId) {
      const API_DownloadPDF = `${process.env.apiUrl}Document/download/${docId}`
      window.open(API_DownloadPDF)
    }
  }
}
</script>
