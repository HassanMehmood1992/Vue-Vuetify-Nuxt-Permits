<template>
  <v-autocomplete
    v-model="val"
    :items="items"
    dense
    item-text="aircraftType"
    return-object
    :loading="loading"
    :disabled="loading"
    :rules="rules"
    :filter="filterItems"
    :required="required"
    clearable
  >
    <template v-slot:item="data">
      <div>
        <span class="caption">{{ data.item.aircraftType }}</span>
        <span class="caption accent--text ml-2">{{ `(${data.item.aircraftDescription})` }}</span>
      </div>
    </template>
    <template v-slot:label>
      <span>{{ label }}</span>
      <span v-if="required" class="red--text">*</span>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: ['value', 'label', 'rules', 'required'],
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
      axios
        .get('Common/GetAircraftList')
        .then(response => {
          if (response && response.data.success)
            this.items = response.data.result
        })
        .finally(() => {
          this.loading = false
        })
    },

    filterItems(item, queryText, itemText) {
      return (
        item.aircraftType.toLowerCase().includes(queryText.toLowerCase()) ||
        item.aircraftDescription.toLowerCase().includes(queryText.toLowerCase())
      )
    }
  }
}
</script>