// pages/dafeiji/index.js
var set;
var backgroundPositionY = 0;


/*
敌机对象数组
 */
var enemys = [];

/*
子弹对象数组
 */
var bullets = [];
var mark = 0;
var mark1 = 0;
var backgroundPositionY = 0;


Page({
  data: {
    backgroundImageUrl: 'image/ksbj.png',
    backgroundImageUrl2: 'image/background_1.png',
    startdivStyleDisplay: 'block', // 开始画面
    maindivStyleDisplay: 'none',
    backgroundPositionY: backgroundPositionY,
    imagenode: {
      left: '1px',
      top: '120px',
      src: 'image/wdfj.gif',
      mode: 'widthFix'
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },


  ////////////////////////////////////////////

  begin: function (e) {
    this.setData({
      startdivStyleDisplay: "none",
      maindivStyleDisplay: 'block'
    });


    var that = this;
    /*
     调用开始函数
     */
    set = setInterval(function () {
      start(that);
    }, 20);


  }







})





/*
开始函数
 */
function start(obj) {

  obj.setData({
    backgroundPositionY: backgroundPositionY + 0.5
  })

  backgroundPositionY += 0.5;

  if (backgroundPositionY == 568) {
    backgroundPositionY = 0;
  }

  mark++;

  //console.log(123);
}