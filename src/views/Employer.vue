<template>
  <v-container>
    <!-- ************************ tabs  ******************************* -->
    <v-layout row>
      <div class="col-12 col-md-3">
        <v-btn
          class="nav-btn ma-1"
          outlined
          large
          @click="rgNewProject()"
          color="#399"
        >
          <v-icon>mdi-plus</v-icon>پروژه جدید
        </v-btn>
      </div>
      <div class="col-12 col-md-3">
        <v-btn
          class="nav-btn ma-1"
          outlined
          large
          @click="shProjectList()"
          color="#399"
        >
          <v-icon large>mdi-playlist-star</v-icon>لیست پروژه‌ها
        </v-btn>
      </div>
      <div class="col-12 col-md-3">
        <v-btn
          class="nav-btn ma-1"
          outlined
          large
          @click="shPayrollList()"
          color="#399"
        >
          <v-icon>mdi-cash-usd-outline</v-icon>فیش‌های حقوقی
        </v-btn>
      </div>
      <div class="col-12 col-md-3">
        <v-btn
          class="nav-btn ma-1"
          outlined
          large
          @click="showEmployeeList()"
          color="#399"
        >
          <v-icon>mdi-account-multiple</v-icon> کارمندان
        </v-btn>
      </div>

      <router-view />
    </v-layout>
    <!-- ***********************   Body    *************************** -->
    <v-layout>
      <!--  show project list -->

      <v-row v-show="showProjectLists" md="12">
        <v-flex>
          <v-row class="col-12" row>
            <v-text-field
              class="col-lg-6 col-md-5 col-4 ma-0"
              color="primary"
              v-model="search"
              @keyup.enter="findProject()"
              label="جستجو . . ."
            ></v-text-field>

            <v-btn
              class="col-lg-4 col-md-3 col-3 pa-5 mt-2 mr-13"
              color="primary"
              outlined
              @click="findProject()"
            >
              <v-icon>mdi-file-find</v-icon>جستجو
            </v-btn>
            <v-btn
              class="col-lg-1 col-md-2 col-1 pa-5 mt-2 mr-5"
              color="success"
              @click="getProjectLists()"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-row>
          <v-data-table
            class="projecList"
            :hide-default-footer="true"
            :headers="projectsHeaders"
            :items="projectItems"
            @click:row="viewProject"
            :selected="projectNameSelected"
            disable-pagination
          ></v-data-table>
        </v-flex>
      </v-row>
      <!-- ******************* show users list *************************** -->
      <v-row v-show="showUsers">
        <ShowUsersList></ShowUsersList>
      </v-row>
      <!-- ************* show payroll list ****************** -->
      <v-row v-show="showList" class="col-12">
        <v-text-field
          class="col-lg-7 col-md-6 col-5 ma-0"
          v-model="separatiol"
          @keyup.enter="sendprjNameForDivision"
          label="نام پروژه را وارد کنید"
        ></v-text-field>

        <v-btn
          class="col-lg-3 col-md-3 col-5 mt-2"
          color="primary"
          outlined
          @click="sendprjNameForDivision"
        >
          <v-icon>mdi-file-find</v-icon>نمایش بر اساس نام پروژه
        </v-btn>
        <v-btn
          class="col-1 pa-5 mt-2 mr-5"
          color="success"
          @click="getProjectLists()"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <a class="downloadBtn">
          <v-btn
            v-show="showdlList"
            width="100%"
            color="success"
            @click="dlPayrollList"
          >
            <v-icon>mdi-download</v-icon>دانلود لیست تمام فیش‌های حقوقی بر اساس
            نام پروژه
          </v-btn>
        </a>

        <v-flex>
          <v-data-table
            :hide-default-footer="true"
            :headers="headers"
            :items="items"
            @click:row="viewPayrollItem"
            :selected="selected"
            disable-pagination
            :sort-by="['name']"
            :sort-desc="[true]"
          ></v-data-table>
        </v-flex>
      </v-row>
      <!-- ************************* -->
      <v-row v-show="registerProject">
        <RegisterProject></RegisterProject>
      </v-row>
    </v-layout>
    <!-- ***********************   POPUP   *************************** -->

    <v-dialog v-model="showPayrollItem">
      <v-card-title class="headline grey lighten-2 pos tabelsHeader">
        نام پروژه : {{ this.payrollname2 }}

        <v-btn
          small
          absolute
          left
          dark
          color="error"
          id="cancel"
          @click="cancel()"
        >
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
        <v-btn dark class="ma-6" color="error" @click="changeName()"
          ><v-icon> mdi-file-edit</v-icon>تغییر نام پروژه</v-btn
        >

        <v-btn
          absolute
          left
          dark
          color="error"
          id="cancel"
          @click="cancelUpload()"
        >
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <UploadPayroll
        :selected="projectName"
        :project_id="project_id"
        @closed="cancelUpload"
      ></UploadPayroll>
    </v-dialog>
    <!-- ********************** -->
    <v-dialog v-model="enterName">
      <v-card-title class="headline grey lighten-2 pos">
        <h4 class="changeNameHeader">تغییر نام پروژه !</h4>

        <v-btn
          absolute
          left
          dark
          color="error"
          id="cancel"
          @click="cancelChangeName()"
        >
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <ChangeprjName
        :selected="project_id"
        @closed="cancelChangeName"
      ></ChangeprjName>
    </v-dialog>
  </v-container>
</template>

<script>
import PopUpDialog from "./PopUpDialog.vue";
import UploadPayroll from "./UploadPayroll.vue";
import ShowUsersList from "./ShowUsersList.vue";
import RegisterProject from "./RegisterProject.vue";
import ChangeprjName from "./ChangePrjName.vue";

export default {
  components: {
    PopUpDialog,
    UploadPayroll,
    ShowUsersList,
    RegisterProject,
    ChangeprjName,
  },
  data: () => ({
    project_id: "",
    projectname2: "", // save project name to send to show on pop up title
    payrollname2: "", // save payroll name to send to show on pop up title
    projectNameSelected: "",
    showPayrollItem: false,
    selected: "",
    selected2: "",
    uploadFile: false,
    registerProject: false,
    showList: false,
    showProjectLists: true,
    separatiol: "",
    listDownload: "",
    showdlList: false,
    prjIdForDL: "",
    active_tab: 1,
    enterName: false,
    newName: "",
    showUsers: false,
    sProject: "",
    eProject: "",
    contractNumber: "",
    projectName: "",
    search: "",

    headers: [
      { text: "نام و نام خانوادگی", sortable: false, value: "username" },
      { text: "کد پرسنلی", sortable: false, value: "_employee" },
      { text: "نام پروژه", sortable: false, value: "project_name" },
      { text: " تاریخ فیش", sortable: false, value: "date_monthly" },
    ],
    items: [],
    projectsHeaders: [
      { text: "نام پروژه", sortable: true, value: "project_name" },
      { text: "تاریخ شروع پروژه", sortable: false, value: "start_date" },
      { text: "تاریخ پایان پروژه", sortable: false, value: "end_date" },
      { text: "شماره قرارداد", sortable: false, value: "contract_number" },
    ],
    projectItems: [],
  }),
  // ************************ mounted ***********************************
  mounted() {
    this.getProjectLists();
    this.getPayrollList();
  },
  computed: {},
  //************************* methods **********************************
  methods: {
    findProject() {
      this.$axios
        .post("admin/findProject", {
          project_Name: this.search,
        })
        .then(({ data }) => {
          this.projectItems = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getProjectLists() {
      this.$axios
        .get("/admin/projects")
        .then(({ data }) => {
          this.projectItems = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPayrollList() {
      this.$axios
        .get("/admin/list")
        .then(({ data }) => {
          this.items = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancelChangeName() {
      this.enterName = false;
      this.uploadFile = false;
    },
    rgNewProject() {
      this.registerProject = true;
      this.showList = false;
      this.showProjectLists = false;
      this.showUsers = false;
    },
    shProjectList() {
      this.showProjectLists = true;
      this.showList = false;
      this.registerProject = false;
      this.showUsers = false;
      this.getProjectLists();
    },
    shPayrollList() {
      this.showList = true;
      this.registerProject = false;
      this.showProjectLists = false;
      this.showUsers = false;
      this.getPayrollList();
    },
    showEmployeeList() {
      this.showUsers = true;
      this.showList = false;
      this.registerProject = false;
      this.showProjectLists = false;
    },
    viewProject(viewProject) {
      this.uploadFile = true;
      this.projectname2 = viewProject.project_name;
      this.project_id = viewProject.project_id;
    },
    viewPayrollItem(viewItem) {
      this.showPayrollItem = true;
      this.payrollname2 = viewItem.project_name;
      this.selected2 = viewItem.id;
    },
    cancel() {
      this.showPayrollItem = false;
      this.enterName = false;
    },
    changeName() {
      this.enterName = true;
    },
    cancelUpload() {
      this.uploadFile = false;
      this.projectname2 = "";
    },

    // separatiol based on prj name
    sendprjNameForDivision() {
      if (!this.separatiol) {
        alert("لطفا نام پروژه را وارد کنید ");
        return;
      }
      this.showdlList = true;

      this.$axios
        .post("admin/showPayrollsList", { prj_name: this.separatiol })
        .then(({ data }) => {
          this.items = data;
          this.prjIdForDL = data[0]._project_id;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // download all payroll
    dlPayrollList() {
      this.$axios
        .post("/admin/dlPayrolls", { project_id: this.prjIdForDL })
        .then(({ data }) => {
          window.open(data, "_blank");
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
.downloadBtn {
  width: 100%;
  margin-top: 10px;
  margin-left: 6%;
  text-decoration: none;
}
.tabelsHeader {
  min-width: 550px;
}
.changeProjectName {
  margin-left: 5%;
}
</style>
