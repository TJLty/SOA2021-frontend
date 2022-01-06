<template>
  <div>
    <el-container style="background-color: #3c3f41">
      <el-aside style="width: auto">
        <H_Aside />
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <H_header />
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
          >搜索</el-button
          >

            <el-select class="sOtherHospital" v-model="selectOtherHospitalId" clearable placeholder="选择医院">
              <el-option
                  v-for="item in hospital_list"
                  :key="item.hospitalId"
                  :label="item.hospitalName"
                  :value="item.hospitalId"
              >
              </el-option>
            </el-select>
            <el-button
                type="primary"
                @click="selectOtherHospitalDoctor()"
                class="sOtherButton"
            >
              邀请其他院医生
            </el-button>


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
                        :src="doctor.picture"
                        class="eimg"
                        @click="clickDoctorCard(doctor.id, doctor.deptName)"
                        width="200"
                        height="200"
                    />
                    <div
                        style="padding: 0px"
                        class="bottom clearfix"
                        @click="clickDoctorCard(doctor.id, doctor.deptName)"
                    >
                      <br />
                      <br />
                      <span>{{ doctor.name }}</span>
                      <br />
                      <span>{{ doctor.deptName }}</span>
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
            <FullCalendar id="calendar"
                          ref="fullCalendar"
                          :options="calendarOptions"
            />
          </el-dialog>

          <!--点击事件修改或删除-->
          <el-dialog v-model="detailInfoDialog" title="出诊详细信息" width="30%" center>

            <el-form ref="detailInfo" :model="detailInfo" label-width="100px">
              <el-form-item label="日期：">
                <el-input v-model="detailInfo.date" disabled ></el-input>
              </el-form-item>
              <el-form-item label="时段：">
                <el-input v-model="detailInfo.session" disabled ></el-input>
              </el-form-item>
              <el-form-item label="医院：">
                <el-input v-model="detailInfo.hospital" disabled ></el-input>
              </el-form-item>
              <el-form-item label="科室：">
                <el-input v-model="detailInfo.department" disabled ></el-input>
              </el-form-item>
              <el-form-item label="预约数：" placeholder="请输入0-25之间的预约数">
                <el-input v-model="detailInfo.capacity"></el-input>
              </el-form-item>
            </el-form>

            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="changeEvent()"
                >修改</el-button
                >
                <el-button type="danger" @click="deleteEvent()">
                  删除
                </el-button>
              </span>
            </template>
          </el-dialog>

          <!--点击日期新建-->
          <el-dialog v-model="newWorkTimeDialog" title="添加一个出诊时间" width="30%" center>

            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="日期：">
                <el-input v-model="form.date" disabled ></el-input>
              </el-form-item>
              <el-form-item label="时段：">
                <el-select v-model="form.session" placeholder="请选择出诊时段">
                  <el-option label="上午" value="MORNING"></el-option>
                  <el-option label="下午" value="AFTERNOON"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约数：" placeholder="请输入0-25之间的预约数">
                <el-input v-model="form.capacity"></el-input>
              </el-form-item>
            </el-form>

            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="newAppointment()"
                >新增</el-button
                >
                <el-button @click="newWorkTimeDialog=false">取消</el-button>
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

import H_header from "@/components/H_header";
import H_Aside from "@/components/H_Aside";

import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import zhCnLocale from "@fullcalendar/core/locales/zh-cn";

export default {
  name: "hospitalDoctor",
  components: {
    H_header,
    H_Aside,
    FullCalendar,
  },
  setup(){
    const selectTimeDialog = ref(false);
    return{
      selectTimeDialog,
      detailInfoDialog: ref(false),
      newWorkTimeDialog: ref(false),
    };
  },
  data() {
    return {
      selectOtherHospitalId:"本院",
      hospital_list:[],
      origin_hospital_list:[],
      input: "",
      //新建预约的表单
      form:{
        capacity: 10,
        session: '',
        date:new Date(),
      },
      detailInfo:{},
      doctorList: [],
      calendarOptions: {
        plugins: [
          // 加载插件，V5采用插件模块方式加入
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        height: 600, //日历高度
        aspectRatio:1,
        customButtons: {
          prev: { // this overrides the prev button
            text: "PREV",
            click: () => {
              console.log("eventPrev");
              let calendarApi = this.$refs.fullCalendar.getApi();
              calendarApi.prev();
              this.getOrigin();
            }
          },
          next: { // this overrides the next button
            text: "PREV",
            click: () => {
              console.log("eventNext");
              let calendarApi = this.$refs.fullCalendar.getApi();
              calendarApi.next();
              this.getOrigin();
            }
          }
        },
        headerToolbar: {
          // 头部toolbar
          left: '',
          center: 'title',
          //right: 'timeGridDay,timeGridWeek,dayGridMonth',
          right: ''
        },
        handleWindowResize: true, //随浏览器窗口变化
        initialView: 'dayGridMonth', // 初始化插件显示
        // initialDate:""//初始化日期
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        // editable: true, //是否可编辑
        // droppable: true,//可拖拽的
        // timeZone: 'local',//采用时区
        selectable: true,
        // selectMirror: true,
        dayMaxEvents: true,
        //weekends: true, // 是否显示一周七天
        // select: this.handleDateSelect,
        eventMouseEnter: this.handleEventMouseEnter, // 用户将鼠标悬停在事件上时触发
        // eventsSet: this.handleEvents,
        dateClick: this.handleDateClick,//日期方格点击事件
        eventClick: this.handleEventClick, //日程点击事件
        locale: zhCnLocale,
        nextDayThreshold: '01:00:00',
        events: [
        ],
        // datesSet: this.handleDateSet,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },

      clickDoctorId:"",
      calendarApi:null,
      clickDeptName:"",
      hospital_id:0,
    }
  },
  created() {
    this.getAllHospital();
    this.getInfo(0);
  },
  mounted() {
  },
  methods:{

    async getAllHospital(){
      var res;

      var hospitalId=0;
      var hospitalName="";

      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("satoken",localStorage.getItem("h_satoken"));

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("http://220.179.227.205:6014/api/v1/hospitals?filter=", requestOptions)
          .then(response => response.text())
          .then(result => (res=result))
          .catch(error => console.log('error', error));

      res=JSON.parse(res);
      for(var i=0;i<res.data.length;i++){
        hospitalId=res.data[i].hospitalId;
        hospitalName=res.data[i].hospitalName;
        if(hospitalId.toString()===localStorage.getItem("hospital_login_id")){
          this.origin_hospital_list.push({
            value:hospitalId,
            hospitalId:hospitalId,
            hospitalName:hospitalName+"（本院）",
          })
        }else{
          this.origin_hospital_list.push({
            value:hospitalId,
            hospitalId:hospitalId,
            hospitalName:hospitalName,
          })
        }
      }
      console.log("医院列表",this.origin_hospital_list);
      this.hospital_list=this.origin_hospital_list;


    },

    selectOtherHospitalDoctor(){
      this.getInfo(this.selectOtherHospitalId);
    },

    async getInfo(HID){
      this.doctorList=[];
      var name="";
      var deptName="";
      var id="";
      var picture="";
      var etype = "success";
      var Visible = true;

      var hospitalId;
      if(HID===0){
        hospitalId=localStorage.getItem("hospital_login_id");
      }else{
        hospitalId=HID;
      }
      var res;

      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("satoken",localStorage.getItem("h_satoken"));

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("http://220.179.227.205:6014/api/v1/hospitals/"+hospitalId+"/doctors?department=", requestOptions)
          .then(response => response.text())
          .then(result => (res=result))
          .catch(error => console.log('error', error));

      res=JSON.parse(res);

      if (res.code !== 200) {
        console.log("获取失败");
        console.log(res.data);
      } else {
        for (let i = 0; i < res.data.length; i++) {
          id = res.data[i].username;
          name = res.data[i].name;
          picture = res.data[i].img;
          deptName=res.data[i].departmentName;
          this.doctorList.push({
            id,
            name,
            picture,
            deptName,
            etype,
            Visible,
          });
        }
      }

    },

    clickDoctorCard(doctorId,deptName){

      this.calendarOptions.events=[];

      this.selectTimeDialog = true;

      this.clickDeptName=deptName;
      this.clickDoctorId=doctorId;
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
      myHeaders.append("satoken",localStorage.getItem("h_satoken"))
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var reqMonth=1;
      var reqYear=2022;
      var doctorUsername=doctorId;

      await fetch("http://220.179.227.205:6014/api/v1/appointments/?month="+reqMonth
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

    async getOrigin(){
      this.calendarOptions.events=[];
      this.monthTitle = this.calendarApi.view?.currentStart;

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
      var doctorUsername=this.clickDoctorId;

      await fetch("http://220.179.227.205:6014/api/v1/appointments/?month="+reqMonth
          +"&year="+reqYear+"&doctor_username="+doctorUsername, requestOptions)
          .then(response => response.text())
          .then(result => (res=result))
          .catch(error => console.log('error', error));
      res=JSON.parse(res);
      console.log(res);

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

    handleEventClick(event){
      this.detailInfo={};

      this.detailInfo.date=event.event.start.toLocaleDateString();
      this.detailInfo.hospital=event.event.extendedProps.hospital;
      this.detailInfo.department=event.event.extendedProps.department;
      this.detailInfo.capacity=event.event.extendedProps.capacity;
      this.detailInfo.appointmentId=event.event.extendedProps.appointmentId;
      this.detailInfo.workType=event.event.extendedProps.workType;
      console.log(event.event);
      if(event.event.extendedProps.session==="MORNING"){
        this.detailInfo.session="上午";
      }else{
        this.detailInfo.session="下午";
      }
      this.detailInfoDialog=true;
    },

    //删除预约
    async deleteEvent(){
        var id=this.detailInfo.appointmentId;
        console.log("id",id);

        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };

        var res;
        await fetch("http://220.179.227.205:6014/api/v1/appointments/"+id, requestOptions)
            .then(response => response.text())
            .then(result => (res=result))
            .catch(error => console.log('error', error));

        res=JSON.parse(res);
        if(res.msg==='ok'){
          ElMessage({
            message: '删除成功',
            type: 'success',
          });
        }else{
          ElMessage.error("删除失败");
        }

        this.detailInfoDialog=false;
        location.reload();
    },

    //修改预约
    async changeEvent(){
      //修改非具体预约
      var slot="";
      if(this.detailInfo.session==="上午"){
        slot="MORNING";
      }else{
        slot="AFTERNOON";
      }

      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "date": this.detailInfo.date,
        "slot": slot,
        "capacity": Number(this.detailInfo.capacity),
      });
      var id=this.detailInfo.appointmentId;

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("http://220.179.227.205:6014/api/v1/appointments/"+id, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

      this.detailInfoDialog = false;
      //location.reload();
    },

    handleDateClick(info){
      this.form.date=info.dateStr;
      this.newWorkTimeDialog=true;
    },

    async newAppointment(){

      var date=this.form.date;
      var slot=this.form.session;
      var capacity=this.form.capacity;

      var deptName=this.clickDeptName;
      var hospital_id=localStorage.getItem("hospital_login_id")
      var doctor_username=this.clickDoctorId;

      var res;

      //这里发送新预约
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("satoken",localStorage.getItem("h_satoken"));


      var raw = JSON.stringify({
        "date": date,
        "slot": slot,
        "capacity": capacity,
        "department_name": deptName,
        "hospital_id": hospital_id,
        "editable": false,
        "doctor_username": doctor_username
      });
      console.log(raw);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("http://220.179.227.205:6014/api/v1/appointments/", requestOptions)
          .then(response => response.text())
          .then(result => (res=result))
          .catch(error => console.log('error', error));

      res=JSON.parse(res);
      if(res.msg==='ok'){
        ElMessage.success("新增成功");
      }else{
        ElMessage.error("新增失败");
      }
      this.newWorkTimeDialog = false;
      location.reload();
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
        aEvent.title='上午:'+hospital+' '+department;
      }else{
        aEvent.title='下午:'+hospital+' '+department;
      }

      if(type===false){
        aEvent.color='grey';
      }else{
        aEvent.color='#6495ED';
      }
      this.calendarOptions.events.push(aEvent);
    },

    search(input) {
      for (let i = 0; i < this.doctorList.length; i++) {
        var str = "";
        str = this.doctorList[i].name;
        var str2="";
        str2=this.doctorList[i].deptName;
        if (str.includes(input)||str2.includes(input)) {
          this.doctorList[i].Visible = true;
        } else {
          this.doctorList[i].Visible = false;
        }
      }
    },

  },
}
</script>

<style scoped>
.row_container1 {
  width: 100%;
  position: relative;
  left: 0%;
  top: 5%;
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
  top: 12%;
}
.eicon {
  position: absolute;
  left: 58%;
  top: 12%;
}
.sOtherHospital{
  width:23%;
  top:3.5%;
  left:40%;
  position: absolute;
}
.sOtherButton{
  top:3.5%;
  position: absolute;
  left: 65%;
}
</style>