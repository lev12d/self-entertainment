<template>
  <div class="play" ref="plays">
    <div class="bar">
      <svg-icon icon-class="arrowleft" class-name="icon" @click.native="onBack"/>
      <div class="song-info" slot="title">
        <span v-if="getSongDetail">{{ getSongDetail.name }}</span>
        <span v-if="getSongDetail">
          {{ getSongDetail.ar[0].name}}
          <van-icon name="arrow" class="songer-detail"/>
        </span>
      </div>
      <svg-icon icon-class="fenxiang" class-name="icon"/>
    </div>

    <!-- 指针 -->
    <div class="cd-point" ref="point">
      <img src="../../../static/controllerArm.png" alt>
    </div>
    <!-- 中间转盘 -->
    <div :class="['turntable','cd-start']" ref="turntable">
      <div class="img">
        <img :src="getPicUrl">
      </div>
    </div>

    <!-- 列表选项 -->
    <div class="list">
      <span v-for="(item,i) in listIcons" :key="i">
        <svg-icon :icon-class="item"></svg-icon>
      </span>
    </div>

    <!-- 进度条 -->
    <div class="process" id="process">
      <span id="currentTime">{{ currentTime}}</span>
      <div class="process-bar">
        <div class="rdy"></div>
        <div class="cur" ref="cur"></div>
        <span id="processBtn" class="process-btn c-btn" ref="btn"></span>
      </div>
      <span id="totalTime">{{ totalTime }}</span>
    </div>

    <!-- 播放控制 -->
    <div class="play-control">
      <span v-for="(item,i) in controlIcons" :key="i">
        <svg-icon :icon-class="item" @click.native="onPlayControl(item,i)"/>
      </span>
    </div>

    <!-- <audio
      @canplay="getAudio"
      :src="getSongUrl"
      autoplay
      id="audio"
      ref="audio"
      @timeupdate="onTimeUpDate"
      @progress="onProgress"
      @play="onPlay"
      @pause="onPause"
    ></audio>-->
  </div>
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
      song: [],
      listIcons: ["love-o", "xiazai", "xindongshiyan", "pinglun", "gengduo"],
      controlIcons: [
        "xunhuanbofang",
        "shangyiqu",
        "bofang",
        "xiayiqu-wangyiicon",
        "play-list"
      ],
      currentTime: "00.00",
      totalTime: "00.00",
      percentage: 0,
      picUrl: "",
      songID: 0,
      status: null
    };
  },
  computed: {
    //歌曲详情
    getSongDetail() {
      return this.$store.getters.getSongDetail[0];
    },
    //歌曲图片
    getPicUrl() {
      return this.$store.getters.getSongDetail[0].al.picUrl;
    },
    getNowTime() {
      return this.$store.getters.getCurrentTime;
    },
    getTotalTime(){
      return this.$store.getters.getDuration
    }
  },
  methods: {
    //设置背景色
    setBackground() {
      //设置背景色
      this.$refs.plays.style.background = `url('${
        this.getPicUrl
      }') no-repeat center`;
    },

    //返回
    onBack() {
      this.$router.go(-1);
    },
    //转盘是否转动
    isRatote() {
      if (this.status) {
        this.$refs.turntable.classList.remove("cd-pause");
        this.$refs.point.style.transform = "rotate(-85deg)";
        return false;
      }
      this.$refs.turntable.classList.add("cd-pause");
      this.$refs.point.style.transform = "rotate(-102deg)";
    },

    //点击图标控制播放 暂停
    onPlayControl(iconName, index) {
      //点击前更新状态
      this.getPlayStatus();
      if (index == 2) {
        //如果是播放状态
        if (this.status) {
          //设置图标为暂停
          this.$set(this.controlIcons, index, "zanting");
          //设为暂停
          this.$store.commit("SET_PLAY_STATUS", false);
          //指针添加离开转盘的样式
          this.$refs.turntable.classList.add("cd-pause");
          this.$refs.point.style.transform = "rotate(-102deg)";
          return;
        }
        //如果是暂停状态，点击后，图标设置为播放
        this.$set(this.controlIcons, index, "bofang");
        //设置为播放
        this.$store.commit("SET_PLAY_STATUS", true);
        //添加指针移动到转盘的样式
        this.$refs.turntable.classList.remove("cd-pause");
        this.$refs.point.style.transform = "rotate(-85deg)";
      }
    },
    //歌曲总时间
    getDuration(t) {
      // console.log(t);
      let m = parseInt(t / 60);
      let s = Math.floor(t % 60);
      s = s < 10 ? `0${s}` : s;
      this.totalTime = "0" + m + ":" + s;
    },
    //播放时间更新
    onTimeUpDate(t) {
      //自动播放完了设置暂停
      if (this.$store.getters.getEnded) {
        this.$set(this.controlIcons, 2, "zanting");
         this.$store.commit("SET_PLAY_STATUS", false);
      }
      let currentTime = parseInt(t);
      let m = parseInt(currentTime / 60) > 0 ? parseInt(currentTime / 60) : 0;
      let s = currentTime > 59 ? Math.floor(currentTime % 60) : currentTime;
      s = s < 10 ? "0" + s : s;
      this.currentTime = "0" + m + ":" + s;
      //console.log(this.currentTime)
      this.percentage =
        Math.ceil((currentTime * 100) / this.$store.getters.getDuration) + "%";
      this.$refs.cur.style.width = this.percentage;
      this.$refs.btn.style.left = this.percentage;
    },
    //缓冲
    onProgress() {},
    getPlayStatus() {
      this.status = this.$store.getters.getPlayStatus;
    }
  },
  watch: {
    //监听当前歌曲图片url
    getPicUrl: function() {
      this.setBackground();
    },
    //监听当前歌曲播放时间
    getNowTime: function() {
      //不断更新当前时间
      this.onTimeUpDate(this.getNowTime);
    },
    //监听当前歌曲的总时长
    getTotalTime:function(newVal,oldVal){
       if(newVal != 0 ){
          this.getDuration(newVal)
       }
    }
  },
  mounted() {
    //如果需要设置组件不可缓存
    //this.$store.commit("SET_NO_CACHE_VIEWS", this.$options.name);
    //设置背景色
    this.setBackground();
    this.isRatote();
  },
  created() {
    //每次重新进入播放页面，都需要设置默认为播放
    this.$store.commit("SET_PLAY_STATUS", true);
    this.getPlayStatus();
  },
  activated() {
    //获取播放状态
    this.getPlayStatus();
    //图标变化
    if (this.status) {
      this.$set(this.controlIcons, 2, "bofang");
      return;
    }
    this.$set(this.controlIcons, 2, "zanting");
  }
};
</script>

<style scoped>
.play .bar {
  width: 100%;
  height: 50px;
  padding-top: 10px;
  z-index: 103;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.play {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
  background-size: cover;
}
.play::before {
  content: "";
  width: 100%;
  height: 100%;
  background: inherit;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  filter: blur(8px) brightness(0.6);
}
.play .icon {
  color: #d1d1d1;
  font-size: 30px;
  padding: 5px;
}
.play .song-info {
  display: inline-block;
  line-height: 1.5;
  padding: 0 10px;
}
.play .song-info span {
  display: block;
  font-size: 15px;
  color: #d1d1d1;
}
.play .song-info span .songer-detail {
  color: #f1f1f1;
}
.play .song-info span:nth-of-type(2) {
  font-size: 12px;
  color: #c1c1c1;
}
/*指针样式*/
.cd-point {
  width: 100px;
  height: 160px;
  z-index: 102;
  position: absolute;
  top: 10%;
  left: 0;
  margin-left: -60px;
  transform-origin: 100px 0;
  transform: rotate(-100deg);
  transition: all 0.5s ease;
}
.cd-point img {
  width: 100%;
  height: 100%;
}
/*
  转盘样式
*/
.turntable {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 22%;
  margin-left: -130px;
  background: url("../../../static/cddisk.png") no-repeat;
  background-size: cover;
  z-index: 100;
}
/*动画*/
.cd-start {
  animation: cddisk 15s infinite linear;
  animation-fill-mode: forwards;
}
.cd-pause {
  animation-play-state: paused;
  animation-fill-mode: forwards;
}
@keyframes cddisk {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-moz-keyframes cddisk /* Firefox */ {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes cddisk /* Safari 和 Chrome */ {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes cddisk /* Opera */ {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.turntable .img {
  width: 100px;
  height: 100px;
  background: #b1adac;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.turntable .img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/*列表选项样式*/
.list {
  width: 100%;
  position: absolute;
  height: 30px;
  left: 0;
  bottom: 22%;
  z-index: 102;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.list span {
  text-align: center;
  font-size: 25px;
  width: 30px;
}

/*
  播放进度条样式
*/
.process {
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 14%;
  left: 0;
  font-size: 12px;
  z-index: 100;
}
#currentTime,
#totalTime {
  position: absolute;
  color: #d1d1d1;
  padding: 0 6px;
  transform: scale(0.85);
}
#totalTime {
  right: 0;
}
.process .process-bar {
  position: absolute;
  left: 40px;
  width: calc(100% - 90px);
  margin-top: 5px;
  background-color: #615d5c;
}

.process-bar .rdy {
  background-color: #b1adac;
  height: 2px;
}

.process-bar .cur {
  background-color: #fb0d0d;
  height: 2px;
  width: 0;
  position: absolute;
  top: 0;
  left: 0;
}

.process-btn {
  cursor: pointer;
  background: #ccc;
  border-radius: 50%;
  position: absolute;
  top: -2px;
  left: 0;
  width: 6px;
  height: 6px;
}
.play-control {
  width: 100%;
  height: 80px;
  position: absolute;
  left: 0;
  bottom: 3%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

.play-control span {
  font-size: 30px;
  width: 65px;
  text-align: center;
  color: #bfbfbf;
}

.play-control span:nth-of-type(3) {
  font-size: 54px;
}
.play-control span:nth-of-type(1) {
  text-align: right;
}
.play-control span:nth-of-type(5) {
  text-align: left;
}
#audio {
  display: none;
}
</style>