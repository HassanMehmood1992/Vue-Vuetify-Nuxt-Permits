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
      disable-resize-watcher
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
    <v-app-bar :clipped-left="false" fixed app color="white">
      <v-app-bar-nav-icon v-if="!drawer" @click="drawer = !drawer" color="accent"></v-app-bar-nav-icon>
      <v-toolbar-title class="accent-color">{{ title }}</v-toolbar-title>
      <!-- <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="primary accent-4"
      ></v-progress-linear>-->
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
            <div class="caption accent-color">geraldine.bacang@click.aero</div>
          </v-card-title>
          <v-card-actions class="d-flex flex-column align-center mt-5">
            <v-btn
              outlined
              x-small
              color="accent"
              width="250px"
              class="mb-3 ml-0 caption"
              to="/profile"
            >Profile</v-btn>
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
      <perfect-scrollbar>
        <v-container class="px-8 pt-5">
          <nuxt />
        </v-container>
      </perfect-scrollbar>
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

  computed: {
    title() {
      return this.$store.state.app.apptitle
    },

    isAdmin() {
      return this.$store.state.app.isAdmin
    },

    loading() {
      return this.$store.state.app.loading
    }
  },

  created() {
    window.getApp = this
    this.getCategories()
  },

  methods: {
    getCategories() {
      this.$axios.$get(`Common/GetListByType?type=All`).then(response => {
        if (response.success) {
          this.$store.dispatch(
            'category/setRequestStatuses',
            _.filter(response.result, { type: 'Status' })
          )
          this.$store.dispatch(
            'category/setFlightTypes',
            _.filter(response.result, { type: 'FlightType' })
          )
          this.$store.dispatch(
            'category/setPermitTypes',
            _.filter(response.result, { type: 'PermitType' })
          )
          this.$store.dispatch(
            'category/setPurposeOfLanding',
            _.filter(response.result, { type: 'PurposeOfLanding' })
          )
          this.$store.dispatch(
            'category/setActions',
            _.filter(response.result, { type: 'Actions' })
          )
          this.$store.dispatch(
            'category/setClearanceTypes',
            _.filter(response.result, { type: 'ClearanceType' })
          )
        } else {
        }
      })
    },
    logout() {
      this.$router.push({ name: 'login' })
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
