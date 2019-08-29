<template>
  <v-container fluid class="user-form">
    <v-layout wrap>
      <v-flex xs12 sm12 md12>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <div class="accent-color">Main Information</div>
              <v-divider></v-divider>
            </v-flex>
            <v-layout wrap>
              <v-flex xs12 sm12 md8>
                <v-layout wrap>
                  <v-flex xs12 sm12 md6>
                    <v-text-field
                      label="Customer English Name"
                      class="pr-2"
                      v-model="model.customerEnglishName"
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
                    <v-text-field label="Type" class="pr-2" v-model="model.type"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="IATA Code" class="pr-2" v-model="model.iataCode"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field label="ICAO Code" class="pr-2" v-model="model.icaoCode"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm12 md4 d-flex flex-column align-center justify-center mt-3>
                <v-avatar color="accent" :size="100" style="cursor:pointer;" class="elevation-20">
                  <span class="white--text" style="font-size:2.5rem">G</span>
                  <div class="uploadLoading"></div>
                </v-avatar>
                <div class="font-weight-bold mt-5">Geraldine Bacang</div>
                <div class="caption grey--text darken-1">geraldine.bacang@gmail.com</div>
                <div class="d-flex align-center justify-center mt-5">
                  <label for="upload-photo">
                    <div class="change-photo">Change Photo</div>
                  </label>
                  <input type="file" @change id="upload-photo" />
                  <v-btn text small color="primary" class="caption ml-3">Remove</v-btn>
                </div>
              </v-flex>
            </v-layout>

            <v-flex xs12 sm12 md12 class="mt-5">
              <div class="accent-color">Main Contact Information</div>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Contact Person*"
                class="pr-2"
                v-model="model.contactPerson"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                label="Business Phone Number* (e.g. +966-12-3456789)"
                class="pr-2"
                v-model="model.businessPhoneNumber"
                :rules="[rules.required]"
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
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                label="Fax Number* (e.g. +966-12-3456789)"
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
                @onSelect="model.address.country = $event;"
              ></country-select>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <city-select
                v-model="model.address.city"
                label="City*"
                class="pr-2"
                required
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
              <v-text-field
                label="Address*"
                class="pr-2"
                v-model="model.addressInKsa.address"
                :rules="[rules.required]"
              ></v-text-field>
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
              <v-text-field
                label="Country*"
                class="pr-2"
                v-model="model.addressInKsa.country"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                label="City*"
                class="pr-2"
                v-model="model.addressInKsa.city"
                :rules="[rules.required]"
              ></v-text-field>
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
              <uploader @filesAdded="filesAdded = $event" />
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
                      <v-btn text x-small color="primary" class="caption">Upload</v-btn>
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
        <v-btn
          small
          color="primary"
          class="mr-2 caption"
          min-width="100"
          :disabled="!valid || !termsAndConditions"
        >Update</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Uploader from '@/components/Uploader'
import { mask } from 'vue-the-mask'
import CountrySelect from '~/components/CountrySelect'
import CitySelect from '~/components/CitySelect'

export default {
  layout: 'main',
  components: { Uploader, CountrySelect, CitySelect },
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
      generalRemarks: '',
      attachments: []
    }
  }),

  computed: {
    rules() {
      return this.$store.state.app.inputRules
    },

    masks() {
      return this.$store.state.app.masks
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.user-form {
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