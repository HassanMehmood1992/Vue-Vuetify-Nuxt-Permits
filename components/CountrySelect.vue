<template>
  <v-autocomplete
    v-model="val"
    item-text="name"
    dense
    return-object
    :items="items"
    :loading="loading"
    :disabled="loading"
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
        .get('Common/GetCountry')
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