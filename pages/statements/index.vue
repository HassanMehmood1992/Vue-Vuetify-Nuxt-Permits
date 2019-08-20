<template>
  <v-layout wrap class="statements-page">
    <v-flex xs12 sm12 md12 class="d-flex justify-space-between">
      <v-text-field placeholder="Search" class="pr-5" hide-details>
        <template v-slot:prepend-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
        <template v-slot:append>
          <v-menu offset-y :close-on-content-click="false" max-width="500">
            <template v-slot:activator="{on}">
              <v-icon v-on="on">mdi-filter-variant</v-icon>
            </template>
            <v-card>
              <v-card-title class="body-1 primary-color">Filter</v-card-title>
              <v-card-text>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Aircraft ID" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Flight Number" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Origin Code" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Dest Code" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Entry Point" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Exit Point" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Distance KM" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Aircraft Type" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Weight Factor" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Distance Factor" class="pr-3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="Flight Type" class="pr-3"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small text color="accent" class="caption">Clear all</v-btn>
                <v-btn small depressed color="primary" class="caption">Filter</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
      <v-spacer></v-spacer>
      <div>
        <div class="d-flex align-center">
          <!-- <v-text-field label="Start Date" prepend-inner-icon="mdi-calendar-month" class="pr-5"></v-text-field>
          <v-text-field label="End Date" prepend-inner-icon="mdi-calendar-month" class="pr-5"></v-text-field>-->
          <v-menu
            ref="startDateMenu"
            v-model="startDateMenu"
            :close-on-content-click="false"
            :return-value.sync="startDate"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
                class="mr-2"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startDateMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.startDateMenu.save(startDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="endDateMenu"
            v-model="endDateMenu"
            :close-on-content-click="false"
            :return-value.sync="endDate"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
                class="mr-2"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endDateMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.endDateMenu.save(endDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn depressed x-small color="primary" class="overline">Change Period</v-btn>
        </div>
      </div>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <div class="secondary-color caption">Filter (2 results)</div>
      <div class="d-flex align-center flex-wrap">
        <v-chip class="ma-1" close small outlined label color="primary" v-for="i in 10" :key="i">
          <strong>Aircraft ID:</strong>&nbsp;&nbsp;
          <span>Test aircraft ID</span>
        </v-chip>
        <v-btn x-small text color="accent" class="caption">Clear All</v-btn>
      </div>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-data-table
        dense
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="mt-8 caption"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="overline">{{ item.billingRef }}</td>
              <td class="overline px-1">{{ item.date }}</td>
              <td class="overline">{{ item.time }}</td>
              <td class="overline">{{ item.aircraftId }}</td>
              <td class="overline">{{ item.flightNumber }}</td>
              <td class="overline">{{ item.originCode }}</td>
              <td class="overline">{{ item.destCode }}</td>
              <td class="overline">{{ item.entryPoint }}</td>
              <td class="overline">{{ item.exitPoint }}</td>
              <td class="overline">{{ item.distanceKm }}</td>
              <td class="overline">{{ item.aircraftType }}</td>
              <td class="overline">{{ item.weightFactor }}</td>
              <td class="overline">{{ item.distanceFactor }}</td>
              <td class="overline">{{ item.flightType }}</td>
              <td class="overline primary-color">{{ item.enrouteCharge }}</td>
              <td class="overline primary-color">{{ item.approachCharge }}</td>
              <td class="overline primary-color">{{ item.flightTotalCharge }}</td>
              <td class="overline primary-color">{{ item.vatAmount }}</td>
            </tr>
            <tr>
              <td class="overline"></td>
              <td class="overline px-1"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="overline"></td>
              <td class="caption primary-color font-weight-bold">16, 9331</td>
              <td class="caption primary-color font-weight-bold">16, 9331</td>
              <td class="caption primary-color font-weight-bold">16, 9331</td>
              <td class="caption primary-color font-weight-bold">0.00</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs12 sm12 md12 class="d-flex justify-end mt-5 mr-5">
      <span class="mr-12 caption accent-color font-weight-bold">Total Flights</span>
      <span class="ml-12 caption primary-color font-weight-bold">10</span>
    </v-flex>
    <v-flex xs12 sm12 md12 class="d-flex justify-end mr-5">
      <span class="mr-12 caption accent-color font-weight-bold">Total Amount (SAR)</span>
      <span class="caption primary-color font-weight-bold">16, 993.61</span>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  layout: 'main',
  components: {},
  data: () => ({
    title: 'Statements',
    headers: [
      {
        text: 'Billing Reference',
        align: 'left',
        sortable: false,
        value: 'billingRef',
        width: '5%'
      },
      {
        text: 'Date',
        align: 'left',
        sortable: false,
        value: 'date',
        width: '6%'
      },
      {
        text: 'Time',
        align: 'left',
        sortable: false,
        value: 'time',
        width: '5%'
      },
      {
        text: 'Aircraft ID',
        align: 'left',
        sortable: false,
        value: 'aircraftId',
        width: '5%'
      },
      {
        text: 'Flight Number',
        align: 'left',
        sortable: false,
        value: 'flightNumber',
        width: '5%'
      },
      {
        text: 'Origin Code',
        align: 'left',
        sortable: false,
        value: 'originCode',
        width: '5%'
      },
      {
        text: 'Dest Code',
        align: 'left',
        sortable: false,
        value: 'destCode',
        width: '5%'
      },
      {
        text: 'Entry Point',
        align: 'left',
        sortable: false,
        value: 'entryPoint',
        width: '5%'
      },
      {
        text: 'Exit Point',
        align: 'left',
        sortable: false,
        value: 'exitPoint',
        width: '5%'
      },
      {
        text: 'Distance KM',
        align: 'left',
        sortable: false,
        value: 'distanceKm',
        width: '5%'
      },
      {
        text: 'Aircraft Type',
        align: 'left',
        sortable: false,
        value: 'aircraftType',
        width: '5%'
      },
      {
        text: 'Weight Factor',
        align: 'left',
        sortable: false,
        value: 'weightFactor',
        width: '5%'
      },
      {
        text: 'Distance Factor',
        align: 'left',
        sortable: false,
        value: 'distanceFactor',
        width: '5%'
      },
      {
        text: 'Flight Type',
        align: 'left',
        sortable: false,
        value: 'flightType',
        width: '5%'
      },
      {
        text: 'En-route Charge',
        align: 'left',
        sortable: false,
        value: 'enrouteCharge',
        width: '7%'
      },
      {
        text: 'Approach Charge',
        align: 'left',
        sortable: false,
        value: 'approachCharge',
        width: '7%'
      },
      {
        text: 'Flight Total Charge',
        align: 'left',
        sortable: false,
        value: 'flightTotalCharge',
        width: '7%'
      },
      {
        text: 'VAT Amount',
        align: 'left',
        sortable: false,
        value: 'vatAmount',
        width: '7%'
      }
    ],
    items: [
      {
        billingRef: '955555',
        date: '19-08-2019',
        time: '06:32',
        aircraftId: 'URCIB',
        flightNumber: 'ZAV9021',
        originCode: 'DTTA',
        destCode: 'OEJN',
        entryPoint: 'DTTA',
        exitPoint: 'OEJN',
        distanceKm: '1.75',
        aircraftType: 'IL76',
        weightFactor: '1.75',
        distanceFactor: '1.75',
        flightType: 'N',
        enrouteCharge: '402.68',
        approachCharge: '390.00',
        flightTotalCharge: '792.68',
        vatAmount: '0.00'
      },
      {
        billingRef: '955555',
        date: '19-08-2019',
        time: '06:32',
        aircraftId: 'URCIB',
        flightNumber: 'ZAV9021',
        originCode: 'DTTA',
        destCode: 'OEJN',
        entryPoint: 'DTTA',
        exitPoint: 'OEJN',
        distanceKm: '1.75',
        aircraftType: 'IL76',
        weightFactor: '1.75',
        distanceFactor: '1.75',
        flightType: 'N',
        enrouteCharge: '402.68',
        approachCharge: '390.00',
        flightTotalCharge: '792.68',
        vatAmount: '0.00'
      },
      {
        billingRef: '955555',
        date: '19-08-2019',
        time: '06:32',
        aircraftId: 'URCIB',
        flightNumber: 'ZAV9021',
        originCode: 'DTTA',
        destCode: 'OEJN',
        entryPoint: 'DTTA',
        exitPoint: 'OEJN',
        distanceKm: '1.75',
        aircraftType: 'IL76',
        weightFactor: '1.75',
        distanceFactor: '1.75',
        flightType: 'N',
        enrouteCharge: '402.68',
        approachCharge: '390.00',
        flightTotalCharge: '792.68',
        vatAmount: '0.00'
      }
    ],
    startDate: '',
    endDate: '',
    startDateMenu: false,
    endDateMenu: false
  }),

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
    this.startDate = moment()
      .date(1)
      .format('YYYY-MM-DD')
    this.endDate = moment()
      .date(30)
      .format('YYYY-MM-DD')
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.statements-page {
  .v-data-table {
    thead tr th span {
      color: #90a4ae;
    }
  }
}
</style>
