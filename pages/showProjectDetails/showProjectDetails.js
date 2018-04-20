// pages/showProjectDetails/showProjectDetails.js
Page({
  data:{},
  onLoad:function(options){
    console.log( options.prjCode);
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=prjLog',
      data: {
        //会员编号
        uid: '14J000001081',
        //项目编号
        prjCode: options.prjCode,

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
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=investQry&prjCode=0127204&uid=14J000001081