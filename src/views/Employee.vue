<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-data-table
          :hide-default-footer="true"
          :headers="headers"
          :items="items"
          @click:row="veiwItem"
          :selected="selected"
        ></v-data-table>
      </v-flex>
    </v-layout>
    <!-- ***********************   POPUP   *************************** -->

    <v-dialog v-model="dialog">
      <v-card-title class="headline grey lighten-2 pos">
        نام پروژه : {{this.projectname}}
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
  data() {
    return {
      dialog: false,
      selected: "",
      projectname: "", // save project name to send to show on pop up title
      headers: [
        { text: "نام پروژه", sortable: false, value: "project_name" },
        { text: "تاریخ", sortable: false, value: "date_monthly" },
      ],
      items: [
        {
          id: "1",
          project_name: "شرکت سیمان",
          date_monthly: "1399/06/01",
        },
        {
          id: "2",
          project_name: "شرکت سیمان2",
          date_monthly: "1399/07/01",
        },
      ],
    };
  },
  mounted() {
    this.$axios
      .get("/user/list")
      .then((data) => {
        this.items = data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    cancel() {
      this.dialog = false;
    },
    //  moshahede 1 mored az list bayad ba :id (GET) ersal shavad

    veiwItem(veiwItem) {
      //  dialog will show dialog component
      this.dialog = true;
      this.selected = veiwItem.id;
      this.projectname = veiwItem.project_name;
      console.log("this is id : " + this.selected);
    },
  },
};
</script>
<style>
#cancel {
  margin-left: 15px;
}
</style>
