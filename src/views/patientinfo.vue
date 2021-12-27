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

          <el-dialog v-model="changepassVis" title="修改密码" width="30%">
            <el-form
              ref="addForm"
              :model="addForm"
              status-icon
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
               <el-input
                  v-model="addForm.username"
                  type="text"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="新密码" prop="password">
                <el-input
                  v-model="addForm.password"
                  type="text"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

            </el-form>

            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="changepassword">确定</el-button>
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
                      <el-form-item label="请输入用户名 ">
                        <el-input
                          v-model="validation"
                          :readonly="false"
                          placeholder="请输入您的用户名"
                        >
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="phone" label="手机号 ">
                        <el-input
                          v-model="mForm.phone"
                          :readonly="false"
                          placeholder="请输入您的手机号"
                        >
                        </el-input>
                      </el-form-item>

                      <el-form-item prop="address" label="地址 ">
                        <el-input
                          v-model="mForm.address"
                          :readonly="false"
                          placeholder="请输入您的地址"
                        >
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="sex" label="性别 ">
                        <el-select v-model="mForm.sex" placeholder="请选择性别">
                          <el-option
                            v-for="item in sexoptions"
                            :key="item.sex"
                            :label="item.sex"
                            :value="item.sexboolean"
                          >
                          </el-option>
                        </el-select>
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
                    >
                    <el-button
                      disabled="mForm.password.required"
                      type="primary"
                      @click="changepassVis=true"
                      >修改密码</el-button
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
import { Search } from "@element-plus/icons";

export default {
  components: {
    Header,
    Aside,
    Search,
  },
  data() {
    return {
      addForm:{},
      changepassVis:false,
      validation: "",
      finishVis: false,
      errVis: false,
      sexoptions: [
        {
          sex: "男",
          sexboolean: true,
        },
        {
          sex: "女",
          sexboolean: false,
        },
      ],
      mForm: {
        phone: "",
        address: "",
        sex: "",
        img: "",
      },
      mFormRules: {
        //用户名
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度需要等于11个字符",
            trigger: "blur",
          },
        ],

        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 1,

            // message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
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
          title: "手机号",
          content: "",
        },
        {
          title: "地址",
          content: "",
        },
        {
          title: "总预约数",
          content: "",
        },
        {
          title: "未执行预约",
          content: "",
        },
        {
          title: "性别",
          content: "",
        },
      ],
      isTable: true,

      p_satoken: "",

      user_name: "",
      name: "",
      tel_num: "",
      address: "",
      total_res: "",
      unfinished_res: "",
      sex: "",
      uploadFile: "",
      img: "",
    };
  },
  methods: {
    checkType(file, fileList) {
      this.uploadFile = file;
    },
    async submit() {
      console.log(this.validation);
      if (this.validation == "") {
        this.errVis = true;
      } else {
        var myHeaders1 = new Headers();
        var satoken = localStorage.getItem("p_satoken");
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
        var img = res1.data;

        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("satoken", localStorage.getItem("p_satoken"));

        var raw = JSON.stringify({
          phone: this.mForm.phone,
          pimg: img,
          address: this.mForm.address,
          sex: this.mForm.sex,
        });

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        var res;
        console.log("four/patients/" + this.validation);
        await fetch(
          "four/patients/" + this.validation,
          // "four/patients/1950698",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => (res = result))
          .catch((error) => console.log("error", error));
        res = JSON.parse(res);
        if (res.code == 200) {
          this.finishVis = true;
          this.img = img;
        } else {
          this.errVis = true;
        }
      }
    },
    updateData() {
      this.tableData[0].content = this.user_name;
      this.tableData[1].content = this.name;
      this.tableData[2].content = this.tel_num;
      this.tableData[3].content = this.address;
      this.tableData[4].content = this.total_res;
      this.tableData[5].content = this.unfinished_res;
      this.tableData[6].content = this.sex;

      this.mForm.phone = this.tel_num;
      this.mForm.address = this.address;
      this.mForm.sex = this.sex;
      this.mForm.img = this.img;
    },
    edit() {
      this.isTable = !this.isTable;
    },
    async changepassword() {
      var res1;
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");
       myHeaders.append("satoken", localStorage.getItem("p_satoken"));

      var raw = JSON.stringify({
        password: this.addForm.password,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("four/patients/"+this.addForm.username, requestOptions)
        .then((response) => response.text())
        .then((result) => (res1=result))
        .catch((error) => console.log("error", error));
       res1 = JSON.parse(res1);
        if(res1.code==200){
          console.log(1)
          this.changepassVis=false
          this.$message.success("修改成功");
        }
        else
         {console.log(0);
         this.$message.error("用户名有误请重新输入");
         this.changepassVis=false}

    },
    returnback() {
      this.isTable = !this.isTable;
    },
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
        "four/patients/" + localStorage.getItem("username"),
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
      }

      await fetch(
        "four/appointments/details/actions/count?future=true&history=true",
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
        "four/appointments/details/actions/count?future=true&history=false",
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
        (this.name = res1.data.name),
        console.log(res1.data.sex);
      if (res1.data.sex == false) this.sex = "女";
      else if (res1.data.sex == true) this.sex = "男";
      else this.sex = "不明";

      this.total_res = res2.data;

      this.img = res1.data.pimg;
      console.log(this.img);

      this.unfinished_res = res3.data;
      this.updateData();
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
  height: 50%;
  width: 50%;
  margin-top: 50px;
  margin-left: 2.2cm;
}
#content {
  float: left;
  height: 50%;
  width: 100%;
  margin-top: 30px;
  /* margin-left: 2.2cm; */
}
.piccontainer {
  /* top: 50px; */
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
.modify {
  margin-top: 20px;
  margin-left: 25%;
}
</style>