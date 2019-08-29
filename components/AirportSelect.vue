<template>
  <v-autocomplete
    v-model="val"
    :item-text="'icao' || 'iata'"
    dense
    return-object
    no-data-text="Type to search for an airport"
    :search-input.sync="search"
    :items="items"
    :label="label"
    :loading="loading"
    :disabled="loading"
    :rules="rules"
  >
    <template v-slot:item="data">
      <div>
        <span class="caption">{{ `${data.item.iata} / ${data.item.icao}` }}</span>
        <span class="caption accent--text ml-2">{{ `(${data.item.name})` }}</span>
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: ['value', 'label', 'rules'],
  data: () => ({
    items: [],
    loading: false,
    search: ''
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
    search: {
      handler() {
        this.getItems()
      }
    }
  },

  methods: {
    getItems: _.debounce(function(e) {
      this.loading = true
      this.$axios
        .$get(`Common/GetAirportListSearch?airport=${this.search}`)
        .then(response => {
          this.items = response.result
        })
        .finally(() => {
          this.loading = false
        })
    }, 1000)
  }
}
</script>