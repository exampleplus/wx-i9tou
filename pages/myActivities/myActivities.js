// pages/myActivities/myActivities.js
Page({
  data: {
    items: [
      { name: 'raiseAct', value: '预约活动', checked: true },
      { name: 'otherAct', value: '其他活动', checked: false },

    ]
  },
  onLoad: function (options) {
    //获取手机参数
    this.telParameters();
    //获取预约活动项目
    this.raiseAct(options);
    //获取其他活动项目
    this.otherAct(options);

  },
  //预约活动
  raiseAct: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myAct&pageNo=1',
      data: {
        //会员编号
        uid: options.uid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var actList = res.data.actList;
        for (var i = 0; i < actList.length; i++) {

          if (actList[i].payFlg == '0') {
            //需付款
            actList[i].payFlg = '立即支付';
          } else if (actList[i].payFlg == '1') {

            //已付款
            actList[i].payFlg = '已支付';
          } else {
            //重新付款
            actList[i].payFlg = '重新支付';
          }
        };
        that.setData({
          raiseAct: actList,
        })

      }
    })
  },
  //其他活动
  otherAct: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myAct&uid=15J000003261&pageNo=1',
      data: {
        //会员编号
        uid: options.uid,
        //活动类型
        actType: 1,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var actList = res.data.actList;
        for (var i = 0; i < actList.length; i++) {

          if (actList[i].payFlg == '0') {
            //需付款
            actList[i].payFlg = '立即支付';
          } else if (actList[i].payFlg == '1') {

            //已付款
            actList[i].payFlg = '已支付';
          } else {
            //重新付款
            actList[i].payFlg = '重新支付';
          }
        };
        that.setData({
          otherAct: actList,
        })

      }
    })
  },
  //顶部导航栏
  radioChange: function (e) {
    var that = this;
    var list = that.data.items;
    for (var i = 0; i < list.length; ++i) {
      if (list[i].name == e.detail.value) {
        list[i].checked = !list[i].checked;
      } else {
        list[i].checked = false;
      }
    }
    this.setData({
      items: list
    });
  },
  //手机参数
  telParameters: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        //手机宽度取整数
        var windowWidth = Math.round(res.windowWidth);
        var halfWidth = parseInt(res.windowWidth / 2)
        that.setData({
          windowWidth: windowWidth,
          halfWidth: halfWidth,
        })
      }
    })
  }
})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myAct&uid=15J000003261&pageNo=1