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
          <el-dialog v-model="finishVis" title="提示" width="30%">
            <span>修改成功</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="(finishVis = false), this.$router.go(0)"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  @click="(finishVis = false), this.$router.go(0)"
                  >确认</el-button
                >
              </span>
            </template>
          </el-dialog>

          <el-dialog v-model="errVis" title="提示" width="30%" center>
            <span>修改失败</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="(errVis = false), this.$router.go(0)"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  @click="(errVis = false), this.$router.go(0)"
                  >确认</el-button
                >
              </span>
            </template>
          </el-dialog>
          <el-dialog v-model="confirmVisible" title="加入科室" width="30%">
            <el-form
              ref="addForm"
              :model="addForm"
              status-icon
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="医院" prop="hospitalName">
                <el-select
                  v-model="addForm.hospitalName"
                  placeholder="请选择医院"
                  @change="loadDept"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.hospitalId"
                    :label="item.hospitalName"
                    :value="item.hospitalId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="科室" prop="deptName">
                <el-autocomplete
                  v-model="addForm.deptName"
                  :fetch-suggestions="querySearch"
                  class="inline-input"
                  placeholder="请输入科室名"
                  @select="handleSelect"
                />
              </el-form-item>
              <el-form-item label="验证码" prop="verify">
                <el-input
                  v-model="addForm.verify"
                  type="text"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="choseDept">确定</el-button>
              </span>
            </template>
          </el-dialog>
          <div>
            <el-row>
              <el-col :span="12">
                <div>
                  <h3>用户头像</h3>
                </div>
                <div class="image">
                  <img :src="img" class="pic" />
                </div>
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
                    <el-form
                      :model="mForm"
                      :rules="mFormRules"
                      label-width="100px"
                    >
                      <el-form-item prop="username" label="用户名 ">
                        <el-input
                          v-model="mForm.username"
                          :readonly="true"
                          placeholder="请输入您的用户名"
                        >
                        </el-input>
                      </el-form-item>

                      <el-form-item prop="name" label="姓名 ">
                        <el-input
                          v-model="mForm.name"
                          :readonly="false"
                          placeholder="请输入您的姓名"
                        >
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="password" label="密码 ">
                        <el-input
                          v-model="mForm.password"
                          :readonly="false"
                          placeholder="请输入您的新密码"
                        >
                        </el-input>
                      </el-form-item>

                      <el-form-item prop="intro" label="介绍 ">
                        <el-input
                          v-model="mForm.intro"
                          :readonly="false"
                          placeholder="请输入简介"
                        >
                        </el-input>
                      </el-form-item>
                      <el-form-item label="头像 ">
                        <el-upload
                          class="upload-demo"
                          action="#"
                          :on-change="this.checkType"
                          :auto-upload="false"
                          multiple
                          typeof="file"
                          :limit="1"
                        >
                          <el-icon class="el-icon--upload"
                            ><upload-filled
                          /></el-icon>
                          <div class="el-upload__text">
                            请拖拽文件或者 <em>点击上传</em>
                          </div>
                          <template #tip>
                            <div class="el-upload__tip">
                              jpg/png 文件大小不要超过 500kb
                            </div>
                          </template>
                        </el-upload>
                      </el-form-item>
                    </el-form>
                  </div>

                  <div v-if="isTable" class="modify">
                    <el-button
                      disabled="mForm.password.required"
                      type="primary"
                      @click="edit"
                      >编辑个人信息</el-button
                    ><el-button
                      disabled="mForm.password.required"
                      type="primary"
                      @click="confirmVisible = true"
                      >更改医院科室</el-button
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
      addForm: {},
      depts: [],
      confirmVisible: false,
      finishVis: false,
      errVis: false,
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
      mForm: {
        username: "",
        name: "",
        password: "",
        department_name: "",
        hospital_id: "",
        intro: "",
      },
      deptlist: [],
      mFormRules: {
        //用户名
        name: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          {
            min: 2,
            message: "长度需要大于等于2个字符",
            trigger: "blur",
          },
        ],

        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        intro: [
          { required: true, message: "请输入简介", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      options: [],
      isTable: true,
      d_satoken: "",
      user_name: "",
      name: "",
      intro: "",
      department_name: "",
      hospital_name: "",
      hospital_id: "",
      img: "",
      password: "",
      uploadFile: "",
    };
  },
  methods: {
    checkType(file, fileList) {
      this.uploadFile = file;
    },
    querySearch(queryString, cb) {
      var depts = this.depts;
      var results = queryString
        ? depts.filter(this.createFilter(queryString))
        : depts;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (dept) => {
        return (
          dept.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    showMaterial(domain, index) {
      console.log(domain.url);
      window.open(domain.url);
    },
    async loadHospital() {
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("d_satoken"));

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      var res;
      await fetch(
        "four/hospitals?filter=",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);
      this.options = res.data;
      console.log(this.options);
    },
    async loadDept() {
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("d_satoken"));

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      var depts = [],
        res;
      await fetch(
        "four/hospitals/" +
          this.addForm.hospitalName +
          "/departments",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);

      console.log(res);
      for (var i = 0; i < res.data.length; i++) {
        depts.push({
          value: res.data[i].departmentName,
        });
      }
      console.log(depts);
      this.depts = depts;
    },

    async choseDept() {
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("d_satoken"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        department_name: this.addForm.deptName,
        hospital_id: this.addForm.hospitalName,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      var res;
      await fetch(
        "four/doctor/?code=" + this.addForm.verify,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);
      if (res.msg == "修改成功") {
        this.confirmVisible = false;
        this.tableData[2].content = this.addForm.deptName;
        for (let i = 0; i < this.options.length; i++) {
          if (this.addForm.hospitalName == this.options[i].hospitalId)
            this.tableData[3].content = this.options[i].hospitalName;
        }
      } else {
        this.$message.error("医院或科室或验证码有误请重新输入");
      }
    },
    handleSelect(item) {
      console.log(item);
    },

    async submit() {
      var myHeaders1 = new Headers();
      var satoken = localStorage.getItem("h_satoken");
      myHeaders1.append("satoken", satoken);
      //myHeaders.append("Content-Type", "multipart/form-data");
      var formdata = new FormData();
      formdata.append("file", this.uploadFile.raw, this.uploadFile.name);

      var requestOptions1 = {
        method: "POST",
        headers: myHeaders1,
        body: formdata,
        redirect: "follow",
      };
      var res1;
      await fetch("four/files/actions/upload", requestOptions1)
        .then((response) => response.text())
        .then((result) => (res1 = result))
        .catch((error) => console.log("error", error));
      res1 = JSON.parse(res1);
      var tmpimg= res1.data;
      

      var res;
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("satoken", localStorage.getItem("d_satoken"));

      var raw = JSON.stringify({
        name: this.mForm.name,
        intro: this.mForm.intro,
        password: this.mForm.password,
        img: tmpimg,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("four/doctors", requestOptions)
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);
      if (res.code == 200) {
        this.img=tmpimg;
        this.finishVis = true;
      } else {
        this.errVis = true;
      }
    },
    updateTable() {
      this.tableData[0].content = this.user_name;
      this.tableData[1].content = this.name;
      this.tableData[2].content = this.department_name;
      this.tableData[3].content = this.hospital_name;

      this.mForm.username = this.user_name;
      this.mForm.name = this.name;
      this.mForm.password = "123456";
      this.mForm.department_name = this.department_name;
      this.mForm.hospital_id = this.hospital_name;
      this.mForm.intro = this.intro;
    },
    async getdept() {
      this.deptlist = [];
      var dname = "a";
      var hospitalId = "d";
      var res;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      myHeaders.append("satoken", localStorage.getItem("d_satoken"));
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      await fetch(
        "four/hospitals/" +
          this.mForm.hospital_id +
          "/departments",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);

      if (res.code != 200) {
        console.log("fail to get dept");
        // for (let i = 0; i < res.data.length; i++) {
        //   this.deptlist[i] = res.data[i].departmentName;
        // }
      } else {
        for (let i = 0; i < res.data.length; i++) {
          this.deptlist[i] = res.data[i].departmentName;
        }
      }
      console.log(this.deptlist);
    },
    edit() {
      console.log(this.hospital_id);
      this.mForm.hospital_id = "1";
      this.isTable = !this.isTable;
      this.getdept();
    },
    returnback() {
      this.isTable = !this.isTable;
    },
    async getInfo() {
      this.d_satoken = localStorage.getItem("d_satoken");
      await fetch("four/doctors", {
        headers: {
          satoken: this.d_satoken,
          credentials: "include",
        },
      })
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
          this.hospital_id = res.hospital_id;
          if(res.img==''||res.img==null)
          this.img = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
          else
          this.img=res.img;

        })
        .catch((err) => {
          console.log(err);
        });
      this.updateTable();
    },
  },
  created() {
    this.getInfo();
    this.loadHospital();
  },
};
</script>

<style scoped>
.modify {
  margin-top: 20px;
  margin-left: 20%;
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