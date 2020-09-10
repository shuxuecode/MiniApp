// miniprogram/pages/userInfo/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ''
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

    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log("result = ", res.result)
        console.log('[云函数] [login] user openid: ', res.result.openid)
        console.log("opneid = ", res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })


    // 获取用户名称
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.info("获取用户信息")
          wx.getUserInfo({
            success: res => {
              console.info("获取用户信息", res)
              // this.setData({
              //   avatarUrl: res.userInfo.avatarUrl,
              //   userInfo: res.userInfo
              // })
            }
          })
        }else{
          // wx.showToast({
          //   title: '请登录',
          // })

          // wx.showModal({
          //   title: "请登录"
          // })

          // wx.getSetting({
          //   success (res) {
          //     console.log(res)
          //     // res.authSetting = {
          //     //   "scope.userInfo": true,
          //     //   "scope.userLocation": true
          //     // }
          //   }
          // })
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

  // **********************
  // 自定义函数
  // **********************

  submit: function(e){
    console.info(e.detail.value)

    var data = e.detail.value

    const db = wx.cloud.database()

    db.collection('userInfo').where({
      _openid: "{openid}"
    }).get({
      success: function(res){
        console.info(res.data)

        if(res.data){
          
          var old = res.data[0]
          console.info(old)

          old['input'] = data.input

          // db.collection('userInfo').doc(old._id).get().then(res => {
          //   console.info(res.data)
          // })

          // db.collection('userInfo').doc(old._id).update({
          //   data: {
          //     input: "122111"
          //   },
          //   success: function(res){
          //     console.log(res)
          //   }
          // })

          db.collection('userInfo').doc(old._id).update({
            data: data,
            success: function(res){
              console.log(res)
              console.log(res.stats)

            }
          })
        }


      }
    })

    // db.collection('userInfo').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: data
    // })
    // .then(res => {
    //   console.log(res)
    // })


  },

  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  }
})