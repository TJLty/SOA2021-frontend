<template>
  <div style="height: 10vh; line-height: 10vh;border-bottom: 1px solid #CCC;display: flex;min-height: 50px;">
    <div style="width: 200px; padding-left: 10px;font-weight: bold;font-size: larger;color:#409EFF ">医生办公室预约系统</div>
    <div style="flex: 1;"></div>
    <div style="width: 80px">
      <el-dropdown>
        <el-button type="primary">
          <el-icon><avatar /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="tohome">主页</el-dropdown-item>
            <el-dropdown-item @click="todinfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="gotoHistory">历史记录</el-dropdown-item>
            <el-dropdown-item @click="logout">账号登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import {
  Avatar
} from '@element-plus/icons'

export default defineComponent({
  components: {
    Avatar
  },
  methods:{
    todinfo(){
    
      this.$router.push("/dinfo");
    
    },
    tohome(){
    
      this.$router.push("/handing");
    
    },
    
    logout()
    {
      window.sessionStorage.clear();
      this.$router.push("/");
    },
    gotoHistory()
    {
      this.$router.push("/history");
    }
  },
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
    }
  },
})
</script>

<style scoped>

</style>