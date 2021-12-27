

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

            <el-form ref="form" :model="addform" label-width="120px">
              <el-form-item label="病人id：">
                <el-input v-model="addform.id"></el-input>
              </el-form-item>
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
              <el-form-item>
                <el-button type="primary" style="position: relative;left: 90%" @click="uploadMaterial">
                  确定
                </el-button>
              </el-form-item>
            </el-form>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/H_header";import Aside from "@/components/H_Aside";
import {Search, Plus} from "@element-plus/icons";
import { UploadFilled } from '@element-plus/icons'
export default {
  components:{
    Header,
    Aside,
    Search,
    Plus,
    UploadFilled
  },
  data() {
    return {
      uploadFile:"",
      look:1,
      addform: {
        id:"",
        name:"",
      },

    };
  },
  created() {
    
  },

  methods: {
    async uploadMaterial(){
      var dir='img';
      console.log(this.uploadFile.raw)
      var myHeaders = new Headers();
      var satoken=localStorage.getItem("p_satoken")
      myHeaders.append("satoken", satoken);
      //myHeaders.append("Content-Type", "multipart/form-data");
      var formdata = new FormData();
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
          "id": 9999,
          "username": this.addform.id,
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
        console.log(res1)
        this.addform=""
        this.uploadFile=""
        if(res1.msg=="ok") {
          this.$message.success("上传成功");
        }else{
          this.$message.error("上传失败");
        }
      }

    },
    checkType(file, fileList){
      this.uploadFile=file
    },
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
