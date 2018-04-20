// pages/myProject/myProject.js
Page({
  data: {
    items: [
      { name: 'fromTheProject', value: '预约的项目', checked: true },
      { name: 'investmentProjects', value: '投资的项目', checked: false },

    ]
  },
  onLoad: function (options) {
    //获取手机参数
    this.telParameters();
    //流量节省未判断
    var that = this;
    //获取预约的项目
    this.fromTheProject(options);
    //获取投资的项目
    this.investmentProjects(options);
  },
  //预约的项目接口
  fromTheProject: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myPrj&uid=15J000003261&prjType=0&pageNo=1',
      data: {
        uid: options.uid,
        //申请投资
        prjType: 2,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        that.setData({
          fromTheProject: res.data.prjList,
        })

      }
    })
  },
  //投资的项目
  investmentProjects: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myPrj&uid=15J000003261&prjType=0&pageNo=1',
      data: {
        uid: options.uid,
        //投资
        prjType: 0,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({

          investmentProjects: res.data.prjList,

        })

      }
    })
  },
  //顶部导航栏
  radioChange: function (e) {
    var that = this;
    var list = that.data.items;
    for (var i = 0; i < list.length; ++i) {
      if (list[i].name == e.detail.value) {
        list[i].checked = !list[i].checked;
      } else {
        list[i].checked = false;
      }
    }
    this.setData({
      items: list
    });
  },
  //手机参数
  telParameters: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        //手机宽度取整数
        var windowWidth = Math.round(res.windowWidth);
        var halfWidth = parseInt(res.windowWidth / 2)
        that.setData({
          windowWidth: windowWidth,
          halfWidth: halfWidth,
        })
      }
    })
  }
})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=myPrj&uid=15J000003261&prjType=0&pageNo=1