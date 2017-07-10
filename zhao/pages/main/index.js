// index.js

var windowWidth = 0;
var windowHeight = 0;

var set;
var moveSet;
var pauseStatus = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
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
        var left = Math.round((windowWidth / 2) * 100) / 100 - 33;
        var top = windowHeight - 80;

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
        planeLeft: left - 33
      })
    }

    if (top > 0 && top < windowHeight) {
      that.setData({
        planeTop: top - 40
      })
    }

  },
  touchEnd: function () { },

  pauseGame: function () {
    var that = this;
    if (pauseStatus == 0) {

      clearInterval(set);
      clearInterval(moveSet);

      pauseStatus = 1;
    } else {
      set = setInterval(function () {
        start(that)
      }, 20);
      moveSet = setInterval(function () {
        move(that)
      }, 40);
      pauseStatus = 0;
    }
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

  }
})



function begin(that) {

  // return;
  /*
     调用开始函数
     */

  var t = 20;
  // t = 50;
  // t = 1000;

  set = setInterval(function () {
    start(that)
  }, t);

  var tt = 40;
  moveSet = setInterval(function () {
    move(that)
  }, tt);

}


var mark = 0;
var mark1 = 0;

var mark2 = 0;

/**
 * 创建事件
 */
function start(that) {
  // console.log(1)
  mark++;
  if (mark % 4 == 0) {
    // console.log('创建子弹')
    var arr = that.data.bullets;
    // console.log("子弹个数：" + arr.length)
    arr.push({
      left: that.data.planeLeft + 33,
      top: that.data.planeTop,
      display: 'block'
    })

    that.setData({
      bullets: arr
    })
  }

  if (mark == 20) {
    mark1++;
    if (mark1 % 5 == 0) {
      var arr = that.data.enemys;
      // console.log("飞机个数：" + arr.length)

      // console.log(windowWidth)

      var num = parseInt(windowWidth - 50);

      var left = Math.round(Math.random() * num);

      arr.push({
        left: left,
        top: -10,
        display: 'block',
        hp: 5
      })

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

/**
 * 移动事件
 */
function move(that) {
  mark2++;
  var bullets = that.data.bullets;
  if (mark2 % 2 == 0) {

    // 保存移除的子弹
    var delBullets = new Array();

    // if (bullets.length > 0 && bullets[0].top < 0) {
    //   bullets.shift();
    // }

    for (var i = 0, len = bullets.length; i < len; i++) {
      bullets[i].top = bullets[i].top - 30
      if (bullets[i].top < 0){
        delBullets.push(i);
      }
    }

    for(var i=delBullets.length - 1; i>=0; i--){
      bullets.splice(delBullets[i], 1);
    }

    that.setData({
      bullets: bullets
    })
  }

  // if (mark2 % 4 == 0) {

  var enemys = that.data.enemys;
  if (enemys.length > 0 && enemys[0].top > windowHeight) {
    enemys.shift();
  }

  for (var i = 0, len = bullets.length; i< len; i++){
    // 当子弹没有打中时
    if (bullets[i].display == 'block'){
      for (var j = 0; j < enemys.length; j++) {
        if ((bullets[i].left > enemys[j].left) && (bullets[i].left + 10 < enemys[j].left + 40)) {
          if ((bullets[i].top <= enemys[j].top)) {
            bullets[i].display = 'none';
            enemys[j].hp--;
          }
        }
      }
    }
    
  }


  var score = that.data.score;

  for (var i = 0, len = enemys.length; i < len; i++) {
    enemys[i].top = enemys[i].top + 10

    if (enemys[i].hp == 0){
      score++;
      enemys[i].display = 'none';
    }

  }


  that.setData({
    enemys: enemys,
    score: score
  })


  if (mark2 == 20) {
    mark2 = 0;
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