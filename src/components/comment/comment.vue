<template>
  <div class="comment">
    <div class="hot-comment" v-if="page == 1">精彩评论</div>
    <div class="hot-content" v-if="page == 1">
      <ul>
        <li
          class="user-information"
          v-for="(item,index) of hotComments"
          :key="index"
          :data-id="item.commentId"
        >
          <router-link class="user-avatar" :to="{}" :data-id="item.user.avatarUrl">
            <img class="user-avatar" :src="item.user.avatarUrl" alt="用户头像">
          </router-link>
          <router-link
            class="user-name"
            :to="{}"
            :data-id="item.user.avatarUrl"
          >{{item.user.nickname}}</router-link>
          <span class="red-vip icon2" v-if="item.user.userType == 4"></span>
          <span class="star-vip icon-bg" v-else-if="item.user.userType == 202"></span>
          <span
            class="package icon-package"
            v-if="item.user.vipRights && item.user.vipRights.musicPackage"
          ></span>
          <span
            class="vip icon-vip"
            v-if="item.user.vipRights && item.user.vipRights.redVipAnnualCount < 0"
          ></span>
          <span
            class="year-vip icon-yearVip"
            v-else-if="item.user.vipRights && item.user.vipRights.redVipAnnualCount > 0"
          ></span>
          <span class="colon">:</span>
          <div id="hotComments"></div>
          <p
            class="comments-content"
            v-for="(Initem,Inindex) of item.hotComments"
            :key="Inindex"
            v-html="Initem"
          ></p>
          <div class="reply">
            <span>{{item.time}}</span>
            <span class="like">
              <i class="liked icon2"></i>
              <span class="liked-num">({{item.likedCount}})</span>
              <span class="reply-name">回复</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="hot-comment" style="margin-top: 30px;">最新评论({{commentNum}})</div>
    <div class="hot-content">
      <ul>
        <li
          class="user-information"
          v-for="(item,index) of comments"
          :key="index"
          :data-id="item.commentId"
        >
          <router-link class="user-avatar" :to="{}" :data-id="item.user.avatarUrl">
            <img class="user-avatar" :src="item.user.avatarUrl" alt="用户头像">
          </router-link>
          <router-link
            class="user-name"
            :to="{}"
            :data-id="item.user.avatarUrl"
          >{{item.user.nickname}}</router-link>
          <span class="red-vip icon2" v-if="item.user.userType == 4"></span>
          <span class="star-vip icon-bg" v-else-if="item.user.userType == 202"></span>
          <span
            class="package icon-package"
            v-if="item.user.vipRights && item.user.vipRights.musicPackage"
          ></span>
          <span
            class="vip icon-vip"
            v-if="item.user.vipRights && item.user.vipRights.redVipAnnualCount < 0"
          ></span>
          <span
            class="year-vip icon-yearVip"
            v-else-if="item.user.vipRights && item.user.vipRights.redVipAnnualCount > 0"
          ></span>
          <span class="colon">:</span>
          <p
            class="comments-content"
            v-for="(Initem,Inindex) of item.hotComments"
            :key="Inindex"
            v-html="Initem"
          ></p>
          <div class="reply">
            <span>{{item.time}}</span>
            <span class="like">
              <i class="liked icon2"></i>
              <span class="liked-num">({{item.likedCount}})</span>
              <span class="reply-name">回复</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
      prev-text="< 上一页"
      next-text="> 下一页"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="pageTotal"
      @current-change="getCurrentPage"
    ></el-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      hotComments: [],
      comments: [],
      pastYearTime: 0,
      pastDayTime: 0,
      page: 1,
      pageSize: 20,
      pageTotal: 0
    };
  },
  computed: {
    //["songId", "commentNum", "expression"]
    ...mapState({
      songId: state => state.song.songId,
      commentNum: state => state.song.commentNum,
      expression: state => state.song.expression
    })
  },
  methods: {
    //   获取今年已过时间
    getYearPastTime() {
      let [currentYear, currentMonth, currentDay] = [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      ];
      //let currentYear = new Date().getFullYear();
      this.pastYearTime =
        new Date().getTime() - new Date(currentYear + "-01-01").getTime();
      //let currentMonth = new Date().getMonth() + 1;
      //let currentDay = new Date().getDate() - 1;
      this.pastDayTime =
        new Date().getTime() -
        new Date(currentYear + "-" + currentMonth + "-" + currentDay).getTime();
    },
    // 获取page页
    getCurrentPage(page) {
      this.page = page;
      let _self = this;
      let commentUrl =
        "/comment/music?id=" +
        this.songId +
        "&limit=" +
        this.pageSize +
        "&offset=" +
        (this.page - 1) * this.pageSize;
      this.$http({
        method: "get",
        url: commentUrl
      })
        .then(function(res) {
          _self.hotComments = [];
          _self.comments = [];
          if (page > 1) {
            _self.comments = res.data.comments;
            _self.processingComments(_self.comments);
          } else {
            _self.hotComments = res.data.hotComments;
            _self.comments = res.data.comments;
            _self.processingComments(_self.hotComments);
            _self.processingComments(_self.comments);
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    // 对数据进行修改
    processingComments(data) {
      this.getYearPastTime();
      let _self = this;
      data.forEach(function(item, index) {
        item.hotComments = [];
        //console.log(new Date().getTime() - item.time)
        if (new Date().getTime() - item.time <= 3600000) {
          //console.log(_self.moment(item.time).format("mm分钟前"));
          item.time = _self
            .moment(new Date().getTime() - item.time)
            .format("m分钟前");
        } else if (
          new Date().getTime() - item.time <
          _self.pastDayTime
        ) {
          item.time = _self
            .moment(item.time)
            .format("HH:mm");
        } else if ( _self.pastDayTime <= new Date().getTime() - item.time && new Date().getTime() - item.time  <= _self.pastDayTime + 24 * 60 * 60 * 1000) {
          //console.log(_self.moment(item.time).format("昨天 HH:mm"));
          item.time = _self.moment(item.time).format("昨天 HH:mm");
        } else if (new Date().getTime() - item.time < _self.pastYearTime) {
          //console.log(_self.moment(item.time).format("M月DD日 HH:mm"));
          item.time = _self.moment(item.time).format("M月D日 HH:mm");
        } else if (new Date().getTime() - item.time > _self.pastYearTime) {
          item.time = _self.moment(item.time).format("YYYY年M月D日");
        }
        //item.time = _self.moment(item.time).format("YYYY年M月DD日 h:mm:ss");
        let lyrics = item.content.split("\n");
        lyrics.forEach(function(inItem, Inindex) {
          if (inItem !== "") {
            let expression = inItem.match(/\[(.+?)\]/g); //获取表情
            if (expression) {
              expression.forEach(function(value, order) {
                _self.expression.forEach(function(value1, order1) {
                  if (value == value1[0]) {
                    let newItem = inItem.replace(/\[(.+?)\]/g, value1[1]);
                    if (order == expression.length - 1) {
                      item.hotComments.push(newItem);
                    }
                  }
                });
              });
            } else {
              item.hotComments.push(inItem);
            }
          }
        });
      });
    }
  },
  mounted() {
    console.log(this.songId);
    let _self = this;
    let getID = setInterval(function() {
      if (_self.songId) {
        let commentUrl =
          "/comment/music?id=" +
          _self.songId +
          "&limit=" +
          _self.page * _self.pageSize;
        _self
          .$http({
            method: "get",
            url: commentUrl
          })
          .then(function(res) {
            _self.hotComments = [];
            _self.comments = [];
            console.log(res);
            _self.hotComments = res.data.hotComments;
            _self.pageTotal = res.data.total;
            _self.comments = res.data.comments;
            _self.processingComments(_self.hotComments);
            _self.processingComments(_self.comments);
          })
          .catch(function(e) {
            console.log(e);
          });
        clearInterval(getID);
      }
    });
  }
};
</script>
<style src="./comment.css"></style>


