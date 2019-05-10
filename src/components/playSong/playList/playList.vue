<template>
  <div class="play-list-bg">
    <div class="play-top">
      <span class="play-list-totalN">
        播放列表({{songList.length}})
      </span>
      <a href="javascript:;" class="collection-all">
        <span class="ico-add playList-bg"></span>
        <span class="ico-add-name">收藏全部</span>
      </a>
      <a href="javascript:;" class="collection-all1">
        <span class="ico-clear playList-bg"></span>
        <span class="ico-clear-name">清空</span>
      </a>
      <span class="play-song-name">{{currentSongName}}</span>
    </div>
    <div class="play-content">
      <div class="left-msk" ref="leftMsk">
        <ul class="collection-song-total" @mousewheel="pageScroll" ref="songTotal" style="top: 0">
          <li :class="{'current-collection-song-list':item.playSign}" class="collection-song-list" :data-id="item.id" v-for="(item,index) of songList" :key="index" @click="play" :ref="songList">
            <span class="playicn playList-bg" v-if="item.playSign"></span>
            <span class="collection-song-name">{{item.name}}</span>
            <span class="collection-song-singer">
              <a href="javascript:;" v-for="(itemName,itemindex) of item.ar" :title="itemName.name">{{itemName.name}}</a>
            </span>
            <span class="song-operate">
              <span class="ico-adds playList-bg"></span>
              <span class="ico-share playList-bg"></span>
              <span class="ico-dl playList-bg"></span>
              <span class="icn-del playList-bg"></span>
            </span>
            <span class="collection-song-time">{{item.songtime}}</span>
            <span class="from-songList playList-bg"></span>
          </li>
        </ul>
        <div class="outer-scroll">
          <div :class="{'show-scroll': isShowHiddenScroll}" :style="{height: innerScrollH + 'px'}" class="inner-scroll" ref="innerScroll" style="top: 0"></div>
        </div>
      </div>
      <div class="right-msk">
        <div class="lyrics_bg">
          <ul ref="lyricsTotal" style="position: relative;top: 0" class="lyric-total" @mousewheel="lyricsScroll">
            <li class="lyric-list" v-for="(item,index) of lyrics" :key="index" :data-time="item[0]" ref="lyric">
              {{item[1]}}
            </li>
          </ul>
          <div class="outer-scroll">
            <div :style="{height: lyricsScrollBarH + 'px'}" class="inner-scroll" style="top: 0" ref="lyricsScroll"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  props: {
    playlist: Array
  },
  data() {
    return {
      isShowHiddenOperate: true, //歌曲显示操作显示隐藏
      isShowHiddenScroll: true, //滚动条显示隐藏
      mskH: 260, //
      songH: 0, //歌曲列表总高度
      scrollH: 0, //列表能滚动长度
      scrollDistance: 14, //歌曲列表每次滚动距离
      songList: this.playlist, //已添加的歌曲
      top: 0, //菜单距离顶部的距离
      innerScrollH: 0, //滚动条高度
      innerH: 0, //滚动条能滚动长度
      innerScrollDistance: 0, //滚动条每次移动距离
      songProportion: 0, //不可移动比例
      scrollTop: 0, //滚动条距离顶部的距离
      scrollTimes: 47, //列表有滚动条时滚动的次数
      lyrics: [], //歌词
      currentSongName: '', //当前正在播放歌曲名
      currentLyricLight: false, //当前歌词高亮
      lyricLightRows: 0, //当前歌词高亮行数
      lyricAutoScroll: true, //歌词自动滚动
      lyricScrollDistance: 192, //歌词每次滚动距离
      preTime: 0, //上次滚动时间
      nowTime: 0, //本次滚动时间 
      lyricsTop: 0, //歌词距离顶部的距离
      rightMskH: 220, //歌词固定高度
      scrollLyricsH: 0, //歌词能滚动长度
      lyricsCanScrollTimes: 0, //歌词向上或向下能滚动次数
      lyricsScrollTimes: 0, //歌词滚动次数
      lyricsScrollBarH: 0, //歌词滚动条高度
      lyricsCanScrollBarH: 0, //歌词滚动条能滚动距离
      lyricsScrollBarTop: 0, //歌词滚动条距离顶部的距离
      lyricsScrollBarDistance: 0, //滚动条每次移动距离
      lyricsAutoScrollDistance: 0, //滚动条每次自动移动距离
      preSongId: 0, //之前歌曲id
    }
  },
  methods: {
    getPlayList() {
      console.log(this.songList);
    },
    // 传递歌曲id
    play(e) {
      let _self = this;
      this.$bus.$emit('sendID', this.dataset(e.target).id);
    },
    // 左侧歌单列表滚动
    pageScroll(event) {
      event = event || window.event;
      event.preventDefault(); //阻止滚动事件冒泡
      //console.log(event);
      this.top = this.$refs.songTotal.style.top.replace('px', '');
      if (event.wheelDelta >= 0) {
        if (parseFloat(this.top) >= 0) {
          this.$refs.songTotal.style.top = 0 + 'px';
          this.$refs.innerScroll.style.top = 0 + 'px';
        } else {
          this.top = parseFloat(this.top);
          this.top += this.scrollDistance;
          this.scrollTop = parseFloat(this.scrollTop);
          this.scrollTop -= this.innerScrollDistance;
          this.$refs.songTotal.style.top = this.top + 'px';
          this.$refs.innerScroll.style.top = this.scrollTop + 'px';
        }
      } else {
        if (parseFloat(this.top) > -this.scrollH) {
          this.top -= this.scrollDistance;
          this.scrollTop += this.innerScrollDistance;
          this.$refs.songTotal.style.top = this.top + 'px';
          this.$refs.innerScroll.style.top = this.scrollTop + 'px';
        } else {
          this.$refs.songTotal.style.top = -this.scrollH + 'px';
          this.$refs.innerScroll.style.top = this.innerH + 'px';
        }
      }
    },
    // 右侧歌词滚动
    lyricsScroll(event) {
      let _self = this;
      event = event || window.event;
      event.preventDefault(); //阻止滚动事件冒泡
      if (event.wheelDelta != 0) {
        ++_self.nowTime;
        _self.lyricAutoScroll = false;
      }
      // 歌词随滚轮滚动
      if (event.wheelDelta > 0) {
        ++this.lyricsScrollTimes;
        if (this.lyricsScrollTimes > this.lyricsCanScrollTimes) {
          this.lyricsScrollTimes = this.lyricsCanScrollTimes;
        }
        if (this.lyricsCanScrollTimes === this.lyricsScrollTimes) {
          this.$refs.lyricsTotal.style.top = -this.scrollLyricsH + 'px';
          this.$refs.lyricsScroll.style.top = this.lyricsScrollBarDistance * this.lyricsScrollTimes + 'px';
        } else if (this.lyricsScrollTimes < this.lyricsCanScrollTimes) {
          this.$refs.lyricsTotal.style.top = -this.lyricScrollDistance * this.lyricsScrollTimes + 'px';
          this.$refs.lyricsScroll.style.top = this.lyricsScrollBarDistance * this.lyricsScrollTimes + 'px';
        }
      } else {
        --this.lyricsScrollTimes;
        if (this.lyricsScrollTimes <= 0) {
          this.lyricsScrollTimes = 0;
        }
        if (this.lyricsCanScrollTimes === 0) {
          this.$refs.lyricsTotal.style.top = this.lyricsScrollBarDistance * this.lyricsScrollTimes + 'px';
          this.$refs.lyricsScroll.style.top = this.lyricsScrollBarDistance * this.lyricsScrollTimes + 'px';
        } else if (this.lyricsScrollTimes < this.lyricsCanScrollTimes) {
          this.$refs.lyricsTotal.style.top = -this.lyricScrollDistance * this.lyricsScrollTimes + 'px';
          this.$refs.lyricsScroll.style.top = this.lyricsScrollBarDistance * this.lyricsScrollTimes + 'px';
        }
      }
    },
    // 检测是否发生滚动事件
    detect() {
      let _self = this;
      setInterval(function() {
        if (_self.preTime == _self.nowTime) {
          _self.lyricAutoScroll = true;
        } else {
          _self.preTime = _self.nowTime;
          _self.lyricAutoScroll = false;
        }
      }, 1500)
    }
  },
  mounted() {
    let _self = this;
    this.detect();

    if (this.songH > this.mskH) {
      this.getPlayList();
    }

    //data基础数据赋值
    this.$bus.$on('showScroll', function() {
        _self.songH = _self.songList.length * 28;
        _self.scrollH = _self.songH - _self.mskH;
        _self.scrollDistance = _self.scrollH / _self.scrollTimes; //列表每次滚动的距离
        let innerScrollProportion = _self.scrollH / _self.mskH * 1; //滚动条高度应占比例
        _self.innerScrollH = _self.mskH * innerScrollProportion;
        _self.innerH = _self.mskH - _self.innerScrollH;
        _self.innerScrollDistance = _self.innerH / _self.scrollTimes;
        _self.scrollLyricsH = _self.lyrics.length * 32 - _self.rightMskH; //歌词可滚动长度
        _self.lyricsCanScrollTimes = Math.ceil(_self.scrollLyricsH / _self.lyricScrollDistance); //歌词向上或向下能滚动次数
        _self.lyricsScrollBarH = _self.mskH / (_self.scrollLyricsH + _self.mskH) * _self.mskH;
        _self.lyricsScrollBarDistance = (_self.mskH - _self.lyricsScrollBarH) / _self.lyricsCanScrollTimes; //滚动条每次移动距离
        _self.lyricsAutoScrollDistance = (_self.mskH - _self.lyricsScrollBarH) / (_self.lyrics.length - 4);
        //_self.this.lyricsScrollBarTop = _self.mskH - _self.lyricsScrollBarH;

        if (_self.songH > _self.mskH) {
          _self.isShowHiddenScroll = false;
        } else {
          _self.isShowHiddenScroll = true;
        }
      }),
      // 获取歌词
      this.$bus.$on('sendID', function(val) {
        // 每次切换歌曲，已滚动次数还原
        _self.lyricsScrollTimes = 0;
        // 检测点击歌曲id和之前保存的id是否有区别
        if (val == _self.preSongId) {
          _self.preSongId = val;
        } else {
          _self.lyrics = [];
        }
        let url = '/lyric?id=' + val;
        this.$http({
          method: 'get',
          url: url
        }).then(function(res) {
          let lyrics = res.data.lrc.lyric.split('\n'); //待时间戳的歌词
          lyrics.forEach(function(item, index) {
            if (item !== "") {
              _self.lyrics[index] = [];
              let sj = item.match(/\[\d{2}:\d{2}\.\d{1,3}\]/g); //获取时间
              //将时间处理成以秒为单位
              let sjArr = sj[0].replace(/\[|\]/g, '').split(':');
              let time = 0;
              sjArr.forEach(function(item, index) {
                try {
                  if (index === 0) {
                    time += parseFloat(item) * 60;
                  } else if (index === 1) {
                    time += parseFloat(item);
                    if (time !== 0) {
                      time = time.toFixed(1)
                    }
                  }
                } catch (e) {
                  console.log(e);
                }
              })
              let _lrc = lyrics[index].replace(/\[\d{2}:\d{2}\.\d{1,3}\]/g, ""); //获取歌词
              if (sjArr || _lrc) {
                _self.lyrics[index].push(time);
                _self.lyrics[index].push(_lrc);
              }
            }
          })
        }).catch(function(e) {
          console.log(e)
        })
      })
    // 获取歌曲播放时间
    this.$bus.$on('getCurrentTime', function(val) {
      if (val == 0) {
        // 切换歌曲时，之前高亮取消,有时获取不到，可能是由于获取歌词时间慢了
        try {
          _self.$refs.lyric[_self.lyricLightRows].setAttribute('class', 'lyric-list');
        } catch (e) {
          console.log(e)
        }
        // 歌词回归顶部,滚动条回归顶部
        _self.$refs.lyricsTotal.style.top = _self.lyricsTop + 'px';
        _self.$refs.lyricsScroll.style.top = _self.lyricsTop + 'px';
        //当鼠标没有滚动歌词时，歌词自动滚动
        if (_self.lyricAutoScroll) {
          _self.$refs.lyricsTotal.style.top = 0 + 'px';
        }
      }
      _self.lyrics.some(function(item, index) {
        if (val == parseFloat(item[0])) {
          _self.$refs.lyric[index].setAttribute('class', 'lyric-list light-lyric-list');
          _self.lyricLightRows = index;
          if (index >= 3) {
            if (_self.lyricAutoScroll) {
              _self.$refs.lyricsTotal.style.top = -32 * (index - 3) + 'px';
            }
          }
          if (index > 0) {
            _self.$refs.lyric[index - 1].setAttribute('class', 'lyric-list');
          }

          if (index === _self.lyrics.length - 1) {
            _self.$refs.lyric[index].setAttribute('class', 'lyric-list');
          }

          // 滚动条自动随歌曲自动滚
          if (_self.lyricAutoScroll) {
            if (index > 3) {
              //_self.lyricsScrollTimes = Math.floor(_self.lyricsAutoScrollDistance * (index - 3) % _self.lyricScrollDistance);
              _self.$refs.lyricsScroll.style.top = _self.lyricsAutoScrollDistance * (index - 3) + 'px';
            }
          }
          return true;
        }
      })
    })

    // 获取进度条点击更改时间，歌词跳到相应部分
    this.$bus.$on('getProgressTime', function(val) {
      _self.lyrics.forEach(function(item, index) {
        if (_self.lyrics[index] && index < (_self.lyrics.length - 1)) {
          if (parseFloat(_self.lyrics[index][0]) < val && val < parseFloat(_self.lyrics[index + 1][0]) && index < _self.lyrics.length - 1) {
            _self.$refs.lyric[_self.lyricLightRows].setAttribute('class', 'lyric-list');
            _self.$refs.lyric[index].setAttribute('class', 'lyric-list light-lyric-list');
            if (_self.lyricAutoScroll) {
              _self.$refs.lyricsTotal.style.top = -32 * (index - 3) + 'px';
              _self.$refs.lyricsScroll.style.top = _self.lyricsAutoScrollDistance * (index - 3) + 'px';
            }
            _self.lyricLightRows = index;
          } else if (val > parseFloat(_self.lyrics[_self.lyrics.length - 1][0]) || val > parseFloat(_self.lyrics[_self.lyrics.length - 2][0])) {
            if (_self.lyricAutoScroll) {
              //_self.lyricsScrollTimes = Math.floor(_self.lyricsAutoScrollDistance * (index - 3) % _self.lyricScrollDistance);
              _self.$refs.lyricsTotal.style.top = -32 * (_self.lyrics.length - 4) + 'px';          
            }
          }
          if (index === _self.lyrics.length - 1) {
            _self.$refs.lyric[index].setAttribute('class', 'lyric-list');
          }
        }
      })
    })

    // 获取歌曲名
    this.$bus.$on('getSongName', function(val) {
      _self.currentSongName = val.name;
      _self.preSongId = val.id;
    })
  }
}

// 歌词有时会有多行高亮

</script>
<style src="./playList.css"></style>
