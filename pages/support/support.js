
Page({
  data: {
    pageNo: 1,
    items: [
      { name: 1, value: '寻求支持', checked: true },
      { name: 2, value: '竞标中', checked: false },
      { name: 0, value: '所有项目', checked: false },

    ],
    //项目集合
    pList: [],

  },
  onLoad: function (options) {
    var that = this;
    that.windowInfo();

    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=tfPrjList',
      data: {
        pageNo: that.data.pageNo,
        uid: 145000001082,
        sts: that.sts(),
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);
        var list = that.data.pList;

        that.setData({
          pList: list.concat(that.dataProcessing(res.data.pList)),
          //项目标签

        });


      },

    });

  },
  sts: function () {
    var that = this;
    var list = that.data.items;
    for (var i = 0; i < list.length; i++) {
      if (list[i].checked) {
        return list[i].name;
      }
    }
  },
  radioChange: function (e) {
    console.log(e)
    var that = this;
    //实现选择判断
    var list = that.data.items;
    for (var i = 0; i < list.length; ++i) {
      if (list[i].name == e.detail.value) {
        list[i].checked = !list[i].checked;
        console.log(list[i].checked);
      } else {
        list[i].checked = false;
      }
    }
    console.log(list)
    that.data.pList.length = 0;
    this.setData({//每次点击重置页数为1 ，items初始化
      pageNo: 1,
      items: list
    });
    that.onLoad();
  },
  //数据处理
  dataProcessing: function (pList) {
    var that = this;
    for (var i = 0; i < pList.length; i++) {
      //标签处理
      if (pList[i].pTag) {
        pList[i].pTag = pList[i].pTag.split(',');
      }
      //时间字段处理
      if (pList[i].cTime) {
        pList[i].cTime = pList[i].cTime.substring(0, 11);
      }
    }
    return pList;
  },
  loadmore: function () {
    var that = this;
    var page = that.data.pageNo + 1;
    that.setData({
      pageNo: page,
    })
    console.log(that.data.pageNo);
    that.onLoad();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();
    //完成刷新弹回窗口
    wx.stopPullDownRefresh();
    //刷新失败回调
  },

  //上拉加载
  onReachBottom: function () {
    var that = this;
    that.loadmore();
  },
  //获取手机信息
  windowInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
        console.log(res.windowHeight);
      },

    })

  },
})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=tfPrjList&pageNo=1&uid=145000001082