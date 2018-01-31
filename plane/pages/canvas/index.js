// pages/canvas/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 100,
    height: 100,
    y1: 0,
    y2: 0,
    time: 1
  },

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  zhao: function () {
    console.log(1)
    var context = wx.createCanvasContext('firstCanvas')
    console.log(context)

    // 480  852
    // context.drawImage('../../img/background.png', 0, 0, 375, 603)

    context.drawImage('../../img/background.png', 0, 0, this.data.width, this.data.height)
    context.draw()


    // wx.chooseImage({
    //   success: function (res) {
    //     context.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
    //     context.draw()
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res)
        that.setData({
          width: res.windowWidth - 2,
          height: res.windowHeight - 2
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('firstCanvas')

    context.setStrokeStyle("#00ff00")
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    // context.draw()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.y1 = -this.data.height;
    this.gameGo();

  },

  gameGo: function () {
    const that = this;
    // console.table([["John", "Smith"]])
    console.log(new Date())
    var context = wx.createCanvasContext('firstCanvas')

    console.log(this.data)

    context.drawImage('../../img/background.png', 0, this.data.y1, this.data.width, this.data.height);//第一张图片
    context.drawImage('../../img/background.png', 0, this.data.y2, this.data.width, this.data.height);//第二张图片


    context.draw()

    this.data.time++;
    if (this.data.time % 3 == 0) {//控制背景图片height值的增加
      this.data.y1++;//图片运动下一帧
      this.data.y2++;
      //图片移动处画布后将y坐标重置为-height 实现图片衔接滚动
      this.data.y1 > this.data.height && (this.data.y1 = -this.data.height);
      this.data.y2 > this.data.height && (this.data.y2 = -this.data.height);
      this.data.time = 1;//重置移动时间
    }
    
    var sky = this.BgSky(1);
    sky.paint()
    console.log(sky)

    setTimeout(function () {
      that.gameGo();
    }, 10000);
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

  BgSky: function(num){
    

    var a = function paint(){
      console.log('方法体内' + num)
    }
    return {
      paint : a
    }
  }
})