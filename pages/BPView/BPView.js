// pages/BPView/BPView.js
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
    that.down(options);
  },
  down: function (options) {
    wx.downloadFile({
      url: 'https://www.ijointoo.com/i9touuat/'+options.bpUrl,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },

})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=tfBPView