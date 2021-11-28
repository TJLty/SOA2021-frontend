
<template>
  <div>
    <el-container style="background-color: #3c3f41">
      <el-aside style="width: 230px">
        <Aside />
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <Header />
        </el-header>
        <el-main>
          <el-text> 这是个人信息</el-text>
          <!-- <div class="pinfotable">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="Date" width="180" />
              <el-table-column prop="name" label="Name" width="180" />
              <el-table-column prop="address" label="Address" />
            </el-table>
          </div>
          <div class="pinfoform">
            <el-form
              :label-position="top"
              label-width="100px"
              :model="formLabelAlign"
            >
              <el-form-item label="Name">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="Activity zone">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item label="Activity form">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
            </el-form>
          </div> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import { Search } from "@element-plus/icons";
export default {
  components: {
    Header,
    Aside,
    Search,
  },
  created() {},
  methods: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
      },
    };
  },
};
</script>

<style lang="less" scoped>
.ecard {
  border-radius: 7px;
  background: #d7f0fa;
  height: 80px;
  //width: 100%;
  text-align: center;
}
.card_text {
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
}
.select_container {
  width: 80%;
  position: relative;
  left: 16%;
  top: 0%;
  // text-align: center ;
}
.elcheckbox {
  background: white;
}
.elcheckbox:hover {
  background: #a2d8ee;
}
.card_container {
  width: 80%;
  position: relative;
  left: 16%;
  top: 0%;
  // bottom: 0;
  // z-index: 999;
  text-align: center;
}
.ecol {
  padding: 0.6%;
}
.etag1 {
  position: relative;
  left: 3%;
  top: 50px;
}
.el-row {
  margin-bottom: 0px;
}
.el-col {
  border-radius: 4px;
}
</style>
