<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-row>
          <v-text-field
            class="col-xl-3 col-lg-7 col-md-5 col-4 mr-3"
            v-model="projectName"
            outlined
            @keyup.enter="sendProjectName"
            label="نام پروژه"
          ></v-text-field>
          <input
            type="text"
            class="form-control form-control-lg  dateinpits col-xl-3 col-lg-4 col-md-3 col-4 mr-16"
            v-model="sProject"
            id="my-custom-input"
            placeholder="تاریخ شروع"
          />

          <date-picker
            v-model="sProject"
            format="jYYYY/jMM/jDD"
            element="my-custom-input"
            :max="eProject"
          />
          <v-text-field
            class="col-xl-3 col-lg-7 col-md-5 col-4 mr-3"
            v-model="contractNumber"
            outlined
            type="text"
            @keyup.enter="sendProjectName"
            label="شماره قرارداد"
          ></v-text-field>

          <input
            type="text"
            class="form-control form-control-lg mr-3 dateinpits col-xl-3 col-lg-4 col-md-3 col-4 mr-16"
            v-model="eProject"
            id="my-custom-input2"
            placeholder="تاریخ پایان"
          />

          <date-picker
            v-model="eProject"
            format="jYYYY/jMM/jDD"
            element="my-custom-input2"
            :min="sProject"
          />
        </v-row>
        <v-row>
          <v-btn class="btn mr-1" @click="sendProjectName" color="primary"
            >ثبت</v-btn
          >
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
export default {
  data() {
    return {
      sProject: "",
      eProject: "",
      projectName: "",
      contractNumber: "",
    };
  },
  components: {
    datePicker: VuePersianDatetimePicker,
  },
  methods: {
    // regiter a new project name
    sendProjectName() {
      if (
        !(
          this.projectName &&
          this.sProject &&
          this.eProject &&
          this.contractNumber
        )
      ) {
        alert("لطفا تمامی فیلد‌ها را وارد کنید ");
        return;
      }
      this.$axios
        .post("admin/project", {
          project_name: this.projectName,
          contract_number: this.contractNumber,
          start_date: this.sProject,
          end_date: this.eProject,
        })
        .then(({ data }) => {
          alert(data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.projectName = "";
    },
  },
};
</script>

<style>
.dateinpits {
  border: gray 1px solid;
  max-height: 54.5px;
  margin-top: 1px;
  border-radius: 3px;
  text-align: center;
}
.btn {
  margin: 20px;
}
</style>
