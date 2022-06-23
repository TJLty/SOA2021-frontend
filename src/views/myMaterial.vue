

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
                    action="#"
                    :on-change="this.checkType"
                    :auto-upload="false"
                    multiple
                    typeof="file"
                    :limit="1"
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
        <el-button @click="CTcategory">CT分类</el-button>
        <el-button type="primary" @click="uploadMaterial"
        >确认</el-button
        >
      </span>
            </template>
          </el-dialog>
          <el-dialog
              v-model="CTresultVisible"
              title="CT结果"
              width="50%"

          >
            <el-form ref="form" :model="addform" label-width="120px">
              <el-form-item label="胰腺癌种类：">
                <el-input disabled v-model="CTresult"></el-input>
              </el-form-item>

            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="CTresultVisible = false">关闭</el-button>

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
                      <el-button type="danger" circle @click="deleteFile(domain,index)" style="position:relative ;left: 95%">
                        <el-icon><delete /></el-icon>
                      </el-button>                  </el-card>
                  </div>
                </div>
              </div></el-card>
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
import { ElMessage } from 'element-plus'
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
      CTresult:'请等待...',
      CTresultVisible: false,
      uploadFile:"",
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
      var satoken=localStorage.getItem("p_satoken")
      myHeaders.append("satoken", satoken);
      var username=localStorage.getItem("username")
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      var res
      await fetch("four/files?username="+username+"&name=&start_time=&end_time=&pageSize=20&currentPage=0", requestOptions)
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
    checkType(file, fileList){
      this.uploadFile=file
    },
    async uploadMaterial(){
      this.addMaterialVisible = false
      console.log(this.uploadFile.raw)
      var myHeaders = new Headers();
      var satoken=localStorage.getItem("p_satoken")
      myHeaders.append("satoken", satoken);
      //myHeaders.append("Content-Type", "multipart/form-data");
      var formdata = new FormData();
      if(this.uploadFile.raw==null ||this.uploadFile.name == null)
      {
         ElMessage.error("必要的信息不能为空！");
         return false;
      }
      formdata.append("file",this.uploadFile.raw, this.uploadFile.name);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      var res
      await fetch("four/files/actions/upload", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      res=JSON.parse(res)
      if(res.msg=="ok"){
        var myHeaders1 = new Headers();
        myHeaders1.append("satoken", satoken);
        myHeaders1.append("Content-Type", "application/json");
        var time=new Date()
        var raw = JSON.stringify({
          "id": 63,
          "username": localStorage.getItem("username"),
          "name": this.addform.name,
          "url": res.data,
          "createTime": time.getTime()
        });
        var res1
        var requestOptions1 = {
          method: 'POST',
          headers: myHeaders1,
          body: raw,
          redirect: 'follow'
        };

        await fetch("four/files", requestOptions1)
            .then(response => response.text())
            .then(result => res1=result)
            .catch(error => console.log('error', error));
        res1=JSON.parse(res1)
        this.MaterialForm.push(res1.data)
      }

    },
    async CTcategory(){
      
     
      console.log(this.uploadFile.raw)
      var myHeaders = new Headers();
      // var satoken=localStorage.getItem("p_satoken")
      // myHeaders.append("satoken", satoken);
      //myHeaders.append("Content-Type", "multipart/form-data");
     
      var formdata = new FormData();
      if(this.uploadFile.raw==null ||this.uploadFile.name == null)
      {
         ElMessage.error("必要的信息不能为空！");
         return false;
      }
       this.CTresultVisible = true;
      formdata.append("file",this.uploadFile.raw, this.uploadFile.name);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      var res
      await fetch("http://220.179.227.205:6030/api/predict", requestOptions)
          .then(response => response.text())
          .then(result => res=result)
          .catch(error =>this.$message.error("分类失败"));
      res=JSON.parse(res)
      console.log(res);
      this.CTresult=res.ans;

    },
    backToList(){
      this.look=1
    },
    logout()
    {
      window.sessionStorage.clear();
      this.$router.push("/");
    },
    deleteFile(domain,index){
      this.MaterialForm.splice(index, 1)
      var myHeaders = new Headers();
      myHeaders.append("satoken", localStorage.getItem("p_satoken"));

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("four/files/"+domain.id, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
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
