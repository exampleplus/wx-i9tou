// pages/messageCenter/messageCenter.js
Page({
  data: {},
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=publish',
      data: {
        uid: options.uid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
       
        that.setData({
         
        })
      }
    })
  },

})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=publish