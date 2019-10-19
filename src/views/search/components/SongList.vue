<template>
    <div id="song-list">
         <ul v-for="(item,index) in songs" :key="index">
              <li >
                  <div class="left">
                       <div>{{ item.name}}</div>
                       <div>{{ item.artists[0].name}}-{{ item.name}}</div>
                  </div>
                  <div class="right">
                       <span></span>
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
        }
    }
</script>

<style scoped>
    #song-list{width: 100%;max-height: 500px;;overflow: auto;}
</style>