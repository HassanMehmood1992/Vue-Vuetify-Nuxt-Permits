<template>
  <div class="white-background pa-5">
    <!-- Search and filter  -->
    <v-layout wrap d-flex align-center justify-space-between>
      <v-flex md4 d-flex align-center>
        <v-text-field
          label="Search"
          v-model="selectedFilters.search"
          class="mr-3"
          @keyup.enter="searchRequest"
        >
          <template v-slot:prepend-inner>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
        <v-btn depressed x-small color="accent" class="caption" @click="searchRequest">Search</v-btn>
        <v-btn small text color="accent" @click="clearFilters()" class="caption ml-1">Reset</v-btn>
      </v-flex>
      <v-flex order-md8>
        <v-layout wrap d-flex align-center justify-end>
          <v-flex md3>
            <v-menu
              v-model="selectedFilters.createdDateModal"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="createdDateFormatted"
                  label="Creation Date"
                  class="mr-3"
                  readonly
                  v-on="on"
                  :append-icon="createdDateFormatted ? 'mdi-close' : ''"
                  @click:append="clearDateFilter('created')"
                >
                  <template v-slot:prepend-inner>
                    <v-icon>mdi-calendar-range-outline</v-icon>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                no-title
                scrollable
                v-model="selectedFilters.createdDate"
                @input="dateFilter('created')"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex md3>
            <v-menu
              v-model="selectedFilters.expiryDateModal"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="expiryDateFormatted"
                  class="mr-3"
                  label="Expiry Date"
                  readonly
                  v-on="on"
                  :append-icon="expiryDateFormatted ? 'mdi-close' : ''"
                  @click:append="clearDateFilter('expiry')"
                >
                  <template v-slot:prepend-inner>
                    <v-icon>mdi-calendar-range-outline</v-icon>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                no-title
                scrollable
                v-model="selectedFilters.expiryDate"
                @input="dateFilter('expiry')"
              ></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- Type Filters  -->
    <v-layout wrap>
      <v-flex xs12 sm12 md4>
        <div class="accent-color caption">Flight Type</div>
        <div>
          <v-flex v-show="loadingStatus" class="accent-color">
            <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
          </v-flex>
          <template v-show="!loadingStatus" v-for="(status, i) in flightTypes">
            <v-chip
              @click="toggleFlightType(status)"
              depressed
              :key="i"
              small
              tile
              :class="isFlightTypeSelected(status) ? 'selectedStatus' : 'disabledStatus'"
              class="caption text-none caption mt-2 mr-2 no-border-radius"
            >{{status.name}}</v-chip>
          </template>
        </div>
      </v-flex>

      <v-flex xs12 sm12 md2>
        <div class="accent-color caption">Permit Type</div>
        <div>
          <v-flex v-show="loadingStatus" class="accent-color">
            <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
          </v-flex>
          <template v-show="!loadingStatus" v-for="(status, i) in permitTypes">
            <v-chip
              @click="togglePermitType(status)"
              depressed
              :key="i"
              small
              tile
              :class="isPermitTypeSelected(status) ? 'selectedStatus' : 'disabledStatus'"
              class="caption text-none caption mt-2 no-border-radius mr-2"
            >{{status.name}}</v-chip>
          </template>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <div class="accent-color caption">Status</div>
        <v-flex v-show="loadingStatus" class="accent-color">
          <v-progress-circular indeterminate width="2" size="20"></v-progress-circular>
        </v-flex>

        <template v-show="!loadingStatus" v-for="(status, i) in requestStatus">
          <v-chip
            @click="updateStatus(status,i)"
            depressed
            small
            :key="i"
            tile
            :class="status.selected ? 'selectedStatus' : 'disabledStatus'"
            class="caption text-none mr-2 mt-2 no-border-radius"
          >{{status.name}}</v-chip>
        </template>
      </v-flex>
    </v-layout>

    <!-- requests data  -->
    <v-layout wrap mt-8>
      <v-flex md12 d-flex align-center justify-space-between>
        <div class="caption primary--text">{{ `${totalRequests} Requests` }}</div>
      </v-flex>
      <v-flex md12>
        <v-data-table
          no-data-text="No Data Found"
          :headers="headers"
          @pagination="updatePagination"
          :options.sync="options"
          :footer-props="{
          itemsPerPageOptions:[5,10,15],

          }"
          :page.sync="myPageNumber"
          :server-items-length="totalRequests"
          :items="requests"
          :items-per-page.sync="payload.PageSize"
          :loading="dashboardLoading"
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
                      <span class="caption pointer" v-on="on">{{item.OperatorName}}</span>
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
                <td class="caption">{{item.FlightDate}}</td>
                <td class="caption">{{item.ExpiryDate}}</td>
                <td class="caption">{{item.FlightType}}</td>
                <td class="caption">{{item.PermitType}}</td>
                <!-- <td
                  class="caption"
                  :class="item.Status == 'Rejected' || item.Status == 'Expired' || item.Status == 'Cancelled' ? 'red--text' : item.Status == 'Completed' ? 'primary--text' : 'accent--text'"
                >{{item.Status}}</td>-->
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
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" v-if="!isAdmin">mdi-dots-vertical</v-icon>
                    </template>
                    <v-list dense>
                      <v-list-item :to="{name: 'requests-edit-id', params: {id: item.id}}">
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
  loadingStatus: false,
  watch: {
    options: {
      handler() {
        this.getPermitRequests()
      },
      deep: true,
      immediate: false
    },

    requestStatuses: {
      immediate: true,
      handler() {
        if (this.requestStatuses.length > 0) {
          this.mapRequestStatus()
          this.loadingStatus = false
        }
      }
    },

    flightTypes: {
      immediate: true,
      handler() {
        if (this.flightTypes.length > 0) this.loadingStatus = false
      }
    },

    permitTypes: {
      immediate: true,
      handler() {
        if (this.permitTypes.length > 0) this.loadingStatus = false
      }
    },

    'selectedFilters.createdDate': {
      handler() {
        if (this.selectedFilters.createdDate)
          this.createdDateFormatted = moment(
            this.selectedFilters.createdDate
          ).format('MM-DD-YYYY')
      }
    },

    'selectedFilters.expiryDate': {
      handler() {
        if (this.selectedFilters.expiryDate)
          this.expiryDateFormatted = moment(
            this.selectedFilters.expiryDate
          ).format('MM-DD-YYYY')
      }
    }
  },
  data: () => ({
    options: {},
    myPageNumber: 0,
    totalRequests: 0,
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
    requestStatus: [],
    dashboardLoading: false,
    selectedFilters: {
      createdDate: null,
      createdDateModal: false,
      expiryDate: null,
      search: null,
      expiryDateModal: false,
      selectedFlightType: null,
      selectedPermitType: null
    },
    title: 'Requests',
    requests: [],
    selectedRequest: {},
    createdDateFormatted: null,
    expiryDateFormatted: null
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

    requestStatuses() {
      return this.$store.state.category.requestStatuses
    },

    flightTypes() {
      return this.$store.state.category.flightTypes
    },

    permitTypes() {
      return this.$store.state.category.permitTypes
    },

    headers() {
      let tempHeaders = [
        {
          text: 'Request Number',
          align: 'left',
          sortable: false,
          value: 'RequestNumber',
          width: '12%'
        },
        {
          text: 'Operator',
          align: 'left',
          sortable: false,
          value: 'Operator',
          class: '',
          width: '16%'
        },
        {
          text: 'Creation Date',
          align: 'left',
          sortable: false,
          value: 'CreatedDate',
          width: '12%'
        },
        {
          text: 'Flight Date',
          align: 'left',
          sortable: false,
          value: 'FlightDate',
          width: '9%'
        },
        {
          text: 'Expiry Date',
          align: 'left',
          sortable: false,
          value: 'ExpiryDate',
          width: '9%'
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
          width: '15%'
        },

        {
          text: '',
          align: 'right',
          sortable: false,
          value: 'actions',
          width: '1%'
        }
      ]
      return tempHeaders
    },

    requestsFilter: {
      get() {
        return this.$store.state.app.requestsFilter
      },
      set(v) {
        this.$store.dispatch('app/setRequestsFilter', v)
      }
    }
  },

  beforeDestroy() {
    this.requestsFilter = null
  },

  methods: {
    updatePagination(pagination) {
      this.payload.PageNumber = pagination.page - 1
      //this.myPageNumber = pagination.page - 1
    },
    dateFilter(input) {
      this.payload.PageNumber = 0
      this.myPageNumber = 1
      if (input == 'created') {
        this.selectedFilters.createdDateModal = false
      } else {
        this.selectedFilters.expiryDateModal = false
      }
      this.getPermitRequests()
    },

    clearDateFilter(input) {
      this.payload.PageNumber = 0
      if (input == 'created') {
        this.createdDateFormatted = null
        this.selectedFilters.createdDate = null
      } else {
        this.expiryDateFormatted = null
        this.selectedFilters.expiryDate = null
      }

      this.getPermitRequests()
    },

    searchRequest() {
      this.payload.Search = this.selectedFilters.search.trim()
      // if (this.payload.Search.length > 3) {
      //   this.getPermitRequests()
      // }
      this.myPageNumber = 1
      this.getPermitRequests()
    },
    togglePermitType(group) {
      this.requestsFilter = null
      if (this.isPermitTypeSelected(group)) {
        this.selectedFilters.selectedPermitType = null
      } else {
        this.selectedFilters.selectedPermitType = group
      }
      this.payload.PageNumber = 0
      this.myPageNumber = 1
      this.getPermitRequests()
    },
    isPermitTypeSelected(group) {
      return this.selectedFilters.selectedPermitType === group
    },
    toggleFlightType(group) {
      this.requestsFilter = null
      if (this.isFlightTypeSelected(group)) {
        this.selectedFilters.selectedFlightType = null
      } else {
        this.selectedFilters.selectedFlightType = group
      }
      this.payload.PageNumber = 0
      this.myPageNumber = 1
      this.getPermitRequests()
    },
    isFlightTypeSelected(group) {
      return this.selectedFilters.selectedFlightType === group
    },

    clearFilters() {
      this.requestsFilter = null
      this.selectedFilters = {
        createdDate: null,
        expiryDate: null,
        search: null,
        selectedFlightType: null,
        selectedPermitType: null
      }
      this.requestStatus = _.forEach(this.requestStatus, element => {
        element.selected = false
      })
      this.payload = {
        StatusId: [],
        PermitTypeId: null,
        FlightTypeId: null,
        Search: null,
        CreatedDate: null,
        ExpiryDate: null,
        PageNumber: 0,
        PageSize: 10
      }
      this.myPageNumber = 1
      this.getPermitRequests()
    },

    updateStatus(status, index) {
      this.requestsFilter = null
      this.requestStatus[index].selected = !status.selected
      this.payload.PageNumber = 0
      this.myPageNumber = 1
      this.getPermitRequests()
    },

    mapRequestStatus() {
      this.requestStatus = this.requestStatuses.map(item => {
        return {
          id: item.id,
          name: item.name,
          selected: false
        }
      })
    },

    getPermitRequests() {
      if (this.requestsFilter) {
        this.payload = this.requestsFilter
        this.requestStatus.map(
          status =>
            (status.selected = this.payload.StatusId.includes(status.id))
        )
        this.selectedFilters.selectedPermitType = this.permitTypes.find(
          permitType => permitType.id == this.payload.PermitTypeId
        )
        this.selectedFilters.selectedFlightType = this.flightTypes.find(
          flightType => flightType.id == this.payload.FlightTypeId
        )
      } else {
        this.payload.CreatedDate = this.selectedFilters.createdDate
          ? this.selectedFilters.createdDate
          : null
        this.payload.ExpiryDate = this.selectedFilters.expiryDate
          ? this.selectedFilters.expiryDate
          : null

        this.payload.StatusId = _.map(
          _.filter(this.requestStatus, { selected: true }),
          'id'
        )
        this.payload.PermitTypeId = this.selectedFilters.selectedPermitType
          ? this.selectedFilters.selectedPermitType.id
          : null
        this.payload.FlightTypeId = this.selectedFilters.selectedFlightType
          ? this.selectedFilters.selectedFlightType.id
          : null
      }

      this.dashboardLoading = true
      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/all`
        : `Request/all`

      axios.post(apiURL, this.payload).then(response => {
        this.dashboardLoading = false
        if (response && response.data.success) {
          this.totalRequests = response.data.result.total
          this.requests = _.map(response.data.result.requests, item => {
            return {
              id: item.id,
              RequestNumber: item.number,
              OperatorName: item.operatorName,
              OperatorEmail: item.operatorEmail,
              OperatorFax: item.operatorFax,
              OperatorPhone: item.operatorPhone,
              OperatorWebsite: item.operatorWebSite,
              CreatedDate: moment(item.createdDate).format('MM-DD-YYYY'),
              FlightDate: item.flightDate == '0001-01-01T00:00:00'?null:moment(item.flightDate).format('MM-DD-YYYY hh:MM'),
              ExpiryDate: item.expiryDate?moment(item.expiryDate).format('MM-DD-YYYY'):null,
              FlightType: item.flightType,
              PermitType: item.permitType,
              Status: item.status.name,
              StatusId: item.status.id
            }
          })
        }
      })
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
            this.getPermitRequests()
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
  },
  created() {
    this.$store.dispatch('app/setAppTitle', this.title)
    this.loadingStatus = true
    // this.getRequestStatus()
    //this.getPermitRequests()

    if (
      this.requestStatus.length > 0 &&
      this.permitTypes.length > 0 &&
      this.flightTypes.length > 0
    )
      this.loadingStatus = false
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.selectedStatus {
  background-color: $primary !important;
  color: white !important;
}
.disabledStatus {
  background-color: #cacaca !important;
  color: #8a8a8a !important;
}
.clearall {
  // border-bottom: 1px solid $accent;
  // padding-bottom: 4px;
  cursor: pointer;
}
</style>
