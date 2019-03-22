<template>
  <v-navigation-drawer v-model="drawer" fixed app clipped>
    <v-list dense>
      <v-list-tile @click="$router.push('/home')">
        <v-list-tile-action>
          <v-icon>location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Territorio</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="$router.push('/territorio')">
        <v-list-tile-action>
          <v-icon>format_list_numbered</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Reporte de Territorio</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="$router.push('/servicio')">
        <v-list-tile-action>
          <v-icon>list_alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Reporte de Servicio</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="$router.push('/asistencia')">
        <v-list-tile-action>
          <v-icon>calendar_today</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Reporte de Asistencia</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-group
        v-model="item.model"
        :prepend-icon="item.model ? item.icon : item['icon-alt']"
        append-icon
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(child, i) in item.children" :key="i" @click>
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ child.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile @click="$router.push('/ajustes')">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Ajustes</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      item: {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Gestión',
          model: false,
          children: [
            { icon: 'list', text: 'Territorios' },
            { icon: 'crop_square', text: 'Manzanas' },
            { icon: 'group', text: 'Grupos' },
            { icon: 'person', text: 'Publicadores' },
          ]
        },
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.$store.commit("app/drawer", val);
      }
    }
  }
};
</script>
