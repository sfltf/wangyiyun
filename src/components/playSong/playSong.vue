<template>
  <div class="bottom-play-bg" @mousewheel="stopMove">
    <div style="position:relative;width: 986px;margin: 0 auto;">
      <div class="play-button">
        <button
          class="play-pre bottom-play-bg"
          href="javascript:;"
          title="上一首(ctrl+←)"
          @click="prePlay"
          :disabled="!getPlayListLength"
        ></button>
        <button
          :class="{'play-current-pause': isNotPause}"
          class="play-current bottom-play-bg"
          href="javascript:;"
          title="播放/暂停(p)"
          ref="operatSong"
          @click="playSong"
        ></button>
        <button
          class="play-next bottom-play-bg"
          href="javascript:;"
          title="下一首(ctrl+→)"
          :disabled="!getPlayListLength"
          @click="nextPlay"
        ></button>
      </div>
      <div class="bottom-play-flag">
        <img :class="{'start-pic': isStartPic}" class="play-flag-img" :src="picUrl" alt="专辑图片">
        <a href="javascript:;" class="play-album-bg bottom-play-bg" v-if="!getPlayListLength"></a>
        <router-link :to="{name: 'song', query: {id: songDetail.id}}" class="play-album-bg bottom-play-bg" @click="getRouter" v-else></router-link>
      </div>
      <div class="bottom-play">
        <span class="author-information">
          <a class="song-name" href>{{songDetail.name}}</a>
          <a
            class="author-name"
            href
            v-for="(itemName,itemindex) of songDetail.ar"
            :key="itemindex"
          >{{itemName.name}}</a>
        </span>
        <el-slider
          v-model="playProgress"
          element-loading-spinner="el-icon-loading"
          :show-tooltip="false"
          :min="0"
          :max="totalTime"
          @change="changeProgress"
          style="position:relative;bottom: -35px;"
        ></el-slider>
        <span class="song-time">
          <em>{{currentTime}}</em>
          / {{songDetail.songtime}}
        </span>
      </div>
      <span style="display: inline-block;width: 52px;position: absolute;top: 20px;right: 150px;">
        <a href="javascript:;" class="play-add bottom-play-bg"></a>
        <a href="javascript:;" class="play-share bottom-play-bg"></a>
      </span>
      <div class="right-flag bottom-play-bg">
        <div :class="{volume: isHiddenVolume}" class="block volume-bg">
          <el-slider
            v-model="volume"
            vertical
            height="101px"
            @change="operatVolume"
            :show-tooltip="false"
            style="bottom: -12px;;width: 4px;"
          ></el-slider>
        </div>
        <a
          href="javascript:;"
          :class="{'icn-volno' :isMute}" class="icn-vol bottom-play-bg"     
          title="音量"
          @click="showHiddenVolume"
          ref="iconVolume"
          id="volume"
        ></a>
        <el-tooltip
          class="item"
          effect="dark"
          :content="title"
          :visible-arrow="false"
          placement="top"
        >
          <a
            href="javascript:;"
            :class="{'icn-loop':cycle,'icn-one':singleCycle,'icn-shuffle':random}"
            class="bottom-play-bg"
            @click="switchPlayMode"
            :title="title"
          ></a>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :manual="true" content="已开始播放" placement="top">
          <a
            href="javascript:;"
            class="play-list bottom-play-bg"
            style="text-decoration: none;outline:none;"
            title="播放列表"
            @click="isShowHiddenPlayList"
          >{{getPlayListLength}}</a>
        </el-tooltip>
      </div>
    </div>
    <play-list :class="{'play-list-hidden':isHiddenPlayList}"></play-list>
    <audio :src="playSongUrl" id="player" ref="player"></audio>
  </div>
</template>
<script>
import playList from "./playList/playList.vue"
import { setTimeout } from 'timers'
import {mapState,mapGetters,mapMutations} from 'vuex'
export default {
  components: {
    "play-list": playList
  },
  data() {
    return {
      playSongUrl: "", //歌曲url
      playProgress: 0, //播放进度
      songDetail: {
        songtime: "00:00", //初始时歌曲总时长
        id: 0, 
        path: 'homes',
        name: "",
        ar: [
          {
            name: ""
          }
        ]
      }, //歌曲详情
      picUrl: "/static/images/music.png", //歌曲图片
      isStartPic: true, //初始图片显示
      currentTime: "00:00", //当前歌曲时长
      totalTime: 0, //歌曲时长,进度条最大值
      volume: 0, //音量
      isMute: true, //是否静音
      isHiddenVolume: true, //音量调整隐藏
      isHiddenPlayList: true, //当前播放列表隐藏
      switchNum: 1, //播放方式切换次数
      cycle: true, //循环
      singleCycle: false, //单曲循环
      random: false, //随机,
      title: "循环",
      playListN: 0, //播放列表数量
      //playList: [], //播放列表
      isNotPause: false, //是否暂停
      audio: "", //播放器
      lastSongRecording: this.commonData.playSongList //进入网站后检测歌曲列表是否有数据
    };
  },
  computed: {
    ...mapState(['playList']),
    ...mapGetters(['getPlayListLength']),
  },
  methods: {
    // 歌曲播放
    ...mapMutations(['addPlayList']),
    //获取路由
    getRouter () {
      console.log('触发')
      console.log(this.$route)
    },
    // 取消事件默认行为
    stopMove (event) {
      event.preventDefault();
    },
    playSong() {
      let _self = this;
      if (this.audio.paused && this.playSongUrl !== "") {
        this.isNotPause = true;
        this.audio.play();
        // 播放时给子组件传递时间
        setInterval(function() {
          _self.$bus.$emit(
            "getCurrentTime",
            parseFloat(_self.audio.currentTime).toFixed(1)
          );
        }, 100);
        let processLine = setInterval(function() {
          _self.currentTime = Math.ceil(_self.audio.currentTime);
          // 歌曲时间
          if (_self.currentTime < 10) {
            _self.currentTime = "00:0" + _self.currentTime;
          } else if (_self.currentTime < 60) {
            _self.currentTime = "00:" + _self.currentTime;
          } else {
            let minute = Math.floor(_self.currentTime / 60);
            let second = _self.currentTime - minute * 60;
            if (minute < 10) {
              minute = "0" + minute;
            }

            if (second < 10) {
              second = "0" + second;
            }
            _self.currentTime = minute + ":" + second;
          }
          // 进度条
          _self.playProgress = _self.audio.currentTime;
          // 播放器状态回归
          if (_self.audio.ended) {
            _self.playProgress = 0;
            _self.currentTime = "00:00";
            _self.isNotPause = false;
            clearInterval(processLine);
          }
        }, 1000);
      } else {
        this.isNotPause = false;
        this.audio.pause();
      }
    },
    selectL() {},
    // 改变进度条进度
    changeProgress(val) {
      console.log(val);
      let _self = this;
      this.playProgress = val;
      if (this.playProgress < 10) {
        this.currentTime = "00:0" + this.playProgress;
      } else if (this.playProgress < 60) {
        this.currentTime = "00:" + this.playProgress;
      } else {
        let minute = Math.floor(this.playProgress / 60);
        let second = this.playProgress - minute * 60;
        if (minute < 10) {
          minute = "0" + minute;
        }

        if (second < 10) {
          second = "0" + second;
        }
        this.currentTime = minute + ":" + second;
      }
      this.audio.currentTime = val;
      _self.$bus.$emit("getProgressTime", this.audio.currentTime); //点击进度条将时间传到歌词部分
      if (this.audio.paused && this.playSongUrl !== "") {
        if (this.isNotPause) {
          this.audio.play();
        }

        //this.isNotPause = true;
      }
    },
    // 改变音量显示隐藏
    showHiddenVolume() {
      this.isHiddenVolume = !this.isHiddenVolume;
    },
    // 改变音量
    operatVolume(val) {
      //let audio = this.$refs.player;
      console.log(val);
      if (parseInt(val) === 0) {
        this.isMute = true;
        this.audio.volume = 0;
      } else {
        this.isMute = false;
        this.audio.volume = val / 100;
      }
    },
    //初始化检测音量确定音量图标
    checkVolume() {
      if (this.volume === 0) {
        this.isMute = true;
      } else {
        this.isMute = false;
      }
    },
    // 切换播放方式
    switchPlayMode() {
      ++this.switchNum;
      console.log(this.switchNum);
      if (this.switchNum % 3 === 0) {
        this.singleCycle = true;
        this.cycle = false;
        this.random = false;
        this.title = "单曲循环";
      } else if (this.switchNum % 2 === 0) {
        this.singleCycle = false;
        this.cycle = false;
        this.random = true;
        this.title = "随机";
      } else if (this.switchNum % 1 === 0) {
        this.singleCycle = false;
        this.cycle = true;
        this.random = false;
        this.title = "循环";
      }
    },
    // 播放列表隐藏显示
    isShowHiddenPlayList() {
      this.isHiddenPlayList = !this.isHiddenPlayList;
      this.$bus.$emit("showScroll");
    },
    //上下首播放数据更新
    updatePlay(currentSong, currentNum) {
      var _self = this;
      this.$bus.$emit("sendID", currentSong.id);
      this.playList[currentNum].playSign = true;
      console.log(currentSong);
      _self.songDetail = currentSong;
      let id = "/song/url?id=" + currentSong.id;
      // 播放音乐url
      this.$http({
        method: "get",
        url: id
      })
        .then(function(res) {
          console.log("获取歌曲");
          const loading = _self.$loading({
            target: document.querySelector(".el-slider__button"),
            lock: true
          });
          if (res.data) {
            loading.close();
            _self.playSongUrl = res.data.data[0].url;
            // localStorage歌曲url数据
            //_self.songDetail.playSongUrl = _self.playSongUrl; //这首歌曲的url
            _self.isNotPause = true;
          }
        })
        .catch(function(e) {
          console.log(e);
        });
        this.$bus.$emit("showScroll");
    },
    // 上一首播放
    prePlay() {
      let _self = this;
      console.log(this.audio);
      this.audio.currentTime = 0;
      let currentSong = null;
      let currentNum = 0;
      console.log(this.playList);
      this.playList.forEach(function(item, index) {
        if (item.playSign) {
          item.playSign = false;
          if (index - 1 < 0) {
            console.log(index);
            currentNum = _self.playList.length - 1;
            currentSong = _self.playList[_self.playList.length - 1];
            console.log(_self.playList[_self.playList.length - 1]);
          } else {
            console.log(index);
            currentNum = index - 1;
            currentSong = _self.playList[index - 1];
          }
        }
      });
      this.updatePlay(currentSong, currentNum);
      this.$bus.$emit("showScroll");
    },
    // 下一首播放
    nextPlay() {
      let _self = this;
      //let audio = this.$refs.player;
      this.audio.currentTime = 0;
      let currentSong = null;
      let currentNum = 0;
      console.log(this.playList);
      this.playList.forEach(function(item, index) {
        if (item.playSign) {
          item.playSign = false;
          if (index + 1 >= _self.playList.length) {
            console.log(index);
            currentNum = 0;
            currentSong = _self.playList[0];
            console.log(_self.playList[0]);
          } else {
            console.log(index);
            currentNum = index + 1;
            currentSong = _self.playList[index + 1];
          }
        }
      });
      console.log(currentSong);
      this.updatePlay(currentSong, currentNum);
    },
    // 获取播放过的播放列表
    getLocalData() {
      //let audio = this.$refs.player;
      // 获取歌曲路径
      if (
        this.lastSongRecording.length === 0 ||
        JSON.parse(this.lastSongRecording).length === 0
      ) {
        console.log("首次登陆网易云音乐");
      } else {
        let _self = this;
        this.isStartPic = false;
        console.log(JSON.parse(localStorage.getItem("playList")));
        let localData = JSON.parse(localStorage.getItem("playList"));
        _self.playList = JSON.parse(localStorage.getItem("playList"));
        _self.songDetail = localData[localData.length - 1];
        _self.playSongUrl = localData[localData.length - 1].playSongUrl;
        _self.picUrl = localData[localData.length - 1].al.picUrl;
        _self.songDetail.songtime = localData[localData.length - 1].songtime;
        this.audio.pause();
      }
    }
  },
  created() {},
  mounted() {
    this.audio = this.$refs.player;
    let _self = this;
    this.$bus.$on("sendID", function(val) {
      _self.isStartPic = false;
      let id = "/song/url?id=" + val;
      let detailId = "/song/detail?ids=" + val;
      // 播放音乐url
      this.$http({
        method: "get",
        url: id
      })
        .then(function(res) {
          console.log("获取歌曲");
          const loading = _self.$loading({
            target: document.querySelector(".el-slider__button"),
            lock: true
          });
          if (res.data) {
            loading.close();
            _self.playSongUrl = res.data.data[0].url;
            // localStorage歌曲url数据
            //_self.songDetail.playSongUrl = _self.playSongUrl; //这首歌曲的url
            _self.isNotPause = true;
            console.log(_self.audio);
            setTimeout(function() {
              _self.audio.play()
            },17)          
          }
        })
        .catch(function(e) {
          console.log(e);
        });

      // 音乐相关信息展示
      this.$http({
        method: "post",
        url: detailId
      })
        .then(function(res) {
          console.log("获取歌曲内容");
          //let audio = _self.$refs.player;
          _self.songDetail = res.data.songs[0];
          console.log(_self.songDetail);
          // 将播放列表数据存储到本地中
          /*let checkSongUrl = setInterval(function() {
          if (_self.songDetail.playSongUrl) {
            console.log(_self.lastSongRecording);
            _self.lastSongRecording.push(_self.songDetail);
            localStorage.setItem('playList', JSON.stringify(_self.lastSongRecording));
            console.log('本地存储数据');
            console.log(JSON.parse(localStorage.getItem('playList')));
            clearInterval(checkSongUrl);
          }
        }, 500)*/

          _self.picUrl = _self.songDetail.al.picUrl;
          _self.totalTime = Math.floor(_self.songDetail.dt / 1000);
          let songTime = _self.songDetail.dt / (1000 * 60);
          let minute = Math.floor(songTime);
          let second = ((songTime - minute) * 60).toFixed(0);
          if (minute < 10) {
            minute = "0" + minute;
          }

          if (second < 10) {
            second = "0" + second;
          }
          _self.songDetail.songtime = minute + ":" + second;
          _self.songDetail.id = val;
          let processLine = setInterval(function() {
            _self.currentTime = Math.round(_self.audio.currentTime);
            // 在播放的时候才传当前播放时间
            if (_self.isNotPause) {
              let currentTime = parseFloat(_self.audio.currentTime).toFixed(1); //传给子组件时间
              _self.$bus.$emit("getCurrentTime", currentTime);
              //console.log(currentTime);
            }

            // 传递当前播放歌曲名,id
            let songInformation = {};
            songInformation.id = val;
            songInformation.name = _self.songDetail.name;
            _self.$bus.$emit("getSongName", songInformation);
            // 当前歌曲正在播放标志
            _self.songDetail.playSign = true;
            // 歌曲时间
            if (_self.currentTime < 10) {
              _self.currentTime = "00:0" + _self.currentTime;
            } else if (_self.currentTime < 60) {
              _self.currentTime = "00:" + _self.currentTime;
            } else {
              let minute = Math.floor(_self.currentTime / 60);
              let second = _self.currentTime - minute * 60;
              if (minute < 10) {
                minute = "0" + minute;
              }

              if (second < 10) {
                second = "0" + second;
              }
              _self.currentTime = minute + ":" + second;
            }
            // 进度条
            _self.playProgress = _self.audio.currentTime;
            // 初始音量
            _self.audio.volume = _self.volume / 100;
            // 播放器状态回归
            if (_self.audio.ended) {
              _self.playProgress = 0;
              _self.currentTime = "00:00";
              _self.isNotPause = false;
              clearInterval(processLine);
            }
          }, 100);

          // 添加播放列表
          try {
            if (_self.getPlayListLength === 0) {
              //_self.playList.push(_self.songDetail);
              //_self.$store.commit('addPlayList',_self.songDetail)
             _self.addPlayList(_self.songDetail);
            } else {
              for (let i = 0; i < _self.getPlayListLength; i++) {
                _self.$store.state.playList[i].playSign = false;
              }
              for (let i = 0; i < _self.getPlayListLength; i++) {
                if (val == _self.playList[i].id) {
                  // 重播
                  _self.audio.currentTime = 0;
                  // 当前播放重修改
                  _self.playList[i].playSign = true;
                  break;
                } else if (
                  val != _self.playList[i].id &&
                  i == _self.playList.length - 1
                ) {
                  //_self.playList.push(_self.songDetail);
                  //_self.$store.commit('addPlayList',_self.songDetail)
                  _self.addPlayList(_self.songDetail)
                }
              }
            }
          } catch (e) {
            console.log(e);
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    });
    //检测音量
    this.checkVolume();
    // 歌曲循环方式
    setInterval(function() {
      //let audio = _self.$refs.player;
      if (_self.audio.ended) {
        console.log("触发");
        // 循环
        if (_self.cycle) {
          _self.nextPlay();
          // 随机循环(算法首先所有音乐在一次轮回中应该都播放一次)
        } else if (_self.random) {
          // 单曲循环
        } else if (_self.singleCycle) {
          _self.playSong();
        }
      }
    }, 1000);
    console.log(this.playList)
    // 本地缓存数据
    //this.getLocalData();
  }
};

// 当歌曲在加载时出现loading
// 进度条加载
/* const loading = _self.$loading({
  target: document.querySelector('.el-slider__button'),
  lock: true,
}); */

// localStorage只能接收字符串数据
</script>
<style src="./playSong.css"></style>
