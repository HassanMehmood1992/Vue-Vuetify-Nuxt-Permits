<template>
  <div>
    <perfect-scrollbar>
      <v-layout wrap class="mt-5 pl-10 register-page" style="max-width: 1600px;margin: 0 auto;">
        <div class="white-background pa-5" v-if="!registered">
          <v-flex xs12 sm12 md12>
            <span class="half-a-border-on-bottom primary-color">Register</span>
          </v-flex>
          <v-flex xs12 sm12 md12 class="mt-5">
            <v-form v-model="valid" ref="form">
              <v-layout wrap>
                <v-flex xs12 sm12 md12 class="mt-5">
                  <div class="accent-color">Main Information</div>
                  <v-divider class="pb-3"></v-divider>
                </v-flex>
                <!-- Email -->
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    class="pr-2"
                    v-model="model.emailAddress"
                    required
                    :rules="[rules.required, rules.email]"
                  >
                    <template v-slot:label>
                      <span>Email Address</span>
                      <span class="red--text">*</span>
                    </template>
                  </v-text-field>
                </v-flex>
                <!-- Confirm Email Address -->
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    label="Confirm Email Address"
                    class="pr-2"
                    v-model="model.confirmEmailAddress"
                  ></v-text-field>
                </v-flex>
                <!-- Customer English Name -->
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    class="pr-2"
                    v-model="model.customerEnglishName"
                    required
                    :rules="[rules.required]"
                  >
                    <template v-slot:label>
                      <span>Customer English Name</span>
                      <span class="red--text">*</span>
                    </template>
                  </v-text-field>
                </v-flex>
                <!-- Customer Arabic Name -->
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    label="Customer Arabic Name"
                    class="pr-2"
                    v-model="model.customerArabicName"
                  ></v-text-field>
                </v-flex>
                <!-- User Type -->
                <v-flex xs12 sm12 md12>
                  <select-field
                    v-model="model.type"
                    label="Type"
                    type="userTypes"
                    class="pr-2"
                    :required="true"
                    @onSelect="model.type = $event"
                    :rules="[rules.required]"
                  ></select-field>
                </v-flex>
                <!-- Iata Code -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="IATA Code" class="pr-2" v-model="model.iataCode"></v-text-field>
                </v-flex>
                <!-- Icao Code -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="ICAO Code" class="pr-2" v-model="model.icaoCode"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 class="mt-5">
                  <div class="accent-color">Main Contact Information</div>
                  <v-divider class="pb-3"></v-divider>
                </v-flex>
                <!-- Contact Person -->
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    class="pr-2"
                    v-model="model.contactPerson"
                    required
                    :rules="[rules.required]"
                  >
                    <template v-slot:label>
                      <span>Contact Person</span>
                      <span class="red--text">*</span>
                    </template>
                  </v-text-field>
                </v-flex>
                <!-- Business Phone Number -->
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    class="pr-2"
                    v-model="model.businessPhoneNumber"
                    :rules="[rules.required]"
                    required
                    v-mask="[masks.phoneNumber]"
                  >
                    <template v-slot:label>
                      <span>
                        Business Phone Number
                        <span class="red--text">*</span> (e.g. +966-12-3456789)
                      </span>
                    </template>
                  </v-text-field>
                </v-flex>
                <!-- Extension -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="Extension" class="pr-2" v-model="model.extension"></v-text-field>
                </v-flex>
                <!-- Mobile Number -->
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    class="pr-2"
                    v-model="model.phoneNumber"
                    v-mask="[masks.phoneNumber]"
                    required
                    :rules="[rules.required]"
                  >
                    <template v-slot:label>
                      <span>
                        Mobile Number
                        <span class="red--text">*</span> (e.g. +966-12-3456789)
                      </span>
                    </template>
                  </v-text-field>
                </v-flex>
                <!-- Fax Number -->
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    label="Fax Number (e.g. +966-12-3456789)"
                    class="pr-2"
                    v-model="model.faxNumber"
                    v-mask="[masks.phoneNumber]"
                  ></v-text-field>
                </v-flex>
                <!-- Website -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="Website" class="pr-2" v-model="model.website"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 class="mt-5">
                  <div class="accent-color">Address</div>
                  <v-divider class="pb-3"></v-divider>
                </v-flex>
                <!-- Address -->
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    class="pr-2"
                    v-model="model.address.address"
                    required
                    :rules="[rules.required]"
                  >
                    <template v-slot:label>
                      <span>Address</span>
                      <span class="red--text">*</span>
                    </template>
                  </v-text-field>
                </v-flex>
                <!-- Country -->
                <v-flex xs12 sm12 md6>
                  <country-select
                    v-model="model.address.country"
                    label="Country"
                    class="pr-2"
                    :required="true"
                    :rules="[rules.required]"
                    @onSelect="model.address.country = $event;"
                  ></country-select>
                </v-flex>
                <!-- City -->
                <v-flex xs12 sm12 md6>
                  <city-select
                    v-model="model.address.city"
                    label="City"
                    class="pr-2"
                    :required="true"
                    :rules="[rules.required]"
                    :countryId="model.address.country ? model.address.country.id : null"
                    @onSelect="model.address.city = $event;"
                  ></city-select>
                </v-flex>
                <!-- PO Box -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="P.O. Box" class="pr-2" v-model="model.address.poBox"></v-text-field>
                </v-flex>
                <!-- Postal Code -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="Postal Code" class="pr-2" v-model="model.address.postalCode"></v-text-field>
                </v-flex>
                <!-- State -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="State" class="pr-2" v-model="model.address.state"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 class="mt-5">
                  <div class="accent-color">Address in KSA</div>
                  <v-divider class="pb-3"></v-divider>
                </v-flex>
                <!-- KSA Address -->
                <v-flex xs12 sm12 md12>
                  <v-text-field label="Address" class="pr-2" v-model="model.addressInKsa.address"></v-text-field>
                </v-flex>
                <!-- KSA City -->
                <v-flex xs12 sm12 md6>
                  <city-select
                    v-model="model.addressInKsa.city"
                    label="City"
                    class="pr-2"
                    countryId="752"
                    @onSelect="model.addressInKsa.city = $event;"
                  ></city-select>
                </v-flex>
                <!-- KSA State -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="State" class="pr-2" v-model="model.addressInKsa.state"></v-text-field>
                </v-flex>
                <!-- KSA Po Box -->
                <v-flex xs12 sm12 md6>
                  <v-text-field label="P.O. Box" class="pr-2" v-model="model.addressInKsa.poBox"></v-text-field>
                </v-flex>
                <!-- KSA Postal Code -->
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    label="Postal Code"
                    class="pr-2"
                    v-model="model.addressInKsa.postalCode"
                  ></v-text-field>
                </v-flex>
                <!-- General Remarks -->
                <v-flex xs12 sm12 md12 class="mt-5">
                  <div class="accent-color">General Remarks</div>
                  <v-divider class="pb-3"></v-divider>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea label="General Remarks" class="pr-2" v-model="model.generalRemarks"></v-textarea>
                </v-flex>
                <!-- Attachments -->
                <v-flex xs12 sm12 md12 class="mt-5">
                  <div class="accent-color">
                    Attachments
                    <span class="red--text">*</span>
                  </div>
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
                <v-flex xs12 sm12 md12 mt-3>
                  <v-checkbox v-model="termsAndConditions" color="primary" class="pl-3">
                    <template v-slot:label>
                      <div class="d-flex align-center">
                        <div>I have read and accept the</div>
                        <div
                          class="ml-1 pointer primary--text"
                          @click.stop="goToTerms"
                        >Terms and Conditions</div>
                      </div>
                    </template>
                  </v-checkbox>
                </v-flex>
                <v-flex xs12 sm12 md12 class="d-flex mt-5 mb-10">
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    color="primary"
                    class="mr-2 caption"
                    min-width="100"
                    :disabled="!termsAndConditions || loading"
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
        </div>
        <!-- <div v-else> -->
        <v-flex xs12 sm12 md12 v-else>
          <v-layout wrap>
            <v-flex xs12 sm8 md6 pr-10>
              <div
                style="margin-top:8rem"
              >Thank you for registering with PermitPad. We will review your information and shall get in touch with you shortly.</div>
              <div class="d-flex justify-end">
                <v-btn
                  small
                  outlined
                  color="accent"
                  class="mt-8"
                  min-width="100"
                  to="/login"
                >Back To Login</v-btn>
              </div>
            </v-flex>
            <v-flex xs12 sm8 md6 class="default-layout-image d-flex flex-column align-end">
              <div class="mt-12">
                <img src="~/assets/images/pixelmap.png" alt />
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- </div> -->
        <app-snackbar :snackbar="snackbar" @snackbarAction="onSnackbarAction($event)"></app-snackbar>
      </v-layout>
    </perfect-scrollbar>
  </div>
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
      phoneNumber: '',
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
    registered: false,
    title: 'Register'
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

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

  mounted() {
    this.getCategories()
  },

  methods: {
    uploadFile(file) {
      file.uploading = true
      const fd = new FormData()
      fd.append('file', file.file, file.file.name)
      axios
        .post('document/uploadDocuments', fd)
        .then(response => {
          if (response && response.data.success) {
            file.uploaded = true
            file.documentId = response.data.result[0].objectId
            file.fileName = response.data.result[0].fileName
          }
        })
        .finally(() => {
          file.uploading = false
        })
    },

    registerUser() {
      if (this.$refs.form.validate()) {
        let payload = {
          email: this.model.emailAddress,
          confirmEmail: this.model.confirmEmailAddress,
          name: this.model.customerEnglishName,
          arabicName: this.model.customerArabicName,
          userTypeId: this.model.type ? this.model.type.id : null,
          iata: this.model.address ? this.model.iataCode : null,
          icao: this.model.address ? this.model.icaoCode : null,
          contactPerson: this.model.contactPerson,
          businessPhoneNumber: this.model.businessPhoneNumber,
          extension: this.model.extension,
          phoneNumber: this.model.phoneNumber,
          faxNumber: this.model.faxNumber,
          website: this.model.website,
          address: this.model.address ? this.model.address.address : null,
          cityId:
            this.model.address && this.model.address.city
              ? this.model.address.city.id
              : null,
          poBox: this.model.address ? this.model.address.poBox : null,
          zipCode: this.model.address ? this.model.address.postalCode : null,
          state: this.model.address ? this.model.address.state : null,
          ksaAddress: this.model.addressInKsa
            ? this.model.addressInKsa.address
            : null,
          ksaCityId: this.model.addressInKsa
            ? this.model.addressInKsa.city.id
            : null,
          ksaState: this.model.addressInKsa
            ? this.model.addressInKsa.state
            : null,
          ksapoBox: this.model.addressInKsa
            ? this.model.addressInKsa.poBox
            : null,
          ksaZipcode: this.model.addressInKsa
            ? this.model.addressInKsa.postalCode
            : null,
          generalRemarks: this.model.generalRemarks,
          userDocuments: this.filesAdded
            .filter(file => file.uploaded)
            .map(file => {
              if (file.uploaded) {
                return {
                  id: null,
                  applicationUserId: null,
                  documentId: file.documentId,
                  documentName: file.fileName
                }
              }
            }),
          lockoutEnabled: this.model.lockoutEnabled
        }

        if (payload.userDocuments.length == 0) {
          window.getApp.snackbar = {
            show: true,
            text: 'Please attach and upload documents'
          }
          return
        }

        axios.post('accounts/user/create', payload).then(response => {
          if (response && response.data.success) this.registered = true
          else {
            window.getApp.snackbar = {
              show: true,
              text: response.data.result.identityResult.errors[0]
            }
          }
        })
      } else {
        window.getApp.snackbar = {
          show: true,
          text: 'Please fill out the required fields.'
        }
      }
    },

    getCategories() {
      axios.get(`Common/GetListByType?type=All`).then(response => {
        if (response && response.data.success) {
          this.$store.dispatch(
            'category/setRequestStatuses',
            _.filter(response.data.result, { type: 'Status' })
          )
          this.$store.dispatch(
            'category/setFlightTypes',
            _.filter(response.data.result, { type: 'FlightType' })
          )
          this.$store.dispatch(
            'category/setPermitTypes',
            _.filter(response.data.result, { type: 'PermitType' })
          )
          this.$store.dispatch(
            'category/setPurposeOfLanding',
            _.filter(response.data.result, { type: 'PurposeOfLanding' })
          )
          this.$store.dispatch(
            'category/setActions',
            _.filter(response.data.result, { type: 'Actions' })
          )
          this.$store.dispatch(
            'category/setClearanceTypes',
            _.filter(response.data.result, { type: 'ClearanceType' })
          )
          this.$store.dispatch(
            'category/setUserTypes',
            _.filter(response.data.result, { type: 'UserType' })
          )
        }
      })
    },

    goToTerms() {
      let routeData = this.$router.resolve({
        path: '/terms-and-conditions'
      })

      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style lang="scss">
</style>
