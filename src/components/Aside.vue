<template >
  <div style="height: 18vh">
<img style="width:90%;height:100%" src="https://s2.loli.net/2021/12/19/umFxbDZChlEcUXS.png">  </div>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="height: 81.9vh; border-right: 1px solid #3C3F41"
      active-text-color="#409EFF"
      background-color="#3C3F41"
      text-color="#fff"
      router
  >
    <el-menu-item index="hospital">
      <el-icon><location /></el-icon>
      <span>预约</span>
    </el-menu-item>
    <el-menu-item index="myReservation">
      <el-icon><icon-menu /></el-icon>
      <span>我的预约</span>
    </el-menu-item>
    <el-menu-item index="account">
      <el-icon><document /></el-icon>
      <span>账户管理</span>
    </el-menu-item>

  </el-menu>
</template>


<script>
import { defineComponent } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons'

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
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