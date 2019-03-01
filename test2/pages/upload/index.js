// pages/upload/index.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    author: "",
    summary: "",
    picture: "",
    pictureTip: "暂无图片",
    url: "",
    urlTip: "暂无音频",
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.info(util.getuid())
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // **************************************
  // ************ 自定义方法 ***************
  // **************************************

  
  uploadImage: function() {
    let that = this;

    var uuid = util.getuid();

    // 让用户选择一张图片
    wx.chooseImage({
      success: chooseResult => {

        // console.log(chooseResult);

        var filePath = chooseResult.tempFilePaths[0];

        var index1 = filePath.lastIndexOf(".");
        var index2 = filePath.length;
        var suffix = filePath.substring(index1 + 1, index2); //后缀名

        // console.log(suffix)

        var tempName = uuid + '.' + suffix;

        wx.showLoading({
          title: '上传中',
          mask: true
        })

        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: tempName,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            wx.hideLoading()
            // console.log('上传成功', res)
            // console.log('上传成功', res.statusCode)
            console.log('上传成功', res.fileID)

            that.setData({
              picture: res.fileID,
              pictureTip: res.fileID
            })

            // cloud://env-675567.656e-env-675567-1258728439/4ce61472-2d46-b87a-8a51-0217f5eeb106.gif
          },
          fail: res =>{
            wx.hideLoading()
          }
        })
      },
    })

  },

  choiceMp3: function() {
    let that = this;




    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['mp3'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFiles = res.tempFiles;
        console.log(tempFiles)
        console.log(tempFiles[0])
        console.log(tempFiles[0].path)

        let mp3Name = util.getuid() + '.mp3'; 

        wx.showLoading({
          title: '上传中',
          mask: true
        })

        wx.cloud.uploadFile({
          cloudPath: mp3Name,
          filePath: tempFiles[0].path, // 文件路径
          success: res => {
            wx.hideLoading();
            // get resource ID
            console.log(res)

            that.setData({
              url: res.fileID,
              urlTip: res.fileID
            })
          },
          fail: err => {
            wx.hideLoading();
            // handle error
          }
        })
        

      }
    })


  },

  save: function(){
    // this.data.title;
    let title = this.data.title;       

    console.log(title)

    let author = this.data.author;
    let summary = this.data.summary;
    let picture = this.data.picture;
    let url = this.data.url;
    let content = this.data.content;

    let createtime = new Date().getTime();


    wx.showLoading({
      title: '正在保存',
      mask: true
    })

    const db = wx.cloud.database()
    db.collection('dataList').add({
      data:{
        // _id: util.getuid(),
        title: title,
        author: author,
        summary: summary,
        picture: picture,
        url: url,
        content: content,
        like: 0,
        star: 0,
        createtime: createtime
      },
      success(res){
        wx.hideLoading();
        console.log(res)

        wx.showModal({
          title: '提示',
          content: '保存成功',
          showCancel: false
        })
      },
      fail: console.error
    })

    



  },

// 解决iview组件里无法直接获取input内容的问题
  titleInput: function (event) { this.setData({ title: event.detail.detail.value})},
  authorInput: function (event) { this.setData({ author: event.detail.detail.value }) },
  summaryInput: function (event) { this.setData({ summary: event.detail.detail.value }) },
  contentInput: function (event) { this.setData({ content: event.detail.detail.value }) },

  guid: function() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
})