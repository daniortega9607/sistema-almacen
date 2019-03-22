<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                dark
                color="primary"
              >
                <v-toolbar-title>{{ app }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="user.email"
                    prepend-icon="person"
                    :rules="[validations.required, validations.email]"
                    label="Correo Electrónico"
                  />
                  <v-text-field
                    v-model="user.password"
                    :rules="[validations.required]"
                    browser-autocomplete="new-password"
                    prepend-icon="lock"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Contraseña"
                    @click:append="showPassword = !showPassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :loading="logging"
                  :disabled="logging || !valid"
                  color="success"
                  @click="login"
                >
                  Login
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
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ConfigGlobal from '../config/config.global';
import { getErrors } from '../utils';

const validations = {
  required: v => !!v || 'Debe completar este campo',
  email: v => /.+@.+/.test(v) || 'Debe ingresar un e-mail válido',
  min: v => v.length >= 6 || 'Minimo 6 caracteres',
};

export default {
  data: () => ({
    logging: false,
    valid: false,
    user: { email: '', password: '' },
    alert: { show: false, message: '', type: '' },
    showPassword: false,
    app: ConfigGlobal.app,
    validations,
  }),
  created() {
    document.title = this.app;
    if (this.$store.state.auth.authenticated && this.$store.state.auth.user) {
      this.$router.push('/');
    }
  },
  methods: {
    async login() {
      if (this.valid) {
        if (this.logging) return;
        this.logging = true;
        const [err, res] = await this.$store.dispatch('auth/login', this.user);
        this.logging = false;
        if (!err) {
          this.alert.type = res.status ? 'success' : 'error';
          this.alert.show = true;
          this.alert.message = res.message || getErrors(res.errors);
          if (this.$store.state.auth.authenticated) {
            this.$router.push(this.$route.query.redirect || '/');
          }
        }
      }
    },
  },
};
</script>
