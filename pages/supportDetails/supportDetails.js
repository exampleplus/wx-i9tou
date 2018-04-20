// pages/supportDetails/supportDetails.js
Page({
  data: {
    items: [
      { name: 'entrepreneurialStory', value: '创业故事', checked: true },
      { name: 'helpingTarget', value: '助创目标', checked: false },
      { name: 'helpingToReturn', value: '助创回报', checked: false },

    ],
    ptagSplit: []
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=tfPrjQry',
      data: {
        pageNo: 1,
        uid: 145000001082,
        ppCode: options.ppCode,
        type: 1,
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);
        //获取视频路径
        that.isVideoUrl(res.data.vUrl);
        that.setData({

          //项目编号
          ppCode: res.data.ppCode,
          //图片
          image: res.data.image,
          //项目名称
          pName: res.data.pName,
          //分类
          industry: res.data.industry,
          fStage: res.data.fStage,
          //已打赏
          fAmt: res.data.fAmt,
          //打赏目标
          tAmt: res.data.tAmt,
          //项目标签
          pTag: that.ptagSplit(res.data.pTag),
          //竞标人数
          goodNum: res.data.goodNum,
          //创业故事
          featureList: res.data.featureList,
          //项目描述
          pDesc: res.data.pDesc,
          //
          priceName: res.data.priceName,
          cfDesc: res.data.cfDesc,
          rtnNum: res.data.rtnNum,
          rscDesc: res.data.rscDesc,
          goodNum: res.data.goodNum,
          //top
          iRank: res.data.iRank,
          //评论数量
          replyNum: res.data.replyNum,
          //反馈数量
          fBackNum: res.data.fBackNum,
          //bp接口
          bpUrl: res.data.bpUrl,
        });

        console.log("aaa" + res.data.vUrl);
      },

    });
    that.imageDo();
  },
  ptagSplit: function (ptag) {
    var that = this;
    var list;
    list = ptag.split(',');
    return list;
  },
  radioChange: function (e) {

    var that = this;
    var list = that.data.items;
    console.log(list);
    for (var i = 0; i < list.length; i++) {
      console.log(e.detail.value);
      if (list[i].name == e.detail.value) {
        list[i].checked = !list[i].checked;
        console.log(list[i].checked);
      } else {
        list[i].checked = false;
      }
    }
    that.setData({
      items: list,
    })
  },
  //图片适配处理
  imageDo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {

        console.log(res.windowWidth)
        if (res.windowWidth > 24) {
          that.setData({
            windowWidth: res.windowWidth,
          })
        }
        else {
          that.setData({
            windowWidth: 24,
          })
        }

      }

    })
  },
  //是否有视频文件
  isVideoUrl: function (Url) {
    var that = this;
    if (Url == undefined || Url == "" || Url == null) {
      that.setData({
        //视频路径
        vUrl: null,
      })
    } else {
      that.setData({
        //视频路径
        vUrl: Url,
      })
    }
  }
})
//https://www.ijointoo.com/i9touuat/Mobile.action?appCode=test01&method=tfPrjQry&uid=145000001082&ppCode=PP2016120810074297769&type=1