

<template>
  <div>
<<<<<<< Updated upstream
    <el-container style="background-color: #3C3F41">
      <el-aside style="width: auto">
=======
    <el-container  style="background-color: #3C3F41">
      <el-aside style="width: 230px">
>>>>>>> Stashed changes
        <D_Aside/>
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <D_Header/>
        </el-header>
<<<<<<< Updated upstream
        <el-main style="width: auto">
=======
        <el-main >
>>>>>>> Stashed changes
          <div class="hand_container">
            <el-dialog
                v-model="confirmVisible"
                title="加入科室"
                width="30%"
                :show-close="false"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
            >
              <el-form
                  ref="addForm"
                  :model="addForm"
                  status-icon
                  label-width="120px"
                  class="demo-ruleForm"
              >
                <el-form-item label="医院" prop="hospitalName">
                  <el-select v-model="addForm.hospitalName" placeholder="请选择医院">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="科室" prop="deptName">
                  <el-autocomplete
                      v-model="addForm.deptName"
                      :fetch-suggestions="querySearch"
                      class="inline-input"
                      placeholder="请输入科室名"
                      @select="handleSelect"
                  />
                </el-form-item>
                <el-form-item label="验证码" prop="verify">
                  <el-input
                      v-model="addForm.verify"
                      type="text"
                      autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmVisible = false"
        >确定</el-button
        >
      </span>
              </template>
            </el-dialog>
            <div class="hand">
              <el-button  style="min-height: 400px;min-width: 400px;background-color:#E0773A " circle
              @click="hand">
                <div>
               <span style="font-size:200px;color: #ebeef1;text-shadow: 2px 2px 0 #5D95CE,2px -2px 0 #5D95CE, -2px -2px 0 #5D95CE, -2px 2px 0 #5D95CE;">{{number}}</span><br/><br/><span style="font-size:60px;color: #ebeef1;text-shadow: 2px 2px 0 #5D95CE,2px -2px 0 #5D95CE, -2px -2px 0 #5D95CE, -2px 2px 0 #5D95CE;">{{name}}</span>
                </div>
              </el-button>
            </div>
            <el-card class="advice1" style="height: 300px;width: 300px">
                <template #header>
                    <span style="position:relative;left:40%">医嘱</span>
                </template>
                <el-input
                    v-model="diagnosis"
                    :autosize="{ minRows: 1, maxRows: 1 }"
                    type="textarea"
                    placeholder="请输入病因"
                    class="el-input"
                    style="width: 260px"
                >
                </el-input>
              <el-input
                  v-model="advice"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                  type="textarea"
                  placeholder="请输入医嘱，可语音输入"
                  class="el-input"
                  style="width: 260px"
              >
              </el-input>
                <el-button class="btn-start-recording" type=primary v-if="focus" @click="startRecording" circle>
                  <el-icon><microphone /></el-icon>
                </el-button>
                <el-button class="btn-start-recording" type=danger v-if="!focus" @click="stopRecording" circle>
                  <el-icon><microphone /></el-icon>
                </el-button>
              </el-card>
            <div class="material" style="width:25vw;height: 80vh">
              <el-card :body-style="{ backgroundColor:'#f4f4f5' } " style="border-radius:15px;border: 2px solid #CCC"><span>病人资料：</span>
              <br/>
              <br/>
              <div style="background-color: lavenderblush" class="Upcoming">
                <div v-for="(domain, index) in MaterialForm" :key="domain.key" class="text item">
                  <div style="padding-top: 4px;padding-bottom: 2px;padding-left: 50px;padding-right: 50px">
                    <el-card shadow="hover"  style="cursor:pointer;" :body-style="{ backgroundColor:'#f4f4f5' } ">
                      <div @click="showMaterial(domain,index)">
                        <el-link :underline="false">{{domain.name}}</el-link>
                        <br/><el-link :underline="false"> {{"创建时间:"+domain.createTime}}</el-link>
                      </div>
                      <el-button type="danger" circle @click="deleteFight(domain)" style="position:relative ;left: 85%">
                        <el-icon><delete /></el-icon>
                      </el-button>                  </el-card>
                  </div>
                </div>
              </div></el-card>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
<<<<<<< Updated upstream
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import D_Header from "@/components/D_header";
import D_Aside from "@/components/D_Aside";
import H_Aside from "@/components/H_Aside";
import {Search} from "@element-plus/icons";
=======
import { Recorder } from '../utils/record.js'
var recorder = null
import Header from "@/components/D_header";
import D_Aside from "@/components/D_Aside";
import {Search ,Microphone, Delete} from "@element-plus/icons";
>>>>>>> Stashed changes
export default {
  components:{
    D_Header,
    D_Aside,
    Search,
    Microphone,
    Delete

  },
  data() {
    return {
      file:"",
      recorder: null,
      advice:"",
      diagnosis:"",
      res:"",
      focus:true,
      depts: [],
      MaterialForm:[
        {
          name:"12340",
          createTime:"2021-12-01",
          url:""
        },
        {
          name:"12341",
          createTime:"2021-12-01",
          url:""
        }
      ],
      options: [
        {
          value: '0',
          label: 'a院',
        },
        {
          value: '1',
          label: 'b院',
        }
      ],
      addForm:{},
      confirmVisible:false,
      name:"暂无",
      telephone:"11111111",
      number:"0",
      patient_id:"",
      isCollapse: true,
    };
  },
  created() {
    this.getInfo();
    this.depts = this.loadAll();
  },

  methods: {
    async getInfo()
    {
      var res,rps;
      var myHeaders = new Headers();
      // myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
       var d_satoken=localStorage.getItem("d_satoken")
       myHeaders.append("satoken", d_satoken);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("api/appointments/details/now", requestOptions)
          .then(response => rps=response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      console.log(1234)
      console.log(res)
      res=JSON.parse(res)
      if(res.data!=null){
      localStorage.setItem("apt_id",res.data.id)
      localStorage.setItem("apt_num",res.data.code)
        this.advice=res.data.advice
        this.diagnosis=res.data.diagnosis
      this.name=res.data.patient_name
      this.number=res.data.code
      this.patient_id=res.data.patient_username
        await this.getMaterial(res.data.patient_username);
 if(res.data.department_name==null){
   this.confirmVisible=true
 }
      }else{
        this.$message.success("当前已无患者可处理");
      }
    },
    async getMaterial(username)
    {
      console.log(111)
      var myHeaders = new Headers();
      // myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      var satoken=localStorage.getItem("satoken")
      myHeaders.append("satoken", satoken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      var res
      await fetch("three/files?username="+username+"&name=&start_time=&end_time=&pageSize=1&currentPage=0", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
      console.log(res)
      this.MaterialForm=res.data.list
    },
    async hand(){
      var res,rps;
      var url="api/appointments/"+localStorage.getItem("apt_id")+"/details/"
      url+=localStorage.getItem("apt_num")+"?finish=true"
      var myHeaders = new Headers();
      // myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      var d_satoken=localStorage.getItem("d_satoken")
      myHeaders.append("satoken", d_satoken);
      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch(url, requestOptions)
          .then(response => rps=response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
      console.log(res.code)

      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "diagnosis": this.diagnosis,
        "advice": this.advice
      });

      var requestOptions1 = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      var url1="http://220.179.227.205:6018/appointments/"+localStorage.getItem("apt_id")+"/details/"
      url1+=localStorage.getItem("apt_num")
      fetch(url1, requestOptions1)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      this.getInfo()
      this.getMaterial()
    },
    querySearch(queryString, cb) {
      var depts = this.depts;
      var results = queryString ? depts.filter(this.createFilter(queryString)) : depts;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (dept) => {
        return (dept.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    showMaterial(domain,index){
      console.log(domain.url)
      window.open(domain.url)
    },
    loadAll() {
      return [

        { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    startRecording: function (e) {
      this.focus=false
      e.preventDefault()
      Recorder.get(function (rec) {
        recorder = rec
        recorder.start()
      })
    },
    stopRecording: function (e) {
      this.focus=true
      e.preventDefault()
      recorder.stop()
      this.getRecording()
    },
    async getRecording() {
      var files = recorder.getBlob(),base64,res  //得到需要的pcm文件
      let promise=recorder.getBase64(files)
      promise.then((res)=>{
        //这一步是最坑的,获取完base64编码，结果只有后半部分是可以的
        base64=res.split(',')[1]
        //获取到speech参数后就可以调用百度API接口进行识别了

        // console.log(this.advice)
        // this.submitToBaiduAI(base64,files.size)
        // console.log(this.res)
      })
      var url="baidu2",
          token_url="baidu1?grant_type=client_credentials&client_id=MrUQiNy7WdAcmrOTPXdvgWyy&client_secret=iGG0L9LcNa0w8p5U0Twz3p0rKI69Eh5F"
      var myHeaders = new Headers();
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch( token_url, requestOptions)
          .then(response => rps=response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
      var access_token=res.access_token
      myHeaders.append("Content-Type", "application/json");
      var raw=JSON.stringify({

        "format":"pcm",
        "rate":16000,
        "dev_pid":1537,
        "channel":1,
        "token":access_token,
        "cuid":"fe80::b8d5:476a:906a:c0c0%9",
        "len":files.size,
        "speech":base64, // xxx为 base64（FILE_CONTENT）

      })
     // console.log(raw)
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:raw,
        redirect: 'follow'
      };
      var res,rps
      //+"?dev_pid=1537&cuid=fe80::b8d5:476a:906a:c0c0%9&token="+access_token
      await fetch( url, requestOptions)
          .then(response => rps=response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      console.log(res)
      res=JSON.parse(res)
      this.advice+=res.result
    },
   submitToBaiduAI(speechInfo,size){

      var resultInfo;


      var  xmlHttp= new XMLHttpRequest();
      var url="baidu1?grant_type=client_credentials&client_id=MrUQiNy7WdAcmrOTPXdvgWyy&client_secret=iGG0L9LcNa0w8p5U0Twz3p0rKI69Eh5F";

      xmlHttp.open("POST",url,true);

      xmlHttp.onreadystatechange =  function () {


        if (xmlHttp.readyState == 4) { //
          if (xmlHttp.status == 200){  //
            var httpResultToken= JSON.parse(xmlHttp.responseText);
            var token=httpResultToken.access_token;

            url="baidu2";

            var  xmlHttp2= new XMLHttpRequest();
            xmlHttp2.open("POST",url,true);
            xmlHttp2.onreadystatechange = function (){
              if (xmlHttp2.readyState == 4) { //
                if (xmlHttp2.status == 200){  //
                  //  alert(xmlHttp2.responseText);

                  var result= JSON.parse(xmlHttp2.responseText);

                  if(result.err_no =='0'){

                    this.res=result.result;
                    //百度翻译后的结果

                  }else{
                    resultInfo = "error";
                    //VoiceObj2.Speak("未听清楚，请重述");
                    // listenVoice();
                  }


                } else{
                  //alert("提交异常");

                  resultInfo="error";
                }

              }
            };

            var speech=speechInfo;

            var setRequestInfo = new Object;


            setRequestInfo.format = "wav";
            setRequestInfo.rate=16000;
            setRequestInfo.token=""+token+"";
            setRequestInfo.cuid="1234567JAVA";
            setRequestInfo.channel="1";
            setRequestInfo.len=size;
            setRequestInfo.dev_pid =1537;
            setRequestInfo.speech=speech;

            var setRequestInfoJSON=JSON.stringify(setRequestInfo);

            //alert(setRequestInfoJSON);

            xmlHttp2.send(setRequestInfoJSON);



          }else{
            // alert("提交异常");

            resultInfo="error";
          }
        }
      };

      xmlHttp.send(null);
    }
    ,
  },

}
</script>

<style scoped>
.hand_container {
  width: max-content;
  height: 100%;
  position: relative;
  left: 0%;
  top: 0%;
}
.hand{
  position: relative;
  width: 100px;
  left:35%;
  top: 20%;
}
.advice1{
  position: absolute;
  left: 70%;
  top: 25%;
}
.material{
  position: absolute;
  left:0%;
  top: 20%;
}
.el-input{
  z-index: 99;
}
.btn-start-recording{
  position: relative;
  z-index: 99;
  left: 45% ;
  top:90%;
}

</style>
