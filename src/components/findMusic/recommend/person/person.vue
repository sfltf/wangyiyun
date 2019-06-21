<template>
  <div class="sub-content sub-content1">
    <ul class="sub-content-total">
      <li class="sub-content-list">
        <div style="position: relative;height: 143px;">
          <a class="u-date list-link icon-date list-bg-position cover-bg" href="javascript:;"></a>
          <span class="week">{{weekday}}</span>
          <span class="date icon-date" style="position: absolute;">{{day}}</span>
        </div>
        <div style="position:relative;width: 140px;height: auto;text-align:left;">
          <a href="javascript:;" class="link-title">每日推荐</a>
          <p style="text-align: left; color: #999;">根据你的口味生成，每天6:00更新</p>
        </div>
      </li>
      <li class="sub-content-list" v-for="(item,index) in music" :key="index">
        <div style="position:relative;width: 140px;text-align:left;">
          <a class="list-link list-bg-position cover-bg" :href="item.linkSrc"></a>
          <img :src="item.picUrl" alt="图片" style="width: 140px;height: 140px;">
          <div class="list-playVolume">
            <a class="play-bg list-playVolume-bg" :data-res-id="item.id"></a>
            <span class="listen-bg list-playVolume-bg"></span>
            <span class="list-playCount">{{item.playcount}}</span>
          </div>
        </div>
        <div style="position:relative;height: auto;text-align:left;width: 140px;">
          <a :href="item.linkSrc" class="link-title">{{item.name}}</a>
          <p style="text-align: left; color: #999;">{{item.copywriter}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      music: [],
      weekday: "",
      day: ""
    };
  },
  computed: {
    ...mapState({
      loginSuccess: state => state.user.loginSuccess
    })
  },
  created() {
    let _self = this;
    // 个性化推荐
    console.log(_self.loginSuccess);
    if (_self.loginSuccess) {
      _self
        .$http({
          method: "get",
          withCredentials: true,
          url: "/recommend/resource"
        })
        .then(function(res) {
          console.log(res);
          if (res) {
            res.data.recommend.forEach(function(item, index) {
              if (index < 3) {
                if (item.playcount.toString().length > 5) {
                  _self.music.push(item);
                  console.log();
                  let playcount = item.playcount.toString().length - 4;
                  item.playcount =
                    item.playcount.toString().slice(0, playcount) + "万";
                }
              }
            });
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    }
  },
  mounted() {
    let weekDay = new Date().getDay();
    switch (weekDay) {
      case 0:
        this.weekday = "星期日";
        break;
      case 1:
        this.weekday = "星期一";
        break;
      case 2:
        this.weekday = "星期二";
        break;
      case 3:
        this.weekday = "星期三";
        break;
      case 4:
        this.weekday = "星期四";
        break;
      case 5:
        this.weekday = "星期五";
        break;
      case 6:
        this.weekday = "星期六";
        break;
    }
    this.day = new Date().getDate();
  }
};
</script>
<style>
.date {
  display: inline-block;
  width: 140px;
  height: 107px;
  background-position: 0 -150px;
  display: block;
  line-height: 102px;
  text-align: center;
  font-size: 94px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}

.week {
  position: relative;
  display: block;
  width: 140px;
  height: 33px;
  line-height: 33px;
  color: #fed9d9;
  font-size: 14px;
  text-shadow: 0 -1px #962626;
  text-align: center;
}

.u-date {
  color: #202020;
}
</style>


