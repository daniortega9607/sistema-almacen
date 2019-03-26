<template>
  <v-app v-if="$store.state.auth.authenticated">
    <main-drawer />
    <main-navbar />
    <v-snackbar
      v-for="(alert, index) in alerts"
      :key="'alert-'+index"
      v-model="alert.show"
      :color="alert.status ? 'success':'error'"
      :right="true"
      :top="true"
    >
      {{ alert.message }}
      <v-btn
        flat
        icon
        @click="alert.show = false"
      >
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
    <v-content>
      <v-container fluid>
        <router-view :key="$route.params.entity || ''" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import MainDrawer from './components/MainDrawer.vue';
import MainNavbar from './components/MainNavbar.vue';

export default {
  name: 'App',
  components: {
    MainDrawer,
    MainNavbar,
  },
  computed: {
    ...mapState('entities', ['offices']),
    ...mapState('app', ['alerts']),
  },
  watch: {
    offices(val) {
      if (val.length && !this.$store.state.app.selectedOffice.id) {
        this.$store.commit('app/selectOffice', val[0]);
      }
    },
  },
  async created() {
    if (this.$store.state.auth.authenticated) {
      document.title = this.$store.state.auth.user.details.team.name;
    }
    await this.$store.dispatch('entities/initialValues');
    if (this.$store.state.entities.offices.length) {
      this.$store.commit(
        'app/selectOffice',
        this.$store.state.entities.offices[0],
      );
    }
  },
};
</script>
