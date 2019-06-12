import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        playList: [], //播放歌曲列表
        songId: '', //歌曲id
        commentNum: 0, //评论数
        expression: [
            ['[大笑]','<img class="emoji" data-src="/static/emoji/emoji_86.png" title="大笑">'],
            ['[可爱]','<img class="emoji" data-src="/static/emoji/emoji_85.png" title="可爱">'],
            ['[憨笑]','<img class="emoji" data-src="/static/emoji/emoji_359.png" title="憨笑">'],
            ['[色]','<img class="emoji" data-src="/static/emoji/emoji_95.png" title="色">'],
            ['[亲亲]','<img class="emoji" data-src="/static/emoji/emoji_363.png" title="亲亲">'],
            ['[惊恐]','<img class="emoji" data-src="/static/emoji/emoji_96.png" title="惊恐">'],
            ['[流泪]','<img class="emoji" data-src="/static/emoji/emoji_356.png" title="流泪">'],
            ['[亲]','<img class="emoji" data-src="/static/emoji/emoji_362.png" title="亲">'],
            ['[呆]','<img class="emoji" data-src="/static/emoji/emoji_352.png" title="呆">'],
            ['[哀伤]','<img class="emoji" data-src="/static/emoji/emoji_342.png" title="哀伤">'],
            ['[呲牙]','<img class="emoji" data-src="/static/emoji/emoji_343.png" title="呲牙">'],
            ['[吐舌]','<img class="emoji" data-src="/static/emoji/emoji_348.png" title="吐舌">'],
            ['[撇嘴]','<img class="emoji" data-src="/static/emoji/emoji_353.png" title="撇嘴">'],
            ['[吐舌]','<img class="emoji" data-src="/static/emoji/emoji_348.png" title="吐舌">'],
            ['[怒]','<img class="emoji" data-src="/static/emoji/emoji_361.png" title="怒">'],
            ['[奸笑','<img class="emoji" data-src="/static/emoji/emoji_341.png" title="奸笑">'],
            ['[汗]','<img class="emoji" data-src="/static/emoji/emoji_97.png" title="汗">'],
            ['[痛苦]','<img class="emoji" data-src="/static/emoji/emoji_346.png" title="痛苦">'],
            ['[惶恐]','<img class="emoji" data-src="/static/emoji/emoji_354.png" title="惶恐">'],
            ['[生病]','<img class="emoji" data-src="/static/emoji/emoji_350.png" title="生病">'],
            ['[口罩]','<img class="emoji" data-src="/static/emoji/emoji_351.png" title="口罩">'],
            ['[晕]','<img class="emoji" data-src="/static/emoji/emoji_355.png" title="晕">'],
            ['[发怒]','<img class="emoji" data-src="/static/emoji/emoji_115.png" title="发怒">'],
            ['[开心]','<img class="emoji" data-src="/static/emoji/emoji_360.png" title="开心">'],
            ['[鬼脸]','<img class="emoji" data-src="/static/emoji/emoji_94.png" title="鬼脸">'],
            ['[皱眉]','<img class="emoji" data-src="/static/emoji/emoji_87.png" title="皱眉">'],
            ['[流感]','<img class="emoji" data-src="/static/emoji/emoji_358.png" title="流感">'],
            ['[爱心]','<img class="emoji" data-src="/static/emoji/emoji_33.png" title="爱心">'],
            ['[心碎]','<img class="emoji" data-src="/static/emoji/emoji_34.png" title="心碎">'],
            ['[钟情]','<img class="emoji" data-src="/static/emoji/emoji_303.png" title="钟情">'],
            ['[星星]','<img class="emoji" data-src="/static/emoji/emoji_309.png" title="星星">'],
            ['[生气','<img class="emoji" data-src="/static/emoji/emoji_314.png" title="生气">'],
            ['[便便]','<img class="emoji" data-src="/static/emoji/emoji_89.png" title="便便">'],
            ['[强]','<img class="emoji" data-src="/static/emoji/emoji_13.png" title="强">'],
            ['[弱]','<img class="emoji" data-src="/static/emoji/emoji_372.png" title="弱">'],
            ['[拜]','<img class="emoji" data-src="/static/emoji/emoji_14.png" title="拜">'],
            ['[牵手]','<img class="emoji" data-src="/static/emoji/emoji_379.png" title="牵手">'],
            ['[跳舞]','<img class="emoji" data-src="/static/emoji/emoji_380.png" title="跳舞">'],
            ['[禁止]','<img class="emoji" data-src="/static/emoji/emoji_374.png" title="禁止">'],
            ['[这边]','<img class="emoji" data-src="/static/emoji/emoji_262.png" title="这边">'],
            ['[爱意]','<img class="emoji" data-src="/static/emoji/emoji_106.png" title="爱意">'],
            ['[示爱]','<img class="emoji" data-src="/static/emoji/emoji_376.png" title="示爱">'],
            ['[嘴唇]','<img class="emoji" data-src="/static/emoji/emoji_367.png" title="嘴唇">'],
            ['[狗]','<img class="emoji" data-src="/static/emoji/emoji_81.png" title="狗">'],
            ['[猫]','<img class="emoji" data-src="/static/emoji/emoji_78.png" title="猫">'],
            ['[猪]','<img class="emoji" data-src="/static/emoji/emoji_100.png" title="猪">'],
            ['[兔子]','<img class="emoji" data-src="/static/emoji/emoji_459.png" title="兔子">'],
            ['[小鸡]','<img class="emoji" data-src="/static/emoji/emoji_450.png" title="小鸡">'],
            ['[公鸡]','<img class="emoji" data-src="/static/emoji/emoji_461.png" title="公鸡">'],
            ['[幽灵]','<img class="emoji" data-src="/static/emoji/emoji_116.png" title="幽灵">'],
            ['[圣诞]','<img class="emoji" data-src="/static/emoji/emoji_411.png" title="圣诞">'],
            ['[外星]','<img class="emoji" data-src="/static/emoji/emoji_101.png" title="外星">'],
            ['[钻石]','<img class="emoji" data-src="/static/emoji/emoji_52.png" title="钻石">'],
            ['[礼物]','<img class="emoji" data-src="/static/emoji/emoji_107.png" title="礼物">'],
            ['[男孩]','<img class="emoji" data-src="/static/emoji/emoji_0.png" title="男孩">'],
            ['[女孩]','<img class="emoji" data-src="/static/emoji/emoji_1.png" title="女孩">'],
            ['[蛋糕]','<img class="emoji" data-src="/static/emoji/emoji_337.png" title="蛋糕">'],
            ['[18]','<img class="emoji" data-src="/static/emoji/emoji_186.png" title="18">'],
            ['[圈]','<img class="emoji" data-src="/static/emoji/emoji_312.png" title="圈">'],
            ['[叉]','<img class="emoji" data-src="/static/emoji/emoji_313.png" title="叉">'],
        ]
    },
    getters: {
        getPlayListLength (state) {
            return state.playList.length;
        }
    },
    mutations: {
        //添加一首歌曲
        addPlayList (state,song) {
            state.playList.push(song)
        },
        //删除一首歌曲
        deletePlayList (state,id) {
            state.playList.forEach((item,index) => {
                if(item.playSign && index < state.playList.length - 1) {
                    state.playList[index].playSign = true;
                }else if (item.playSign && index == state.playList.length - 1) {
                    if(state.playList[0]) {
                        state.playList[0].playSign = true;
                    }
                }
                if(item.id == id) {
                    state.playList.splice(index,1);
                }
                
            })          
        },
        // 删除全部歌曲
        deleteAll (state) {
            state.playList.splice(0,state.playList.length);
        },
        //设置歌曲id
        setSongId (state,id) {
            state.songId = id;
        },
        //设置评论数
        setCommentNum (state,num) {
            state.commentNum = num;
        }
    }
})

export default store