<template>
  <div>
    <v-flex>
      <v-row>
        <v-col md="12">
          <v-card>
            <v-card-text>
              <h4 style="color: red">
                لطفا با توجه به نام پروژه, فایل فیش حقوقی را آپلود کنید.
              </h4>
              <v-file-input
                v-model="excelFile"
                ref="excelFile"
                show-size
                :rules="excelFileRules"
                accept=".xls, .xlsx"
                label="حداکثر 5 مگابایت - فقط xls , xlsx"
              ></v-file-input>
              <v-btn @click="sendList" color="primary">ارسال</v-btn>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </div>
</template>
<script>
export default {
  props: ["project_id"],
  data: () => ({
    excelFile: null,
    prjId: "",

    excelFileRules: [
      (value) =>
        !value ||
        value.size <= 5000000 ||
        "حجم فایل باید کمتر از 5 مگابایت باشد!",
    ],
  }),
  methods: {
    // Insert Excel file Into DB
    sendList() {
      // send xls file to DB with post
      let list = new FormData();
      if (!this.excelFile) {
        alert("لطفا ابتدا یک فایل انتخاب کنید!");
        return;
      }
      list.append("payrollFile", this.excelFile);
      list.append("project_id", this.project_id);
      // ersal form data be samt server
      this.$axios
        .post("admin/newList", list)
        .then(({ data }) => {
          alert(data);
        })
        .catch((e) => {
          console.log(e);
        });
      // clear file input
      this.excelFile = null;
    },
  },
};
</script>
<style >
.v-file-input {
  margin-top: 0px;
  margin-right: 15px;
  width: 100%;
}
</style>