

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
          <div class="row_container1">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="医院" />
              <el-table-column prop="dept" label="科室" />
              <el-table-column prop="doctor" label="医生" />
              <el-table-column prop="date" label="日期" />
              <el-table-column prop="time" label="时段" />
              <el-table-column prop="number" label="预约号" />
              <el-table-column label="操作" align="center" min-width="100">
                <el-button @click="getAdvice">查看医嘱</el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
        <div class="demo-pagination-block">
          <span class="demonstration"></span>
          <el-pagination
            v-model:currentPage="currentPage"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNumber"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
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
  data() {
    return {
      isCollapse: true,
      dialogVisible: false,
      tableData: [],

      totalPage: "",
      totalNumber: "",

      pageSize: 5,
      currentPage: 0,
      history: true,
      future: true,

      gettable: {},
    };
  },
  created() {
    this.getInfo();
  },

  methods: {
    getAdvice() {
      window.confirm("nice");
    },
    async getInfo() {
      this.tableData = [];
      console.log("c " + this.currentPage);
      console.log("p " + this.pageSize);
      var name = "麻婆豆腐";
      var dept = "";
      var time = "文案";
      var date = "空余";
      var doctor = "";
      var number = 11;
      var res;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("satoken", localStorage.getItem("satoken"));

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      // var url = "http://220.179.227.205:6018/appointment/Patient/";
      // console.log(localStorage.getItem("username"));
      // url = url + localStorage.getItem("username") + "/all";
      //http://220.179.227.205:6018/appointments/details?pageSize=5&currentPage=0&history=true&future=true
      // console.log(url);

      var url =
        "http://220.179.227.205:6018/appointments/details?pageSize=" +
        this.pageSize +
        "&currentPage=" +
        this.currentPage +
        "&history=" +
        this.history +
        "&future=" +
        this.future;

      await fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));

      res = JSON.parse(res);
      this.gettable = res;
      for (let i = 0; i < res.data.list.length; i++) {
        name = res.data.list[i].hospital_name;
        dept = res.data.list[i].department_name;
        doctor = res.data.list[i].doctor_name;
        time = res.data.list[i].slot;
        if (time == "MORNING") time = "上午";
        else time = "下午";
        date = res.data.list[i].date;
        number = res.data.list[i].code;

        this.tableData.push({
          name,
          dept,
          doctor,
          time,
          date,
          number,
        });
      }

      (this.CurrentPage = res.data.currentPage),
        (this.totalPage = res.data.totalPage),
        (this.totalNumber = res.data.totalNumber);
    },
    handleCurrentChange() {

    },
    handleSizeChange() {
      
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.row_container1 {
  width: 100%;
  position: relative;
  left: 0%;
  top: 0%;
}
.demo-pagination-block {
  position: relative;
  bottom: 0%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
