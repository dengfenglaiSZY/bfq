<template>
  <div class="tabs">
    <router-link to="/recommend">
      <span class="tabs_txt">推荐</span>
    </router-link>
    <router-link to="/singer">
      <span class="tabs_txt">歌手</span>
    </router-link>
    <router-link to="/rank">
      <span class="tabs_txt">排行</span>
    </router-link>
    <router-link to="/search">
      <span class="tabs_txt">搜索</span>
    </router-link>
  </div>
</template>


<script>
  export default{

  }
</script>



<style lang="less" scoped>
@import url('~@/assets/less/variable.less');
  .tabs{
    font-size:0.14rem;
    height:0.44rem;
    display: flex;
    a{
      flex:1;
      text-align:center;
      line-height:0.44rem;
      color:@color-text-ll;
      &.router-link-active{
        color:@color-theme;
      }
    }
  }
</style>