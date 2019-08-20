<template>
  <request-form></request-form>
</template>
<script>
import RequestForm from '~/components/RequestForm'
export default {
  layout: 'main',
  components: { RequestForm },

  data: () => ({
    title: 'Edit Request',
    valid: false
  }),

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
  },

  methods: {
    calculateNavCharge() {}
  }
}
</script>
