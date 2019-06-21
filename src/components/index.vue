<template>
  <div>
    <div class="index-top">
      <div class="top">
        <div class="top-bg">
          <router-link to="/" class="web-name">网易云音乐</router-link>
        </div>
        <nav class="main-nav">
          <ul class="main-nav-total">
            <li
              class="main-nav-list"
              v-for="(item,index) in mainMenu"
              :key="index"
              :class="{active: item.isActive}"
              @click="changeTap(index)"
            >
              <router-link :to="item.href">
                <span>{{ item.title }}</span>
                <sub class="top-prompt top-bg" :class="{currentShow: isShow[index]}"></sub>
              </router-link>
            </li>
            <sub class="hot top-bg"></sub>
          </ul>
        </nav>
        <div class="demo-input-suffix" style="float:left;margin-left: 60px;">
          <el-input placeholder="音乐/视频/电台/用户" v-model="input23" v-focus>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="creater-center">
          <a href="javascript:;">创作者中心</a>
        </div>
        <div class="login login-icon top-bg">
          <span @click="userLogin" v-if="!loginSuccess">登录</span>
          <img class="user-avatars" :src="userInformation.avatarUrl" alt v-else>
          <div class="login-tip" v-if="!loginSuccess">
            <ul class="login-tip-total">
              <li
                class="login-tip-list"
                @click="checkLogin(index)"
                v-for="(item,index) in loginStyle"
                :key="index"
              >
                <i class="login-tip-icon" :class="item.className"></i>
                <a :href="item.url">{{item.title}}</a>
              </li>
            </ul>
          </div>
          <div class="login-tip" v-else>
            <ul class="login-tip-total">
              <li
                class="login-tip-list"
                v-for="(item,index) in userIf"
                :key="index"
                @click="userOpreate(index)"
              >
                <i class="login-tip-icon" :class="item.className"></i>
                <a :href="item.url">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <findMusic v-if="isShow[0]"></findMusic>
    <myMusic v-else-if="isShow[1]"></myMusic>
    <friends v-else-if="isShow[2]"></friends>
    <mall v-else-if="isShow[3]"></mall>
    <musician v-else-if="isShow[4]"></musician>
    <client v-else-if="isShow[5]"></client> -->
    <router-view></router-view>
    <playSong></playSong>
    <Login v-if="!loginSuccess"/>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import findMusic from "./findMusic/findMusic.vue";
import myMusic from "./myMusic/myMusic.vue";
import friends from "./friends/friends.vue";
import mall from "./mall/mall.vue";
import musician from "./musician/musician.vue";
import client from "./client/client.vue";
import playSong from "./playSong/playSong.vue";
import Login from "@/components/login/login.vue";
export default {
  name: "index",
  components: {
    findMusic,
    myMusic,
    friends,
    mall,
    musician,
    client,
    playSong,
    Login
  },
  data() {
    return {
      dialogTableVisible: false,
      input23: "",
      isShow: [false, false, false, false, false, false],
      mainMenu: [
        { title: "发现音乐", isActive: false, href: '/' },
        { title: "我的音乐", isActive: false, href: '/my' },
        { title: "朋友", isActive: false, href: 'javascript:;' },
        { title: "商城", isActive: false, href: 'javascript:;' },
        { title: "音乐人", isActive: false, href: 'javascript:;' },
        { title: "下载客户端", isActive: false, href: 'javascript:;' }
      ],
      loginStyle: [
        { url: "javascript:;", title: "手机号登陆", className: "icon-mb" },
        { url: "javascript:;", title: "微信登陆", className: "icon-vx" },
        { url: "javascript:;", title: "qq登录", className: "icon-qq" },
        { url: "javascript:;", title: "新浪微博登陆", className: "icon-sn" },
        { url: "javascript:;", title: "网易邮箱账号登录", className: "icon-wy" }
      ],
      userIf: [
        {
          url: "javascript:;",
          title: "我的主页",
          className: "icon-myhomepage"
        },
        { url: "javascript:;", title: "我的消息", className: "icon-mymessage" },
        { url: "javascript:;", title: "我的等级", className: "icon-mylevel" },
        { url: "javascript:;", title: "vip会员", className: "icon-myvip" },
        { url: "javascript:;", title: "个人设置", className: "icon-myset" },
        { url: "javascript:;", title: "实名认证", className: "icon-verified" },
        { url: "javascript:;", title: "退出", className: "icon-logout" }
      ]
    };
  },
  computed: {
    ...mapState({
      dialogLoginVisible: state => state.user.dialogLoginVisible,
      loginSuccess: state => state.user.loginSuccess,
      userInformation: state => state.user.userInformation,
      selectType: state => state.user.selectType,
      isPhoneLogin: state => state.user.isPhoneLogin
    })
  },
  directives: {
    hover: function(el) {
      event.stopPropagation();
      el.addEventListener("mouseover", function() {
        document.querySelector(".login-tip").style.display = "block";
      });

      el.addEventListener("mouseout", function() {
        document.querySelector(".login-tip").style.display = "none";
      });
    },
    focus: function(el) {
      el.children[0].addEventListener("click", function() {
        this.setAttribute("placeholder", "");
      });

      el.children[0].addEventListener("blur", function() {
        this.setAttribute("placeholder", "音乐/视频/电台/用户");
      });
    }
  },
  methods: {
    ...mapMutations("user", [
      "setLoginVisible",
      "setLoginSuccess",
      "setUserInformation",
      "setSelectType",
      "setIsPhoneLogin"
    ]),
    changeTap(val) {
      let _self = this;
      this.mainMenu.forEach(function(item, index) {
        if (index === val) {
          item.isActive = true;
          _self.isShow[index] = true;
        } else {
          item.isActive = false;
          _self.isShow[index] = false;
        }
      });
    },
    //
    userLogin() {
      this.setLoginVisible(true);
    },
    // 用户选择登录方式
    checkLogin(index) {
      if (index === 0) {
        this.setLoginVisible(true);
        this.setSelectType(0);
        this.setIsPhoneLogin(true);
      }
    },
    //用户登录后的操作
    userOpreate(index) {
      switch (index) {
        case 0:
          this.$http({
            method: "get",
            url: "/login/refresh"
          }).then(function(res) {
            console.log(res);
          });
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          this.setUserInformation({});
          this.setLoginVisible(false);
          this.setLoginSuccess(false);
          this.Cookies.remove("wyy_uid");
          break;
      }
    }
  },
  created() {
    let _self = this;
    if (this.Cookies.get("wyy_uid")) {
      let url = "/user/detail?uid=" + this.Cookies.get("wyy_uid");
      this.$http({
        method: "post",
        url: url
      }).then(function(res) {
        console.log(res);
        _self.setUserInformation(res.data.profile);
        _self.setLoginVisible(false);
        _self.setLoginSuccess(true);
        console.log(_self.loginSuccess);
      });
    }
  },
  mounted() {
    let path = this.$route.path;
    console.log(path)
    switch (path) {
      case '/' :
        this.isShow[0] = true;
        this.mainMenu[0].isActive = true;
        break;
      case '/my' :
        this.isShow[1] = true;
        this.mainMenu[1].isActive = true;
        break;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/element-ui/theme-chalk.css"></style>
<style src="./index.css"></style>
