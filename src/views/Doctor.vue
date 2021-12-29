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
          <el-input
            v-model="input"
            placeholder="查找医生"
            class="einput"
            @change="search(input)"
          ></el-input>
          <el-button
            type="primary"
            :icon="Search"
            @click="search(input)"
            class="eicon"
            >Search</el-button
          >

          <div class="row_container1">
            <el-row :gutter="25">
              <div>
                <el-col
                  v-for="(doctor, index) in doctorList"
                  :key="index"
                  class="ecol"
                  v-show="doctor.Visible"
                >
                  <br />
                  <br />
                  <el-card
                    :body-style="{ padding: '5px' }"
                    class="ecard"
                    v-if="doctor.Visible"
                  >
                    <img
                      :src="doctor.pictue"
                      class="eimg"
                      @click="clickDoctorCard(doctor.id, doctor.name)"
                      width="200"
                      height="200"
                    />
                    <div
                      style="padding: 0px"
                      class="bottom clearfix"
                      @click="clickDoctorCard(doctor.id, doctor.name)"
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
            <FullCalendar id="calendar" ref="fullCalendar" :options="calendarOptions" />
          </el-dialog>

          <div class="father">
            <div class="mask" v-show="maskShow" @click="setMaskShow"></div>
            <div class="child" id="child" v-show="maskShow">
              <FullCalendar id="calendar" ref="fullCalendar" :options="calendarOptions" />
            </div>
            <button @click="setMaskShow">click</button>
          </div>

          <el-dialog v-model="dialogVisible" title="预约信息" width="30%">
            <div>医院：{{ finalInfo[0].hospital }}</div>
            <div>科室：{{ finalInfo[0].department }}</div>
            <div>医生：{{ finalInfo[0].doctor }}</div>
            <div>日期：{{ finalInfo[0].date }}</div>
            <div>时段：{{ chineseSession }}</div>
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
import { toRefs, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons";

import Header from "@/components/Header";
import Aside from "@/components/Aside";
import D_Header from "@/components/D_header";
import D_Aside from "@/components/D_Aside";
import H_Aside from "@/components/H_Aside";

import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import zhCnLocale from "@fullcalendar/core/locales/zh-cn";

export default {
  name: "Doctor",
  components: {
    Header,
    Aside,
    FullCalendar,
    D_Header,
    D_Aside,
  },
  setup() {
    //时间选择框
    const selectTimeDialog = ref(false);

    //最后确认框
    const dialogVisible = ref(false);

    return {
      dialogVisible,
      selectTimeDialog,
    };
  },
  data() {
    let chineseSession;
    return {
      maskShow:false,
      isCollapse: true,
      selectDoctorId: 0,
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
      doctorList: [],
      finalInfo: [],
      availTime: [],
      calendarOptions: {
        plugins: [
          // 加载插件，V5采用插件模块方式加入
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        height: 600, //日历高度
        aspectRatio: 1,
        headerToolbar: {
          // 头部toolba
          left: "prev,next today",
          center: "title",
          //right: 'timeGridDay,timeGridWeek,dayGridMonth',
          right: "dayGridMonth",
        },
        handleWindowResize: true, //随浏览器窗口变化
        initialView: "dayGridMonth", // 初始化插件显示
        // initialDate:""//初始化日期
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        // editable: true, //是否可编辑
        // droppable: true,//可拖拽的
        // timeZone: 'local',//采用时区
        selectable: true,
        // selectMirror: true,
        dayMaxEvents: true,
        // weekends: true, // 是否显示一周七天
        // select: this.handleDateSelect,
        eventMouseEnter: this.handleEventMouseEnter, // 用户将鼠标悬停在事件上时触发
        // eventsSet: this.handleEvents,
        // dateClick: this.handleDateClick,//日期方格点击事件
        eventClick: this.handleEventClick, //日程点击事件
        locale: zhCnLocale,
        nextDayThreshold: "01:00:00",
        events: [
          { title: "上午：15", date: "2021-12-12" },
          { title: "下午：15", date: "2021-12-12" },
          { title: "上午：5", date: "2021-12-13" },
          { title: "下午：0", date: "2021-12-13", color: "red" },
          //日程事件的json
          // { title: 'event 1', date: '2021-04-23 12:00:00' },
          // { title: 'event 2', date: '2021-04-24 05:59:23' },
          // { title: 'event 3', date: '2021-04-25 08:23:00' },
          // { title: 'event 4', date: '2021-04-25 09:30:00' },
          // { title: 'event 5', date: '2021-04-26 12:00:00' },
          // { title: 'event 2', date: '2021-04-26 15:00:00' }
        ],
        // datesSet: this.handleDateSet,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      calendarApi:null,
      finalAppointmentId:0,
    };
  },
  created() {
    this.getInfo();
  },
  mounted() {
    this.getCalendarApi();
  },
  methods: {
    setMaskShow(){
      this.maskShow = !this.maskShow;
    },

    getCalendarApi(){
      this.calendarApi = this.$refs.fullCalendar.getApi();
    },

    //点击日历中的事件
    handleEventClick(info) {
      console.log(info);
      console.log(info.event.title);
      console.log(info.event.startStr);

      localStorage.setItem("date", info.event.startStr);
      if (info.event.title.includes("上午")) {
        this.chineseSession = "上午";
        localStorage.setItem("session", "Morning");
      } else {
        this.chineseSession = "下午";
        localStorage.setItem("session", "Afternoon");
      }

      this.finalAppointmentId=info.event.extendedProps.appointmentId;
      console.log(this.finalAppointmentId);
      var hospital = localStorage.getItem("hospitalName");
      var department = localStorage.getItem("SelectDepartmentName");
      var doctor = localStorage.getItem("doctor");
      var date = localStorage.getItem("date");
      var session = localStorage.getItem("session");
      this.finalInfo = [];
      this.finalInfo.push({
        hospital,
        department,
        doctor,
        date,
        session,
      });
      console.log(this.finalInfo);

      this.dialogVisible = true;
    },


    clickDoctorCard(doctorId, doctorName) {
      this.calendarOptions.events=[];
      this.monthTitle = this.calendarApi.view?.currentStart;
      this.calendarApi.render();

      this.selectTimeDialog = true;

      localStorage.setItem("selectDoctorName", doctorName);
      this.selectDoctorId=doctorId;
      this.getDoctorAvailTime(doctorId);

    },

    async getDoctorAvailTime(doctorId){
      var hospital='某医院';
      var department='某科室';
      var date='2021-12-18';
      var session='MORNING'
      var type='0'
      var capacity='-1';
      var appointmentId=0;

      var res;

      //请求本月的预约数据
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var reqMonth=this.monthTitle.getMonth()+1;
      var reqYear=this.monthTitle.getFullYear();
      var doctorUsername=doctorId;

      await fetch("four/appointments/?month="+reqMonth
          +"&year="+reqYear+"&doctor_username="+doctorUsername, requestOptions)
          .then(response => response.text())
          .then(result => (res=result))
          .catch(error => console.log('error', error));
      res=JSON.parse(res);
      console.log(res);
      console.log(res.data.length);

      for(var i=0;i<res.data.length;i++){
        hospital=res.data[i].hospital_name;
        department=res.data[i].department_name;
        date=res.data[i].date;
        session=res.data[i].slot;
        type=res.data[i].editable;
        capacity=res.data[i].capacity;
        appointmentId=res.data[i].id;
        this.putEvent(hospital,department,date,type,session,capacity,appointmentId);
      }

      console.log(this.calendarOptions.events);
    },

    putEvent(hospital,department,date,type,session,capacity,appointmentId){
      let title;
      let color;
      var aEvent={
        title,
        date: date,
        workType: type,
        session: session,
        color,
        capacity:capacity,
        hospital:hospital,
        department:department,
        appointmentId:appointmentId,
      }

      if(session==='MORNING'){
        aEvent.title='上午:'+capacity;
      }else{
        aEvent.title='下午:'+capacity;
      }

      this.calendarOptions.events.push(aEvent);
    },

    async finalConfirm() {
      console.log("lastconfirm");

      var satoken=localStorage.getItem("p_satoken")
      var res;

      var myHeaders = new Headers();
      myHeaders.append("satoken", satoken);
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      var id=this.finalAppointmentId;

      await fetch("four/appointments/appointments/"+id+"/details", requestOptions)
          .then(response => response.text())
          .then(result => (res=result))
          .catch(error => console.log('error', error));

      res=JSON.parse(res);
      console.log(res);

      //预约成功，回到主界面
      this.selectTimeDialog = false;
      this.dialogVisible = false;
    },

    async getInfo() {
      var id = "546456";
      var name = "某医生";
      var pictue ='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
      // var pictue =
      //   "https://gimg2.baidu.com/image_search/" +
      //   "src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F73%2F47%2F59602033edae0_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640063894&t=785307e927c01bb8beadb6a2818e29c6";
      //var pictue= 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhnrb.voc.com.cn%2Fhnrb_epaper%2Fimages%2F2014-12%2F15%2FF2%2Fres07_attpic_brief.jpg&refer=http%3A%2F%2Fhnrb.voc.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639837269&t=2b2e1e684b4360e06688158e30d5f5b8';
      var intro = "医生介绍";
      var etype = "success";
      var Visible = true;

/*      this.doctorList.push({
        id,
        name,
        pictue,
        intro,
        etype,
        Visible,
      });*/

      var deptId = localStorage.getItem("SelectDepartmentId"); //这里的参数要变了
      //改成这样：
      var hid = localStorage.getItem("SelectHospitalId");
      var deptname = localStorage.getItem("SelectDepartmentName");

      var res;
      var myHeaders = new Headers();
      //myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");

      myHeaders.append("satoken", localStorage.getItem("d_satoken"));
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        // "http://220.179.227.205:6017/Department/" + deptId + "/doctor",
        "four/hospitals/" +
          hid +
          "/doctors?department=" +
          deptname,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);
      console.log(res);
      if (res.code !== 200) {
        console.log("fail to get dept");
        console.log(res.data);
      } else {
        for (let i = 0; i < res.data.length; i++) {
          id = res.data[i].username;
          name = res.data[i].name;
          pictue=res.data[i].img;
          intro = res.data[i].intro;
          //console.log(name)
          //console.log(intro)
          this.doctorList.push({
            id,
            name,
            pictue,
            intro,
            etype,
            Visible,
          });
        }

        console.log(this.doctorList);
      }
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

  },
};
</script>

<style scoped>
.row_container1 {
  width: 100%;
  position: relative;
  left: 0%;
  top: 0%;
  text-align: center;
}
.ecol {
  padding: 0%;
}
.ecard {
  width: 200px;
  height: 325px;
  border-radius: 10px;
  text-align: center;
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

.father{
  width: 100%;
  height: 100%;
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.3;
}
.child{
  position: fixed;
  width: 800px;
  height: 800px;
  border: 1px solid #ccc;
  text-align: center;
  top: 10%;
  left: 10%;
  background: #fff;
}
</style>