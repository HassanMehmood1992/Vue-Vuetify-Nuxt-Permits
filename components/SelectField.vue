<template>
  <v-select
    v-model="val"
    item-text="name"
    dense
    return-object
    :items="items"
    :label="label"
    :loading="loading"
    :disabled="loading"
    :rules="rules"
  ></v-select>
</template>

<script>
export default {
  props: ['value', 'label', 'type', 'rules'],
  data: () => ({
    loading: false
  }),

  computed: {
    items() {
      return this.$store.state.category[this.type]
    },

    val: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('onSelect', v)
      }
    }
  }
}
</script>