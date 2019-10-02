<template>
  <v-data-table
    :headers="headers"
    :items="userList"
    :loading="loading"
    hide-default-footer
    class="mt-5 caption users-table"
  >
    <template v-if="userList.length == 0" v-slot:no-data>No Record Found</template>
    <template v-else v-slot:body="{items}">
      <tbody>
        <tr v-for="(user, index) in userList" :key="index">
          <td class="d-flex align-center">
            <v-avatar color="grey lighten-2" size="35">
              <span
                class="primary--text body-2 text-uppercase"
              >{{ user && user.fullName ? user.fullName.charAt(0) : '' }}</span>
            </v-avatar>
            <span
              class="ml-2 caption user-name text-capitalize"
              @click="onViewUser(user)"
            >{{ user.fullName }}</span>
          </td>
          <td class="caption">{{ user.email }}</td>
          <td class="caption">{{ user.address }}</td>
          <td class="caption">{{ user.businessPhoneNumber }}</td>
          <td class="caption">{{ user.phoneNumber }}</td>
          <td class="caption">{{ user.website }}</td>
          <td class="caption text-right user-actions">
            <v-menu offset-y>
              <template v-slot:activator="{on}">
                <v-icon v-on="on">mdi-dots-vertical</v-icon>
              </template>
              <v-list dense>
                <!-- <v-list-item :to="{name: 'users-edit-id',params : { id: user.id}}">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>-->
                <template v-if="$route.name == 'users-requests'">
                  <v-list-item @click="$emit('onApprove', user)">
                    <v-list-item-title class="green--text darken-4">Approve</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="$emit('onReject', user)">
                    <v-list-item-title class="red--text darken-4">Reject</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list-item @click="$emit('onDelete', user)">
                  <v-list-item-title class="red--text darken-4">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    userList: Array,
    loading: Boolean
  },
  data: () => ({
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Email',
        align: 'left',
        sortable: false,
        value: 'email'
      },
      {
        text: 'Address',
        align: 'left',
        sortable: false,
        value: 'address'
      },
      {
        text: 'Phone Number',
        align: 'left',
        sortable: false,
        value: 'phoneNumber'
      },
      {
        text: 'Mobile Number',
        align: 'left',
        sortable: false,
        value: 'mobileNumber'
      },
      {
        text: 'Website',
        align: 'left',
        sortable: false,
        value: 'website'
      },
      {
        text: '',
        align: 'left',
        sortable: false,
        value: ''
      }
    ]
  }),

  methods: {
    onViewUser(user) {
      if (this.$route.name == 'users')
        this.$router.push({ name: 'users-view-id', params: { id: user.id } })
      else
        this.$router.push({
          name: 'users-requests-view-id',
          params: { id: user.id }
        })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.users-table {
  .user-name {
    cursor: pointer;

    &:hover {
      color: $primary;
      text-decoration: underline;
    }
  }
}
</style>