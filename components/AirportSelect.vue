<template>
  <v-combobox
    v-model="airport"
    item-text="iata"
    dense
    return-object
    no-data-text="Type to search for an airport"
    :search-input.sync="search"
    :items="items"
    :loading="loading"
    :disabled="loading"
    :rules="rules"
    :filter="filterItems"
    :required="required"
    clearable
    @change="$emit('onSelect', $event)"
  >
    <template v-slot:item="data">
      <div>
        <span class="caption">{{ `${data.item.iata} / ${data.item.icao}` }}</span>
        <span class="caption accent--text ml-2">{{ `(${data.item.name})` }}</span>
      </div>
    </template>
    <template v-slot:selection="data">
      <span>{{ `${data.item.iata} / ${data.item.icao}` }}</span>
    </template>
    <template v-slot:label>
      <span>{{ label }}</span>
      <span v-if="required" class="red--text">*</span>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: ['value', 'label', 'rules', 'required'],
  data: () => ({
    airport: '',
    items: [],
    loading: false,
    search: ''
  }),

  watch: {
    search: {
      handler() {
        if (this.search) this.getItems()
      }
    },

    value: {
      handler() {
        if (this.value && this.value.id) {
          this.airport = {
            airportFullName: this.value.name,
            iata: this.value.iata,
            icao: this.value.icao,
            id: this.value.id,
            name: this.value.name
          }
        } else {
          this.airport = null
        }
      }
    }
  },

  methods: {
    getItems: _.debounce(function(e) {
      this.loading = true
      this.items = []
      axios
        .get(`Common/GetAirportListSearch?airport=${this.search}`)
        .then(response => {
          if (response && response.data.success)
            this.items = [...response.data.result]
        })
        .finally(() => {
          this.loading = false
        })
    }, 1000),

    filterItems(item, queryText, itemText) {
      return (
        item.iata.toLowerCase().includes(queryText.toLowerCase()) ||
        item.icao.toLowerCase().includes(queryText.toLowerCase()) ||
        item.name.toLowerCase().includes(queryText.toLowerCase())
      )
    }
  }
}
</script>