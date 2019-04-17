<template>
  <div>
    <div class="index-top">
      <div class="top">
        <div class="top-bg">
          <a href="/#" class="web-name">网易云音乐</a>
        </div>
        <nav class="main-nav">
          <ul class="main-nav-total">
            <li class="main-nav-list" v-for="(item,index) in mainMenu" :key="index" :class="{active: item.isActive}" @click="changeTap(index)">
              <a href="/#">
                <span>{{ item.title }}</span>
                <sub class="top-prompt top-bg" :class="{currentShow: isShow[index]}"></sub>
              </a>
            </li>
            <sub class="hot top-bg"></sub>
          </ul>
        </nav>
        <div class="demo-input-suffix" style="float:left;margin-left: 60px;">
          <el-input placeholder="音乐/视频/电台/用户" v-model="input23" v-focus>
            <i slot="prefix" class="el-input__icon el-icon-search" ></i>
          </el-input>
        </div>
        <div class="creater-center">
          <a href="javascript:;">创作者中心</a>
        </div>
        <div class="login login-icon top-bg" v-hover>
          <span>登录</span>
          <div class="login-tip">
            <ul class="login-tip-total">
              <li class="login-tip-list" v-for="(item,index) in loginStyle" :key="index">
                <i class="login-tip-icon" :class="item.className"></i>
                <a :href="item.url">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <findMusic v-if="isShow[0]"></findMusic>
    <myMusic v-else-if="isShow[1]"></myMusic>
    <friends v-else-if="isShow[2]"></friends>
    <mall v-else-if="isShow[3]"></mall>
    <musician v-else-if="isShow[4]"></musician>
    <client v-else-if="isShow[5]"></client>
  </div>
</template>
<script>
import findMusic from './findMusic/findMusic.vue'
import myMusic from './myMusic/myMusic.vue'
import friends from './friends/friends.vue'
import mall from './mall/mall.vue'
import musician from './musician/musician.vue'
import client from './client/client.vue'
export default {
  name: 'index',
  components: {
    findMusic,
    myMusic,
    friends,
    mall,
    musician,
    client
  },
  data() {
    return {
      input23: '',
      isShow: [true, false, false, false, false, false],
      mainMenu: [
        { title: '发现音乐', isActive: true },
        { title: '我的音乐', isActive: false },
        { title: '朋友', isActive: false },
        { title: '商城', isActive: false },
        { title: '音乐人', isActive: false },
        { title: '下载客户端', isActive: false }
      ],
      loginStyle: [
        {url: 'javascript:;',title: '手机号登陆', className: 'icon-mb'},
        {url: 'javascript:;',title: '微信登陆', className: 'icon-vx'},
        {url: 'javascript:;',title: 'qq登录', className: 'icon-qq'},
        {url: 'javascript:;',title: '新浪微博登陆', className: 'icon-sn'},
        {url: 'javascript:;',title: '网易邮箱账号登录', className: 'icon-wy'},
      ]
    }
  },
  directives: {
    hover: function(el) {
      el.addEventListener('mouseover',function() {
        document.querySelector('.login-tip').style.display = 'block';
      })

      el.addEventListener('mouseout',function() {
        document.querySelector('.login-tip').style.display = 'none';
      })
    },
    focus: function(el) {
      el.children[0].addEventListener('click',function() {
        this.setAttribute('placeholder','');
      })

      el.children[0].addEventListener('blur',function() {
        this.setAttribute('placeholder','音乐/视频/电台/用户');
      })
    }
  },
  methods: {
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
      })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/element-ui/theme-chalk.css"></style>
<style src="./index.css"></style>
