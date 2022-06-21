

<template>
  <div>
    <el-container style="background-color: #3c3f41">
      <el-aside style="width: auto">
        <Aside />
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <Header />
        </el-header>
        <el-main style="width: auto">
          <el-dialog v-model="centerDialogVisible" width="30%" center>
            <div class="spantext">
              <span class="titlespan">{{ dia }}</span>
            </div>
            <br />
            <span>{{ ad }}</span>
            <!-- <template #footer>
              <span class="dialog-footer">
                <el-button @click="getAdvice = false"
                  >Cancel</el-button
                >
                <el-button type="primary" @click="centerDialogVisible = false"
                  >Confirm</el-button
                >
              </span>
            </template> -->
          </el-dialog>

          <el-dialog v-model="finishVis" title="提示" width="30%" center>
            <span>已经处理的预约不能取消</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="finishVis = false">取消</el-button>
                <el-button type="primary" @click="finishVis = false"
                  >确认</el-button
                >
              </span>
            </template>
          </el-dialog>

          <el-dialog v-model="deleteVis" title="提示" width="30%" center>
            <span>已成功取消该预约</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="deleteVis = false">取消</el-button>
                <el-button type="primary" @click="deleteVis = false"
                  >确认</el-button
                >
              </span>
            </template>
          </el-dialog>

          <div class="row_container1">
            <el-table
              :data="tableData"
              style="width: 100%"
              highlight-current-row
            >
              <el-table-column prop="name" label="医院" />
              <el-table-column prop="dept" label="科室" />
              <el-table-column prop="doctor" label="医生" />
              <el-table-column prop="date" label="日期" />
              <el-table-column prop="time" label="时段" />
              <el-table-column prop="number" label="预约号" />
              <el-table-column label="操作" align="center" min-width="100">
                <template #default="scope">
                  <el-button
                    size="mini"
                    @click="getAdvice(scope.$index, scope.row)"
                    >查看医嘱</el-button
                  >
                  <el-button
                    size="mini"
                    @click="cancel(scope.$index, scope.row)"
                    >取消预约</el-button
                  >
                </template>
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
            layout="total, sizes, prev, pager, next"
            :total="totalNumber"
            @size-change="handleSizeChange($event, pageSize)"
            @current-change="handleCurrentChange(currentPage)"
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
import TableLayout from 'element-plus/es/components/table/src/table-layout';
export default {
  components: {
    Header,
    Aside,
    Search,
  },
  data() {
    return {
      finishVis: false,
      deleteVis: false,
      centerDialogVisible: false,
      ad: "",
      dia: "",
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
    getAdvice(index, row) {
      this.centerDialogVisible = true;
      
      if (row.advice == null) this.ad = "尚未给出医嘱";
      else this.ad = row.advice;

      if (row.diagnosis == null) this.dia = "尚未确诊";
      else this.dia = row.diagnosis;
    },
    cancel(index, row) {
      if (row.finish == false) {
        var id = row.id;
        var code = row.code;
      
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
        myHeaders.append("satoken", localStorage.getItem("p_satoken"));

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          "four/appointments/" + id + "/details/" + code,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        this.tableData.splice(index,1);
        this.deleteVis = true;
        
      } else {
        this.finishVis = true;
      }
    },
    async getInfo() {
      this.tableData = [];
      
      var name = "张三";
      var dept = "消化科";
      var time = "2021-12-24";
      var date = "上午";
      var doctor = "李四";
      var diagnosis = "大病";
      var advice = "多运动";
      var id = "";
      var code = "";
      var finish = "";

      var number = 11;
      var res;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("satoken", localStorage.getItem("p_satoken"));

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      var url =
        "four/appointments/details?pageSize=" +
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
        diagnosis = res.data.list[i].diagnosis;
        advice = res.data.list[i].advice;
        id = res.data.list[i].id;
        code = res.data.list[i].code;
        finish = res.data.list[i].finish;
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
          diagnosis,
          advice,
          id,
          code,
          finish,
        });
      }

      (this.currentPage = res.data.currentPage),
        (this.totalPage = res.data.totalPage),
        (this.totalNumber = res.data.totalNumber);
    },
    async handleCurrentChange(num) {
      this.currentPage = num - 1;
      this.tableData = [];
      
      var name = "张三";
      var dept = "消化科";
      var time = "2021-12-24";
      var date = "上午";
      var doctor = "李四";
      var diagnosis = "大病";
      var advice = "多运动";
      var id = "";
      var code = "";
      var finish = "";

      var number = 11;
      var res;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("satoken", localStorage.getItem("p_satoken"));

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      var url =
        "four/appointments/details?pageSize=" +
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
        diagnosis = res.data.list[i].diagnosis;
        advice = res.data.list[i].advice;
        id = res.data.list[i].id;
        code = res.data.list[i].code;
        finish = res.data.list[i].finish;

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
          diagnosis,
          advice,
          id,
          code,
          finish,
        });
      }

      (this.currentPage = res.data.currentPage + 1),
        (this.totalPage = res.data.totalPage),
        (this.totalNumber = res.data.totalNumber);


    },
    async handleSizeChange(num) {
     
      this.currentPage = 0;
      this.pageSize = num;
      this.tableData = [];
  
      var name = "张三";
      var dept = "消化科";
      var time = "2021-12-24";
      var date = "上午";
      var doctor = "李四";
      var diagnosis = "大病";
      var advice = "多运动";
      var id = "";
      var code = "";
      var finish = "";

      var number = 11;
      var res;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("satoken", localStorage.getItem("p_satoken"));

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      var url =
        "four/appointments/details?pageSize=" +
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
        diagnosis = res.data.list[i].diagnosis;
        advice = res.data.list[i].advice;
        id = res.data.list[i].id;
        code = res.data.list[i].code;

        finish = res.data.list[i].finish;
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
          diagnosis,
          advice,
          id,
          code,
          finish,
        });
      }

      (this.currentPage = res.data.currentPage + 1),
        (this.totalPage = res.data.totalPage),
        (this.totalNumber = res.data.totalNumber);
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
.titlespan {
  font-weight: bold;
  font-size: 20px;
  position: relative;
}
.spantext {
  text-align: center;
}
</style>
