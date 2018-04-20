// pages/myWealth/myWealth.js
Page({
  data: {},
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myWealth',
      data: {
        uid: options.uid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
         realAmt:res.data.realAmt,
          growAmt:res.data.growAmt,
        })

      }
    })
  },

})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method= myWealth