
<template>
  <div>
    <el-container style="background-color: #3C3F41">
      <el-aside style="width: auto;height: 100vh">
        <Aside/>
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <Header/>
        </el-header>
        <el-main>
          <span>{{"当前为"+year+"年"+month+"月的邀请"}}</span>
          <el-table :data="tableData" border stripe style="width: auto;height: auto" max-height="800">
            <el-table-column fixed prop="hospital_name" label="医院名"  />
            <el-table-column prop="department_name" label="科室" />
            <el-table-column prop="capacity" label="容量"  />
            <el-table-column prop="date" label="日期"  />
            <el-table-column prop="slot" label="时间"  />
            <el-table-column label="操作" >
              <template #default="scope">
                <el-button
                    type="text"
                    size="small"
                    @click="accept(scope.$index)"
                >
                  接受
                </el-button>
                <el-button
                    type="text"
                    size="small"
                    @click="refuse(scope.$index)"
                >
                  拒绝
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
              type="primary"
              class="eicon"
              @click="frontPage">
            上一页
          </el-button>
          <el-button
              type="primary"
              class="eicon"
              @click="nextPage"
          >
            下一页
          </el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import Header from "@/components/D_header";
import Aside from "@/components/D_Aside";
import { Search} from '@element-plus/icons'
export default {
  components:{
    Header,
    Aside,
    Search
  },
  data() {
    return {
      year:0,
      month:0,
     addTimes:0,
      tableData: [

      ],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {

      var myHeaders = new Headers();
      myHeaders.append("satoken" , localStorage.getItem("satoken"));
      var time=new Date(),month,year,res,table=[]
      month=time.getMonth()
      month++
      month+=this.addTimes
      year=time.getFullYear()
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      if(month>12){
        month-=12
        year++
      }else if(month<0){
        month+=12
        year--
      }
      await fetch("http://220.179.227.205:6018/appointments/?month="+month+"&year="+year+"&doctor_username=&department_name=&hospital_id=&apt_capacity=&apt_time=", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      this.year=year
      this.month=month
      res=JSON.parse(res)
      console.log(res)
    if(res.data==null){
      this.$message.error("当前时间段，无邀请");
    }
    else{
      for(var i=0,j=0;i<res.data.length;i++){
        if(res.data[i].capacity<0) {
          table.push(res.data[i])
          table[j].capacity = -table[j].capacity
          j++
        }
      }
      this.tableData=table
    }
    },
    nextPage(){
      this.addTimes++
      this.getList()
    },
    frontPage(){
      this.addTimes--
      this.getList()
    },
    accept(index){
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("satoken"));
      myHeaders.append("Content-Type", "application/json");

      var raw = {
        "capacity":this.tableData[index].capacity};

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      var res
      fetch("http://220.179.227.205:6018/appointments/"+this.tableData[index].id, requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      console.log(res)
    },
    refuse(index){
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("satoken"));

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
      var res
      fetch("http://220.179.227.205:6018/appointments/"+this.tableData[index].id, requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      console.log(res)
    }
  },

}
</script>