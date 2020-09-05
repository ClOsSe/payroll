<template>
  <div>
    <v-flex>
      <v-row>
        <v-col md="12">
          <v-dialog v-model="dialog" width="500">
            <Employer :selected="selected.id"></Employer>
            <v-card>
              <v-divider></v-divider>

              <v-card-title class="headline grey lighten-2">نام پروژه</v-card-title>

              <v-card-text>محتوای پروژه</v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="download">دانلود یه صورت PDF</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-flex>
  </div>
</template>
<script>
import Employer from "./Employer.vue";
export default {
  components: {
    Employer,
  },
  data: () => ({
    dialog: false,
    data: "",
  }),
  watch: {
    selected: {
      handler() {
        this.dialog = true;
      },
      deep: true,
    },
  },
  methods: {
    getAnswer() {
      if (this.handler.indexOf("1")) {
        console.log("this.data");
      } else {
        console.log("test");
      }
    },
    //   send req to get ifo from server
    download() {
      alert("با زدن این دکمه باید فایل به صورت مستفیم دانلود شود");
      this.dialog = false;
      return;
    },
  },
};
</script>
<style >
</style>