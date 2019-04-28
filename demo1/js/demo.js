import Phaser from 'libs/phaser-wx.js';

var data = [
  { "x": 3, "y": 0, "word": "c", "show": false, "belong": ["commit"] },
  { "x": 2, "y": 1, "word": "c", "show": true, "belong": ["columns"] },
  { "x": 3, "y": 1, "word": "o", "show": false, "belong": ["commit", "columns"] },
  { "x": 4, "y": 1, "word": "l", "show": false, "belong": ["columns"] },
  { "x": 5, "y": 1, "word": "u", "show": true, "belong": ["columns"] },
  { "x": 6, "y": 1, "word": "m", "show": false, "belong": ["columns"] },
  { "x": 7, "y": 1, "word": "n", "show": true, "belong": ["columns"] },
  { "x": 8, "y": 1, "word": "s", "show": true, "belong": ["columns"] },
  { "x": 1, "y": 2, "word": "r", "show": false, "belong": ["report"] },
  { "x": 3, "y": 2, "word": "m", "show": true, "belong": ["commit"] },
  { "x": 1, "y": 3, "word": "e", "show": false, "belong": ["report"] },
  { "x": 3, "y": 3, "word": "m", "show": true, "belong": ["commit"] },
  { "x": 0, "y": 4, "word": "s", "show": true, "belong": ["spring"] },
  { "x": 1, "y": 4, "word": "p", "show": false, "belong": ["report", "spring"] },
  { "x": 2, "y": 4, "word": "r", "show": true, "belong": ["spring"] },
  { "x": 3, "y": 4, "word": "i", "show": false, "belong": ["commit", "spring"] },
  { "x": 4, "y": 4, "word": "n", "show": true, "belong": ["spring"] },
  { "x": 5, "y": 4, "word": "g", "show": true, "belong": ["spring"] },
  { "x": 1, "y": 5, "word": "o", "show": true, "belong": ["report"] },
  { "x": 3, "y": 5, "word": "t", "show": false, "belong": ["commit", "table"] },
  { "x": 4, "y": 5, "word": "a", "show": true, "belong": ["table"] },
  { "x": 5, "y": 5, "word": "b", "show": false, "belong": ["table"] },
  { "x": 6, "y": 5, "word": "l", "show": true, "belong": ["table"] },
  { "x": 7, "y": 5, "word": "e", "show": true, "belong": ["table"] },
  { "x": 1, "y": 6, "word": "r", "show": true, "belong": ["report"] },
  { "x": 1, "y": 7, "word": "t", "show": true, "belong": ["report", "thanks"] },
  { "x": 2, "y": 7, "word": "h", "show": true, "belong": ["thanks"] },
  { "x": 3, "y": 7, "word": "a", "show": false, "belong": ["thanks"] },
  { "x": 4, "y": 7, "word": "n", "show": false, "belong": ["thanks"] },
  { "x": 5, "y": 7, "word": "k", "show": false, "belong": ["thanks"] },
  { "x": 6, "y": 7, "word": "s", "show": true, "belong": ["thanks"] }];

var wordArray =
{
  "table": { "coordinate": [{ "x": 3, "y": 5 }, { "x": 4, "y": 5 }, { "x": 5, "y": 5 }, { "x": 6, "y": 5 }, { "x": 7, "y": 5 }] },
  "commit": { "coordinate": [{ "x": 3, "y": 0 }, { "x": 3, "y": 1 }, { "x": 3, "y": 2 }, { "x": 3, "y": 3 }, { "x": 3, "y": 4 }, { "x": 3, "y": 5 }] },
  "columns": { "coordinate": [{ "x": 2, "y": 1 }, { "x": 3, "y": 1 }, { "x": 4, "y": 1 }, { "x": 5, "y": 1 }, { "x": 6, "y": 1 }, { "x": 7, "y": 1 }, { "x": 8, "y": 1 }] },
  "spring": { "coordinate": [{ "x": 0, "y": 4 }, { "x": 1, "y": 4 }, { "x": 2, "y": 4 }, { "x": 3, "y": 4 }, { "x": 4, "y": 4 }, { "x": 5, "y": 4 }] },
  "report": { "coordinate": [{ "x": 1, "y": 2 }, { "x": 1, "y": 3 }, { "x": 1, "y": 4 }, { "x": 1, "y": 5 }, { "x": 1, "y": 6 }, { "x": 1, "y": 7 }] },
  "thanks": { "coordinate": [{ "x": 1, "y": 7 }, { "x": 2, "y": 7 }, { "x": 3, "y": 7 }, { "x": 4, "y": 7 }, { "x": 5, "y": 7 }, { "x": 6, "y": 7 }] }
}

// 待选取的字母
let data2 = [];
for (var i = 0, len = data.length; i < len; i++) {
  if (!data[i].show) {
    data2.push(data[i])
  }
}

// 方格的个数
let cellNum = 9;

var array = []
for (var i = 0; i < cellNum; i++) {
  array[i] = []
  for (var j = 0; j < cellNum; j++) {
    array[i][j] = {};
  }
}

console.log('二维数组为：')
console.log(array)


// 各种变量定义
let gameWidth = wx.getSystemInfoSync().windowWidth
let gameHeight = wx.getSystemInfoSync().windowHeight

// 每个方格的宽度
let cellWidth;
// 绘制方格的开始坐标点 
var startX, startY, pointX;

// 默认的方格
var cellGroup = [];
// 选中状态的方格
var cellGroupBack = [];
// 正确状态的方格
var cellGroupRight = [];

// 显示单词的数组
var wordGroup = [];

// 待填入的字母方格
var blockGroup = [];
// 待填入的字母数组
var letterGroup = [];

// 主要区域的开始坐标
let mainDivX = 10, mainDivY = 100;

// 临时变量
var chooseCellIndex = 0;


export default class PlayGame extends Phaser.State {

  // 构造函数
  constructor(game) {
    super();
    this.game = game;
  }

  // 游戏载入前加载资源
  preload() {
    
    // 背景颜色
    this.game.stage.backgroundColor = '#CECECE';
    // 计算中间区域的宽度，两边留10像素 
    // 绘制方格 展示方格的区域宽度 mainWidth
    var mainWidth = gameWidth - 10 * 2;

    //新建图形，第一个参数为x轴位置，第二个参数为y轴位置
    const graphicObject = this.game.add.graphics(mainDivX, mainDivY);
    //画一个矩形
    graphicObject.beginFill(0xB9B9B9);  //设置矩形的颜色
    // 暂定正方形
    graphicObject.drawRect(0, 0, mainWidth, mainWidth);   //设置矩形的x,y,width,height

    // 计算方格的宽度
    // 方格个数 cellNum
    var width_1 = mainWidth - cellNum * 3; // 再减去方格之间3像素的间隔
    var width_2 = parseInt(width_1 / cellNum) // 方格的宽度，取整操作
    console.info("每个方格的宽度： " + width_2)
    // 计算剩下的边宽度
    var width_3 = width_1 - width_2 * cellNum;
    width_3 = width_3 / 2 // 平分剩余的宽度，把它当做起点

    // console.log('平分剩余的宽度 ' + width_3)

    startX = mainDivX + width_3, pointX = startX;
    startY = mainDivY + width_3;

    cellWidth = width_2;

  }



  // 场景创建时执行
  create() {
    var i = 0;

    var temp = data.shift();

    for (var y = 0; y < cellNum; y++) {

      if (y > 0) {
        // Y坐标开始叠加，主要要算上间隔的3像素
        startY = startY + 3 + cellWidth
        // X坐标要重新开始
        startX = pointX
      }

      for (var x = 0; x < cellNum; x++) {

        if (temp == undefined) {
          break;
        }

        if (x > 0) {
          // 同理，X坐标也要叠加
          startX = startX + 3 + cellWidth
        }

        //
        if (temp.x == x && temp.y == y) {
          // 填充二维数组
          array[x][y] = temp;
          array[x][y].index = i;
        } else {
          continue;
        }

        var show = temp.show

        var letter = '';
        if (show) {
          letter = temp.word
        }

        // 生成默认样式的方块
        var cellMapData = this.createBitmapData(1, "#000000", show, "#aaaaaa");
        // 生成选中样式的方块
        var cellBackMapData = this.createBitmapData(4, "#cc0000", false, "#aaaaaa");
        // 生成正确样式的方块
        var cellRightMapData = this.createBitmapData(4, "#000000", true, "#7DCD1E");

        // 
        cellGroup[i] = this.game.add.sprite(startX, startY, cellMapData);
        cellGroup[i].inputEnabled = true;

        cellGroup[i].data = {
          x: x,
          y: y,
          index: i,
          data: temp
        };

        // 
        cellGroupBack[i] = this.game.add.sprite(startX, startY, cellBackMapData);
        // cellGroupBack[i].alpha = 0 // 透明度
        cellGroupBack[i].visible = false // 是否显示
        cellGroupBack[i].inputEnabled = true;

        cellGroupBack[i].data = {
          x: x,
          y: y,
          index: i,
          data: temp
        };

        // 
        cellGroupRight[i] = this.game.add.sprite(startX, startY, cellRightMapData)
        cellGroupRight[i].visible = false // 是否显示


        console.log(letter)

        // 创建字母
        var word = this.createText(startX, startY, letter, '#cc0000')

        wordGroup[i] = word;

        temp = data.shift();
        i++;

      }
    }


    // 随机打乱顺序
    data2.sort(function (a, b) { return Math.random() > .5 ? -1 : 1 })

    // 下方显示字母的坐标
    var wordX = pointX;
    var wordY = startY + cellWidth + (cellWidth * 2);

    i = 0;

    // 定义临时变量，存储需要显示的方格坐标
    var tempWord = data2.shift();

    for (var y = 0; y < cellNum; y++) {
      if (y > 0) {
        // Y坐标开始叠加，主要要算上间隔的3像素
        wordY = wordY + 3 + cellWidth
        // X坐标要重新开始
        wordX = pointX
      }

      for (var x = 0; x < cellNum; x++) {

        if (tempWord == undefined) {
          break;
        }

        if (x > 0) {
          // 同理，X坐标也要叠加
          wordX = wordX + 3 + cellWidth
        }

        // 生成默认样式的方块
        var mapData = this.createBitmapData(1, "#000000", false);

        blockGroup[i] = this.game.add.sprite(wordX, wordY, mapData);
        blockGroup[i].inputEnabled = true;

        blockGroup[i].data = {
          x: x,
          y: y,
          index: i,
          data: tempWord
        };

        var letter = tempWord.word;

        var word = this.createText(wordX, wordY, letter, '#cc0000')

        letterGroup[i] = word;

        tempWord = data2.shift();
        i++;
      }
    }

    // console.info(cellGroup)
    cellGroup[0].visible = false
    cellGroupBack[0].visible = true

  }

  

  // 每帧更新
  update() {
    // for (var i = 0; i < block.length; i++) {
      // block[i].events.onInputDown.add(onDown, this);
    // }

    // 添加选中事件
    for (var i = 0; i < cellGroup.length; i++) {
      // 如果不是待填字母不需要绑定事件
      if (!cellGroup[i].data.data.show) {
        cellGroup[i].events.onInputDown.add(this.onDown2, this);
      }
    }

    // 选中框也添加事件
    for (var i = 0; i < cellGroupBack.length; i++) {
      if (!cellGroup[i].data.data.show) {
        cellGroupBack[i].events.onInputDown.add(this.onDown2, this);
      }
    }

    // 待填字母方块添加事件
    for (var i = 0; i < blockGroup.length; i++) {
      blockGroup[i].events.onInputDown.add(this.onDown3, this);
    }

  }


  // #############################################################
  // ########################  自定义函数  ########################
  // #############################################################

  onDown2(cell) {
    console.log(cell)
    // console.log(cell.data)
    // console.log(cell.data.index)

    // 选中的方格
    var newIndex = cell.data.index

    // 如果点击的方块和原先的一样则不需要改变方块样式
    if (newIndex == chooseCellIndex) {

    } else {
      // 修改方块的显示状态，原先的取消选中，这次选择的添加选中样式
      this.updateCellVisible(newIndex, chooseCellIndex)
    }

    // 获取该方块是否已经有字母了，有则需要清除还原，没有则不需要操作
    var letterIndex = cellGroup[newIndex].data.letterIndex
    // console.log(letterIndex) // 注意 0 也是false
    if (letterIndex != undefined) {
      blockGroup[letterIndex].visible = true
      letterGroup[letterIndex].visible = true

      cellGroup[newIndex].data.letterIndex = undefined
      wordGroup[newIndex].setText("", true)
    }

    // 修改变量为最新值
    chooseCellIndex = newIndex

  }


  onDown3(letter) {
    console.log(letter)
    // console.info(cellGroup[chooseCellIndex].data)
    var x = cellGroup[chooseCellIndex].data.x
    var y = cellGroup[chooseCellIndex].data.y
    // console.info(array[x][y])

    var letterIndex = cellGroup[chooseCellIndex].data.letterIndex
    // 位置有字母则需要把原先的还原
    if (letterIndex != undefined) {
      blockGroup[letterIndex].visible = true
      letterGroup[letterIndex].visible = true
    }

    // 隐藏点击的字母
    letter.visible = false;
    var index = letter.data.index;
    letterGroup[index].visible = false

    // 把点击的字母放到选中的方块上
    wordGroup[chooseCellIndex].setText(letterGroup[index].text, true)
    // 修改选中方块的字母下标
    cellGroup[chooseCellIndex].data.letterIndex = index

    // 检测填的字母所在的单词是否已拼写正确
    this.checkWord(chooseCellIndex)


    var oldCellIndex = array[x][y].index;
    var nextCell = this.getNextCell(x, y);
    var newCellIndex = nextCell.index;
    if (newCellIndex != oldCellIndex) {
      // 修改方块的显示状态，原先的取消选中，这次选择的添加选中样式
      this.updateCellVisible(newCellIndex, oldCellIndex)
      // 修改变量为最新值
      chooseCellIndex = newCellIndex
    }

  }



  /**
    创建 BitmapData
    lineWidth 线宽
    strokeStyle 边框样式
    show  是否填充
    fillStyle 填充的颜色
  */

  createBitmapData(lineWidth, strokeStyle, show, fillStyle) {
    var mapData = this.game.add.bitmapData(cellWidth, cellWidth);

    mapData.ctx.beginPath();
    mapData.ctx.lineWidth = lineWidth
    mapData.ctx.strokeStyle = strokeStyle
    mapData.ctx.strokeRect(0, 0, cellWidth, cellWidth)

    // 填充
    if (show) {
      mapData.ctx.rect(lineWidth, lineWidth, cellWidth - (lineWidth * 2), cellWidth - (lineWidth * 2));
      mapData.ctx.fillStyle = fillStyle
      mapData.ctx.fill();
    }

    mapData.ctx.closePath();

    return mapData;
  }

  /**
    创建字母
    x 
    y
    text 显示文本
    fontColor  颜色
  */
  createText(x, y, text, fontColor) {
    var word = this.game.add.text(x, y, text, {
      font: "sans-serif",
      fontSize: '20px',
      fill: fontColor,
      boundsAlignH: "center",
      boundsAlignV: "middle",
    });

    word.setTextBounds(0, 2, cellWidth, cellWidth);

    return word;
  }

  /**
    修改方块的显示状态
  */
  updateCellVisible(showIndex, hideIndex) {
    // 原先的取消选中状态
    // cellGroup[chooseCellIndex].alpha = 1
    cellGroup[hideIndex].visible = true

    // cellGroupBack[chooseCellIndex].alpha = 0
    cellGroupBack[hideIndex].visible = false

    // 这次选择的添加选中状态
    // cellGroup[cell.data.index].alpha = 0
    cellGroup[showIndex].visible = false

    // cellGroupBack[cell.data.index].alpha = 1
    cellGroupBack[showIndex].visible = true
  }


  getNextCell(x, y) {
    if (x + 1 >= cellNum) {
      return this.getNextCellY(x, y)
    }
    if (y + 1 >= cellNum) {
      return this.getNextCellX(x, y)
    }
    if (array[x + 1][y].word == undefined) {
      return this.getNextCellY(x, y)
    }
    if (array[x][y + 1].word == undefined) {
      return this.getNextCellX(x, y)
    }
    // 得到上一个选中方块的坐标 x,y
    var cellX = cellGroup[chooseCellIndex].data.x
    var cellY = cellGroup[chooseCellIndex].data.Y
    // 说明x方向移动
    if (cellX != x) {
      return this.getNextCellX(x, y)
    }
    // 说明y方向移动
    if (cellY != y) {
      return this.getNextCellY(x, y)
    }
    // 最后默认按x方向移动
    return this.getNextCellX(x, y)
  }

  getNextCellX(x, y) {
    console.info(array[x][y])
    // 如果超过了边界，则不动
    if (x + 1 >= cellNum) {
      return array[x][y]
    }

    var x2 = x + 1
    // 如果下一个方块不为空，注意数组下标越界
    while (x2 < cellNum && array[x2][y].word != undefined) {
      // 并且是可以选择的
      if (array[x2][y].show == false) {
        return array[x2][y]
      }
      x2++;
    }
    return array[x][y]
  }

  getNextCellY(x, y) {
    console.info(array[x][y])
    // 如果超过了边界，则不动
    if (y + 1 >= cellNum) {
      return array[x][y]
    }

    var y2 = y + 1
    // 如果下一个方块不为空，注意数组下标越界
    while (y2 < cellNum && array[x][y2].word != undefined) {
      // 并且是可以选择的
      if (array[x][y2].show == false) {
        return array[x][y2]
      }
      y2++;
    }
    return array[x][y]
  }

  /**
  检查单词是否已经正确
  */
  checkWord(index) {
    // 获取单词数组
    var belong = cellGroup[index].data.data.belong

    var word1 = belong[0]

    this.checkWordArray(word1)

    word1 = belong[1]
    if (word1 != undefined) {
      this.checkWordArray(word1)
    }
  }


  checkWordArray(word1) {
    var points = wordArray[word1].coordinate
    // 默认为填对了，如果有一个错误，则全部错误
    var isBingo = true
    for (var i = 0, len = points.length; i < len; i++) {
      var wordArrayX = points[i].x
      var wordArrayY = points[i].y
      // 如果为填字母方格
      if (!array[wordArrayX][wordArrayY].show) {
        var wordArrayIndex = array[wordArrayX][wordArrayY].index

        // console.info(wordArrayIndex)
        // console.info(cellGroup[wordArrayIndex].data.data.word)
        // console.info(wordGroup[wordArrayIndex].text)
        if (cellGroup[wordArrayIndex].data.data.word == wordGroup[wordArrayIndex].text) {
          console.info(wordGroup[wordArrayIndex].text + '   字母填对了')
        } else {
          isBingo = false
        }
      }
    }

    if (isBingo) {
      console.info("单词填对了")
      for (var i = 0, len = points.length; i < len; i++) {
        var wordArrayX = points[i].x
        var wordArrayY = points[i].y

        var wordArrayIndex = array[wordArrayX][wordArrayY].index

        // console.info(cellGroup[wordArrayIndex])
        // console.info(wordGroup[wordArrayIndex])

        cellGroup[wordArrayIndex].visible = false
        cellGroupRight[wordArrayIndex].visible = true
        wordGroup[wordArrayIndex].fill = '#fff'
      }
      // 开始找下一个未完成的单词
      wordArray[word1].ok = true;

      this.getNextCellPoint()
    }

  }

  getNextCellPoint() {
    var x = undefined, y = undefined;
    for (var key in wordArray) {
      // console.info(wordArray[key])
      var obj = wordArray[key]
      if (!obj.ok) {
        var coordinate = obj.coordinate
        for (var i = 0; i < coordinate.length; i++) {

          x = coordinate[i].x
          y = coordinate[i].y
          // 只有待填入的坐标
          if (array[x][y].show == false) {
            break;
          }
        }

      }
    }

    if (x == undefined) {
      // alert("恭喜你全部填对了！！！")
      this.game.add.text(startX, startY + cellWidth * 3, "恭喜你全部填对了！！！", {
        font: "Arial",
        fontSize: '40px',
        fontWeight: 'bold',
        fill: '#cc0000',
        // align: 'center'
      });
    } else {
      // 修改方块的显示状态，原先的取消选中，这次选择的添加选中样式
      this.updateCellVisible(array[x][y].index, chooseCellIndex)
      // 修改变量为最新值
      chooseCellIndex = array[x][y].index
    }
  }




}





