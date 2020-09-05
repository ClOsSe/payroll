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
        <v-row v-show="uploadFile">
          <v-file-input
            v-model="excelFile"
            ref="excelFile"
            show-size
            :rules="excelFileRules"
            accept=".xls, .xlsx"
            label="حداکثر 5 مگابایت - فقط xls , xlsx"
          ></v-file-input>
          <v-btn @click="sendList()" color="primary">ارسال</v-btn>
        </v-row>

        <v-row v-show="showList">
          <v-flex>
            <v-data-table
              :hide-default-footer="true"
              :headers="headers"
              :items="items"
              @click:row="veiwItem"
              :selected="selected"
            >
              <template v-slot:items="props">
                <tr>{{props.items}}</tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-row>

        <v-row v-show="registerProject">
          <v-text-field v-model="projectName" label="نام پروژه را وارد کنید"></v-text-field>
          <v-btn @click="sendProjectNameToDB" color="primary">ثبت</v-btn>
        </v-row>
      </v-layout>
    </v-layout>
    <!-- ***********************   POPUP         *************************** -->

    <v-dialog v-model="showPopUp" width="500">
      <h1>hi</h1>
      <PopUpDialog :selected="selected"></PopUpDialog>
    </v-dialog>

    <!-- ***********************   POPUP         *************************** -->
  </v-container>
</template>
<script>
import PopUpDialog from "./PopUpDialog.vue";

export default {
  components: {
    PopUpDialog,
  },
  data: () => ({
    selected: "",
    showPopUp: false,
    excelFile: null,
    projectName: "",
    uploadFile: true,
    registerProject: false,
    showList: false,
    active_tab: 1,
    excelFileRules: [
      (value) =>
        !value ||
        value.size <= 5000000 ||
        "حجم فایل باید کمتر از 5 مگابایت باشد!",
    ],
    tabs: [
      { index: 0, name: "تعریف پروژه" },
      { index: 1, name: "آپلود لیست حقوق" },
      { index: 2, name: "نمایش لیست حقوق" },
    ],
    headers: [
      { text: "نام پروژه", sortable: false, value: "projectname" },
      { text: "تاریخ", value: "date" },
      { text: "درآمد (ریال)", value: "income" },
    ],
    // ba method get file haye zir ro namayehs bede
    // this is fake data ***********************************************************************
    items: [
      {
        // chetori bejaye in meghdar ha az server data begiram? with get
        id: "1",
        projectname: "پروژه ۱",
        date: "1399/6/01",
        income: 2000000,
      },
      {
        id: "2",
        projectname: "پروژه 2",
        date: "1399/7/01",
        income: 5000000,
      },
      {
        id: "3",
        projectname: "پروژه 3",
        date: "1399/8/01",
        income: 1000000,
      },
    ],
  }),
  // end of fake data ***********************************************
  methods: {
    //  moshahede 1 mored az list bayad ba :id (GET) ersal shavad

    veiwItem(veiwItem) {
      //  showpopup will show dialog component
      this.showPopUp = true;
      this.selected = veiwItem.id;
      console.log("this is id : " + this.selected);
    },
    // moving between tabs
    changeTab(e) {
      if (e === 0) {
        this.registerProject = true;
        this.showList = false;
        this.uploadFile = false;
        this.showPopUp = false;

        console.log(e);
      } else if (e === 1) {
        this.uploadFile = true;
        this.showList = false;
        this.registerProject = false;
        this.showPopUp = false;

        console.log(e);
      } else {
        this.showList = true;
        this.registerProject = false;
        this.uploadFile = false;
        this.showPopUp = false;

        console.log(e);
      }
    },
    // Insert Excel file Into DB
    sendList() {
      // send xls file to DB with post
      let list = new FormData();
      if (!this.excelFile) {
        alert("لطفا ابتدا یک فایل انتخاب کنید!");
        return;
      }
      list.append("projects", this.excelFile, this.excelFile.name);
      // ersal form data be samt server
      this.$axios
        .post("lists", list)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //chetori bedon inke safe ja be ja beshhe link taghir kone?
    // regiter a new project name
    sendProjectNameToDB() {
      let project_name = new FormData();

      if (!this.projectName) {
        alert("لطفا نام پروژه را وارد کنید ");
        return;
      }

      project_name.append("projectName", this.projectName);
      // project_name is a project name on db
      this.$axios
        .post("project_Name", this.project_name)
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
.v-file-input,
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
</style>
