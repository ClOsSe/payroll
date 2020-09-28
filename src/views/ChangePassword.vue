<template>
  <v-card class="tabels" tile>
    <v-card-text id="text">
      <v-card-title>
        <h4 class="colorTitle">تغییر رمز ورود به سامانه</h4>
      </v-card-title>
      <v-text-field
        v-model="oldPass"
        class="ma-0"
        label="رمز عبور فعلی خود را وارد کنید"
        prepend-icon="mdi-lock"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="NewPass"
        class="ma-0"
        @keyup.enter="changePass()"
        label="رمز عبور جدید خود را وارد کنید"
        prepend-icon="mdi-lock"
        type="text"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="error" @click="changePass()">تغییر رمز عبور</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["selected"],

  data: () => ({
    newPass: "",
  }),

  methods: {
    //
    changePass() {
      this.$axios
        .put(`${this.selected}/changePass/`, {
          oldPassword: this.oldPass,
          newPassword: this.NewPass,
        })
        .then(({ data }) => {
          alert(data);
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
