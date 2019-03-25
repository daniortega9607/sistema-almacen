<template>
  <v-app v-if="$store.state.auth.authenticated">
    <main-drawer />
    <main-navbar />
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
    MainDrawer, MainNavbar,
  },
  computed: {
    ...mapState('entities', ['offices']),
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
      this.$store.commit('app/selectOffice', this.$store.state.entities.offices[0]);
    }
  },
};
</script>
