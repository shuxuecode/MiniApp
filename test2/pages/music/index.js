// pages/music/index.js

const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    playProgress: 0,
    duration: '',
    playStatus: false,
    pauseStatus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    innerAudioContext.autoplay = false
    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'

    innerAudioContext.src = 'http://tmp/wxbc6e55a1c09739ad.o6zAJs3t2F5eLi0PQpqv00f1QjTs.kNMHkwmDGf89e024c03d0df5c3e9a9d3429f32ebe414.durationTime=6459.mp3';

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      console.log(innerAudioContext)
      // console.log(this.duration)

      
      // var max = parseInt(innerAudioContext.duration);

      that.setData({
        // duration: max,
        playStatus: true,
        pauseStatus: false
      })
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    innerAudioContext.onPause(
      () => {
        console.log('停止播放')

        that.setData({
          playStatus: false,
          pauseStatus: true
        })
      }
    )

    innerAudioContext.onTimeUpdate((res) => {

      // console.log(innerAudioContext)

      var duration = innerAudioContext.duration;
      var offset = innerAudioContext.currentTime;
      var currentTime = parseInt(innerAudioContext.currentTime);
      var min = "0" + parseInt(currentTime / 60);
      var max = parseInt(innerAudioContext.duration);
      var sec = currentTime % 60;
      if (sec < 10) {
        sec = "0" + sec;
      };
      var starttime = min + ':' + sec;   /*  00:00  */

      // console.log(starttime)
      // console.log(offset)
      // console.log(duration)

      var progress = parseFloat(offset / duration) * 100;

      // console.log(progress)
      that.setData({
        duration: starttime,
        playProgress: progress
      })
     
      
    })
  },

  audioPlay: function () {
    innerAudioContext.play()
  },
  audioPause: function () {
    innerAudioContext.pause()
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