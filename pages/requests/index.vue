<template>
  <v-container class="pa-0">
    <!-- Search and filter  -->
    <v-layout wrap>
      <v-flex md2>
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
      </v-flex>
      <v-flex md2>
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
              v-model="selectedFilters.createdDate"
              label="Creation Date"
              class="mr-3"
              readonly
              v-on="on"
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
      <v-flex md2>
        <!-- <v-text-field
          color="accent"
          prepend-icon="mdi-calendar-range-outline"
          label="Expiry Date"
          class="mr-3"
        ></v-text-field>-->
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
              v-model="selectedFilters.expiryDate"
              class="mr-3"
              label="Expiry Date"
              readonly
              v-on="on"
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
      <v-flex md2 class="align-self-center">
        <!-- <div class="accent-color" @click="clearFilters()">
          <span class="clearall">Clear all</span>
        </div>-->
        <v-btn small text color="accent" @click="clearFilters()" class="caption">Clear all</v-btn>
      </v-flex>
    </v-layout>
    <!-- Status Filter  -->
    <v-layout>
      <v-flex md9>
        <div class="accent-color">Status</div>
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
            class="body-2 text-none mr-2 mt-2 no-border-radius"
          >{{status.name}}</v-chip>
        </template>
      </v-flex>
    </v-layout>

    <!-- Type Filters  -->

    <v-layout mt-4>
      <v-flex md4>
        <div class="accent-color">Flight Type</div>
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
              class="body-2 text-none caption mt-2 mr-2 no-border-radius"
            >{{status.name}}</v-chip>
          </template>
        </div>
      </v-flex>

      <v-flex md4>
        <div class="accent-color">Permit Type</div>
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
              class="body-2 text-none caption mt-2 no-border-radius mr-2"
            >{{status.name}}</v-chip>
          </template>
        </div>
      </v-flex>
    </v-layout>

    <!-- <v-layout mt-4>
      <v-flex md2 class="mr-2">
        <v-btn
          depressed
          small
          outlined
          block
          color="primary"
          class="body-2 text-none caption"
        >Filter</v-btn>
      </v-flex>
      <v-flex md2>
        <v-btn
          depressed
          small
          outlined
          block
          color="primary"
          class="body-2 text-none caption"
          @click="clearFilters()"
        >Clear</v-btn>
      </v-flex>
    </v-layout>-->

    <!-- requests data  -->

    <v-layout mt-4>
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
                <td v-if="!isAdmin" class="text-xs-right">
                  <v-menu
                    offset-y
                    dense
                    open-on-click
                    v-if="item.Status == 'Waiting For Approval' || item.Status == 'Rejected'"
                    content-class="adminAction--dropdown"
                    left
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-dots-vertical</v-icon>
                    </template>
                    <v-list dense>
                      <v-list-item :to="{name: 'requests-edit-id', params: {id: item.id}}">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <!-- <v-list-item @click="onEditUser(item)">
                        <v-list-item-title>Cancel</v-list-item-title>
                      </v-list-item>-->
                      <!-- <v-list-item>
                        <v-list-item-title class="error-color">Delete</v-list-item-title>
                      </v-list-item>-->
                    </v-list>
                  </v-menu>
                </td>
              </tr>
            </tbody>
          </template>
          <!-- <template v-slot:footer>
            <v-data-footer
              :options="{page: 1,itemsPerPage: 1}"
              :pagination="{page: 1,itemsPerPage: 10,pageStart: 1,pageStop: 1,pageCount: 1,itemsLength: 10}"
            ></v-data-footer>
          </template>-->
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
  loadingStatus: false,
  watch: {
    options: {
      handler() {
        this.getPermitRequests()
      },
      deep: true,
      immediate: false
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
    flightTypes: [],
    permitTypes: [],
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
    requests: []
  }),
  computed: {
    isAdmin() {
      return this.$store.state.app.isAdmin
    },
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
    updatePagination(pagination) {
      console.log(pagination)
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
    onSnackbarAction(action) {
      this.snackbar.show = false
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
      this.requestStatus[index].selected = !status.selected
      this.payload.PageNumber = 0
      this.myPageNumber = 1
      this.getPermitRequests()
    },
    getRequestStatus() {
      this.loadingStatus = true
      this.$axios.$get(`Common/GetListByType?type=All`).then(response => {
        this.loadingStatus = false
        if (response.success) {
          this.requestStatus = _.map(
            _.filter(response.result, { type: 'Status' }),
            item => {
              return {
                id: item.id,
                name: item.name,
                selected: false
              }
            }
          )
          this.flightTypes = _.filter(response.result, { type: 'FlightType' })
          this.permitTypes = _.filter(response.result, { type: 'PermitType' })
        } else {
        }
      })
    },
    getPermitRequests() {
      this.payload.CreatedDate = this.selectedFilters.createdDate
        ? this.selectedFilters.createdDate
        : null
      this.payload.ExpiryDate = this.selectedFilters.expiryDate
        ? this.selectedFilters.expiryDate
        : null

      this.payload.StatusId = _.map(
        _.filter(this.requestStatus, { selected: true }),
        'id'
      ) // [1,2,3,4]
      this.payload.PermitTypeId = this.selectedFilters.selectedPermitType
        ? this.selectedFilters.selectedPermitType.id
        : null
      this.payload.FlightTypeId = this.selectedFilters.selectedFlightType
        ? this.selectedFilters.selectedFlightType.id
        : null
      this.dashboardLoading = true
      let apiURL = this.isAdmin
        ? `${process.env.adminUrl}Request/all`
        : `Request/all`

      //this.payload.PageNumber // data table pagination
      this.$axios.$post(apiURL, this.payload).then(response => {
        this.dashboardLoading = false
        if (response.success) {
          // alert()
          this.totalRequests = response.result.total
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
    }
  },
  created() {
    this.$store.dispatch('app/setAppTitle', this.title)
    this.getRequestStatus()
    //this.getPermitRequests()
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
