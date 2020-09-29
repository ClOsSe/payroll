<template>
  <div class="bg-gray">
    <v-layout class="header" row>
      <v-flex class="nav_username" col="12">خوش آمدید</v-flex>
      <v-btn slall dark color="error" id="cancel" outlined @click="logOut()">
        <v-icon dark>mdi-login</v-icon>
      </v-btn>
      <v-btn
        right
        absolute
        color="red"
        outlined
        class="ChangePass mt-4"
        @click="changeuserPassword"
      >
        <h4>تغیر رمز عبور</h4>
      </v-btn>

      <v-dialog v-model="changePass">
        <ChangePassword />
      </v-dialog>
    </v-layout>
    <router-view />
  </div>
</template>
<script>
import ChangePassword from "../views/ChangePassword.vue";

export default {
  components: {
    ChangePassword,
  },
  data: () => ({
    changePass: false,
  }),

  computed: {
    showbtn: function () {
      if (localStorage.getItem("role") === ("admin" || "user")) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.$router.push("/");
    },
    changeuserPassword() {
      this.changePass = true;
    },
  },
};
</script>
<style>
.header {
  background-color: #37474f;
  height: 70px;
}
.nav_username {
  margin-top: 11px;
  margin-right: 10px;
  color: aliceblue;
}

#cancel {
  margin: 20px;
}
.ChangePass {
  float: right;
  margin-right: 80px;
  background-color: #333;
}
</style>
