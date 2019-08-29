<template>
  <v-layout wrap class="user-profile">
    <v-flex xs12 sm12 md12 class="d-flex justify-end pa-0">
      <v-btn
        depressed
        small
        color="accent"
        @click="$router.back()"
        class="caption text-none mr-2"
      >Back</v-btn>
    </v-flex>
    <v-flex xs12 sm12 md3 pa-5 elevation-3 mt-3>
      <div class="d-flex flex-column align-center">
        <v-avatar color="grey" :size="100" style="cursor:pointer;" class="elevation-20">
          <span class="white--text" style="font-size:2.5rem">G</span>
          <div class="uploadLoading"></div>
        </v-avatar>
        <div class="mt-5 text-center">
          <div class="primary--text" style="font-size:1.5rem">Geraldine Bacang</div>
          <div class="caption accent--text">geraldine.bacang@gmail.com</div>
        </div>
      </div>
      <div class="mt-8">
        <div class="overline accent--text">Customer Arabic Name</div>
        <div class="caption">Geraldine Bacang</div>
      </div>
      <div class="mt-3">
        <div class="overline accent--text">Type</div>
        <div class="caption">Test Type</div>
      </div>
      <div class="mt-3">
        <div class="overline accent--text">IATA Code</div>
        <div class="caption">DXB</div>
      </div>
      <div class="mt-3">
        <div class="overline accent--text">ICAO Code</div>
        <div class="caption">OMDB</div>
      </div>
      <div class="mt-3">
        <div class="overline accent--text">Address</div>
        <div class="caption">Cluster X, JLT, Dubai, UAE</div>
      </div>
      <div class="mt-3">
        <div class="overline accent--text">Address in KSA</div>
        <div class="caption">Cluster X, JLT, Dubai, UAE</div>
      </div>
    </v-flex>
    <v-flex xs12 sm12 md9 mt-3>
      <div class="ml-3 pa-5 elevation-3" style="height:100%">
        <span class="primary-color half-a-border-on-bottom">Main Contact Information</span>
        <v-layout wrap>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="overline accent--text">Contact Person</div>
              <div class="caption">Geraldine Bacang</div>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="overline accent--text">Business Phone Number</div>
              <div class="caption">+966-123-456789</div>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="overline accent--text">Mobile Number</div>
              <div class="caption">+966-123-456789</div>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="overline accent--text">Fax Number</div>
              <div class="caption">+966-123-456789</div>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div class="mt-5">
              <div class="overline accent--text">Website</div>
              <div class="caption">www.click.aero</div>
            </div>
          </v-flex>
        </v-layout>
        <div class="mt-5">
          <span class="primary-color half-a-border-on-bottom">General Remarks</span>
        </div>
        <div class="mt-5">
          <div class="overline accent--text">General Remarks</div>
          <div
            class="caption"
          >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, molestiae pariatur, soluta, eligendi omnis vero aliquid voluptatum ipsa reprehenderit ut at quibusdam eaque distinctio. Quam ratione minima possimus quasi eaque.</div>
        </div>
        <div class="mt-5">
          <span class="primary-color half-a-border-on-bottom">Documents</span>
        </div>
        <v-layout wrap class="mt-5">
          <v-flex xs12 sm6 md2>
            <v-card class="pa-3 ml-3 elevation-0 document caption d-flex align-center">
              <div>test-document.pdf</div>
              <v-spacer></v-spacer>
              <v-icon class="white--text caption">mdi-download</v-icon>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-card class="pa-3 ml-3 elevation-0 document caption d-flex align-center">
              <div>test-document.pdf</div>
              <v-spacer></v-spacer>
              <v-icon class="white--text caption">mdi-download</v-icon>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-card class="pa-3 ml-3 elevation-0 document caption d-flex align-center">
              <div>test-document.pdf</div>
              <v-spacer></v-spacer>
              <v-icon class="white--text caption">mdi-download</v-icon>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  layout: 'main',
  data: () => ({
    title: 'User Details'
  }),

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
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