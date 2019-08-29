<template>
  <v-layout wrap>
    <v-flex xs12 sm12 md4>
      <v-text-field placeholder="Search" hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <users-table></users-table>
    </v-flex>
  </v-layout>
</template>

<script>
import UsersTable from '~/components/UsersTable'

export default {
  layout: 'main',
  components: { UsersTable },
  middleware: 'admin',

  data: () => ({
    title: 'Users Requests',
    valid: false
  }),

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
  },

  methods: {}
}
</script>
