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
  data() {
    return {
      dialog: false,
      selected: "",
      headers: [
        { text: "نام پروژه", sortable: false, value: "project_name" },
        { text: "تاریخ", sortable: false, value: "date_monthly" },
      ],
      items: [
        {
          project_name: "test 1",
          date_monthly: "test 2",
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
