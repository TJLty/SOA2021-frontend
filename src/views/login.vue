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
        <div style="flex: 1"></div>
        <div style="width: 80px">
          <el-button type="primary" @click="changelog" v-if="log">
            去注册
          </el-button>
          <el-button type="primary" @click="changelog" v-if="!log">
            去登陆
          </el-button>
        </div>
      </div>
    </el-header>
    <div class="login_container" style="width: 95vw; height: 87vh">
      <div>
        <!-- <div class="login_header">
        <h1 style="width: 200px; padding-left: 10px;font-weight: bold;font-size: larger;color:#409EFF">医生办公室预约系统</h1>
      </div> -->

        <el-card v-if="log" class="login_box">
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
              <el-input
                v-model="loginForm.username"
                placeholder="请输入您的用户ID"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="请输入您的用户密码"
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
                <el-button style="width: 90%" type="primary" @click="login"
                  >登录</el-button
                >
              </el-col>
              <el-col :span="12">
                <el-switch
                  v-model="loginForm.checked"
                  active-text="我是医生"
                  inactive-text="我是患者"
                  >我是医生</el-switch
                >
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <el-card v-if="!log" class="login_box">
          <h2 class="l1">注册</h2>
          <!-- 注册表单 -->
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
                  v-model="loginForm.checked"
                  active-text="我是医生"
                  inactive-text="我是患者"
                  >我是医生</el-switch
                >
              </el-col>
            </el-row>
          </el-form>
        </el-card>
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
      log: true,
      satoken: "",
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
          { required: true, message: "请输入用户ID", trigger: "blur" },
          {
            min: 2,
            message: "长度需要大于2个字符",
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
      },

      resForm: {
        checked: true,
        userID: "",
        username: "",
        password: "",
        confirmpassword:"",
      },
      //注册表单验证对象
      resFormRules: {
        //身份证号
        userID: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "长度需要等于18个字符",
            trigger: "blur",
          },
        ],

        //用户名
        username: [
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
        confirmpassword: [
          { required: true, message: "请确认用户密码", trigger: "blur" },
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
    async login() {
      var myHeaders = new Headers();
      //myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(this.loginForm);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      var res;
      if (!this.loginForm.checked) {
        await fetch(
          "http://220.179.227.205:6015/patients/login",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => (res = result))
          .catch((error) => console.log("error", error));
        res = JSON.parse(res);
        //console.log(this.loginForm)

        if (res.code != 200) {
          return this.$message.error("登陆失败");

          localStorage.removeItem("satoken");
        } else {
          this.$message.success("登陆成功");
          console.log(this.loginForm);
          window.localStorage.setItem("username", this.loginForm.username);
          this.satoken = res.data.tokenValue;
          localStorage.removeItem("satoken");
          localStorage.setItem("satoken", this.satoken);
          console.log(res.data.tokenValue);
          this.$router.push("/hospital");
        }
      } else {
        await fetch("http://220.179.227.205:6019/doctor/login", requestOptions)
          .then((response) => response.text())
          .then((result) => (res = result))
          .catch((error) => console.log("error", error));
        res = JSON.parse(res);
        console.log(res);

        if (res.code !== 200) {
          return this.$message.error("登陆失败");

          localStorage.removeItem("satoken");
        } else {
          this.$message.success("登陆成功");
          console.log(this.loginForm);
          window.localStorage.setItem("username", this.loginForm.username);
          this.satoken = res.data.tokenValue;
          localStorage.removeItem("satoken");
          localStorage.setItem("satoken", this.satoken);
          console.log(res.data.tokenValue);
          this.$router.push("/handing");
        }
      }
    },
    async register() {
      window.confirm("注册成功");
    },
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
  shadow: "hover";
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