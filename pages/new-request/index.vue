<template>
  <div>
    <request-form
      @generateRequest="generateRequest($event)"
      action="add"
      requestBtnText="Generate Performa"
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

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
  },

  methods: {
    generateRequest(payload) {
      this.$store.dispatch('app/setLoading', true)
      this.$axios
        .$post('request/add', payload)
        .then(response => {
          if (response.success) {
            this.snackbar = {
              show: true,
              timeout: 6000,
              text: response.message,
              actions: ['Close']
            }
          }
        })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false)
        })
    }
  }
}
</script>
