<template>
   <div>
    <el-container  style="background-color: #3C3F41">
      <el-aside style="width: auto">
        <D_Aside/>
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <D_Header/>
        </el-header>
        <el-main style="width: auto">
            <FullCalendar id="calendar"
                          ref="fullCalendar"
                          :options="calendarOptions"
            />

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
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import zhCnLocale from '@fullcalendar/core/locales/zh-cn'
import D_Header from "@/components/D_header";
import D_Aside from "@/components/D_Aside";
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: "workManagement",
  components:{
    FullCalendar,
    D_Header,
    D_Aside,
  },
  setup(){
    return{
      detailInfoDialog: ref(false),
      newWorkTimeDialog: ref(false),
    }
  },
  data(){
    return{
      d_satoken: "",
      deptName: "",
      hospital_id:0,

      detailInfo:{
      },
      //新建预约的表单
      form:{
        capacity: 10,
        session: '',
        date:new Date(),
      },
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
          right: 'prev,next'
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
          //{title:'上午：15',date:'2021-12-17'},
          //{title:'下午：15',date:'2021-12-17'},
          //日程事件的json
          // { title: 'event 1', date: '2021-04-23 12:00:00' },
          // { title: 'event 2', date: '2021-04-24 05:59:23' },
        ],
        // datesSet: this.handleDateSet,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      calendarApi:null,
      monthTitle:new Date(),
    }
  },
  created() {
  },
  mounted() {
    this.getCalendarApi();
    this.getOrigin();
  },
  methods:{

    getCalendarApi(){
      this.calendarApi = this.$refs.fullCalendar.getApi();
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
      var doctorUsername=localStorage.getItem("username");

      await fetch("four/appointments/?month="+reqMonth
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

    handleEventMouseEnter(event){

    },

    handleDateClick(info){
      this.form.date=info.dateStr;
      this.newWorkTimeDialog=true;
    },

    async newAppointment(){
      await this.getDoctorInfo();

      var date=this.form.date;
      var slot=this.form.session;
      var capacity=this.form.capacity;
      var deptName=this.deptName;
      var hospital_id=this.hospital_id;
      var doctor_username=localStorage.getItem("username");

      var res;

      //这里发送新预约
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "date": date,
        "slot": slot,
        "capacity": capacity,
        "department_name": deptName,
        "hospital_id": hospital_id,
        "editable": true,
        "doctor_username": doctor_username
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("four/appointments/", requestOptions)
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

    async getDoctorInfo() {
      this.d_satoken = localStorage.getItem("d_satoken");
      await fetch("four/doctor", {
        headers: {
          satoken: this.d_satoken,
          credentials: "include",
        },
      })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res);
            this.deptName=res.department_name;
            this.hospital_id=res.hospital_id;
          })
          .catch((err) => {
            console.log(err);
          });
    },

    //删除预约
    async deleteEvent(){
      if(this.detailInfo.workType===false){
        ElMessage.error('您不能删除医院安排的出诊时段')
      }else{
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
        await fetch("four/appointments/"+id, requestOptions)
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
      }
    },

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

      await fetch("four/appointments/"+id, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

      this.detailInfoDialog = false;
      //location.reload();
    },

  }
}
</script>

<style scoped>

</style>