

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
        <el-main style="width: auto" >
          <el-dialog
              v-model="addMaterialVisible"
              title="上传资料"
              width="50%"

          >
            <el-form ref="form" :model="addform" label-width="120px">
              <el-form-item label="资料名：">
                <el-input v-model="addform.name"></el-input>
              </el-form-item>
              <el-form-item label="资料：">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                >
                  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                  <div class="el-upload__text">
                    请拖拽文件或者 <em>点击上传</em>
                  </div>
                  <template #tip>
                    <div class="el-upload__tip">
                      jpg/png 文件大小不要超过 500kb
                    </div>
                  </template>
                </el-upload>
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="addMaterialVisible = false">取消</el-button>
        <el-button type="primary" @click="addMaterialVisible = false"
        >确认</el-button
        >
      </span>
            </template>
          </el-dialog>
          <div >
            <el-card :body-style="{ backgroundColor:'#f4f4f5' } " v-if="look" style="border-radius:15px;border: 2px solid #CCC"><span>我的资料：</span>
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
              <div v-for="(domain, index) in MaterialForm" :key="domain.key" class="text item">
                <div style="padding-top: 4px;padding-bottom: 2px;padding-left: 50px;padding-right: 50px">
                  <el-card shadow="hover"  style="cursor:pointer" :body-style="{ backgroundColor:'#f4f4f5' } ">
                    <div @click="showMaterial(domain,index)">
                      <el-link :underline="false">{{domain.name}}</el-link>
                      <br/><el-link :underline="false"> {{"创建时间:"+domain.createTime}}</el-link>
                    </div>
                    <el-button type="danger" circle @click="deleteFight(domain)" style="position:relative ;left: 95%">
                      <el-icon><delete /></el-icon>
                    </el-button>                  </el-card>
                </div>
              </div>
            </div></el-card>
            <div v-if="!look">
              <iframe :src="material" style="width:80vw;height: 75vh">
              </iframe>
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
import Aside from "@/components/Aside";
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
      addform: {
        name:"",
      },
      material:"",
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
      // myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
      var satoken=localStorage.getItem("satoken")
      myHeaders.append("satoken", satoken);
      var username=localStorage.getItem("username")
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
    showMaterial(domain,index){
      console.log(domain.url)
      window.open(domain.url)
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
