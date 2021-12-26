
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
          <div class="info">
            <el-row>
              <el-col>
                <div class="info-row">
                  <div class="user-info-label">医院简介</div>
                  <div class="user-info">{{ hintro[0] }}</div>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="select_container">
            <el-row :gutter="0">
              <el-col
                :span="5"
                v-for="(item, index) in r_fdnamelist"
                :key="index"
                class="ecol"
              >
                <el-checkbox
                  @change="selectfd(item)"
                  class="elcheckbox"
                  border
                  >{{ item.name }}</el-checkbox
                >
              </el-col>
            </el-row>
          </div>

          <div class="card_container">
            <el-row gutter="25">
              <el-col
                :span="5"
                v-for="item in r_dnamelist"
                :key="item.dname"
                class="ecol"
              >
                <el-card
                  :body-style="{ padding: '2px' }"
                  shadow="hover"
                  class="ecard"
                  @click="todoctor(item.hospitalId, item.dname)"
                >
                  <div class="card_text">
                    <font size="4" color="black"> {{ item.dname }}</font>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
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
  created() {
    localStorage.removeItem(this.SelectDepartmentId);
    localStorage.removeItem(this.SelectDepartmentName);
    this.hospitalId = localStorage.getItem("hospitalId");
    this.getInfo();
    this.gethosinfo();


  },
  methods: {
    selectfd(pra) {
      if (event.target.checked) {
        this.s_fdnamelist.push(pra);
      } else {
        var j;
        for (var i = 0; i < this.s_fdnamelist.length; i++) {
          if (this.s_fdnamelist[i].name == pra.name) j = i;
        }
        this.s_fdnamelist.splice(j, 1);
      }
      this.r_dnamelist.splice(0);

      if (this.s_fdnamelist.length > 0) {
        for (i = 0; i < this.dnamelist.length; i++)
          for (j = 0; j < this.s_fdnamelist.length; j++)
            if (this.dnamelist[i].fname == this.s_fdnamelist[j].name) {
              this.r_dnamelist.push(this.dnamelist[i]);
              continue;
            }
      } else {
        this.r_dnamelist.splice(0);

        for (let i = 0; i < this.getobj.data.length; i++) {
          var dname = this.getobj.data[i].departmentName;
          var fname = this.getobj.data[i].fatherDepartmentName;
          this.r_dnamelist.push({
            dname,
            fname,
          });
        }
      }
    },
    todoctor(hospitalId, dname) {
      localStorage.removeItem("SelectHospitalId");
      localStorage.removeItem("SelectDepartmentName");
      localStorage.setItem("SelectHospitalId", hospitalId);
      localStorage.setItem("SelectDepartmentName", dname);
      console.log(hospitalId);
      console.log(dname);
      this.$router.push("/doctor");
    },
    async getInfo() {
      var dname = "a";
      var fname = "b";
      var name = "c";
      var hospitalId = "d";
      console.log(window.sessionStorage.getItem("hospitalId"));
      var res;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      myHeaders.append("satoken", localStorage.getItem("p_satoken"));
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        "http://220.179.227.205:6016/hospitals/" +
          localStorage.getItem("hospitalId") +
          "/departments",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);

      if (res.code != 200) {
        console.log("fail to get dept");
      } else {
        console.log(res.data);
        console.log(res.data.length);

        this.getobj = res;
        this.dnamelist.splice(0);
        this.fdnamelist.splice(0);

        for (let i = 0; i < res.data.length; i++) {
          dname = res.data[i].departmentName;
          fname = res.data[i].fatherDepartmentName;
          name = res.data[i].fatherDepartmentName;
          hospitalId = res.data[i].hospitalId;
          this.dnamelist.push({
            dname,
            fname,
            hospitalId,
          });

          this.r_dnamelist.push({
            dname,
            fname,
            hospitalId,
          });
          this.tempObj.push({
            name,
          });
        }

        for (var i = 0; i < this.tempObj.length; i++) {
          for (var j = i + 1; j < this.tempObj.length; j++) {
            if (this.tempObj[i].name == this.tempObj[j].name) {
              this.tempObj.splice(j, 1);
              j--;
            }
          }
        }

        for (let i = 0; i < this.tempObj.length; i++) {
          name = this.tempObj[i].name;
          this.fdnamelist.push({
            name,
          });

          this.r_fdnamelist.push({
            name,
          });
        }
      }
    },

    async gethosinfo() {
      var info;
      var res;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      myHeaders.append("satoken", localStorage.getItem("p_satoken"));
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        // "http://220.179.227.205:6016/hospital/normal/all",
        "http://220.179.227.205:6016/hospitals?filter=",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);
      if (res.code != 200) {
        console.log("fail to get hospital");
      } else {
        console.log(res.data);
        console.log(res.data.length);
        for (let i = 0; i < res.data.length; i++) {
          if(this.hospitalId==res.data[i].hospitalId)
          this.hintro.push(
             res.data[i].hintro
          );
        }
      }

    },
  },
  data() {
    return {
      urlid: "",
      newList1: [],
      newList2: [],

      getobj: [],
      hospitalId: "",

      dnamelist: [],
      fdnamelist: [],

      r_dnamelist: [],
      r_fdnamelist: [],

      s_fdnamelist: [],

      tempObj: [], //暂存

      hintro: [],
    };
  },
};
</script>

<style lang="less" scoped>
.ecard {
  border-radius: 10px;
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
  left: 11.5%;
  top: 0%;
  // text-align: center ;
  margin: 50px;
}
.elcheckbox {
  border-radius: 10px;
  background: white;
}
.elcheckbox:hover {
  background: #d7f0fa;
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
  // border-radius: 4px;
}
#container {
  width: 300px;
  height: 180px;
}
.info {
  position: relative;
  top: 0%;
  left: 16%;
  width: 60%;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 10px 10px 10px;
  background: white;
  // border-radius: 30px;

  box-shadow: 15px 15px 10px #cccccc, 15px 15px 10px #ffffff,
    5px 5px 10px #cccccc, 5px 5px 10px #ffffff;
}
.info-row {
  display: flex;
}
.user-info-label {
  width: 120px;
  margin: 5px;
  background: white;
  color: black;
}
.user-info {
  word-break: break-all;
  word-wrap: break-word;
  margin: 5px;
  background: white;
  color: black;
}
</style>
