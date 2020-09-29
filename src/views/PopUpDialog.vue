<template>
  <v-card class="tabels" tile>
    <v-card-text id="text">
      <!-- <v-data-table :hide-default-footer="true" :headers="headers" :items="information"></v-data-table> -->
      <table id="table" class="firsttable">
        <thead id="tablehead">
          <td class="tdthead">
            <b>مشخصات فردی</b>
          </td>
        </thead>
        <v-data-table :hide-default-footer="true" :headers="headers" :items="information"></v-data-table>
      </table>
      <table id="table">
        <thead id="tablehead">
          <td class="tdthead">
            <b>حقوق و مزایا</b>
          </td>
        </thead>
        <v-data-table :hide-default-footer="true" :headers="headers2" :items="salary">
          <template v-slot:body="{ items }">
            <tbody>
              <tr>
                <td v-for="item in items[0]" :key="item">{{ mask(item) }}</td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </table>
      <table id="table">
        <thead id="tablehead">
          <td class="tdthead">
            <b>کسورات</b>
          </td>
        </thead>
        <v-data-table :hide-default-footer="true" :headers="headers3" :items="Deductions">
          <template v-slot:body="{ items }">
            <tbody>
              <tr>
                <td v-for="item in items[0]" :key="item">{{ mask(item) }}</td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </table>
      <!-- ================================================================================ -->
      <!-- <v-textarea v-for="item in fulldata_items" :key="item"
        >{{ item }}
      </v-textarea>-->
      <v-row>
        <div v-for="(value, key) in allData" :key="key" class="col-md-4">
          <v-text-field :value="value" :label="key" readonly></v-text-field>
        </div>
      </v-row>

      <!-- ================================================================================ -->
    </v-card-text>

    <v-divider></v-divider>

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
    allData: [],
    dllink: false,
    getId: "",

    headers: [
      { text: "نام و نام خانوادگی", sortable: false, value: "username" },
      { text: "کد پرسنلی", sortable: false, value: "national_id" },
    ],

    information: [],
    headers2: [
      {
        text: "حقوق پایه",
        sortable: false,
        value: "basicSalary",
        name: "basicSalary",
      },
      {
        text: "اضافه کار",
        sortable: false,
        value: "overTime",
        name: "overTime",
      },
      { text: "حق اولاد", sortable: false, value: "chPlus", name: "chPlus" },
      {
        text: "حق خواروبار",
        sortable: false,
        value: "grocery",
        name: "grocery",
      },
    ],

    salary: [],
    headers3: [
      { text: "مالیات", sortable: false, value: "tax" },
      { text: "بیمه", sortable: false, value: "employee_insurance" },
      { text: "مساعده", sortable: false, value: "assist" },
    ],

    Deductions: [],

    fulldata: [
      { text: "مالیات", sortable: false, value: "tax" },
      { text: "بیمه", sortable: false, value: "Insurance" },
      { text: "مساعده", sortable: false, value: "assist" },
      { text: "جریمه", sortable: false, value: "penalty" },
      { text: "وام", sortable: false, value: "loan" },
      { text: "مجموع کسورات", sortable: false, value: "all" },
    ],

    fulldata_items: [],
  }),
  watch: {
    selected: {
      handler() {
        this.fetchData();
      },
    },
  },
  methods: {
    mask(e) {
      let mask = new Intl.NumberFormat("fa");

      return mask.format(e);
    },
    fetchData() {
      this.$axios
        .get(`${this.endpoint}/viewItem/${this.selected}`)
        .then(({ data }) => {
          // fulldata_items and Deductions and salary bayad az data por shavad
          this.allData = JSON.parse(data[0].full_data);
          this.information = data;
          this.salary = [
            {
              basicSalary: JSON.parse(data[0].full_data)["حقوق پايه"],
              overTime: JSON.parse(data[0].full_data)["اضافه كاري"],
              grocery: JSON.parse(data[0].full_data)["حق خواروبار"],
              chPlus: JSON.parse(data[0].full_data)["حق اولاد"],
            },
          ];
          this.Deductions = [
            {
              tax: JSON.parse(data[0].full_data)["ماليات"],
              employee_insurance: JSON.parse(data[0].full_data)[
                "بيمه تامين اجتماعي سهم كارمند"
              ],
              assist: JSON.parse(data[0].full_data)["مساعده"],
            },
          ];
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
        .get(`/users/pdf/${this.getId}`)
        .then((data) => {
          window.open(data, "_blank");
        })
        .catch((e) => {
          console.log(e);
        });
      this.dllink = true;
    },
  },
};
</script>
<style>
#text {
  margin: 10px;
}
#table {
  border: 1px solid black;
  width: 100%;
  margin-top: 1px;
}
.tabels {
  min-width: 550px;
  max-width: 100%;
}
.tablehead {
  width: 100%;
}
.tdthead {
  background-color: lightgray;
  text-align: center;
  color: black;
}
.tdtbody {
  color: black;
}
.other {
  text-align: center;
}
</style>
