// miniprogram/pages/datetime/index.js

let weeks = new Array("日", "一", "二", "三", "四", "五", "六", "日");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
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

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },


  cala: function(year, mon, day, num){
    let ttt = new Date(year, mon - 1, day).getTime() + num * 24000 * 3600;

    let theday = new Date();

    theday.setTime(ttt);

    var res = theday.getFullYear() + "年" + (theday.getMonth() + 1) + "月" + theday.getDate() + "日" + " 星期" + weeks[theday.getDay()]

    console.log(res)
  }


})