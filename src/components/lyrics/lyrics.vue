<template>
  <div>
    <ul style="clear:both;text-align:left;margin-top: 20px;" v-cloak>
      <li
        class="song-lyrics"
        :class="{'show-lyric' : !item[2]}"
        v-for="(item,index) of lyrics"
        :key="index"
      >
        {{item[1]}}
        <br>
      </li>
    </ul>
    <div v-if="isShowExpand">
      <span class="expand" v-if="!showLyric" @click="showHiddenLyrics">
        展示
        <i class="icon-expand icon-bg"></i>
      </span>
      <span class="expand" v-else @click="showHiddenLyrics">
        收起
        <i class="icon-collapse icon-bg"></i>
      </span>
    </div>
    <div class="report-error">
      <router-link :to="{}">报错</router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      lyrics: [],
      showLyric: false,
      isShowExpand: true
    };
  },
  computed: {
    ...mapState({
      songId: state => state.song.songId
    })
  },
  methods: {
    // 歌词处理
    processingLyric(res) {
      let _self = this;
      console.log(res);
      if (res.data.nolyric) {
        _self.lyrics[0] = [];
        _self.lyrics[0].push("");
        _self.lyrics[0].push("纯音乐，无歌词"), _self.lyrics[0].push(true);
        _self.isShowExpand = false;
        console.log(_self.lyrics);
        _self.$forceUpdate();
      } else {
        let lyrics = res.data.lrc.lyric.split("\n"); //待时间戳的歌词
        console.log(lyrics);
        lyrics.forEach(function(item, index) {
          if (item !== "") {
            try {
              _self.lyrics[index] = [];
              let sj = item.match(/\[\d{2}:\d{2}\.\d{1,3}\]/g); //获取时间
              //将时间处理成以秒为单位
              if (sj !== null) {
                var sjArr = sj[0].replace(/\[|\]/g, "").split(":");
              }
              let time = 0;
              sjArr.forEach(function(item, index) {
                try {
                  if (index === 0) {
                    time += parseFloat(item) * 60;
                  } else if (index === 1) {
                    time += parseFloat(item);
                    if (time !== 0) {
                      time = time.toFixed(1);
                    }
                  }
                } catch (e) {
                  console.log(e);
                }
              });
              let _lrc = lyrics[index].replace(/\[\d{2}:\d{2}\.\d{1,3}\]/g, ""); //获取歌词
              if (sjArr || _lrc) {
                _self.lyrics[index].splice(0, 0, time);
                _self.lyrics[index].splice(1, 0, _lrc);
                if (index > 12) {
                  _self.lyrics[index].splice(2, 0, _self.showLyric);
                } else {
                  _self.lyrics[index].splice(2, 0, true);
                }

                _self.$forceUpdate();
              }
            } catch (e) {}
          }
        });
      }

      //console.log(_self.lyrics)
    },
    //歌词展示与隐藏
    showHiddenLyrics() {
      let _self = this;
      this.showLyric = !this.showLyric;
      this.lyrics.forEach(function(item, index) {
        if (index > 12) {
          item.splice(2, 0, _self.showLyric);
          _self.$forceUpdate();
        }
      });
    }
  },
  mounted() {
    let _self = this;
    let getID = setInterval(function() {
      if (_self.songId) {
        let url = "/lyric?id=" + _self.songId;
        _self
          .$http({
            method: "get",
            url: url
          })
          .then(function(res) {
            _self.processingLyric(res);
          })
          .catch(function(e) {
            console.log(e);
          });
        clearInterval(getID);
      } else {
        //
      }
    }, 50);
  }
};
</script>
<style src="./lyrics.css"></style>


