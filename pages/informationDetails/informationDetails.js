// pages/informationDetails/informationDetails.js
Page({
  data: {},
  onLoad: function (options) {
    console.log(options);
    console.log("des:" + options.webUrl);
    var that = this;
    that.setData({
      url: options.webUrl
    })
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