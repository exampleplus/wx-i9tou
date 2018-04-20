// pages/feedbackRecord/feedbackRecord.js
Page({
  data: {},
  onLoad: function (options) {
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=feeBackQry',
      data: {
        pageNo: 1,
        uid: 145000001082,
        type:2,
        //0--创业者 1--投资行家
        qryType:0,

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

})
//'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=feeBackQry&pageNo=1