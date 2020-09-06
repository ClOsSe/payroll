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
          <v-btn @click="sendProjectName" color="primary">ثبت</v-btn>
        </v-row>
      </v-layout>
    </v-layout>
    <!-- ***********************   POPUP   *************************** -->

    <v-dialog v-model="dialog">
      <v-card-title class="headline grey lighten-2 pos">
        نام پروژه {{headers.project_name}}
        <v-btn small absolute left dark color="error" id="cancel" @click="cancel()">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <PopUpDialog :selected="selected"></PopUpDialog>
    </v-dialog>

    <!-- ***********************   POPUP   *************************** -->
  </v-container>
</template>
<script>
import PopUpDialog from "./PopUpDialog.vue";

export default {
  components: {
    PopUpDialog,
  },
  data: () => ({
    dialog: false,
    selected: "",
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
      { index: 0, name: "تعریف پروژه جدید" },
      { index: 1, name: "نمایش لیست پروژه‌ها" },
      { index: 2, name: "لیست فیش‌های حقوقی" },
    ],
    headers: [
      { text: "نام پروژه", sortable: false, value: "project_name" },
      { text: "تاریخ", value: "date_monthly" },
    ],
    items: [
      {
        project_name: "test 1",
        date_monthly: "test 2",
      },
    ],
  }),
  //************************* methods **********************************
  methods: {
    veiwItem(veiwItem) {
      //  dialog will show dialog component
      this.dialog = true;
      this.selected = veiwItem.id;
    },
    // moving between tabs
    changeTab(e) {
      if (e === 0) {
        this.registerProject = true;
        this.showList = false;
        this.uploadFile = false;
        console.log("id tab" + e);
      } else if (e === 1) {
        this.uploadFile = true;
        this.showList = false;
        this.registerProject = false;
        console.log("id tab" + e);
      } else {
        this.showList = true;
        this.registerProject = false;
        this.uploadFile = false;
        console.log("id tab" + e);
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
    cancel() {
      this.dialog = false;
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
#cancel {
  margin-left: 15px;
}
</style>
