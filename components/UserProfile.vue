<template>
  <v-layout wrap class="user-profile">
    <v-flex xs12 sm12 md12 class="d-flex justify-end pa-0">
      <v-btn
        text
        small
        color="accent"
        @click="$router.back()"
        class="text-none mr-2"
        v-if="$route.path != '/profile'"
      >Back</v-btn>
      <v-btn
        v-if="$route.name == 'profile'"
        depressed
        small
        color="accent"
        @click="onEditUser"
        class="caption text-none mr-2"
      >Edit</v-btn>
      <template v-if="$route.name == 'users-requests-view-id'">
        <v-btn
          depressed
          small
          color="primary"
          class="caption text-none mr-2"
          @click="$emit('onApprove', user)"
        >Approve</v-btn>
        <v-btn
          depressed
          small
          dark
          color="red"
          class="caption text-none mr-2 userreject-btn"
          @click="$emit('onReject', user)"
        >Reject</v-btn>
      </template>
      <v-btn
        depressed
        small
        color="red"
        dark
        @click="$emit('onDelete', user)"
        class="caption text-none mr-2"
        v-if="$route.name != 'profile'"
      >Delete</v-btn>
    </v-flex>
    <v-flex
      xs12
      sm12
      md3
      pa-5
      mt-3
      elevation-3
      style=";height:calc(100vh - 180px)"
      class="white-background"
    >
      <div class="d-flex flex-column align-center">
        <v-avatar
          :color="user && user.displayPictureId ? 'white' : 'grey'"
          :size="100"
          style="cursor:pointer;"
          class="elevation-20"
        >
          <span
            class="white--text"
            style="font-size:2.5rem"
            v-if="user && !user.displayPictureId"
          >{{ user && user.name ? user.name.charAt(0) : ''}}</span>
          <template v-else>
            <v-img
              v-if="user && user.displayPictureId"
              :src="
                `${env}document/${
                  user.displayPictureId
                }`
              "
              alt
            ></v-img>
          </template>

          <div class="uploadLoading"></div>
        </v-avatar>
        <div class="mt-5 text-center">
          <div
            class="primary--text"
            style="font-size:1.5rem"
          >{{ user && user.name ? user.name : '' }}</div>
          <div class="caption accent--text">{{ user && user.email ? user.email : '-' }}</div>
        </div>
      </div>
      <div class="mt-8">
        <div class="caption grey--text">Customer Arabic Name</div>
        <div class="body-2">{{ user && user.arabicName ? user.arabicName : '-' }}</div>
      </div>
      <div class="mt-3">
        <div class="caption grey--text">Type</div>
        <div class="body-2">{{ user && user.userType ? user.userType.name : '-' }}</div>
      </div>
      <div class="mt-3">
        <div class="caption grey--text">IATA Code</div>
        <div class="body-2">{{ user && user.iata ? user.iata : '-' }}</div>
      </div>
      <div class="mt-3">
        <div class="caption grey--text">ICAO Code</div>
        <div class="body-2">{{ user && user.icao ? user.icao : '-' }}</div>
      </div>
      <div class="mt-3">
        <div class="caption grey--text">Address</div>
        <div
          v-if="user && (user.address || user.state || user.city || user.country)"
          class="body-2"
        >{{ `${user && user.address ? user.address + ', ' : ''} ${user && user.state ? user.state + ', ' : ''} ${user && user.city ? user.city.name + ', ' : ''} ${user && user.country ? user.country.name + ', ' : ''} ${user && user.zipCode ? user.zipCode : ''}` }}</div>
      </div>
      <div class="mt-3">
        <div class="caption grey--text">Address in KSA</div>
        <div
          v-if="user && (user.ksaAddress || user.ksaState || user.ksaCity || user.ksaCountry)"
          class="body-2"
        >{{ `${user && user.ksaAddress ? user.ksaAddress + ', ' : ''} ${user && user.ksaState ? user.ksaState + ', ' : ''} ${user && user.ksaCity ? user.ksaCity.name + ', ' : ''} ${user && user.ksaCountry ? user.ksaCountry.name + ', ' : ''} ${user && user.ksaZipCode ? user.ksaZipCode : ''}` }}</div>
        <div v-else class="caption">-</div>
      </div>
    </v-flex>
    <v-flex xs12 sm12 md9 mt-3>
      <div class="ml-3 pa-5 elevation-3 white-background" style="height:calc(100vh - 180px)">
        <span class="primary-color half-a-border-on-bottom">Main Contact Information</span>
        <v-layout wrap>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="caption grey--text">Contact Person</div>
              <div class="body-2">{{ user && user.contactPerson ? user.contactPerson : '-' }}</div>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="caption grey--text">Business Phone Number</div>
              <div
                class="body-2"
              >{{ user && user.businessPhoneNumber ? user.businessPhoneNumber : '-' }}</div>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="caption grey--text">Mobile Number</div>
              <div class="body-2">{{ user && user.phoneNumber ? user.phoneNumber : '-' }}</div>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="caption grey--text">Fax Number</div>
              <div class="body-2">{{ user && user.faxNumber ? user.faxNumber : '-' }}</div>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="caption grey--text">Website</div>
              <div class="body-2">{{ user && user.website ? user.website : '-' }}</div>
            </div>
          </v-flex>
        </v-layout>
        <div class="mt-5">
          <span class="primary-color half-a-border-on-bottom">General Remarks</span>
        </div>
        <div class="mt-5">
          <div class="caption grey--text">General Remarks</div>
          <div class="body-2">{{ user && user.generalRemarks ? user.generalRemarks : '-' }}</div>
        </div>
        <div class="mt-5">
          <span class="primary-color half-a-border-on-bottom">Documents</span>
        </div>
        <div class="mt-5 d-flex flex-wrap">
          <template v-if="user && user.userDocuments && user.userDocuments.length > 0">
            <v-card
              class="pa-3 mt-2 ml-3 elevation-0 document caption d-flex align-center"
              v-for="document in user.userDocuments"
              :key="document.documentId"
              @click="downloadDocument(document)"
            >
              <div>{{ document.documentName }}</div>
              <v-spacer></v-spacer>
              <v-icon class="white--text caption ml-2">mdi-download</v-icon>
            </v-card>
          </template>
          <v-flex xs12 sm12 md12 caption v-else>No Documents</v-flex>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  layout: 'main',
  props: ['user'],
  data: () => ({
    title: 'User Details',
    env: process.env.apiUrl
  }),

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
  },

  methods: {
    onEditUser() {
      if (this.$route.name == 'profile')
        this.$router.push({ path: 'profile/edit' })
      else if (this.$route.name == 'users-view-id')
        this.$router.push({
          name: 'users-edit-id',
          params: { id: this.$route.params.id }
        })
      else if (this.$route.name == 'users-requests-view-id')
        this.$router.push({
          name: 'users-requests-edit-id',
          params: { id: this.$route.params.id }
        })
    },

    downloadDocument(doc) {
      const API_DownloadPDF = `${process.env.apiUrl}Document/download/${doc.documentId}`
      window.open(API_DownloadPDF)
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.user-profile {
  .document {
    border: 1px solid $primary;
    cursor: pointer;

    .v-icon {
      opacity: 0;
    }

    &:hover {
      @include hoverShadow;
      background-color: $primary;
      color: #ffffff;

      .v-icon {
        opacity: 1;
      }
    }
  }
}
</style>