<template>
  <div class="recommend">
    <scroll class="recommend-content">
      <div>
        <div class="swiper-container banner" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in slider" :key="item.key">
              <img :src="item.picUrl" width="100%">
            </div>
            <!-- <div class="swiper-pagination"></div> -->
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="recommend-list">
            <h3 class="list-title">热门歌单推荐</h3>
            <ul>
              <li class="item" v-for="item in list" :key="item.key" @click="detail(item.id)">
                 <div class="icon">
                   <img width="60" height="60" alt="" :src="item.picUrl">
                 </div>
                 <div class="text">
                   <h2 class="name">{{item.songListAuthor}}</h2>
                   <p class="desc"  >{{item.songListDesc}}</p>
                 </div>
              </li>
            </ul>
          </div>

      </div>

    </scroll>
   <div class="loading" v-show="isLoading">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import axios from "axios"
import {getRecommend} from '@/api'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'


export default {
  data:function(){
    return {
      slider:[],
      list:[],
      isLoading:true,
    }
  },

  mounted(){
    this.$nextTick(() => {
        this.swiper = new Swiper(this.$refs.swiper,{
            observer:true,
            observerParents:true,
            pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            bulletElement : 'li', //设定分页器指示器（小点）的HTML标签。
            clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        },

        })
    })
  },

  created(){
    this.getSlide();
  },

  methods:{
    getSlide:function(){
      getRecommend().then(res => {
        console.log(res);
        this.slider = res.data.slider
        this.list = res.data.songList
        var banner = new Swiper('.banner',{})
        this.isLoading=false
      })
    },
    detail(id){
      this.$router.push({path:`/recommend/${id}`})
    }
  },
  components:{
    Scroll,
    Loading
  }
}

</script>


<style lang="less" scoped>
@import '~@/assets/less/variable.less';
    .recommend{
        position:fixed;
        width:100%;
        top:0.94rem;
        bottom:0;
        overflow: hidden;
      .recommend-content{
          position: fixed;
          top: 1rem;
          bottom: 0;
          width: 100%;
          overflow: hidden;
        .recommend-list{
         .list-title{
           color:@color-theme;
           height:15px;
           line-height:15px;
           width:100%;
           text-align:center;
           font-size:0.17rem;
         }
         .item{
           height:0.7rem;
           width:90%;
           margin:0.2rem;
           .icon{
             margin-top:-5px;
             margin-right:0.1rem;
             display:inline-block;
           }
           .text{
             font-size:0.15rem;
             width:1.87rem;
             display:inline-block;
             .name{
               position:relative;
               top:-10px;
             }
             .desc{
                line-height:0.2rem;
                font-size:0.13rem;
                color:@color-text-ll;


             }
           }

         }

        }

      }

    }
    .loading{
      position: fixed;
      width: 100%;
      top:90px;
      bottom: 0;
      z-index:1000;
    }
</style>
