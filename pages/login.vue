<template>
  <v-container class="authen-page" fill-height fluid>
    <v-row align="top" justify="center">
      <v-col
        class="rounded-lg"
        cols="12"
        md="8"
        style="background-color: white"
      >
        <v-row>
          <v-col cols="12">
            <v-img contain height="125" src="/logo.png" alt="App's Logo" />
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="pa-8 mr-1" elevation="0">
              <div class="headline mb-6 text-center">
                {{ $t('Authen.signup') }}
              </div>
              <template>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="login.username"
                    :rules="nameRules"
                    :label="$t('Authen.username')"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="login.password"
                    :rules="passRules"
                    type="password"
                    :label="$t('Authen.password')"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="login.name"
                    :rules="fieldLenght"
                    :label="$t('Authen.name')"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="login.age"
                    type="number"
                    :rules="ageRules"
                    :label="$t('Authen.age')"
                    required
                  ></v-text-field>
                  <div class="text-center mt-3">
                    <v-btn color="error" class="mx-auto" @click="userRegister">
                      {{ $t('Authen.register') }}
                    </v-btn>
                  </div>
                </v-form>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="pa-8 ml-1" elevation="0">
              <div class="headline mb-6 text-center">
                {{ $t('Authen.signin') }}
              </div>
              <template>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="register.username"
                    :rules="nameRules"
                    :label="$t('Authen.username')"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="register.password"
                    :rules="passRules"
                    type="password"
                    :label="$t('Authen.password')"
                    required
                  ></v-text-field>
                  <div class="text-center mt-3">
                    <v-btn color="success" class="mx-auto" @click="userLogin">
                      {{ $t('Authen.login') }}
                    </v-btn>
                  </div>
                </v-form>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'login',
  data() {
    return {
      login: {
        username: '',
        password: '',
        name: '',
        age: '',
      },
      register: {
        username: '',
        password: '',
      },
      nameRules: [
        (v) => !!v || this.$t('validation.usernameRequired'),
        (v) => (v && v.length >= 3) || this.$t('validation.usernameLenght'),
      ],
      passRules: [
        (v) => !!v || this.$t('validation.passRequired'),
        (v) => (v && v.length >= 3) || this.$t('validation.passLenght'),
      ],
      fieldLenght: [
        (v) => !!v || this.$t('validation.require'),
        (v) => (v && v.length >= 3) || this.$t('validation.limitLength'),
      ],
      ageRules: [
        (v) => !!v || this.$t('validation.require'),
        (v) => (v && v >= 3) || this.$t('validation.ageLimits'),
      ],
    }
  },

  methods: {
    userLogin() {
      if (this.$refs.loginForm.validate()) {
        this.$router.push('/')
      }
    },
    userRegister() {
      if (this.$refs.registerForm.validate()) {
        this.$router.push('/')
      }
    },
  },
}
</script>
