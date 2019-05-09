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
          <li class="collection-song-list" :data-id="item.id" v-for="(item,index) of songList" :key="index" @click="play">
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
          <ul ref="lyricsTotal" style="position: relative;top: 0" class="lyric-total">
            <li class="lyric-list" v-for="(item,index) of lyrics" :key="index" :data-time="item[0]" ref="lyric">
              {{item[1]}}
            </li>
          </ul>
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
      LyricLightRows: 0 //当前歌词高亮行数
    }
  },
  methods: {
    getPlayList() {
      console.log(this.songList);
    },
    play(e) {
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
        console.log('向上滚动');
      } else {
        console.log('向下滚动');
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
    }
  },
  mounted() {
    let _self = this;
    if (this.songH > this.mskH) {
      this.getPlayList();
    }

    this.getPlayList();

    //data基础数据赋值
    this.$bus.$on('showScroll', function() {
        _self.songH = _self.songList.length * 28;
        _self.scrollH = _self.songH - _self.mskH;
        _self.scrollDistance = _self.scrollH / _self.scrollTimes; //列表每次滚动的距离
        let innerScrollProportion = _self.scrollH / _self.mskH * 1; //滚动条高度应占比例
        _self.innerScrollH = _self.mskH * innerScrollProportion;
        _self.innerH = _self.mskH - _self.innerScrollH;
        _self.innerScrollDistance = _self.innerH / _self.scrollTimes;
        if (_self.songH > _self.mskH) {
          _self.isShowHiddenScroll = false;
        } else {
          _self.isShowHiddenScroll = true;
        }
      }),
      // 获取歌词
      this.$bus.$on('sendID', function(val) {
        let url = '/lyric?id=' + val;
        this.$http({
          method: 'get',
          url: url
        }).then(function(res) {
          console.log('获取歌词')
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
              if (sj && _lrc) {
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
        // 切换歌曲时，之前高亮取消
        _self.$refs.lyric[_self.LyricLightRows].setAttribute('class', 'lyric-list');
        _self.$refs.lyricsTotal.style.top = 0 + 'px';
      }
      _self.lyrics.some(function(item, index) {
        if (val == parseFloat(item[0])) {
          _self.$refs.lyric[index].setAttribute('class', 'lyric-list light-lyric-list');
          _self.LyricLightRows = index;
          // 这有问题        
          if (index >= 3) {
            _self.$refs.lyricsTotal.style.top = -32 * (index - 3) + 'px';
          }

          /*if(val > parseFloat(_self.lyrics[_self.lyrics.length - 1][0])) {
          	console.log('触发')
          	_self.$refs.lyric[index].setAttribute('class', 'lyric-list');
          }*/
          if (index > 0) {
            if (_self.lyrics[index - 1].length !== 0) {
              _self.$refs.lyric[index - 1].setAttribute('class', 'lyric-list');
            } else if (_self.lyrics[index - 1].length === 0) {
              _self.$refs.lyric[index - 2].setAttribute('class', 'lyric-list');
            }
          }

          return true;
        }
      })
    })

    // 获取进度条点击更改时间，歌词跳到相应部分
    this.$bus.$on('getProgressTime', function(val) {
      _self.lyrics.forEach(function(item, index) {
        if (parseFloat(_self.lyrics[index][0]) < val && val < parseFloat(_self.lyrics[index + 1][0]) && index !== _self.lyrics.length - 2) {
          _self.$refs.lyric[_self.LyricLightRows].setAttribute('class', 'lyric-list');
          _self.$refs.lyric[index].setAttribute('class', 'lyric-list light-lyric-list');
          _self.$refs.lyricsTotal.style.top = -32 * (index - 3) + 'px';
          _self.LyricLightRows = index;
        }
      })
    })

    // 获取歌曲名
    this.$bus.$on('getSongName', function(val) {
      _self.currentSongName = val;
    })
  }
}

</script>
<style src="./playList.css"></style>
