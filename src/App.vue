<template>

         <router-view/>

</template>

<style>

</style>

<script>

import Header from "@/components/Header";
import Aside from "@/components/Aside";
import { Search } from '@element-plus/icons'

export default {
  name:"Layout",
  components:{
    Header,
    Aside,
    Search
  }
}

</script>