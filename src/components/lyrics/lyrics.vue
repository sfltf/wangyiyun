<template>
  <div>
    <ul style="clear:both;text-align:left;margin-top: 20px;">
      <li class="song-lyrics" :class="{'show-lyric' : !item[2]}" v-for="(item,index) of lyrics" :key="index" >{{item[1]}}<br/></li>
    </ul>
    <span class="expand" v-if="!showLyric" @click="showHiddenLyrics">
        展示
       <i class="icon-expand icon-bg"></i>
    </span>
    <span class="expand" v-else @click="showHiddenLyrics">
        收起
        <i class="icon-collapse icon-bg"></i>
    </span>
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
    };
  },
  computed: {
    ...mapState(["songId"])
  },
  methods: {
    // 歌词处理
    processingLyric(res) {
      let _self = this;
      let lyrics = res.data.lrc.lyric.split("\n"); //待时间戳的歌词
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
                _self.lyrics[index].splice(2, 0, _self.showLyric)
              }else {
                _self.lyrics[index].splice(2, 0, true)
              }
              
              _self.$forceUpdate();
            }
          } catch (e) {}
        }
      });
      //console.log(_self.lyrics)
    },
    //歌词展示与隐藏
    showHiddenLyrics () {
        let _self = this;
        this.showLyric = !this.showLyric;
        this.lyrics.forEach(function(item,index) {
            if(index > 12) {
                item.splice(2, 0, _self.showLyric);
                _self.$forceUpdate();
            }
        })
    }
  },
  mounted() {
    let _self = this;
    let url = "/lyric?id=" + this.songId;
    console.log(this.songId);
    this.$http({
      method: "get",
      url: url
    })
      .then(function(res) {
          _self.processingLyric(res);
        /* if (res.data) {
          _self.processingLyric(res);
        } */
      })
      .catch(function(e) {
        console.log(e);
      });
  }
};
</script>
<style src="./lyrics.css"></style>


