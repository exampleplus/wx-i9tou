// pages/replyList/replyList.js
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
    that.setData({
      name: options.name,
      logo: options.logo,
      date: options.date,
      desc: options.desc,
    })
    that.comment(options);
  },
  //评论
  comment: function (options) {
    var that = this;
   
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=replyList',
      data: {
        //会员编号
        uid: '14J000001081',
        //项目编号
        id: options.id,
        //评论类型
        flg: 1,
        //上级编号
        upNo: options.curNo,
        //所有评论
        rang: 0,
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);

        that.setData({
          rList: res.data.rList,
          pageSize: res.data.pageSize,
        })

      }
    });
  }
})