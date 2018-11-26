/**
 * @author: 清风白水 https://www.cnblogs.com/luxiaoyao/
 * @date: 2018/07/20 14:36:00
 * @program: 重构音频页面
 */
const APP = getApp()
const AUDIOMANAGER = getApp().globalData.global_bac_audio_manager.manage
const AUDIO = getApp().globalData.global_bac_audio_manager
Page({
  onLoad: function (e) {
    let that = this,
      request_param = {
        articleId: e.articleId
      }

    this.setData({
      article_id: e.articleId
    })

    wx.request({
      url: 'your url',
      method: 'POST',
      data: {},
      header: {
        'Content-Type': 'application/json;text/html;charset=utf-8;'
      },
      success: (res) => {
        if (res.data.code == 'A00000') {
          AUDIOMANAGER.onPlay(() => {
            setTimeout(() => {
              that.setData({
                is_loading: true
              })
            }, 300)
          })

          let response = res.data.data.information

          // 如果不是从悬浮按钮播放，就重新赋值
          if (e.articleId == AUDIO.id && AUDIO.is_play) {
            wx.seekBackgroundAudio({
              position: Math.floor(AUDIO.time)
            })
          } else {
            audio_background_play(response)
          }

          // 置灰上一首下一首
          if (response.preArticleId == 0) {
            that.setData({
              is_first_page: true
            })
          }
          if (response.nextArticleId == 0) {
            that.setData({
              is_last_page: true
            })
          }
        }
      }
    })

    //背景音频播放进度更新事件
    AUDIOMANAGER.onTimeUpdate(() => {
      if (!that.data.is_moving_slider) {
        that.setData({
          current_process: format(AUDIOMANAGER.currentTime),
          slider_value: Math.floor(AUDIOMANAGER.currentTime),
          total_process: format(AUDIOMANAGER.duration),
          slider_max: Math.floor(AUDIOMANAGER.duration)
        })
      }
      AUDIO.time = AUDIOMANAGER.currentTime
    })

    // 背景音频播放完毕
    AUDIOMANAGER.onEnded(() => {
      if (!that.data.is_loop) {
        that.next()
      } else {
        // 单曲循环
        that.setData({
          slider_value: 0,
          current_process: '00:00',
        })
        audio_background_play(response)
      }
    })
  },
  // 拖动进度条，到指定位置
  hanle_slider_change(e) {
    const position = e.detail.value
    this.seekCurrentAudio(position)
  },
  // 拖动进度条控件
  seekCurrentAudio(position) {
    // 更新进度条
    let that = this

    wx.seekBackgroundAudio({
      position: Math.floor(position),
      success: function () {
        AUDIOMANAGER.currentTime = position
        that.setData({
          current_process: format(position),
          slider_value: Math.floor(position)
        })
      }
    })
  },
  // 进度条滑动
  handle_slider_move_start() {
    this.setData({
      is_moving_slider: true
    });
  },
  handle_slider_move_end() {
    this.setData({
      is_moving_slider: false
    });
  },
  // 点击播放暂停
  audio_play: function () {
    let that = this

    if (this.data.is_play) {
      that.setData({
        is_play: false
      })
      wx.pauseBackgroundAudio()
    } else if (!this.data.is_play && this.data.is_ended) { // 这里是判断如果循环播放结束，没有下一首，重新播放 is_ended  是否是最后一首
      audio_background_play(that.data.audio_article)
      that.setData({
        is_play: true,
        is_ended: false
      })
    } else if (!this.data.is_play) {
      that.setData({
        is_play: true
      })
      wx.playBackgroundAudio()
    }
    AUDIO.is_play = !AUDIO.is_play
  },
  // 点击是否循环
  play_loop: function () {
    let that = this

    if (this.data.is_loop) {
      that.setData({
        is_loop: false
      })
    } else {
      that.setData({
        is_loop: true
      })
    }
  },

  // 上一首
  prev: function () {
    let that = this

    if (that.data.audio_article.preArticleId != 0) {
      wx.redirectTo({
        url: '/pages/audio_article/audio_article?articleId=' +
          that.data.audio_article.preArticleId
      })
    }
  },
  // 下一首
  next: function () {
    let that = this

    if (that.data.audio_article.nextArticleId != 0) {
      wx.redirectTo({
        url: '/pages/audio_article/audio_article?articleId=' +
          that.data.audio_article.nextArticleId
      })
    } else { // 如果是最后一首
      that.setData({
        is_play: false,
        slider_value: 0,
        current_process: '00:00',
        is_ended: true
      })
      AUDIO.is_play = false
    }
  },
  onUnload: function () {
    // 动态切换悬浮按钮的动态
    if (AUDIO.is_play) {
      APP.globalData.is_active = true
    } else {
      APP.globalData.is_active = false
    }
  }
})
// 时间格式化
function format(t) {
  let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60)

  t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2)
  return t
}
// 音频播放
function audio_background_play(response) {
  AUDIOMANAGER.src = response.urlCompressed ? response.urlCompressed : response.audioLink // 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav
  AUDIOMANAGER.title = response.articleName // 音频标题
  AUDIOMANAGER.epname = response.lessonName // 专辑名
  AUDIOMANAGER.singer = '****' // 歌手名
  AUDIOMANAGER.coverImgUrl = response.poster // 封面图url
}