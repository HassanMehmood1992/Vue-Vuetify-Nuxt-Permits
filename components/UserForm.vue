<template>
  <v-container fluid class="user-form white-background pa-5" v-if="user && user.id">
    <v-layout wrap>
      <v-flex xs12 sm12 md12 class="d-flex justify-end pa-0">
        <v-btn text small color="accent" @click="$router.back()" class="text-none mr-2">Back</v-btn>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <v-form v-model="valid" ref="form">
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <div class="accent-color">Main Information</div>
              <v-divider class="pb-3"></v-divider>
            </v-flex>
            <v-layout wrap>
              <v-flex xs12 sm12 md8>
                <v-layout wrap>
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
                </v-layout>
              </v-flex>
              <v-flex xs12 sm12 md4 d-flex flex-column align-center justify-center mt-3>
                <v-avatar
                  :color="model.displayPictureId ? 'white' : 'grey'"
                  :size="100"
                  style="cursor:pointer;"
                  class="elevation-20"
                >
                  <span
                    class="white--text"
                    style="font-size:2.5rem"
                    v-if="!model.displayPictureId"
                  >{{ model.customerEnglishName.charAt(0) }}</span>
                  <v-img
                    v-else
                    :src="
                `${env}document/${
                  model.displayPictureId
                }`
              "
                    alt
                  ></v-img>
                  <div class="uploadLoading" :class="{ uploading: uploadingImage }"></div>
                </v-avatar>
                <div class="font-weight-bold mt-5">{{ model.customerEnglishName }}</div>
                <div class="caption grey--text darken-1">{{ model.email }}</div>
                <div class="d-flex align-center justify-center mt-5">
                  <label for="upload-photo">
                    <div class="change-photo">Change Photo</div>
                  </label>
                  <input type="file" @change="uploadProfilePic" id="upload-photo" />
                  <v-btn
                    text
                    small
                    color="primary"
                    class="caption ml-3"
                    @click="model.displayPictureId = null"
                  >Remove</v-btn>
                </div>
              </v-flex>
            </v-layout>

            <v-flex xs12 sm12 md12 class="mt-5">
              <div class="accent-color">Main Contact Information</div>
              <v-divider class="pb-3"></v-divider>
            </v-flex>
            <!-- Contact Person -->
            <v-flex xs12 sm12 md12>
              <v-text-field
                class="pr-2"
                v-model="model.contactPerson"
                :rules="[rules.required]"
                required
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
                v-mask="[masks.phoneNumber]"
                required
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
                label="Address*"
                class="pr-2"
                v-model="model.address.address"
                :rules="[rules.required]"
                required
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
              <uploader @filesAdded="onFilesAdded($event)" />
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Filename</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(file, index) in filesAdded" :key="index">
                    <td @click="downloadDocument(file)" class="filename">{{ file.name }}</td>
                    <td class="text-right">
                      <v-btn
                        text
                        v-if="file.uploaded || file.documentId"
                        class="primary--text"
                        disabled
                      >
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
          </v-layout>
        </v-form>
      </v-flex>
      <v-flex xs12 sm12 md12 class="d-flex mt-5">
        <v-spacer></v-spacer>
        <v-btn small color="primary" class="mr-2 caption" min-width="100" @click="onSaveUser">Update</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Uploader from '@/components/Uploader'
import { mask } from 'vue-the-mask'
import CountrySelect from '~/components/CountrySelect'
import CitySelect from '~/components/CitySelect'
import SelectField from '~/components/SelectField'

export default {
  layout: 'main',
  props: ['user'],
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
    uploadingImage: false,
    selectedFile: '',
    env: process.env.apiUrl
  }),

  computed: {
    rules() {
      return this.$store.state.app.inputRules
    },

    masks() {
      return this.$store.state.app.masks
    }
  },

  watch: {
    user: {
      immediate: true,
      handler() {
        if (this.user && this.user.id) {
          this.model = {
            emailAddress: this.user.email,
            confirmEmailAddress: this.user.confirmEmail,
            customerEnglishName: this.user.name,
            customerArabicName: this.user.arabicName,
            displayPictureId: this.user.displayPictureId,
            type: this.user.userType,
            iataCode: this.user.iata,
            icaoCode: this.user.icao,
            contactPerson: this.user.contactPerson,
            businessPhoneNumber: this.user.businessPhoneNumber,
            extension: this.user.extension,
            phoneNumber: this.user.phoneNumber,
            faxNumber: this.user.faxNumber,
            website: this.user.webSite,
            address: {
              address: this.user.address,
              poBox: this.user.poBox,
              postalCode: this.user.zipCode,
              country: this.user.country,
              city: this.user.city,
              state: this.user.state
            },
            addressInKsa: {
              address: this.user.ksaAddress,
              poBox: this.user.ksapoBox,
              postalCode: this.user.ksaZipCode,
              country: this.user.ksaCountry,
              city: this.user.ksaCity,
              state: this.user.ksaState
            },
            generalRemarks: this.user.generalRemarks
          }

          this.filesAdded = this.user.userDocuments.map(doc => {
            return {
              id: doc.id,
              name: doc.documentName,
              documentId: doc.documentId
            }
          })
        }
      }
    }
  },

  methods: {
    onSaveUser() {
      if (this.$refs.form.validate())
        this.$emit('onSaveUser', { model: this.model, files: this.filesAdded })
      else {
        window.getApp.snackbar = {
          show: true,
          text: 'Please fill out the required fields.'
        }
      }
    },

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
            file.name = response.data.result[0].fileName
          }
        })
        .finally(() => {
          file.uploading = false
        })
    },

    downloadDocument(doc) {
      const API_DownloadPDF = `${process.env.apiUrl}Document/download/${doc.documentId}`
      window.open(API_DownloadPDF)
    },

    onFilesAdded(files) {
      this.filesAdded = [...this.filesAdded, ...files]
    },

    uploadProfilePic(event) {
      this.uploadingImage = true
      this.selectedFile = event.target.files[0]

      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)

      axios
        .post('Document/uploadImage', fd)
        .then(response => {
          if (response && response.data.success) {
            if (this.$route.name == 'profile-edit') {
              this.model.displayPictureId = response.data.result[0].objectId
            }
          }
        })
        .finally(() => {
          this.uploadingImage = false
        })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.user-form {
  .filename {
    cursor: pointer;
    &:hover {
      color: $primary;
      text-decoration: underline;
    }
  }
  .change-photo {
    background-color: $primary;
    cursor: pointer;
    border-radius: 4px;
    padding: 5px 8px;
    color: #ffffff;
    font-size: 13px;
  }

  #upload-photo {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  .uploadLoading {
    width: 100px;
    height: 100px;
    position: absolute;
    border: 6px solid transparent;
    border-radius: 100%;

    &.uploading {
      &:after {
        content: '';
        position: absolute;
        width: 100px;
        height: 100px;
        top: -6px;
        left: -6px;
        bottom: -6px;
        right: -6px;
        border-radius: 100%;
        border: 6px solid transparent;
        border-top-color: $primary;
        animation: spin 1s linear infinite;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>