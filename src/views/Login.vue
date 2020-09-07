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
                    v-model="username"
                    label="نام کاربری"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="رمز‌عبور"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
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
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submit() {
      // naghsh user ( admin - user) moshakhas mishe
      //  man roye rol ya naghsh shart mizaram baraye ersal be samt baghi safahat
      this.$axios
        .post("/login", {
          username: this.username,
          password: this.password,
        })
        // data.data.token token az server miyad
        // data.data.role naghsh user az samt server bayad biyad
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
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
