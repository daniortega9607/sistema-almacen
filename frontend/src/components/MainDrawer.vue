<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    app
    clipped
  >
    <v-list dense>
      <!-- <v-list-group
        v-if="$store.state.auth.user.details.user_type==1"
        v-model="office"
        prepend-icon="store"
        append-icon
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Cambiar sucursal</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile
          v-for="(child, i) in $store.state.entities.offices"
          :key="i"
          @click="$store.commit('app/selectOffice', child)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ child.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group> -->
      <v-list-tile
        @click="$router.push('/')"
      >
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Inicio</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-if="$store.state.auth.user.details.user_type==1"
        @click="$router.push('/almacen')"
      >
        <v-list-tile-action>
          <v-icon>storage</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Almacen</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-if="$store.state.auth.user.details.user_type==1"
        @click="$router.push('/envios-almacen')"
      >
        <v-list-tile-action>
          <v-icon>local_shipping</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Envio de Almacen</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- <v-list-tile @click="$router.push('/home')">
        <v-list-tile-action>
          <v-icon>location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Territorio</v-list-tile-title>
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
      </v-list-tile> -->
      <v-list-group
        v-if="$store.state.auth.user.details.user_type==1"
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
        <v-list-tile
          v-for="(child, i) in item.children"
          :key="i"
          @click="$router.push(child.path)"
        >
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
      office: null,
      item: {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Gestión',
        model: false,
        children: [
          { text: 'Colores', path: '/colores' },
          { text: 'Diseños', path: '/disenos' },
          { text: 'Telas', path: '/telas' },
          { text: 'Modelos', path: '/modelos' },
          { text: 'Sucursales', path: '/sucursales' },
          { text: 'Clientes', path: '/clientes' },
          { text: 'Proveedores', path: '/proveedores' },
          { text: 'Usuarios', path: '/usuarios' },
        ],
      },
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
};
</script>
