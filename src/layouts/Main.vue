<template>
  <div class="bg-gray">
    <v-layout class="header" row>
      <v-flex class="nav_username" col="12">خوش آمدید</v-flex>
    </v-layout>
    <router-view />
  </div>
</template>
<script>
export default {};
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
</style>
