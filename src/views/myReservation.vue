

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
          <div class="row_container1">
            <el-table :data="tableData" style="width: 100%" >
              <el-table-column prop="name" label="医院"  />
              <el-table-column prop="dept" label="科室" />
              <el-table-column prop="doctor" label="医生" />
              <el-table-column prop="date" label="日期" />
              <el-table-column prop="time" label="时段" />
              <el-table-column prop="number" label="预约号" />
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import {Search} from "@element-plus/icons";
export default {
  components:{
    Header,
    Aside,
    Search
  },
  data() {
    return {
      isCollapse: true,
      dialogVisible:false,
      tableData: [ ],
    };
  },
  created() { 
     this.getInfo();
  
  },
  
  methods: {
    async getInfo()
    { 
      var name="麻婆豆腐";
      var dept= '';
      var time= "文案";
      var date="空余";
      var doctor="";
      var number=11;
      var res;
      var myHeaders = new Headers();
     // myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      var url="http://220.179.227.205:6018/appointment/Patient/";
      console.log(localStorage.getItem("username"))
      url=url+localStorage.getItem("username")+"/all";
      console.log(url)
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch(url, requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      console.log(res)
      res=JSON.parse(res)
      console.log(res)
      for (let i = 0; i < res.length; i++)
      {
        name=res[i].hospital_name;
        dept=res[i].department_name;
        doctor=res[i].doctor_name;
        time=res[i].slot;
        if(time=="MORNING")
          time="上午"
        else
          time="下午"
        date=res[i].date;
        number=res[i].code;

        this.tableData.push({
          name,
          dept,
          doctor,
          time,
          date,
          number,
        });
      }
      },

    
      logout()
  {
        window.sessionStorage.clear();
        this.$router.push("/");
  }
    

    
   
  }
}
</script>

<style scoped>




.row_container1 {
  width: 100%;
  position: relative;
  left: 0%;
  top: 0%;
}


</style>
