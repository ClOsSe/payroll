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
        >
          <template v-slot:items="props">
            <td>{{props.items}}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- ***********************   POPUP   *************************** -->

    <v-dialog v-model="dialog">
      <v-card-title class="headline grey lighten-2 pos">
        نام پروژه
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
      showPopUp: false,
      dialog: false,
      selected: "",
      headers: [
        { text: "نام پروژه", sortable: false, value: "projectname" },
        { text: "تاریخ", value: "date" },
        { text: "درآمد (ریال)", value: "income" },
      ],
      items: [
        {
          // chetori bejaye in meghdar ha az DB data begiram?
          id: "1",
          projectname: "پروژه 1",
          date: "1399/6/01",
          income: 6000000,
        },
        {
          // chetori bejaye in meghdar ha az DB data begiram?
          id: "2",
          projectname: "پروژه 2",
          date: "1399/7/01",
          income: 6000000,
        },
        {
          // chetori bejaye in meghdar ha az DB data begiram?
          id: "3",
          projectname: "پروژه 3",
          date: "1399/8/01",
          income: 6000000,
        },
      ],
    };
  },
  methods: {
    //  moshahede 1 mored az list bayad ba :id (GET) ersal shavad

    veiwItem(veiwItem) {
      //  showpopup will show dialog component
      this.showPopUp = true;
      this.dialog = true;
      this.selected = veiwItem.id;
      console.log("this is id : " + this.selected);
    },
  },
};
</script>
<style></style>
