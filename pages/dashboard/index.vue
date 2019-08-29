<template>
  <v-container class="pa-0">
    <!-- Header summary -->
    <template v-if="isAdmin">
      <v-layout wrap>
        <v-flex class="primary-color">
          <span class="half-a-border-on-bottom">Users</span>
        </v-flex>
      </v-layout>
      <v-layout class="mt-4 mb-5">
        <v-flex md2 class="pr-10">
          <router-link :to="{name:`users`}" class="no-decoration">
            <v-card>
              <v-layout class="pa-2 subtitle-2">
                <v-flex>Users</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="text-right accent-color font-weight-bold"
                >{{users}}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </router-link>
        </v-flex>
        <v-flex md2 class="pr-10">
          <router-link :to="{name:`users-requests`}" class="no-decoration">
            <v-card>
              <v-layout class="pa-2 subtitle-2">
                <v-flex>Requests</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="text-right accent-color font-weight-bold"
                >{{userRequests}}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </router-link>
        </v-flex>
      </v-layout>
    </template>
    <!-- Permit Header -->
    <v-row>
      <v-col cols="12">
        <span class="primary-color">Permits</span>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <!-- Permit Types  -->
    <v-layout>
      <v-flex md4 class="pr-6">
        <div>
          <span class="half-a-border-on-bottom">General Aviation</span>
        </div>
        <v-layout mt-4 v-bind="generalAviationPermit">
          <v-flex md6 class="pr-6">
            <v-card
              :class="selectedPermitType == 'generalAviationOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType(generalAviationPermit,generalAviationPermit.overFlying,'generalAviationOverflying')"
            >
              <v-layout class="pa-2 caption">
                <v-flex
                  class="selectedPermit"
                >{{generalAviationPermit.overFlying?generalAviationPermit.overFlying.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="text-right accent-color font-weight-bold selectedPermit"
                >{{generalAviationPermit.overFlying ? generalAviationPermit.overFlying.permitTypeCount : 0 }}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex md6 class="pr-6">
            <v-card
              :class="selectedPermitType == 'generalAviationLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType(generalAviationPermit,generalAviationPermit.landing,'generalAviationLanding')"
            >
              <v-layout class="pa-2 caption">
                <v-flex
                  class="selectedPermit"
                >{{generalAviationPermit.overFlying?generalAviationPermit.landing.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="text-right accent-color font-weight-bold selectedPermit"
                >{{generalAviationPermit.landing ? generalAviationPermit.landing.permitTypeCount : 0 }}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4 class="pr-6">
        <div>
          <span class="half-a-border-on-bottom">Commercial Transport</span>
        </div>
        <v-layout class="mt-4" v-bind="commercialAviationPermit">
          <v-flex md6 class="pr-6">
            <v-card
              :class="selectedPermitType == 'commercialTransportOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType(commercialAviationPermit,commercialAviationPermit.overFlying,'commercialTransportOverflying')"
            >
              <v-layout class="pa-2 caption">
                <v-flex
                  class="selectedPermit"
                >{{commercialAviationPermit.overFlying?commercialAviationPermit.overFlying.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="text-right accent-color font-weight-bold selectedPermit"
                >{{commercialAviationPermit.overFlying?commercialAviationPermit.overFlying.permitTypeCount:0 }}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex md6 class="pr-6">
            <v-card
              :class="selectedPermitType == 'commercialTransportLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType(commercialAviationPermit,commercialAviationPermit.landing,'commercialTransportLanding')"
            >
              <v-layout class="pa-2 caption">
                <v-flex
                  class="selectedPermit"
                >{{commercialAviationPermit.overFlying?commercialAviationPermit.landing.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="text-right accent-color font-weight-bold selectedPermit"
                >{{commercialAviationPermit.landing?commercialAviationPermit.landing.permitTypeCount:0 }}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4 class="pr-6">
        <div>
          <span class="half-a-border-on-bottom">Diplomatic / Military</span>
        </div>
        <v-layout class="mt-4" v-bind="diplomaticPermit">
          <v-flex md6 class="pr-6">
            <v-card
              :class="selectedPermitType == 'diplomaticOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType(diplomaticPermit,diplomaticPermit.overFlying,'diplomaticOverflying')"
            >
              <v-layout class="pa-2 caption">
                <v-flex
                  class="selectedPermit"
                >{{diplomaticPermit.overFlying?diplomaticPermit.overFlying.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="text-right accent-color font-weight-bold selectedPermit"
                >{{diplomaticPermit.overFlying?diplomaticPermit.overFlying.permitTypeCount:0}}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex md6 class="pr-6">
            <v-card
              :class="selectedPermitType == 'diplomaticLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType(diplomaticPermit,diplomaticPermit.landing,'diplomaticLanding')"
            >
              <v-layout class="pa-2 caption">
                <v-flex
                  class="selectedPermit"
                >{{diplomaticPermit.overFlying?diplomaticPermit.landing.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="text-right accent-color font-weight-bold selectedPermit"
                >{{diplomaticPermit.landing?diplomaticPermit.landing.permitTypeCount:0}}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- Request Status  -->

    <v-layout mt-4>
      <v-flex md12 class="pr-6">
        <div>
          <span class="half-a-border-on-bottom">Status</span>
        </div>
        <v-layout mt-4>
          <v-flex v-if="statusLoading" class="accent-color">
            <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
          </v-flex>
          <template v-else v-for="(status, i) in requestStatus">
            <v-flex md2 class="pr-6" :key="i">
              <v-card
                :class="status.selected ? 'selectedFlight' : ''"
                @click="updateStatus(status,i)"
              >
                <v-layout class="pa-2 caption">
                  <v-flex class="selectedPermit">{{status.name}}</v-flex>
                  <v-spacer></v-spacer>
                  <v-flex class="text-right accent-color font-weight-bold">{{status.count }}</v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- Selected filter by type  -->
    <v-layout class="mt-10">
      <v-flex md12>
        <div
          class="overline"
        >{{flightInfo?flightInfo.flightType?flightInfo.flightType.name: 'All':'All'}}</div>
        <div class>
          <span>{{permitInfo?permitInfo.name?permitInfo.name: '-':'-'}}</span>
          <span class="float-right overline">
            <router-link :to="{name: 'requests'}" class="no-decoration">
              <span class="accent-color">view all</span>
            </router-link>
          </span>
        </div>
      </v-flex>
    </v-layout>

    <!-- Status filter  -->
    <!-- <v-layout mt-4>
      <v-flex>
        <template v-for="(status, i) in requestStatus">
          <v-chip
            @click="updateStatus(status,i)"
            depressed
            small
            :key="i"
            tile
            :class="status.selected ? 'selectedStatus' : 'disabledStatus'"
            class="body-2 text-none mr-2 no-border-radius"
          >{{status.name}}</v-chip>
        </template>
      </v-flex>
    </v-layout>-->

    <!-- Permit Request Table  -->

    <v-layout mt-4>
      <v-flex md12>
        <v-data-table
          :headers="headers"
          :items="requests"
          :loading="dashboardLoading"
          hide-default-footer
          loading-text="Loading records..."
        >
          <template v-if="requests.length == 0" v-slot:no-data>No Record Found!</template>
          <template v-else v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>
                  <router-link
                    :to="{name: 'requests-view-id',params : { id: item.id}}"
                  >{{item.RequestNumber}}</router-link>
                </td>
                <td v-if="isAdmin">{{item.Operator}}</td>
                <td>{{item.CreatedDate}}</td>
                <td>{{item.ExpiryDate}}</td>
                <td>{{item.FlightType}}</td>
                <td>{{item.PermitType}}</td>
                <td
                  :class="item.Status == 'Waiting For Approval' ? 'accent-color' : ''"
                >{{item.Status}}</td>
                <td v-if="!isAdmin " class="text-xs-right">
                  <v-menu
                    offset-y
                    dense
                    open-on-click
                    v-if="item.Status == 'Waiting For Approval' || item.Status == 'Rejected'"
                    content-class="adminAction--dropdown"
                    left
                  >
                    <template v-slot:activator="{ on } ">
                      <v-icon v-on="on">mdi-dots-vertical</v-icon>
                    </template>
                    <v-list dense>
                      <v-list-item :to="{name: 'requests-edit-id',params : { id: item.id}}">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <!-- <v-list-item>
                        <v-list-item-title class="error-color">Delete</v-list-item-title>
                      </v-list-item>-->
                    </v-list>
                  </v-menu>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <app-snackbar :snackbar="snackbar" @snackbarAction="onSnackbarAction($event)"></app-snackbar>
  </v-container>
</template>
<script>
export default {
  layout: 'main',
  components: {},
  data: () => ({
    snackbar: {
      show: false,
      timeout: 6000,
      text: 'Incorrect email address or password',
      actions: ['Close']
    },
    payload: {
      StatusId: [],
      PermitTypeId: null,
      FlightTypeId: null,
      Search: null,
      CreatedDate: null,
      ExpiryDate: null,
      PageNumber: 0,
      PageSize: 6
    },
    generalAviationPermit: {},
    commercialAviationPermit: {},
    diplomaticPermit: {},
    users: 0,
    userRequests: 0,
    statusLoading: false,
    countsLoading: false,
    dashboardLoading: false,
    requestStatus: [],
    selectedPermitType: '',
    permitInfo: {},
    flightInfo: {},
    title: 'Dashboard',
    requests: [
      // {
      //   id: 1,
      //   RequestNumber: 13210,
      //   Operator: 'Operator x',
      //   CreatedDate: moment(new Date()).format('MM-DD-YYYY'),
      //   ExpiryDate: moment(new Date()).format('MM-DD-YYYY'),
      //   FlightType: 'General Aviation',
      //   PermitType: 'LND - Landing',
      //   Status: 1
      // }
    ]
  }),
  computed: {
    isAdmin() {
      return this.$store.state.app.isAdmin
    },
    // requestStatus() {
    //   return this.$store.state.category.requestStatuses
    // },
    headers() {
      let tempHeaders = [
        {
          text: 'Request Number',
          align: 'left',
          sortable: false,
          value: 'RequestNumber'
        },
        {
          text: 'Operator',
          align: 'left',
          sortable: false,
          value: 'Operator',
          class: ''
        },
        {
          text: 'Creation Date',
          align: 'left',
          sortable: false,
          value: 'CreatedDate'
        },
        {
          text: 'Expiry Date',
          align: 'left',
          sortable: false,
          value: 'ExpiryDate'
        },
        {
          text: 'Flight Type',
          align: 'left',
          sortable: false,
          value: 'FlightType'
        },
        {
          text: 'Permit Type',
          align: 'left',
          sortable: false,
          value: 'PermitType'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'Status'
        },
        {
          text: '',
          align: 'right',
          sortable: false,
          value: 'actions'
        }
      ]
      return this.isAdmin
        ? _.reject(tempHeaders, { value: 'actions' })
        : _.reject(tempHeaders, { value: 'Operator' })
    }
  },
  methods: {
    onSnackbarAction(action) {
      this.snackbar.show = false
    },
    fetchDasboard() {
      this.payload.StatusId = _.map(
        _.filter(this.requestStatus, { selected: true }),
        'id'
      ) // [1,2,3,4]
      this.payload.PermitTypeId = this.permitInfo ? this.permitInfo.id : null
      this.payload.FlightTypeId = this.flightInfo
        ? this.flightInfo.flightType
          ? this.flightInfo.flightType.id
          : null
        : null

      this.dashboardLoading = true
      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/getlatestrequests`
        : `Request/getlatestrequests`

      this.$axios.$post(apiURL, this.payload).then(response => {
        this.dashboardLoading = false
        if (response.success) {
          // alert()
          this.requests = _.map(response.result.requests, item => {
            return {
              id: item.id,
              RequestNumber: item.number,
              Operator: item.operatorName,
              CreatedDate: moment(item.createdDate).format('MM-DD-YYYY'),
              ExpiryDate: moment(item.expiryDate).format('MM-DD-YYYY'),
              FlightType: item.flightType,
              PermitType: item.permitType,
              Status: item.status
            }
          })
        } else {
          this.snackbar.text = response.message
          this.snackbar.show = true
        }
      })
    },
    fetchDasboardStatus() {
      this.statusLoading = true
      let userID = '8874A255-0EC8-E911-80D8-000C29DADC00'
      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/DashboardStatusCount`
        : `Request/DashboardStatusCount/${userID}`

      this.$axios.$get(apiURL).then(response => {
        this.statusLoading = false
        if (response.success) {
          // alert()
          this.requestStatus = _.map(
            _.filter(response.result, { type: 'Status' }),
            item => {
              return {
                name: item.name,
                id: item.id,
                selected: false,
                count: item.requestStatusCount
              }
            }
          )
        } else {
          this.snackbar.text = response.message
          this.snackbar.show = true
        }
      })
    },
    getDashboardCounts() {
      let userID = '8874A255-0EC8-E911-80D8-000C29DADC00'
      let apiURL = `Request/Dashboard/${userID}`
      this.countsLoading = true
      this.$axios.$get(apiURL, this.payload).then(response => {
        this.countsLoading = false
        if (response.success) {
          let tempGeneralAviationPermit = _.filter(response.result, {
            flightType: { name: 'General Aviation' }
          })
          this.generalAviationPermit =
            tempGeneralAviationPermit.length > 0
              ? tempGeneralAviationPermit[0]
              : {}

          let tempCommercialAviationPermit = _.filter(response.result, {
            flightType: { name: 'Commercial Transport' }
          })
          this.commercialAviationPermit =
            tempCommercialAviationPermit.length > 0
              ? tempCommercialAviationPermit[0]
              : {}

          let tempDiplomaticAviationPermit = _.filter(response.result, {
            flightType: { name: 'Diplomatic Military' }
          })
          this.diplomaticPermit =
            tempDiplomaticAviationPermit.length > 0
              ? tempDiplomaticAviationPermit[0]
              : {}
        } else {
          this.snackbar.text = response.message
          this.snackbar.show = true
        }
      })
    },
    getAdminDashboardCounts() {
      let apiURL = `${process.env.adminUrl}Request/Dashboard`

      this.countsLoading = true
      this.$axios.$get(apiURL, this.payload).then(response => {
        this.countsLoading = false
        if (response.success) {
          let tempResult = response.result.dashboardViewModel
          this.users = response.result.userCount
          this.userRequests = response.result.userRequestCount
          let tempGeneralAviationPermit = _.filter(tempResult, {
            flightType: { name: 'General Aviation' }
          })
          this.generalAviationPermit =
            tempGeneralAviationPermit.length > 0
              ? tempGeneralAviationPermit[0]
              : {}

          let tempCommercialAviationPermit = _.filter(tempResult, {
            flightType: { name: 'Commercial Transport' }
          })
          this.commercialAviationPermit =
            tempCommercialAviationPermit.length > 0
              ? tempCommercialAviationPermit[0]
              : {}

          let tempDiplomaticAviationPermit = _.filter(tempResult, {
            flightType: { name: 'Diplomatic Military' }
          })
          this.diplomaticPermit =
            tempDiplomaticAviationPermit.length > 0
              ? tempDiplomaticAviationPermit[0]
              : {}
        } else {
          this.snackbar.text = response.message
          this.snackbar.show = true
        }
      })
    },
    updateFlightType(flightType, permitType, cssClass) {
      this.selectedPermitType = cssClass
      if (flightType == this.flightInfo) {
        this.permitInfo = null
        this.flightInfo = null
        this.selectedPermitType = ''
      } else {
        this.permitInfo = permitType
        this.flightInfo = flightType
      }

      this.fetchDasboard()
    },
    updateStatus(status, index) {
      this.requestStatus[index].selected = !status.selected
      this.fetchDasboard()
    }
  },
  created() {
    if (this.isAdmin) {
      this.getAdminDashboardCounts()
    } else {
      this.getDashboardCounts()
    }

    this.fetchDasboard()
    this.fetchDasboardStatus()
  },
  mounted() {
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
.selectedFlight {
  background-color: $primary !important;
  .selectedPermit {
    color: white;
  }
}
.selectedStatus {
  background-color: $primary !important;
  color: white !important;
}
.disabledStatus {
  background-color: #cacaca !important;
  color: #8a8a8a !important;
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
.hide-column {
  display: none;
}
</style>
