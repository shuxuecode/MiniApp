//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //  设置请求url
    wx.setStorageSync('baseUrl', 'https://highness.coding.me/HTML/data')

    this.getDD();
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  getDD: function () {

    

    //return false;

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      },
      fail: function (res) {
        console.log("失败了")
        console.log(res)
        // {errMsg: "getLocation:fail auth deny"}
        // wx.getSetting({
        //   success: (res) => {
        //     console.log(res)
        //   }
        // })
        // wx.openSetting({
        //   success: (res) =>{
        //     console.log(res)
        //   }
        // })
      },
      complete: function (res) {
        console.log('complete')
        console.log(res)
      }
    })
  }
})



/*

appId    wxd521b31771fdaeaf

appsecret   ad1a402382d28d03d1d82a53b043ea65





*/