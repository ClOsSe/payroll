<template>
  <v-card id="screenShot" class="tabels" tile>
    <v-card-text id="text">
      <table class="widthTable">
        <tbody class="font-size2">
          <td class="leftborder">
            <strong class="sumColor">کد :</strong>
            <strong class="mr-10"
              >{{ this.information[0].national_id }}
            </strong>
          </td>
          <td class="leftborder">
            <strong class="sumColor">نام و نام انوادگی :</strong>
            <strong class="mr-10">{{ this.information[0].username }} </strong>
          </td>
          <td class="leftborder">
            <strong class="sumColor">مرکز هزینه:</strong>
            <strong class="mr-10">{{ this.centerCost }} </strong>
          </td>
          <td>
            <strong class="sumColor">محل خدمت:</strong>
            <strong class="mr-10">{{ this.serviceLocation }} </strong>
          </td>
        </tbody>
      </table>

      <table class="widthTable font-size">
        <thead>
          <td class="leftborder center">
            <strong class="sumColor">کارکرد</strong>
          </td>
          <td class="leftborder center">
            <strong class="sumColor">مزایا</strong>
          </td>
          <td class="leftborder center">
            <strong class="sumColor">کسور</strong>
          </td>
          <td class="asOne center">
            <strong class="right"> نام </strong>
            <strong class="font-size"> اقساط </strong>
            <strong class="left"> مانده </strong>
          </td>
        </thead>
      </table>
      <template>
        <!-- *********************** kar kerd rozane ******************** -->
        <table class="widthTable">
          <td class="color txtright div1">
            <tr v-for="item2 in this.headers4" :key="item2">
              {{
                item2.text
              }}
            </tr>
          </td>

          <td class="color2 textleft div1">
            <tr v-for="item2 in this.monthly[0]" :key="item2">
              {{
                item2
              }}
            </tr>
          </td>

          <!-- ***********************  ******************** -->
          <!-- *********************** mazaya  ******************** -->

          <td class="color rightborder div2">
            <tr v-for="item2 in this.headers2" :key="item2">
              {{
                item2.text
              }}
            </tr>
          </td>

          <td class="color2 div2">
            <tr v-for="item in this.salary[0]" :key="item">
              {{
                mask(item)
              }}
            </tr>
          </td>

          <!-- ***********************  ******************** -->
          <!-- *********************** kosor ******************** -->

          <td class="color rightborder txtright div3">
            <tr v-for="item2 in this.headers3" :key="item2">
              {{
                item2.text
              }}
            </tr>
          </td>

          <td class="color2 txtleft div3">
            <tr v-for="item in this.Deductions[0]" :key="item">
              {{
                mask(item)
              }}
            </tr>
          </td>

          <!-- ****************** bills ********************* -->
          <!-- 
          <td class="color txtright rightborder div4">
            <tr v-for="item2 in this.headers3" :key="item2">
              {{
                item2.text
              }}
            </tr>
          </td>

          <td class="color2">
            <tr v-for="item3 in this.Deductions[0]" :key="item3">
              {{
                mask(item3)
              }}
            </tr>
          </td> -->

          <!-- ********************************************* -->
        </table>
        <!-- ***********************  ******************** -->
      </template>

      <table class="widthTable">
        <tbody>
          <td></td>

          <td id="width0">
            <p class="sumColor">
              <strong> جمع حقوق مزایا : </strong>
              {{ mask(this.pureAdditions) }} +
            </p>
          </td>
          <td class="width1">
            <p class="sumColor">
              <strong> جمع کسورات : </strong>
              {{ mask(this.pureDeductions) }} -
            </p>
          </td>

          <td id="width2">
            <p class="sumColor">
              <strong> خالص: </strong>
              {{ mask(this.pure) }}
            </p>
          </td>
        </tbody>
      </table>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="download">دانلود به صورت PDF</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

export default {
  props: ["selected", "endpoint"],
  mounted() {
    this.fetchData();
  },
  data: () => ({
    data: "",
    link: "",
    allData: [], // full data is in here
    dllink: false,
    getId: "",
    pureDeductions: 0,
    pureAdditions: 0,
    pure: 0,
    centerCost: "",
    serviceLocation: "",

    headers: [
      { text: "نام و نام خانوادگی", sortable: false, value: "username" },
      { text: "کد پرسنلی", sortable: false, value: "national_id" },
    ],
    information: [],
    headers4: [],
    monthly: [],
    headers2: [],
    salary: [],
    headers3: [],
    Deductions: [],
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
      this.pureDeductions = null;
      this.pureAdditions = null;
      this.pure = null;

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
      var counter = 0;
      for (const property in this.Deductions[0]) {
        if (this.Deductions[0][property] == 0) {
          this.headers3 = this.headers3.filter((e, index) => index != counter);
          delete this.Deductions[0][property];
        }
        counter++;
      }

      var counte2 = 0;
      for (const property in this.salary[0]) {
        if (this.salary[0][property] == 0) {
          this.headers2 = this.headers2.filter((e, index) => index != counte2);
          delete this.salary[0][property];
        }
        counte2++;
      }

      var counte3 = 0;
      for (const property in this.salary[0]) {
        if (this.salary[0][property] == 0) {
          this.headers2 = this.headers2.filter((e, index) => index != counte3);
          delete this.salary[0][property];
        }
        counte3++;
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
          this.allData = JSON.parse(data[0].full_data);
          this.centerCost = JSON.parse(data[0].full_data)["مركز هزينه"];
          this.serviceLocation = JSON.parse(data[0].full_data)["محل خدمت"];
          this.information = data;
          this.headers2 = [
            {
              text: "حقوق پایه",
              sortable: false,
              value: "basicSalary",
              name: "basicSalary",
            },
            {
              text: "حق اولاد",
              sortable: false,
              value: "chPlus",
              name: "chPlus",
            },
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
          ];
          this.headers4 = [
            { text: "کارکرد روزانه", sortable: false, value: "ruontine" },
            { text: "کارکرد اضافه‌کاری", sortable: false, value: "overtime" },
            { text: "مانده مرخصی", sortable: false, value: "vacation" },
          ];
          this.salary = [
            {
              basicSalary: JSON.parse(data[0].full_data)["حقوق پايه"],
              chPlus: JSON.parse(data[0].full_data)["حق اولاد"],
              Rhousing: JSON.parse(data[0].full_data)["حق مسكن"],
              grocery: JSON.parse(data[0].full_data)["حق خواروبار"],
              overTime: JSON.parse(data[0].full_data)["اضافه كاري"],
            },
          ];
          this.headers3 = [
            { text: "مالیات", sortable: false, value: "tax" },
            { text: "مساعده", sortable: false, value: "assist" },
            {
              text: "بیمه تامین اجتماعی سهم کارمند",
              sortable: false,
              value: "employee_insurance",
            },
          ];
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
        .get(`/pdf/${this.getId}`)
        .then(({ data }) => {
          window.location.assign(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style>
.body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#text {
  margin: 10px;
  padding-top: 10px;
}
.maxWidth {
  max-width: 95%;
}

.div1 {
  width: 240px;
}
.div2 {
  width: 170px;
}
.div3 {
  width: 225px;
}
.div4 {
  width: 430px;
}
.widthTable {
  border: 1px solid black;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}
.tabels {
  min-width: 550px;
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
.center {
  margin-top: 0px;
  text-align: center;
}
.left {
  margin-top: 0px;
  float: left;
  text-align: left;
}
.right {
  margin-top: 0px;
  float: right;
}
.txtright {
  text-align: right;
}
.color2 {
  color: black;
}
.font-size {
  font-size: 17px;
}
.font-size2 {
  font-size: 15px;
}

.leftborder {
  border-left: 1px black solid;
}
.rightborder {
  border-right: 1px black solid;
}

.asOne {
  max-width: 40px;
  color: black;
}

.color {
  color: black;
  font-weight: bold;
}
.strong {
  color: black;
}
</style>
