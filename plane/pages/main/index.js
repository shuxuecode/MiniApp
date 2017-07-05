// index.js

var windowWidth = 0;
var windowHeight = 0;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    planeLeft: 0,
    planeTop: 0,

    bulletLeft: 0,
    bulletTop: 0,

    bullets: [],
    enemys: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {

        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;

        console.log(windowWidth)
        console.log(windowHeight)

        // 宽度除2 再减 飞机宽度
        var left = Math.round((windowWidth / 2) * 100) / 100 - 50;
        var top = windowHeight - 100;

        that.setData({
          planeLeft: left,
          planeTop: top,
          bulletLeft: left,
          bulletTop: top
        })
      }
    });



    begin(this);

  },

  touchStart: function () { },
  touchMove: function (e) {
    var that = this;
    // console.log(e.touches[0].pageX)
    // console.log(e.touches[0].pageY)

    var left = e.touches[0].pageX;
    var top = e.touches[0].pageY;

    if (left > 0 && left < windowWidth) {
      that.setData({
        planeLeft: left - 50
      })
    }

    if (top > 0 && top < windowHeight) {
      that.setData({
        planeTop: top - 50
      })
    }

  },
  touchEnd: function () { },

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

  }
})

var a = 0;
var b = 0;

var set;
function begin(that) {
  /*
     调用开始函数
     */

  var t = 10;
  // t = 200;

  set = setInterval(function () {
    start(that)
  }, t);
}


var mark = 0;
var mark1 = 0;

function start(that) {
  // console.log(1)
  mark++;
  if (mark % 5 == 0) {
    // console.log('创建子弹')
    var arr = that.data.bullets;

    arr.push({
      left: that.data.planeLeft + 50,
      top: that.data.planeTop
    })

    // console.log(arr.length)

    if (arr.length > 0 && arr[0].top < 0) {
      arr.shift();
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      // console.log(arr[i])
      arr[i].top = arr[i].top - 30
    }


    that.setData({
      bullets: arr
    })
  }

  if(mark == 20){
    mark1++;
    if (mark1 % 5 == 0){
      var arr = that.data.enemys;

      console.log(windowWidth)

      var num = parseInt(windowWidth - 50);

      var left = Math.round(Math.random() * num);

      arr.push({
        left: left,
        top: -10
      })

      console.log(arr.length)

      if (arr.length > 0 && arr[0].top > 500) {
        arr.shift();
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        arr[i].top = arr[i].top + 50
      }


      that.setData({
        enemys: arr
      })
    }
    if (mark1 == 20) {
      mark1 = 0;
    }
    else {

    }
    mark = 0;
  }
}


function shoot(that) {
  console.log(that)
  var top = that.data.bulletTop;

  top = top - 10;

  if (top > -10) {
    // setInterval(function () {
    //   that.setData({
    //     bulletTop: top
    //   })
    //   shoot(that);
    // }, 20000)
  }


}