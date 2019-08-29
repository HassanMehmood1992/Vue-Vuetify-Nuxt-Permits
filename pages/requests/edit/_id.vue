<template>
  <div>
    <request-form
      @updateRequest="updateRequest($event)"
      action="edit"
      requestBtnText="Update and Submit Performa"
      :request="request"
    ></request-form>
    <app-snackbar :snackbar="snackbar" @snackbarAction="onSnackbarAction($event)"></app-snackbar>
  </div>
</template>
<script>
import RequestForm from '~/components/RequestForm'
export default {
  layout: 'main',
  components: { RequestForm },

  data: () => ({
    title: 'Edit Request',
    valid: false,
    request: {},
    snackbar: {
      show: false,
      timeout: 6000,
      text: '',
      actions: ['Close']
    },
    addedDocs: [],
    updatedDocs: [],
    deletedDocs: []
  }),

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
    this.getRequestData()
  },

  methods: {
    getRequestData() {
      this.$store.dispatch('app/setLoading', true)
      this.$axios
        .$get(`Request/GetById?id=${this.$route.params.id}`)
        .then(response => {
          this.request = response.result
        })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false)
        })
    },

    updateRequest(payload) {
      this.$store.dispatch('app/setLoading', true)

      this.$axios
        .$post('request/update', payload)
        .then(response => {
          this.snackbar = {
            show: true,
            timeout: 6000,
            text: response.message,
            actions: ['Close']
          }

          // this.checkDocuments(data.documents)
          // this.request.requestRequirements.forEach(req => {
          //   this.deleteDocument(req)
          // })
        })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false)
        })
    }

    // checkDocuments(docs) {
    //   docs.forEach(doc => {
    //     let d = this.request.requestRequirements.find(
    //       i => i.requirementId == doc.id
    //     )
    //     if (d) this.updatedDocs.push(doc)
    //     else this.addedDocs.push(doc)
    //   })

    //   this.request.requestRequirements.forEach(doc => {
    //     let d = docs.find(i => i.id == doc.requirementId)
    //     if (!d) this.deletedDocs.push(doc)
    //   })
    // },

    // addDocument(req) {
    //   let payload = {
    //     requestId: this.request.id,
    //     requirementId: req.id,
    //     documentId: req.documentId,
    //     documentName: req.documentName
    //   }

    //   this.$axios.$post('request/addrequirement', payload).then(response => {})
    // },

    // updateDocument(req) {
    //   let payload = {
    //     requestId: this.request.id,
    //     requirementId: req.id,
    //     documentId: req.documentId,
    //     documentName: req.documentName,
    //     id: req.id
    //   }

    //   this.$axios
    //     .$post('request/updaterequirement', payload)
    //     .then(response => {})
    // },

    // deleteDocument(req) {
    //   let payload = {
    //     id: req.id
    //   }

    //   this.$axios
    //     .$get('request/deleterequirement', payload)
    //     .then(response => {})
    // }
  }
}
</script>
