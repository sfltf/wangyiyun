import Vue from 'vue'
import Vuex from 'vuex'
import Song from './module/song.js'
import User from './module/user.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        song: Song,
        user: User
    }
})

export default store