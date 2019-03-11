// miniprogram/pages/photo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      success: function (res) {
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

  loadPhoto: function (albumId){
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

          that.getPhoto(res.data[0].list)

          // that.setData({
          //   albumList: res.data
          // })
        }
      })
  },


  getPhoto: function(idList){
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
          console.log(res.data)
          // console.log(res.data[0])
          // console.log(res.data[0].list)

          that.setData({
            list: res.data
          })
        }
      })
  },

  showPhoto: function(e){
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      // current: '', // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }
})