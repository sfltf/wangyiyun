<template>
  <div>
    <nav class="subMeun">
      <ul class="subMeun-total">
        <li class="subMeun-list" v-for="(item,index) in subMenu" @click="chooseTap(index)">
          <a href="javascript:;">
            <span :class="{'subMeun-list-active': item.isShow}">{{item.title}}</span>
          </a>
        </li>
      </ul>
    </nav>
    <keep-alive>
      <recommend v-if="isShow[0]"></recommend>
      <leaderboard v-else-if="isShow[1]"></leaderboard>
      <songList v-else-if="isShow[2]"></songList>
      <anchorRadio v-else-if="isShow[3]"></anchorRadio>
      <singer v-else-if="isShow[4]"></singer>
      <newDiscShelf v-else-if="isShow[5]"></newDiscShelf>
    </keep-alive>
  </div>
</template>
<script>
import recommend from './recommend/recommend.vue';
import leaderboard from './leaderboard/leaderboard.vue';
import songList from './songList/songList.vue';
import anchorRadio from './anchorRadio/anchorRadio.vue';
import singer from './singer/singer.vue';
import newDiscShelf from './newDiscShelf/newDiscShelf.vue';
export default {
  components: {
    recommend,
    leaderboard,
    songList,
    anchorRadio,
    singer,
    newDiscShelf
  },
  data() {
    return {
      isShow: [true, false, false, false, false, false],
      subMenu: [
        { title: '推荐', isShow: true },
        { title: '排行榜', isShow: false },
        { title: '歌单', isShow: false },
        { title: '主播电台', isShow: false },
        { title: '歌手', isShow: false },
        { title: '新碟上架', isShow: false }
      ]
    }
  },
  methods: {
    chooseTap(val) {
      let _self = this;
      this.subMenu.forEach(function(item, index) {
        if (index === val) {
          item.isShow = true;
          _self.isShow[index] = true;
        } else {
          item.isShow = false;
          _self.isShow[index] = false;
        }
      })
    }
  }
}

</script>
<style src="./findMusic.css"></style>
