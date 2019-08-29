<template>
  <v-snackbar v-model="snackbar.show" top right :timeout="snackbar.timeout">
    {{ snackbar.text }}
    <v-btn
      v-for="action in snackbar.actions"
      :key="action"
      dark
      text
      class="caption"
      @click="$emit('snackbarAction', action)"
    >{{ action }}</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: ['snackbar']
}
</script>