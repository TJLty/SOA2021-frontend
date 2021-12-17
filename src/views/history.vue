
<template>
  <div>
    <el-container style="background-color: #3C3F41">
      <el-aside style="width: auto;height: 100vh">
        <D_Aside/>
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <D_Header/>
        </el-header>
        <el-main>
          <el-table :data="tableData" border stripe style="width: auto;height: auto" max-height="800">
            <el-table-column fixed prop="patient_name" label="姓名"  />
            <el-table-column prop="patient_username" label="账号"  />
            <el-table-column prop="department_name" label="科室" />
            <el-table-column prop="code" label="预约号"  />
            <el-table-column prop="date" label="日期"  />
            <el-table-column prop="slot" label="时间"  />
            <el-table-column label="操作" >
            <template #default="scope">
              <el-button
                  type="text"
                  size="small"
                  @click="revoke(scope.$index)"
              >
                撤销
              </el-button>
            </template>
            </el-table-column>
          </el-table>
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
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import D_Header from "@/components/D_header";
import D_Aside from "@/components/D_Aside";
import H_Aside from "@/components/H_Aside";
import { Search} from '@element-plus/icons'
export default {
  components:{
    D_Header,
    D_Aside,
Search
  },
  data() {
    return {
      page:0,
      totalPage:1,
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
      var satoken=localStorage.getItem("satoken"),res
      myHeaders.append("satoken", satoken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
if(this.page<this.totalPage){
      await fetch("api/appointments/details?pageSize=20&currentPage="+this.page+"&history=true&future=false", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
  console.log(res.data)
      this.tableData=res.data.list
   this.totalPage=res.data.totalNumber

      }
else{
  this.$message.success("当前是最后一页了");
}
    },
    async revoke(index){
      var apt_id=localStorage.getItem("apt_id")
      if(this.tableData[index].id==apt_id){
      var res,rps;
        var url="api/appointments/"+this.tableData[index].id+"/details/"
        url+=this.tableData[index].code+"?finish=false"
      var myHeaders = new Headers();
      // myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      var satoken=localStorage.getItem("satoken")
      myHeaders.append("satoken", satoken);
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
        console.log(url)
      console.log(res)
        this.getList()
    }
    else{
        this.$message.error("该患者不是当前时间段患者，无法撤销");
      }
    },
    nextPage(){
      this.page++
      this.getList()
    }
  },

}
</script>