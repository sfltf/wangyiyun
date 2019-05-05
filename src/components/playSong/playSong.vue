<template>
  <div class="bottom-play-bg">
    <div style="width: 731px;margin: 0 auto;">
      <div class="play-button">
        <a class="play-pre bottom-play-bg" href="javascript:;" title="上一首(ctrl+←)"></a>
        <a class="play-current bottom-play-bg" href="javascript:;" title="播放/暂停(p)"></a>
        <a class="play-next bottom-play-bg" href="javascript:;" title="下一首(ctrl+→)"></a>
      </div>
      <div class="bottom-play-flag">
      	<img class="play-flag-img" :src="songDetail.al.picUrl" alt="">
      </div>
      <div class="bottom-play">
      	<el-progress :percentage="playProgress" color="#c70c0c" :stroke-width="9" :show-text="status"></el-progress>
      </div>
    </div>
    <!-- <audio :src="playSong" autoplay></audio> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      playSong: '',
      status: false,
      playProgress: 0,
      songDetail: {}
    }
  },
  methods: {

  },
  created() {
    // 获取歌词
    let _self = this;
    this.$http({
      method: 'get',
      url: '/song/url?id=33894312'
    }).then(function(res) {
      console.log('获取歌曲')
      console.log(res.data.data[0])
      _self.playSong = res.data.data[0].url;
    }).catch(function(e) {
      console.log(e)
    });

    this.$http({
      method: 'post',
      url: '/song/detail?ids=33894312'
    }).then(function(res) {
      console.log('获取歌曲内容')
      _self.songDetail = res.data.songs[0];
      console.log(_self.songDetail)
    }).catch(function(e) {
      console.log(e)
    });
  }
}

</script>
<style src="./playSong.css"></style>
