<template>
  <div>
    <el-container style="background-color: #3c3f41">
      <el-aside style="width: 230px">
        <Aside />
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <Header />
        </el-header>
        <el-main>
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
              <div class="user-info-label">姓名</div>
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
     
      
      user_name: "",
      tel_num: "",
      address: "",
      total_res: "",
      unfinished_res: "",
      sex: "",
    };
  },
  methods: {
    init() {
      (this.user_name = "张三3"),
        (this.tel_num = "15512138121"),
        (this.address = "翻斗花园c楼202"),
        (this.total_res = "2"),
        (this.unfinished_res = "1"),
        (this.sex = "男");
    },
    // getInfo() {
    //   fetch("http://127.0.0.1:4523/mock/465655/", {
    //     headers: {
    //       // 'satoken':localStorage.getItem('token')
    //       satoken: this.satoken,
    //     },
    //   })
    //     // 第一个 then 接受到的是请求头的相关信息
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((res) => {
    //       this.setState({
    //         name: data.info.dealer_name,
    //         phone: data.info.username,
    //       });
    //     })
    //     // 请求错误时执行
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  created() {
    this.init();
  },
  // mounted(){
  //   console.log(1);
  //   console.log(localStorage.token);
  //   console.log(localStorage.userID);
  //   const url = "http://220.179.227.205:6007/User/GetInformation/GarbageMan?req=" + localStorage.userID;
  //   fetch(url,{
  //     method:'GET',
  //     headers:{"accept": "text/plain","Authorization":"Bearer "+localStorage.token}}
  //   ).then(response=>response.json()).then(data=>{
  //     console.log(data);
  //     this.userid=data.id;
  //     this.phonenumber=data.phonenumber;
  //     this.credit=data.credit;
  //     this.address=data.address;
  //     this.username=data.name;
  //   })
  // }
  //   methods: {
  //     closeThrowerInfo() {
  //       this.$emit("changeShowThrowerInfo");
  //     },
  //   },
  // };
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
/*label {*/
/*  margin: 25px 0 20px ;*/
/*  display: block;*/
/*  color:#ffffff;*/
/*}*/
/*.user-info-label{*/
/*  width:150px;*/
/*  height: 74px;*/
/*  margin: 30px 20px 20px 20px;*/
/*  display: block;*/
/*  background:#55bb8a;*/
/*  text-align: center;*/
/*  line-height: 74px;*/
/*  border-radius: 30px;*/
/*  border: white;*/
/*  font-size: 24px;*/
/*  color:#ffffff;*/
/*  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;*/
/*}*/
/*form {*/
/*  display: inline-block;*/
/*  text-align: left;*/
/*  background: white;*/
/*  max-width: 50%;*/
/*  margin-top: 5%;*/
/*  padding: 60px 60px;*/
/*  border-radius: 10px;*/
/*}*/
/*.throwerInfo {*/
/*  text-align: center;*/
/*  z-index: 2;*/
/*}*/
/*.user-info {*/
/*  width:auto;*/
/*  height: 74px;*/
/*  margin: 30px 20px 20px 20px;*/
/*  display: block;*/
/*  background:#55bb8a;*/
/*  text-align: center;*/
/*  line-height: 74px;*/
/*  border-radius: 30px;*/
/*  border: white;*/
/*  font-size: 24px;*/
/*  color:#ffffff;*/
/*  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;*/
/*}*/
/*.cover {*/
/*  position: fixed;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  top: 0;*/
/*  left: 0;*/
/*  background: rgba(0, 0, 0, 0.5);*/
/*  z-index: 1;*/
/*}*/
</style>