<template>
  <v-container>
    <v-row class="col-12" row>
      <v-text-field
        class="col-lg-6 col-md-5 col-4 ma-0"
        color="primary"
        v-model="national_id"
        @keyup.enter="findUser()"
        label="جستجو . . ."
      ></v-text-field>

      <v-btn
        class="col-lg-4 col-md-3 col-3 pa-5 mt-2 mr-13"
        color="primary"
        outlined
        @click="findUser()"
      >
        <v-icon>mdi-file-find</v-icon>جستجو
      </v-btn>
      <v-btn
        class="col-lg-1 col-md-2 col-1 pa-5 mt-2 mr-5"
        color="success"
        @click="getUsersList()"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-row>
    <v-data-table
      :headers="usersHeadere"
      :items="usersInfo"
      class="elevation-1"
      :hide-default-footer="true"
      disable-pagination
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>لیست کارمندان</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline headlinecolor">
                  {{ username }}
                </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="11" md="11">
                      <v-text-field
                        v-model="newPassword"
                        label="رمز عبور"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text outlined @click="close">
                  انصراف
                </v-btn>
                <v-btn color="error darken-1" outlined @click="save">
                  ثبت
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text outlined dark color="error" @click="editItem(item)">
          <v-icon color="error" class="mr-n6"> mdi-circle-edit-outline </v-icon>
          تغییر رمز
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    newPassword: "",
    national_id: "",
    usersHeadere: [
      { text: "نام و نام خانوادگی", sortable: false, value: "username" },
      { text: "کد ملی", sortable: false, value: "national_id" },
      { text: "تغییر رمز عبور", value: "actions", sortable: false },
    ],
    usersInfo: [],
    editedIndex: -1,
  }),

  computed: {
    username() {
      return this.editedIndex === -1 ? "New Item" : "تغییر رمزعبور";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.getUsersList();
  },

  methods: {
    initialize() {
      this.userInfo = [];
    },
    findUser() {
      if (!this.national_id) {
        alert("لطفا کد پرسنلی را وارد کنید ");
        return;
      }
      this.showdlList = true;

      this.$axios
        .post("admin/finduser", { national_id: this.national_id })
        .then(({ data }) => {
          this.usersInfo = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getUsersList() {
      // send req to server to get employee list
      this.$axios
        .get("/admin/getuserslist")
        .then(({ data }) => {
          this.usersInfo = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editItem(item) {
      this.editedIndex = this.usersInfo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.national_id = this.editedItem.national_id;
      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },

    save() {
      if (this.newPassword) {
        this.$axios
          .put("/admin/edituserpass", {
            national_id: this.national_id,
            new_password: this.newPassword,
          })
          .then(({ data }) => {
            alert(data.message);
            this.getUsersList();
            this.close();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        alert("نام کاربری اصلاح نشد");
        this.close();
      }
    },
  },
};
</script>

<style>
.headlinecolor {
  color: red;
}
</style>
