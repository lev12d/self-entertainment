import { get, post } from '@/config/axios.js'
import url from '@/config/baseurl.js'

export default {
     url: url.baseUrl,
     getSongById(url,params){
         let URL = this.url + url
        return get(URL,params)
     },
     getSongDetail(url,params){
        let URL = this.url + url
        return get(URL,params)
     }
}