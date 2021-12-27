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
          <!-- <div class="piccontainer">
            <img :src="img" class="pic" />
          </div>

          <div class="pic" style="margin-left: 20px; margin-top: 20px">
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
          </div>
          <div class="info">
            <div class="info-row">
              <div class="user-info-label">用户名</div>
              <div class="user-info">{{ user_name }}</div>
            </div>
      
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
          </div> -->
          <!-- <div>
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
                      style="width: 80%; margin-top: 20px"
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
                      <el-form-item label="手机号  ">
                        <el-input v-model="tel_num" :readonly="false"></el-input>
                      </el-form-item>
                      <el-form-item label="地址   ">
                        <el-input v-model="address" :readonly="false"></el-input>
                      </el-form-item>

                      <el-form-item label="总预约数 ">
                        <el-input
                          v-model="total_res"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="未执行预约">
                        <el-input
                          v-model="unfinished_res"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="性别    ">
                        <el-input v-model="sex" :readonly="true"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>

                  <div v-if="isTable" class="modify">
                    <el-button type="primary" @click="edit"
                      >编辑个人信息</el-button
                    >
                  </div>
                  <div v-if="!isTable" class="modify">
                    <el-button type="primary" @click="submit"
                      >提交</el-button
                    >
                    <el-button @click="returnback">取消</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
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
                          placeholder="请输入您的姓名"
                        >
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="sex" label="性别 ">
                        <el-input
                          v-model="mForm.sex"
                          :readonly="false"
                          placeholder="请输入您的新密码"
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

      mForm: {

        phone:"",
        address:"",
        sex:"",
        img:"",
        
      },
      mFormRules: {
        //用户名
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max:11,
            message: "长度需要等于11个字符",
            trigger: "blur",
          },
        ],

        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min:1,
           
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
      tel_num: "",
      address: "",
      total_res: "",
      unfinished_res: "",
      sex: "",

      img: "",
    };
  },
  methods: {
    checkType(file, fileList) {
      this.uploadFile = file;
    },
    createFilter(queryString) {
      return (dept) => {
        return (
          dept.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    updateData() {
      this.tableData[0].content = this.user_name;
      this.tableData[1].content = this.tel_num;
      this.tableData[2].content = this.address;
      this.tableData[3].content = this.total_res;
      this.tableData[4].content = this.unfinished_res;
      this.tableData[5].content = this.sex;

      this.mForm.phone = this.tel_num;
      this.mForm.address = this.address;
      this.mForm.sex = this.sex;
      this.mForm.img = this.img;
      
    },
    edit() {
      this.isTable = !this.isTable;
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