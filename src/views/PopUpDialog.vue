<template>
  <v-card class="col" tile>
    <v-card-text id="text">
      <v-data-table :hide-default-footer="true" :headers="headers+headers" :items="information"></v-data-table>
    </v-card-text>

    <v-divider></v-divider>
    <h2 v-show="dllink">
      لینک دانلود (کلیک کنید) :
      <a :href="this.link">برای دانلود کلیک کنید</a>
    </h2>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="download">دانلود یه صورت PDF</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["selected", "endpoint"],
  mounted() {
    this.fetchData();
  },
  data: () => ({
    data: "",
    link: "",
    dllink: false,
    getId: "",

    headers: [
      { text: "کدپرسنلی", sortable: false, value: "_employee" },
      { text: "حقوق و مزایا", sortable: false, value: "basic_salary_gh" },
      { text: "کسورات", sortable: false, value: "tax" },
      { text: "تاریخ", sortable: false, value: "date_monthly" },
    ],
    information: [],
  }),
  watch: {
    selected: {
      handler() {
        this.fetchData();
      },
    },
  },
  methods: {
    fetchData() {
      this.$axios.get(`${this.endpoint}/${this.selected}`).then(({ data }) => {
        this.information = data;
      });
    },
    //   send req to get ifo from server
    download() {
      if (this.selected) {
        this.getId = this.selected;
      } else if (this.selected2) {
        this.getId = this.selected2;
      }

      this.$axios
        .get(`/user/pdf/${this.getId}`)
        .then((data) => {
          this.link = data;
        })
        .catch((e) => {
          console.log(e);
        });
      this.dllink = true;
    },
  },
};
</script>
<style >
#text {
  margin: 10px;
}
</style>