<template>

    <transition name="slide">
        <music-list :title="title" :bgUrl="bgUrl" :songList="songList"></music-list>
    </transition>

</template>



<script>
import MusicList from '@/components/musicList'
import {getSingerInfo} from '@/api'
  export default{
    data(){
        return{
          title:"",
          bgUrl:"",
          songList:[],
        }
    },
    created(){
      this.getSingerInfoList()
    },
    methods:{
      getSingerInfoList(){
        getSingerInfo(this.$route.params.id).then((res) => {
          let arr = [];
          this.title = res.data.singer_name;
          this.bgUrl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`;
          for(var i in res.data.list){
            arr.push(res.data.list[i].musicData)
          }
          this.songList =arr
        })
      },

    },
    components:{
      MusicList
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
