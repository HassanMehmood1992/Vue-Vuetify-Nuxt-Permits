<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      id="appDrawer"
      dark
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-subheader v-if="!miniVariant" class="subtitle-1">
          <span class="accent-color">Permit</span>
          <span>Pad</span>
        </v-subheader>
        <v-subheader v-if="miniVariant" class="permitpad__logo subtitle-1 center">
          <v-avatar color="accent" :size="34">
            <span class="accent-color">P</span>
          </v-avatar>
        </v-subheader>
        <div class="drawer__spacer"></div>
        <template v-for="(item, i) in items">
          <v-list-item
            v-if="item.role === 'Admin' && isAdmin || (item.role === 'User' && !isAdmin) || item.role === 'Both'"
            :key="i"
            :to="item.to"
            router
          >
            <v-list-item-action class="mt-0 mb-0">
              <v-icon class="title">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="body-2">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-spacer />
      <v-list>
        <v-list-item
          class="d-flex"
          :class="{'justify-center': miniVariant, 'justify-end': !miniVariant}"
        >
          <v-list-item-action @click.stop="miniVariant = !miniVariant" class="mr-0">
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="false" flat fixed app color="white">
      <v-toolbar-title class="accent-color">{{ title }}</v-toolbar-title>
      <v-spacer />
      <div class="caption mr-2 secondary-color" text>Geraldine Bacang</div>
      <v-menu
        v-model="userprofileMenu"
        offset-y
        nudge-bottom="10"
        min-width="300px"
        max-width="300px"
        style="z-index: 999;"
      >
        <template v-slot:activator="{on}">
          <v-avatar color="accent" :size="28" v-on="on" style="cursor:pointer;">
            <span class="white--text">G</span>
          </v-avatar>
        </template>
        <v-card dark color="secondaryDarker">
          <v-card-title class="d-flex flex-column align-center">
            <v-avatar color="accent" size="80">
              <span class="white--text">G</span>
            </v-avatar>
            <div class="body-1 mt-3 white--text">Geraldine Bacang</div>
            <div class="caption accent-color">Software Developer</div>
          </v-card-title>
          <v-card-text class="mt-7">
            <div class="mb-2">
              <div class="accent-color caption">Address</div>
              <div class="caption">1703 Jumeirah Bay X2, Jumeirah Lakes Towers, Dubai, UAE</div>
            </div>
            <div class="mb-2">
              <div class="accent-color caption">Email Address</div>
              <div class="caption">geraldine.bacang@click.aero</div>
            </div>
            <div class="mb-2">
              <div class="accent-color caption">Mobile Number</div>
              <div class="caption">+971 123 4567</div>
            </div>
            <div class="mb-2">
              <div class="accent-color caption">Phone Number</div>
              <div class="caption">+971 123 4567</div>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex flex-column align-center mt-5">
            <v-btn
              outlined
              x-small
              color="accent"
              width="250px"
              class="mb-3 ml-0 caption"
            >Edit Profile</v-btn>
            <v-btn
              outlined
              x-small
              color="accent"
              width="250px"
              class="mb-3 ml-0 caption"
            >Change Password</v-btn>
            <v-btn
              outlined
              x-small
              color="accent"
              width="250px"
              class="mb-3 ml-0 caption"
              @click="logout"
            >Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container class="px-8 pt-5">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    items: [
      {
        icon: 'mdi-view-dashboard',
        title: 'Dashboard',
        to: '/dashboard',
        role: 'Both'
      },
      {
        icon: 'mdi-file-document-edit',
        title: 'Requests',
        to: '/requests',
        role: 'Both'
      },
      {
        icon: 'mdi-file-document-box-plus',
        title: 'New Request',
        to: '/new-request',
        role: 'User'
      },
      {
        icon: 'mdi-file-document-box-multiple',
        title: 'Statements',
        to: '/statements',
        role: 'User'
      },
      {
        icon: 'mdi-account-group',
        title: 'Users',
        to: '/users',
        role: 'Admin'
      },
      {
        icon: 'mdi-account-multiple-plus',
        title: 'Users Requests',
        to: '/users-requests',
        role: 'Admin'
      }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    userprofileMenu: false
  }),

  methods: {
    logout() {
      this.$router.push({ name: 'login' })
    }
  },

  computed: {
    title() {
      return this.$store.state.app.apptitle
    },

    isAdmin() {
      return this.$store.state.app.isAdmin
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/global.scss';
#appDrawer {
  background: $secondaryDarker;
  height: 100vh !important;

  .permitpad__logo {
    justify-content: center;

    .v-avatar {
      background-color: transparent !important;
      border: 1px solid;
    }
  }

  .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
  }

  .drawer__spacer {
    margin-top: 60px;
  }

  .v-list-item--active {
    // color: rgba($accent, 0.5);
    color: rgba(255, 255, 255, 0.3);
    i,
    .v-list-item__title {
      color: $accent;
    }
  }
}
</style>
