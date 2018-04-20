// pages/login/login.js
Page({
  data: {
    items: [
      { name: 'VerCode', value: '验证码登录', checked: true },
      { name: 'password', value: '密码登录', checked: false },

    ],
    imageCode: '',
    tel: '',
    time: Math.random(),
    url: "https://www.ijointoo.com/i9touuat/genVerifyCode.do",

    codeNum: "获取验证码",
    wait: 60,
  },
  onLoad: function (options) {
    this.data.tel = options.tel;

  },
  radioChange: function (e) {
    var that = this;
    var list = that.data.items;
    for (var i = 0; i < list.length; ++i) {
      if (list[i].name == e.detail.value) {
        list[i].checked = !list[i].checked;
        console.log(list[i].checked);
      } else {
        list[i].checked = false;
      }
    }

    this.setData({
      items: list
    });
  },
  //获取验证码验证
  imageCode: function () {
    this.setData({
      time: Math.random(),
    })
  },
  //获取验证码
  bindblurImageCode: function (event) {
    this.data.imageCode = event.detail.value;
  },
  //校验证码验证并且获取短信验证码
  catchtapImageCode: function () {
    var num = this.data.codeNum;
    if (num == '获取验证码' || num == "重新发送") {
      var that = this;
      wx.request({
        url: 'https://www.ijointoo.com/i9touuat/PtlVCode!applyWithImg.action',
        data: {
          randCode: this.data.imageCode,
          // tel: that.data.tel,
        },
        // dataType:"json",
        //method:'POST',
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          var countdown = 60;
          console.log(res);
          //验证码错误
          if (res.data.result == 9) {
            wx.showToast({
              title: res.data.desc,
              icon: 'success',
              duration: 2000
            })
          }
          //验证码正确
          else if (msg.result == 0) {


          } else if (msg.result == 4) {
            //停止计时器
            window.clearInterval(InterValObj);
            wx.showToast({
              title: "请稍后再试",
              icon: 'success',
              duration: 2000
            })
          }
        },
        fail: function (res) {
          console.log(res.data);
        },
        complete: function (res) {
          that.countDown();
        }

      })

    } else {
      return;
    }

  },
  //开始计时器
  countDown: function () {
    var that = this;
    if (that.data.wait == 0) {
      //禁止使用
      that.setData({
        codeNum: "重新发送"
      })
      that.data.wait = 60;
    } else {
      that.data.wait--;
      that.setData({
        codeNum: that.data.wait,
      });
      setTimeout(
        that.countDown, 1000);
    }
  },
  verCodeSubmit: function (e) {
    console.log(e.detail.value.verCode);

    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/PtlWeixin!regLogindo.action',
      data: {
        //用户电话
        userMobile: this.data.tel,
        //验证方式：验证码登入
        loginFlag: "v_code",
        //短信验证码
        vcode: e.detail.value.verCode,
      },

      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {

      },
      fail: function (res) {

      },

    })
  },
  passwordSubmit: function (e) {
    console.log(e.detail.value.password);

    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/PtlWeixin!regLogindo.action',
      data: {
        //用户电话
        userMobile: this.data.tel,
        //验证方式：密码登入
        loginFlag: "password",
        //密码
        password: e.detail.value.password,
      },

      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {

      },
      fail: function (res) {

      },

    })
  },

})
//获取短信验证码
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=verifyCode
