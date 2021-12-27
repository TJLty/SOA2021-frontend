

<template>
  <div>
    <el-container style="background-color: #3C3F41">
      <el-aside style="width: auto">
        <Aside/>
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <Header/>
        </el-header>
        <el-main style="width: auto">
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
            <el-card :body-style="{ backgroundColor:'#f4f4f5' } " v-if="look" style="border-radius:15px;border: 2px solid #CCC"><span>父级科室：</span>
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
                      <div @click="showDept(domain,index)">
                        <el-link :underline="false">{{domain.fatherDepartmentName}}</el-link>
                        <br/><el-link :underline="false"> {{"拥有科室数:"+domain.departmentList.length}}</el-link>
                      </div>
                    </el-card>
                  </div>
                </div>
              </div></el-card>
            <div v-if="!look">
              <el-card :body-style="{ backgroundColor:'#f4f4f5' } " style="border-radius:15px;border: 2px solid #CCC"><span>{{fatherDeptName+":"}}</span>
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
                  <div v-for="(domain, index) in department" :key="domain.key" class="text item">
                    <div style="padding-top: 4px;padding-bottom: 2px;padding-left: 50px;padding-right: 50px">
                      <el-card shadow="hover"  style="cursor:pointer" :body-style="{ backgroundColor:'#f4f4f5' } ">
                        <div @click="showMaterial(domain,index)">
                          <el-link :underline="false">{{domain.departmentName}}</el-link>
                        </div>
                        <el-button type="danger" circle @click="deleteDept(domain,index)" style="position:relative ;left: 95%">
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
import Header from "@/components/H_header";
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
        DeptName:"",
      },
      addform1: {
        fatherDeptName:"",
        DeptName:"",
      },
      department:"",
      fatherDeptName:"12340",
      deptForm:[
        {
          hospitalId:1,
          fatherDepartmentName:"12340",
          departmentList:[
            {
              departmentName:"a科"
            },
            {
              departmentName:"a科"
            }
          ]
        },
        {
          hospitalId:1,
          fatherDepartmentName:"12345",
          departmentList:[
            {
              departmentName:"a科"
            },
            {
              departmentName:"a科"
            }
          ]
        },
      ]
    };
  },
  created() {
  
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
     await fetch("four/hospitals/"+localStorage.getItem("hospital_login_id")+"/departments", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
      console.log(res)
      if(res.data.length) {

        for (var i = 0; i < res.data.length; i++) {
          if (dept.length) {
            var check = -1
            for (var j = 0; j < dept.length; j++) {
              if (dept[j].fatherDepartmentName === res.data[i].fatherDepartmentName)
                check = j
            }
            if (check==-1) {
              dept.push({
                hospitalId: res.data[i].hospitalId,
                fatherDepartmentName: res.data[i].fatherDepartmentName,
                departmentList: [{
                  departmentName: res.data[i].departmentName
                }]
              })
            } else {
              dept[check].departmentList.push({departmentName:res.data[i].departmentName})
            }

          }
          else{
            dept.push({
              hospitalId: res.data[i].hospitalId,
              fatherDepartmentName: res.data[i].fatherDepartmentName,
              departmentList: [{
                departmentName: res.data[i].departmentName
              }]
            })
          }
        }
      }
      console.log(dept)
      this.deptForm=dept
    },
    showDept(domain,index){
      this.look=0
      this.fatherDeptName=domain.fatherDepartmentName
      this.department=domain.departmentList
    },
    async deleteDept(domain,index){
      this.department.splice(index, 1)
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("h_satoken"));

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("four/hospitals/"+localStorage.getItem("hospital_login_id")+"/departments?department_name="+domain.departmentName, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    },
    async addDept(){
      var check = -1
      for (var j = 0; j < this.deptForm.length; j++) {
        if (this.deptForm[j].fatherDepartmentName === this.fatherDeptName)
          check = j
      }
      this.deptForm[check].departmentList.push({departmentName: this.addform.DeptName})

      this.addMaterialVisible=false
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("h_satoken"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "fatherDepartmentName": this.fatherDeptName,
        "hospitalId": localStorage.getItem("hospital_login_id"),
        "departmentName": this.addform.DeptName
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("four/hospitals/"+localStorage.getItem("hospitalId")+"/departments", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      this.getInfo();
    },
    async addDept1(){
      this.addMaterialVisible1=false
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("h_satoken"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "fatherDepartmentName": this.addform1.fatherDeptName,
        "hospitalId": localStorage.getItem("hospital_login_id"),
        "departmentName": this.addform1.DeptName
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("four/hospitals/"+localStorage.getItem("hospital_login_id")+"/departments", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      this.getInfo();
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
