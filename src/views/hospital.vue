<template>
  <div>
    <el-container style="background-color: #3c3f41">
      <el-aside style="width: auto">
        <Aside />
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <Header />
        </el-header>
        <el-main style="width: auto">
          <div class="row_container1">
            <el-input
              v-model="input"
              placeholder="请输入内容"
              class="einput"
              clearable
              @change="search(input)"
            ></el-input>
            <el-button type="primary" class="eicon" @click="search(input)">
              <el-icon><Search /></el-icon>
            </el-button>
            <br />
            <el-row :gutter="25">
              <div>
                <el-col
                  v-for="(hospital, index) in listObj"
                  :key="index"
                  class="ecol"
                  v-show="hospital.Visible"
                >
                  <br />
                  <br />
                  <el-card
                    :body-style="{ padding: '5px' }"
                    class="ecard"
                    v-if="hospital.Visible"
                  >
                    <img
                      :src="hospital.pictue"
                      class="eimg"
                      @click="reservation(hospital.id, hospital.name)"
                      width="300"
                      height="300"
                    />
                    <div
                      style="padding: 0px"
                      class="bottom clearfix"
                      @click="reservation(hospital.id, hospital.name)"
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
          <!-- <ul>
            
            <span
              ><el-button>
                <el-icon class="el-icon--right"
                  ><ArrowLeft
                /></el-icon> </el-button
            ></span>
           
            <span v-for="(item, index) in total" :key="index">
              <button :class="index == queryInfo.pagenum - 1 ? 'active' : ''">
              <el-button>
                {{ index + 1 }}
              </el-button>
            </span>
            
            <span
              ><el-button>
                <el-icon class="el-icon--right"
                  ><ArrowRight
                /></el-icon> </el-button
            ></span>
          </ul> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { Search, ArrowLeft, ArrowRight, Edit } from "@element-plus/icons";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
export default {
  components: {
    Header,
    Aside,
    Search,
    ArrowLeft,
    ArrowRight,
    Edit,
  },
  data() {
    return {
      input: "",
      total: ["a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c"],
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
    async getInfo() {
      var id = "546456";
      var name = "麻婆豆腐";
      var pictue =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhnrb.voc.com.cn%2Fhnrb_epaper%2Fimages%2F2014-12%2F15%2FF2%2Fres07_attpic_brief.jpg&refer=http%3A%2F%2Fhnrb.voc.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639837269&t=2b2e1e684b4360e06688158e30d5f5b8";
      var position = "文案";
      var etype = "success";
      var outerVisible = false;
      var innerVisible = false;
      var Visible = true;

      console.log(window.sessionStorage.getItem("token"));
      var res;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      myHeaders.append("satoken", localStorage.getItem("p_satoken"));
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        // "http://220.179.227.205:6016/hospital/normal/all",
        "http://220.179.227.205:6016/hospitals?filter=",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (res = result))
        .catch((error) => console.log("error", error));
      res = JSON.parse(res);
      if (res.code != 200) {
        console.log("fail to get hospital");
      } else {console.log(res.data);
        console.log(res.data.length);
        for (let i = 0; i < res.data.length; i++) {
          id = res.data[i].hospitalId;
          name = res.data[i].hospitalName;
          //pictue=res.data.data[i].dish_picture;
          position = res.data[i].location;
          console.log(name);
          console.log(position);
          this.listObj.push({
            id,
            name,
            pictue,
            position,
            etype,
            outerVisible,
            innerVisible,
            Visible,
          });
        }
      }

      console.log(this.listObj);
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
    reservation(id, name) {
      //localStorage.clear("hospitalId")
      localStorage.removeItem(this.hospitalId);
      localStorage.removeItem(this.hospitalName);
      localStorage.setItem("hospitalId", id);
      localStorage.setItem("hospitalName", name);
      this.$router.push("/dept");

      return;
    },
    handleSizeChange(newSize) {
      console.log(newSize);
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
    },
  },
};
</script>

<style scoped>
.row_container1 {
  background-color: #ffffff;
  width: 95%;
  position: relative;
  left: 5%;
  top: 0%;
  text-align: center;
}

.ecol {
  padding: 0%;
}
.ecard {
  width: 300px;
  height: 485px;
  border-radius: 0px;
  text-align: center;
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
ul {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
li {
  list-style-type: none;
  font-size: 10px;
  float: left;
  width: 40px;
}
.active {
  color: #fff;
  background-color: #2959df;
}
</style>
