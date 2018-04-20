// pages/login/login.js
Page({
  data: {
    items: [
      { name: 'agr', value: '已阅读并同意', checked: true },
    ],
  },
  onLoad: function (options) { },
  //获取用户输入信息
  formSubmit: function (e) {
    console.log(e.detail.value.login_num)
    if (e.detail.value.login_num != "" && this.data.items[0].checked) {
      //判断输入的是正确的电话号码
      if (e.detail.value.login_num.length < 11) {
        wx.showToast({
          title: '请输入正确的手机号码',
          icon: 'success',
          duration: 2000
        })
      } else {

        //登入
        this.login(e.detail.value.login_num);
      }
    }

  },
  //判断是否勾选协议
  checkboxChange: function (e) {
    var that = this;
    var list = that.data.items;
    var num = e.detail.value.length;
    for (var i = 0; i < num; i++) {
      //勾选协议返回true
      if (e.detail.value[i] == list[i].name) {
        list[i].checked = true;
      }
    }
    if (num == 0) {
      list[0].checked = false;
    }

  },
  //请求数据  验证手机是否注册过
  login: function (tel) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/PtlWeixin!regLogindo.action',
      data: {
       "nosession": true,
        //用户电话
        userMobile: tel,
        //步骤1 验证用户是否注册
        step: 1,
      },

      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {

        //0：注册用户     1：未注册用户
        that.isLogin(res.data.result, tel);

      },
      fail: function (res) {
        console.log(res);
      },

    })
  },
  //判断用户是否登入
  isLogin: function (result, telNum) {
    console.log('telNum' + telNum);
    if (result == 1) {
      //跳转注册页面
      wx.navigateTo({
        url: '../register/register?tel='+telNum
      })
    } else if (result == 0) {
      //跳转登入页面
      wx.navigateTo({
        url: '../login/login?tel='+telNum
      })
    }
  },
})
//https://www.ijointoo.com/i9touuat/PtlWeixin!regLogindo.action