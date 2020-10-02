<template>
  <v-card class="tabels" tile>
    <v-card-text id="text">
      <v-text-field
        v-model="newName"
        class="ma-0"
        @keyup.enter="changeName()"
        label="لطفا نام جدید را وارد کنید"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="error" @click="changeName()">ثبت تغییر نام</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["selected"],

  data: () => ({
    newName: "",
  }),

  methods: {
    //
    changeName() {
      this.$axios
        .put("admin/editProjectName", {
          project_ID: this.selected,
          newName: this.newName,
        })
        .then(({ data }) => {
          alert(data.message);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style>
</style>
