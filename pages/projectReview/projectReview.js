// pages/projectReview/projectReview.js
Page({
  data: {
    id: null,
    content: '',
    fixed:true,
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=replyList',
      data: {
        //会员编号
        uid: '14J000001081',
        //项目编号
        id: options.ppCode,
        //评论类型
        flg: 0,
        //所有评论
        rang: 0,
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);
        that.data.id = res.data.id,
          that.setData({
            rList: res.data.rList,
            pageSize: res.data.pageSize,

          })

      }
    });
  },
  //回复
  reply: function () {
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=crtLogRply',
      data: {
        //会员编号
        uid: '14J000001081',
        //手记编号
        id: id,
        //回复内容
        content: that.data.content,

      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {

      }
    });
  },

  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
  }
})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=replyList