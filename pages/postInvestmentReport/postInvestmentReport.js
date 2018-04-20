// pages/postInvestmentReport/postInvestmentReport.js
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myRpt&pageNo=1',
      data: {
        uid: options.uid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('aaaaaaaaaaaaaaa');
        console.log(res);
        that.setData({
         
        })

      }
    })
  },

})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myAct&uid=14J000001081&pageNo=1