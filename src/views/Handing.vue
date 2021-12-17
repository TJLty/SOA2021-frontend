

<template>
  <div>
    <el-container style="background-color: #3C3F41">
      <el-aside style="width: 230px">
        <D_Aside/>
      </el-aside>
      <el-container style="background-color: white">
        <el-header style="height: 10vh">
          <D_Header/>
        </el-header>
        <el-main>
          <div class="hand_container">
            <el-dialog
                v-model="confirmVisible"
                title="加入科室"
                width="30%"
                :show-close="false"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
            >
              <el-form
                  ref="addForm"
                  :model="addForm"
                  status-icon
                  label-width="120px"
                  class="demo-ruleForm"
              >
                <el-form-item label="医院" prop="hospitalName">
                  <el-select v-model="addForm.hospitalName" placeholder="请选择医院">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="科室" prop="deptName">
                  <el-autocomplete
                      v-model="addForm.deptName"
                      :fetch-suggestions="querySearch"
                      class="inline-input"
                      placeholder="请输入科室名"
                      @select="handleSelect"
                  />
                </el-form-item>
                <el-form-item label="验证码" prop="verify">
                  <el-input
                      v-model="addForm.verify"
                      type="text"
                      autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmVisible = false"
        >确定</el-button
        >
      </span>
              </template>
            </el-dialog>
            <div class="hand">
              <el-button  style="min-height: 400px;min-width: 400px;background-color:#E0773A " circle
              @click="hand">
                <div>
               <span style="font-size:200px;color: #ebeef1;text-shadow: 2px 2px 0 #5D95CE,2px -2px 0 #5D95CE, -2px -2px 0 #5D95CE, -2px 2px 0 #5D95CE;">{{number}}</span><br/><br/><span style="font-size:60px;color: #ebeef1;text-shadow: 2px 2px 0 #5D95CE,2px -2px 0 #5D95CE, -2px -2px 0 #5D95CE, -2px 2px 0 #5D95CE;">{{name}}</span>
                </div>
              </el-button>
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
import D_Header from "@/components/D_header";
import D_Aside from "@/components/D_Aside";
import H_Aside from "@/components/H_Aside";
import {Search} from "@element-plus/icons";
export default {
  components:{
    D_Header,
    D_Aside,
    Search
  },
  data() {
    return {
      depts: [],
      options: [
        {
          value: '0',
          label: 'a院',
        },
        {
          value: '1',
          label: 'b院',
        }
      ],
      addForm:{},
      confirmVisible:false,
      name:"暂无",
      telephone:"11111111",
      number:"0",
      patient_id:"",
      isCollapse: true,
    };
  },
  created() {
    this.getInfo();
    this.depts = this.loadAll();
  },

  methods: {
    async getInfo()
    {
      var res,rps;
      var myHeaders = new Headers();
      // myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");
       var satoken=localStorage.getItem("satoken")
       myHeaders.append("satoken", satoken);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("api/appointments/details/now", requestOptions)
          .then(response => rps=response.text())
          .then(result => res=result)
          .catch(error => console.log('error', error));
      console.log(1234)
      console.log(res)
      res=JSON.parse(res)
      if(res.data!=null){
      localStorage.setItem("apt_id",res.data.id)
      localStorage.setItem("apt_num",res.data.code)
      this.name=res.data.patient_name
      this.number=res.data.code
      this.patient_id=res.data.patient_username
 if(res.data.department_name==null){
   this.confirmVisible=true
 }
      }else{
        this.$message.success("当前已无患者可处理");
      }
    },
    async hand(){
      var res,rps;
      var url="api/appointments/"+localStorage.getItem("apt_id")+"/details/"
      url+=localStorage.getItem("apt_num")+"?finish=true"
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
      console.log(res.code)

      this.getInfo()

    },
    querySearch(queryString, cb) {
      var depts = this.depts;
      var results = queryString ? depts.filter(this.createFilter(queryString)) : depts;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (dept) => {
        return (dept.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
        { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" },
        { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
        { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
        { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
        { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
        { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
        { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
        { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
        { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
        { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
        { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
        { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
        { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
        { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
        { "value": "浏阳蒸菜", "address": "天山西路430号" },
        { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
        { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
        { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
        { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
        { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
        { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },

}
</script>

<style scoped>
.hand_container {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0%;
  top: 0%;
}
.hand{
  position: relative;
  left: 30%;
  top: 20%;
}

</style>
