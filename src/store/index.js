import Vue from 'vue'
import Vuex from 'vuex'
import songs from '@/api/songs.js'
Vue.use(Vuex)

const state = {
    noCacheViews:[],
    fullPlayer:false,
    currentSong:{},
    songsDetail:[],
    isPlay:true,
    duration : 0,
    currentTime:0,
    isEnded:false
}

const mutations = {
    SET_NO_CACHE_VIEWS(state, componentName){
       if(state.noCacheViews.includes(componentName)){
            return false;
       }
        state.noCacheViews.push(componentName)
    },
  
    SET_PLAYER(state,isFullPlayer){
          state.fullPlayer = isFullPlayer
    },
    SET_CURRENT_SONG(state,currentSong){
        state.currentSong = currentSong
    },
    SET_SONG_DETAIL(state, songDetail){
         state.songsDetail = songDetail
    },
    SET_PLAY_STATUS(state, status){
        state.isPlay = status
    },
    SET_DURATION(state, duration){
        state.duration = duration
    },
    SET_CURRENT_TIME(state, currentTime){
        state.currentTime = currentTime
    },
    SET_END_STATUS(state, ended){
        state.isEnded = ended
    }
}

const actions = {
    //通过指定id获取歌曲地址
    getSongById({ commit }, id){
        let params ={ id }
        return new Promise( (resolve, reject) => {
            songs.getSongById('/song/url',params).then( res => {
                if (res.status == 200) {
                    commit('SET_CURRENT_SONG',res.data.data[0])
                    resolve()
                   // console.log(res.data.data[0]);
                  }
            }).catch( err=>{
                reject(err)
            })
        })
    },
    //通过id获取歌曲详情如图片等
    getSongDetail({ commit }, id){
        let params ={ ids:id }
        return new Promise( (resolve , reject) => {
            songs.getSongDetail('/song/detail',params).then( res => {
                if (res.status == 200) {
                    commit('SET_SONG_DETAIL',res.data.songs)
                    resolve()
                   // console.log(res.data.songs);
                  }
            }).catch( err => {
                reject(err)
            })
        })
    }
}

const getters = {
    getNoCacheViews(state){
        return state.noCacheViews
    },
    getIsFullPlayer(state){
        return state.fullPlayer
    },
    getCurrentSong(state){
        return state.currentSong
    },
    getSongDetail(state){
        return state.songsDetail
    },
    getPlayStatus(state){
        return state.isPlay
    },
    getDuration(state){
       return state.duration
    },
    getCurrentTime(state){
        return state.currentTime
    },
    getEnded(state){
        return state.isEnded
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})