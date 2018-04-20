// pages/my/my.js
Page({
  data: {
    //暂时写死
    uid: 145000001082,
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myInfo',
      data: {
        uid: 145000001082,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        //会员等级 0 普通1 星级2 钻石3 皇冠 9 VIP
        that.usrLevel(res.data.usrLevel);
        //0：未认证 1：认证通过 2：认证申请 9：认证失败
        that.usrLevel(res.data.authFlg);
        that.setData({
          //头像
          logo: res.data.logo,
          //关注人数
          focusNum: res.data.focusNum,
          //粉丝数
          fansNum: res.data.focusNum,
          //我的投资金额
          rInvestAmt: res.data.rInvestAmt,
          //财富增长金额
          rGrowAmt: res.data.rGrowAmt,
        })
      }
    })
  },
  //会员等级判断
  usrLevel: function (authFlg) {
    var that = this;

    switch (authFlg) {

      case '0':
        that.setData({
          authFlg: '../../images/image/notCertified.png'
        })
        break;
      case '1':
        that.setData({
          authFlg: '../../images/image/passAut.png'
        })
        break;
      case '2':
        that.setData({
          authFlg: '../../images/image/inAut.png'
        })
        break;
      case '9':
        that.setData({
          authFlg: '../../images/image/auFailed.png'
        })
        break;

    }
  },
  //会员认证判断
  authFlg: function () {
    switch (usrLevel) {

      case '0':
        that.setData({
          usrLevel: '普通'
        })
        break;
      case '1':

        that.setData({
          usrLevel: '星级'
        })
        break;
      case '2':
        that.setData({
          usrLevel: '钻石'
        })
        break;
      case '3':
        that.setData({
          usrLevel: '皇冠'
        })
    }
  }
})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myInfo