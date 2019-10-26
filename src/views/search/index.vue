<template>
<div>
 <div id="search" v-if="getPath == '/home/search'">
  <div id="header">
    <van-search placeholder="请输入搜索关键词" v-model="value" show-action shape="round" class="header">
      <div slot="action" @click="onSearch" >搜索</div>
    </van-search>

    <van-tabs title-active-color="#ee0a24">
      <van-tab 
      v-for="(item,index) in tab" 
      :key="index" 
      :title="item.name"
      >
      <song-list :songs="songs" :song-count="songCount" v-if="songs.length!=0"></song-list>
       
       </van-tab>
    </van-tabs>
    </div> 
 </div>
 
 <!-- --------- -->
  
  <keep-alive>
      <router-view v-if="getPath == '/home/search/player'" :key="getKey"></router-view>
  </keep-alive>

</div>
</template>

<script>
import { Toast } from 'vant'
import SongList from './components/SongList.vue'
export default {
  name: "Search",
  components:{ SongList, },
  data() {
    return {
      value: "莫再提",
      tab: [
        { name: "单曲" },
        { name: "视频" },
        { name: "歌手" },
        { name: "专辑" },
        { name: "歌单" },
        { name: "主播电台" },
        { name: "用户" }
      ],
      songs:[],
      songCount:0
    };
  },
  computed: {
       getPath(){
          return this.$route.fullPath
       },
       getKey(){
          if(JSON.stringify(this.$store.songsDetail)!= '[]'){
            return this.$store.getters.getSongDetail[0].id 
          }else{
            return 1
          }
       }
  },
  methods: {
    onSearch() {
      let params = { keywords: this.value };
      this.$api.search.getSongsData("/search",  params )
        .then(res => {
          // console.log(res);
          if(res.status == 200){
              this.songs = res.data.result.songs
              this.songCount = res.data.result.songCount;
              return false;
          }
        }).catch(err =>{
        // Toast(`${err.status}:${err.statusText}`)
        });
    },

  
  },

};
</script>

<style scoped>
#search{width: 100%;;position: fixed;left: 0;top: 0;}

</style>