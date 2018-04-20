// pages/followPrj/followPrj.js
Page({
  data: {},
  onLoad: function (options) {
    this.prjList(options);
  },
  //我关注的项目
  prjList: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myPrj&uid=15J000003261&prjType=0&pageNo=1',
      data: {
        uid: options.uid,
        //关注
        prjType: 1,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          prjList: res.data.prjList,
        })

      }
    })
  }
})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myPrj&uid=15J000003261&prjType=0&pageNo=1
//prjType:1