// pages/information/information.js
Page({

  data: {
    modhidden: true,
    hidden: true,
    infolist: [],
    pageno: 1,
    classification: '&classification=4',
    radiolist: [{
      value: "创投热点",
      name: "&classification=4",
      open: true,
    }, {
      value: "深度干货",
      name: "&classification=3",
      open: false,
    }, {
      value: "项目资讯",
      name: "&classification=1",
      open: false,
    }, {
      value: "平台资讯",
      name: "&classification=5",
      open: false,
    }, {
      value: "小爱说",
      name: "&classification=0",
      open: false,
    },
    ],
    refreshHeight: 0,//获取屏幕高度
    refreshing: false,//是否在刷新中 
    clientY: 0,//触摸时Y轴坐标 
  },
  radioChange: function (e) {
    console.log(e)
    var that = this;
    that.data.infolist.length = 0;
    that.setData({
      pageno: 1,
      classification: e.detail.value,
    })
    console.log(that.data.pageno);
    that.onLoad();
    //实现选择判断
    var list = that.data.radiolist;
    for (var i = 0; i < list.length; ++i) {
      if (list[i].name == e.detail.value) {
        list[i].open = !list[i].open;
        console.log(list[i].open);
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      radiolist: list
    });
  },
  //页面加载
  onLoad: function (options) {
    var that = this;
    //获取当前屏幕参数
    that.telParameters();
    //访问数据
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=informationQuery&uid=15Q000002541&pageNo=' + that.data.pageno + that.data.classification,
      data: {
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var list = that.data.infolist;
        //判断还有没有数据
        if (res.data.titleLists != null || res.data.titleLists != "" || res.data.titleLists != undefined) {
          that.setData({
            hidden: true,
            infolist: list.concat(res.data.titleLists),

          })

        } else {
          that.setData({
            modhidden: false,
          })

        }
      }

    });

  },
  //加载跟多页面
  loadmore: function () {
    var that = this;
    var num = that.data.pageno + 1;
    that.setData({
      hidden: false,
      pageno: num,
    });
 
    that.onLoad();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();
    //完成刷新弹回窗口
    wx.stopPullDownRefresh(
    );
    //刷新失败回调
  },
  //上拉加载
  onReachBottom: function () {
    var that = this;
    that.loadmore();

  },
  //手机参数
  telParameters: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log('aaaaaaaa'+res.windowWidth);
        //手机宽度取整数
        var windowWidth = Math.round(res.windowWidth);
        var halfWidth = parseInt(res.windowWidth / 5)
        that.setData({
          windowWidth: windowWidth,
          halfWidth: halfWidth,
        })
      }
    })
  }
})