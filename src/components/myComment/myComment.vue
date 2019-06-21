<template>
  <div>
    <div class="comment-title">
      <span class="comment-name">评论</span>
      <span class="comment-num">共{{commentNum}}条评论</span>
    </div>
    <div class="user-comment">
      <img class="user-avatar" :src="userInformation.avatarUrl" alt="头像" v-if="userInformation.avatarUrl">
      <img class="user-avatar" src="/static/images/default_avatar.jpg" alt="头像" v-else>  
      <div class="comment-right">
        <el-input type="textarea" placeholder="评论" v-model="textarea" autosize resize="none"></el-input>
      </div>
    </div>
    <div class="user-operate">
      <el-popover placement="bottom" width="290" trigger="click" @show="setSrc">
          <span class="emtitm" v-for="(item,index) of expression" :key="index" v-html="item[1]"></span>
        <i class="icon-expression icon-bg" slot="reference"></i>
      </el-popover>
      <i class="icon-say icon-bg"></i>
      <button class="comment-send icon-button2">评论</button>
      <span class="comment-font-num" style="float: right">140</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      textarea: ""
    };
  },
  computed: {
      //["commentNum","expression"]
    ...mapState({
        commentNum: state => state.song.commentNum,
        expression: state => state.song.expression,
        userInformation: state => state.user.userInformation
    })
  },
  methods: {
      setSrc () {
          let _self = this;
          console.log(document.querySelectorAll('.emoji'))
          
          Array.from(document.querySelectorAll('.emoji')).forEach(function(item,index) {
              console.log(item)
              item.setAttribute('src',_self.dataset(item).src);
          })
      }
  }
};
</script>
<style src="./myComment.css"></style>


