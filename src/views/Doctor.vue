<template>
  <div>
    <el-container style="background-color: #3C3F41">
      <el-aside style="width: 230px">
        <Aside/>
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <Header/>
        </el-header>
        <el-main>

          <el-input
              v-model="input"
              placeholder="查找医生"
              class="einput"
              @change="search(input)"
          ></el-input>
          <el-button type="primary" :icon="Search" @click="search(input)" class="eicon">Search</el-button>

            <div class="row_container1">

              <el-row :gutter="25">
                <div>
                  <el-col
                      v-for="(doctor, index) in doctorList" :key="index"
                      :span="5" class="ecol"
                      v-show="doctor.Visible"
                  >
                    <br />  <br />
                    <el-card
                        :body-style="{ padding: '5px' }"
                        class="ecard"
                        v-if="doctor.Visible"
                    >
                      <img
                          :src="doctor.pictue"
                          class="eimg"
                          @click="clickDoctorCard(doctor.id,doctor.name)"
                          width="200" height="200"
                      />
                      <div
                          style="padding: 0px"
                          class="bottom clearfix"
                          @click="clickDoctorCard(doctor.id,doctor.name)"
                      >
                        <br />
                        <br />
                        <br />
                        <span>{{ doctor.name }}</span>
                        <br />
                        <span>{{ doctor.intro }}</span>
                      </div>
                    </el-card>


                  </el-col>
                </div>
              </el-row>
            </div>

          <el-dialog
              v-model="selectTimeDialog"
              title="选择预约时间"
              width="50%"
              center
          >
              <el-date-picker
                  v-model="dateValue"
                  value-format="YYYY-MM-DD"
                  type="date"
                  placeholder="请选择日期"
                  :disabled-date="disabledDate"
                  :shortcuts="shortcuts"
                  @focus="loadAvailTime()"
              >
              </el-date-picker>

            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="appointment(1)">上午</el-button>
                <el-button type="primary" @click="appointment(2)">下午</el-button>
              </span>
            </template>
          </el-dialog>

            <el-dialog
                v-model="dialogVisible"
                title="预约信息"
                width="30%"
            >
              <div>医院：{{finalInfo[0].hospital}}</div>
              <div>科室：{{finalInfo[0].department}}</div>
              <div>医生：{{finalInfo[0].doctor}}</div>
              <div>日期：{{finalInfo[0].date}}</div>
              <div>时段：{{chineseSession}}</div>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="finalConfirm()"
                  >确认预约</el-button
                  >
                </span>
              </template>
            </el-dialog>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { toRefs,reactive,ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons'

import Header from "@/components/Header";
import Aside from "@/components/Aside";

export default {
  name: 'Doctor',
  components: {
    Header,
    Aside,
  },
  setup() {

    //时间选择框
    const selectTimeDialog = ref(false)

    //最后确认框
    const dialogVisible = ref(false)

    //日期选择器
    const state = reactive({
      disabledDate(time) {
        var oneDay=3600*1000*24;
        var thirtyDays=oneDay*30;
        return (time.getTime() < (Date.now()-oneDay)) || (time.getTime()>(Date.now()+thirtyDays));
      },
      shortcuts: [
        {
          text: 'Today',
          value: new Date(),
        },
        {
          text: 'Tomorrow',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            return date
          },
        },
        {
          text: 'A week later',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            return date
          },
        },
      ],
      dateValue: '',
    })


    return {
      ...toRefs(state),
      dialogVisible,
      selectTimeDialog,
    }
  },
  data() {
    let chineseSession;
    return {
      isCollapse: true,
      inputtime: 1,
      input: "",
      currentPage: 1,
      pickerOptions: {
        // 限制预约时间
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      chineseSession,
      doctorList: [

      ],
      finalInfo:[

      ],
      availTime:[

      ],
    };
  },
  created() {
    this.getInfo();

  },
  methods:{


    clickDoctorCard(doctorId,doctorName){
      this.selectTimeDialog = true;
      localStorage.setItem("doctor",doctorName);
      localStorage.setItem("doctorId",doctorId);

      var deptId=localStorage.getItem("SelectDepartmentId");
      var docId=localStorage.getItem("doctorId");
      this.getAvailAppointment(docId,deptId);

    },

    async finalConfirm(){

      var url="http://220.179.227.205:6018/appointment/";

      var date=localStorage.getItem("date");
      var session=localStorage.getItem("session")
      session=session.toUpperCase();

      var username=localStorage.getItem("username");
      var postId="";

      for(var i=0;i<this.availTime.length;i++){
        if(this.availTime[i].date===date&&this.availTime[i].slot===session){
          postId=this.availTime[i].id;
        }
      }


      //在这里向后端发送预约数据

      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");

      var raw = {
        "id":postId,
        "username":username
      };
      console.log(raw);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };
      var res;

      await fetch("http://220.179.227.205:6018/appointment/", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      console.log(res);
      res=JSON.parse(res)

      if(res.status!==1) {
        this.$message.error("预约失败");
        console.log("fail");
      }
      else {
        this.$message.success("预约成功");

      }

      //预约成功，回到主界面
      this.selectTimeDialog=false;
      this.dialogVisible=false;
    },

    appointment(amOrPm){
      if(this.dateValue.length===0){
        ElMessage('You must choose a date!');
      }else{
        localStorage.setItem("date",this.dateValue);
        if(amOrPm===1){
          this.chineseSession="上午";
          localStorage.setItem("session","Morning");
        }else if(amOrPm===2){
          this.chineseSession="下午";
          localStorage.setItem("session","Afternoon");
        }

        var hospital=localStorage.getItem("hospitalName");
        var department=localStorage.getItem("SelectDepartmentName");
        var doctor=localStorage.getItem("doctor")
        var date=localStorage.getItem("date");
        var session=localStorage.getItem("session")
        this.finalInfo=[];
        this.finalInfo.push({
          hospital,
          department,
          doctor,
          date,
          session
        });
        console.log(this.finalInfo);

        this.dialogVisible=true;
      }
    },


    async getInfo()
    {
      var id="546456"
      var name="某医生";
      var pictue='https://gimg2.baidu.com/image_search/' +
          'src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F73%2F47%2F59602033edae0_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640063894&t=785307e927c01bb8beadb6a2818e29c6'
      //var pictue= 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhnrb.voc.com.cn%2Fhnrb_epaper%2Fimages%2F2014-12%2F15%2FF2%2Fres07_attpic_brief.jpg&refer=http%3A%2F%2Fhnrb.voc.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639837269&t=2b2e1e684b4360e06688158e30d5f5b8';
      var intro= "医生介绍";
      var etype="success";
      var Visible=true;

      this.doctorList.push({
        id,
        name,
        pictue,
        intro,
        etype,
        Visible
      })

      var deptId=localStorage.getItem("SelectDepartmentId");

      console.log(window.sessionStorage.getItem("token"))
      var res;
      var myHeaders = new Headers();
//myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("http://220.179.227.205:6017/Department/"+deptId+"/doctor", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
      console.log(res.length)
      for (let i = 0; i < res.length; i++)
      {
        id=res[i].username;
        name=res[i].name;
        //pictue=res.data.data[i].dish_picture;
        intro=res[i].intro;
        //console.log(name)
        //console.log(intro)
        this.doctorList.push({
          id,
          name,
          pictue,
          intro,
          etype,
          Visible
        });
      }

      console.log(this.doctorList);
    },

    search(input) {
      for (let i = 0; i < this.doctorList.length; i++) {
        var str = "";
        str = this.doctorList[i].name;
        if (str.includes(input)) {
          this.doctorList[i].Visible = true;
        } else {
          this.doctorList[i].Visible = false;
        }
      }

    },

    async getAvailAppointment(doctorId,deptId){
      var id="0";
      var date="2020-11-16";
      var slot="NULL";
      var capacity="0"

      var res;
      var myHeaders = new Headers();
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      console.log(doctorId,deptId,"查时间");
      await fetch("http://220.179.227.205:6019/doctor/"+doctorId+"/department/"+deptId+"/appointment", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
      console.log(res.length)
      for (let i = 0; i < res.length; i++)
      {
        id=res[i].id;
        date=res[i].date;
        slot=res[i].slot;
        capacity=res[i].capacity;
        this.availTime.push({
          id,
          date,
          slot,
          capacity
        });
      }

      console.log(this.availTime);
    },

  }
}

</script>

<style scoped>
.row_container1 {
  width: 100%;
  position: relative;
  left: 0%;
  top: 0%;
  text-align: center ;
}
.ecol {
  padding: 0%;
}
.ecard {
  width:200px;
  height:325px;
  border-radius: 0px;
  text-align: center ;
}
.einput {
  width: 15%;
  position: absolute;
  left: 40%;
  top: 3.5%;
}
.eicon {
  position: absolute;
  left: 58%;
  top: 3.5%;
}

.grid-content {
  border-radius: 4px;
  min-height: 40px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

</style>