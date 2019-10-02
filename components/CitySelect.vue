<template>
  <v-autocomplete
    v-model="val"
    item-text="name"
    dense
    return-object
    :items="items"
    :loading="loading"
    :rules="rules"
    :required="required"
    clearable
  >
    <template v-slot:label>
      <span>{{ label }}</span>
      <span v-if="required" class="red--text">*</span>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: ['value', 'label', 'rules', 'countryId', 'required'],
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
    countryId: {
      immediate: true,
      handler() {
        if (this.countryId) this.getItems()
      }
    }
  },

  methods: {
    getItems() {
      this.loading = true
      axios
        .get(`/Common/GetCityByCountry/${this.countryId}`)
        .then(response => {
          if (response && response.data.success)
            this.items = response.data.result
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>