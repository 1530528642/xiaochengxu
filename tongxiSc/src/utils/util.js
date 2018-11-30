const daaty =  require("../utils/api2")
const apis =  require("../utils/api")
const showdown = require("./showdown.js");
const HtmlToJson = require("./html2json.js");
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
    function safe_add(x, y)  
    {  
      var lsw = (x & 0xFFFF) + (y & 0xFFFF)  
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16)  
      return (msw << 16) | (lsw & 0xFFFF)  
    }  
      
    /* 
     * Bitwise rotate a 32-bit number to the left. 
     */  
    function rol(num, cnt)  
    {  
      return (num << cnt) | (num >>> (32 - cnt))  
    }  
      
    /* 
     * These functions implement the four basic operations the algorithm uses. 
     */  
    function cmn(q, a, b, x, s, t)  
    {  
      return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)  
    }  
    function ff(a, b, c, d, x, s, t)  
    {  
      return cmn((b & c) | ((~b) & d), a, b, x, s, t)  
    }  
    function gg(a, b, c, d, x, s, t)  
    {  
      return cmn((b & d) | (c & (~d)), a, b, x, s, t)  
    }  
    function hh(a, b, c, d, x, s, t)  
    {  
      return cmn(b ^ c ^ d, a, b, x, s, t)  
    }  
    function ii(a, b, c, d, x, s, t)  
    {  
      return cmn(c ^ (b | (~d)), a, b, x, s, t)  
    }  
      
    /* 
     * Calculate the MD5 of an array of little-endian words, producing an array 
     * of little-endian words. 
     */  
    function coreMD5(x)  
    {  
      var a =  1732584193  
      var b = -271733879  
      var c = -1732584194  
      var d =  271733878  
      
      for(var i = 0; i < x.length; i += 16)  
      {  
        var olda = a  
        var oldb = b  
        var oldc = c  
        var oldd = d  
      
        a = ff(a, b, c, d, x[i+ 0], 7 , -680876936)  
        d = ff(d, a, b, c, x[i+ 1], 12, -389564586)  
        c = ff(c, d, a, b, x[i+ 2], 17,  606105819)  
        b = ff(b, c, d, a, x[i+ 3], 22, -1044525330)  
        a = ff(a, b, c, d, x[i+ 4], 7 , -176418897)  
        d = ff(d, a, b, c, x[i+ 5], 12,  1200080426)  
        c = ff(c, d, a, b, x[i+ 6], 17, -1473231341)  
        b = ff(b, c, d, a, x[i+ 7], 22, -45705983)  
        a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416)  
        d = ff(d, a, b, c, x[i+ 9], 12, -1958414417)  
        c = ff(c, d, a, b, x[i+10], 17, -42063)  
        b = ff(b, c, d, a, x[i+11], 22, -1990404162)  
        a = ff(a, b, c, d, x[i+12], 7 ,  1804603682)  
        d = ff(d, a, b, c, x[i+13], 12, -40341101)  
        c = ff(c, d, a, b, x[i+14], 17, -1502002290)  
        b = ff(b, c, d, a, x[i+15], 22,  1236535329)  
      
        a = gg(a, b, c, d, x[i+ 1], 5 , -165796510)  
        d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632)  
        c = gg(c, d, a, b, x[i+11], 14,  643717713)  
        b = gg(b, c, d, a, x[i+ 0], 20, -373897302)  
        a = gg(a, b, c, d, x[i+ 5], 5 , -701558691)  
        d = gg(d, a, b, c, x[i+10], 9 ,  38016083)  
        c = gg(c, d, a, b, x[i+15], 14, -660478335)  
        b = gg(b, c, d, a, x[i+ 4], 20, -405537848)  
        a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438)  
        d = gg(d, a, b, c, x[i+14], 9 , -1019803690)  
        c = gg(c, d, a, b, x[i+ 3], 14, -187363961)  
        b = gg(b, c, d, a, x[i+ 8], 20,  1163531501)  
        a = gg(a, b, c, d, x[i+13], 5 , -1444681467)  
        d = gg(d, a, b, c, x[i+ 2], 9 , -51403784)  
        c = gg(c, d, a, b, x[i+ 7], 14,  1735328473)  
        b = gg(b, c, d, a, x[i+12], 20, -1926607734)  
      
        a = hh(a, b, c, d, x[i+ 5], 4 , -378558)  
        d = hh(d, a, b, c, x[i+ 8], 11, -2022574463)  
        c = hh(c, d, a, b, x[i+11], 16,  1839030562)  
        b = hh(b, c, d, a, x[i+14], 23, -35309556)  
        a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060)  
        d = hh(d, a, b, c, x[i+ 4], 11,  1272893353)  
        c = hh(c, d, a, b, x[i+ 7], 16, -155497632)  
        b = hh(b, c, d, a, x[i+10], 23, -1094730640)  
        a = hh(a, b, c, d, x[i+13], 4 ,  681279174)  
        d = hh(d, a, b, c, x[i+ 0], 11, -358537222)  
        c = hh(c, d, a, b, x[i+ 3], 16, -722521979)  
        b = hh(b, c, d, a, x[i+ 6], 23,  76029189)  
        a = hh(a, b, c, d, x[i+ 9], 4 , -640364487)  
        d = hh(d, a, b, c, x[i+12], 11, -421815835)  
        c = hh(c, d, a, b, x[i+15], 16,  530742520)  
        b = hh(b, c, d, a, x[i+ 2], 23, -995338651)  
      
        a = ii(a, b, c, d, x[i+ 0], 6 , -198630844)  
        d = ii(d, a, b, c, x[i+ 7], 10,  1126891415)  
        c = ii(c, d, a, b, x[i+14], 15, -1416354905)  
        b = ii(b, c, d, a, x[i+ 5], 21, -57434055)  
        a = ii(a, b, c, d, x[i+12], 6 ,  1700485571)  
        d = ii(d, a, b, c, x[i+ 3], 10, -1894986606)  
        c = ii(c, d, a, b, x[i+10], 15, -1051523)  
        b = ii(b, c, d, a, x[i+ 1], 21, -2054922799)  
        a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359)  
        d = ii(d, a, b, c, x[i+15], 10, -30611744)  
        c = ii(c, d, a, b, x[i+ 6], 15, -1560198380)  
        b = ii(b, c, d, a, x[i+13], 21,  1309151649)  
        a = ii(a, b, c, d, x[i+ 4], 6 , -145523070)  
        d = ii(d, a, b, c, x[i+11], 10, -1120210379)  
        c = ii(c, d, a, b, x[i+ 2], 15,  718787259)  
        b = ii(b, c, d, a, x[i+ 9], 21, -343485551)  
      
        a = safe_add(a, olda)  
        b = safe_add(b, oldb)  
        c = safe_add(c, oldc)  
        d = safe_add(d, oldd)  
      }  
      return [a, b, c, d]  
    }  
      
    /* 
     * Convert an array of little-endian words to a hex string. 
     */  
    function binl2hex(binarray)  
    {  
      var hex_tab = "0123456789abcdef"  
      var str = ""  
      for(var i = 0; i < binarray.length * 4; i++)  
      {  
        str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +  
               hex_tab.charAt((binarray[i>>2] >> ((i%4)*8)) & 0xF)  
      }  
      return str  
    }  
      
    /* 
     * Convert an array of little-endian words to a base64 encoded string. 
     */  
    function binl2b64(binarray)  
    {  
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"  
      var str = ""  
      for(var i = 0; i < binarray.length * 32; i += 6)  
      {  
        str += tab.charAt(((binarray[i>>5] << (i%32)) & 0x3F) |  
                          ((binarray[i>>5+1] >> (32-i%32)) & 0x3F))  
      }  
      return str  
    }  
      
    /* 
     * Convert an 8-bit character string to a sequence of 16-word blocks, stored 
     * as an array, and append appropriate padding for MD4/5 calculation. 
     * If any of the characters are >255, the high byte is silently ignored. 
     */  
    function str2binl(str)  
    {  
      var nblk = ((str.length + 8) >> 6) + 1 // number of 16-word blocks  
      var blks = new Array(nblk * 16)  
      for(var i = 0; i < nblk * 16; i++) blks[i] = 0  
      for(var i = 0; i < str.length; i++)  
        blks[i>>2] |= (str.charCodeAt(i) & 0xFF) << ((i%4) * 8)  
      blks[i>>2] |= 0x80 << ((i%4) * 8)  
      blks[nblk*16-2] = str.length * 8  
      return blks  
    }  
      
    /* 
     * Convert a wide-character string to a sequence of 16-word blocks, stored as 
     * an array, and append appropriate padding for MD4/5 calculation. 
     */  
    function strw2binl(str)  
    {  
      var nblk = ((str.length + 4) >> 5) + 1 // number of 16-word blocks  
      var blks = new Array(nblk * 16)  
      for(var i = 0; i < nblk * 16; i++) blks[i] = 0  
      for(var i = 0; i < str.length; i++)  
        blks[i>>1] |= str.charCodeAt(i) << ((i%2) * 16)  
      blks[i>>1] |= 0x80 << ((i%2) * 16)  
      blks[nblk*16-2] = str.length * 16  
      return blks  
    }  
      
    /* 
     * External interface 
     */  
    function hexMD5 (str) { return binl2hex(coreMD5( str2binl(str))) }  
    function hexMD5w(str) { return binl2hex(coreMD5(strw2binl(str))) }  
    function b64MD5 (str) { return binl2b64(coreMD5( str2binl(str))) }  
    function b64MD5w(str) { return binl2b64(coreMD5(strw2binl(str))) }  
    /* Backward compatibility */  
    function calcMD5(str) { return binl2hex(coreMD5( str2binl(str))) }  

    function imgUrl(urls){
      var urltwo = apis.domainy+"/wxfile/shdImg/251428445677289315.png";
      if(urls == undefined){
        return urltwo;
      }
        var index= urls.indexOf("."); //得到"."在第几位
        var urlss=urls.substring(index); //截断"."之前的，得到后缀
        if(urlss!=".bmp"||urlss!=".png"||urlss!=".gif"||urlss!=".jpg"||urlss!=".jpeg"){  //根据后缀，判断是否符合图片格式
          var urlss2=urls.substring(0,4);
          if(urlss2=="http"){  //根据后缀，判断是否符合图片格式
            return urls;
          }else{
            return apis.domainy+urls;
          }
        }else{
          return urltwo;
        }
    }

    function filderName(names){
        var newNmae;
        if(names == undefined){
          return names;
        }
        if(names.length>6){
          newNmae = names.substring(0,6);
          newNmae = newNmae+"···"
           return newNmae
        }else{
          return names;
        }
    }

    function washType(types){
          var newType;
          switch(types){
              case 1:
              newType = "充值"
              break;
              case 2:
              newType = "套餐赠送"
              break;
              case 3:
              newType = "会员洗车"
              break;
              case 4:
              newType = "消费次数"
              break;
              case 5:
              newType = "限时消费"
              break;
              case 6:
              newType = "非会员洗车"
              break;
              case 7:
              newType = "充值码充值"
              break;
              case 8:
              newType = "积分洗车"
              break;
              case 9:
              newType = "轿车洗车"
              break;
              case 10:
              newType = "SUV洗车"
              break;
          }
          return newType;
    }

    function camcewr(cars,types,index,thisy){
      var message = thisy.data.cardList;
      let sloabloState = thisy.data.sloabloState
      if(index != "a"||index == 0){
        for (let i=0;i<message.length;i++) { //遍历列表数据
          if (i == index) { //根据下标找到目标
            var collectStatus = false
              if(types == 1){
                    if (message[i].isCollections == 0) { //如果是没收藏+1
                        collectStatus = true
                          message[i].isCollections = parseInt(message[i].isCollections) + 1
                          message[i].collections = parseInt(message[i].collections) + 1
                          ajsay(cars,types,1)
                      } else {
                        collectStatus = false
                        message[i].isCollections = parseInt(message[i].isCollections) - 1
                        message[i].collections = parseInt(message[i].collections) - 1
                        ajsay(cars,types,2)
                      }
              }else{
                    if (message[i].isGood == 0) { //如果是没点赞+1
                      collectStatus = true
                        message[i].isGood = parseInt(message[i].isGood) + 1
                        message[i].goods = parseInt(message[i].goods) + 1
                        ajsay(cars,types,1)
                    } else {
                      collectStatus = false
                      message[i].isGood = parseInt(message[i].isGood) - 1
                      message[i].goods = parseInt(message[i].goods) - 1
                      ajsay(cars,types,2)
                    }
              }
              actxt()
          }
        }
  
      }else{
        var collectStatus = false
        if(types == 1){
              if (sloabloState.isCollections == 0) { //如果是没收藏+1
                  collectStatus = true
                  sloabloState.isCollections = parseInt(sloabloState.isCollections) + 1
                  sloabloState.collections = parseInt(sloabloState.collections) + 1
                    ajsay(cars,types,1)
                } else {
                  collectStatus = false
                  sloabloState.isCollections = parseInt(sloabloState.isCollections) - 1
                  sloabloState.collections = parseInt(sloabloState.collections) - 1
                  ajsay(cars,types,2)
                }
        }else{
              if (sloabloState.isGood == 0) { //如果是没点赞+1
                collectStatus = true
                console.log(sloabloState.goods)
                sloabloState.isGood = parseInt(sloabloState.isGood) + 1
                sloabloState.goods = parseInt(sloabloState.goods) + 1
                console.log(sloabloState.goods)
                  ajsay(cars,types,1)
              } else {
                collectStatus = false
                sloabloState.isGood = parseInt(sloabloState.isGood) - 1
                sloabloState.goods = parseInt(sloabloState.goods) - 1
                ajsay(cars,types,2)
              }
        }
               actxt() 
      }

      function ajsay(cars,types,nuy){
        if(nuy == 1){
            daaty.cardOperation(thisy.data.user.userId,cars,types,null,successFa2);
          function successFa2(data, sourceObj){
          }
        }else{
          daaty.delCardOperation(thisy.data.user.userId,cars,types,null,successFa2);
          function successFa2(data, sourceObj){
            }
        }
      }

      function actxt(){
        if(types == 1){
          wx.showToast({
            title: collectStatus ? '收藏成功' : '取消收藏',
          })
        }else{
          wx.showToast({
            title: collectStatus ? '点赞成功' : '取消点赞',
          })
        }
      }
      thisy.setData({
        cardList: message,
        sloabloState:sloabloState
      })
      console.log(thisy.data.sloabloState.goods)
    }

    function wxParse(bindName = 'wxParseData', type='html', data='<div class="color:red;">数据不能为空</div>', target,imagePadding) {
      var that = target;
      var transData = {};//存放转化后的数据
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
      if(typeof(imagePadding) != 'undefined'){
        transData.view.imagePadding = imagePadding
      }
      var bindData = {};
      bindData[bindName] = transData;
      that.setData(bindData)
      that.wxParseImgLoad = wxParseImgLoad;
      that.wxParseImgTap = wxParseImgTap;
    }
    // 图片点击事件
    function wxParseImgTap(e) {
      var that = this;
      var nowImgUrl = e.target.dataset.src;
      var tagFrom = e.target.dataset.from;
      if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
        wx.previewImage({
          current: nowImgUrl, // 当前显示图片的http链接
          urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
        })
      }
    }
    
    /**
     * 图片视觉宽高计算函数区 
     **/
    function wxParseImgLoad(e) {
      var that = this;
      var tagFrom = e.target.dataset.from;
      var idx = e.target.dataset.idx;
      if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
        calMoreImageInfo(e, idx, that, tagFrom)
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
      var recal = wxAutoImageCal(e.detail.width, e.detail.height,that,bindName); 
      temImages[idx].width = recal.imageWidth;
      temImages[idx].height = recal.imageheight; 
      temData.images = temImages;
      var bindData = {};
      bindData[bindName] = temData;
      that.setData(bindData);
    }
    
    // 计算视觉优先的图片宽高
    function wxAutoImageCal(originalWidth, originalHeight,that,bindName) {
      //获取图片的原始长宽
      var windowWidth = 0, windowHeight = 0;
      var autoWidth = 0, autoHeight = 0;
      var results = {};
      wx.getSystemInfo({
        success: function (res) {
          var padding = that.data[bindName].view.imagePadding;
          windowWidth = res.windowWidth-2*padding;
          windowHeight = res.windowHeight;
          //判断按照那种方式进行缩放
          // console.log("windowWidth" + windowWidth);
          if (originalWidth > windowWidth) {//在图片width大于手机屏幕width时候
            autoWidth = windowWidth;
            // console.log("autoWidth" + autoWidth);
            autoHeight = (autoWidth * originalHeight) / originalWidth;
            // console.log("autoHeight" + autoHeight);
            results.imageWidth = autoWidth;
            results.imageheight = autoHeight;
          } else {//否则展示原来的数据
            results.imageWidth = originalWidth;
            results.imageheight = originalHeight;
          }
        }
      })
      return results;
    }
    
    function wxParseTemArray(temArrayName,bindNameReg,total,that){
      var array = [];
      var temData = that.data;
      var obj = null;
      for(var i = 0; i < total; i++){
        var simArr = temData[bindNameReg+i].nodes;
        array.push(simArr);
      }
    
      temArrayName = temArrayName || 'wxParseTemArray';
      obj = JSON.parse('{"'+ temArrayName +'":""}');
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
      var yy = date.getFullYear();      //年
  var mm = date.getMonth() + 1;     //月
      var dd = date.getDate();          //日
      var hh = date.getHours();         //时
      var ii = date.getMinutes();       //分
      var ss = date.getSeconds();       //秒
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
    
    function emojisInit(reg='',baseSrc="/wxParse/emojis/",emojis){
       HtmlToJson.emojisInit(reg,baseSrc,emojis);
    }
    module.exports = {  
      hexMD5: hexMD5,
      imgUrl:imgUrl,
      filderName:filderName,
      washType:washType,
      camcewr:camcewr,
      wxParse: wxParse,
      wxParseTemArray:wxParseTemArray,
      emojisInit:emojisInit,
      isValidPhone:isValidPhone,
      getDate:getDate
    }  