<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>
@font-face {
  font-family: Vazir;
  src: url("../public/fonts/vazirFonts/Vazir.eot");
  src: url("../public/fonts/vazirFonts/Vazir.eot?#iefix")
      format("embedded-opentype"),
    url("../public/fonts/vazirFonts/Vazir.woff2") format("woff2"),
    url("../public/fonts/vazirFonts/Vazir.woff") format("woff"),
    url("../public/fonts/vazirFonts/Vazir.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
* {
  font-family: Vazir;
}
</style>
