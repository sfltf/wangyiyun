<template>
  <el-dialog
    title="登录"
    :visible.sync="dialogLoginVisible"
    :modal="false"
    :lock-scroll="true"
    :close-on-click-modal="false"
    @close="closeDialog"
    width="530px"
  >
    <div v-if="!isPhoneLogin && selectType == 3">
      <div class="login-padding">
        <div class="login-margin">
          <span class="login-playform icon-platform"></span>
          <el-row>
            <button class="icon-login icon-button" @click="goLogin">手机号登录</button>
            <span class="icon-supplement icon-button"></span>
          </el-row>
          <el-row>
            <button class="icon-register icon-button">注册</button>
            <span class="icon-supplement1 icon-button"></span>
          </el-row>
        </div>
        <div class="login-style">
          <ul class="login-total">
            <li class="login-list" v-for="(item,index) of loginStyle" :key="index">
              <a :href="item.url" :target="item.openStyle">
                <i class="icon-img" :class="item.className"></i>
                <span class="login-list-name">{{item.name}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Phonelogin v-if="isPhoneLogin && selectType == 0" /> 
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Phonelogin from './phoneLogin/phoneLogin.vue'
export default {
  components: {
    Phonelogin
  },
  data() {
    return {
      //isPhoneLogin: false,
      //selectType: 3, // 0登录 1注册 2忘记密码 3初始进入
      loginStyle: [
        {
          name: "微信登录",
          className: "icon-wx icon-logo",
          openStyle: "_block",
          url:
            "https://music.163.com/api/sns/authorize?snsType=10&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
        },
        {
          name: "QQ登录",
          className: "icon-QQ icon-logo",
          openStyle: "_block",
          url:
            "https://music.163.com/api/sns/authorize?snsType=5&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
        },
        {
          name: "微博登录",
          className: "icon-weibo icon-logo",
          openStyle: "_block",
          url:
            "https://music.163.com/api/sns/authorize?snsType=2&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
        },
        {
          name: "网易邮箱账户登录",
          className: "icon-Wy icon-logo",
          openStyle: "_self",
          url: "javascrpt:;"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      dialogLoginVisible: state => state.user.dialogLoginVisible,
      loginSuccess: state => state.user.loginSuccess,
      selectType: state => state.user.selectType,
      isPhoneLogin: state => state.user.isPhoneLogin
    })
  },
  methods: {
    ...mapMutations("user", [
      "setLoginVisible",
      "setLoginSuccess",
      "setUserInformation",
      "setSelectType",
      "setIsPhoneLogin"
    ]),

    ...mapActions('user',['getUserInformation']),
    closeDialog() {
      //this.dialogLoginVisible = false;
      this.setLoginVisible(false);
    },
    
    //用户选择手机号去登录
    goLogin() {
      this.setIsPhoneLogin(true)
      this.setSelectType(0);
      console.log(this.isPhoneLogin);
      console.log(this.selectType)
    },
  }
};
</script>
<style src="./login.css" ></style>

