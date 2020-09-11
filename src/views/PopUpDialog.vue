<template>
  <div>
    <v-flex>
      <v-row>
        <v-col md="12">
          <v-card>
            <v-divider></v-divider>

            <v-card-text id="text">
              <v-data-table :hide-default-footer="true" :headers="headers" :items="information"></v-data-table>
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
        </v-col>
      </v-row>
    </v-flex>
  </div>
</template>
<script>
export default {
  props: ["selected", "selected2"],

  data: () => ({
    data: "",
    link: "",
    dllink: false,
    getId: "",

    headers: [
      { text: "کدپرسنلی", sortable: false, value: "national_id" },
      { text: "حقوق و مزایا", sortable: false, value: "additions" },
      { text: "کسورات", sortable: false, value: "deductions" },
      { text: "تاریخ", sortable: false, value: "date_monthly" },
    ],
    information: [
      {
        national_id: "123456789",
        additions: "1500000+",
        deductions: "5000000-",
        date_monthly: "1399/07/01",
      },
    ],
  }),
  watch: {
    selected: {
      handler() {
        this.$axios.get(`user/${this.selected}`).then(({ data }) => {
          this.information = data;
        });
      },
      deep: true,
    },
    selected2: {
      handler() {
        this.$axios.get(`admin/${this.selected2}`).then(({ data }) => {
          this.information = data;
        });
      },
      deep: true,
    },
  },
  methods: {
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