<template>
  <v-container fluid>
    <v-layout wrap class="mt-2 register-page">
      <v-flex xs12 sm12 md12>
        <span class="half-a-border-on-bottom primary-color">Register</span>
      </v-flex>
      <v-flex xs12 sm12 md12 class="mt-5">
        <v-form v-model="valid" ref="form" lazy-validation>
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
              <v-text-field
                label="Country*"
                class="pr-2"
                v-model="model.address.country"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                label="City*"
                class="pr-2"
                v-model="model.address.city"
                :rules="[rules.required]"
              ></v-text-field>
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
        >Register</v-btn>
        <v-btn small outlined color="accent" class="caption" min-width="100">Back To Login</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Uploader from '@/components/Uploader'
import { mask } from 'vue-the-mask'

export default {
  layout: 'default',
  components: { Uploader },
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
.register-page {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}
</style>
