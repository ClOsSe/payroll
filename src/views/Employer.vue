<template>
  <v-container>
    <v-layout row>
      <v-tabs grow v-model="active_tab">
        <v-tab v-for="tab of tabs" :key="tab.index">
          <p id="nav-btn" @click="changeTab(tab.index)" style="color:#399">{{ tab.name }}</p>
        </v-tab>
      </v-tabs>
      <router-view />

      <v-layout>
        <!-- this will be shoed with drop down  -->
        <v-row v-show="showProjectLists" md="12">
          <v-flex>
            <v-data-table
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
    </v-layout>
    <!-- ***********************   POPUP   *************************** -->

    <v-dialog v-model="showPayrollItem">
      <v-card-title class="headline grey lighten-2 pos">
        نام پروژه {{this.payrollname2}}
        <v-btn small absolute left dark color="error" id="cancel" @click="cancel()">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <PopUpDialog :selected="selected"></PopUpDialog>
    </v-dialog>

    <!-- ***********************   POPUP   *************************** -->
    <!-- upload payroll file based on project name -->
    <v-dialog v-model="uploadFile">
      <v-card-title class="headline grey lighten-2 pos">
        آپلود فیش حقوق برای پروژه: {{this.projectname2}}
        <v-btn small absolute left dark color="error" id="cancel" @click="cancelUpload()">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <UploadPayroll :projectNameSelected="projectNameSelected"></UploadPayroll>
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
    projectName: "",
    uploadFile: false,
    registerProject: false,
    showList: false,
    showProjectLists: true,
    active_tab: 1,

    tabs: [
      { index: 0, name: "تعریف پروژه جدید" },
      { index: 1, name: "نمایش لیست پروژه‌ها" },
      { index: 2, name: "لیست فیش‌های حقوقی" },
    ],
    headers: [
      { text: "نام و نام خانوادگی", sortable: false, value: "username" },
      { text: "کد پرسنلی", sortable: false, value: "id" },
      { text: "نام پروژه", sortable: false, value: "project_name" },
      { text: " تاریخ فیش", value: "date_monthly" },
    ],
    items: [
      {
        id: "10522",
        username: "محمد گودرزی",
        project_name: "shciman",
        date_monthly: "1399/06/01",
      },
    ],
    projectsHeaders: [
      { text: "نام پروژه", sortable: false, value: "project_name" },
      { text: "تاریخ پروژه", sortable: false, value: "project_date" },
      { text: "id", sortable: false, value: "id" },
    ],
    projectItems: [
      { project_name: "chciman", project_date: "1399/06/08", id: "project id" },
    ],
  }),
  //************************* methods **********************************
  methods: {
    viewProject(viewProject) {
      this.uploadFile = true;

      this.projectname2 = viewProject.project_name;
      this.projectNameSelected = viewProject.id;
    },
    viewPayrollItem(viewItem) {
      //  dialog will show popupdialog component
      this.showPayrollItem = true;
      this.payrollname2 = viewItem.project_name;
      this.selected = viewItem.id;
    },
    // moving between tabs
    changeTab(e) {
      if (e === 0) {
        this.registerProject = true;
        this.showList = false;
        (this.showProjectLists = false), console.log("id tab : " + e);
      } else if (e === 1) {
        (this.showProjectLists = true), (this.showList = false);
        this.registerProject = false;
        console.log("id tab : " + e);
      } else {
        this.showList = true;
        this.registerProject = false;
        (this.showProjectLists = false), console.log("id tab : " + e);
      }
    },

    cancel() {
      this.showPayrollItem = false;
    },
    cancelUpload() {
      this.uploadFile = false;
      this.projectname2 = "";
    },
    //chetori bedon inke safe ja be ja beshhe link taghir kone?
    // regiter a new project name
    sendProjectName() {
      if (!this.projectName) {
        alert("لطفا نام پروژه را وارد کنید ");
        return;
      }

      // project_name is a project name on db
      this.$axios
        .post("projectname", { projectname: this.project_name })
        .then((data) => {
          console.log(data);
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
}
.v-tabs {
  margin: 0px;
  width: 100%;
}
.v-tab {
  width: 120px;
  height: 60px;
}
.v-text-field {
  margin-top: 10%;
  margin-right: 15px;
  width: 100%;
}
.v-btn {
  margin-right: 19px;
}
#nav-btn {
  width: 100%;
}
#cancel {
  margin-left: 15px;
}
</style>
