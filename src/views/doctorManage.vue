

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
          <el-dialog
              v-model="addMaterialVisible1"
              title="添加科室"
              width="50%"

          >
            <el-form ref="form" :model="addform1" label-width="120px">
              <el-form-item label="父级科室名：">
                <el-input v-model="addform1.fatherDeptName"></el-input>
              </el-form-item>
              <el-form-item label="科室名：">
                <el-input v-model="addform1.DeptName"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="addMaterialVisible1 = false">取消</el-button>
        <el-button type="primary" @click="addDept1()"
        >确认</el-button
        >
      </span>
            </template>
          </el-dialog>
          <el-dialog
              v-model="addMaterialVisible"
              title="添加科室"
              width="50%"

          >
            <el-form ref="form" :model="addform" label-width="120px">
              <el-form-item label="科室名：">
                <el-input v-model="addform.DeptName"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="addMaterialVisible = false">取消</el-button>
        <el-button type="primary" @click="addDept()"
        >确认</el-button
        >
      </span>
            </template>
          </el-dialog>
          <div >
            <el-card :body-style="{ backgroundColor:'#f4f4f5' } " v-if="look" style="border-radius:15px;border: 2px solid #CCC"><span>科室：</span>
              <el-button
                  type="primary"
                  style="position: relative;left: 85%"
                  @click="addMaterialVisible1=1"
              >
                <el-icon><plus /></el-icon>
              </el-button>
              <br/>
              <br/>
              <div style="background-color: lavenderblush" class="Upcoming">
                <div v-for="(domain, index) in deptForm" :key="domain.key" class="text item">
                  <div style="padding-top: 4px;padding-bottom: 2px;padding-left: 50px;padding-right: 50px">
                    <el-card shadow="hover"  style="cursor:pointer" :body-style="{ backgroundColor:'#f4f4f5' } ">
                      <div @click="showDoctor(domain,index)">
                        <el-link :underline="false">{{domain.departmentName}}</el-link>
<!--                        <br/><el-link :underline="false"> {{"拥有医生数:"+domain.doctorList.length}}</el-link>-->
                      </div>
                    </el-card>
                  </div>
                </div>
              </div></el-card>
            <div v-if="!look">
              <el-card :body-style="{ backgroundColor:'#f4f4f5' } " style="border-radius:15px;border: 2px solid #CCC"><span>{{DeptName+":"}}</span>
                <el-button
                    type="primary"
                    style="position: relative;left: 85%"
                    @click="addMaterialVisible=1"
                >
                  <el-icon><plus /></el-icon>
                </el-button>
                <br/>
                <br/>
                <div style="background-color: lavenderblush" class="Upcoming">
                  <div v-for="(domain, index) in doctorList" :key="domain.key" class="text item">
                    <div style="padding-top: 4px;padding-bottom: 2px;padding-left: 50px;padding-right: 50px">
                      <el-card shadow="hover"  style="cursor:pointer" :body-style="{ backgroundColor:'#f4f4f5' } ">
                        <div @click="showMaterial(domain,index)">
                          <el-link :underline="false">{{domain.name}}</el-link><br/>
                          <el-link :underline="false">{{domain.username}}</el-link>
                        </div>
                        <el-button type="danger" circle @click="deleteDoctor(domain,index)" style="position:relative ;left: 95%">
                          <el-icon><delete /></el-icon>
                        </el-button>
                      </el-card>
                    </div>
                  </div>
                </div></el-card>
              <el-button @click="backToList">返回</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/H_Aside";
import {Search, Plus} from "@element-plus/icons";
import { UploadFilled,Delete } from '@element-plus/icons'
export default {
  components:{
    Header,
    Aside,
    Search,
    Plus,
    UploadFilled,
    Delete
  },
  data() {
    return {
      look:1,
      addMaterialVisible:0,
      addMaterialVisible1:0,
      addform: {
        doctorName:"",
      },
      addform1: {
        DeptName:"",
        doctorName:"",
      },
      doctorList:"",
      DeptName:"12340",
      deptForm:[
      ]
    };
  },
  created() {
    localStorage.setItem("hospitalId","1")
    localStorage.setItem("h_satoken","e0de8c0d-ce35-4162-9af3-5629abcc48e7")
    this.getInfo();

  },

  methods: {
    async getInfo()
    {
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("h_satoken"));

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      var res,dept=[]

      await fetch("http://220.179.227.205:6016/hospitals/"+localStorage.getItem("hospitalId")+"/departments", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)

      this.deptForm=res.data
     //console.log(this.deptForm)
    },
    async showDoctor(domain,index){
      this.look=0
      this.DeptName=domain.departmentName
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("h_satoken"));
      var requestOptions1 = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      var res
      await fetch("http://220.179.227.205:6016/hospitals/"+localStorage.getItem("hospitalId")+"/doctors?department="+this.DeptName, requestOptions1)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
      console.log(res)
      this.doctorList=res.data

    },
    deleteDoctor(domain,index){
      this.doctorList.splice(index, 1)
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("h_satoken"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "username": domain.username
      });

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://220.179.227.205:6016/hospitals/"+localStorage.getItem("hospitalId")+"/doctors", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    },
    backToList(){
      this.look=1
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
