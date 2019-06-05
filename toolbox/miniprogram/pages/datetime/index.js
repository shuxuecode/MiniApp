// miniprogram/pages/datetime/index.js

let weeks = new Array("日", "一", "二", "三", "四", "五", "六", "日");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    value: "0",
    res:''
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
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate()

    console.log(year);
    console.log(month);
    console.log(day);

    let time = year + '-';
    if(month < 10){
      time+='0'
    }
    time += '' + month + '-'

    if(day < 10){
      time += '0'
    }
    time += '' + day + ''

    console.info(time)

    this.setData({
      date: time
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

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindKeyInput: function(e){
    // console.log(e)
    // e.detail.value
    this.setData({
      value: e.detail.value
    })

  },

  cala: function () {
    
    let ttt = new Date(this.data.date).getTime() + this.data.value * 24000 * 3600;

    let theday = new Date();

    theday.setTime(ttt);

    var res = theday.getFullYear() + "年" + (theday.getMonth() + 1) + "月" + theday.getDate() + "日" + " 星期" + weeks[theday.getDay()]

    console.log(res)
    this.setData({
      res: res
    })
  },

  cala2: function(year, mon, day, num){
    let ttt = new Date(year, mon - 1, day).getTime() + num * 24000 * 3600;

    let theday = new Date();

    theday.setTime(ttt);

    var res = theday.getFullYear() + "年" + (theday.getMonth() + 1) + "月" + theday.getDate() + "日" + " 星期" + weeks[theday.getDay()]

    console.log(res)
  }


})