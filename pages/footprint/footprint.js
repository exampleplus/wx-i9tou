// pages/footprint/footprint.js
Page({
  data: {},
  onLoad: function (options) {

    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=prjLog&uid=14J000001081',
      data: {
        finCode: options.prjCode
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);
        var that = this;

      }
    });

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=prjLog&uid=14J000001081&finCode=90003001