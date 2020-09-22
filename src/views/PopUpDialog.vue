<template>
  <v-card class="col" tile>
    <v-card-text id="text">
      <!-- <v-data-table :hide-default-footer="true" :headers="headers" :items="information"></v-data-table> -->
      <table id="table">
        <thead id="tablehead">
          <td class="tdthead">
            <b>مشخصات فردی</b>
          </td>
        </thead>
        <v-data-table
          :hide-default-footer="true"
          :headers="headers"
          :items="information"
        ></v-data-table>
      </table>
      <table id="table">
        <thead id="tablehead">
          <td class="tdthead">
            <b>حقوق و مزایا</b>
          </td>
        </thead>
        <v-data-table
          :hide-default-footer="true"
          :headers="headers2"
          :items="salary"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr>
                <td v-for="item in items[0]" :key="item.name">
                  {{ mask(item) }}
                </td>
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
        <v-data-table
          :hide-default-footer="true"
          :headers="headers3"
          :items="Deductions"
        ></v-data-table>
      </table>
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

    // headers: [
    //   { text: "کدپرسنلی", sortable: false, value: "_employee" },
    //   { text: "حقوق و مزایا", sortable: false, value: "basic_salary" },
    //   { text: "مالیات", sortable: false, value: "tax" },
    //   { text: "تاریخ", sortable: false, value: "date_monthly" },
    // ],
    // information: [
    //   {
    //     _employee: "412",
    //     basic_salary: "2000000",
    //     tax: "200000",
    //     date_monthly: "01/07/13997",
    //   },
    // ],
    headers: [
      { text: "نام", sortable: false, value: "name" },
      { text: "نام خانوادگی", sortable: false, value: "lname" },
      { text: "کد ملی", sortable: false, value: "national_id" },
      { text: "کد پرسنلی", sortable: false, value: "personal_id" },
    ],

    information: [
      {
        name: "محمد",
        lname: "گودرزی",
        national_id: "۴۱۲۴۱۲۴۱۲",
        personal_id: "۱۲۳۴۵",
      },
    ],
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
      { text: "مجموع دریافتی", sortable: false, value: "all", name: "all" },
    ],

    salary: [
      {
        basicSalary: "۲۰۰۰۰۰۰",
        overTime: "۵۰۰۰۰۰",
        chPlus: "۲۵۰۰۰۰",
        grocery: "۱۰۰۰۰۰",
        all: "۲۸۵۰۰۰۰",
      },
    ],
    headers3: [
      { text: "مالیات", sortable: false, value: "tax" },
      { text: "بیمه", sortable: false, value: "Insurance" },
      { text: "مساعده", sortable: false, value: "assist" },
      { text: "جریمه", sortable: false, value: "penalty" },
      { text: "وام", sortable: false, value: "loan" },
      { text: "مجموع کسورات", sortable: false, value: "all" },
    ],

    Deductions: [
      {
        tax: "۳۰۰۰۰۰",
        Insurance: "۲۳۵۰۰۰",
        assist: "۰",
        penalty: "۰",
        loan: "۰",
        all: "۵۳۵۰۰۰",
      },
    ],
  }),
  watch: {
    selected: {
      handler() {
        this.fetchData();
      },
    },
  },
  methods: {
    mask(a) {
      return a;
    },
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
<style>
#text {
  margin: 10px;
}
#table {
  border: 1px solid black;
  width: 100%;
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
</style>
