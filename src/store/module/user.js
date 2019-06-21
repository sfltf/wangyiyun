const user = {
    namespaced: true,
    state: {
        loginSuccess: false, //是否登录
        dialogLoginVisible: false, //登录框展示或隐藏
        userInformation: {}, //用户信息
        userId: 0, //用户id
        selectType: 3, //用户选择登录，注册的方式 // 0手机登录 1注册 2忘记密码 3初始进入
        isPhoneLogin: false // 是否手机登录
    },
    mutations: {
        setLoginVisible: (state,status) => {
            state.dialogLoginVisible = status;
        },
        setLoginSuccess: (state,status) => {
            state.loginSuccess = status;
        },
        setUserInformation (state,obj) {
            state.userInformation = obj;
        },
        setUserId: (state,id) => {
            state.userId = id;
        },
        setSelectType: (state,type) => {
            state.selectType = type;
        },
        setIsPhoneLogin: (state,status) => {
            state.isPhoneLogin = status;
        }
    },
    actions: {
        // 可以使用 {state,commit}是因为参数context对象包含这两个方法
        getUserInformation: function(context) {
            console.log(this)
        }
    }
}

export default user;