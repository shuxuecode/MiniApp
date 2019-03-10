// miniprogram/pages/album/index.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumList: [],
    albumHeight: '',
    albumWidth: '',
    imgHeight: ''
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
    console.log(wx.cloud)
    console.info(util.getCurDate())
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        console.log("屏幕宽度为：" + windowWidth);

        windowWidth = windowWidth - 10 * 4;
        console.log("去掉padding后的屏幕宽度为：" + windowWidth);

        var albumWidth = windowWidth / 2;
        console.log("图片宽度为：" + albumWidth);

        that.setData({
          albumWidth: 'width: ' + albumWidth + 'px',
          imgHeight: 'height: ' + albumWidth + 'px'
        });
      }
    })


    that.loadData()




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

  loadData: function() {
    let that = this;

    const db = wx.cloud.database()

    db.collection('album')
      .orderBy('createtime', 'desc')
      .get({
        success(res) {
          console.info(1)
          console.log(res.data)

          that.setData({
            albumList: res.data
          })
        }
      })

  },

  createAlbum: function() {
    let that = this;

    var uuid = util.getuid();

    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // 所选的图片的尺寸
      sourceType: ['album', 'camera'], // 选择图片的来源
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)

        var filePath = res.tempFilePaths[0];

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
          filePath: filePath,
          // 成功回调
          success: res => {
            wx.hideLoading()
            console.log('上传成功', res)
            // console.log('上传成功', res.statusCode)
            console.log('上传成功', res.fileID)

            that.save(res.fileID)
            // that.setData({
            //   picture: res.fileID,
            //   pictureTip: res.fileID
            // })

          },
          fail: res => {
            wx.hideLoading()
          }
        })









      }
    })




  },

  save: function(fileID) {

    let createtime = new Date().getTime();

    wx.showLoading({
      title: '正在保存',
      mask: true
    })

    this.addAlbum(fileID, createtime);

  },

  /**保存相册 */
  addAlbum: function (fileID, createtime){
    let that = this;
    
    const db = wx.cloud.database()

    let name = util.getCurDate();

    db.collection('album').add({
      data: {
        name: name,
        cover: fileID,
        total: 1,
        createtime: createtime
      },
      success(res) {
        console.log(res)
        console.log(res._id)

        // 保存图片
        that.addPhoto(fileID, createtime, res._id);
      },
      fail: console.error
    })
  },

  addPhoto: function (fileID, createtime, albumId) {
    let that = this;

    const db = wx.cloud.database()
    db.collection('photo').add({
      data: {
        url: fileID,
        createtime: createtime
      },
      success(res) {
        console.log(res)
        console.log(res._id)

        // 保存相册和图片的关系
        that.addAlbumPhotoLink(createtime, albumId, res._id)

      },
      fail: console.error
    })
  },

  addAlbumPhotoLink: function (createtime, albumId, photoId) {
    let that = this;

    let list = new Array();
    list.push(photoId);

    const db = wx.cloud.database()
    db.collection('album_photo_link').add({
      data: {
        album: albumId,
        list: list,
        createtime: createtime
      },
      success(res) {
        wx.hideLoading();

        console.log(res)
        console.log(res._id)

        that.loadData()

        wx.showModal({
          title: '提示',
          content: '保存成功',
          showCancel: false
        })

      },
      fail: console.error
    })

  },


  gotoPhoto: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../photo/index?id=' + id
    })
  }
})