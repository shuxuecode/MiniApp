// pages/canvas/index.js

var context;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 1,
    width: 100,
    height: 100,
    y1: 0,
    y2: 0,
    time: 1,

    //
    planeWidth: 99,
    planeHeight: 124,
    x: 0,
    y: 0,

    //
    bulletWidth: 9,
    bulletHeight: 21,

    bullets: []
  },

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(10)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      },
    })

    context = wx.createCanvasContext('firstCanvas')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    // var context = wx.createCanvasContext('firstCanvas')

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
    // console.log(1)
    this.init();
    this.gameGo();
  },

  init: function () {
    this.data.y1 = -this.data.height;
    this.data.y2 = 0;
    // 
    this.data.x = (this.data.width - this.data.planeWidth) / 2;
    this.data.y = this.data.height - this.data.planeHeight - 10;

  },

  gameGo: function () {
    const that = this;
    // console.table([["John", "Smith"]])
    // console.log(new Date())


    var sky = this.BgSky();
    sky.paint()
    sky.step()

    //
    var hero = this.Hero();
    hero.paint();
    hero.step();

    var bullet = this.Bullet()
    bullet.paint();
    bullet.step();


    context.draw()
    setTimeout(function () {
      that.gameGo();
    }, 10);
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

  // 背景图片
  BgSky: function () {
    let that = this;
    // var context = wx.createCanvasContext('firstCanvas')

    var paint = function paint() {
      context.drawImage('../../img/background.png', 0, that.data.y1, that.data.width, that.data.height);//第一张图片
      context.drawImage('../../img/background.png', 0, that.data.y2, that.data.width, that.data.height);//第二张图片
      // context.draw()
    }

    var step = function step() {
      that.data.time++;
      if (that.data.time % 3 == 0) {//控制背景图片height值的增加
        that.data.y1++;//图片运动下一帧
        that.data.y2++;
        //图片移动处画布后将y坐标重置为-height 实现图片衔接滚动
        that.data.y1 > that.data.height && (that.data.y1 = -that.data.height);
        that.data.y2 > that.data.height && (that.data.y2 = -that.data.height);
        that.data.time = 1;//重置移动时间
      }
    }
    return {
      paint: paint,
      step: step
    }
  },

  Hero: function () {
    let that = this;
    // var context = wx.createCanvasContext('firstCanvas')

    var paint = function paint() {
      context.drawImage('../../img/hero1.png', that.data.x, that.data.y, 99, 124);
      // context.draw()
    }

    var step = function step() {

    }

    return {
      paint: paint,
      step: step
    }
  },

  Bullet: function () { 
    let that = this;

    var paint = function paint() {
      context.drawImage('../../img/bullet1.png', that.data.x, that.data.y, 9, 21);
    }

    var step = function step() {

    }

    return {
      paint: paint,
      step: step
    }
  },
  fun2: function () { },
  fun3: function () { },
  touchStart: function (e) {
    // console.log(e.touches[0].x)
    // console.log(e.touches[0].y)
    // console.log(this.data.x)
    // console.log(this.data.y)
    var x = e.touches[0].x
    var y = e.touches[0].y

    var w = this.data.planeWidth
    var h = this.data.planeHeight

    if (x > this.data.x && x < this.data.x + w) {
      if (y > this.data.y && y < this.data.y + h) {
        this.data.state = 2
      }
    }

    // console.log(this.data.state)
    // console.log(this.data.x)
    // console.log(this.data.y)
  },
  touchMove: function (e) {
    var that = this;
    // console.log(this.data.state)
    if (this.data.state != 2){
      return;
    }

    // console.log(e.touches[0].x)
    // console.log(e.touches[0].y)

    var left = e.touches[0].x;
    var top = e.touches[0].y;

    var w = this.data.planeWidth
    var h = this.data.planeHeight

    left = left - (w/2)
    top = top - (h/2)

    this.data.x = left;
    this.data.y = top;
  },
  touchEnd: function (e) {
    console.log(11111111)
    this.data.state = 1
  }




})