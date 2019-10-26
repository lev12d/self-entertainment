<template>
<div>
  <div id="home" v-if="getPath=='/home'">
    <van-nav-bar>
      <van-icon name="wap-nav" slot="left" class="icon"/>
      <span
        v-for="(item,index) in navList"
        :key="index"
        slot="title"
        @click="handleClick(item,index)"
        class="title"
        :class="activeIndex === index?'active':''"
      >{{item.name}}</span>
      <van-icon name="search" slot="right" class="icon" @click="handleSearch"/>
    </van-nav-bar>

    <transition name="van-slide-left" mode="out-in">
      <component :is="getComponent"></component>
    </transition>
  
  </div>

    <!-- 音频播放 -->
    <audio :src="getSongUrl" 
           ref="playAudio" 
           id="audio"
           @durationchange ="getAudioDuration"
           @ended="endedPlay"
           @play="onPlay"
           @pause="onPause"
           @canplay="onCanPlay"
           @timeupdate="onTimeUpdate"
           autoplay
           >
    </audio>

     <keep-alive>
     <router-view v-if="getPath == '/home/search' || getPath == '/home/search/player'"></router-view>
     </keep-alive>

      <mini-player></mini-player>
  </div>
</template>

<script>
import Mine from "./components/mine/index.vue";
import Find from "./components/find/index.vue";
import Friend from "./components/friend/index.vue";
import Videos from "./components/videos/index.vue";
import MiniPlayer from '@/components/MiniPlayer.vue'
export default {
  name: "Home",
  components: { Mine, Find, Friend, Videos, MiniPlayer },
  data() {
    return {
      navList: [
        { name: "我的", path: "mine", isActive: true },
        { name: "发现", path: "find", isActive: false },
        { name: "朋友", path: "friend", isActive: false },
        { name: "视频", path: "videos", isActive: false }
      ],
      active: {},
      activeIndex: 0,
      
    };
  },
  computed: {
    getComponent() {
      switch (this.active.path || "mine") {
        case "mine":
          return "Mine";
          break;
        case "find":
          return "Find";
          break;
        case "friend":
          return "Friend";
          break;
        case "videos":
          return "Videos";
          break;
        default:
          break;
      }
    },
     getPath(){
       return this.$route.fullPath
     },
    
    getPicDetail(){
        if(this.$store.getters.getSongDetail.length > 0){
            // console.log(this.$store.getters.getSongDetail[0])
            return this.$store.getters.getSongDetail[0]
        }else{
            return {}
        }
    },
    getSongUrl(){
       return this.$store.getters.getCurrentSong.url
    },
   //从Vuex中获取当前的播放状态
    getPlayStatus(){
        return this.$store.getters.getPlayStatus
    }
  },
  //监听Vuex中当前的播放状态，true为播放,false为暂停
  watch: {
    getPlayStatus:function(){
         if(this.getPlayStatus ){
          this.$refs.playAudio.play()
      }else{
          this.$refs.playAudio.pause()
      }
    }
  },
  methods: {
    handleClick(active, index) {
      this.active = active;
      this.activeIndex = index;
    },
    handleSearch(){
       this.$router.push({path:'/home/search'})
    },
    onCanPlay(){
      this.$store.commit('SET_END_STATUS',false)
      this.$store.commit('SET_PLAY_STATUS',true)
    },
   //获取歌曲的总时间 
    getAudioDuration(){

      let duration = this.$refs.playAudio.duration;
      this.$store.commit('SET_DURATION',duration)
     // this.$refs.playAudio.autoplay = true
    },
    //播放结束后把自动播放去掉
    endedPlay(){
     // this.$refs.playAudio.autoplay = false
     this.$store.commit('SET_END_STATUS',true)
    },
    //播放时时间改变
    onTimeUpdate(){
      let currentTime = this.$refs.playAudio.currentTime
       this.$store.commit('SET_CURRENT_TIME',currentTime)
    },
    onPlay(){
       //this.$store.commit('SET_PLAY_STATUS',true)
    },
    onPause(){
     // this.$store.commit('SET_PLAY_STATUS',false)
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
.title {
  padding: 8px;
  font-size: 16px;
}
.active {
  color: #000;
  font-size: 20px;
  font-weight: bolder;
}
.icon {
  font-size: 18px;
  color: #111;
}
#audio {
  display: none;
}
</style>