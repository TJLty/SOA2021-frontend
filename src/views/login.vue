<template>
  <div class="login_container" style="width: 99vw; height: 97vh">
    <div>
      <div class="login_header">
        <h1>医生办公室预约系统</h1>
      </div>

      <div class="login_box">
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

          <el-form-item>
            <el-button type="primary" style="width: 70%" @click="login"
              >登录</el-button
            >
            <el-checkbox v-model="loginForm.checked">我是医生</el-checkbox>
          </el-form-item>
          <!-- <div class="tips">
        <span style="margin-right: 20px">user_id: admin</span>
        <span> password: any</span>
      </div> -->

          <el-form-item>
            <el-button
              type="success"
              @click="goRegister"
              style="width: 48.55%; margin-left: 0px"
              >去注册</el-button
            >
            <el-button
              type="info"
              @click="goFindPwd"
              style="width: 48.55%; margin-left: 10px"
              >忘记密码？</el-button
            >
          </el-form-item>

          <!-- <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, User, Lock } from "@element-plus/icons";

export default {
  components: {
    Search,
    User,
    Lock,
  },
  data() {
    return {
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
    };
  },
  methods: {
    async login() {
      var myHeaders = new Headers();
      //myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(this.loginForm);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: "include",
        redirect: "follow",
      };
      var res;
      if (!this.loginForm.checked) {
        await fetch("http://220.179.227.205:6015/patient/login", requestOptions)
          .then((response) => response.text())
          .then((result) => (res = result))
          .catch((error) => console.log("error", error));
        res = JSON.parse(res);
        //console.log(this.loginForm)

        if (res.status !== 1) {
          return this.$message.error("登陆失败");
        } else {
          this.$message.success("登陆成功");
          console.log(this.loginForm);
          window.localStorage.setItem("username", this.loginForm.username);

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
        } else {
          this.$message.success("登陆成功");

          console.log(res);
          window.localStorage.setItem("username", this.loginForm.username);

          this.$router.push("/dinfo");
        }
      }
    },
  },
};
</script>


<style scoped>
.login_container {
  background: url("../assets/back-login.jpg");
  background-size: 100%, 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center, center;
  max-width: 100vw;
  max-height: 100vh;
}
.login_header {
  position: absolute;
  left: 40%;
  top: 10%;
}
.login_box {
  width: 450px;
  height: 280px;
  background-color: #e4e3e3;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>