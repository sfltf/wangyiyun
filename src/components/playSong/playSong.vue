<template>
  <div class="bottom-play-bg">
    <div style="width: 731px;margin: 0 auto;">
      <div class="play-button">
        <a class="play-pre bottom-play-bg" href="javascript:;" title="上一首(ctrl+←)"></a>
        <a class="play-current bottom-play-bg" href="javascript:;" title="播放/暂停(p)" ref="operatSong" @click="playSong"></a>
        <a class="play-next bottom-play-bg" href="javascript:;" title="下一首(ctrl+→)"></a>
      </div>
      <div class="bottom-play-flag">
        <img class="play-flag-img" :src="songDetail.al.picUrl" alt="专辑图片">
      </div>
      <div class="bottom-play">
        <span class="author-information">
          <a class="song-name" href="">{{songDetail.name}}</a>
          <a class="author-name" href="">{{songDetail.ar[0].name}}</a>
        </span>
        <el-slider v-model="playProgress" :show-tooltip="false" :min='minNumber' :max="totalTime" @change="changeProgress" style="position:relative;bottom: -35px;"></el-slider>
        <span class="song-time">
          <em>{{currentTime}} </em>
          / {{songDetail.songtime}}
        </span>
      </div>
      <span style="display: inline-block;width: 100px;position: absolute;">
        <a href="javascript:;" class="play-add bottom-play-bg"></a>
        <a href="javascript:;" class="play-share bottom-play-bg"></a>
      </span>
    </div>
    <audio :src="playSongUrl" autoplay id="player" ref="player"></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playSongUrl: '',
      status: false,
      playProgress: 0,
      songDetail: {},
      currentTime: '00:00',
      totalTime: 0,
      minNumber: 0
    }
  },
  methods: {
    playSong(e) {
      let _self = this;
      let audio = this.$refs.player;
      if (audio.paused && this.playSongUrl !== '') {
        e.target.setAttribute('class', 'play-current play-current-pause bottom-play-bg');
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
            _self.$refs.operatSong.setAttribute('class', 'play-current bottom-play-bg')
            clearInterval(processLine);
          }
        }, 1000)
      } else {
        e.target.setAttribute('class', 'play-current bottom-play-bg');
        audio.pause();
      }
    },
    selectL() {

    },
    // 改变进度条进度
    changeProgress(val) {
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
        console.log(res.data.data[0])
        _self.playSongUrl = res.data.data[0].url;
        _self.$refs.operatSong.setAttribute('class', 'play-current play-current-pause bottom-play-bg');
      }).catch(function(e) {
        console.log(e)
      });

      // 音乐相关信息
      this.$http({
        method: 'post',
        url: detailId
      }).then(function(res) {
        console.log('获取歌曲内容')
        let audio = _self.$refs.player;
        _self.songDetail = res.data.songs[0];
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
          // 播放器状态回归
          if (audio.ended) {
            _self.playProgress = 0;
            _self.currentTime = '00:00';
            _self.$refs.operatSong.setAttribute('class', 'play-current bottom-play-bg')
            clearInterval(processLine);
          }
        }, 1000)
      }).catch(function(e) {
        console.log(e)
      });
    })
  }
}

//231006 231s 240

</script>
<style src="./playSong.css"></style>
