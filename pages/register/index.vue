<template>
  <v-container fluid>
    <v-layout wrap class="mt-2 register-page">
      <perfect-scrollbar class="pr-8" v-if="!registered">
        <v-flex xs12 sm12 md12>
          <span class="half-a-border-on-bottom primary-color">Register</span>
        </v-flex>
        <v-flex xs12 sm12 md12 class="mt-5">
          <v-form v-model="valid" ref="form">
            <v-layout wrap>
              <v-flex xs12 sm12 md12 class="mt-5">
                <div class="accent-color">Main Information</div>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Email Address*"
                  class="pr-2"
                  v-model="model.emailAddress"
                  required
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Confirm Email Address"
                  class="pr-2"
                  v-model="model.confirmEmailAddress"
                  :rules="[rules.email]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Customer English Name*"
                  class="pr-2"
                  v-model="model.customerEnglishName"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Customer Arabic Name"
                  class="pr-2"
                  v-model="model.customerArabicName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <select-field
                  v-model="model.type"
                  label="Type*"
                  type="userTypes"
                  class="pr-2"
                  required
                  @onSelect="model.type = $event"
                  :rules="[rules.required]"
                ></select-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="IATA Code" class="pr-2" v-model="model.iataCode"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="ICAO Code" class="pr-2" v-model="model.icaoCode"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <div class="accent-color">Main Contact Information</div>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Contact Person*"
                  class="pr-2"
                  v-model="model.contactPerson"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Business Phone Number* (e.g. +966-12-3456789)"
                  class="pr-2"
                  v-model="model.businessPhoneNumber"
                  :rules="[rules.required]"
                  required
                  v-mask="[masks.phoneNumber]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="Extension" class="pr-2" v-model="model.extension"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Mobile Number* (e.g. +966-12-3456789)"
                  class="pr-2"
                  v-model="model.mobileNumber"
                  v-mask="[masks.phoneNumber]"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Fax Number (e.g. +966-12-3456789)"
                  class="pr-2"
                  v-model="model.faxNumber"
                  v-mask="[masks.phoneNumber]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="Website" class="pr-2" v-model="model.website"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <div class="accent-color">Address</div>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Address*"
                  class="pr-2"
                  v-model="model.address.address"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="P.O. Box" class="pr-2" v-model="model.address.poBox"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="Postal Code" class="pr-2" v-model="model.address.postalCode"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <country-select
                  v-model="model.address.country"
                  label="Country*"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  @onSelect="model.address.country = $event;"
                ></country-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <city-select
                  v-model="model.address.city"
                  label="City*"
                  class="pr-2"
                  required
                  :rules="[rules.required]"
                  :countryId="model.address.country ? model.address.country.id : null"
                  @onSelect="model.address.city = $event;"
                ></city-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="State" class="pr-2" v-model="model.address.state"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <div class="accent-color">Address in KSA</div>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Address" class="pr-2" v-model="model.addressInKsa.address"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="P.O. Box" class="pr-2" v-model="model.addressInKsa.poBox"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Postal Code"
                  class="pr-2"
                  v-model="model.addressInKsa.postalCode"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <country-select
                  v-model="model.addressInKsa.country"
                  label="Country"
                  class="pr-2"
                  @onSelect="model.addressInKsa.country = $event;"
                ></country-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <city-select
                  v-model="model.addressInKsa.city"
                  label="City"
                  class="pr-2"
                  :countryId="model.addressInKsa.country ? model.addressInKsa.country.id : null"
                  @onSelect="model.addressInKsa.city = $event;"
                ></city-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="State" class="pr-2" v-model="model.addressInKsa.state"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <div class="accent-color">General Remarks</div>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea label="General Remarks" class="pr-2" v-model="model.generalRemarks"></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <div class="accent-color">Attachments</div>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <uploader @filesAdded="filesAdded = [...filesAdded, ...$event]" />
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>Filename</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(file, index) in filesAdded" :key="index">
                      <td>{{ file.name }}</td>
                      <td class="text-right">
                        <v-btn text v-if="file.uploaded" class="primary--text" disabled>
                          <v-icon class="primary--text">mdi-check</v-icon>
                        </v-btn>
                        <v-btn
                          v-else
                          text
                          x-small
                          color="primary"
                          class="caption mr-3"
                          :loading="file.uploading"
                          @click="uploadFile(file)"
                        >Upload</v-btn>

                        <v-btn
                          text
                          x-small
                          color="red"
                          class="caption"
                          @click="filesAdded.splice(index, 1)"
                        >Remove</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mt-5">
                <div class="accent-color">Terms & Conditions</div>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-checkbox
                  v-model="termsAndConditions"
                  color="primary"
                  label="I have read and accept the Terms and Conditions"
                  class="pl-3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12 md12 class="d-flex mt-5 mb-10">
                <v-spacer></v-spacer>
                <v-btn
                  small
                  color="primary"
                  class="mr-2 caption"
                  min-width="100"
                  :disabled="!valid"
                  :loading="loading"
                  @click="registerUser"
                >Register</v-btn>
                <v-btn
                  small
                  outlined
                  color="accent"
                  class="caption"
                  min-width="100"
                  to="/login"
                >Back To Login</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </perfect-scrollbar>
      <div v-else>
        <v-flex
          sm12
          xs12
          md10
          style="margin-top:8rem"
        >Thank you for registering with PermitPad. We will review your information and shall get in touch with you shortly.</v-flex>
        <v-flex sm12 xs12 md10 d-flex justify-end>
          <v-btn
            small
            outlined
            color="accent"
            class="mt-8"
            min-width="100"
            to="/login"
          >Back To Login</v-btn>
        </v-flex>
      </div>
    </v-layout>
    <app-snackbar :snackbar="snackbar" @snackbarAction="onSnackbarAction($event)"></app-snackbar>
  </v-container>
</template>
<script>
import Uploader from '@/components/Uploader'
import { mask } from 'vue-the-mask'
import CountrySelect from '~/components/CountrySelect'
import CitySelect from '~/components/CitySelect'
import SelectField from '~/components/SelectField'

export default {
  layout: 'default',
  components: { Uploader, CountrySelect, CitySelect, SelectField },
  directives: { mask },
  data: () => ({
    valid: false,
    filesAdded: [],
    termsAndConditions: false,
    model: {
      emailAddress: '',
      confirmEmailAddress: '',
      customerEnglishName: '',
      customerArabicName: '',
      type: '',
      iataCode: '',
      icaoCode: '',
      contactPerson: '',
      businessPhoneNumber: '',
      extension: '',
      mobileNumber: '',
      faxNumber: '',
      website: '',
      address: {
        address: '',
        poBox: '',
        postalCode: '',
        country: '',
        city: '',
        state: ''
      },
      addressInKsa: {
        address: '',
        poBox: '',
        postalCode: '',
        country: '',
        city: '',
        state: ''
      },
      generalRemarks: ''
    },
    snackbar: {
      show: false,
      timeout: 6000,
      text: '',
      actions: ['Close']
    },
    registered: false
  }),

  computed: {
    rules() {
      return this.$store.state.app.inputRules
    },

    masks() {
      return this.$store.state.app.masks
    },

    loading() {
      return this.$store.state.app.loading
    }
  },

  methods: {
    uploadFile(file) {
      file.uploading = true
      const fd = new FormData()
      fd.append('file', file.file, file.file.name)
      this.$axios
        .$post('document/uploadDocuments', fd)
        .then(response => {
          file.uploaded = true
          file.documentId = response.result[0].objectId
          file.fileName = response.result[0].fileName
        })
        .catch(error => {})
        .finally(() => {
          file.uploading = false
        })
    },

    registerUser() {
      let payload = {
        name: this.model.customerEnglishName,
        arabicName: this.model.customerArabicName,
        email: this.model.emailAddress,
        userTypeId: this.model.type ? this.model.type.id : null,
        lockoutEnabled: this.model.lockoutEnabled,
        businessPhoneNumber: this.model.businessPhoneNumber,
        phoneNumber: this.model.phoneNumber,
        address: this.model.address ? this.model.address.address : null,
        zipCode: this.model.address ? this.model.address.postalCode : null,
        cityId:
          this.model.address && this.model.address.city
            ? this.model.address.city.id
            : null,
        iata: this.model.address ? this.model.iataCode : null,
        icao: this.model.address ? this.model.icaoCode : null,
        poBox: this.model.address ? this.model.poBox : null,
        faxNumber: this.model.faxNumber,
        website: this.model.website,
        generalRemarks: this.model.generalRemarks,
        ksaAddress: this.model.addressInKsa
          ? this.model.addressInKsa.address
          : null,
        ksaCityId: this.model.addressInKsa
          ? this.model.addressInKsa.city.id
          : null,
        ksapoBox: this.model.addressInKsa
          ? this.model.addressInKsa.poBox
          : null,
        ksaZipcode: this.model.addressInKsa
          ? this.model.addressInKsa.postalCode
          : null,
        userDocuments: this.filesAdded
          .filter(file => file.uploaded)
          .map(file => {
            if (file.uploaded) {
              return {
                documentId: file.documentId,
                documentName: file.fileName
              }
            }
          })
      }

      this.$store.dispatch('app/setLoading', true)

      this.$axios
        .$post('accounts/user/create', payload)
        .then(response => {
          if (response.success) this.registered = true
          this.snackbar = {
            show: true,
            timeout: 6000,
            text: response.message,
            actions: ['Close']
          }
        })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false)
        })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.register-page {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>
