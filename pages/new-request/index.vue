<template>
  <div>
    <request-form
      @generateRequest="generateRequest($event)"
      action="add"
      requestBtnText="Submit"
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
    title: 'New Request',
    valid: false,
    snackbar: {
      show: false,
      timeout: 6000,
      text: '',
      actions: ['Close']
    }
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
  },

  methods: {
    onSnackbarAction(action) {
      this.snackbar.show = false
    },
    generateRequest(payload) {
      axios.post('request/add', payload).then(response => {
        if (response && response.data.success) {
          this.$router.push({
            name: 'requests-view-id',
            params: { id: response.data.result }
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
