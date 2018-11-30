"use strict";

var daaty = require("./api2.js");
var apis = require("./api.js");
var showdown = require("./showdown.js");
var HtmlToJson = require("./html2json.js");
/* 
    * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message 
    * Digest Algorithm, as defined in RFC 1321. 
    * Version 1.1 Copyright (C) Paul Johnston 1999 - 2002. 
    * Code also contributed by Greg Holt 
    * See http://pajhome.org.uk/site/legal.html for details. 
    */

/* 
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters. 
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/* 
 * Bitwise rotate a 32-bit number to the left. 
 */
function rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

/* 
 * These functions implement the four basic operations the algorithm uses. 
 */
function cmn(q, a, b, x, s, t) {
  return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* 
 * Calculate the MD5 of an array of little-endian words, producing an array 
 * of little-endian words. 
 */
function coreMD5(x) {
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return [a, b, c, d];
}

/* 
 * Convert an array of little-endian words to a hex string. 
 */
function binl2hex(binarray) {
  var hex_tab = "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
  }
  return str;
}

/* 
 * Convert an array of little-endian words to a base64 encoded string. 
 */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 32; i += 6) {
    str += tab.charAt(binarray[i >> 5] << i % 32 & 0x3F | binarray[i >> 5 + 1] >> 32 - i % 32 & 0x3F);
  }
  return str;
}

/* 
 * Convert an 8-bit character string to a sequence of 16-word blocks, stored 
 * as an array, and append appropriate padding for MD4/5 calculation. 
 * If any of the characters are >255, the high byte is silently ignored. 
 */
function str2binl(str) {
  var nblk = (str.length + 8 >> 6) + 1; // number of 16-word blocks  
  var blks = new Array(nblk * 16);
  for (var i = 0; i < nblk * 16; i++) {
    blks[i] = 0;
  }for (var i = 0; i < str.length; i++) {
    blks[i >> 2] |= (str.charCodeAt(i) & 0xFF) << i % 4 * 8;
  }blks[i >> 2] |= 0x80 << i % 4 * 8;
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/* 
 * Convert a wide-character string to a sequence of 16-word blocks, stored as 
 * an array, and append appropriate padding for MD4/5 calculation. 
 */
function strw2binl(str) {
  var nblk = (str.length + 4 >> 5) + 1; // number of 16-word blocks  
  var blks = new Array(nblk * 16);
  for (var i = 0; i < nblk * 16; i++) {
    blks[i] = 0;
  }for (var i = 0; i < str.length; i++) {
    blks[i >> 1] |= str.charCodeAt(i) << i % 2 * 16;
  }blks[i >> 1] |= 0x80 << i % 2 * 16;
  blks[nblk * 16 - 2] = str.length * 16;
  return blks;
}

/* 
 * External interface 
 */
function hexMD5(str) {
  return binl2hex(coreMD5(str2binl(str)));
}
function hexMD5w(str) {
  return binl2hex(coreMD5(strw2binl(str)));
}
function b64MD5(str) {
  return binl2b64(coreMD5(str2binl(str)));
}
function b64MD5w(str) {
  return binl2b64(coreMD5(strw2binl(str)));
}
/* Backward compatibility */
function calcMD5(str) {
  return binl2hex(coreMD5(str2binl(str)));
}

function imgUrl(urls) {
  var urltwo = apis.domainy + "/wxfile/shdImg/251428445677289315.png";
  if (urls == undefined) {
    return urltwo;
  }
  var index = urls.indexOf("."); //得到"."在第几位
  var urlss = urls.substring(index); //截断"."之前的，得到后缀
  if (urlss != ".bmp" || urlss != ".png" || urlss != ".gif" || urlss != ".jpg" || urlss != ".jpeg") {
    //根据后缀，判断是否符合图片格式
    var urlss2 = urls.substring(0, 4);
    if (urlss2 == "http") {
      //根据后缀，判断是否符合图片格式
      return urls;
    } else {
      return apis.domainy + urls;
    }
  } else {
    return urltwo;
  }
}

function filderName(names) {
  var newNmae;
  if (names == undefined) {
    return names;
  }
  if (names.length > 6) {
    newNmae = names.substring(0, 6);
    newNmae = newNmae + "···";
    return newNmae;
  } else {
    return names;
  }
}

function washType(types) {
  var newType;
  switch (types) {
    case 1:
      newType = "充值";
      break;
    case 2:
      newType = "套餐赠送";
      break;
    case 3:
      newType = "会员洗车";
      break;
    case 4:
      newType = "消费次数";
      break;
    case 5:
      newType = "限时消费";
      break;
    case 6:
      newType = "非会员洗车";
      break;
    case 7:
      newType = "充值码充值";
      break;
    case 8:
      newType = "积分洗车";
      break;
    case 9:
      newType = "轿车洗车";
      break;
    case 10:
      newType = "SUV洗车";
      break;
  }
  return newType;
}

function camcewr(cars, types, index, thisy) {
  var message = thisy.data.cardList;
  var sloabloState = thisy.data.sloabloState;
  if (index != "a" || index == 0) {
    for (var i = 0; i < message.length; i++) {
      //遍历列表数据
      if (i == index) {
        //根据下标找到目标
        var collectStatus = false;
        if (types == 1) {
          if (message[i].isCollections == 0) {
            //如果是没收藏+1
            collectStatus = true;
            message[i].isCollections = parseInt(message[i].isCollections) + 1;
            message[i].collections = parseInt(message[i].collections) + 1;
            ajsay(cars, types, 1);
          } else {
            collectStatus = false;
            message[i].isCollections = parseInt(message[i].isCollections) - 1;
            message[i].collections = parseInt(message[i].collections) - 1;
            ajsay(cars, types, 2);
          }
        } else {
          if (message[i].isGood == 0) {
            //如果是没点赞+1
            collectStatus = true;
            message[i].isGood = parseInt(message[i].isGood) + 1;
            message[i].goods = parseInt(message[i].goods) + 1;
            ajsay(cars, types, 1);
          } else {
            collectStatus = false;
            message[i].isGood = parseInt(message[i].isGood) - 1;
            message[i].goods = parseInt(message[i].goods) - 1;
            ajsay(cars, types, 2);
          }
        }
        actxt();
      }
    }
  } else {
    var collectStatus = false;
    if (types == 1) {
      if (sloabloState.isCollections == 0) {
        //如果是没收藏+1
        collectStatus = true;
        sloabloState.isCollections = parseInt(sloabloState.isCollections) + 1;
        sloabloState.collections = parseInt(sloabloState.collections) + 1;
        ajsay(cars, types, 1);
      } else {
        collectStatus = false;
        sloabloState.isCollections = parseInt(sloabloState.isCollections) - 1;
        sloabloState.collections = parseInt(sloabloState.collections) - 1;
        ajsay(cars, types, 2);
      }
    } else {
      if (sloabloState.isGood == 0) {
        //如果是没点赞+1
        collectStatus = true;
        console.log(sloabloState.goods);
        sloabloState.isGood = parseInt(sloabloState.isGood) + 1;
        sloabloState.goods = parseInt(sloabloState.goods) + 1;
        console.log(sloabloState.goods);
        ajsay(cars, types, 1);
      } else {
        collectStatus = false;
        sloabloState.isGood = parseInt(sloabloState.isGood) - 1;
        sloabloState.goods = parseInt(sloabloState.goods) - 1;
        ajsay(cars, types, 2);
      }
    }
    actxt();
  }

  function ajsay(cars, types, nuy) {
    if (nuy == 1) {
      var successFa2 = function successFa2(data, sourceObj) {};

      daaty.cardOperation(thisy.data.user.userId, cars, types, null, successFa2);
    } else {
      var _successFa = function _successFa(data, sourceObj) {};

      daaty.delCardOperation(thisy.data.user.userId, cars, types, null, _successFa);
    }
  }

  function actxt() {
    if (types == 1) {
      wx.showToast({
        title: collectStatus ? '收藏成功' : '取消收藏'
      });
    } else {
      wx.showToast({
        title: collectStatus ? '点赞成功' : '取消点赞'
      });
    }
  }
  thisy.setData({
    cardList: message,
    sloabloState: sloabloState
  });
  console.log(thisy.data.sloabloState.goods);
}

function wxParse() {
  var bindName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wxParseData';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '<div class="color:red;">数据不能为空</div>';
  var target = arguments[3];
  var imagePadding = arguments[4];

  var that = target;
  var transData = {}; //存放转化后的数据
  if (type == 'html') {
    transData = HtmlToJson.html2json(data, bindName);
    // console.log(JSON.stringify(transData, ' ', ' '));
  } else if (type == 'md' || type == 'markdown') {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(data);
    transData = HtmlToJson.html2json(html, bindName);
    // console.log(JSON.stringify(transData, ' ', ' '));
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof imagePadding != 'undefined') {
    transData.view.imagePadding = imagePadding;
  }
  var bindData = {};
  bindData[bindName] = transData;
  that.setData(bindData);
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseImgTap = wxParseImgTap;
}
// 图片点击事件
function wxParseImgTap(e) {
  var that = this;
  var nowImgUrl = e.target.dataset.src;
  var tagFrom = e.target.dataset.from;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    wx.previewImage({
      current: nowImgUrl, // 当前显示图片的http链接
      urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
    });
  }
}

/**
 * 图片视觉宽高计算函数区 
 **/
function wxParseImgLoad(e) {
  var that = this;
  var tagFrom = e.target.dataset.from;
  var idx = e.target.dataset.idx;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    calMoreImageInfo(e, idx, that, tagFrom);
  }
}
// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that, bindName) {
  var temData = that.data[bindName];
  if (temData.images.length == 0) {
    return;
  }
  var temImages = temData.images;
  //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
  var recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
  temImages[idx].width = recal.imageWidth;
  temImages[idx].height = recal.imageheight;
  temData.images = temImages;
  var bindData = {};
  bindData[bindName] = temData;
  that.setData(bindData);
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
  //获取图片的原始长宽
  var windowWidth = 0,
      windowHeight = 0;
  var autoWidth = 0,
      autoHeight = 0;
  var results = {};
  wx.getSystemInfo({
    success: function success(res) {
      var padding = that.data[bindName].view.imagePadding;
      windowWidth = res.windowWidth - 2 * padding;
      windowHeight = res.windowHeight;
      //判断按照那种方式进行缩放
      // console.log("windowWidth" + windowWidth);
      if (originalWidth > windowWidth) {
        //在图片width大于手机屏幕width时候
        autoWidth = windowWidth;
        // console.log("autoWidth" + autoWidth);
        autoHeight = autoWidth * originalHeight / originalWidth;
        // console.log("autoHeight" + autoHeight);
        results.imageWidth = autoWidth;
        results.imageheight = autoHeight;
      } else {
        //否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }
    }
  });
  return results;
}

function wxParseTemArray(temArrayName, bindNameReg, total, that) {
  var array = [];
  var temData = that.data;
  var obj = null;
  for (var i = 0; i < total; i++) {
    var simArr = temData[bindNameReg + i].nodes;
    array.push(simArr);
  }

  temArrayName = temArrayName || 'wxParseTemArray';
  obj = JSON.parse('{"' + temArrayName + '":""}');
  obj[temArrayName] = array;
  that.setData(obj);
}

function isValidPhone(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

function format(date) {
  var yy = date.getFullYear(); //年
  var mm = date.getMonth() + 1; //月
  var dd = date.getDate(); //日
  var hh = date.getHours(); //时
  var ii = date.getMinutes(); //分
  var ss = date.getSeconds(); //秒
  var clock = yy + "-";
  if (mm < 10) clock += "0";
  clock += mm + "-";
  if (dd < 10) clock += "0";
  clock += dd + " ";
  if (hh < 10) clock += "0";
  clock += hh + ":";
  if (ii < 10) clock += '0';
  clock += ii + ":";
  if (ss < 10) clock += '0';
  clock += ss;
  return clock;
}

function getDate(date) {
  var d = new Date(date);
  var d1 = format(d);
  return d1;
}

/**
 * 配置emojis
 * 
 */

function emojisInit() {
  var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
  var emojis = arguments[2];

  HtmlToJson.emojisInit(reg, baseSrc, emojis);
}
module.exports = {
  hexMD5: hexMD5,
  imgUrl: imgUrl,
  filderName: filderName,
  washType: washType,
  camcewr: camcewr,
  wxParse: wxParse,
  wxParseTemArray: wxParseTemArray,
  emojisInit: emojisInit,
  isValidPhone: isValidPhone,
  getDate: getDate
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiZGFhdHkiLCJyZXF1aXJlIiwiYXBpcyIsInNob3dkb3duIiwiSHRtbFRvSnNvbiIsInNhZmVfYWRkIiwieCIsInkiLCJsc3ciLCJtc3ciLCJyb2wiLCJudW0iLCJjbnQiLCJjbW4iLCJxIiwiYSIsImIiLCJzIiwidCIsImZmIiwiYyIsImQiLCJnZyIsImhoIiwiaWkiLCJjb3JlTUQ1IiwiaSIsImxlbmd0aCIsIm9sZGEiLCJvbGRiIiwib2xkYyIsIm9sZGQiLCJiaW5sMmhleCIsImJpbmFycmF5IiwiaGV4X3RhYiIsInN0ciIsImNoYXJBdCIsImJpbmwyYjY0IiwidGFiIiwic3RyMmJpbmwiLCJuYmxrIiwiYmxrcyIsIkFycmF5IiwiY2hhckNvZGVBdCIsInN0cncyYmlubCIsImhleE1ENSIsImhleE1ENXciLCJiNjRNRDUiLCJiNjRNRDV3IiwiY2FsY01ENSIsImltZ1VybCIsInVybHMiLCJ1cmx0d28iLCJkb21haW55IiwidW5kZWZpbmVkIiwiaW5kZXgiLCJpbmRleE9mIiwidXJsc3MiLCJzdWJzdHJpbmciLCJ1cmxzczIiLCJmaWxkZXJOYW1lIiwibmFtZXMiLCJuZXdObWFlIiwid2FzaFR5cGUiLCJ0eXBlcyIsIm5ld1R5cGUiLCJjYW1jZXdyIiwiY2FycyIsInRoaXN5IiwibWVzc2FnZSIsImRhdGEiLCJjYXJkTGlzdCIsInNsb2FibG9TdGF0ZSIsImNvbGxlY3RTdGF0dXMiLCJpc0NvbGxlY3Rpb25zIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9ucyIsImFqc2F5IiwiaXNHb29kIiwiZ29vZHMiLCJhY3R4dCIsImNvbnNvbGUiLCJsb2ciLCJudXkiLCJzdWNjZXNzRmEyIiwic291cmNlT2JqIiwiY2FyZE9wZXJhdGlvbiIsInVzZXIiLCJ1c2VySWQiLCJkZWxDYXJkT3BlcmF0aW9uIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsInNldERhdGEiLCJ3eFBhcnNlIiwiYmluZE5hbWUiLCJ0eXBlIiwidGFyZ2V0IiwiaW1hZ2VQYWRkaW5nIiwidGhhdCIsInRyYW5zRGF0YSIsImh0bWwyanNvbiIsImNvbnZlcnRlciIsIkNvbnZlcnRlciIsImh0bWwiLCJtYWtlSHRtbCIsInZpZXciLCJiaW5kRGF0YSIsInd4UGFyc2VJbWdMb2FkIiwid3hQYXJzZUltZ1RhcCIsImUiLCJub3dJbWdVcmwiLCJkYXRhc2V0Iiwic3JjIiwidGFnRnJvbSIsImZyb20iLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwiaW1hZ2VVcmxzIiwiaWR4IiwiY2FsTW9yZUltYWdlSW5mbyIsInRlbURhdGEiLCJpbWFnZXMiLCJ0ZW1JbWFnZXMiLCJyZWNhbCIsInd4QXV0b0ltYWdlQ2FsIiwiZGV0YWlsIiwid2lkdGgiLCJoZWlnaHQiLCJpbWFnZVdpZHRoIiwiaW1hZ2VoZWlnaHQiLCJvcmlnaW5hbFdpZHRoIiwib3JpZ2luYWxIZWlnaHQiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsImF1dG9XaWR0aCIsImF1dG9IZWlnaHQiLCJyZXN1bHRzIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJwYWRkaW5nIiwid3hQYXJzZVRlbUFycmF5IiwidGVtQXJyYXlOYW1lIiwiYmluZE5hbWVSZWciLCJ0b3RhbCIsImFycmF5Iiwib2JqIiwic2ltQXJyIiwibm9kZXMiLCJwdXNoIiwiSlNPTiIsInBhcnNlIiwiaXNWYWxpZFBob25lIiwibXlyZWciLCJ0ZXN0IiwiZm9ybWF0IiwiZGF0ZSIsInl5IiwiZ2V0RnVsbFllYXIiLCJtbSIsImdldE1vbnRoIiwiZGQiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic3MiLCJnZXRTZWNvbmRzIiwiY2xvY2siLCJEYXRlIiwiZDEiLCJlbW9qaXNJbml0IiwicmVnIiwiYmFzZVNyYyIsImVtb2ppcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsUUFBU0MsUUFBUSxXQUFSLENBQWY7QUFDQSxJQUFNQyxPQUFRRCxRQUFRLFVBQVIsQ0FBZDtB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dEIsRUFBMEJDLE9BQTFCLEVBQWtDQyxNQUFsQztBQUNGO0FBQ0RDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZm5JLFVBQVFBLE1BRE87QUFFZkssVUFBT0EsTUFGUTtBQUdmVSxjQUFXQSxVQUhJO0FBSWZHLFlBQVNBLFFBSk07QUFLZkcsV0FBUUEsT0FMTztBQU1mNEIsV0FBU0EsT0FOTTtBQU9mZ0QsbUJBQWdCQSxlQVBEO0FBUWY2QixjQUFXQSxVQVJJO0FBU2ZsQixnQkFBYUEsWUFURTtBQVVmVSxXQUFRQTtBQVZPLENBQWpCIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYWF0eSA9ICByZXF1aXJlKFwiLi4vdXRpbHMvYXBpMlwiKVxyXG5jb25zdCBhcGlzID0gIHJlcXVpcmUoXCIuLi91dGlscy9hcGlcIilcclxuY29uc3Qgc2hvd2Rvd24gPSByZXF1aXJlKFwiLi9zaG93ZG93bi5qc1wiKTtcclxuY29uc3QgSHRtbFRvSnNvbiA9IHJlcXVpcmUoXCIuL2h0bWwyanNvbi5qc1wiKTtcclxuIC8qIFxyXG4gICAgICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZSBcclxuICAgICAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuIFxyXG4gICAgICogVmVyc2lvbiAxLjEgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDAyLiBcclxuICAgICAqIENvZGUgYWxzbyBjb250cmlidXRlZCBieSBHcmVnIEhvbHQgXHJcbiAgICAgKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL3NpdGUvbGVnYWwuaHRtbCBmb3IgZGV0YWlscy4gXHJcbiAgICAgKi8gIFxyXG4gICAgICBcclxuICAgIC8qIFxyXG4gICAgICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseSBcclxuICAgICAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuIFxyXG4gICAgICovICBcclxuICAgIGZ1bmN0aW9uIHNhZmVfYWRkKHgsIHkpICBcclxuICAgIHsgIFxyXG4gICAgICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpICBcclxuICAgICAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpICBcclxuICAgICAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRikgIFxyXG4gICAgfSAgXHJcbiAgICAgIFxyXG4gICAgLyogXHJcbiAgICAgKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuIFxyXG4gICAgICovICBcclxuICAgIGZ1bmN0aW9uIHJvbChudW0sIGNudCkgIFxyXG4gICAgeyAgXHJcbiAgICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKSAgXHJcbiAgICB9ICBcclxuICAgICAgXHJcbiAgICAvKiBcclxuICAgICAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuIFxyXG4gICAgICovICBcclxuICAgIGZ1bmN0aW9uIGNtbihxLCBhLCBiLCB4LCBzLCB0KSAgXHJcbiAgICB7ICBcclxuICAgICAgcmV0dXJuIHNhZmVfYWRkKHJvbChzYWZlX2FkZChzYWZlX2FkZChhLCBxKSwgc2FmZV9hZGQoeCwgdCkpLCBzKSwgYikgIFxyXG4gICAgfSAgXHJcbiAgICBmdW5jdGlvbiBmZihhLCBiLCBjLCBkLCB4LCBzLCB0KSAgXHJcbiAgICB7ICBcclxuICAgICAgcmV0dXJuIGNtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCkgIFxyXG4gICAgfSAgXHJcbiAgICBmdW5jdGlvbiBnZyhhLCBiLCBjLCBkLCB4LCBzLCB0KSAgXHJcbiAgICB7ICBcclxuICAgICAgcmV0dXJuIGNtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCkgIFxyXG4gICAgfSAgXHJcbiAgICBmdW5jdGlvbiBoaChhLCBiLCBjLCBkLCB4LCBzLCB0KSAgXHJcbiAgICB7ICBcclxuICAgICAgcmV0dXJuIGNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpICBcclxuICAgIH0gIFxyXG4gICAgZnVuY3Rpb24gaWkoYSwgYiwgYywgZCwgeCwgcywgdCkgIFxyXG4gICAgeyAgXHJcbiAgICAgIHJldHVybiBjbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpICBcclxuICAgIH0gIFxyXG4gICAgICBcclxuICAgIC8qIFxyXG4gICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgcHJvZHVjaW5nIGFuIGFycmF5IFxyXG4gICAgICogb2YgbGl0dGxlLWVuZGlhbiB3b3Jkcy4gXHJcbiAgICAgKi8gIFxyXG4gICAgZnVuY3Rpb24gY29yZU1ENSh4KSAgXHJcbiAgICB7ICBcclxuICAgICAgdmFyIGEgPSAgMTczMjU4NDE5MyAgXHJcbiAgICAgIHZhciBiID0gLTI3MTczMzg3OSAgXHJcbiAgICAgIHZhciBjID0gLTE3MzI1ODQxOTQgIFxyXG4gICAgICB2YXIgZCA9ICAyNzE3MzM4NzggIFxyXG4gICAgICBcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSAgXHJcbiAgICAgIHsgIFxyXG4gICAgICAgIHZhciBvbGRhID0gYSAgXHJcbiAgICAgICAgdmFyIG9sZGIgPSBiICBcclxuICAgICAgICB2YXIgb2xkYyA9IGMgIFxyXG4gICAgICAgIHZhciBvbGRkID0gZCAgXHJcbiAgICAgIFxyXG4gICAgICAgIGEgPSBmZihhLCBiLCBjLCBkLCB4W2krIDBdLCA3ICwgLTY4MDg3NjkzNikgIFxyXG4gICAgICAgIGQgPSBmZihkLCBhLCBiLCBjLCB4W2krIDFdLCAxMiwgLTM4OTU2NDU4NikgIFxyXG4gICAgICAgIGMgPSBmZihjLCBkLCBhLCBiLCB4W2krIDJdLCAxNywgIDYwNjEwNTgxOSkgIFxyXG4gICAgICAgIGIgPSBmZihiLCBjLCBkLCBhLCB4W2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApICBcclxuICAgICAgICBhID0gZmYoYSwgYiwgYywgZCwgeFtpKyA0XSwgNyAsIC0xNzY0MTg4OTcpICBcclxuICAgICAgICBkID0gZmYoZCwgYSwgYiwgYywgeFtpKyA1XSwgMTIsICAxMjAwMDgwNDI2KSAgXHJcbiAgICAgICAgYyA9IGZmKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSkgIFxyXG4gICAgICAgIGIgPSBmZihiLCBjLCBkLCBhLCB4W2krIDddLCAyMiwgLTQ1NzA1OTgzKSAgXHJcbiAgICAgICAgYSA9IGZmKGEsIGIsIGMsIGQsIHhbaSsgOF0sIDcgLCAgMTc3MDAzNTQxNikgIFxyXG4gICAgICAgIGQgPSBmZihkLCBhLCBiLCBjLCB4W2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpICBcclxuICAgICAgICBjID0gZmYoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTcsIC00MjA2MykgIFxyXG4gICAgICAgIGIgPSBmZihiLCBjLCBkLCBhLCB4W2krMTFdLCAyMiwgLTE5OTA0MDQxNjIpICBcclxuICAgICAgICBhID0gZmYoYSwgYiwgYywgZCwgeFtpKzEyXSwgNyAsICAxODA0NjAzNjgyKSAgXHJcbiAgICAgICAgZCA9IGZmKGQsIGEsIGIsIGMsIHhbaSsxM10sIDEyLCAtNDAzNDExMDEpICBcclxuICAgICAgICBjID0gZmYoYywgZCwgYSwgYiwgeFtpKzE0XSwgMTcsIC0xNTAyMDAyMjkwKSAgXHJcbiAgICAgICAgYiA9IGZmKGIsIGMsIGQsIGEsIHhbaSsxNV0sIDIyLCAgMTIzNjUzNTMyOSkgIFxyXG4gICAgICBcclxuICAgICAgICBhID0gZ2coYSwgYiwgYywgZCwgeFtpKyAxXSwgNSAsIC0xNjU3OTY1MTApICBcclxuICAgICAgICBkID0gZ2coZCwgYSwgYiwgYywgeFtpKyA2XSwgOSAsIC0xMDY5NTAxNjMyKSAgXHJcbiAgICAgICAgYyA9IGdnKGMsIGQsIGEsIGIsIHhbaSsxMV0sIDE0LCAgNjQzNzE3NzEzKSAgXHJcbiAgICAgICAgYiA9IGdnKGIsIGMsIGQsIGEsIHhbaSsgMF0sIDIwLCAtMzczODk3MzAyKSAgXHJcbiAgICAgICAgYSA9IGdnKGEsIGIsIGMsIGQsIHhbaSsgNV0sIDUgLCAtNzAxNTU4NjkxKSAgXHJcbiAgICAgICAgZCA9IGdnKGQsIGEsIGIsIGMsIHhbaSsxMF0sIDkgLCAgMzgwMTYwODMpICBcclxuICAgICAgICBjID0gZ2coYywgZCwgYSwgYiwgeFtpKzE1XSwgMTQsIC02NjA0NzgzMzUpICBcclxuICAgICAgICBiID0gZ2coYiwgYywgZCwgYSwgeFtpKyA0XSwgMjAsIC00MDU1Mzc4NDgpICBcclxuICAgICAgICBhID0gZ2coYSwgYiwgYywgZCwgeFtpKyA5XSwgNSAsICA1Njg0NDY0MzgpICBcclxuICAgICAgICBkID0gZ2coZCwgYSwgYiwgYywgeFtpKzE0XSwgOSAsIC0xMDE5ODAzNjkwKSAgXHJcbiAgICAgICAgYyA9IGdnKGMsIGQsIGEsIGIsIHhbaSsgM10sIDE0LCAtMTg3MzYzOTYxKSAgXHJcbiAgICAgICAgYiA9IGdnKGIsIGMsIGQsIGEsIHhbaSsgOF0sIDIwLCAgMTE2MzUzMTUwMSkgIFxyXG4gICAgICAgIGEgPSBnZyhhLCBiLCBjLCBkLCB4W2krMTNdLCA1ICwgLTE0NDQ2ODE0NjcpICBcclxuICAgICAgICBkID0gZ2coZCwgYSwgYiwgYywgeFtpKyAyXSwgOSAsIC01MTQwMzc4NCkgIFxyXG4gICAgICAgIGMgPSBnZyhjLCBkLCBhLCBiLCB4W2krIDddLCAxNCwgIDE3MzUzMjg0NzMpICBcclxuICAgICAgICBiID0gZ2coYiwgYywgZCwgYSwgeFtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KSAgXHJcbiAgICAgIFxyXG4gICAgICAgIGEgPSBoaChhLCBiLCBjLCBkLCB4W2krIDVdLCA0ICwgLTM3ODU1OCkgIFxyXG4gICAgICAgIGQgPSBoaChkLCBhLCBiLCBjLCB4W2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpICBcclxuICAgICAgICBjID0gaGgoYywgZCwgYSwgYiwgeFtpKzExXSwgMTYsICAxODM5MDMwNTYyKSAgXHJcbiAgICAgICAgYiA9IGhoKGIsIGMsIGQsIGEsIHhbaSsxNF0sIDIzLCAtMzUzMDk1NTYpICBcclxuICAgICAgICBhID0gaGgoYSwgYiwgYywgZCwgeFtpKyAxXSwgNCAsIC0xNTMwOTkyMDYwKSAgXHJcbiAgICAgICAgZCA9IGhoKGQsIGEsIGIsIGMsIHhbaSsgNF0sIDExLCAgMTI3Mjg5MzM1MykgIFxyXG4gICAgICAgIGMgPSBoaChjLCBkLCBhLCBiLCB4W2krIDddLCAxNiwgLTE1NTQ5NzYzMikgIFxyXG4gICAgICAgIGIgPSBoaChiLCBjLCBkLCBhLCB4W2krMTBdLCAyMywgLTEwOTQ3MzA2NDApICBcclxuICAgICAgICBhID0gaGgoYSwgYiwgYywgZCwgeFtpKzEzXSwgNCAsICA2ODEyNzkxNzQpICBcclxuICAgICAgICBkID0gaGgoZCwgYSwgYiwgYywgeFtpKyAwXSwgMTEsIC0zNTg1MzcyMjIpICBcclxuICAgICAgICBjID0gaGgoYywgZCwgYSwgYiwgeFtpKyAzXSwgMTYsIC03MjI1MjE5NzkpICBcclxuICAgICAgICBiID0gaGgoYiwgYywgZCwgYSwgeFtpKyA2XSwgMjMsICA3NjAyOTE4OSkgIFxyXG4gICAgICAgIGEgPSBoaChhLCBiLCBjLCBkLCB4W2krIDldLCA0ICwgLTY0MDM2NDQ4NykgIFxyXG4gICAgICAgIGQgPSBoaChkLCBhLCBiLCBjLCB4W2krMTJdLCAxMSwgLTQyMTgxNTgzNSkgIFxyXG4gICAgICAgIGMgPSBoaChjLCBkLCBhLCBiLCB4W2krMTVdLCAxNiwgIDUzMDc0MjUyMCkgIFxyXG4gICAgICAgIGIgPSBoaChiLCBjLCBkLCBhLCB4W2krIDJdLCAyMywgLTk5NTMzODY1MSkgIFxyXG4gICAgICBcclxuICAgICAgICBhID0gaWkoYSwgYiwgYywgZCwgeFtpKyAwXSwgNiAsIC0xOTg2MzA4NDQpICBcclxuICAgICAgICBkID0gaWkoZCwgYSwgYiwgYywgeFtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KSAgXHJcbiAgICAgICAgYyA9IGlpKGMsIGQsIGEsIGIsIHhbaSsxNF0sIDE1LCAtMTQxNjM1NDkwNSkgIFxyXG4gICAgICAgIGIgPSBpaShiLCBjLCBkLCBhLCB4W2krIDVdLCAyMSwgLTU3NDM0MDU1KSAgXHJcbiAgICAgICAgYSA9IGlpKGEsIGIsIGMsIGQsIHhbaSsxMl0sIDYgLCAgMTcwMDQ4NTU3MSkgIFxyXG4gICAgICAgIGQgPSBpaShkLCBhLCBiLCBjLCB4W2krIDNdLCAxMCwgLTE4OTQ5ODY2MDYpICBcclxuICAgICAgICBjID0gaWkoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTUsIC0xMDUxNTIzKSAgXHJcbiAgICAgICAgYiA9IGlpKGIsIGMsIGQsIGEsIHhbaSsgMV0sIDIxLCAtMjA1NDkyMjc5OSkgIFxyXG4gICAgICAgIGEgPSBpaShhLCBiLCBjLCBkLCB4W2krIDhdLCA2ICwgIDE4NzMzMTMzNTkpICBcclxuICAgICAgICBkID0gaWkoZCwgYSwgYiwgYywgeFtpKzE1XSwgMTAsIC0zMDYxMTc0NCkgIFxyXG4gICAgICAgIGMgPSBpaShjLCBkLCBhLCBiLCB4W2krIDZdLCAxNSwgLTE1NjAxOTgzODApICBcclxuICAgICAgICBiID0gaWkoYiwgYywgZCwgYSwgeFtpKzEzXSwgMjEsICAxMzA5MTUxNjQ5KSAgXHJcbiAgICAgICAgYSA9IGlpKGEsIGIsIGMsIGQsIHhbaSsgNF0sIDYgLCAtMTQ1NTIzMDcwKSAgXHJcbiAgICAgICAgZCA9IGlpKGQsIGEsIGIsIGMsIHhbaSsxMV0sIDEwLCAtMTEyMDIxMDM3OSkgIFxyXG4gICAgICAgIGMgPSBpaShjLCBkLCBhLCBiLCB4W2krIDJdLCAxNSwgIDcxODc4NzI1OSkgIFxyXG4gICAgICAgIGIgPSBpaShiLCBjLCBkLCBhLCB4W2krIDldLCAyMSwgLTM0MzQ4NTU1MSkgIFxyXG4gICAgICBcclxuICAgICAgICBhID0gc2FmZV9hZGQoYSwgb2xkYSkgIFxyXG4gICAgICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKSAgXHJcbiAgICAgICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpICBcclxuICAgICAgICBkID0gc2FmZV9hZGQoZCwgb2xkZCkgIFxyXG4gICAgICB9ICBcclxuICAgICAgcmV0dXJuIFthLCBiLCBjLCBkXSAgXHJcbiAgICB9ICBcclxuICAgICAgXHJcbiAgICAvKiBcclxuICAgICAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIGhleCBzdHJpbmcuIFxyXG4gICAgICovICBcclxuICAgIGZ1bmN0aW9uIGJpbmwyaGV4KGJpbmFycmF5KSAgXHJcbiAgICB7ICBcclxuICAgICAgdmFyIGhleF90YWIgPSBcIjAxMjM0NTY3ODlhYmNkZWZcIiAgXHJcbiAgICAgIHZhciBzdHIgPSBcIlwiICBcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGJpbmFycmF5Lmxlbmd0aCAqIDQ7IGkrKykgIFxyXG4gICAgICB7ICBcclxuICAgICAgICBzdHIgKz0gaGV4X3RhYi5jaGFyQXQoKGJpbmFycmF5W2k+PjJdID4+ICgoaSU0KSo4KzQpKSAmIDB4RikgKyAgXHJcbiAgICAgICAgICAgICAgIGhleF90YWIuY2hhckF0KChiaW5hcnJheVtpPj4yXSA+PiAoKGklNCkqOCkpICYgMHhGKSAgXHJcbiAgICAgIH0gIFxyXG4gICAgICByZXR1cm4gc3RyICBcclxuICAgIH0gIFxyXG4gICAgICBcclxuICAgIC8qIFxyXG4gICAgICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLiBcclxuICAgICAqLyAgXHJcbiAgICBmdW5jdGlvbiBiaW5sMmI2NChiaW5hcnJheSkgIFxyXG4gICAgeyAgXHJcbiAgICAgIHZhciB0YWIgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIiAgXHJcbiAgICAgIHZhciBzdHIgPSBcIlwiICBcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGJpbmFycmF5Lmxlbmd0aCAqIDMyOyBpICs9IDYpICBcclxuICAgICAgeyAgXHJcbiAgICAgICAgc3RyICs9IHRhYi5jaGFyQXQoKChiaW5hcnJheVtpPj41XSA8PCAoaSUzMikpICYgMHgzRikgfCAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKChiaW5hcnJheVtpPj41KzFdID4+ICgzMi1pJTMyKSkgJiAweDNGKSkgIFxyXG4gICAgICB9ICBcclxuICAgICAgcmV0dXJuIHN0ciAgXHJcbiAgICB9ICBcclxuICAgICAgXHJcbiAgICAvKiBcclxuICAgICAqIENvbnZlcnQgYW4gOC1iaXQgY2hhcmFjdGVyIHN0cmluZyB0byBhIHNlcXVlbmNlIG9mIDE2LXdvcmQgYmxvY2tzLCBzdG9yZWQgXHJcbiAgICAgKiBhcyBhbiBhcnJheSwgYW5kIGFwcGVuZCBhcHByb3ByaWF0ZSBwYWRkaW5nIGZvciBNRDQvNSBjYWxjdWxhdGlvbi4gXHJcbiAgICAgKiBJZiBhbnkgb2YgdGhlIGNoYXJhY3RlcnMgYXJlID4yNTUsIHRoZSBoaWdoIGJ5dGUgaXMgc2lsZW50bHkgaWdub3JlZC4gXHJcbiAgICAgKi8gIFxyXG4gICAgZnVuY3Rpb24gc3RyMmJpbmwoc3RyKSAgXHJcbiAgICB7ICBcclxuICAgICAgdmFyIG5ibGsgPSAoKHN0ci5sZW5ndGggKyA4KSA+PiA2KSArIDEgLy8gbnVtYmVyIG9mIDE2LXdvcmQgYmxvY2tzICBcclxuICAgICAgdmFyIGJsa3MgPSBuZXcgQXJyYXkobmJsayAqIDE2KSAgXHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBuYmxrICogMTY7IGkrKykgYmxrc1tpXSA9IDAgIFxyXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSAgXHJcbiAgICAgICAgYmxrc1tpPj4yXSB8PSAoc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKSA8PCAoKGklNCkgKiA4KSAgXHJcbiAgICAgIGJsa3NbaT4+Ml0gfD0gMHg4MCA8PCAoKGklNCkgKiA4KSAgXHJcbiAgICAgIGJsa3NbbmJsayoxNi0yXSA9IHN0ci5sZW5ndGggKiA4ICBcclxuICAgICAgcmV0dXJuIGJsa3MgIFxyXG4gICAgfSAgXHJcbiAgICAgIFxyXG4gICAgLyogXHJcbiAgICAgKiBDb252ZXJ0IGEgd2lkZS1jaGFyYWN0ZXIgc3RyaW5nIHRvIGEgc2VxdWVuY2Ugb2YgMTYtd29yZCBibG9ja3MsIHN0b3JlZCBhcyBcclxuICAgICAqIGFuIGFycmF5LCBhbmQgYXBwZW5kIGFwcHJvcHJpYXRlIHBhZGRpbmcgZm9yIE1ENC81IGNhbGN1bGF0aW9uLiBcclxuICAgICAqLyAgXHJcbiAgICBmdW5jdGlvbiBzdHJ3MmJpbmwoc3RyKSAgXHJcbiAgICB7ICBcclxuICAgICAgdmFyIG5ibGsgPSAoKHN0ci5sZW5ndGggKyA0KSA+PiA1KSArIDEgLy8gbnVtYmVyIG9mIDE2LXdvcmQgYmxvY2tzICBcclxuICAgICAgdmFyIGJsa3MgPSBuZXcgQXJyYXkobmJsayAqIDE2KSAgXHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBuYmxrICogMTY7IGkrKykgYmxrc1tpXSA9IDAgIFxyXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSAgXHJcbiAgICAgICAgYmxrc1tpPj4xXSB8PSBzdHIuY2hhckNvZGVBdChpKSA8PCAoKGklMikgKiAxNikgIFxyXG4gICAgICBibGtzW2k+PjFdIHw9IDB4ODAgPDwgKChpJTIpICogMTYpICBcclxuICAgICAgYmxrc1tuYmxrKjE2LTJdID0gc3RyLmxlbmd0aCAqIDE2ICBcclxuICAgICAgcmV0dXJuIGJsa3MgIFxyXG4gICAgfSAgXHJcbiAgICAgIFxyXG4gICAgLyogXHJcbiAgICAgKiBFeHRlcm5hbCBpbnRlcmZhY2UgXHJcbiAgICAgKi8gIFxyXG4gICAgZnVuY3Rpb24gaGV4TUQ1IChzdHIpIHsgcmV0dXJuIGJpbmwyaGV4KGNvcmVNRDUoIHN0cjJiaW5sKHN0cikpKSB9ICBcclxuICAgIGZ1bmN0aW9uIGhleE1ENXcoc3RyKSB7IHJldHVybiBiaW5sMmhleChjb3JlTUQ1KHN0cncyYmlubChzdHIpKSkgfSAgXHJcbiAgICBmdW5jdGlvbiBiNjRNRDUgKHN0cikgeyByZXR1cm4gYmlubDJiNjQoY29yZU1ENSggc3RyMmJpbmwoc3RyKSkpIH0gIFxyXG4gICAgZnVuY3Rpb24gYjY0TUQ1dyhzdHIpIHsgcmV0dXJuIGJpbmwyYjY0KGNvcmVNRDUoc3RydzJiaW5sKHN0cikpKSB9ICBcclxuICAgIC8qIEJhY2t3YXJkIGNvbXBhdGliaWxpdHkgKi8gIFxyXG4gICAgZnVuY3Rpb24gY2FsY01ENShzdHIpIHsgcmV0dXJuIGJpbmwyaGV4KGNvcmVNRDUoIHN0cjJiaW5sKHN0cikpKSB9ICBcclxuXHJcbiAgICBmdW5jdGlvbiBpbWdVcmwodXJscyl7XHJcbiAgICAgIHZhciB1cmx0d28gPSBhcGlzLmRvbWFpbnkrXCIvd3hmaWxlL3NoZEltZy8yNTE0Mjg0NDU2NzcyODkzMTUucG5nXCI7XHJcbiAgICAgIGlmKHVybHMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICByZXR1cm4gdXJsdHdvO1xyXG4gICAgICB9XHJcbiAgICAgICAgdmFyIGluZGV4PSB1cmxzLmluZGV4T2YoXCIuXCIpOyAvL+W+l+WIsFwiLlwi5Zyo56ys5Yeg5L2NXHJcbiAgICAgICAgdmFyIHVybHNzPXVybHMuc3Vic3RyaW5nKGluZGV4KTsgLy/miKrmlq1cIi5cIuS5i+WJjeeahO+8jOW+l+WIsOWQjue8gFxyXG4gICAgICAgIGlmKHVybHNzIT1cIi5ibXBcInx8dXJsc3MhPVwiLnBuZ1wifHx1cmxzcyE9XCIuZ2lmXCJ8fHVybHNzIT1cIi5qcGdcInx8dXJsc3MhPVwiLmpwZWdcIil7ICAvL+agueaNruWQjue8gO+8jOWIpOaWreaYr+WQpuespuWQiOWbvueJh+agvOW8j1xyXG4gICAgICAgICAgdmFyIHVybHNzMj11cmxzLnN1YnN0cmluZygwLDQpO1xyXG4gICAgICAgICAgaWYodXJsc3MyPT1cImh0dHBcIil7ICAvL+agueaNruWQjue8gO+8jOWIpOaWreaYr+WQpuespuWQiOWbvueJh+agvOW8j1xyXG4gICAgICAgICAgICByZXR1cm4gdXJscztcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpcy5kb21haW55K3VybHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByZXR1cm4gdXJsdHdvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaWxkZXJOYW1lKG5hbWVzKXtcclxuICAgICAgICB2YXIgbmV3Tm1hZTtcclxuICAgICAgICBpZihuYW1lcyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgcmV0dXJuIG5hbWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihuYW1lcy5sZW5ndGg+Nil7XHJcbiAgICAgICAgICBuZXdObWFlID0gbmFtZXMuc3Vic3RyaW5nKDAsNik7XHJcbiAgICAgICAgICBuZXdObWFlID0gbmV3Tm1hZStcIsK3wrfCt1wiXHJcbiAgICAgICAgICAgcmV0dXJuIG5ld05tYWVcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHJldHVybiBuYW1lcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2FzaFR5cGUodHlwZXMpe1xyXG4gICAgICAgICAgdmFyIG5ld1R5cGU7XHJcbiAgICAgICAgICBzd2l0Y2godHlwZXMpe1xyXG4gICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLlhYXlgLxcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLlpZfppJDotaDpgIFcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLkvJrlkZjmtJfovaZcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLmtojotLnmrKHmlbBcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLpmZDml7bmtojotLlcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLpnZ7kvJrlkZjmtJfovaZcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLlhYXlgLznoIHlhYXlgLxcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLnp6/liIbmtJfovaZcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICBuZXdUeXBlID0gXCLovb/ovabmtJfovaZcIlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgbmV3VHlwZSA9IFwiU1VW5rSX6L2mXCJcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBuZXdUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhbWNld3IoY2Fycyx0eXBlcyxpbmRleCx0aGlzeSl7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gdGhpc3kuZGF0YS5jYXJkTGlzdDtcclxuICAgICAgbGV0IHNsb2FibG9TdGF0ZSA9IHRoaXN5LmRhdGEuc2xvYWJsb1N0YXRlXHJcbiAgICAgIGlmKGluZGV4ICE9IFwiYVwifHxpbmRleCA9PSAwKXtcclxuICAgICAgICBmb3IgKGxldCBpPTA7aTxtZXNzYWdlLmxlbmd0aDtpKyspIHsgLy/pgY3ljobliJfooajmlbDmja5cclxuICAgICAgICAgIGlmIChpID09IGluZGV4KSB7IC8v5qC55o2u5LiL5qCH5om+5Yiw55uu5qCHXHJcbiAgICAgICAgICAgIHZhciBjb2xsZWN0U3RhdHVzID0gZmFsc2VcclxuICAgICAgICAgICAgICBpZih0eXBlcyA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZVtpXS5pc0NvbGxlY3Rpb25zID09IDApIHsgLy/lpoLmnpzmmK/msqHmlLbol48rMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U3RhdHVzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VbaV0uaXNDb2xsZWN0aW9ucyA9IHBhcnNlSW50KG1lc3NhZ2VbaV0uaXNDb2xsZWN0aW9ucykgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVtpXS5jb2xsZWN0aW9ucyA9IHBhcnNlSW50KG1lc3NhZ2VbaV0uY29sbGVjdGlvbnMpICsgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFqc2F5KGNhcnMsdHlwZXMsMSlcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3RTdGF0dXMgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlW2ldLmlzQ29sbGVjdGlvbnMgPSBwYXJzZUludChtZXNzYWdlW2ldLmlzQ29sbGVjdGlvbnMpIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlW2ldLmNvbGxlY3Rpb25zID0gcGFyc2VJbnQobWVzc2FnZVtpXS5jb2xsZWN0aW9ucykgLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFqc2F5KGNhcnMsdHlwZXMsMilcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZVtpXS5pc0dvb2QgPT0gMCkgeyAvL+WmguaenOaYr+ayoeeCuei1nisxXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U3RhdHVzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlW2ldLmlzR29vZCA9IHBhcnNlSW50KG1lc3NhZ2VbaV0uaXNHb29kKSArIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVtpXS5nb29kcyA9IHBhcnNlSW50KG1lc3NhZ2VbaV0uZ29vZHMpICsgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhanNheShjYXJzLHR5cGVzLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3RTdGF0dXMgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVtpXS5pc0dvb2QgPSBwYXJzZUludChtZXNzYWdlW2ldLmlzR29vZCkgLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlW2ldLmdvb2RzID0gcGFyc2VJbnQobWVzc2FnZVtpXS5nb29kcykgLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICBhanNheShjYXJzLHR5cGVzLDIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhY3R4dCgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB2YXIgY29sbGVjdFN0YXR1cyA9IGZhbHNlXHJcbiAgICAgICAgaWYodHlwZXMgPT0gMSl7XHJcbiAgICAgICAgICAgICAgaWYgKHNsb2FibG9TdGF0ZS5pc0NvbGxlY3Rpb25zID09IDApIHsgLy/lpoLmnpzmmK/msqHmlLbol48rMVxyXG4gICAgICAgICAgICAgICAgICBjb2xsZWN0U3RhdHVzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICBzbG9hYmxvU3RhdGUuaXNDb2xsZWN0aW9ucyA9IHBhcnNlSW50KHNsb2FibG9TdGF0ZS5pc0NvbGxlY3Rpb25zKSArIDFcclxuICAgICAgICAgICAgICAgICAgc2xvYWJsb1N0YXRlLmNvbGxlY3Rpb25zID0gcGFyc2VJbnQoc2xvYWJsb1N0YXRlLmNvbGxlY3Rpb25zKSArIDFcclxuICAgICAgICAgICAgICAgICAgICBhanNheShjYXJzLHR5cGVzLDEpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb2xsZWN0U3RhdHVzID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgc2xvYWJsb1N0YXRlLmlzQ29sbGVjdGlvbnMgPSBwYXJzZUludChzbG9hYmxvU3RhdGUuaXNDb2xsZWN0aW9ucykgLSAxXHJcbiAgICAgICAgICAgICAgICAgIHNsb2FibG9TdGF0ZS5jb2xsZWN0aW9ucyA9IHBhcnNlSW50KHNsb2FibG9TdGF0ZS5jb2xsZWN0aW9ucykgLSAxXHJcbiAgICAgICAgICAgICAgICAgIGFqc2F5KGNhcnMsdHlwZXMsMilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBpZiAoc2xvYWJsb1N0YXRlLmlzR29vZCA9PSAwKSB7IC8v5aaC5p6c5piv5rKh54K56LWeKzFcclxuICAgICAgICAgICAgICAgIGNvbGxlY3RTdGF0dXMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzbG9hYmxvU3RhdGUuZ29vZHMpXHJcbiAgICAgICAgICAgICAgICBzbG9hYmxvU3RhdGUuaXNHb29kID0gcGFyc2VJbnQoc2xvYWJsb1N0YXRlLmlzR29vZCkgKyAxXHJcbiAgICAgICAgICAgICAgICBzbG9hYmxvU3RhdGUuZ29vZHMgPSBwYXJzZUludChzbG9hYmxvU3RhdGUuZ29vZHMpICsgMVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2xvYWJsb1N0YXRlLmdvb2RzKVxyXG4gICAgICAgICAgICAgICAgICBhanNheShjYXJzLHR5cGVzLDEpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbGxlY3RTdGF0dXMgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgc2xvYWJsb1N0YXRlLmlzR29vZCA9IHBhcnNlSW50KHNsb2FibG9TdGF0ZS5pc0dvb2QpIC0gMVxyXG4gICAgICAgICAgICAgICAgc2xvYWJsb1N0YXRlLmdvb2RzID0gcGFyc2VJbnQoc2xvYWJsb1N0YXRlLmdvb2RzKSAtIDFcclxuICAgICAgICAgICAgICAgIGFqc2F5KGNhcnMsdHlwZXMsMilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBhY3R4dCgpIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBhanNheShjYXJzLHR5cGVzLG51eSl7XHJcbiAgICAgICAgaWYobnV5ID09IDEpe1xyXG4gICAgICAgICAgICBkYWF0eS5jYXJkT3BlcmF0aW9uKHRoaXN5LmRhdGEudXNlci51c2VySWQsY2Fycyx0eXBlcyxudWxsLHN1Y2Nlc3NGYTIpO1xyXG4gICAgICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZhMihkYXRhLCBzb3VyY2VPYmope1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZGFhdHkuZGVsQ2FyZE9wZXJhdGlvbih0aGlzeS5kYXRhLnVzZXIudXNlcklkLGNhcnMsdHlwZXMsbnVsbCxzdWNjZXNzRmEyKTtcclxuICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYTIoZGF0YSwgc291cmNlT2JqKXtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gYWN0eHQoKXtcclxuICAgICAgICBpZih0eXBlcyA9PSAxKXtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBjb2xsZWN0U3RhdHVzID8gJ+aUtuiXj+aIkOWKnycgOiAn5Y+W5raI5pS26JePJyxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogY29sbGVjdFN0YXR1cyA/ICfngrnotZ7miJDlip8nIDogJ+WPlua2iOeCuei1nicsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzeS5zZXREYXRhKHtcclxuICAgICAgICBjYXJkTGlzdDogbWVzc2FnZSxcclxuICAgICAgICBzbG9hYmxvU3RhdGU6c2xvYWJsb1N0YXRlXHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXN5LmRhdGEuc2xvYWJsb1N0YXRlLmdvb2RzKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHd4UGFyc2UoYmluZE5hbWUgPSAnd3hQYXJzZURhdGEnLCB0eXBlPSdodG1sJywgZGF0YT0nPGRpdiBjbGFzcz1cImNvbG9yOnJlZDtcIj7mlbDmja7kuI3og73kuLrnqbo8L2Rpdj4nLCB0YXJnZXQsaW1hZ2VQYWRkaW5nKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGFyZ2V0O1xyXG4gICAgICB2YXIgdHJhbnNEYXRhID0ge307Ly/lrZjmlL7ovazljJblkI7nmoTmlbDmja5cclxuICAgICAgaWYgKHR5cGUgPT0gJ2h0bWwnKSB7XHJcbiAgICAgICAgdHJhbnNEYXRhID0gSHRtbFRvSnNvbi5odG1sMmpzb24oZGF0YSwgYmluZE5hbWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRyYW5zRGF0YSwgJyAnLCAnICcpKTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdtZCcgfHwgdHlwZSA9PSAnbWFya2Rvd24nKSB7XHJcbiAgICAgICAgdmFyIGNvbnZlcnRlciA9IG5ldyBzaG93ZG93bi5Db252ZXJ0ZXIoKTtcclxuICAgICAgICB2YXIgaHRtbCA9IGNvbnZlcnRlci5tYWtlSHRtbChkYXRhKTtcclxuICAgICAgICB0cmFuc0RhdGEgPSBIdG1sVG9Kc29uLmh0bWwyanNvbihodG1sLCBiaW5kTmFtZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodHJhbnNEYXRhLCAnICcsICcgJykpO1xyXG4gICAgICB9XHJcbiAgICAgIHRyYW5zRGF0YS52aWV3ID0ge307XHJcbiAgICAgIHRyYW5zRGF0YS52aWV3LmltYWdlUGFkZGluZyA9IDA7XHJcbiAgICAgIGlmKHR5cGVvZihpbWFnZVBhZGRpbmcpICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICB0cmFuc0RhdGEudmlldy5pbWFnZVBhZGRpbmcgPSBpbWFnZVBhZGRpbmdcclxuICAgICAgfVxyXG4gICAgICB2YXIgYmluZERhdGEgPSB7fTtcclxuICAgICAgYmluZERhdGFbYmluZE5hbWVdID0gdHJhbnNEYXRhO1xyXG4gICAgICB0aGF0LnNldERhdGEoYmluZERhdGEpXHJcbiAgICAgIHRoYXQud3hQYXJzZUltZ0xvYWQgPSB3eFBhcnNlSW1nTG9hZDtcclxuICAgICAgdGhhdC53eFBhcnNlSW1nVGFwID0gd3hQYXJzZUltZ1RhcDtcclxuICAgIH1cclxuICAgIC8vIOWbvueJh+eCueWHu+S6i+S7tlxyXG4gICAgZnVuY3Rpb24gd3hQYXJzZUltZ1RhcChlKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgdmFyIG5vd0ltZ1VybCA9IGUudGFyZ2V0LmRhdGFzZXQuc3JjO1xyXG4gICAgICB2YXIgdGFnRnJvbSA9IGUudGFyZ2V0LmRhdGFzZXQuZnJvbTtcclxuICAgICAgaWYgKHR5cGVvZiAodGFnRnJvbSkgIT0gJ3VuZGVmaW5lZCcgJiYgdGFnRnJvbS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgIGN1cnJlbnQ6IG5vd0ltZ1VybCwgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxyXG4gICAgICAgICAgdXJsczogdGhhdC5kYXRhW3RhZ0Zyb21dLmltYWdlVXJscyAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWbvueJh+inhuinieWuvemrmOiuoeeul+WHveaVsOWMuiBcclxuICAgICAqKi9cclxuICAgIGZ1bmN0aW9uIHd4UGFyc2VJbWdMb2FkKGUpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICB2YXIgdGFnRnJvbSA9IGUudGFyZ2V0LmRhdGFzZXQuZnJvbTtcclxuICAgICAgdmFyIGlkeCA9IGUudGFyZ2V0LmRhdGFzZXQuaWR4O1xyXG4gICAgICBpZiAodHlwZW9mICh0YWdGcm9tKSAhPSAndW5kZWZpbmVkJyAmJiB0YWdGcm9tLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjYWxNb3JlSW1hZ2VJbmZvKGUsIGlkeCwgdGhhdCwgdGFnRnJvbSlcclxuICAgICAgfSBcclxuICAgIH1cclxuICAgIC8vIOWBh+W+queOr+iOt+WPluiuoeeul+WbvueJh+inhuinieacgOS9s+WuvemrmFxyXG4gICAgZnVuY3Rpb24gY2FsTW9yZUltYWdlSW5mbyhlLCBpZHgsIHRoYXQsIGJpbmROYW1lKSB7XHJcbiAgICAgIHZhciB0ZW1EYXRhID0gdGhhdC5kYXRhW2JpbmROYW1lXTtcclxuICAgICAgaWYgKHRlbURhdGEuaW1hZ2VzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciB0ZW1JbWFnZXMgPSB0ZW1EYXRhLmltYWdlcztcclxuICAgICAgLy/lm6DkuLrml6Dms5Xojrflj5Z2aWV35a695bqmIOmcgOimgeiHquWumuS5iXBhZGRpbmfov5vooYzorqHnrpfvvIznqI3lkI7lpITnkIZcclxuICAgICAgdmFyIHJlY2FsID0gd3hBdXRvSW1hZ2VDYWwoZS5kZXRhaWwud2lkdGgsIGUuZGV0YWlsLmhlaWdodCx0aGF0LGJpbmROYW1lKTsgXHJcbiAgICAgIHRlbUltYWdlc1tpZHhdLndpZHRoID0gcmVjYWwuaW1hZ2VXaWR0aDtcclxuICAgICAgdGVtSW1hZ2VzW2lkeF0uaGVpZ2h0ID0gcmVjYWwuaW1hZ2VoZWlnaHQ7IFxyXG4gICAgICB0ZW1EYXRhLmltYWdlcyA9IHRlbUltYWdlcztcclxuICAgICAgdmFyIGJpbmREYXRhID0ge307XHJcbiAgICAgIGJpbmREYXRhW2JpbmROYW1lXSA9IHRlbURhdGE7XHJcbiAgICAgIHRoYXQuc2V0RGF0YShiaW5kRGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIOiuoeeul+inhuinieS8mOWFiOeahOWbvueJh+WuvemrmFxyXG4gICAgZnVuY3Rpb24gd3hBdXRvSW1hZ2VDYWwob3JpZ2luYWxXaWR0aCwgb3JpZ2luYWxIZWlnaHQsdGhhdCxiaW5kTmFtZSkge1xyXG4gICAgICAvL+iOt+WPluWbvueJh+eahOWOn+Wni+mVv+WuvVxyXG4gICAgICB2YXIgd2luZG93V2lkdGggPSAwLCB3aW5kb3dIZWlnaHQgPSAwO1xyXG4gICAgICB2YXIgYXV0b1dpZHRoID0gMCwgYXV0b0hlaWdodCA9IDA7XHJcbiAgICAgIHZhciByZXN1bHRzID0ge307XHJcbiAgICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgIHZhciBwYWRkaW5nID0gdGhhdC5kYXRhW2JpbmROYW1lXS52aWV3LmltYWdlUGFkZGluZztcclxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gcmVzLndpbmRvd1dpZHRoLTIqcGFkZGluZztcclxuICAgICAgICAgIHdpbmRvd0hlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAvL+WIpOaWreaMieeFp+mCo+enjeaWueW8j+i/m+ihjOe8qeaUvlxyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ3aW5kb3dXaWR0aFwiICsgd2luZG93V2lkdGgpO1xyXG4gICAgICAgICAgaWYgKG9yaWdpbmFsV2lkdGggPiB3aW5kb3dXaWR0aCkgey8v5Zyo5Zu+54mHd2lkdGjlpKfkuo7miYvmnLrlsY/luZV3aWR0aOaXtuWAmVxyXG4gICAgICAgICAgICBhdXRvV2lkdGggPSB3aW5kb3dXaWR0aDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhdXRvV2lkdGhcIiArIGF1dG9XaWR0aCk7XHJcbiAgICAgICAgICAgIGF1dG9IZWlnaHQgPSAoYXV0b1dpZHRoICogb3JpZ2luYWxIZWlnaHQpIC8gb3JpZ2luYWxXaWR0aDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhdXRvSGVpZ2h0XCIgKyBhdXRvSGVpZ2h0KTtcclxuICAgICAgICAgICAgcmVzdWx0cy5pbWFnZVdpZHRoID0gYXV0b1dpZHRoO1xyXG4gICAgICAgICAgICByZXN1bHRzLmltYWdlaGVpZ2h0ID0gYXV0b0hlaWdodDtcclxuICAgICAgICAgIH0gZWxzZSB7Ly/lkKbliJnlsZXnpLrljp/mnaXnmoTmlbDmja5cclxuICAgICAgICAgICAgcmVzdWx0cy5pbWFnZVdpZHRoID0gb3JpZ2luYWxXaWR0aDtcclxuICAgICAgICAgICAgcmVzdWx0cy5pbWFnZWhlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHd4UGFyc2VUZW1BcnJheSh0ZW1BcnJheU5hbWUsYmluZE5hbWVSZWcsdG90YWwsdGhhdCl7XHJcbiAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICB2YXIgdGVtRGF0YSA9IHRoYXQuZGF0YTtcclxuICAgICAgdmFyIG9iaiA9IG51bGw7XHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKXtcclxuICAgICAgICB2YXIgc2ltQXJyID0gdGVtRGF0YVtiaW5kTmFtZVJlZytpXS5ub2RlcztcclxuICAgICAgICBhcnJheS5wdXNoKHNpbUFycik7XHJcbiAgICAgIH1cclxuICAgIFxyXG4gICAgICB0ZW1BcnJheU5hbWUgPSB0ZW1BcnJheU5hbWUgfHwgJ3d4UGFyc2VUZW1BcnJheSc7XHJcbiAgICAgIG9iaiA9IEpTT04ucGFyc2UoJ3tcIicrIHRlbUFycmF5TmFtZSArJ1wiOlwiXCJ9Jyk7XHJcbiAgICAgIG9ialt0ZW1BcnJheU5hbWVdID0gYXJyYXk7XHJcbiAgICAgIHRoYXQuc2V0RGF0YShvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVmFsaWRQaG9uZShzdHIpIHtcclxuICAgICAgdmFyIG15cmVnID0gL15bMV1bMyw0LDUsNyw4XVswLTldezl9JC87XHJcbiAgICAgIGlmICghbXlyZWcudGVzdChzdHIpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBmb3JtYXQoZGF0ZSkge1xyXG4gICAgICB2YXIgeXkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7ICAgICAgLy/lubRcclxuICB2YXIgbW0gPSBkYXRlLmdldE1vbnRoKCkgKyAxOyAgICAgLy/mnIhcclxuICAgICAgdmFyIGRkID0gZGF0ZS5nZXREYXRlKCk7ICAgICAgICAgIC8v5pelXHJcbiAgICAgIHZhciBoaCA9IGRhdGUuZ2V0SG91cnMoKTsgICAgICAgICAvL+aXtlxyXG4gICAgICB2YXIgaWkgPSBkYXRlLmdldE1pbnV0ZXMoKTsgICAgICAgLy/liIZcclxuICAgICAgdmFyIHNzID0gZGF0ZS5nZXRTZWNvbmRzKCk7ICAgICAgIC8v56eSXHJcbiAgICAgIHZhciBjbG9jayA9IHl5ICsgXCItXCI7XHJcbiAgICAgIGlmIChtbSA8IDEwKSBjbG9jayArPSBcIjBcIjtcclxuICAgICAgY2xvY2sgKz0gbW0gKyBcIi1cIjtcclxuICAgICAgaWYgKGRkIDwgMTApIGNsb2NrICs9IFwiMFwiO1xyXG4gICAgICBjbG9jayArPSBkZCArIFwiIFwiO1xyXG4gICAgICBpZiAoaGggPCAxMCkgY2xvY2sgKz0gXCIwXCI7XHJcbiAgY2xvY2sgKz0gaGggKyBcIjpcIjtcclxuICAgICAgaWYgKGlpIDwgMTApIGNsb2NrICs9ICcwJztcclxuICAgICAgY2xvY2sgKz0gaWkgKyBcIjpcIjtcclxuICAgICAgaWYgKHNzIDwgMTApIGNsb2NrICs9ICcwJztcclxuICAgICAgY2xvY2sgKz0gc3M7XHJcbiAgICAgIHJldHVybiBjbG9jaztcclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gZ2V0RGF0ZShkYXRlKSB7XHJcbiAgICAgIHZhciBkID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgIHZhciBkMSA9IGZvcm1hdChkKTtcclxuICAgICAgcmV0dXJuIGQxO1xyXG4gIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDphY3nva5lbW9qaXNcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGVtb2ppc0luaXQocmVnPScnLGJhc2VTcmM9XCIvd3hQYXJzZS9lbW9qaXMvXCIsZW1vamlzKXtcclxuICAgICAgIEh0bWxUb0pzb24uZW1vamlzSW5pdChyZWcsYmFzZVNyYyxlbW9qaXMpO1xyXG4gICAgfVxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7ICBcclxuICAgICAgaGV4TUQ1OiBoZXhNRDUsXHJcbiAgICAgIGltZ1VybDppbWdVcmwsXHJcbiAgICAgIGZpbGRlck5hbWU6ZmlsZGVyTmFtZSxcclxuICAgICAgd2FzaFR5cGU6d2FzaFR5cGUsXHJcbiAgICAgIGNhbWNld3I6Y2FtY2V3cixcclxuICAgICAgd3hQYXJzZTogd3hQYXJzZSxcclxuICAgICAgd3hQYXJzZVRlbUFycmF5Ond4UGFyc2VUZW1BcnJheSxcclxuICAgICAgZW1vamlzSW5pdDplbW9qaXNJbml0LFxyXG4gICAgICBpc1ZhbGlkUGhvbmU6aXNWYWxpZFBob25lLFxyXG4gICAgICBnZXREYXRlOmdldERhdGVcclxuICAgIH0iXX0=