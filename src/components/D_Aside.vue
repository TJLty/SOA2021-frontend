<template>
  <div style="height: 100vh;width: auto">
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="#409EFF"
      background-color="#3C3F41"
      text-color="#fff"
      router
  >
    <el-button  @click="change1" v-if="see" style="background-color: #3C3F41;border-color: #3C3F41;padding-top: 15px"><el-icon style="color: white;width: 20px;height: auto"><expand /></el-icon></el-button>
    <div style="padding-left: 180px;padding-top: 12px" v-if="!see">
      <el-button @click="change2" style="background-color: #3C3F41;border: 2px solid white">
        <el-icon style="color:white;"><fold /></el-icon>
      </el-button>
    </div>
    <img v-if="!see" style="width:90%;height:100%" src="https://s2.loli.net/2021/12/19/umFxbDZChlEcUXS.png">
        <el-menu-item index="handing">
          <el-icon><location /></el-icon>
          <span>叫号</span>
        </el-menu-item>
        <el-menu-item index="workManagement">
          <el-icon><icon-menu /></el-icon>
          <span>我的预约</span>
        </el-menu-item>
  </el-menu>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  Fold,
  Expand,
} from '@element-plus/icons'

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
    Fold,
    Expand,
  },
  methods: {
    change1(){
      this.isCollapse=false
      this.see=false
    },
    change2(){
      this.isCollapse=true
      this.see=true
    }
  },
  data(){
    return{
      isCollapse:false,
      see:false
    }
  }
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>