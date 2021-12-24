<template>
  <div>
    <el-container style="background-color: #3c3f41">
      <el-aside style="width: auto">
        <D_Aside />
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <D_header />
        </el-header>
        <el-main style="width: auto">
          <div class="pic" style="margin-left: 20px; margin-top: 20px">
            <span>
              <span
                class="el-avatar el-avatar--circle"
                style="height: 200px; width: 200px"
                >头像</span
              >
            </span>
          </div>
          <div class="info">
            <div class="info-row">
              <div class="user-info-label">用户名</div>
              <div class="user-info">{{ name }}</div>
            </div>

            <div class="info-row">
              <div class="user-info-label">科室</div>
              <div class="user-info">{{ department_name }}</div>
            </div>

            <div class="info-row">
              <div class="user-info-label">医院</div>
              <div class="user-info">{{ hospital_name }}</div>
            </div>
          </div>

          <div class="introinfo">
            <div class="info-row">
              <div class="user-info-label">介绍</div>
              <div class="user-info">{{ intro }}</div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>




<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import D_header from "@/components/D_header";
import D_Aside from "@/components/D_Aside";
import H_Aside from "@/components/H_Aside";
import { Search } from "@element-plus/icons";

export default {
  components: {
    Header,
    Aside,
    Search,
    D_Aside,
    D_header,
    H_Aside
  },
  data() {
    return {
      d_satoken:"",
      name: "",
      intro: "",
      department_name: "",
      hospital_name: "",
    };
  },
  methods: {
    getInfo() {
      this.d_satoken=localStorage.getItem('d_satoken');
      fetch("http://220.179.227.205:6019/doctor", {
        headers: {
          // 'd_satoken':localStorage.getItem('token')
          "satoken": this.d_satoken,
          // 'Authorization':this.d_satoken
          credentials: "include",   
        }
      }
      )
        // 第一个 then 接受到的是请求头的相关信息
        .then((res) => {
          
          return res.json();
          
        })
        .then((res) => {
          console.log(res);

            this.name = res.name,
            this.intro= res.intro,
            this.department_name=res.department_name,
            this.hospital_name=res.hospital_name;
          
        })
        // 请求错误时执行
        .catch((err) => {
          console.log(err);
        });
      }
  },
  created() {
    this.getInfo();
  },
 
};
</script>

<style scoped>
.pic {
  float: left;
}
.info {
  float: left;
  position: relative;
  top: 50px;
  left: 20%;
  width: 500px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 10px 10px 10px;
  background: white;
  /* border-radius: 30px; */

  box-shadow: 15px 15px 10px #cccccc, 15px 15px 10px #ffffff,
    5px 5px 10px #cccccc, 5px 5px 10px #ffffff;
}
.introinfo {
  float: left;
  position: relative;
  top: 50px;
  left: 18.5%;
  width: 500px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 10px 10px 10px;
  background: white;
  /* border-radius: 30px; */
  margin: 20px;
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