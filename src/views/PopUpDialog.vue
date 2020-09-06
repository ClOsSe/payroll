<template>
  <div>
    <v-flex>
      <v-row>
        <v-col md="12">
          <v-card>
            <v-divider></v-divider>

            <v-card-text id="test">
              محتوای پروژه
              <h5>ای دی سطر انتخاب شده{{selected}}</h5>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="download">دانلود یه صورت PDF</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </div>
</template>
<script>
export default {
  props: ["selected"],

  data: () => ({
    data: "",
  }),
  watch: {
    selected: {
      handler(val) {
        this.$axios.get(`list/${val}`).then(({ data }) => {
          console.log(data);
          console.log(this.selected);
        });
        console.log("test");
      },
      deep: true,
    },
  },
  methods: {
    //   send req to get ifo from server
    download() {
      alert("با زدن این دکمه باید فایل به صورت مستفیم دانلود شود");
      return;
    },
  },
};
</script>
<style >
.body {
  width: 99%;
}
#test {
  margin: 10px;
}
</style>