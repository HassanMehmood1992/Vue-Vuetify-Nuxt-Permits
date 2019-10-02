<template>
  <v-select
    v-model="val"
    item-text="name"
    dense
    return-object
    :items="items"
    :loading="loading"
    :disabled="loading"
    :rules="rules"
    clearable
    :required="required"
  >
    <template v-slot:label>
      <span>{{ label }}</span>
      <span v-if="required" class="red--text">*</span>
    </template>
  </v-select>
</template>

<script>
export default {
  props: ['value', 'label', 'type', 'rules', 'required'],
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