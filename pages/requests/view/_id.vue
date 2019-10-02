<template>
  <div class="white-background pa-5">
    <v-flex xs12 sm12 md12 class="d-flex pa-0">
      <div class="mb-3 d-flex">
        <div class="mr-10">
          <div class="caption grey--text">Request Number</div>
          <div class="accent--text">{{ permitRequest ? permitRequest.number : '' }}</div>
        </div>
        <div>
          <div class="caption grey--text">Status</div>
          <div class="d-flex align-center">
            <div
              class="status-dot mr-1"
              :class="permitRequest && permitRequest.status ? `${permitRequest.status.name.toLowerCase().split(' ').join('-')}-status` : ''"
            ></div>
            <div>{{ permitRequest && permitRequest.status ? permitRequest.status.name : '' }}</div>
          </div>
        </div>
        <!-- <div v-if="permitRequest && permitRequest.permitNo">
          <div class="caption grey--text">Permit Number</div>
          <div class="accent--text">{{ permitRequest ? permitRequest.permitNo : '' }}</div>
        </div> -->
      </div>
      <v-spacer></v-spacer>
      <v-btn text small color="accent" @click="$router.back()" class="text-none mr-2">Back</v-btn>
      <v-btn
        v-if="!isAdmin && permitRequest.status ? permitRequest.status.name == 'Waiting For Approval' ||  permitRequest.status.name == 'Rejected'? true:false:false"
        depressed
        small
        color="accent"
        :to="{name: 'requests-edit-id',params : { id: $route.params.id}}"
        class="caption text-none"
      >Edit</v-btn>
    </v-flex>
    <v-layout wrap>
      <v-flex xs12 sm12 md6>
        <v-layout wrap>
          <!-- Operator Information -->
          <v-flex xs12 sm12 md12>
            <span class="primary-color half-a-border-on-bottom">Operator Information</span>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Name</div>
            <div>{{permitRequest.operatorName?permitRequest.operatorName:'-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Country</div>
            <div>{{permitRequest.country?permitRequest.country.name:'-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Business Phone Number</div>
            <div>{{permitRequest.operatorPhone?permitRequest.operatorPhone:'-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Fax Number</div>
            <div>{{permitRequest.operatorFax?permitRequest.operatorFax:'-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Email</div>
            <div>{{permitRequest.operatorEmail?permitRequest.operatorEmail:'-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Website</div>
            <div>{{permitRequest.operatorWebSite?permitRequest.operatorWebSite:'-'}}</div>
          </v-flex>

          <!-- Permit information -->
          <v-flex xs12 sm12 md12 mt-9>
            <span class="primary-color half-a-border-on-bottom">Permit Information</span>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Permit Type</div>
            <div>{{permitRequest.permitType?permitRequest.permitType.name :'-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Purpose of Landing/Overflying</div>
            <div>{{permitRequest.purposeOfLanding?permitRequest.purposeOfLanding.name :'-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Aircraft</div>
            <div>{{permitRequest.aircraft ? permitRequest.aircraft.aircraftType : '-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Flight Type</div>
            <div>{{permitRequest.flightType? permitRequest.flightType.name : '-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Flight Date</div>
            <div>{{permitRequest.flightDate ? permitRequest.flightDate : '-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Permit Number</div>
            <div>{{permitRequest.permitNo? permitRequest.permitNo : '-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5 v-if="permitRequest.status && permitRequest.status.name == 'Approved'">
            <div class="grey--text lighten-1 caption">Expiry Date</div>
            <div>{{permitRequest.expiryDate ? permitRequest.expiryDate : '-'}}</div>
          </v-flex>
          <!-- Permit Requirements -->
          <v-flex xs12 sm12 md12 mt-9 class="pr-3">
            <span class="primary-color half-a-border-on-bottom">Permit Requirements</span>

            <template
              v-if="permitRequest.requestRequirements && permitRequest.requestRequirements.length > 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">File</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(doc, i) in permitRequest.requestRequirements" :key="i">
                    <td class="caption">{{doc.requirementName}}</td>
                    <td
                      @click="downloadDocument(doc.documentId)"
                      class="accent-color caption pointer"
                    >{{ doc.documentName }}</td>
                    <td v-if="!isAdmin">
                      <v-icon v-if="doc.checkedByAdmin" color="primary">mdi-file-document-box-check</v-icon>
                      <v-icon v-if="!doc.checkedByAdmin" color="error">mdi-file-document-box-remove</v-icon>
                    </td>
                    <td
                      v-if="isAdmin && permitRequest.status ? permitRequest.status.name == 'Waiting For Approval'? true:false:false"
                      @click="changeStatus(doc,i)"
                    >
                      <v-icon v-if="doc.checkedByAdmin" color="primary">mdi-checkbox-marked-outline</v-icon>
                      <v-icon v-if="!doc.checkedByAdmin" color="error">mdi-checkbox-blank-outline</v-icon>
                    </td>
                    <td
                      v-if="isAdmin && permitRequest.status && permitRequest.status.name != 'Waiting For Approval'"
                    >
                      <v-icon v-if="doc.checkedByAdmin" color="primary">mdi-checkbox-marked-outline</v-icon>
                      <v-icon v-if="!doc.checkedByAdmin" color="error">mdi-checkbox-blank-outline</v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
            <v-layout class="mt-4" v-else>
              <v-flex md12>
                <div class="secondary-color caption">No Permit Requirements for this request.</div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- ATC Route -->
      <v-flex xs12 sm12 md6>
        <span class="half-a-border-on-bottom primary-color">ATC Route</span>
        <v-layout wrap>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Origin Airport</div>
            <div>{{permitRequest.originAirport ? `${permitRequest.originAirport.iata} / ${permitRequest.originAirport.icao} (${permitRequest.originAirport.name})` : '-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Destination Airport</div>
            <div>{{permitRequest.destAirport ? `${permitRequest.destAirport.iata} / ${permitRequest.destAirport.icao} (${permitRequest.destAirport.name})` : '-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md12 mt-5>
            <div class="grey--text lighten-1 caption">ATC Route</div>
            <div>{{permitRequest.atcRoute ? permitRequest.atcRoute : '-'}}</div>
          </v-flex>
        </v-layout>
        <div id="mapCanvas" class="pa-0 mt-5">
          <flight-map :init="renderMap" :flightPoints="flightPoints" :saudiPoints="saudiPoints"></flight-map>
        </div>
        <div class="d-flex justify-space-between mt-5">
          <div>
            <div class="secondary-color caption">Navigation Charge</div>
            <div
              class="accent-color font-weight-bold"
            >{{ permitRequest.navigationCharges? `${permitRequest.navigationCharges.toFixed(2)} SAR` : '--'}}</div>
            <div
              v-if="permitRequest.status ? permitRequest.status.name == 'Rejected'? true:false:false"
            >
              <div class="secondary-color caption mt-4">Rejection Comments</div>
              <div class="caption">{{permitRequest.rejectionComment}}</div>
            </div>
          </div>

          <div v-if="isAdmin">
            <v-btn
              depressed
              v-if="permitRequest.status ? permitRequest.status.name == 'Waiting For Approval'? true:false:false"
              color="primary"
              :disabled="!validateReviewedStatus"
              class="body-2 text-none mt-2"
              @click="snackbarApprove.text = 'Are you sure you want to approve request ' + permitRequest.number + '?'; snackbarApprove.show = true;"
            >Payment Request</v-btn>
            <v-menu
              transition="scale-transition"
              offset-y
              v-if="permitRequest.status ? permitRequest.status.name == 'Waiting For Payment'? true:false:false"
              nudge-bottom="10"
              origin="top right"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
            <v-btn
              depressed
              color="primary"
              :disabled="!validateReviewedStatus"
              class="body-2 text-none mt-2"
              v-on="on"
            >Confirm payment and generate permit</v-btn>
          </template>
          <v-card width="35vw">
            <!-- <v-card-title>Reason</v-card-title> -->
            <v-card-text>
              <v-text-field
                class="pr-2"
                v-model="permitRequest.permitValidity"
                required
                :rules="[rules.required]"
                type="number"
              >
                <template v-slot:label>
                  <span>
                    Permit Validity
                    <span class="red--text">*</span>
                  </span>
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="text-none"
                depressed
                outlined
                @click="snackbarConfirm.text = 'Are you sure you want to approve and generate permit for request ' + permitRequest.number + '?'; snackbarConfirm.show = true;"
                color="success"
                :disabled = "!permitRequest.permitValidity"
              >Approved</v-btn>
            </v-card-actions>
          </v-card>
          </v-menu>
            <v-menu
              transition="scale-transition"
              offset-y
              v-if="permitRequest.status ? permitRequest.status.name == 'Waiting For Approval'? true:false:false"
              nudge-bottom="10"
              origin="top right"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  class="body-2 text-none mt-2"
                  depressed
                  outlined
                  color="accent"
                  v-on="on"
                >Reject</v-btn>
              </template>
              <v-card width="35vw">
                <!-- <v-card-title>Reason</v-card-title> -->
                <v-card-text>
                  <v-textarea
                    name="message"
                    v-model="rejectComments"
                    placeholder="Enter reason to reject..."
                    label="Message"
                    auto-grow
                    clearable
                  ></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="text-none"
                    depressed
                    outlined
                    @click="snackbarReject.text = 'Are you sure you want to reject request ' + permitRequest.number + '?'; snackbarReject.show = true;"
                    color="error"
                  >Reject</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <!-- <v-btn depressed outlined color="accent" class="body-2 text-none mt-2">Reject</v-btn> -->
          </div>
          <div
            v-if="!isAdmin && permitRequest.status? permitRequest.status.name == 'Waiting For Approval'? true :false:false"
          >
            <v-btn
              depressed
              outlined
              color="red"
              @click="snackbarCancel.text = 'Are you sure you want to cancel request ' + permitRequest.number + '?'; snackbarCancel.show = true;"
              class="body-2 text-none mt-2"
              :loading="loading"
              :disabled="loading"
            >Cancel Request</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <app-snackbar :snackbar="snackbar" @snackbarAction="onSnackbarAction($event)"></app-snackbar>
    <app-snackbar :snackbar="snackbarCancel" @snackbarAction="onSnackbarCancelAction($event)"></app-snackbar>
    <app-snackbar :snackbar="snackbarReject" @snackbarAction="onSnackbarRejectAction($event)"></app-snackbar>
    <app-snackbar :snackbar="snackbarApprove" @snackbarAction="onSnackbarApproveAction($event)"></app-snackbar>
    <app-snackbar :snackbar="snackbarConfirm" @snackbarAction="onSnackbarConfirmAction($event)"></app-snackbar>
  </div>
</template>
<script>
import Map from '~/components/Map'

export default {
  layout: 'main',
  components: { 'flight-map': Map },

  data: () => ({
    flightPoints: [],
    saudiPoints: [],
    title: 'Request Details',
    validateReviewedStatus: false,
    rejectComments: '',
    snackbarConfirm: {
      show: false,
      timeout: 6000,
      text: '',
      actions: ['Yes', 'No']
    },
    snackbarCancel: {
      show: false,
      timeout: 6000,
      text: '',
      actions: ['Yes', 'No']
    },
    snackbarApprove: {
      show: false,
      timeout: 6000,
      text: '',
      actions: ['Yes', 'No']
    },
    snackbarReject: {
      show: false,
      timeout: 6000,
      text: '',
      actions: ['Yes', 'No']
    },
    snackbar: {
      show: false,
      timeout: 6000,
      text: 'Incorrect email address or password',
      actions: ['Close']
    },
    renderMap: false,
    permitRequest: {},
    sectors: [
      JSON.parse(
        `{"departureAirportId":3437,"arrivalAirportId":2137,"departureAirportName":"KTEB","arrivalAirportName":"OPRN","departureAirport":{"id":3437,"name":"Teterboro","fullName":"(KTEB/TEB/TEB) Teterboro, United States","iata":"TEB","icao":"KTEB","faaCode":"TEB","latitude":40.85011111111111,"longitude":-74.06083333333333,"altitude":0,"city":{"id":null,"name":null},"state":{"id":null,"name":null},"country":{"id":81,"name":"United States"}},"arrivalAirport":{"id":2137,"name":"Benazir Bhutto Intl","fullName":"(OPRN) Benazir Bhutto Intl, Islamabad, Pakistan","iata":"","icao":"OPRN","faaCode":null,"latitude":33.61676666666667,"longitude":73.09873888888889,"altitude":0,"city":{"id":5365,"name":"Islamabad"},"state":{"id":546,"name":""},"country":{"id":207,"name":"Pakistan"}},"speed":300,"distance":"5193.885 nautical miles","hours":"17h 18m (add 15 minutes of flextime)"}`
      )
    ],
    loading: false
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  computed: {
    rules() {
      return this.$store.state.app.inputRules
    },
    isAdmin() {
      return this.$store.state.auth.isAdmin
    },
    rejectedStatus() {
      return this.$store.state.category.requestStatuses
    }
  },

  created() {
    this.$store.commit('app/setAppTitle', 'Permit Approval')
    this.getRequestData(this.$route.params.id)
  },

  mounted() {
    this.renderMap = true
    this.$store.dispatch('app/setAppTitle', this.title)
  },

  watch: {
    'permitRequest.requestRequirements': {
      deep: true,
      handler() {
        if (
          _.filter(this.permitRequest.requestRequirements, {
            checkedByAdmin: false
          }).length > 0
        ) {
          this.validateReviewedStatus = false
        } else {
          this.validateReviewedStatus = true
        }
      }
    }
  },

  methods: {
    updateRequest(rejectComments, status) {
      let cancelStatus = _.filter(this.rejectedStatus, { name: status })

      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/UpdateStatus`
        : `Request/CancelRequest`
      let payload = {
        Id: this.$route.params.id,
        StatusId: cancelStatus[0].id,
        RejectionComment: rejectComments,
        PermitValidity:this.permitRequest.permitValidity
      }
      axios.post(apiURL, payload).then(response => {
        if (response && response.data.success) {
          this.$router.back()
          window.getApp.snackbar = {
            show: true,
            text: response.data.message
          }
        }
      })
    },

    cancelRequest(rejectComments, status) {
      this.loading = true
      axios
        .post(`request/cancelRequest?id=${this.$route.params.id}`)
        .then(response => {
          if (response && response.data.success) {
            this.getRequestData(this.$route.params.id)
            window.getApp.snackbar = {
              show: true,
              text: response.data.message
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    changeStatus(doc, i) {
      if (!this.isAdmin) {
        return false
      }
      let apiURL = `${process.env.adminUrl}Request/DocumentCheck`
      let payload = {
        Id: doc.id,
        CheckedByAdmin: !doc.checkedByAdmin
      }
      axios.post(apiURL, payload).then(response => {
        if (response && response.data.success) {
          this.permitRequest.requestRequirements[
            i
          ].checkedByAdmin = !doc.checkedByAdmin
          window.getApp.snackbar = {
            show: true,
            text: response.data.message
          }
        }
      })
    },

    downloadDocument(document) {
      const API_DownloadPDF = `${process.env.apiUrl}Document/download/${document}`
      window.open(API_DownloadPDF)
    },

    onSnackbarAction(action) {
      this.snackbar.show = false
    },

    onSnackbarCancelAction(action) {
      this.snackbarCancel.show = false
      if (action == 'Yes') {
        this.cancelRequest('', 'Cancelled')
      }
    },

    onSnackbarConfirmAction(action) {
      this.snackbarConfirm.show = false
      if (action == 'Yes') {
        this.updateRequest('', 'Approved')
      }
    },

    onSnackbarApproveAction(action) {
      this.snackbarApprove.show = false
      if (action == 'Yes') {
        this.updateRequest('', 'Waiting For Payment')
      }
    },

    onSnackbarRejectAction(action) {
      this.snackbarReject.show = false
      if (action == 'Yes') {
        this.updateRequest(this.rejectComments, 'Rejected')
      }
    },

    getRequestData(id) {
      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/GetById?Id=${id}`
        : `Request/GetById?Id=${id}`

      axios.get(apiURL).then(response => {
        if (response && response.data.success) {
          this.permitRequest = response.data.result
          this.permitRequest.flightDate = this.permitRequest.flightDate == '0001-01-01T00:00:00'?null:moment(this.permitRequest.flightDate).format('MM-DD-YYYY hh:MM'),
          this.permitRequest.expiryDate = moment(response.data.result.expiryDate).format('DD-MM-YYYY hh:mm')
          this.flightPoints = JSON.parse(
            response.data.result.routePoints
          ).mappingPoints.map(point => {
            return [point.point.latitude, point.point.longitude]
          })
          let saudiPointsArray = JSON.parse(
            response.data.result.firValidatedPoints
          )['firPoints']
          if (Array.isArray(saudiPointsArray)) {
            this.saudiPoints = JSON.parse(
              response.data.result.firValidatedPoints
            )['firPoints'].map(point => {
              return [point.point.latitude, point.point.longitude]
            })
          }
        }
      })
    }
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
