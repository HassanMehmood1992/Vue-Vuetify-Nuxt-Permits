<template>
  <v-app>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="accent accent-4"
      style="z-index:9"
      height="3"
    ></v-progress-linear>
    <v-navigation-drawer
      v-model="drawer"
      id="appDrawer"
      light
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      disable-resize-watcher
    >
      <v-list>
        <v-subheader v-if="!miniVariant" class="subtitle-1 d-flex justify-center">
          <img
            src="https://eservices.gaca.gov.sa/GACA-resources/images/layout/logoFinal.png"
            alt
            width="100"
            class="mr-2"
          />
          <span class="accent-color">Permit</span>
          <span class="primary-color">Pad</span>
        </v-subheader>
        <v-subheader v-if="miniVariant" class="permitpad__logo subtitle-1 center">
          <v-avatar color="primary" :size="34">
            <span class="primary-color">P</span>
          </v-avatar>
        </v-subheader>
        <div class="d-flex justify-center accent--text mt-8 mb-8" v-if="isAdmin">Admin</div>
        <div class="drawer__spacer" v-else></div>

        <template v-for="(item, i) in items">
          <v-list-item
            v-if="item.role === 'Admin' && isAdmin || (item.role === 'Agent' && !isAdmin) || item.role === 'Both'"
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
    <v-app-bar :clipped-left="false" fixed app color="primary">
      <v-app-bar-nav-icon v-if="!drawer" @click="drawer = !drawer" color="accent"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer />
      <div class="caption mr-2 white--text" text>{{ user ? user.name : '' }}</div>
      <v-menu
        v-model="userprofileMenu"
        offset-y
        nudge-bottom="10"
        min-width="300px"
        max-width="300px"
        style="z-index: 999;"
      >
        <template v-slot:activator="{on}">
          <v-avatar
            :color="user && user.displayPictureId ? 'white' : 'accent'"
            :size="28"
            v-on="on"
            style="cursor:pointer;"
          >
            <span
              v-if="user && !user.displayPictureId"
              class="white--text"
            >{{ user ? user.name.charAt(0) : '' }}</span>
            <template v-else>
              <v-img
                v-if="user && user.displayPictureId"
                :src="
                `${env}document/${
                   user.displayPictureId
                }`
              "
                alt
              ></v-img>
            </template>
          </v-avatar>
        </template>
        <v-card light color="white">
          <v-card-title class="d-flex flex-column align-center">
            <v-avatar color="accent" size="80">
              <span class="white--text">{{ user ? user.name.charAt(0) : '' }}</span>
            </v-avatar>
            <div class="body-1 mt-3">{{ user ? user.name: '' }}</div>
            <div class="caption primary--text">{{ user ? user.email : '' }}</div>
          </v-card-title>
          <v-card-actions class="d-flex flex-column align-center mt-5">
            <v-btn
              outlined
              x-small
              color="primary"
              width="250px"
              class="mb-3 ml-0 caption"
              to="/profile"
            >Profile</v-btn>
            <!-- <v-btn
              outlined
              x-small
              color="accent"
              width="250px"
              class="mb-3 ml-0 caption"
            >Change Password</v-btn>-->
            <v-btn
              outlined
              x-small
              color="primary"
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
        <div class="pa-3 pt-2">
          <nuxt />
        </div>
      </perfect-scrollbar>
    </v-content>

    <snackbar :snackbar="snackbar"></snackbar>
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
        role: 'Agent'
      },
      {
        icon: 'mdi-file-document-box-multiple',
        title: 'Statements',
        to: '/statements',
        role: 'Agent'
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
    userprofileMenu: false,
    snackbar: {
      show: false,
      text: null,
      color: null,
      timeout: 6000
    },
    env: process.env.apiUrl
  }),

  computed: {
    title() {
      return this.$store.state.app.apptitle
    },

    isAdmin() {
      return this.$store.state.auth.isAdmin
    },

    loading() {
      return this.$store.state.app.loading
    },

    user() {
      return this.$store.state.auth.user
    }
  },

  created() {
    window.getApp = this
    this.getCategories()
  },

  methods: {
    getCategories() {
      axios.get(`Common/GetListByType?type=All`).then(response => {
        if (response && response.data.success) {
          this.$store.dispatch(
            'category/setRequestStatuses',
            _.filter(response.data.result, { type: 'Status' })
          )
          this.$store.dispatch(
            'category/setFlightTypes',
            _.filter(response.data.result, { type: 'FlightType' })
          )
          this.$store.dispatch(
            'category/setPermitTypes',
            _.filter(response.data.result, { type: 'PermitType' })
          )
          this.$store.dispatch(
            'category/setPurposeOfLanding',
            _.filter(response.data.result, { type: 'PurposeOfLanding' })
          )
          this.$store.dispatch(
            'category/setActions',
            _.filter(response.data.result, { type: 'Actions' })
          )
          this.$store.dispatch(
            'category/setClearanceTypes',
            _.filter(response.data.result, { type: 'ClearanceType' })
          )
          this.$store.dispatch(
            'category/setUserTypes',
            _.filter(response.data.result, { type: 'UserType' })
          )
        }
      })
    },
    logout() {
      this.$store.dispatch('auth/deleteToken').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/global.scss';
.v-content {
  background: url('~assets/images/bg-texture.svg');
}

#appDrawer {
  background: #ffffff;
  height: 100vh !important;

  @include paperShadow;

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
    border-right: 3px solid #009668;
    i,
    .v-list-item__title {
      color: $primary;
    }
  }
}
</style>
