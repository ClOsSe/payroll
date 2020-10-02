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
        <v-data-table
          :hide-default-footer="true"
          :headers="headers"
          :items="information"
        ></v-data-table>
      </table>

      <table id="table">
        <thead id="tablehead">
          <td class="tdthead">
            <b>کارکرد</b>
          </td>
        </thead>
        <v-data-table
          :hide-default-footer="true"
          :headers="headers4"
          :items="monthly"
        >
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
            <b>حقوق و مزایا</b>
          </td>
        </thead>
        <!-- <v-data-table 
          :hide-default-footer="true"
          :headers="headers2"
          :items="salary"
        > -->
        <v-data-table
          :hide-default-footer="true"
          :headers="headers2"
          :items="salary"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr>
                <td v-for="item in items[0]" :key="item">
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
        >
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
        <tbody>
          <td>
            <p class="sumColor">
              جمع کسورات : {{ mask(this.pureDeductions) }} -
            </p>
          </td>
          <td>
            <p class="sumColor">
              جمع حقوق مزایا : {{ mask(this.pureAdditions) }} +
            </p>
          </td>
          <td>
            <p class="sumColor">خالص: {{ mask(this.pure) }}</p>
          </td>
        </tbody>
      </table>
      <!-- ================================================================================ -->
      <!-- <v-textarea v-for="item in fulldata_items" :key="item"
        >{{ item }}
      </v-textarea>-->

      <!-- <v-row>
        <div v-for="(value, key) in allData" :key="key" class="col-md-4">
          <v-text-field :value="value" :label="key" readonly></v-text-field>
        </div>
      </v-row> -->

      <!-- ================================================================================ -->
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="download">دانلود به صورت PDF</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
// import { delete } from "vue/types/umd";
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
    pureDeductions: 0,
    pureAdditions: 0,
    pure: 0,
    iszero: "",
    filter: "",
    iszero2: "",
    filter2: "",

    headers: [
      { text: "نام و نام خانوادگی", sortable: false, value: "username" },
      { text: "کد پرسنلی", sortable: false, value: "national_id" },
    ],

    information: [],

    headers4: [
      { text: "کارکرد روزانه", sortable: false, value: "ruontine" },
      { text: "کارکرد اضافه‌کاری", sortable: false, value: "overtime" },
      { text: "مانده مرخصی", sortable: false, value: "vacation" },
    ],

    monthly: [],

    headers2: [
      {
        text: "حقوق پایه",
        sortable: false,
        value: "basicSalary",
        name: "basicSalary",
      },
      { text: "حق اولاد", sortable: false, value: "chPlus", name: "chPlus" },
      {
        text: "حق مسکن",
        sortable: false,
        value: "Rhousing",
        name: "Rhousing",
      },
      {
        text: "حق خواروبار",
        sortable: false,
        value: "grocery",
        name: "grocery",
      },
      {
        text: "اضافه کار",
        sortable: false,
        value: "overTime",
        name: "overTime",
      },
      // {
      //   text: "سایر مزایا",
      //   sortable: false,
      //   value: "otherOption",
      //   name: "otherOption",
      // },
      // {
      //   text: "روند قبلی حقوق",
      //   sortable: false,
      //   value: "previousSalary",
      //   name: "previousSalary",
      // },
    ],

    salary: [],
    headers3: [
      { text: "مالیات", sortable: false, value: "tax" },
      { text: "مساعده", sortable: false, value: "assist" },
      {
        text: "بیمه تامین اجتماعی سهم کارمند",
        sortable: false,
        value: "employee_insurance",
      },
    ],

    Deductions: [],

    fulldata: [
      { text: "مالیات", sortable: false, value: "tax" },
      { text: "بیمه", sortable: false, value: "Insurance" },
      { text: "مساعده", sortable: false, value: "assist" },
      { text: "جریمه", sortable: false, value: "penalty" },
      { text: "وام", sortable: false, value: "loan" },
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
    calculate() {
      this.pureAdditions += parseInt(this.salary[0].basicSalary);
      this.pureAdditions += parseInt(this.salary[0].chPlus);
      this.pureAdditions += parseInt(this.salary[0].Rhousing);
      this.pureAdditions += parseInt(this.salary[0].grocery);
      this.pureAdditions += parseInt(this.salary[0].overTime);
      this.pureDeductions += parseInt(this.Deductions[0].tax);
      this.pureDeductions += parseInt(this.Deductions[0].assist);
      this.pureDeductions += parseInt(this.Deductions[0].employee_insurance);

      this.pure = this.pureAdditions - this.pureDeductions;
      this.isZero();
    },

    isZero() {
      if (this.salary[0].basicSalary === 0) {
        this.iszero2 = "basicSalary";
      } else if (this.salary[0].chPlus === 0) {
        this.iszero2 = "chPlus";
      } else if (this.salary[0].Rhousing === 0) {
        this.iszero2 = "Rhousing";
      } else if (this.salary[0].grocery === 0) {
        this.iszero2 = "grocery";
      } else if (this.salary[0].overTime === 0) {
        this.iszero2 = "overTime";
      }
      for (var j in this.headers2) {
        if (this.headers2[j].value == this.iszero2) {
          this.filter2 = this.headers2[j].value;
          console.log(this.filter2, " = 0");
        }
      }
      if (this.Deductions[0].tax === 0) {
        this.iszero = "tax";
      } else if (this.Deductions[0].assist === 0) {
        this.iszero = "assist";
      } else if (this.Deductions[0].employee_insurance === 0) {
        this.iszero = "employee_insurance";
      }
      for (var i in this.headers3) {
        if (this.headers3[i].value == this.iszero) {
          this.filter = this.headers3[i].value;
          console.log(this.filter, " = 0");
        }
      }
    },

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
              chPlus: JSON.parse(data[0].full_data)["حق اولاد"],
              Rhousing: JSON.parse(data[0].full_data)["حق مسكن"],
              grocery: JSON.parse(data[0].full_data)["حق خواروبار"],
              overTime: JSON.parse(data[0].full_data)["اضافه كاري"],
              // otherOption: JSON.parse(data[0].full_data)[""],
              // previousSalary: JSON.parse(data[0].full_data)[""],
            },
          ];
          // console.log(this.salary[0].Rhousing);

          this.Deductions = [
            {
              tax: JSON.parse(data[0].full_data)["ماليات"],
              assist: JSON.parse(data[0].full_data)["مساعده"],
              employee_insurance: JSON.parse(data[0].full_data)[
                "بيمه تامين اجتماعي سهم كارمند"
              ],
            },
          ];
          this.calculate();
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
.sumColor {
  color: black;
}
</style>
