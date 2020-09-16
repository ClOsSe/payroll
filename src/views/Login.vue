<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>صفحه ورود</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model.trim="username"
                    label="نام کاربری"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model.trim="password"
                    id="password"
                    label="رمز‌عبور"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    @keyup.enter="submit()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit()" color="primary">ورود</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: ["logout"],
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submit() {
      if (!this.username || !this.password) {
        alert("لطفا ابتدا نام کاربری و رمز عبور خود را وارد کنید");
        return;
      }
      this.$axios
        .post("/login", {
          username: this.username,
          password: this.password,
        })
        .then((data) => {
          if (data.data.token) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("role", data.data.role);
            if (data.data.role === "user") {
              this.$router.push("/employee");
            } else if (data.data.role === "admin") {
              this.$router.push("/employer");
            } else {
              alert(data); //username or password is not correct!
            }
          }
        })
        .catch((e) => {
          alert("نام کاربری یا رمز عبور صحیح نمی‌باشد!");
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
