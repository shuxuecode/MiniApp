// miniprogram/pages/demo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

    const db = wx.cloud.database({
      env: "test-454v5"
    })

    console.info(db)
    console.info(db.collection("user"))



    db.collection('user')
    // .where({limit:20})
    .get({
      success: function(res){
        console.info(res)
      }
    })

    db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: "learn cloud database",
        openid2: new Date("2018-09-01"),
        done: false
      }
    })
    .then(res => {
      console.log(res)
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

  }
})