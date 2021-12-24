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
          <div class=piccontainer>
            <img
              :src='img'
              class="pic"
            />
          </div>

          <!-- <div class="pic" style="margin-left: 20px; margin-top: 20px">
            <span>
              <span
                class="el-avatar el-avatar--circle"
                style="height: 200px; width: 200px"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                >头像</span
              >
              <img
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                class="pic"
              />
            </span>
          </div> -->
          <div class="info">
            <div class="info-row">
              <div class="user-info-label">用户名</div>
              <div class="user-info">{{ user_name }}</div>
            </div>
            <!-- <div class="info-row">
    <div class="user-info-label">学号/工号</div>
    <div class="user-info">{{userid}}</div>
  </div> -->
            <!-- <div class="info-row">
    <div class="user-info-label">积分</div>
    <div class="user-info">{{credit}}</div>
  </div> -->
            <div class="info-row">
              <div class="user-info-label">手机号</div>
              <div class="user-info">{{ tel_num }}</div>
            </div>
            <div class="info-row">
              <div class="user-info-label">地址</div>
              <div class="user-info">{{ address }}</div>
            </div>

            <div class="info-row">
              <div class="user-info-label">总预约数</div>
              <div class="user-info">{{ total_res }}</div>
            </div>

            <div class="info-row">
              <div class="user-info-label">未执行预约数</div>
              <div class="user-info">{{ unfinished_res }}</div>
            </div>

            <div class="info-row">
              <div class="user-info-label">性别</div>
              <div class="user-info">{{ sex }}</div>
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
import { Search } from "@element-plus/icons";

export default {
  components: {
    Header,
    Aside,
    Search,
  },
  data() {
    return {
      p_satoken: "",

      user_name: "",
      tel_num: "",
      address: "",
      total_res: "",
      unfinished_res: "",
      sex: "",

      img: "",
    };
  },
  methods: {
    async getInfo() {
      var res1;
      var res2;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      myHeaders.append("satoken", localStorage.getItem("p_satoken"));
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        "http://220.179.227.205:6015/patients/" +
          localStorage.getItem("username"),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res1 = result))
        .catch((error) => console.log("error", error));

      res1 = JSON.parse(res1);
      console.log(res1);
      if (res1.code != 200) {
        console.log("fail to get pinfo");
      } else {
        //   (this.user_name = res1.data.username),
        //   (this.tel_num = res1.data.phone),
        //   (this.address = res1.data.address),
        //   console.log(res1.data.sex);
        // if (res1.data.sex == false) this.sex = "女";
        // else if (res1.data.sex == true) this.sex = "男";
        // else this.sex = "不明";
      }

      await fetch(
        "http://220.179.227.205:6018/appointments/details/actions/count?future=true&history=true",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res2 = result))
        .catch((error) => console.log("error", error));

      res2 = JSON.parse(res2);
      console.log(res2);
      if (res2.code != 200) {
        console.log("fail to get pinfo");
      } else {
        // this.total_res = res2.data;
      }

      var res3;
      await fetch(
        "http://220.179.227.205:6018/appointments/details/actions/count?future=true&history=false",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res3 = result))
        .catch((error) => console.log("error", error));

      res3 = JSON.parse(res3);
      console.log(res3);
      if (res3.code != 200) {
        console.log("fail to get pinfo");
      } else {
        // this.unfinished_res = res3.data;
      }

      (this.user_name = res1.data.username),
        (this.tel_num = res1.data.phone),
        (this.address = res1.data.address),
        console.log(res1.data.sex);
      if (res1.data.sex == false) this.sex = "女";
      else if (res1.data.sex == true) this.sex = "男";
      else this.sex = "不明";

      this.total_res = res2.data;

      this.img = res1.data.img;
      console.log(this.img);

      this.unfinished_res = res3.data;
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
.pic {
  float: left;
  height: 20%;
  width: 20%;
  margin-top: 50px;
  margin-left: 2.2cm;
}
.piccontainer{
  top:50px;
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
  border-radius: 30px;

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