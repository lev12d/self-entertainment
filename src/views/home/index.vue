<template>
  <div id="home">
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
</template>

<script>
import Mine from "./components/mine/index.vue";
import Find from "./components/find/index.vue";
import Friend from "./components/friend/index.vue";
import Videos from "./components/videos/index.vue";
export default {
  name: "Home",
  components: { Mine, Find, Friend, Videos },
  data() {
    return {
      navList: [
        { name: "我的", path: "mine", isActive: true },
        { name: "发现", path: "find", isActive: false },
        { name: "朋友", path: "friend", isActive: false },
        { name: "视频", path: "videos", isActive: false }
      ],
      active: {},
      activeIndex: 0
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
    }
  },
  watch: {},
  methods: {
    handleClick(active, index) {
      this.active = active;
      this.activeIndex = index;
    },
    handleSearch(){
       this.$router.push({path:'/search'})
    }
  },
  mounted() {}
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
</style>