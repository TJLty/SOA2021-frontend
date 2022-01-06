
<template>
  <div>
    <el-container style="background-color: #3c3f41">
      <el-aside style="width: auto; height: 100vh">
        <D_Aside />
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <D_Header />
        </el-header>
        <el-main style="width: auto">
          <el-table
            :data="tableData"
            border
            stripe
            style="width: auto; height: auto"
            max-height="800"
          >
            <el-table-column fixed prop="patient_name" label="姓名" />
            <el-table-column prop="patient_username" label="账号" />
            <el-table-column prop="department_name" label="科室" />
            <el-table-column prop="code" label="预约号" />
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="slot" label="时间" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="revoke(scope.$index)"
                >
                  撤销
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="botbtn"><el-button id="botbtn1" type="primary" class="eicon" @click="frontPage">
            上一页
          </el-button>
          <el-button
            id="botbtn2"
            type="primary"
            class="eicon"
            @click="nextPage"
          >
            下一页
          </el-button></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import D_Header from "@/components/D_header";
import D_Aside from "@/components/D_Aside";
import H_Aside from "@/components/H_Aside";
import { Search } from "@element-plus/icons";
export default {
  components: {
    D_Header,
    D_Aside,
    Search,
  },
  data() {
    return {
      page: 0,
      totalPage: 1,
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      var myHeaders = new Headers();
      var d_satoken = localStorage.getItem("d_satoken"),
        res;
      myHeaders.append("satoken", d_satoken);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      if (this.page < this.totalPage) {
        await fetch(
          "http://220.179.227.205:6014/api/v1/appointments/details?pageSize=20&currentPage=" +
            this.page +
            "&history=true&future=false",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => (res = result))
          .catch((error) => console.log("error", error));
        res = JSON.parse(res);
        console.log(res.data);
        this.tableData = res.data.list;
        this.totalPage = res.data.totalNumber;
      } else {
        this.$message.success("当前是最后一页了");
      }
    },
    async revoke(index) {
      var time = new Date(),
        year,
        month,
        day,
        hour,
        date,
        slot;
        
      year = time.getFullYear();
      month = time.getMonth() + 1;
      if(month<10)
        month="0"+month
      day = time.getDate();
      if(day<10)
          day="0"+day
      hour = time.getHours();
      console.log(hour)
      date = year + "-" + month + "-" + day;
      if (hour >= 12) slot = "AFTERNOON";
      else slot = "MORNING";
      console.log(this.tableData[index]);
      console.log( [date, slot])
      if (
        this.tableData[index].date == date &&
        this.tableData[index].slot == slot
      ) {
        var res, rps;
        var url = "http://220.179.227.205:6014/api/v1/appointments/" + this.tableData[index].id + "/details/";
        url += this.tableData[index].code + "?finish=false";
        var myHeaders = new Headers();
        // myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
        var d_satoken = localStorage.getItem("d_satoken");
        myHeaders.append("satoken", d_satoken);
        var requestOptions = {
          method: "PATCH",
          headers: myHeaders,
          redirect: "follow",
        };

        await fetch(url, requestOptions)
          .then((response) => (rps = response.text()))
          .then((result) => (res = result))
          .catch((error) => console.log("error", error));
        res = JSON.parse(res);
        console.log(url);
        console.log(res);
        this.getList();
      } else {
        this.$message.error("该患者不是当前时间段患者，无法撤销");
      }
    },
    nextPage() {
      this.page++;
      this.getList();
    },
     frontPage() {
      this.page--;
      this.getList();
    },
  },
};
</script>

<style scoped>

.botbtn{
position: absolute;
  bottom: 5%;
  flex-direction: row;
  justify-content: center;
  display: flex;
  left: 50%;
}
</style>