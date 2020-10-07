<template>
  <v-card class="tabels" tile>
    <v-card-text id="text">
      <v-card-title>
        <h4 class="colorTitle">تغییر رمز ورود به سامانه</h4>
        <v-btn color="error" class="close" absolute left @click="cancel">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-card-title>
      <v-text-field
        v-model="passwords.oldPassword"
        class="ma-0"
        label="رمز عبور فعلی خود را وارد کنید"
        prepend-icon="mdi-lock"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="passwords.newPassword"
        class="ma-0"
        @keyup.enter="changePass()"
        label="رمز عبور جدید خود را وارد کنید"
        prepend-icon="mdi-lock"
        type="password"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="error" @click="changePass()">تغییر رمز عبور</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    newPass: "",
    passwords: {
      oldPassword: "",
      newPassword: "",
    },
  }),
  computed: {
    endpoint() {
      var subEndpoint = "";
      if (localStorage.getItem("role") == "admin") {
        subEndpoint = "admin";
      } else subEndpoint = "users";
      return subEndpoint + "/changePass";
    },
  },
  methods: {
    cancel() {
      this.$emit("closed");
    },
    //
    changePass() {
      this.$axios
        .put(this.endpoint, this.passwords)
        .then(({ data }) => {
          alert(data.message);
          this.$emit("closed");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style>
.colorTitle {
  color: black;
}
</style>
