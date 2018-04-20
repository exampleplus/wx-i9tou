
Page({
  data: {
    projectlist: [],
    pageno: 1,
    scrollTop: 100,
    viewHidden: true,
    //关键字查询
    keyWords: '',
    //  项目类型
    prjType: [0, 1, 2, ''],
    inputValue: '',
    //xx图标
    searchPanelShow: false,

    loadTilte: '   加载中...',
  },
  //请求数据
  requestData: function () {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=prjList',
      data: {
        //页数
        pageNo: that.data.pageno,
        //关键字查询
        keyWords: that.data.keyWords,
        //  项目类型 0：即将开始  1：正在进行中（预约和超募）  2：完成（预约结束和融资完成） 
        //prjType:that.data.prjType,
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var list = that.data.projectlist.concat(that.ptagSplit(res.data.prjList));
        
        that.setData({
          projectlist: list,
        
        });
       
      },
      fail: function () {
        wx.showToast({
          title: '请检查网络',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function (res) {
        //隐藏加载
        wx.hideNavigationBarLoading()
      }

    });
  },
  onLoad: function () {
    // 加载
    wx.showNavigationBarLoading()
    var that = this;
    //获取手机数据
    that.systemInfo();
    //请求数据
    that.requestData();
  },
  //加载跟多
  loadmore: function () {
    var that = this;
    var num = that.data.pageno + 1;
    that.setData({
      pageno: num,
    });
    that.requestData();
  },
  //数据处理
  ptagSplit: function (ptag) {
    var that = this;

    var list;
    for (var i = 0; i < ptag.length; i++) {
      if (ptag[i].specs) {
        list = ptag[i].specs.split(',');
        ptag[i].specs = list;
      }
      if (ptag[i].leadUserName) {
        if (ptag[i].leadUserName == null || ptag[i].leadUserName == '' || ptag[i].leadUserName == undefined) {
          ptag[i].leadUserName = '————';
        }

      } else {
        ptag[i].leadUserName = '————';
      }
    }
    return ptag;
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: 'pages/project/project'
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();
    //完成刷新弹回窗口
    // wx.stopPullDownRefresh(
    //   wx.showToast({
    //     title: '刷新成功',
    //     duration: 1300,
    //     complete: wx.hideToast()

    //   })
    // );
    wx.stopPullDownRefresh();

  },
  //上拉加载，当滚动条滚动到最底部时触发上拉加载事件:onReaachBottom
  onReachBottom: function () {
    var that = this; 
    that.loadmore();
    wx.showNavigationBarLoading();
  },
  //获取手机基本信息
  systemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
  },

  // 输入框获取焦点的时候
  onBindFocus: function (event) {
    var that = this;
    this.setData({
      searchPanelShow: true
    })
  },
  //失去框获取焦点的时候
  bindblur: function () {
    this.setData({
      //是否显示x图片&是否显示搜索内容
      searchPanelShow: false
    })
  },
  //在输入时候
  bindinput: function (event) {
    var that = this;
    that.data.keyWords = event.detail.value;
    //清空数据
    that.data.projectlist = [];
    that.onLoad();
  },
  // x图片点击事件
  onCancelImgTap: function (event) {
    var that = this;
    that.setData({
      //是否显示x图片&是否显示搜索内容
      searchPanelShow: false,
      //清空输入框内容
      inputValue: ''
    })
    //清空数据
    that.data.projectlist = [];
    that.data.keyWords = '';
    that.onLoad();
  },
  // 点击完成（回车）按钮时触发
  onBindConfirm: function (event) {
    var that = this;
    that.data.keyWords = event.detail.value;
    //清空数据
    that.data.projectlist = [];
    that.onLoad();
  },
})
// https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=prjList&pageNo=1