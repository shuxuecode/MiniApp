//app.js
App({
  onLaunch: function () {
    
    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     traceUser: true,
    //   })
    // }

    this.globalData = {}



    // 在调用云开发各 API 前，需先调用初始化方法 init 一次（全局只需一次）
    wx.cloud.init({
      env: 'env-image-fc1e7b'
    })
  }
})
