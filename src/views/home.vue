
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



};
</script>

<style scoped>


</style>
