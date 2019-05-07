<template>
  <div class="play-list-bg">
    <div class="play-top">
      <span class="play-list-totalN">
        播放列表({{songList.length}})
      </span>
      <a href="javascript:;" class="collection-all">
        <span class="ico-add playList-bg"></span>
        收藏全部</a>
    </div>
    <div class="play-content">
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
      songList: this.playlist
    }
  },
  methods: {
    getPlayList() {
      console.log(this.songList);
    }
  },
  mounted() {
    this.getPlayList();
  }
}

</script>
<style src="./playList.css"></style>
