<template>
  <v-card>
    <v-card-title>
      <span class="title">Crear Equipo</span>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="createTeam"
      >
        <v-text-field
          v-model="team.name"
          :rules="[validations.required]"
          label="Nombre de Equipo"
        />
        <v-text-field
          v-model="team.user.name"
          :rules="[validations.required]"
          label="Nombre de Usuario"
        />
        <v-text-field
          v-model="team.user.email"
          :rules="[validations.email]"
          label="Correo Electrónico"
        />
        <v-text-field
          v-model="team.user.password"
          browser-autocomplete="new-password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :type="showPassword ? 'text' : 'password'"
          :rules="[validations.min]"
          label="Contraseña"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :loading="saving"
        :disabled="saving || !valid"
        color="success"
        @click="createTeam"
      >
        Guardar
      </v-btn>
    </v-card-actions>
    <v-snackbar
      v-model="alert.show"
      :color="alert.type"
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
  </v-card>
</template>
<script>
import { fetch, getErrors } from '../../utils';

const validations = {
  required: v => !!v || 'Debe completar este campo',
  email: v => /.+@.+/.test(v) || 'Debe ingresar un e-mail válido',
  min: v => v.length >= 6 || 'Minimo 6 caracteres',
};

export default {
  data() {
    return {
      valid: false,
      team: { name: '', user: { name: '', email: '', password: '' } },
      saving: false,
      showPassword: false,
      validations,
      alert: { show: false, message: '', type: '' },
    };
  },
  methods: {
    async createTeam() {
      if (this.valid) {
        if (this.saving) return;
        this.saving = true;
        const [err, team] = await fetch({
          url: '/api/teams',
          data: this.team,
          method: 'post',
        });
        this.saving = false;
        if (!err) {
          this.alert.type = team.status ? 'success' : 'error';
          this.alert.show = true;
          this.alert.message = team.message || getErrors(team.errors);
          this.team.name = team.status ? '' : this.team.name;
          this.team.user.name = team.status ? '' : this.team.user.name;
          this.team.user.email = team.status ? '' : this.team.user.email;
          this.team.user.password = team.status ? '' : this.team.user.password;
          this.$refs.form.resetValidation();
        }
      }
    },
  },
};
</script>
