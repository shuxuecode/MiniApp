// miniprogram/pages/form/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: app.globalData.theme,

    userName: "",
    mobile: "",
    remark: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mobile = options.mobile
    console.info(mobile)
    if (mobile) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      const db = wx.cloud.database()

      db.collection('users').where({
        mobile: mobile
      }).get().then(res => {
        wx.hideLoading()
        console.info(res.data)
        if (res.data.length != 0) {
          var userData = res.data[0]

          this.setData({
            userName: userData.userName,
            mobile: userData.mobile,
            remark: userData.remark
          })
        }
      })
    }

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

  // ====

  formSubmit: function (e) {

    console.info(e.detail.value)

    var data = e.detail.value



    const db = wx.cloud.database()

    db.collection('users').where({
      mobile: data.mobile
    }).get().then(res => {
      console.info(res)
      console.info(res.data)

      if (res.data.length == 0) {

        console.info("数据不存在，新增")
        db.collection('users').add({
          // data 字段表示需新增的 JSON 数据
          data: data
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: '新增成功',
          })
        })

      } else {
        console.info("数据存在，更新操作")

        var oldData = res.data[0]
        // oldData.userName = data.userName
        // oldData.mobile = data.mobile
        // oldData.remark = data.remark

        db.collection('users').doc(oldData._id).update({
          data: data,
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

  },

  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})