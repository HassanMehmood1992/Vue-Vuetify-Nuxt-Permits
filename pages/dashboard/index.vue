<template>
  <div class="app-dashboard white-background pa-5">
    <!-- Header summary -->
    <template v-if="isAdmin">
      <v-layout wrap>
        <v-flex class="primary-color">
          <span class="half-a-border-on-bottom">Users</span>
        </v-flex>
      </v-layout>
      <v-layout wrap class="mt-4 mb-5">
        <v-flex style="width:210px;max-width:210px;" class="pr-10">
          <router-link :to="{name:`users`}" class="no-decoration">
            <v-card class="count-card">
              <v-layout class="pa-2 subtitle-2 d-flex align-center">
                <v-flex>Users</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="title text-right accent-color font-weight-bold"
                >{{users}}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </router-link>
        </v-flex>
        <v-flex style="width:210px;max-width:210px;" class="pr-10">
          <router-link :to="{name:`users-requests`}" class="no-decoration">
            <v-card class="count-card">
              <v-layout class="pa-2 subtitle-2 d-flex align-center">
                <v-flex>Requests</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="title text-right accent-color font-weight-bold"
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
      <v-col cols="12" class="pb-0">
        <span class="primary-color">Permits</span>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <!-- Permit Types  -->
    <v-layout class="d-flex flex-wrap">
      <v-flex class="pr-6 pt-5">
        <div>
          <span class="half-a-border-on-bottom">General Aviation</span>
        </div>
        <v-layout mt-4 v-bind="generalAviationPermit">
          <v-flex style="width:210px;max-width:210px;" class="pr-6">
            <v-card
              class="count-card"
              :class="selectedPermitType == 'generalAviationOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType(generalAviationPermit,generalAviationPermit.overFlying,'generalAviationOverflying')"
            >
              <v-layout class="pa-2 caption d-flex align-center">
                <v-flex
                  class="selectedPermit"
                >{{generalAviationPermit.overFlying?generalAviationPermit.overFlying.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="title text-right accent-color font-weight-bold selectedPermit"
                >{{generalAviationPermit.overFlying ? generalAviationPermit.overFlying.permitTypeCount : 0 }}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex style="width:210px;max-width:210px;" class="pr-6">
            <v-card
              class="count-card"
              :class="selectedPermitType == 'generalAviationLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType(generalAviationPermit,generalAviationPermit.landing,'generalAviationLanding')"
            >
              <v-layout class="pa-2 caption d-flex align-center">
                <v-flex
                  class="selectedPermit"
                >{{generalAviationPermit.overFlying?generalAviationPermit.landing.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="title text-right accent-color font-weight-bold selectedPermit"
                >{{generalAviationPermit.landing ? generalAviationPermit.landing.permitTypeCount : 0 }}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="pr-6 pt-5">
        <div>
          <span class="half-a-border-on-bottom">Commercial Transport</span>
        </div>
        <v-layout class="mt-4" v-bind="commercialAviationPermit">
          <v-flex style="width:210px;max-width:210px;" class="pr-6">
            <v-card
              class="count-card"
              :class="selectedPermitType == 'commercialTransportOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType(commercialAviationPermit,commercialAviationPermit.overFlying,'commercialTransportOverflying')"
            >
              <v-layout class="pa-2 caption d-flex align-center">
                <v-flex
                  class="selectedPermit"
                >{{commercialAviationPermit.overFlying?commercialAviationPermit.overFlying.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="title text-right accent-color font-weight-bold selectedPermit"
                >{{commercialAviationPermit.overFlying?commercialAviationPermit.overFlying.permitTypeCount:0 }}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex style="width:210px;max-width:210px;" class="pr-6">
            <v-card
              class="count-card"
              :class="selectedPermitType == 'commercialTransportLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType(commercialAviationPermit,commercialAviationPermit.landing,'commercialTransportLanding')"
            >
              <v-layout class="pa-2 caption d-flex align-center">
                <v-flex
                  class="selectedPermit"
                >{{commercialAviationPermit.overFlying?commercialAviationPermit.landing.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="title text-right accent-color font-weight-bold selectedPermit"
                >{{commercialAviationPermit.landing?commercialAviationPermit.landing.permitTypeCount:0 }}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="pr-6 pt-5">
        <div>
          <span class="half-a-border-on-bottom">Diplomatic / Military</span>
        </div>
        <v-layout class="mt-4" v-bind="diplomaticPermit">
          <v-flex style="width:210px;max-width:210px;" class="pr-6">
            <v-card
              class="count-card"
              :class="selectedPermitType == 'diplomaticOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType(diplomaticPermit,diplomaticPermit.overFlying,'diplomaticOverflying')"
            >
              <v-layout class="pa-2 caption d-flex align-center">
                <v-flex
                  class="selectedPermit"
                >{{diplomaticPermit.overFlying?diplomaticPermit.overFlying.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="title text-right accent-color font-weight-bold selectedPermit"
                >{{diplomaticPermit.overFlying?diplomaticPermit.overFlying.permitTypeCount:0}}</v-flex>
                <v-flex v-else class="text-right accent-color">
                  <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex style="width:210px;max-width:210px;" class="pr-6">
            <v-card
              class="count-card"
              :class="selectedPermitType == 'diplomaticLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType(diplomaticPermit,diplomaticPermit.landing,'diplomaticLanding')"
            >
              <v-layout class="pa-2 caption d-flex align-center">
                <v-flex
                  class="selectedPermit"
                >{{diplomaticPermit.overFlying?diplomaticPermit.landing.name : ''}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  v-if="!countsLoading"
                  class="title text-right accent-color font-weight-bold selectedPermit"
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
        <v-layout wrap>
          <v-flex md3 v-if="statusLoading" class="accent-color">
            <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
          </v-flex>
          <template v-else v-for="(status, i) in requestStatus">
            <v-flex class="pr-6 mt-4" :key="i" style="width:210px;max-width:210px;">
              <v-card
                class="count-card"
                :class="status.selected ? 'selectedFlight' : ''"
                @click="updateStatus(status,i)"
              >
                <v-layout class="pa-2 caption d-flex align-center">
                  <v-flex class="selectedPermit">{{status.name}}</v-flex>
                  <v-spacer></v-spacer>
                  <v-flex
                    class="title text-right accent-color font-weight-bold selectedPermit"
                  >{{status.count }}</v-flex>
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
        <div class="caption">
          <span>{{flightInfo?flightInfo.flightType?flightInfo.flightType.name: 'All Permit Requests':'All Permit Requests'}}</span>
          <span class="ml-1 primary--text">(latest 10 items)</span>
        </div>
        <div>
          <span v-if="permitInfo && permitInfo.name">{{permitInfo.name}}</span>
          <span class="float-right caption">
            <v-btn text small class="caption text-capitalize mr-3" @click="clearFilter">Clear Filter</v-btn>
            <span
              class="accent-color pointer caption text-capitalize"
              @click="viewAllRequests"
            >{{ `view all (${total})` }}</span>
          </span>
        </div>
      </v-flex>
    </v-layout>

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
                <td class="caption">
                  <router-link
                    class="no-decoration pointer"
                    :to="{name: 'requests-view-id',params : { id: item.id}}"
                  >{{item.RequestNumber}}</router-link>
                </td>
                <td>
                  <v-menu offset-x open-on-hover>
                    <template v-slot:activator="{on}">
                      <span class="caption pointer truncate" v-on="on">{{item.OperatorName}}</span>
                    </template>
                    <v-card>
                      <v-card-text>
                        <div class="mb-2">
                          <div class="caption primary--text">Name</div>
                          <div class="caption black--text">{{ item.OperatorName }}</div>
                        </div>
                        <div class="mb-2">
                          <div class="caption primary--text">Email</div>
                          <div
                            class="caption black--text"
                          >{{ item.OperatorEmail ? item.OperatorEmail : '-' }}</div>
                        </div>
                        <div class="mb-2">
                          <div class="caption primary--text">Fax</div>
                          <div
                            class="caption black--text"
                          >{{ item.OperatorFax ? item.OperatorFax : '-' }}</div>
                        </div>
                        <div class="mb-2">
                          <div class="caption primary--text">Phone</div>
                          <div
                            class="caption black--text"
                          >{{ item.OperatorPhone ? item.OperatorPhone : '-' }}</div>
                        </div>
                        <div class="mb-2">
                          <div class="caption primary--text">Website</div>
                          <div
                            class="caption black--text"
                          >{{ item.OperatorWebsite ? item.OperatorWebsite : '-' }}</div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </td>
                <td class="caption">{{item.CreatedDate}}</td>
                <td class="caption">{{item.ExpiryDate}}</td>
                <td class="caption">{{item.FlightType}}</td>
                <td class="caption">{{item.PermitType}}</td>
                <td class="pl-0 pr-0">
                  <div class="d-flex justify-end">
                    <div
                      class="status-dot"
                      :class="`${item.Status.toLowerCase().split(' ').join('-')}-status`"
                    ></div>
                  </div>
                </td>
                <td class="d-flex align-center caption pl-1">{{item.Status}}</td>
                <td class="text-right">
                  <v-menu
                    offset-y
                    dense
                    open-on-click
                    v-if="item.Status == 'Waiting For Approval' || item.Status == 'Rejected'"
                    content-class="adminAction--dropdown"
                    left
                  >
                    <template v-slot:activator="{ on } ">
                      <v-icon v-on="on" v-if="!isAdmin">mdi-dots-vertical</v-icon>
                    </template>
                    <v-list dense>
                      <v-list-item :to="{name: 'requests-edit-id',params : { id: item.id}}">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        @click="onCancel(item)"
                        v-if="item.Status == 'Waiting For Approval' || item.Status == 'Rejected'"
                      >
                        <v-list-item-title class="error-color">Cancel</v-list-item-title>
                      </v-list-item>
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
  </div>
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
      PageSize: 10
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
    requests: [],
    total: null
  }),
  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.auth.isAdmin
    },

    headers() {
      let tempHeaders = [
        {
          text: 'Request Number',
          align: 'left',
          sortable: false,
          value: 'RequestNumber',
          width: '15%'
        },
        {
          text: 'Operator',
          align: 'left',
          sortable: false,
          value: 'Operator',
          class: '',
          width: '19%'
        },
        {
          text: 'Creation Date',
          align: 'left',
          sortable: false,
          value: 'CreatedDate',
          width: '12%'
        },
        {
          text: 'Expiry Date',
          align: 'left',
          sortable: false,
          value: 'ExpiryDate',
          width: '12%'
        },
        {
          text: 'Flight Type',
          align: 'left',
          sortable: false,
          value: 'FlightType',
          width: '10%'
        },
        {
          text: 'Permit Type',
          align: 'left',
          sortable: false,
          value: 'PermitType',
          width: '10%'
        },
        {
          text: '',
          align: 'right',
          sortable: false,
          value: '',
          width: '1%'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'Status',
          width: '20%'
        },
        {
          text: '',
          align: 'right',
          sortable: false,
          value: 'actions',
          width: '1%'
        }
      ]
      // return this.isAdmin
      //   ? _.reject(tempHeaders, { value: 'actions' })
      //   : _.reject(tempHeaders, { value: 'Operator' })
      return tempHeaders
    }
  },

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)

    if (this.isAdmin) {
      this.getAdminDashboardCounts()
    } else {
      this.getDashboardCounts()
    }

    this.fetchDasboard()
    this.fetchDasboardStatus()
  },

  methods: {
    fetchDasboard() {
      this.payload.StatusId = _.map(
        _.filter(this.requestStatus, { selected: true }),
        'id'
      )
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

      axios.post(apiURL, this.payload).then(response => {
        this.dashboardLoading = false
        if (response && response.data.success) {
          this.requests = _.map(response.data.result.requests, item => {
            return {
              id: item.id,
              RequestNumber: item.number,
              OperatorName: item.operatorName,
              OperatorEmail: item.operatorEmail,
              OperatorFax: item.operatorFax,
              OperatorPhone: item.operatorPhone,
              OperatorWebsite: item.operatorWebsite,
              CreatedDate: moment(item.createdDate).format('MM-DD-YYYY'),
              ExpiryDate: moment(item.expiryDate).format('MM-DD-YYYY'),
              FlightType: item.flightType,
              PermitType: item.permitType,
              Status: item.status.name,
              StatusId: item.status.id
            }
          })
          this.total = response.data.result.total
        }
      })
    },

    fetchDasboardStatus() {
      this.statusLoading = true
      let userID = '8874A255-0EC8-E911-80D8-000C29DADC00'
      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/DashboardStatusCount`
        : `Request/DashboardStatusCount`

      axios.get(apiURL).then(response => {
        this.statusLoading = false
        if (response && response.data.success) {
          // alert()
          this.requestStatus = _.map(
            _.filter(response.data.result, { type: 'Status' }),
            item => {
              return {
                name: item.name,
                id: item.id,
                selected: false,
                count: item.requestStatusCount
              }
            }
          )
        }
      })
    },

    getDashboardCounts() {
      let userID = '8874A255-0EC8-E911-80D8-000C29DADC00'
      let apiURL = `Request/Dashboard`
      this.countsLoading = true
      axios.get(apiURL, this.payload).then(response => {
        this.countsLoading = false
        if (response && response.data.success) {
          let tempGeneralAviationPermit = _.filter(response.data.result, {
            flightType: { name: 'General Aviation' }
          })
          this.generalAviationPermit =
            tempGeneralAviationPermit.length > 0
              ? tempGeneralAviationPermit[0]
              : {}

          let tempCommercialAviationPermit = _.filter(response.data.result, {
            flightType: { name: 'Commercial Transport' }
          })
          this.commercialAviationPermit =
            tempCommercialAviationPermit.length > 0
              ? tempCommercialAviationPermit[0]
              : {}

          let tempDiplomaticAviationPermit = _.filter(response.data.result, {
            flightType: { name: 'Diplomatic Military' }
          })
          this.diplomaticPermit =
            tempDiplomaticAviationPermit.length > 0
              ? tempDiplomaticAviationPermit[0]
              : {}
        }
      })
    },

    getAdminDashboardCounts() {
      let apiURL = `${process.env.adminUrl}Request/Dashboard`

      this.countsLoading = true
      axios.get(apiURL, this.payload).then(response => {
        this.countsLoading = false
        if (response && response.data.success) {
          let tempResult = response.data.result.dashboardViewModel
          this.users = response.data.result.userCount
          this.userRequests = response.data.result.userRequestCount
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
        }
      })
    },

    updateFlightType(flightType, permitType, cssClass) {
      this.selectedPermitType = cssClass
      if (flightType == this.flightInfo && permitType == this.permitInfo) {
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
    },

    clearFilter() {
      this.selectedPermitType = null
      this.permitInfo = null
      this.flightInfo = null
      this.requestStatus.forEach(status => (status.selected = false))
      this.fetchDasboard()
    },

    onCancel(request) {
      this.selectedRequest = request
      this.snackbar = {
        show: true,
        text: `Are you sure you want to cancel ${request.RequestNumber}?`,
        timeout: 0,
        actions: ['Yes', 'No']
      }
    },

    cancelRequest() {
      this.snackbar.show = false
      this.dashboardLoading = true
      axios
        .post(`request/cancelRequest?id=${this.selectedRequest.id}`)
        .then(response => {
          if (response && response.data.success) {
            this.fetchDasboard()
            window.getApp.snackbar = {
              show: true,
              text: response.data.message
            }
          }
        })
        .finally(() => {
          this.dashboardLoading = false
        })
    },

    viewAllRequests() {
      this.$store.dispatch('app/setRequestsFilter', this.payload)
      this.$router.push({ name: 'requests' })
    },

    onSnackbarAction(action) {
      switch (action) {
        case 'Yes':
          this.cancelRequest()
          break
        case 'No':
          this.snackbar.show = false
          break
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/global.scss';

.app-dashboard {
  .count-card {
    height: 56px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: $primary !important;
      @include hoverShadow;

      .flex {
        color: white;
      }
    }
  }
}

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
