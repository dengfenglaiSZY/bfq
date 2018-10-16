<template>

    <transition name="slide">
        <singer-list :title="title" :bgUrl="bgUrl" :singerList="singerList"></singer-list>
    </transition>

</template>



<script>
import SingerList from '@/components/singerList'
import {getCdInfo} from '@/api'
  export default{
    data(){
        return{
          title:"",
          bgUrl:"",
          singerList:[]
        }
    },
    created(){
      this.getSingerInfoList()
    },
    methods:{
      getSingerInfoList(){
        getSingerInfo().then((res) => {
          this.title = res.data.cdlist[0].dissname;
          this.bgUrl = res.data.cdlist[0].logo;
          this.songList = res.data.cdlist[0].singerlist
          console.log(this.title)
        })
      }
    },
    components:{
      SingerList
    }
  }
</script>



<style lang="less" scoped>
  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:translate3d(100%,0,0);
  }
</style>