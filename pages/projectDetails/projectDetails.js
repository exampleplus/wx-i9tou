// pages/projectDetails/projectDetails.js
Page({
  data: {
  },
  onLoad: function (options) {
    var that = this;
    //访问数据
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=prjDtl&uid=14J000001081',

      data: {
        prjCode: options.prjCode,
        pageNo: 1,
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log( res);
        that.setData({
        
          //融资编号
          prjCode: res.data.prjCode,
          //图文介绍
          finFeatureList: res.data.finFeatureList,
          //图片
          compMedUri: res.data.compMedUri,
          //融资标题
          finTitle: res.data.finTitle,
          //融资进度
          finPercent: res.data.finPercent,
          //已认投金额
          investAmt: res.data.investAmt,
          //融资金额
          finAmt: res.data.finAmt,
          //企业估值
          compAss: res.data.compAss,
          //跟投起始金额
          followStartAmt: res.data.followStartAmt,
          //已领投人数
          realLeadNum: res.data.realLeadNum,
        })


      }
    });

  },

})
