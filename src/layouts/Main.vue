<template>
  <div class="bg-gray">
    <v-layout class="header" row>
      <v-flex class="nav_username" col="12">خوش آمدید</v-flex>
      <v-btn slall dark color="error" id="cancel" @click="logOut()">
        <v-icon dark>mdi-logout</v-icon>
      </v-btn>
    </v-layout>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/");
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
</style>
