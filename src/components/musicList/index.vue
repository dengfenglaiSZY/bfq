<template>
  <div class="music-list">
    <!-- 返回上一层 -->
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <!-- 歌曲信息 -->
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" ref="bgImage" :style="bgImg">
      <div class="play-wrapper">
        <div ref="playBtn" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <!-- 滑动辅助层 -->
    <div class="bg-layer" ref="layer"></div>
    <!-- 歌曲列表 -->
    <!-- :listenScroll=true :probeType=3的值是根据scroll文件夹里的index.vue文件内容写的 -->
    <scroll ref="scroll" class="list" @scroll="scroll" :listenScroll=true :probeType=3>
      <div class="song-list-wrapper">
        <div class="song-list">
          <ul>
            <li class="item" v-for="(item,index) in songList" :key="item.key">
              <div class="rank">
                <span class="text">{{index+1}}</span>
              </div>
              <div class="content">
                <h2 class="name">{{item.songname}}</h2>
                <p class="desc"><span v-for="b in item.singer" :key="b.key">{{b.name}} . </span>{{item.albumname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <!-- 加载效果 -->
    <div class="loading-cantainer" v-show="isLoading"><loading></loading></div>
  </div>
</template>

<script>
  import {getCdInfo} from "@/api";
  import Scroll from "@/components/scroll";
  import Loading from "@/components/loading";
  export default {
    // 子组件接收父组件detail.vue传值
    props:{
      title:{
        type:String,
        default:""
      },
      bgUrl:{
        type:String,
        default:""
      },
      songList:{
        type:Array,
        default:[]
      }
    },
    data(){
      return{
        scrollY:0,
        isLoading:true,
      }
    },
    created(){
      this.getSlide();
    },
    mounted(){
      //获取背景图片的高度,并将滚动区域的top设置成背景图片的高度
      this.bgHeight = this.$refs.bgImage.clientHeight;
      this.$refs.scroll.$el.style.top = `${this.bgHeight}px`;
      this.ty = -this.bgHeight + 40;
    },
    components:{
      Scroll,
      Loading
    },
    methods:{
      // 路由返回上一层函数
      back(){
        this.$router.back();
      },
      // 随机播放全部背景图片的滚动事件
      scroll(pos){
        this.scrollY = pos.y
      },
      getSlide:function(){
        getCdInfo().then((res) => {
          this.isLoading = false;
        })
      }
    },
    computed:{
      bgImg(){
        return `background-image:url('${this.bgUrl}')`
      }
    },
    // 背景图片高度变化及下拉图片缩放效果监听
    watch:{
      scrollY(v){
        let translateY = Math.max(this.ty,v);
        let zIndex = 0;
        //下拉图片缩放效果
        let scale = 1;
        const p = Math.abs(v/this.bgHeight);
        if(v>0){
          scale = 1 + p;
          zIndex = 10;
        }
        //背景图片高度变化效果
        this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
        if(v < this.ty){
          zIndex = 10;
          this.$refs.bgImage.style.paddingTop = 0;
          this.$refs.bgImage.style.height = '40px';
          this.$refs.playBtn.style.display = 'none';
        }else{
          this.$refs.bgImage.style.paddingTop = '70%';
          this.$refs.bgImage.style.height = 0;
          this.$refs.playBtn.style.display = 'block';
        }
        this.$refs.bgImage.style.zIndex = zIndex;
        this.$refs.bgImage.style.transform = `scale(${scale})`;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~@/assets/less/variable.less';
  // 随机播放页面样式
  .music-list{
    position: fixed;
    z-index: 100;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background: @color-background;
    //返回上一层样式
    .back{
      position: absolute;
      top:0;
      left:0.06rem;
      z-index:50;
      .icon-back{
        display: block;
        padding:0.1rem;
        font-size: @font-size-large-x;
        color:@color-theme;
      }
    }
    // 歌曲信息样式
    .title{
      position: absolute;
      top:0;
      left:10%;
      z-index:40;
      width:80%;
      text-align:center;
      line-height: 0.4rem;
      font-size:@font-size-large;
      color:@color-text;
    }
    .bg-image{
      position: relative;
      width:100%;
      height:0;
      padding-top:70%;
      transform-origin:top;
      background-size: cover;
      .play-wrapper{
        position: absolute;
        bottom:0.2rem;
        z-index:50;
        width:100%;
        .play{
          box-sizing: border-box;
          width:1.35rem;
          padding:0.07rem 0;
          margin:0 auto;
          text-align:center;
          border:1px solid @color-theme;
          color:@color-theme;
          border-radius: 1rem;
          font-size:0;
          .icon-play{
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.06rem;
            font-size:@font-size-medium-x;
          }
          .text{
            display: inline-block;
            vertical-align:middle;
            font-size:@font-size-small;
          }
        }
      }
    }
    // 滑动辅助层样式
    .bg-layer{
      position: relative;
      height:100%;
      background:@color-background;
    }
    // 歌曲列表样式
    .list{
      position: fixed;
      top:0;
      bottom:0;
      width:100%;
      background:@color-background;
      transition: all 0.5s;
      .song-list-wrapper{
        padding:0.1rem 0.2rem;
        .song-list{
          .item{
            display: flex;
            align-items: center;
            box-sizing:border-box;
            height:0.64rem;
            font-size:@font-size-medium;
            .rank{
              flex: 0 0 0.25rem;
              width:0.25rem;
              margin-right:0.2rem;
              text-align:center;
              .text{
                color:@color-theme;
                font-size:@font-size-large;
              }
            }
            .content{
              flex:1;
              line-height:0.2rem;
              overflow:hidden;
              .name{
                color:@color-text;
              }
              .desc{
                margin-top: 0.04rem;
                color:@color-theme-d;
              }
            }
          }
        }
      }
    }
    .loading-cantainer{
      position: absolute;
      width:100%;
      height:100%;
      top:50%;
      transform:translateY(-50%);
      z-index:99;
      background:#222;
    }
  }
</style>