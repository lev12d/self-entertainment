<template>
  <div
    class="bottom-play"
    v-show="(getPath == '/home'&& hasSong) || (getPath == '/home/search' && hasSong)"
  >
    <div class="b-left">
      <div class="pic" @click="openFullPlayer">
        <img :src="getPicDetail.al?getPicDetail.al.picUrl:'' ">
      </div>
      <div class="txt">
        <span v-if="getPicDetail.name">{{ getPicDetail.name}}</span>
        <p v-if="getPicDetail.ar">{{ getPicDetail.ar[0].name }}</p>
      </div>
    </div>
    <div class="b-right">
      <van-circle
        :stroke-width="50"
        layer-color="#888"
        color="red"
        size="35px"
        class="progress"
        :rate="targetTime"
        v-model="currentProgress"
      >
        <svg-icon
          :icon-class="getPlayStatus?'pause':'play'"
          class="icon-control"
          @click.native="handlePlay"
        ></svg-icon>
      </van-circle>
      <svg-icon icon-class="play-list" class="icon"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniPlayer",
  data() {
    return {
      targetTime: 0,
      currentProgress: 0, //当前进度
      totalTime: 0,
      updateTime: 0
    };
  },
  computed: {
    //初始化没有歌曲就不显示
    hasSong() {
      if (JSON.stringify(this.$store.getters.getCurrentSong) == "{}") {
        return false;
      } else {
        return true;
      }
    },
    getPath() {
      return this.$route.fullPath;
    },
    getPicDetail() {
      if (this.$store.getters.getSongDetail.length > 0) {
        // console.log(this.$store.getters.getSongDetail[0])
        return this.$store.getters.getSongDetail[0];
      } else {
        return {};
      }
    },

    //获取播放状态
    getPlayStatus() {
      return this.$store.getters.getPlayStatus;
    },
    //获取当前正在播放的时间
    getNowTime() {
      return this.$store.getters.getCurrentTime;
    },
    getTotalTime() {
      return this.$store.getters.getDuration;
    }
  },

  watch: {
    //监听当前歌曲播放时间
    getNowTime: function() {
      //不断更新当前时间
      this.onTimeUpDate(this.getNowTime);
    },
    getTotalTime: function(newVal) {
      if (newVal != 0) {
        this.getDuration(newVal);
      }
    }
  },
  methods: {
    //全屏播放器
    openFullPlayer() {
       this.$router.push('/home/search/player')
    },
    handlePlay() {
      if (this.getPlayStatus) {
        this.$store.commit("SET_PLAY_STATUS", false);
        return false;
      }
      this.$store.commit("SET_PLAY_STATUS", true);
    },
    //歌曲总时间
    getDuration(t) {
      this.totalTime = Math.ceil(t);
    },
    //播放时间更新
    onTimeUpDate(t) {
      if (Math.ceil(t) == this.updateTime) {
        return false;
      }
      this.updateTime = Math.ceil(t);
      let target = this.updateTime / this.totalTime;
      this.targetTime = Math.ceil(target * 100);
    }
  },
  created() {
    //   this.$store.commit('SET_NO_CACHE_VIEWS',this.$options.name)
  },
  activated() {}
};
</script>

<style scoped>
.bottom-play {
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-top: 1px solid #adadad;
  position: fixed;
  right: 0;
  bottom: 0;
}
.bottom-play .b-left,
.b-right {
  height: 52px;
}
.bottom-play .pic {
  width: 45px;
  height: 45px;
  float: left;
  margin-top: 3px;
  border-radius: 50%;
  border: 1px solid #666;
}
.pic img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.b-left {
  width: 80%;
  height: 52px;

  overflow: hidden;
}
.b-right {
  width: 30%;
  font-size: 28px;
  text-align: right;
  color: #888;
}
.b-right .icon {
  padding-right: 12px;
  margin-bottom: 6px;
}

.b-left .txt {
  float: left;
  font-size: 14px;
  margin-left: 4px;
  width: 80%;
  line-height: 1.8;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.txt p {
  font-size: 12px;
  color: #989898;
}
.progress {
  margin-top: 10px;
}
.icon-control {
  font-size: 25px;
  margin-left: 4px;
  margin-top: 2px;
}
</style>