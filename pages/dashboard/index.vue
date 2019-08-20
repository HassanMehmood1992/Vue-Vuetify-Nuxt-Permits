<template>
  <v-container class="pa-0">
    <!-- Header summary -->

    <v-layout wrap>
      <v-flex class="primary-color">
        <span class="half-a-border-on-bottom">Users Requests</span>
      </v-flex>
    </v-layout>
    <v-layout class="mt-4">
      <v-flex md2 class="pr-10">
        <v-card>
          <v-layout class="pa-2 subtitle-2">
            <v-flex>Users</v-flex>
            <v-spacer></v-spacer>
            <v-flex class="text-right accent-color font-weight-bold">{{users}}</v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Permit Header -->
    <v-row class="mt-5">
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
        <v-layout mt-4>
          <v-flex md6 class="pr-6">
            <v-card
              :class="flightTypes.selectedPermitType == 'generalAviationOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType('general','over','generalAviationOverflying')"
            >
              <v-layout class="pa-2 caption">
                <v-flex class="selectedPermit">OVER - Overflying</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  class="text-right accent-color font-weight-bold"
                >{{flightTypes.generalAviationOverflying.count }}</v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex md6 class="pr-6">
            <v-card
              :class="flightTypes.selectedPermitType == 'generalAviationLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType('general','lnd','generalAviationLanding')"
            >
              <v-layout class="pa-2 caption">
                <v-flex class="selectedPermit">LND - Landing'</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  class="text-right accent-color font-weight-bold"
                >{{flightTypes.generalAviationLanding.count }}</v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4 class="pr-6">
        <div>
          <span class="half-a-border-on-bottom">Commercial Transport</span>
        </div>
        <v-layout class="mt-4">
          <v-flex md6 class="pr-6">
            <v-card
              :class="flightTypes.selectedPermitType == 'commercialTransportOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType('commercial','over','commercialTransportOverflying')"
            >
              <v-layout class="pa-2 caption">
                <v-flex class="selectedPermit">OVER - Overflying</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  class="text-right accent-color font-weight-bold"
                >{{flightTypes.commercialTransportOverflying.count }}</v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex md6 class="pr-6">
            <v-card
              :class="flightTypes.selectedPermitType == 'commercialTransportLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType('commercial','lnd','commercialTransportLanding')"
            >
              <v-layout class="pa-2 caption">
                <v-flex class="selectedPermit">LND - Landing</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  class="text-right accent-color font-weight-bold"
                >{{flightTypes.commercialTransportLanding.count }}</v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4 class="pr-6">
        <div>
          <span class="half-a-border-on-bottom">Diplomatic / Military</span>
        </div>
        <v-layout class="mt-4">
          <v-flex md6 class="pr-6">
            <v-card
              :class="flightTypes.selectedPermitType == 'diplomaticOverflying' ? 'selectedFlight' : ''"
              @click="updateFlightType('diplomatic','over','diplomaticOverflying')"
            >
              <v-layout class="pa-2 caption">
                <v-flex class="selectedPermit">OVER - Overflying</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  class="text-right accent-color font-weight-bold"
                >{{flightTypes.diplomaticOverflying.count}}</v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex md6 class="pr-6">
            <v-card
              :class="flightTypes.selectedPermitType == 'diplomaticLanding' ? 'selectedFlight' : ''"
              @click="updateFlightType('diplomatic','lnd','diplomaticLanding')"
            >
              <v-layout class="pa-2 caption">
                <v-flex class="selectedPermit">LND - Landing</v-flex>
                <v-spacer></v-spacer>
                <v-flex
                  class="text-right accent-color font-weight-bold"
                >{{flightTypes.diplomaticLanding.count}}</v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- Selected filter by type  -->
    <v-layout class="mt-10">
      <v-flex md12>
        <div class="overline">General aviation</div>
        <div class>
          <span>OVER - overflying</span>
          <span class="float-right overline">
            <router-link :to="{name: 'requests'}" class="no-decoration">
              <span class="accent-color">view all</span>
            </router-link>
          </span>
        </div>
      </v-flex>
    </v-layout>

    <!-- Status filter  -->
    <v-layout mt-4>
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
    </v-layout>

    <!-- Permit Request Table  -->

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
    users: 213,
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
      }
    ],
    flightTypes: {
      generalAviationOverflying: {
        count: 123
      },
      generalAviationLanding: {
        count: 123
      },
      commercialTransportOverflying: {
        count: 123
      },
      commercialTransportLanding: {
        count: 123
      },
      diplomaticOverflying: {
        count: 123
      },
      diplomaticLanding: {
        count: 123
      },
      selectedPermitType: ''
    },
    title: 'Dashboard',
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
</style>
