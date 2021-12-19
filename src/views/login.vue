<template>
  <div>
    <el-dialog title="用户注册" v-model="dialogFormVisibleClient" width="80%">
      <el-form
        label-position="left"
        label-width="150px"
        :model="clientForm"
        :rules="clientFormRules"
        ref="clientRegisterRef"
      >
        <el-form-item label="客户ID：" prop="client_id">
          <el-input v-model="clientForm.client_id"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="client_name">
          <el-input v-model="clientForm.client_name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别：" >
            <el-input v-model="clientForm.client_sex"></el-input>
          </el-form-item> -->
        <el-form-item label="性别：" prop="client_sex">
          <!-- <el-input v-model="staffForm.staff_sex"></el-input> -->
          <el-select
            v-model="clientForm.client_sex"
            placeholder="请选择您的性别"
          >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="生日：" >
            <el-input v-model="clientForm.client_birthday"></el-input>
          </el-form-item> -->
        <el-form-item label="生日：" prop="client_birthday">
          <el-date-picker
            type="date"
            placeholder="选择输入您的生日"
            value-format="yyyy-MM-dd"
            v-model="clientForm.client_birthday"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="电话号码：" prop="client_mobile">
          <el-input v-model="clientForm.client_mobile"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="client_idCard">
          <el-input v-model="clientForm.client_idCard"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="clientForm.password"></el-input>
        </el-form-item>
        <el-form-item label="密保问题：" prop="security_q">
          <el-input v-model="clientForm.security_q"></el-input>
        </el-form-item>
        <el-form-item label="密保答案：" prop="s_q_answer">
          <el-input v-model="clientForm.s_q_answer"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="position: absolute; width: 100px"
            @click="saveClient()"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="员工注册" v-model="dialogFormVisibleStaff" width="80%">
      <el-form
        label-position="left"
        label-width="160px"
        :rules="staffFormRules"
        ref="staffRegisterRef"
        :model="staffForm"
      >
        <el-form-item label="员工ID：" prop="staff_id">
          <el-input v-model="staffForm.staff_id"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名：" prop="staff_name">
          <el-input v-model="staffForm.staff_name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别：">
            <el-input v-model="staffForm.staff_sex"></el-input>
          </el-form-item> -->
        <el-form-item label="性别：" prop="staff_sex">
          <!-- <el-input v-model="staffForm.staff_sex"></el-input> -->
          <el-select v-model="staffForm.staff_sex" placeholder="请选择您的性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年龄：" prop="staff_age">
          <el-input v-model.number="staffForm.staff_age"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="staff_identity_card_number">
          <el-input v-model="staffForm.staff_identity_card_number"></el-input>
        </el-form-item>
        <el-form-item label="住址：" prop="staff_address">
          <el-input v-model="staffForm.staff_address"></el-input>
        </el-form-item>
        <el-form-item label="部门：" prop="staff_department">
          <el-input v-model="staffForm.staff_department"></el-input>
        </el-form-item>
        <el-form-item label="职位：" prop="staff_position">
          <el-input v-model="staffForm.staff_position"></el-input>
        </el-form-item>
        <el-form-item label="入职日期：" prop="staff_entry_date">
          <el-date-picker
            type="date"
            placeholder="选择入职日期"
            value-format="yyyy-MM-dd"
            v-model="staffForm.staff_entry_date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="用户密码：" prop="password">
          <el-input v-model="staffForm.password"></el-input>
        </el-form-item>
        <el-form-item label="密保问题：" prop="security_q">
          <el-input v-model="staffForm.security_q"></el-input>
        </el-form-item>
        <el-form-item label="密保答案：" prop="s_q_answer">
          <el-input v-model="staffForm.s_q_answer"></el-input>
        </el-form-item>
        <el-form-item label="身份验证：" prop="staff_secret_key">
          <el-input v-model="staffForm.staff_secret_key"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="position: absolute; width: 100"
            @click="saveStaff()"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="身份选择" v-model="dialogFormVisible" width="30%">
      <el-form label-position="left" label-width="160px">
        <br /><br />
        <el-button
          type="primary"
          style="text-align: center; margin-bottom: 30px; width: 120px"
          @click="addClient"
          >用户
        </el-button>
        <el-button
          type="primary"
          @click="addStaff"
          style="
            text-align: center;
            float: right;
            margin-bottom: 30px;
            width: 120px;
          "
          >医生</el-button
        >
        <br /><br />
      </el-form>
    </el-dialog>
    <el-dialog
      title="请输入您的ID"
      v-model="dialogFormVisibleRetrieve"
      width="30%"
    >
      <el-form
        label-position="left"
        label-width="100px"
        :model="getSQForm"
        :rules="getSQFormRules"
        ref="getSQRef"
      >
        <el-form-item label="用户ID：" prop="user_id">
          <el-input v-model="getSQForm.user_id"></el-input>
        </el-form-item>

        <el-form-item
          ><el-button
            type="primary"
            @click="confirmID"
            style="text-align: center; float: right; width: 120px"
            >提交</el-button
          ></el-form-item
        >
      </el-form>
    </el-dialog>
    <el-dialog
      title="请验证您的密保问题并输入新密码："
      v-model="dialogFormVisibleConfirm"
      width="50%"
    >
      <el-form
        label-position="left"
        label-width="170px"
        :model="newPwdForm"
        :rules="newPwdFormRules"
        ref="newPwdRef"
      >
        <el-form-item label="您的密保问题为：">
          <el-input
            readonly="true"
            v-model="getSQForm.security_q"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="请输入您的密保答案：" prop="s_q_answer">
          <el-input
            v-model="newPwdForm.s_q_answer"
            placeholder="密保答案"
          ></el-input>
        </el-form-item>
        <el-form-item label="请输入您的新密码：" prop="user_password">
          <el-input
            v-model="newPwdForm.user_password"
            placeholder="新密码"
          ></el-input>
        </el-form-item>

        <el-form-item
          ><el-button
            type="primary"
            @click="updatePwd"
            style="text-align: center; float: right; width: 120px"
            >提交</el-button
          ></el-form-item
        >
      </el-form>
    </el-dialog>
  </div>
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
        <el-dropdown>
          <el-button type="primary">
            <el-icon><avatar /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goRegister">注册</el-dropdown-item>
              <el-dropdown-item @click="goFindPwd">找回密码</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
  <div class="login_container" style="width: 95vw; height: 87vh">
    <div>
      <!-- <div class="login_header">
        <h1 style="width: 200px; padding-left: 10px;font-weight: bold;font-size: larger;color:#409EFF">医生办公室预约系统</h1>
      </div> -->

      <el-card class="login_box">
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
            style="display: flex; align-items: center; justify-content: center"
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
          <!-- <el-form-item>
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
          </el-form-item> -->
        </el-form>
      </el-card>
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
      satoken: "",
      dialogFormVisible: false,
      dialogFormVisibleClient: false,
      dialogFormVisibleStaff: false,
      dialogFormVisibleRetrieve: false,
      dialogFormVisibleConfirm: false,

      getSQForm: {
        user_id: "",
        security_q: "",
      },

      getSQFormRules: {
        user_id: [
          {
            required: true,
            message: "需要您的用户ID来进行下一步",
            trigger: "blur",
          },
        ],
        security_q: [],
      },

      newPwdForm: {
        s_q_answer: "",
        user_password: "",
      },
      newPwdFormRules: {
        s_q_answer: [
          {
            required: true,
            message: "请输入您的密保答案",
            trigger: "blur",
          },
        ],
        user_password: [
          {
            required: true,
            message: "请输入您的新密码",
            trigger: "blur",
          },
        ],
      },

      clientForm: {
        client_id: "",
        client_name: "",
        client_sex: "",
        client_birthday: "",
        client_mobile: "",
        client_idCard: "",
        password: "",
        security_q: "",
        s_q_answer: "",
      },
      clientFormRules: {
        client_id: [
          {
            required: true,
            message: "请设置您的客户ID",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        client_name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        client_sex: [
          { required: true, message: "请输入您的性别", trigger: "blur" },
          {
            type: "enum",
            enum: ["男", "女"],
            message: "性别只能是男和女",
            trigger: "blur",
          },
        ],
        client_birthday: [
          { required: true, message: "请输入您的生日", trigger: "blur" },
        ],
        client_mobile: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
        ],
        client_idCard: [
          { required: true, message: "请输入您的身份证号", trigger: "blur" },
          {
            len: 18,
            message: "请输入有效的身份证号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入需要设置的密码",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        security_q: [
          {
            required: true,
            message: "请输入需要设置的密保问题",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        s_q_answer: [
          {
            required: true,
            message: "请输入需要设置的密保答案",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
      },
      staffForm: {
        staff_id: "",
        staff_name: "",
        staff_sex: "",
        staff_age: "",
        staff_identity_card_number: "",
        staff_address: "",
        staff_department: "",
        staff_position: "",
        staff_entry_date: "",
        password: "",
        security_q: "",
        s_q_answer: "",
        staff_secret_key: "",
      },
      staffFormRules: {
        staff_id: [
          {
            required: true,
            message: "请设置您的医生ID",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10个字符",
            trigger: "blur",
          },
        ],
        staff_name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          {
            max: 10,
            message: "长度不能大于10个字符",
            trigger: "blur",
          },
        ],
        staff_sex: [
          { required: true, message: "请输入您的性别", trigger: "blur" },
          {
            type: "enum",
            enum: ["男", "女"],
            message: "性别只能是男和女",
            trigger: "blur",
          },
        ],
        staff_age: [
          { required: true, message: "请输入您的年龄", trigger: "blur" },
          {
            type: "number",
            min: 16,
            max: 65,
            message: "年龄需要在16～65周岁之间",
            trigger: "blur",
          },
        ],
        staff_identity_card_number: [
          { required: true, message: "请输入您的身份证号码", trigger: "blur" },
          {
            len: 18,
            message: "请输入有效的身份证号",
            trigger: "blur",
          },
        ],
        staff_address: [
          { required: true, message: "请输入您的住址", trigger: "blur" },
          {
            max: 30,
            message: "长度不能大于30",
            trigger: "blur",
          },
        ],
        staff_department: [
          { required: true, message: "请输入您的医院", trigger: "blur" },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        staff_position: [
          { required: true, message: "请输入您的职位", trigger: "blur" },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        staff_entry_date: [
          { required: true, message: "请输入您的入职日期", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入需要设置的密码",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        security_q: [
          {
            required: true,
            message: "请输入需要设置的密保问题",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        s_q_answer: [
          {
            required: true,
            message: "请输入需要设置的密保答案",
            trigger: "blur",
          },
          {
            max: 10,
            message: "长度不能大于10",
            trigger: "blur",
          },
        ],
        staff_secret_key: [
          {
            required: true,
            message: "请输入需要您的邀请密钥",
            trigger: "blur",
          },
        ],
      },
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
    saveClient() {
      this.$refs.clientRegisterRef.validate(async (validTag) => {
        if (!validTag) return;

        console.log(this.clientForm);
        const res = await this.$http.post(
          "Login/Register/Client",
          this.clientForm
        );
        console.log(res);
        if (res.status !== 200) return this.$message.error("获取数据失败");
        if (res.data.code !== 200) {
          return this.$message.error("注册失败");
        } else {
          this.$message.success("注册成功");
        }
        this.dialogFormVisibleClient = false;
      });
    },
    addClient() {
      this.dialogFormVisible = false;
      this.dialogFormVisibleClient = true;

      this.$nextTick(() => {
        this.$refs["clientRegisterRef"].clearValidate(); //重置表单状态
      });
    },
    saveStaff() {
      this.$refs.staffRegisterRef.validate(async (validTag) => {
        if (!validTag) return;
        var tempStaffForm = {
          staff_id: this.staffForm.staff_id,
          staff_name: this.staffForm.staff_name,
          staff_sex: this.staffForm.staff_sex,
          staff_age: this.staffForm.staff_age.toString(),
          staff_identity_card_number: this.staffForm.staff_identity_card_number,
          staff_address: this.staffForm.staff_address,
          staff_department: this.staffForm.staff_department,
          staff_position: this.staffForm.staff_position,
          staff_entry_date: this.staffForm.staff_entry_date,
          staff_salary: "10000",
          password: this.staffForm.password,
          security_q: this.staffForm.security_q,
          s_q_answer: this.staffForm.s_q_answer,
        };

        if (this.staffForm.staff_secret_key !== "iamastaff")
          return this.$message.error("注册失败");

        console.log(tempStaffForm);
        const res = await this.$http.post(
          "Login/Register/Staff",
          tempStaffForm
        );
        console.log(res);

        if (res.status !== 200) return this.$message.error("获取数据失败");
        if (res.data.code !== 200) {
          this.$message.success("注册失败");
        } else {
          this.$message.success("注册成功");
        }
        this.dialogFormVisibleStaff = false;
      });
    },
    async addStaff() {
      this.dialogFormVisible = false;
      this.dialogFormVisibleStaff = true;

      this.$nextTick(() => {
        this.$refs["staffRegisterRef"].clearValidate(); //重置表单状态
      });
    },
    goRegister() {
      //this.$router.push({ path: '/clientRegister' }),
      // console.log(1356);
      this.dialogFormVisible = true;
    },
    goFindPwd() {
      this.dialogFormVisibleRetrieve = true;
      // this.$router.push({ path: "/goFindPwd" });
      this.$nextTick(() => {
        this.$refs["getSQRef"].clearValidate(); //重置表单状态
      });
    },
    confirmID() {
      this.$refs.getSQRef.validate(async (validTag) => {
        if (!validTag) return;

        const res = await this.$http.get(
          "Login/Forget/" + this.getSQForm.user_id
        );
        if (res.status !== 200) return this.$message.error("获取数据失败");
        if (res.data.code !== 200 || res.data.data.security_q.length == 0) {
          return this.$message.error("获取失败");
        } else {
          this.$message.success("获取成功");
        }
        console.log(res);
        this.getSQForm.security_q = res.data.data.security_q;
        this.dialogFormVisibleRetrieve = false;
        this.dialogFormVisibleConfirm = true;

        this.newPwdForm.s_q_answer = "";
        this.newPwdForm.user_password = "";

        this.$nextTick(() => {
          this.$refs["newPwdRef"].clearValidate(); //重置表单状态
        });
      });
    },

    async updatePwd() {
      this.$refs.newPwdRef.validate(async (validTag) => {
        if (!validTag) return;

        // console.log(this.getSQForm.user_id);
        console.log(this.newPwdForm);
        const res = await this.$http.post(
          "Login/Forget/" + this.getSQForm.user_id,
          this.newPwdForm
        );

        if (res.status !== 200) return this.$message.error("获取数据失败");
        if (res.data.code !== 200) {
          return this.$message.error("重置失败");
        } else {
          this.$message.success("重置成功");
        }
        this.dialogFormVisibleConfirm = false;
      });
    },
    //点击重置按钮
    resetLoginForm() {
      console.log(this);
      // resetFields：element-ui提供的表单方法
      this.$refs.loginFormRef111.resetFields();
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
  },
};
</script>


<style scoped>
.login_container {
  background: url("../assets/Pfizer-Brand-Motif-09 2.jpg");
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
.el-header {
  background-color: #ffffff;
}
</style>