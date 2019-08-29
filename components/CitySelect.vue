<template>
  <v-autocomplete
    v-model="val"
    item-text="name"
    dense
    return-object
    :items="items"
    :label="label"
    :loading="loading"
    :rules="rules"
  ></v-autocomplete>
</template>

<script>
export default {
  props: ['value', 'label', 'rules', 'countryId'],
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

  watch: {
    countryId() {
      if (this.countryId) this.getItems()
    }
  },

  methods: {
    getItems() {
      this.loading = true
      this.$axios
        .$get(`/Common/GetCityByCountry/${this.countryId}`)
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