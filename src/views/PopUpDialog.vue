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
      handler(val) {
        this.$axios.get(`list/${val}`).then(({ data }) => {
          this.information = data;
        });
      },
      deep: true,
    },
  },
  methods: {
    //   send req to get ifo from server
    download() {
      alert("با زدن این دکمه باید فایل به صورت مستفیم دانلود شود");
      return;
    },
  },
};
</script>
<style >
#text {
  margin: 10px;
}
</style>