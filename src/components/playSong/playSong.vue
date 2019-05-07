<template>
  <div class="bottom-play-bg">
    <div style="position:relative;width: 731px;margin: 0 auto;">
      <div class="play-button">
        <a class="play-pre bottom-play-bg" href="javascript:;" title="上一首(ctrl+←)"></a>
        <a :class="{'play-current-pause': isNotPause}" class="play-current bottom-play-bg" href="javascript:;" title="播放/暂停(p)" ref="operatSong" @click="playSong"></a>
        <a class="play-next bottom-play-bg" href="javascript:;" title="下一首(ctrl+→)"></a>
      </div>
      <div class="bottom-play-flag">
        <img class="play-flag-img" :src="picUrl" alt="专辑图片">
      </div>
      <div class="bottom-play">
        <span class="author-information">
          <a class="song-name" href="">{{songDetail.name}}</a>
          <a class="author-name" href="">{{songDetail.ar[0].name}}</a>
        </span>
        <el-slider v-model="playProgress" :show-tooltip="false" :min='0' :max="totalTime" @change="changeProgress" style="position:relative;bottom: -35px;"></el-slider>
        <span class="song-time">
          <em>{{currentTime}} </em>
          / {{songDetail.songtime}}
        </span>
      </div>
      <span style="display: inline-block;width: 100px;position: absolute;">
        <a href="javascript:;" class="play-add bottom-play-bg"></a>
        <a href="javascript:;" class="play-share bottom-play-bg"></a>
      </span>
      <div class="right-flag bottom-play-bg">
        <div :class="{volume: isHiddenVolume}" class="block volume-bg">
          <el-slider v-model="volume" vertical height="101px" @change="operatVolume" :show-tooltip="false" style="bottom: -12px;;width: 4px;">
          </el-slider>
        </div>
        <a href="javascript:;" class="icn-vol bottom-play-bg" :class="{'icn-volno' :isMute}" title="音量" @click="showHiddenVolume" ref="iconVolume" id="volume"></a>
        <el-tooltip class="item" effect="dark" :content="title" :visible-arrow="false" placement="top">
          <a href="javascript:;" :class="{'icn-loop':cycle,'icn-one':singleCycle,'icn-shuffle':random}" class="bottom-play-bg" @click="switchPlayMode" :title="title"></a>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :manual="true" content="已开始播放" placement="top">
          <a href="javascript:;" class="play-list bottom-play-bg" style="text-decoration: none;" @click="isShowHiddenPlayList">{{playList.length}}</a>
        </el-tooltip>
      </div>
    </div>
    <play-list :class="{'play-list-hidden':isHiddenPlayList}" :playlist="playList" ></play-list>
    <audio :src="playSongUrl" autoplay id="player" ref="player"></audio>
  </div>
</template>
<script>
import playList from './playList/playList.vue'
export default {
  components: {
  	'play-list': playList
  },
  data() {
    return {
      playSongUrl: '', //歌曲url
      playProgress: 0, //播放进度
      songDetail: {}, //歌曲详情
      picUrl: '',
      currentTime: '00:00', //当前歌曲时长
      totalTime: 0, //歌曲时长，进度条最大值
      volume: 50, //音量
      isMute: true, //是否静音
      isHiddenVolume: true, //音量调整隐藏
      isHiddenPlayList: true, //当前播放列表隐藏
      switchNum: 1, //播放方式切换次数
      cycle: true, //循环
      singleCycle: false, //单曲循环
      random: false, //随机,
      title: '循环',
      playListN: 0, //播放列表数量
      playList: [], //播放列表
      isNotPause: false //是否暂停
    }
  },
  methods: {
    // 歌曲播放
    playSong(e) {
      let _self = this;
      let audio = this.$refs.player;
      if (audio.paused && this.playSongUrl !== '') {
        this.isNotPause = true;
        audio.play();
        let processLine = setInterval(function() {
          _self.currentTime = Math.floor(audio.currentTime);
          // 歌曲时间
          if (_self.currentTime < 10) {
            _self.currentTime = '00:0' + _self.currentTime;
          } else if (_self.currentTime < 60) {
            _self.currentTime = '00:' + _self.currentTime;
          } else {
            let minute = Math.floor(_self.currentTime / 60);
            let second = _self.currentTime - minute * 60;
            if (minute < 10) {
              minute = '0' + minute;
            }

            if (second < 10) {
              second = '0' + second;
            }
            _self.currentTime = minute + ':' + second;
          }
          // 进度条
          _self.playProgress = audio.currentTime;
          // 播放器状态回归
          if (audio.ended) {
            _self.playProgress = 0;
            _self.currentTime = '00:00';
            _self.isNotPause = false;
            clearInterval(processLine);
          }
        }, 1000)
      } else {
        this.isNotPause = false;
        audio.pause();
      }
    },
    selectL() {

    },
    // 改变进度条进度
    changeProgress(val) {
      let _self = this;
      let audio = this.$refs.player;
      this.playProgress = val;
      if (this.playProgress < 10) {
        this.currentTime = '00:0' + this.playProgress;
      } else if (this.playProgress < 60) {
        this.currentTime = '00:' + this.playProgress;
      } else {
        let minute = Math.floor(this.playProgress / 60);
        let second = this.playProgress - minute * 60;
        if (minute < 10) {
          minute = '0' + minute;
        }

        if (second < 10) {
          second = '0' + second;
        }
        this.currentTime = minute + ':' + second;
      }
      audio.currentTime = val;
      if (audio.paused && this.playSongUrl !== '') {
        audio.play();
        this.isNotPause = true;
      }
    },
    // 改变音量显示隐藏
    showHiddenVolume() {
      this.isHiddenVolume = !this.isHiddenVolume;
    },
    // 改变音量
    operatVolume(val) {
      let audio = this.$refs.player;
      console.log(val);
      if (parseInt(val) === 0) {
        this.isMute = true;
        audio.volume = 0;
      } else {
        this.isMute = false;
        audio.volume = val / 100;
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
        this.title = "循环"
      }
    },
    // 播放列表隐藏显示
    isShowHiddenPlayList() {
    	this.isHiddenPlayList = !this.isHiddenPlayList;
    }
  },
  created() {
    // 获取歌曲路径
    let _self = this;
    // 音乐相关信息
    this.$http({
      method: 'post',
      url: '/song/detail?ids=1361195373'
    }).then(function(res) {
      console.log('获取歌曲内容')
      _self.songDetail = res.data.songs[0];
      _self.picUrl = _self.songDetail.al.picUrl;
      let songTime = _self.songDetail.dt / (1000 * 60);
      let minute = parseInt(songTime);
      let second = ((songTime - minute) * 60).toFixed(0);
      if (minute < 10) {
        minute = '0' + minute;
      }

      if (second < 10) {
        second = '0' + second;
      }
      _self.songDetail.songtime = minute + ':' + second;
    }).catch(function(e) {
      console.log(e)
    });
  },
  mounted() {
    let _self = this;
    this.$bus.$on('sendID', function(val) {
      let id = '/song/url?id=' + val;
      let detailId = '/song/detail?ids=' + val;
      // 播放音乐url
      this.$http({
        method: 'get',
        url: id
      }).then(function(res) {
        console.log('获取歌曲')
        _self.playSongUrl = res.data.data[0].url;
        _self.isNotPause = true;
      }).catch(function(e) {
        console.log(e)
      });

      // 音乐相关信息展示
      this.$http({
        method: 'post',
        url: detailId
      }).then(function(res) {
        console.log('获取歌曲内容')
        let audio = _self.$refs.player;
        console.log(res.data)
        _self.songDetail = res.data.songs[0];
        _self.picUrl = _self.songDetail.al.picUrl;
        _self.totalTime = Math.floor(_self.songDetail.dt / 1000);
        let songTime = _self.songDetail.dt / (1000 * 60);
        let minute = Math.floor(songTime);
        let second = ((songTime - minute) * 60).toFixed(0);
        if (minute < 10) {
          minute = '0' + minute;
        }

        if (second < 10) {
          second = '0' + second;
        }
        _self.songDetail.songtime = minute + ':' + second;
        let processLine = setInterval(function() {
          _self.currentTime = Math.floor(audio.currentTime);
          // 歌曲时间
          if (_self.currentTime < 10) {
            _self.currentTime = '00:0' + _self.currentTime;
          } else if (_self.currentTime < 60) {
            _self.currentTime = '00:' + _self.currentTime;
          } else {
            let minute = Math.floor(_self.currentTime / 60);
            let second = _self.currentTime - minute * 60;
            if (minute < 10) {
              minute = '0' + minute;
            }

            if (second < 10) {
              second = '0' + second;
            }
            _self.currentTime = minute + ':' + second;
          }
          // 进度条
          _self.playProgress = audio.currentTime;
          // 初始音量
          audio.volume = _self.volume / 100;
          // 播放器状态回归
          if (audio.ended) {
            _self.playProgress = 0;
            _self.currentTime = '00:00';
            _self.isNotPause = false;
            clearInterval(processLine);
          }
        }, 1000)

        // 添加播放列表
        try {
          if (_self.playList.length === 0) {
            _self.playList.push(_self.songDetail);
          } else {
            _self.playList.forEach(function(item, index) {
              if (val != item.id && index == _self.playList.length - 1) {
                _self.playList.push(_self.songDetail);
              }
            })
          }
        } catch (e) {
          console.log(e)
        }
      }).catch(function(e) {
        console.log(e)
      });
    })
    //检测音量
    this.checkVolume()
  }
}

</script>
<style src="./playSong.css"></style>
