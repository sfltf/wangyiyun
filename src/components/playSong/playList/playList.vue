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
    </div>
    <div class="play-content">
      <div class="left-msk" ref="leftMsk">
        <ul class="collection-song-total" @mousewheel="pageScroll" ref="songTotal" style="top: 0">
          <li class="collection-song-list" data-id="item.id" v-for="(item,index) of songList" :key="index">
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
        <div :class="{'show-scroll': isShowHiddenScroll}" class="outer-scroll">
          <div :style="{height: innerScrollH + 'px'}" class="inner-scroll" ref="innerScroll" style="top: 0"></div>
        </div>
      </div>
    </div>
    <div class="right-msk"></div>
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
      innerH: 0,//滚动条能滚动长度
      innerScrollDistance: 0, //滚动条每次移动距离
      songProportion: 0, //不可移动比例
      scrollTop: 0 //滚动条距离顶部的距离
    }
  },
  methods: {
    getPlayList() {
      console.log(this.songList);
    },
    showScroll() {
      this.songH = this.songList.length * 28;
      this.scrollH = this.songH - this.mskH;
      this.songProportion = this.mskH / this.songH;
      console.log(this.songProportion);
      this.innerScrollH = this.mskH * this.songProportion;
      this.innerScrollDistance = this.scrollDistance;
      if (this.songH > this.mskH) {
        this.isShowHiddenScroll = false;
      } else {
        this.isShowHiddenScroll = true;
      }
    },
    pageScroll(event) {
      event = event || window.event;
      event.preventDefault(); //阻止滚动事件冒泡
      //console.log(event);
      console.log(this.$refs.songTotal.style.top)
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
          console.log(this.scrollTop)
          console.log(this.innerH)
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
  	if(this.songH > this.mskH) {
  		this.getPlayList();
  	}
    
    //this.showScroll();
    this.$bus.$on('showScroll', function() {
      _self.songH = _self.songList.length * 28;
      _self.scrollH = _self.songH - _self.mskH;
      _self.songProportion = _self.mskH / _self.songH;
      _self.innerScrollH = _self.mskH * _self.songProportion;
      _self.innerH = _self.mskH - _self.innerScrollH;
      _self.innerScrollDistance = 10 * (1 - (_self.mskH / _self.songH));
      if (_self.songH > _self.mskH) {
        _self.isShowHiddenScroll = false;
      } else {
        _self.isShowHiddenScroll = true;
      }
    })
  }
}

</script>
<style src="./playList.css"></style>
