<template>
  <div>
    <div class="login-padding">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div style class="current-login">
          <el-form-item prop="phone">
            <el-input
              placeholder="请输入手机号"
              v-model.number="ruleForm.phone"
              autocomplete="off"
              class="input-with-select"
              clearable
              @change="removeError"
            >
              <el-select v-model="ruleForm.select" slot="prepend" placeholder="+86">
                <el-option :value="item.value" v-for="(item,index) of frontStamp" :key="index">
                  <span style="float: left;">{{item.label}}</span>
                  <span style="float: right;">{{item.label2}}</span>
                </el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="current-login"
              placeholder="请输入密码"
              v-model="ruleForm.password"
              clearable
              show-password
              autocomplete="off"
              @change="removeError"
              style="margin-top: 5px;"
            ></el-input>
          </el-form-item>
          <span class="error-user" v-if="userError">用户名或密码错误</span>
        </div>
      </el-form>
      <div class="opreate-password">
        <el-checkbox v-model="ruleForm.checked" style="float:left;">记住我</el-checkbox>
        <span style="float: right;">忘记密码?</span>
      </div>
      <el-row class="current-login">
        <a href="javascript:;">
          <button
            class="icon-login icon-button"
            @click="loginPhone('ruleForm')"
          >登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
          <span class="icon-supplement icon-button"></span>
        </a>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <span class="login-back" @click="backLogin">＜&nbsp;&nbsp;其他登录方式</span>
      <span class="register-back">没有账号?&nbsp;&nbsp;免费注册&nbsp;&nbsp;＞</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        phone: "",
        password: "",
        select: "",
        checked: true
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      //isPhoneLogin: false,
      frontStamp: [
        {
          label: "中国",
          label2: "+86",
          value: "+86"
        },
        {
          label: "中国香港",
          label2: "+852",
          value: "+852"
        },
        {
          label: "中国澳门",
          label2: "+853",
          value: "+853"
        },
        {
          label: "中国台湾",
          label2: "+886",
          value: "+886"
        },
        {
          label: "日本",
          label2: "+81",
          value: "+81"
        },
        {
          label: "韩国",
          label2: "+82",
          value: "+82"
        },
        {
          label: "英国",
          label2: "+44",
          value: "+44"
        },
        {
          label: "美国",
          label2: "+1",
          value: "+1"
        },
        {
          label: "加拿大",
          label2: "+1",
          value: "+1"
        },
        {
          label: "法国",
          label2: "+33",
          value: "+33"
        },
        {
          label: "芬兰",
          label2: "+358",
          value: "+358"
        },
        {
          label: "德国",
          label2: "+49",
          value: "+49"
        },
        {
          label: "荷兰",
          label2: "+31",
          value: "+31"
        },
        {
          label: "意大利",
          label2: "+39",
          value: "+39"
        },
        {
          label: "印度",
          label2: "+91",
          value: "+91"
        },
        {
          label: "泰国",
          label2: "+66",
          value: "+66"
        }
      ],
      userError: false
    };
  },
  computed: {
    ...mapState({
      dialogLoginVisible: state => state.user.dialogLoginVisible,
      loginSuccess: state => state.user.loginSuccess,
      selectType: state => state.user.selectType
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
    removeError() {
      if (this.userError) {
        this.userError = false;
      }
    },
    //返回选择登录方式
    backLogin() {
      this.setIsPhoneLogin(false);
      this.setSelectType(3);
    },
    //用户通过手机号登录
    loginPhone(formName) {
      let _self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url =
            "/login/cellphone?phone=" +
            _self.ruleForm.phone +
            "&password=" +
            _self.ruleForm.password;
          _self
            .$http({
              method: "post",
              withCredentials: true,
              url: url
            })
            .then(function(res) {
              console.log(res);
              if (res) {
                _self.setUserInformation(res.data.profile);
                _self.setLoginVisible(false);
                _self.setLoginSuccess(true);
                _self.userError = false;
                _self.Cookies.set("wyy_uid", res.data.profile.userId, {
                  expires: 7,
                  path: ""
                });
              } else {
                _self.userError = true;
              }
            })
            .catch(function(e) {
              _self.userError = true;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

