<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-data-table
          :hide-default-footer="true"
          :headers="headers"
          :items="items"
          @click:row="showOnePayroll"
        >
          <template v-slot:items="props">
            <td>{{props.items}}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- ***********************   POPUP         *************************** -->
    <v-row v-show="showPopUp">
      <v-col md="12">
        <v-layout>
          <PopUpDialog></PopUpDialog>
        </v-layout>
      </v-col>
    </v-row>
    <!-- ***********************   POPUP         *************************** -->
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
      headers: [
        { text: "نام پروژه", sortable: false, value: "projectname" },
        { text: "تاریخ", value: "date" },
        { text: "درآمد (ریال)", value: "income" },
      ],
      items: [
        {
          // chetori bejaye in meghdar ha az DB data begiram?
          projectname: "پروژه 1",
          date: "1399/6/01",
          income: 6000000,
        },
        {
          // chetori bejaye in meghdar ha az DB data begiram?
          projectname: "پروژه 2",
          date: "1399/7/01",
          income: 6000000,
        },
        {
          // chetori bejaye in meghdar ha az DB data begiram?
          projectname: "پروژه 3",
          date: "1399/8/01",
          income: 6000000,
        },
      ],
    };
  },
  methods: {
    showOnePayroll(index) {
      alert(
        "this is not dialog :" +
          index.projectname +
          " - " +
          index.date +
          " - " +
          index.income
      );

      this.showPopUp = true;
    },
  },
};
</script>
<style></style>
