<template>
  <v-toolbar
    color="blue"
    dark
    fixed
    app
    clipped-left
  >
    <v-toolbar-side-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title @click="$router.push('/')">
      {{ $store.state.auth.user.details.team.name }}
    </v-toolbar-title>
    <v-spacer />
    <!-- <v-menu
      v-model="showNotifications"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-badge
            overlap
            color="red"
          >
            <template
              v-if="notifications.length"
              v-slot:badge
            >
              {{ notifications.length }}
            </template>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-tile
            v-for="item in notifications"
            :key="item.id"
            avatar
          >
            <v-list-tile-avatar
              color="blue"
              class="white--text"
              dark
            >
              Da
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Nuevo Objeto</v-list-tile-title>
              <v-list-tile-sub-title>Creado hace 1 hora</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                icon
                @click="dismissNotification(item.id)"
              >
                <v-icon>check</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-if="!notifications.length">
            <v-list-tile-content>
              <v-list-tile-sub-title>No hay notificaciones recientes</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu> -->

    <v-menu
      v-model="showOffices"
      :close-on-content-click="true"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="hidden-xs-only"
          flat
          v-on="on"
        >
          <v-icon>store</v-icon> {{ $store.state.app.selectedOffice.name }}
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-tile
            v-for="item in $store.state.entities.offices"
            :key="item.id"
          >
            <v-list-tile-content @click="$store.commit('app/selectOffice', item)">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.address }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.id === $store.state.app.selectedOffice.id">
              <v-btn
                icon
                @click="$store.commit('app/selectOffice', item)"
              >
                <v-icon>check</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-if="!notifications.length">
            <v-list-tile-content>
              <v-list-tile-sub-title>No hay notificaciones recientes</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
    <v-btn
      icon
      @click="logout"
    >
      <v-icon>logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      showNotifications: null,
      showOffices: null,
      notifications: [
        { id: 1 },
        { id: 2 },
      ],
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.$store.commit('app/drawer', val);
      },
    },
  },
  methods: {
    dismissNotification(id) {
      const index = this.notifications.findIndex(item => item.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    async logout() {
      this.$store.commit('entities/reset');
      await this.$store.dispatch('auth/logout');
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>
