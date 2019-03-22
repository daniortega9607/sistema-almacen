<template>
  <v-app v-if="$store.state.auth.authenticated">
    <main-drawer />
    <main-navbar />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MainDrawer from './components/MainDrawer.vue';
import MainNavbar from './components/MainNavbar.vue';

export default {
  name: 'App',
  components: {
    MainDrawer, MainNavbar,
  },
  created() {
    document.title = this.$store.state.auth.user.details.team.name;
  },
};
</script>
