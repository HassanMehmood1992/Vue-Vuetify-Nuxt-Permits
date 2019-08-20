<template>
  <v-data-table :headers="headers" :items="users" class="mt-5 caption">
    <template v-slot:body="{items}">
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td class="d-flex align-center">
            <v-avatar color="accent" size="35">
              <span class="white--text body-2">G</span>
            </v-avatar>
            <span class="ml-2 caption">{{ user.name }}</span>
          </td>
          <td class="caption">{{ user.email }}</td>
          <td class="caption">{{ user.address }}</td>
          <td class="caption">{{ user.phoneNumber }}</td>
          <td class="caption">{{ user.mobileNumber }}</td>
          <td class="caption">{{ user.website }}</td>
          <td class="caption text-right">
            <v-menu offset-y>
              <template v-slot:activator="{on}">
                <v-icon v-on="on">mdi-dots-vertical</v-icon>
              </template>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item>
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
    ],
    users: [
      {
        name: 'Geraldine Bacang',
        email: 'geraldine.bacang@click.aero',
        address: '1703 Jumeirah Bay X2 Cluster X JLT, Dubai, UAE',
        phoneNumber: '+971-123-456-789',
        mobileNumber: '+971-123-456-789',
        website: 'www.click.aero'
      },
      {
        name: 'Geraldine Bacang',
        email: 'geraldine.bacang@click.aero',
        address: '1703 Jumeirah Bay X2 Cluster X JLT, Dubai, UAE',
        phoneNumber: '+971-123-456-789',
        mobileNumber: '+971-123-456-789',
        website: 'www.click.aero'
      },
      {
        name: 'Geraldine Bacang',
        email: 'geraldine.bacang@click.aero',
        address: '1703 Jumeirah Bay X2 Cluster X JLT, Dubai, UAE',
        phoneNumber: '+971-123-456-789',
        mobileNumber: '+971-123-456-789',
        website: 'www.click.aero'
      }
    ]
  }),

  methods: {}
}
</script>