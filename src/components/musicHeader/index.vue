<template>
  <div class="music-header">
    <span class="logo"></span>
    <h2 class="text">网易云音乐</h2>
  </div>
</template>

<script>
  export default{

  }
</script>

<style lang="less" scoped>
  @import url('~@/assets/less/variable.less');
  .music-header{
    height:0.44rem;
    text-align:center;
    position:relative;
    .logo{
      position:relative;
      width:0.32rem;
      height:0.32rem;
      display: inline-block;
      background:url('logo.png');
      background-size:100% 100%;
      margin-right:-0.2rem;
      top:-0.6rem;
    }
    .text{
      display: inline-block;
      line-height:0.44rem;
      color:@color-theme;
      position:relative;
      top:-0.66rem;
      font-size:0.14rem;
    }
  }
</style>