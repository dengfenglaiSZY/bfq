<template>
  <div id="app">
    <!-- 头部公共组件 -->
    <music-header></music-header>
    <!-- 选项卡的公共组件 -->
    <tabs></tabs>
    <!-- 路由页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
import MusicHeader from "@/components/musicHeader"
import tabs from "@/components/tabs"

export default {
  components:{
    MusicHeader,
    tabs,

  }
}
</script>

<style lang="less">
  @import '~@/assets/less/index.less';
</style>



