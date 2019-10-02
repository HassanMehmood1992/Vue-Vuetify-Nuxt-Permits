<template>
  <div>
    <request-form
      @updateRequest="updateRequest($event)"
      action="edit"
      requestBtnText="Resubmit"
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

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
    this.getRequestData()
  },

  methods: {
    onSnackbarAction(action) {
      this.snackbar.show = false
    },

    getRequestData() {
      axios
        .get(`Request/GetById?id=${this.$route.params.id}`)
        .then(response => {
          if (response && response.data.success)
            this.request = response.data.result
        })
    },

    updateRequest(payload) {
      axios.post('request/update', payload).then(response => {
        if (response && response.data.success) {
          window.getApp.snackbar = {
            show: true,
            text: response.data.message
          }
          this.$router.push({
            name: 'requests-view-id',
            params: { id: this.request.id }
          })
        }
      })
    }
  }
}
</script>
