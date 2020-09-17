// miniprogram/pages/image/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    imageUrl4: ''



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;

    wx.showLoading({
      title: '加载中',
      mask: true
    })

    const db = wx.cloud.database()
    const _ = db.command

    db.collection('image').where({
      type: _.in(["1", "2", "3", "4"])
    }).get().then(res => {
      wx.hideLoading()
      console.info(res.data)

      for(var i=0,len=res.data.length; i<len; i++){
        var type = res.data[i].type
        var url = res.data[i].url
 
        if (type == 1) {
          _this.setData({
            imageUrl1: url
          })
        } else if (type == 2) {
          _this.setData({
            imageUrl2: url
          })
        } else if (type == 3) {
          _this.setData({
            imageUrl3: url
          })
        } else if (type == 4) {
          _this.setData({
            imageUrl4: url
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  //
  uploadImage: function (event) {
    let _this = this;
    console.info(event)
    console.info(event.currentTarget.dataset.num)

    var num = event.currentTarget.dataset.num

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
          mask: true
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'image' + num + '' + filePath.match(/\.[^.]+?$/)[0]

        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            // app.globalData.fileID = res.fileID
            _this.save(num, res.fileID)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  save: function (num, fileID) {
    if (num == 1) {
      this.setData({
        imageUrl1: fileID
      })
    } else if (num == 2) {
      this.setData({
        imageUrl2: fileID
      })
    } else if (num == 3) {
      this.setData({
        imageUrl3: fileID
      })
    } else if (num == 4) {
      this.setData({
        imageUrl4: fileID
      })
    }

    const db = wx.cloud.database()

    db.collection('image').where({
      type: num
    }).get().then(res => {
      console.info(res)
      console.info(res.data)

      if (res.data.length == 0) {
        console.info("数据不存在，新增")
        db.collection('image').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            type: num,
            url: fileID
          }
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: '新增成功',
          })
        })

      } else {
        console.info("数据存在，更新操作")

        var oldData = res.data[0]
        db.collection('image').doc(oldData._id).update({
          data: {
            url: fileID
          },
          success: function (res) {
            console.log(res)
            console.log(res.stats)
            wx.showToast({
              title: '更新成功',
            })

          }
        })
      }

    })



  }
})