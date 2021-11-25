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
            <el-input
                v-model="input"
                placeholder="请输入内容"
                class="einput"
                clearable
                @change="search(input)"
            ></el-input>
            <el-button
                type="primary"
                class="eicon"
                @click="search(input)"
            >
              <el-icon><Search /></el-icon>
            </el-button>
            <br />
            <el-row :gutter="25">
              <div>
                <el-col
                    v-for="(hospital, index) in listObj" :key="index"
                    class="ecol"
                    v-show="hospital.Visible"
                >
                  <br />  <br />
                  <el-card
                      :body-style="{ padding: '5px' }"
                      class="ecard"
                      v-if="hospital.Visible"
                  >
                    <img
                        :src="hospital.pictue"
                        class="eimg"
                        @click="reservation(hospital.id,hospital.name)"
                        width="300" height="300"

                    />
                    <div
                        style="padding: 0px"
                        class="bottom clearfix"
                        @click="reservation(hospital.id,hospital.name)"
                    >
                      <br />
                      <br />
                      <br />
                      <span>{{ hospital.name }}</span>
                      <br />
                      <span>{{ hospital.position }}</span>
                    </div>
                  </el-card>

                </el-col>
              </div>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { Search} from '@element-plus/icons'
import Header from "@/components/Header";
import Aside from "@/components/Aside";
export default {
  components:{
    Header,
    Aside,
    Search
  },
  data() {
    return {

      input: "",

      pickerOptions: {
        // 限制预约时间
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      listObj: [
        // {
        //   name: "医院1",
        //   pictue: require("./logo.png"),
        //   position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
        // },
        // {
        //   name: "医院2",
        //   pictue: require("./logo.png"),
        //   position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
          
        // },
        // {
        //   name: "医院3",
        //   pictue: require("./logo.png"),
        //   position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
         
        // },
        // {
        //   name: "医院4",
        //   pictue: require("./logo.png"),
        //   position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
      
        // },
        // {
        //   name: "医院5",
        //   pictue: require("./logo.png"),
        //   position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
        
        // },
        // {
        //   name: "医院6",
        //   pictue: require("./logo.png"),
        //   position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
         
        // },
        // {
        //   name: "医院7",
        //   pictue: require("./logo.png"),
        //   position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
        
        // },
        // {
        //   name: "医院8",
        //   pictue: require("./logo.png"),
        //    position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
          
        // },
        // {
        //   name: "医院9",
        //   pictue: require("./logo.png"),
        //   position: "xx市xx",
        //   etype: "success",
        //   outerVisible: false,
        //   innerVisible: false,
        //   Visible: true,
         
        // }
      ],
    };
  },
  created() { 
     this.getInfo();
  
  },
  
  methods: {
    async getInfo()
    { 
      var id="546456"
      var name="麻婆豆腐";
      var pictue= 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhnrb.voc.com.cn%2Fhnrb_epaper%2Fimages%2F2014-12%2F15%2FF2%2Fres07_attpic_brief.jpg&refer=http%3A%2F%2Fhnrb.voc.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639837269&t=2b2e1e684b4360e06688158e30d5f5b8';
      var position= "文案";
      var etype="success";
      var outerVisible=false;
      var innerVisible=false;
      var Visible=true;

      console.log(window.sessionStorage.getItem("token"))
      var res;
      var myHeaders = new Headers();
//myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");

var requestOptions = {
   method: 'GET',
   headers: myHeaders,
   redirect: 'follow'
};

await fetch("http://220.179.227.205:6016/hospital/normal/all", requestOptions)
   .then(response => response.text())
   .then(result => res=result)
   .catch(error => console.log('error', error));
    res=JSON.parse(res)
      console.log(res.length)
      for (let i = 0; i < res.length; i++)
      {
      id=res[i].hospitalId;
      name=res[i].name;
      //pictue=res.data.data[i].dish_picture;
      position=res[i].location;
      console.log(name)
      console.log(position)
      this.listObj.push({  
          id,
          name,
          pictue,
          position,
          etype,
          outerVisible,
          innerVisible,
          Visible
      }); 
      }
       
     console.log(this.listObj)
    },
    search(input) {
      
      for (let i = 0; i < this.listObj.length; i++) {
        var str = "";
        str = this.listObj[i].name;
        if (str.includes(input)) {
          this.listObj[i].Visible = true;
        } else {
          this.listObj[i].Visible = false;
        }
      }
     
      return;
    },
   reservation(id,name) {
      //localStorage.clear("hospitalId")
      localStorage.removeItem(this.hospitalId);
     localStorage.removeItem(this.hospitalName);
      localStorage.setItem("hospitalId", id)
     localStorage.setItem("hospitalName", name)
      this.$router.push("/dept");
     
      return;
    },
   




  },
};
</script>

<style scoped>

.row_container1 {
  width: 100%;
  position: relative;
  left: 7%;
  top: 0%;
  text-align: center ;
}

.ecol {
  padding: 0%;
}
.ecard {
  width:300px;
  height:485px;
  border-radius: 0px;
  text-align: center ;
}
.einput {
  width: 15%;
  position: absolute;
  left: 50%;
  top: 0%;
}
.eicon {
  position: absolute;
  left: 66%;
  top: 0%;
}


.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

</style>
