<template>
   <div class="loading">
    <img src="./loading.gif" alt="">
  </div>
</template>



<script>
  export default{
    data(){
        return {}
    }
  }
</script>



<style lang="less" scoped>
  @import '~@/assets/less/variable.less';
  .loading{
  text-align: center;
  font-size:@font-size-small;
  color:@color-text-l;
  background: @color-background;
  img{
    margin-top: 40%;
    width: 30px
  }

}

</style>