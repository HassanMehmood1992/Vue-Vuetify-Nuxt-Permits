<template>
  <user-form :user="user" @onSaveUser="updateUser($event.model, $event.files)"></user-form>
</template>

<script>
import UserForm from '@/components/UserForm'

export default {
  layout: 'main',
  components: { UserForm },
  data: () => ({
    title: 'User Request Edit',
    user: {}
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
    this.getUserDetails()
  },

  methods: {
    getUserDetails() {
      axios
        .get(`${process.env.adminUrl}accounts/user/${this.$route.params.id}`)
        .then(response => {
          if (response && response.data.success) {
            this.user = response.data.result
          }
        })
    },

    updateUser(model, files) {
      let payload = {
        id: this.user.id,
        email: model.emailAddress,
        confirmEmail: model.emailAddress,
        name: model.customerEnglishName,
        arabicName: model.customerArabicName,
        userTypeId: model.type ? model.type.id : null,
        iata: model.address ? model.iataCode : null,
        icao: model.address ? model.icaoCode : null,
        contactPerson: model.contactPerson,
        businessPhoneNumber: model.businessPhoneNumber,
        extension: model.extension,
        phoneNumber: model.phoneNumber,
        faxNumber: model.faxNumber,
        website: model.website,
        address: model.address ? model.address.address : null,
        cityId:
          model.address && model.address.city ? model.address.city.id : null,
        poBox: model.address ? model.address.poBox : null,
        zipCode: model.address ? model.address.postalCode : null,
        state: model.address ? model.address.state : null,
        ksaAddress: model.addressInKsa ? model.addressInKsa.address : null,
        ksaCityId:
          model.addressInKsa && model.addressInKsa.city
            ? model.addressInKsa.city.id
            : null,
        ksaState: model.addressInKsa ? model.addressInKsa.state : null,
        ksapoBox: model.addressInKsa ? model.addressInKsa.poBox : null,
        ksaZipcode: model.addressInKsa ? model.addressInKsa.postalCode : null,
        generalRemarks: model.generalRemarks,
        userDocuments: files
          .filter(file => file.uploaded || file.documentId)
          .map(file => {
            if (file.uploaded || file.documentId) {
              return {
                id: file.id || null,
                applicationUserId: this.user.id,
                documentId: file.documentId,
                documentName: file.name
              }
            }
          }),
        displayPictureId: model.displayPictureId,
        lockoutEnabled: model.lockoutEnabled
      }

      if (payload.userDocuments.length == 0) {
        window.getApp.snackbar = {
          show: true,
          text: 'Please attach and upload documents'
        }
        return
      }

      axios.post('accounts/user/update', payload).then(response => {
        if (response && response.data.success) {
          this.$router.push({
            name: 'users-view-id',
            params: { id: this.user.id }
          })

          window.getApp.snackbar = {
            show: true,
            text: response.data.message
          }
        }
      })
    }
  }
}
</script>
<style lang="scss"></style>