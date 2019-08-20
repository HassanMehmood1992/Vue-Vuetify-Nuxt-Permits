<template>
  <v-container class="pa-0">
    <!-- Search and filter  -->
    <v-layout wrap>
      <v-flex md2>
        <v-text-field label="Search" class="mr-3" color="accent">
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
            @input="selectedFilters.createdDateModal = false"
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
            @input="selectedFilters.expiryDateModal = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <!-- Status Filter  -->
    <v-layout>
      <v-flex md9>
        <div class="accent-color">Status</div>
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
    </v-layout>

    <!-- Type Filters  -->

    <v-layout mt-4>
      <v-flex md4>
        <div class="accent-color">Flight Type</div>
        <div>
          <v-chip
            @click="selectedFilters.selectedFlightType = 'generalAviation'"
            depressed
            small
            tile
            :class="selectedFilters.selectedFlightType == 'generalAviation' ? 'selectedStatus' : 'disabledStatus'"
            class="body-2 text-none caption mt-2 no-border-radius"
          >General aviation</v-chip>
          <v-chip
            @click="selectedFilters.selectedFlightType = 'commercialTransport'"
            depressed
            small
            tile
            :class="selectedFilters.selectedFlightType == 'commercialTransport' ? 'selectedStatus' : 'disabledStatus'"
            class="body-2 text-none caption mt-2 no-border-radius"
          >Commercial transport</v-chip>
          <v-chip
            @click="selectedFilters.selectedFlightType = 'diplomatic'"
            depressed
            small
            :class="selectedFilters.selectedFlightType == 'diplomatic' ? 'selectedStatus' : 'disabledStatus'"
            tile
            class="body-2 text-none caption mt-2 no-border-radius"
          >Diplomatic / Military</v-chip>
        </div>
      </v-flex>
      <v-flex md4>
        <div class="accent-color">Permit Type</div>
        <div>
          <v-chip
            @click="selectedFilters.selectedPermitType = 'overflying'"
            depressed
            small
            tile
            :class="selectedFilters.selectedPermitType == 'overflying' ? 'selectedStatus' : 'disabledStatus'"
            class="body-2 text-none caption mt-2 no-border-radius"
          >OVER - Overflying</v-chip>
          <v-chip
            depressed
            @click="selectedFilters.selectedPermitType = 'landing'"
            small
            tile
            :class="selectedFilters.selectedPermitType == 'landing' ? 'selectedStatus' : 'disabledStatus'"
            class="body-2 text-none caption mt-2 no-border-radius"
          >LND - Landing</v-chip>
        </div>
      </v-flex>
    </v-layout>

    <v-layout mt-4>
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
        <v-btn depressed small outlined block color="primary" class="body-2 text-none caption">Clear</v-btn>
      </v-flex>
    </v-layout>

    <!-- requests data  -->

    <v-layout mt-4>
      <v-flex md12>
        <v-data-table :headers="headers" :items="requests">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>
                  <router-link
                    :to="{name: 'requests-view-id',params : { id: 123}}"
                  >{{item.RequestNumber}}</router-link>
                </td>
                <td>{{item.Operator}}</td>
                <td>{{item.CreatedDate}}</td>
                <td>{{item.ExpiryDate}}</td>
                <td>{{item.FlightType}}</td>
                <td>{{item.PermitType}}</td>
                <td>{{item.Status}}</td>
                <td class="text-xs-right">
                  <v-menu offset-y dense open-on-click content-class="adminAction--dropdown" left>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-dots-vertical</v-icon>
                    </template>
                    <v-list>
                      <v-list-item @click="onEditUser(item)">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title class="error-color">Delete</v-list-item-title>
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
  </v-container>
</template>
<script>
export default {
  layout: 'main',
  components: {},

  data: () => ({
    requestStatus: [
      {
        name: 'Approved',
        id: 0,
        selected: false
      },
      {
        name: 'Canceled',
        id: 0,
        selected: false
      },
      {
        name: 'Expired',
        id: 0,
        selected: false
      },
      {
        name: 'Waiting for approval',
        id: 0,
        selected: false
      },
      {
        name: 'Approved and waiting for payment',
        id: 0,
        selected: false
      },
      {
        name: 'Waiting for last approval',
        id: 0,
        selected: false
      },
      {
        name: 'Expired',
        id: 0,
        selected: false
      }
    ],
    selectedFilters: {
      createdDate: null,
      createdDateModal: false,
      expirayDate: null,
      expirayDateModal: false,
      selectedFlightType: '',
      selectedPermitType: ''
    },
    title: 'Requests',
    headers: [
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
        value: 'Operator'
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
    ],
    requests: [
      {
        id: 1,
        RequestNumber: 13210,
        Operator: 'Operator x',
        CreatedDate: moment(new Date()).format('MM-DD-YYYY'),
        ExpiryDate: moment(new Date()).format('MM-DD-YYYY'),
        FlightType: 'General Aviation',
        PermitType: 'LND - Landing',
        Status: 1
      }
    ]
  }),
  methods: {
    updateFlightType(flightType, permitType, cssClass) {
      this.flightTypes.selectedPermitType = cssClass
    },
    updateStatus(status, index) {
      this.requestStatus[index].selected = !status.selected
    }
  },
  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
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
</style>
