<template>
  <v-container class="pa-0">
    <!-- <v-row>
      <v-col cols="6" class="d-flex justify-end">
        <v-flex xs12 sm12 md12>
          <span class="primary-color half-a-border-on-bottom">Status</span>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <span class="accent-color">{{permitRequest.status? permitRequest.status.name:''}}</span>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div class="grey--text lighten-1 caption">Status</div>
          <div class="accent-color">Waiting for approval</div>
        </v-flex>
      </v-col>
      <v-col cols="6" class="d-flex justify-end pa-0">
        <v-btn
          depressed
          small
          color="accent"
          @click="$router.back()"
          class="caption text-none mr-2"
        >Back</v-btn>
        <v-btn
          v-if="!isAdmin && permitRequest.status ? permitRequest.status.name == 'Waiting For Approval' ||  permitRequest.status.name == 'Rejected'? true:false:false"
          depressed
          small
          outlined
          color="accent"
          :to="{name: 'requests-edit-id',params : { id: $route.params.id}}"
          class="caption text-none"
        >Edit</v-btn>
      </v-col>
    </v-row>-->
    <v-flex xs12 sm12 md12 class="d-flex pa-0">
      <div class="mb-3 d-flex">
        <div class="mr-10">
          <div class="overline">Request Number</div>
          <div class="accent--text">{{ permitRequest ? permitRequest.number : '' }}</div>
        </div>
        <div>
          <div class="overline">Status</div>
          <div
            class="accent--text"
          >{{ permitRequest && permitRequest.status ? permitRequest.status.name : '' }}</div>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        depressed
        small
        color="accent"
        @click="$router.back()"
        class="caption text-none mr-2"
      >Back</v-btn>
      <v-btn
        v-if="!isAdmin && permitRequest.status ? permitRequest.status.name == 'Waiting For Approval' ||  permitRequest.status.name == 'Rejected'? true:false:false"
        depressed
        small
        outlined
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
            <div class="grey--text lighten-1 caption">Business Phone Number (e.g +966-xx-xxxxxxx)</div>
            <div>{{permitRequest.operatorPhone?permitRequest.operatorPhone:'-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Fax Number (e.g +966-xx-xxxxxxx)</div>
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
            <div>{{permitRequest.aircraft ? permitRequest.aircraft.registration: '-'}}</div>
          </v-flex>
          <v-flex xs12 sm12 md6 mt-5>
            <div class="grey--text lighten-1 caption">Flight Type</div>
            <div>{{permitRequest.flightType? permitRequest.flightType.name : '-'}}</div>
          </v-flex>

          <!-- Permit Requirements -->
          <v-flex xs12 sm12 md12 mt-9>
            <span class="primary-color half-a-border-on-bottom">Permit Requirements</span>
            <v-layout
              mt-4
              v-if="permitRequest.requestRequirements? permitRequest.requestRequirements.length > 0 ? true:false:false"
            >
              <v-flex md4>
                <div class="secondary-color caption">Name</div>
              </v-flex>
              <v-flex md3>
                <div class="secondary-color caption">File</div>
              </v-flex>
              <v-flex md3 v-if="!isAdmin">
                <div class="secondary-color caption">Status</div>
              </v-flex>
              <v-flex
                md2
                v-if="isAdmin && permitRequest.status ? permitRequest.status.name == 'Waiting For Approval'? true:false:false"
              >
                <div class="secondary-color caption">Review</div>
              </v-flex>
            </v-layout>
            <v-layout class="mt-4" v-else>
              <v-flex md4>
                <div class="secondary-color caption">No Permit Requirements for this request.</div>
              </v-flex>
            </v-layout>

            <template v-for="(doc, i) in permitRequest.requestRequirements">
              <v-layout :key="i">
                <v-flex md4>
                  <div class="subtitle-1">{{doc.requirementName}}</div>
                </v-flex>
                <v-flex md3>
                  <div
                    class="accent-color subtitle-1 pointer"
                    @click="downloadDocument(doc.documentId)"
                  >{{doc.documentName}}</div>
                </v-flex>
                <v-flex md3 v-if="!isAdmin">
                  <v-icon v-if="doc.checkedByAdmin" color="success">mdi-file-document-box-check</v-icon>
                  <v-icon v-if="!doc.checkedByAdmin" color="error">mdi-file-document-box-remove</v-icon>
                </v-flex>
                <v-flex
                  md2
                  class="mb-2 pointer"
                  v-if="isAdmin && permitRequest.status ? permitRequest.status.name == 'Waiting For Approval'? true:false:false"
                  @click="changeStatus(doc,i)"
                >
                  <v-icon v-if="doc.checkedByAdmin" color="success">mdi-checkbox-marked-outline</v-icon>
                  <v-icon v-if="!doc.checkedByAdmin" color="error">mdi-checkbox-blank-outline</v-icon>
                  <!-- <div class="primary-color caption">{{ doc.checkedByAdmin ? 'Approved' : 'Unapp' }}</div> -->
                </v-flex>
              </v-layout>
            </template>
          </v-flex>

          <!-- Template  -->
          <!-- <v-flex xs12 sm12 md12 mt-9>
            <span class="primary-color half-a-border-on-bottom">Permit Requirements</span>
            <v-layout mt-4>
              <v-flex md4>
                <div class="secondary-color caption">Name</div>
              </v-flex>
              <v-flex md3>
                <div class="secondary-color caption">File</div>
              </v-flex>
              <v-flex md3>
                <div class="secondary-color caption">Status</div>
              </v-flex>
              <v-flex md2 v-if="isAdmin">
                <div class="secondary-color caption">Action</div>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>
                <div class="subtitle-1">Certificate Registration COR</div>
              </v-flex>
              <v-flex md3>
                <div class="accent-color subtitle-1">cor.pdf</div>
              </v-flex>
              <v-flex md3>
                <v-icon color="error">mdi-close</v-icon>
              </v-flex>
              <v-flex md2 class="mb-2" v-if="isAdmin">
              
                <div class="primary-color caption">Approve</div>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>
                <div class="subtitle-1">Certificate Registration COR</div>
              </v-flex>
              <v-flex md3>
                <div class="accent-color subtitle-1">cor.pdf</div>
              </v-flex>
              <v-flex md3>
                <v-icon color="success">mdi-check</v-icon>
              </v-flex>
              <v-flex md2 class="mb-2" v-if="isAdmin">
             
                <div class="primary-color caption">Unapprove</div>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex md4>
                <div class="subtitle-1">Certificate Registration COR</div>
              </v-flex>
              <v-flex md3>
                <div class="accent-color subtitle-1">cor.pdf</div>
              </v-flex>
              <v-flex md3>
                <div class="pl-2">-</div>
              </v-flex>
              <v-flex md2 class="mb-2" v-if="isAdmin">
            
                <div class="primary-color caption">Approve</div>
              </v-flex>
            </v-layout>
          </v-flex>-->
        </v-layout>
      </v-flex>
      <!-- ATC Route -->
      <v-flex xs12 sm12 md6>
        <span class="half-a-border-on-bottom primary-color">ATC Route</span>
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
              @click="snackbarApprove.text = 'Are you sure you want to approve request ' + permitRequest.number; snackbarApprove.show = true;"
            >Approve and Waiting For Payment</v-btn>

            <v-btn
              depressed
              v-if="permitRequest.status ? permitRequest.status.name == 'Approved And Waiting For Payment'? true:false:false"
              color="primary"
              :disabled="!validateReviewedStatus"
              class="body-2 text-none mt-2"
              @click="snackbarConfirm.text = 'Are you sure you want to close request ' + permitRequest.number; snackbarConfirm.show = true;"
            >Confirm payment and close request</v-btn>

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
                    @click="snackbarReject.text = 'Are you sure you want to reject request ' + permitRequest.number; snackbarReject.show = true;"
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
              color="accent"
              @click="snackbarCancel.text = 'Are you sure you want to cancel request ' + permitRequest.number; snackbarCancel.show = true;"
              class="body-2 text-none mt-2"
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
  </v-container>
</template>
<script>
import Map from '~/components/Map'

export default {
  layout: 'main',
  components: { 'flight-map': Map },
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
    ]
  }),
  computed: {
    isAdmin() {
      return this.$store.state.app.isAdmin
    },
    rejectedStatus() {
      return this.$store.state.category.requestStatuses
    }
  },
  created() {
    this.$store.commit('app/setAppTitle', 'Permit Approval')
    this.getRequestData(this.$route.params.id)
    console.log(this.rejectedStatus)
  },
  methods: {
    updateRequestStatus() {},
    cancelRequest(rejectComments, status) {
      let cancelStatus = _.filter(this.rejectedStatus, { name: status })
      console.log(this.rejectedStatus)
      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/UpdateStatus`
        : `Request/CancelRequest`
      let payload = {
        Id: this.$route.params.id,
        StatusId: cancelStatus[0].id,
        RejectionComment: rejectComments
      }
      this.$axios.$post(apiURL, payload).then(response => {
        //this.dashboardLoading = false
        if (response.success) {
          //this.permitRequest = response.result
          this.snackbar.text = response.message
          this.snackbar.show = true
          this.$router.back()
        } else {
          this.snackbar.text = response.message
          this.snackbar.show = true
        }
      })
    },
    changeStatus(doc, i) {
      // this.permitRequest.requestRequirements[
      //   i
      // ].checkedByAdmin = !doc.checkedByAdmin
      if (!this.isAdmin) {
        return false
      }
      let apiURL = `${process.env.adminUrl}Request/DocumentCheck`
      let payload = {
        Id: doc.id,
        CheckedByAdmin: !doc.checkedByAdmin
      }
      this.$axios.$post(apiURL, payload).then(response => {
        //this.dashboardLoading = false
        if (response.success) {
          //this.permitRequest = response.result
          this.snackbar.text = response.message
          this.snackbar.show = true
          this.permitRequest.requestRequirements[
            i
          ].checkedByAdmin = !doc.checkedByAdmin
        } else {
          this.snackbar.text = response.message
          this.snackbar.show = true
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
        this.cancelRequest('', 'Waiting For Last Approval')
      }
    },
    onSnackbarApproveAction(action) {
      this.snackbarApprove.show = false
      if (action == 'Yes') {
        this.cancelRequest('', 'Approved And Waiting For Payment')
      }
    },
    onSnackbarRejectAction(action) {
      this.snackbarReject.show = false
      if (action == 'Yes') {
        this.cancelRequest(this.rejectComments, 'Rejected')
      }
    },
    getRequestData(id) {
      //this.dashboardLoading = true
      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/GetById?Id=${id}`
        : `Request/GetById?Id=${id}`

      this.$axios.$get(apiURL).then(response => {
        //this.dashboardLoading = false
        if (response.success) {
          this.permitRequest = response.result
          this.flightPoints = JSON.parse(
            response.result.routePoints
          ).mappingPoints.map(point => {
            return [point.point.latitude, point.point.longitude]
          })
          let saudiPointsArray = JSON.parse(response.result.firValidatedPoints)[
            'firPoints'
          ]
          if (Array.isArray(saudiPointsArray)) {
            this.saudiPoints = JSON.parse(response.result.firValidatedPoints)[
              'firPoints'
            ].map(point => {
              return [point.point.latitude, point.point.longitude]
            })
          }
        } else {
          this.snackbar.text = response.message
          this.snackbar.show = true
        }
      })
    }
  },
  mounted() {
    console.log('here' + this.$route.name)

    this.renderMap = true
    //this.sectors = []

    this.$store.dispatch('app/setAppTitle', this.title)
    //this.$store.dispatch('app/setIsAdmin', true)
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
