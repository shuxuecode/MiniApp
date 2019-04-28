import Phaser from 'libs/phaser-wx.js'
import Demo from './demo.js'

// 保存原始的canvas
wx.originContext = canvas.getContext('2d');

var windowWidth = wx.getSystemInfoSync().windowWidth
var windowHeight = wx.getSystemInfoSync().windowHeight

var game = new Phaser.Game({
  width: windowWidth,
  height: windowHeight,
  renderer: Phaser.CANVAS,
  canvas: canvas
});


game.state.add('game', new Demo(game));
game.state.start('game');