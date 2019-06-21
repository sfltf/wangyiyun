<template>
  <div style="margin-bottom: 80px;border-bottom: 1px solid #ccc;">
    <div class="carousel-bg" :style="{'background-image':  carouselBg[index].bgSrc}">
      <el-carousel
        trigger="click"
        :interval="3000"
        arrow="always"
        height="336px"
        class="carousel-map"
        @change="changeBg"
      >
        <el-carousel-item v-for="(item,index) in carousel" :key="index">
          <a :href="item.url" class="el-link">
            <img :src="item.imageUrl" alt="歌单">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div
      class="special-topic"
      @click="getPlayList"
      v-for="(item,index) in subHead"
      :key="index"
      v-show="loginSuccess || index !== 1"
    >
      <subHead :result="subHead[index]" v-slot:breadCrumbs>
        <el-breadcrumb separator="|" style="position: absolute;left: 145px;top: 6px;">
          <el-breadcrumb-item>
            <a href="/">华语</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">流行</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">摇滚</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">民谣</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">电子</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </subHead>

      <subContent v-if="item.contentIsShow[0]"></subContent>
      <person v-else-if="loginSuccess && item.contentIsShow[1]"></person>
      <subContent1 v-else-if="item.contentIsShow[2]"></subContent1>
      <subContent2 v-else-if="item.contentIsShow[3]"></subContent2>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import subHead from "./subHead/subHead";
import subContent from "./subContent/subContent";
import person from "./person/person";
import subContent1 from "./subContent1/subContent1";
import subContent2 from "./subContent2/subContent2";

export default {
  components: {
    subHead,
    subContent,
    person,
    subContent1,
    subContent2
  },
  data() {
    return {
      index: 0,
      carouselBg: [
        { bgSrc: "url(/static/images/1bg.jpg)" },
        { bgSrc: "url(/static/images/2bg.jpg)" },
        { bgSrc: "url(/static/images/3bg.jpg)" },
        { bgSrc: "url(/static/images/4bg.jpg)" },
        { bgSrc: "url(/static/images/5bg.jpg)" },
        { bgSrc: "url(/static/images/6bg.jpg)" },
        { bgSrc: "url(/static/images/4bg.jpg)" },
        { bgSrc: "url(/static/images/5bg.jpg)" },
        { bgSrc: "url(/static/images/6bg.jpg)" }
      ],
      carousel: [],
      subHead: [
        {
          title: "热门推荐",
          moreSrc: "javascript:;",
          breadIsShow: true,
          contentIsShow: [true, false, false, false]
        },
        {
          title: "个性化推荐",
          moreSrc: "javascript:;",
          breadIsShow: false,
          contentIsShow: [false, true, false, false]
        },
        {
          title: "新碟上架",
          moreSrc: "javascript:;",
          breadIsShow: false,
          contentIsShow: [false, false, true, false]
        },
        {
          title: "榜单",
          moreSrc: "javascript:;",
          breadIsShow: false,
          contentIsShow: [false, false, false, true]
        }
      ]
    };
  },
  computed: {
    ...mapState({
      loginSuccess: state => state.user.loginSuccess
    })
  },
  watch: {
    loginSuccess(val, oldVall) {
      this.setLoginSuccess(val);
      console.log(this.loginSuccess);
    }
  },
  methods: {
    ...mapMutations("user", ["setLoginSuccess"]),
    changeBg(newIndex, oldIndex) {
      this.index = newIndex;
    },
    //测试歌单
    getPlayList() {
      let _self = this;
      _self
        .$http({
          method: "get",
          url: "/recommend/resource"
        })
        .then(function(res) {
          console.log(res);
          _self.music = res.data.playlists;
          _self.music.forEach(function(item, index) {
            if (item.playCount.toString().length > 5) {
              var playCount = item.playCount.toString().length - 4;
              item.playCount =
                item.playCount.toString().slice(0, playCount) + "万";
            }
          });
        })
        .catch(function(e) {
          console.log(e);
        });
    }
  },
  mounted() {
    let _self = this;
    this.$http({
      method: "get",
      url: "/banner",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(function(res) {
        console.log(res.data);
        _self.carousel = res.data.banners;
      })
      .catch(function(e) {
        console.log();
      });
  }
};
</script>
<style src="./recommend.css"></style>