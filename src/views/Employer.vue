<template>
  <v-container>
    <!-- ************************ tabs  ******************************* -->
    <v-layout row>
      <div class="col-12 col-md-4">
        <v-btn class="nav-btn ma-1" outlined large @click="rgNewProject()" color="#399">
          <v-icon>mdi-plus</v-icon>پروژه جدید
        </v-btn>
      </div>
      <div class="col-12 col-md-4">
        <v-btn class="nav-btn ma-1" outlined large @click="shProjectList()" color="#399">
          <v-icon large>mdi-playlist-star</v-icon>لیست پروژه‌ها
        </v-btn>
      </div>
      <div class="col-12 col-md-4">
        <v-btn class="nav-btn ma-1" outlined large @click="shPayrollList()" color="#399">
          <v-icon>mdi-cash-usd-outline</v-icon>فیش‌های حقوقی
        </v-btn>
      </div>

      <router-view />
    </v-layout>
    <!-- ***********************   Body    *************************** -->
    <v-layout>
      <!--  show project list -->
      <v-row v-show="showProjectLists" md="12">
        <v-flex>
          <v-data-table
            class="projecList"
            :hide-default-footer="true"
            :headers="projectsHeaders"
            :items="projectItems"
            @click:row="viewProject"
            :selected="projectNameSelected"
          ></v-data-table>
        </v-flex>
      </v-row>
      <!-- ******************************* -->
      <v-row v-show="showList">
        <v-flex>
          <v-data-table
            :hide-default-footer="true"
            :headers="headers"
            :items="items"
            @click:row="viewPayrollItem"
            :selected="selected"
          ></v-data-table>
        </v-flex>
      </v-row>
      <!-- ************************* -->
      <v-row v-show="registerProject">
        <v-text-field v-model="projectName" label="نام پروژه را وارد کنید"></v-text-field>
        <v-btn @click="sendProjectName" color="primary">ثبت</v-btn>
      </v-row>
    </v-layout>
    <!-- ***********************   POPUP   *************************** -->

    <v-dialog v-model="showPayrollItem">
      <v-card-title class="headline grey lighten-2 pos">
        نام پروژه {{ this.payrollname2 }}
        <v-btn small absolute left dark color="error" id="cancel" @click="cancel()">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <PopUpDialog :selected="selected2" endpoint="admin"></PopUpDialog>
    </v-dialog>

    <!-- ***********************   POPUP   *************************** -->
    <!-- upload payroll file based on project name -->
    <v-dialog v-model="uploadFile">
      <v-card-title class="headline grey lighten-2 pos">
        <h5>آپلود فیش حقوق برای پروژه:</h5>
        <h4>{{ this.projectname2 }}</h4>
        <v-btn small absolute left dark color="error" id="cancel" @click="cancelUpload()">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <UploadPayroll :selected="projectName"></UploadPayroll>
    </v-dialog>
    <!-- ********************** -->
  </v-container>
</template>
<script>
import PopUpDialog from "./PopUpDialog.vue";
import UploadPayroll from "./UploadPayroll.vue";

export default {
  components: {
    PopUpDialog,
    UploadPayroll,
  },
  data: () => ({
    projectname2: "", // save project name to send to show on pop up title
    payrollname2: "", // save payroll name to send to show on pop up title
    projectNameSelected: "",
    showPayrollItem: false,
    selected: "",
    selected2: "",
    projectName: "",
    uploadFile: false,
    registerProject: false,
    showList: false,
    showProjectLists: true,
    active_tab: 1,

    headers: [
      { text: "نام و نام خانوادگی", sortable: false, value: "username" },
      { text: "کد پرسنلی", sortable: false, value: "id" },
      { text: "نام پروژه", sortable: false, value: "project_name" },
      { text: " تاریخ فیش", sortable: false, value: "date_monthly" },
    ],
    items: [],
    projectsHeaders: [
      { text: "نام پروژه", sortable: false, value: "project_name" },
      { text: "تاریخ پروژه", sortable: false, value: "project_date" },
    ],
    projectItems: [],
  }),
  // ************************ mounted ***********************************
  mounted() {
    this.$axios
      .get("/admin/projects")
      .then(({ data }) => {
        this.projectItems = data;
      })
      .catch((e) => {
        console.log(e);
      });
    this.$axios
      .get("/admin/list")
      .then(({ data }) => {
        this.items = data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  //************************* methods **********************************
  methods: {
    rgNewProject() {
      this.registerProject = true;
      this.showList = false;
      this.showProjectLists = false;
    },
    shProjectList() {
      this.showProjectLists = true;
      this.showList = false;
      this.registerProject = false;
    },
    shPayrollList() {
      this.showList = true;
      this.registerProject = false;
      this.showProjectLists = false;
    },
    viewProject(viewProject) {
      this.uploadFile = true;
      this.projectname2 = viewProject.project_name;
      this.projectNameSelected = viewProject.id;
    },
    viewPayrollItem(viewItem) {
      //  dialog will show popupdialog component
      this.showPayrollItem = true;
      this.payrollname2 = viewItem.project_name;
      this.selected2 = viewItem.id;
    },
    cancel() {
      this.showPayrollItem = false;
    },
    cancelUpload() {
      this.uploadFile = false;
      this.projectname2 = "";
    },
    // regiter a new project name
    sendProjectName() {
      if (!this.projectName) {
        alert("لطفا نام پروژه  را وارد کنید ");
        return;
      }
      this.$axios
        .post("admin/project", { project_name: this.projectName })
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
.body {
  width: 100%;
}
.v-text-field {
  margin-top: 10%;
  margin-right: 15px;
  width: 100%;
}
.v-btn {
  letter-spacing: 0;
}
.nav-btn {
  width: 96.2%;
}
#cancel {
  margin-left: 15px;
}
.projecList {
  width: 100%;
}
</style>
