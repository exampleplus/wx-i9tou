
Page({
  data: {
    //切换语音和键盘输入
    useKeyboardFlag: true,
    //显示 照片、拍照
    sendMoreMsgFlag: false,
    // 照片、拍照数组
    chooseFiles: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  //切换语音和键盘输入
  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },


  // 获取用户输入
  bindCommentInput: function (event) {
    var val = event.detail.value;
    console.log(val);
  },


  // 提交用户评论
  submitComment: function (event) {
    console.log(event.detail.value);
    //显示操作结果
    this.showCommitSuccessToast();
    //恢复初始状态
    this.resetAllDefaultStatus();
  },
  //评论成功
  showCommitSuccessToast: function () {
    //显示操作结果
    wx.showToast({
      title: "评论成功",
      duration: 1000,
      icon: "success"
    })
  },
  //将所有相关的按钮状态，输入状态都回到初始化状态
  resetAllDefaultStatus: function () {
    this.setData({
      //清空评论框
      keyboardInputValue: '',
      //清空照片/图片
      chooseFiles: [],
      //关闭 照片、拍照
      sendMoreMsgFlag: false
    });
  },
  //显示 选择照片、拍照等按钮
  sendMoreMsg: function () {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },



  //选择本地照片与拍照
  chooseImage: function (event) {
    // 进行拍照上传图片数量进行限制
    var imgArr = this.data.chooseFiles;
    //只能上传3张照片，包括拍照
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      //弹出提示框
      return;
    }
    //取出绑定组件的自定义属性
    var sourceType = [event.currentTarget.dataset.category];
    var that = this;
    console.log(leftCount)
    // 从本地相册选择图片或使用相机拍照
    wx.chooseImage({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        // 可以分次选择图片，但总数不能超过3张
        console.log(res)
        that.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)
        });
      }
    })
  },


  //删除已经选择的图片
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx,
      that = this;
    that.setData({
      deleteIndex: index
    });
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function () {
      that.setData({
        deleteIndex: -1,
        chooseFiles: that.data.chooseFiles
      });
    }, 500)
  },

  //开始录音
  recordStart: function () {
    var that = this;
    // 改变按钮样式
    this.setData({
      recodingClass: 'recoding'
    });
    this.startTime = new Date();
    wx.startRecord({
      success: function (res) {
        console.log('success');
        var diff = (that.endTime - that.startTime) / 1000;

        //对浮点数向上取整
        diff = Math.ceil(diff);

        //发送录音
        that.submitVoiceComment({
          //文件路径
          url: res.tempFilePath,
          // 文件时间
          timeLen: diff
        });
      },
      fail: function (res) {
        console.log('fail');
        console.log(res);
      },
      complete: function (res) {
        console.log('complete');
        console.log(res);
      }
    });
  },

  //结束录音
  recordEnd: function () {
    // 回复按钮样式
    this.setData({
      recodingClass: ''
    });
    this.endTime = new Date();
    wx.stopRecord();
  },

  //提交录音 
  submitVoiceComment: function (audio) {
    //显示操作结果
    this.showCommitSuccessToast();
  },

  playAudio: function (event) {
    var url = event.currentTarget.dataset.url,
      that = this;

    //暂停当前录音
    if (url == this.data.currentAudio) {
      wx.pauseVoice();
      this.data.currentAudio = ''
    }

    //播放录音
    else {
      this.data.currentAudio = url;
      wx.playVoice({
        filePath: url,
        complete: function () {
          //只有当录音播放完后才会执行
          that.data.currentAudio = '';
          console.log('complete')
        },
        success: function () {
          console.log('success')
        },
        fail: function () {
          console.log('fail')
        }
      });
    }
  }

})