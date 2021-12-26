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
          <!-- <div class=piccontainer>
            <img
              :src='img'
              class="pic"
            />
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
          </div> -->

          <div>
            <el-row>
              <el-col :span="12">
                <div>
                  <h3>用户头像</h3>
                </div>
                <div class="image">
                  <img :src="img" class="pic" />
                </div>
                <!-- <div class="modify">
            <el-button type="primary">更改照片</el-button>
          </div> -->
                <div v-if="isTable" class="introinfo">
                  <div class="info-row">
                    <div class="user-info-label">介绍</div>
                    <div class="user-info">{{ intro }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <h3>用户信息</h3>
                </div>
                <div id="content">
                  <div v-if="isTable">
                    <el-table
                      :show-header="false"
                      :data="tableData"
                      :cell-style="columnStyle"
                      border
                      style="width: 100%; margin-top: 20px"
                    >
                      <el-table-column width="180" prop="title" label="标题">
                      </el-table-column>
                      <el-table-column prop="content" label="内容">
                      </el-table-column>
                    </el-table>
                  </div>

                  <div v-if="!isTable">
                    <el-form label-width="100px" :hide-required-asterisk="true">
                      <el-form-item label="用户名  ">
                        <el-input
                          v-model="user_name"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="姓名  ">
                        <el-input v-model="name" :readonly="false"></el-input>
                      </el-form-item>
                      <el-form-item label="密码  ">
                        <el-input
                          v-model="password"
                          :readonly="false"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="科室   ">
                        <el-input
                          v-model="department_name"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="医院 ">
                        <el-input
                          v-model="hospital_name"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="介绍 ">
                        <el-input v-model="intro" :readonly="false"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>

                  <div v-if="isTable" class="modify">
                    <el-button type="primary" @click="edit"
                      >编辑个人信息</el-button
                    >
                  </div>
                  <div v-if="!isTable" class="modify">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="returnback">取消</el-button>
                  </div>
                </div>
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
    H_Aside,
  },
  data() {
    return {
      tableData: [
        {
          title: "用户名",
          content: "",
        },
        {
          title: "姓名",
          content: "",
        },
        {
          title: "科室",
          content: "",
        },
        {
          title: "医院",
          content: "",
        },
      ],
      isTable: true,
      d_satoken: "",
      user_name: "",
      name: "",
      intro: "",
      department_name: "",
      hospital_name: "",
      img: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("satoken", localStorage.getItem(this.d_satoken));

      var raw = JSON.stringify({
        name: this.name,
        intro: this.intro,
        password: this.password,
        img:this.img,
      });
      console.log(raw);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://220.179.227.205:6019/doctor/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

        alert("ok");
        this.getInfo();
        this.isTable=!this.isTable;
        
    },
    updateTable() {
      this.tableData[0].content = this.user_name;
      this.tableData[1].content = this.name;

      this.tableData[2].content = this.department_name;
      this.tableData[3].content = this.hospital_name;
    },
    edit() {
      this.isTable = !this.isTable;
    },
    returnback() {
      this.isTable = !this.isTable;
    },
    async getInfo() {
      this.d_satoken = localStorage.getItem("d_satoken");
      await fetch("http://220.179.227.205:6019/doctor", {
        headers: {
          // 'd_satoken':localStorage.getItem('token')
          satoken: this.d_satoken,
          // 'Authorization':this.d_satoken
          credentials: "include",
        },
      })
        // 第一个 then 接受到的是请求头的相关信息
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          this.user_name = res.username;
          (this.name = res.name),
            (this.intro = res.intro),
            (this.department_name = res.department_name),
            (this.hospital_name = res.hospital_name);
          this.img = res.img;
        })
        // 请求错误时执行
        .catch((err) => {
          console.log(err);
        });
      this.updateTable();
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
.modify {
  margin-top: 20px;
  margin-left: 25%;
}
.pic {
  float: left;
  height: 50%;
  width: 50%;
  margin-top: 50px;
  margin-left: 2.2cm;
}
#content {
  float: left;
  height: 100%;
  width: 100%;
  margin-top: 30px;
  /* margin-left: 2.2cm; */
}
.info {
  float: left;
  position: relative;
  top: 50px;
  left: 0%;
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
  left: 0%;
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