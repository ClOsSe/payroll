<template>
  <v-card class="tabels" row>
    <v-card-text id="text">
      <v-row>
        <v-text-field
          class="col-xl-2 col-lg-2 col-md-2 col-5  mr-16 mt-10"
          v-model="newpProjectName"
          outlined
          @keyup.enter="changeName"
          label="نام پروژه"
        ></v-text-field>

        <v-text-field
          class="col-xl-2 col-lg-2 col-md-2 col-5  mr-16 mt-10"
          v-model="newContractNumber"
          outlined
          type="text"
          @keyup.enter="changeName"
          label="شماره قرارداد"
        ></v-text-field>

        <input
          type="text"
          class="form-control form-control-lg  dateinpits col-xl-2 col-lg-2 col-md-2 col-5 mr-16 mt-10"
          v-model="newStartDate"
          id="my-custom-input4"
          placeholder="تاریخ شروع"
        />

        <date-picker
          v-model="newStartDate"
          format="jYYYY/jMM/jDD"
          element="my-custom-input4"
          :max="newEndDate"
        />

        <input
          type="text"
          class="form-control form-control-lg mr-3 dateinpits col-xl-2 col-lg-2 col-md-2 col-5 mr-16 mt-10"
          v-model="newEndDate"
          id="my-custom-input3"
          placeholder="تاریخ پایان"
        />

        <date-picker
          v-model="newEndDate"
          format="jYYYY/jMM/jDD"
          element="my-custom-input3"
          :min="newStartDate"
        />
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn color="error" @click="changeName()">ثبت تغییر نام</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
  props: ["selected"],
  components: {
    datePicker: VuePersianDatetimePicker,
  },
  data: () => ({
    newpProjectName: "",
    newContractNumber: "",
    newStartDate: "",
    newEndDate: "",
  }),

  methods: {
    //
    changeName() {
      this.$axios
        .put("admin/editProjectName", {
          project_ID: this.selected,
          newName: this.newpProjectName,
          newStartDate: this.newStartDate,
          newEndDate: this.newEndDate,
          newContractNumber: this.newContractNumber,
        })
        .then(({ data }) => {
          alert(data.message);
          this.newpProjectName = "";
          this.newStartDate = "";
          this.newEndDate = "";
          this.$emit("closed");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style></style>
