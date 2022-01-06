<template>
  <div class="all">
    <el-header style="height: 10vh">
      <div
        style="
          height: 10vh;
          width: 95vw;
          line-height: 10vh;
          border-bottom: 1px solid #ccc;
          display: flex;
          min-height: 50px;
        "
      >
        <div
          style="
            width: 200px;
            padding-left: 10px;
            font-weight: bold;
            font-size: larger;
            color: #409eff;
          "
        >
          医院预约挂号平台
        </div>
      </div>
    </el-header>
    <div class="login_container" style="width: 95vw; height: 87vh">
      <div>
        <el-card v-if="log" class="login_box" shadow="hover">
          <h2 class="l1">登录</h2>
          <h2 class="l2">欢迎登录本系统</h2>
          <!-- 登陆表单 -->
          <el-form
            ref="loginFormRef111"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
          >
            <el-form-item prop="username">
              <!-- <el-input
                v-model="loginForm.username"
                placeholder="请输入医院名称"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><User /></el-icon>
                </template>

              
              </el-input> -->
              <el-select
                style="width: 100%"
                v-model="hospital_name"
                placeholder="请输入医院名称"
              >
                <el-option label="上海长海医院" value="1"></el-option>
                <el-option
                  label="上海交通大学医学院附属仁济医院"
                  value="2"
                ></el-option>
                <el-option
                  label="上海交通大学医学院附属瑞金医院"
                  value="3"
                ></el-option>
                <el-option
                  label="上海交通大学医学院附属仁济医院东院"
                  value="5"
                ></el-option>
                <el-option
                  label="上海交通大学医学院附属瑞金医院北院"
                  value="6"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-row
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-col :span="24">
                <el-button style="width: 100%" type="primary" @click="login"
                  >登录</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <!-- <el-card v-if="!log" class="login_box" shadow="hover">
          <h2 class="l1">注册</h2>
         
          <el-form
            ref="loginFormRef111"
            :model="resForm"
            :rules="resFormRules"
            label-width="0px"
            class="register_form"
          >
            <el-form-item prop="username">
              <el-input
                v-model="resForm.username"
                placeholder="请输入您的姓名"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="userID">
              <el-input
                v-model="resForm.userID"
                placeholder="请输入您的身份证号作为ID"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="resForm.password"
                placeholder="请输入您的用户密码"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="confirmpassword">
              <el-input
                type="password"
                v-model="resForm.confirmpassword"
                placeholder="请确认您的用户密码"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-row
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-col :span="12">
                <el-button style="width: 90%" type="primary" @click="register"
                  >注册</el-button
                >
              </el-col>

              <el-col :span="12">
                <el-switch
                  v-model="resForm.checked"
                  active-text="注册医生"
                  inactive-text="注册患者"
                  
                  >我是医生</el-switch
                >
              </el-col>
            </el-row>
          </el-form>
        </el-card> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Search, User, Lock, Avatar } from "@element-plus/icons";

export default {
  components: {
    Search,
    User,
    Lock,

    Avatar,
  },
  data() {
    return {
      hospital_name: "",
      log: true,
      h_satoken: "",
      //数据绑定对象
      loginForm: {
        checked: true,
        username: "",
        password: "",
      },
      //表单验证对象
      loginFormRules: {
        //用户名
        username: [
          { required: true, message: "请输入医院名称", trigger: "blur" },
          {
            min: 2,
            message: "长度需要大于2个字符",
            trigger: "blur",
          },
        ],

        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    changelog() {
      this.log = !this.log;
    },
    // async login() {
    //   var myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");

    //   var raw = JSON.stringify(this.loginForm);

    //   var requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow",
    //   };
    //   var res;

    //   await fetch("http://220.179.227.205:6015/patients/login", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => (res = result))
    //     .catch((error) => console.log("error", error));
    //   res = JSON.parse(res);
    //   //console.log(this.loginForm)

    //   if (res.code != 200) {
    //     return this.$message.error("登陆失败");

    //     localStorage.removeItem("h_satoken");
    //   } else {
    //     this.$message.success("登陆成功");
    //     console.log(this.loginForm);
    //     window.localStorage.setItem("username", this.loginForm.username);
    //     this.h_satoken = res.data.tokenValue;
    //     localStorage.removeItem("h_satoken");
    //     localStorage.setItem("h_satoken", this.h_satoken);
    //     console.log(res.data.tokenValue);
    //     this.$router.push("/hospital");
    //   }
    // },

    async login() {
      var res;
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        hospitalId: this.hospital_name,
        password: this.loginForm.password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

     await fetch("http://220.179.227.205:6014/api/v1/hospitals/login", requestOptions)
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);
      if (res.code != 200) {
        return this.$message.error("登陆失败");

        localStorage.removeItem("h_satoken");
      } else {
        this.$message.success("登陆成功");
        window.localStorage.setItem("hospital_login_id", this.hospital_name);
        this.satoken = res.data.tokenValue;
        localStorage.removeItem("h_satoken");
        localStorage.setItem("h_satoken", this.satoken);
        console.log(res.data.tokenValue);
        this.$router.push("/doctor-manage");
      }
    },
    // async register() {
    //   window.confirm("注册成功");
    // },
  },
};
</script>


<style scoped>
.login_container {
  background-size: 100%, 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center, center;
  max-width: 100vw;
  max-height: 100vh;
}
.all {
  background: url("../assets/Pfizer-Brand-Motif-09 2.jpg");
}
.login_header {
  position: absolute;
  left: 40%;
  top: 20%;
}
.l1 {
  position: absolute;
  left: 44%;
  top: 10%;
  color: #409eff;
}
.l2 {
  position: absolute;
  left: 35%;
  top: 30%;
  font-weight: bold;
  font-size: larger;
  color: #409eff;
}
.login_box {
  width: 450px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(60%, -50%);
}

.login_form {
  position: absolute;
  top: 50%;
  width: 80%;
  left: 10%;

  box-sizing: border-box;
}
.register_form {
  position: absolute;
  top: 30%;
  width: 80%;
  left: 10%;

  box-sizing: border-box;
}
.el-header {
  background-color: #ffffff;
}
</style>