<template>
  <v-autocomplete
    v-model="val"
    item-text="registration"
    dense
    return-object
    :items="items"
    :label="label"
    :loading="loading"
    :disabled="loading"
    :rules="rules"
  ></v-autocomplete>
</template>

<script>
export default {
  props: ['value', 'label', 'rules'],
  data: () => ({
    items: [],
    loading: false
  }),

  computed: {
    val: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('onSelect', v)
      }
    }
  },

  mounted() {
    this.getItems()
  },

  methods: {
    getItems() {
      this.loading = true
      this.$axios
        .$get('Common/GetAircraftList')
        .then(response => {
          this.items = response.result
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>