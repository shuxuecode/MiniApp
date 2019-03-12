// miniprogram/pages/photo/index.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumId: '',
    linkId: '',
    photoIdList: [],
    list: [],
    imgWidth: '',
    imgHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info(options.id)
    this.loadPhoto(options.id)
    this.setData({
      albumId: options.id
    })
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
    let that = this;

    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        console.log("屏幕宽度为：" + windowWidth);

        windowWidth = windowWidth - 3 * 6;
        console.log("去掉padding后的屏幕宽度为：" + windowWidth);

        var imgWidth = windowWidth / 3;
        console.log("图片宽度为：" + imgWidth);

        that.setData({
          imgWidth: 'width: ' + imgWidth + 'px',
          imgHeight: 'height: ' + imgWidth + 'px'
        });
      }
    })




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

  loadPhoto: function(albumId) {
    let that = this;
    const db = wx.cloud.database()

    db.collection('album_photo_link')
      .where({
        album: albumId
      })
      .get({
        success(res) {
          console.log(res.data)
          console.log(res.data[0])

          console.log(res.data[0].list)

          // photoIdList

          that.getPhoto(res.data[0].list)

          that.setData({
            linkId: res.data[0]._id,
            photoIdList: res.data[0].list
          })
        }
      })
  },


  getPhoto: function(idList) {
    let that = this;
    const db = wx.cloud.database({
      env: 'env-image-fc1e7b'
    })

    db.collection('photo')
      .where({
        _id: db.command.in(idList)
      })
      .orderBy('createtime', 'desc')
      .get({
        success(res) {
          // console.log(res.data)
          // console.log(res.data[0])
          // console.log(res.data[0].list)

          that.setData({
            list: res.data
          })
        }
      })
  },

  showPhoto: function(e) {
    let that = this;
    var url = e.currentTarget.dataset.url;

    var urls = new Array();

    const list = that.data.list;
    for (let obj of list) {
      // console.log(obj.url)
      urls.push(obj.url)
    }


    console.info(urls)

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },


  uploadPhoto: function() {
    let that = this;

    var uuid = util.getuid();

    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // 所选的图片的尺寸
      sourceType: ['album', 'camera'], // 选择图片的来源
      success(res) {
        var filePath = res.tempFilePaths[0];

        var index1 = filePath.lastIndexOf(".");
        var index2 = filePath.length;
        var suffix = filePath.substring(index1 + 1, index2); //后缀名

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

    this.addPhoto(fileID, createtime);
  },


  addPhoto: function(fileID, createtime) {
    let that = this;

    const db = wx.cloud.database()
    db.collection('photo')
      .add({
        data: {
          url: fileID,
          createtime: createtime
        },
        success(res) {
          console.log(res)
          console.log(res._id)

          // 保存相册和图片的关系
          that.addAlbumPhotoLink(createtime, res._id)

        },
        fail: console.error
      })
  },

  addAlbumPhotoLink: function(createtime, photoId) {
    let that = this;

    let list = this.data.photoIdList
    list.unshift(photoId)

    let size = list.length

    let albumId = this.data.albumId
    let id = this.data.linkId

    const db = wx.cloud.database()
    db.collection('album_photo_link').doc(id)
      .update({
        data: {
          album: albumId,
          list: list,
          createtime: createtime
        },
        success(res) {
          wx.hideLoading();

          console.log(res)

          that.loadPhoto(albumId)
          

          wx.showModal({
            title: '提示',
            content: '保存成功',
            showCancel: false
          })

          // 更新相册的照片张数
          that.updateAlbum(albumId, size)

        },
        fail: console.error
      })

  },

  updateAlbum: function (albumId, photoSize){
    let that = this;

    const db = wx.cloud.database()
    db.collection('album').doc(albumId)
      .update({
        data: {
          total: photoSize
        },
        success(res) {
          console.log(res)
        },
        fail: console.error
      })

  }
})