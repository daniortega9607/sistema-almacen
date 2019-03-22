<template>
  <v-app dark>
    <v-toolbar
      app
      fixed
      clipped-left
    >
      <v-toolbar-title>Administración</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex>
            <v-card>
              <v-container
                fluid
                grid-list-md
              >
                <v-layout
                  row
                  wrap
                >
                  <v-flex>
                    <create-team />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>

import CreateTeam from '../components/admin/CreateTeam.vue';

export default {
  components: { CreateTeam },
};

</script>
