<template>
  <div>
    <v-flex>
      <v-row>
        <v-col md="12">
          <v-card>
            <v-divider></v-divider>

            <v-card-title class="headline grey lighten-2">نام پروژه</v-card-title>

            <v-card-text>محتوای پروژه</v-card-text>
            <h1>{{selected}}</h1>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="download">دانلود یه صورت PDF</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </div>
</template>
<script>
export default {
  props: ["selected"],

  data: () => ({
    data: "",
  }),
  watch: {
    selected: {
      handler(val) {
        this.$axios.get(`list/${val}`).then(({ data }) => {
          console.log(data);
        });
        console.log("test");
      },
      deep: true,
    },
  },
  methods: {
    getAnswer() {
      if (this.handler.indexOf("1")) {
        console.log("this.data");
      } else {
        console.log("test");
      }
    },
    //   send req to get ifo from server
    download() {
      alert("با زدن این دکمه باید فایل به صورت مستفیم دانلود شود");

      return;
    },
  },
};
</script>
<style >
</style>