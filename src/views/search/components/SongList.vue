<template>
    <div id="song-list">
         <ul v-for="(item,index) in songs" :key="index">
              <li @click="handleClick(item.id)">
                  <div class="left">
                       <div class="song-name">{{ item.name}}</div>
                       <div class="song-songer">{{ item.artists[0].name}}-{{ item.album.name}}</div>
                  </div>
                  <div class="right">
                       <van-icon name="play-circle-o" class="icon" v-show="item.mvid!=0"/>
                       <svg-icon icon-class="Group" class="icon"/>
                  </div>
              </li>
          </ul>
    </div>
</template>

<script>
    export default {
        name:'SongList',
        props:['songs','songCount'],
        data () {
            return{}
        },
        watch:{
            songs:function(){},
            songCount:function(){}
        },
        methods : {
            handleClick(id){
                 //全屏播放，mini播放器隐藏
             //this.$store.commit('SET_PLAYER',false)
             this.$store.dispatch('getSongById',id).then(()=>{
               
                  this.$router.push('/home/search/player')
            })
            this.$store.dispatch('getSongDetail',id)
            } 
        }
    }
</script>

<style scoped>
    #song-list{width: 100%;max-height: 550px;;overflow-y: scroll;overflow-x: hidden}
    #song-list li{display: flex;justify-content: space-between;align-items: center;padding: 10px 16px;}     
    #song-list li .left .song-name{font-size: 14px;color: black;padding-bottom: 4px;}
    #song-list li .left .song-songer{color: #666}
    #song-list li .right .icon{font-size: 20px;color: #888}
    #song-list li .right .icon:nth-of-type(1){padding-right: 8px}
</style>