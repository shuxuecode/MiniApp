

var WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');
var AppId = 'wxbc6e55a1c09739ad'
var AppSecret = 'a327e497c35bfba091939eac933b10ce'


//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (result) {
          console.log(result);
          console.log(result.code);
          
          //将 code 放入小程序缓存
          wx.setStorageSync('code', result.code)


          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.userInfo = res.userInfo
              that.globalData.userData = res
              // typeof cb == "function" && cb(that.globalData.userInfo)
              typeof cb == "function" && cb(that.globalData.userData)
              
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    userData:null
  }
})