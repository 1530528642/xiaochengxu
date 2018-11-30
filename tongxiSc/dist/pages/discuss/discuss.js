"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
var app = getApp();
var cache = require("../../utils/cache.js");
var tip = require("../../utils/tip.js");
exports.default = Page({
  data: {
    valueId: 0,
    topic: {},
    content: '',
    stars: [0, 1, 2, 3, 4],
    star: 5,
    starText: '十分满意',
    hasPicture: false,
    picUrls: [],
    files: []
  },
  chooseImage: function chooseImage(e) {
    if (this.data.files.length >= 5) {
      tip.showToast('只能上传五张图片');
      return false;
    }

    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function success(res) {
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        // that.upload(res);
      }
    });
  },
  // upload: function (res) {
  //   var that = this;
  //   const uploadTask = wx.uploadFile({
  //     url: "https://www.tongxikj.com/my/api/v1/storage/upload",
  //     filePath: res.tempFilePaths[0],
  //     name: 'file',
  //     success: function (res) {
  //       console.log(res.data)
  //       // var _res = JSON.parse(res.data);
  //       // if (_res.errno === 0) {
  //         // var url = _res.data.url
  //         // that.data.picUrls.push(url)
  //         // that.setData({
  //         //   hasPicture: true,
  //         //   picUrls: that.data.picUrls
  //         // })
  //       // }
  //     },
  //     fail: function (e) {
  //       wx.showModal({
  //         title: '错误',
  //         content: '上传失败',
  //         showCancel: false
  //       })
  //     },
  //   })

  //   uploadTask.onProgressUpdate((res) => {
  //     console.log('上传进度', res.progress)
  //     console.log('已经上传的数据长度', res.totalBytesSent)
  //     console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
  //   })

  // },
  previewImage: function previewImage(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    });
  },
  selectRater: function selectRater(e) {
    var star = e.currentTarget.dataset.star + 1;
    var starText;
    if (star == 1) {
      starText = '很差';
    } else if (star == 2) {
      starText = '不太满意';
    } else if (star == 3) {
      starText = '满意';
    } else if (star == 4) {
      starText = '比较满意';
    } else {
      starText = '十分满意';
    }
    this.setData({
      star: star,
      starText: starText
    });
  },
  onLoad: function onLoad(options) {
    // console.log(app.globalData)
    var thisty = this;
    var userid = app.globalData.user.userId;
    this.setData({ userid: userid });
    daaty.getProductSN(userid, 3, null, successFa);
    function successFa(data, sourceObj) {
      thisty.setData({ sn: data.data.sn });
    }
    if (parseInt(options.typeId) !== 1) {
      return;
    }

    var that = this;
    that.setData({
      valueId: options.valueId
    });
    this.getTopic();
  },
  getTopic: function getTopic() {
    var that = this;
    daaty.TopicDetail(that.data.valueId, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        topic: res.data
      });
    }
  },
  onClose: function onClose() {
    wx.navigateBack();
  },
  onPost: function onPost() {
    var that = this;
    var hasPicture = void 0;
    var state = void 0;
    // console.log(that.data.files)
    if (!this.data.content) {
      tip.showToast('请填写评论');
      return false;
    }
    console.log(that.data.files.length, "111111");
    // return false
    if (that.data.files.length > 0) {
      var successFay = function successFay() {
        var data = cache.getSync(numy);
        console.log(data, '222222');
        // state = data
        //  console.log(that.data.files.length,state,33333333)
        //  if(state == that.data.files.length){
        //      console.log("成功")
        //      //  pnTxt()
        //    }
      };
      // state++


      hasPicture = 1;
      daaty.uploadFile(that.data.files, 0, 0, 0, that.data.files.length, that.data.sn, that.data.userid, 13, successFay);
    } else {
      hasPicture = 0;
      pnTxt();
    }
    function pnTxt() {
      daaty.CommentPost(that.data.userid, 1, that.data.valueId, that.data.content, that.data.star, hasPicture, null, successFay);
      function successFay(res, sourceObj) {
        //  console.log(res)
        wx.showToast({
          title: '评论成功',
          complete: function complete() {
            setTimeout(function () {
              wx.navigateBack();
            }, 1500);
          }
        });
      }
    }
  },
  bindInputValue: function bindInputValue(event) {

    var value = event.detail.value;

    //判断是否超过140个字符
    if (value && value.length > 140) {
      return false;
    }

    this.setData({
      content: event.detail.value
    });
  },

  onReady: function onReady() {},
  onShow: function onShow() {
    // 页面显示

  },
  onHide: function onHide() {
    // 页面隐藏

  },
  onUnload: function onUnload() {
    // 页面关闭

  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2N1c3Mud3hwIl0sIm5hbWVzIjpbImRhYXR5IiwicmVxdWlyZSIsImFwcCIsImdldEFwcCIsImNhY2hlIiwidGlwIiwiZGF0YSIsInZhbHVlSWQiLCJ0b3BpYyIsImNvbnRlbnQiLCJzdGFycyIsInN0YXIiLCJzdGFyVGV4dCIsImhhc1BpY3R1cmUiLCJwaWNVcmxzIiwiZmlsZXMiLCJjaG9vc2VJbWFnZSIsImUiLCJsZW5ndGgiLCJzaG93VG9hc3QiLCJ0aGF0Iiwid3giLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJzZXREYXRhIiwiY29uY2F0IiwidGVtcEZpbGVQYXRocyIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJ1cmxzIiwic2VsZWN0UmF0ZXIiLCJkYXRhc2V0Iiwib25Mb2FkIiwib3B0aW9ucyIsInRoaXN0eSIsInVzZXJpZCIsImdsb2JhbERhdGEiLCJ1c2VyIiwidXNlcklkIiwiZ2V0UHJvZHVjdFNOIiwic3VjY2Vzc0ZhIiwic291cmNlT2JqIiwic24iLCJwYXJzZUludCIsInR5cGVJZCIsImdldFRvcGljIiwiVG9waWNEZXRhaWwiLCJzdWNjZXNzRmF5Iiwib25DbG9zZSIsIm5hdmlnYXRlQmFjayIsIm9uUG9zdCIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsImdldFN5bmMiLCJudW15IiwidXBsb2FkRmlsZSIsInBuVHh0IiwiQ29tbWVudFBvc3QiLCJ0aXRsZSIsImNvbXBsZXRlIiwic2V0VGltZW91dCIsImJpbmRJbnB1dFZhbHVlIiwiZXZlbnQiLCJ2YWx1ZSIsImRldGFpbCIsIm9uUmVhZHkiLCJvblNob3ciLCJvbkhpZGUiLCJvblVubG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxRQUFTQyxRQUFRLHFCQUFSLENBQWY7QUFDQSxJQUFNQyxNQUFNQyxRQUFaO0FBQ0EsSUFBTUMsUUFBUUgsUUFBUSxzQkFBUixDQUFkO0FBQ0Es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RXBCLEM7QUFDREMsVUFBUSxrQkFBWTtBQUNsQjs7QUFFRCxHO0FBQ0RDLFVBQVEsa0JBQVk7QUFDbEI7O0FBRUQsRztBQUNEQyxZQUFVLG9CQUFZO0FBQ3BCOztBQUVEIiwiZmlsZSI6ImRpc2N1c3Mud3hwIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGFhdHkgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaTIuanNcIilcbmNvbnN0IGFwcCA9IGdldEFwcCgpXG5jb25zdCBjYWNoZSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9jYWNoZS5qc1wiKVxudmFyIHRpcCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy90aXAuanNcIilcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivhOiuuicsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7fVxuICB9LFxuICAgZGF0YToge1xuICAgIHZhbHVlSWQ6IDAsXG4gICAgdG9waWM6IHt9LFxuICAgIGNvbnRlbnQ6ICcnLFxuICAgIHN0YXJzOiBbMCwgMSwgMiwgMywgNF0sXG4gICAgc3RhcjogNSxcbiAgICBzdGFyVGV4dDogJ+WNgeWIhua7oeaEjycsXG4gICAgaGFzUGljdHVyZTogZmFsc2UsXG4gICAgcGljVXJsczogW10sXG4gICAgZmlsZXM6IFtdXG4gIH0sXG4gIGNob29zZUltYWdlOiBmdW5jdGlvbiAoZSkge1xuICAgIGlmICh0aGlzLmRhdGEuZmlsZXMubGVuZ3RoID49IDUpIHtcbiAgICAgIHRpcC5zaG93VG9hc3QoJ+WPquiDveS4iuS8oOS6lOW8oOWbvueJhycpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgIGNvdW50OiA1LFxuICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBmaWxlczogdGhhdC5kYXRhLmZpbGVzLmNvbmNhdChyZXMudGVtcEZpbGVQYXRocylcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRoYXQudXBsb2FkKHJlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8gdXBsb2FkOiBmdW5jdGlvbiAocmVzKSB7XG4gIC8vICAgdmFyIHRoYXQgPSB0aGlzO1xuICAvLyAgIGNvbnN0IHVwbG9hZFRhc2sgPSB3eC51cGxvYWRGaWxlKHtcbiAgLy8gICAgIHVybDogXCJodHRwczovL3d3dy50b25neGlrai5jb20vbXkvYXBpL3YxL3N0b3JhZ2UvdXBsb2FkXCIsXG4gIC8vICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aHNbMF0sXG4gIC8vICAgICBuYW1lOiAnZmlsZScsXG4gIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gIC8vICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAvLyAgICAgICAvLyB2YXIgX3JlcyA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAvLyAgICAgICAvLyBpZiAoX3Jlcy5lcnJubyA9PT0gMCkge1xuICAvLyAgICAgICAgIC8vIHZhciB1cmwgPSBfcmVzLmRhdGEudXJsXG4gIC8vICAgICAgICAgLy8gdGhhdC5kYXRhLnBpY1VybHMucHVzaCh1cmwpXG4gIC8vICAgICAgICAgLy8gdGhhdC5zZXREYXRhKHtcbiAgLy8gICAgICAgICAvLyAgIGhhc1BpY3R1cmU6IHRydWUsXG4gIC8vICAgICAgICAgLy8gICBwaWNVcmxzOiB0aGF0LmRhdGEucGljVXJsc1xuICAvLyAgICAgICAgIC8vIH0pXG4gIC8vICAgICAgIC8vIH1cbiAgLy8gICAgIH0sXG4gIC8vICAgICBmYWlsOiBmdW5jdGlvbiAoZSkge1xuICAvLyAgICAgICB3eC5zaG93TW9kYWwoe1xuICAvLyAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgLy8gICAgICAgICBjb250ZW50OiAn5LiK5Lyg5aSx6LSlJyxcbiAgLy8gICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAvLyAgICAgICB9KVxuICAvLyAgICAgfSxcbiAgLy8gICB9KVxuXG4gIC8vICAgdXBsb2FkVGFzay5vblByb2dyZXNzVXBkYXRlKChyZXMpID0+IHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKCfkuIrkvKDov5vluqYnLCByZXMucHJvZ3Jlc3MpXG4gIC8vICAgICBjb25zb2xlLmxvZygn5bey57uP5LiK5Lyg55qE5pWw5o2u6ZW/5bqmJywgcmVzLnRvdGFsQnl0ZXNTZW50KVxuICAvLyAgICAgY29uc29sZS5sb2coJ+mihOacn+mcgOimgeS4iuS8oOeahOaVsOaNruaAu+mVv+W6picsIHJlcy50b3RhbEJ5dGVzRXhwZWN0ZWRUb1NlbmQpXG4gIC8vICAgfSlcblxuICAvLyB9LFxuICBwcmV2aWV3SW1hZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgIGN1cnJlbnQ6IGUuY3VycmVudFRhcmdldC5pZCwgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxuICAgICAgdXJsczogdGhpcy5kYXRhLmZpbGVzIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcbiAgICB9KVxuICB9LFxuICBzZWxlY3RSYXRlcjogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgc3RhciA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnN0YXIgKyAxO1xuICAgIHZhciBzdGFyVGV4dDtcbiAgICBpZiAoc3RhciA9PSAxKSB7XG4gICAgICBzdGFyVGV4dCA9ICflvojlt64nO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdGFyID09IDIpIHtcbiAgICAgIHN0YXJUZXh0ID0gJ+S4jeWkqua7oeaEjyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXIgPT0gMykge1xuICAgICAgc3RhclRleHQgPSAn5ruh5oSPJztcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhciA9PSA0KSB7XG4gICAgICBzdGFyVGV4dCA9ICfmr5TovoPmu6HmhI8nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHN0YXJUZXh0ID0gJ+WNgeWIhua7oeaEjydcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHN0YXI6IHN0YXIsXG4gICAgICBzdGFyVGV4dDogc3RhclRleHRcbiAgICB9KVxuXG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhhcHAuZ2xvYmFsRGF0YSlcbiAgICB2YXIgdGhpc3R5ID0gdGhpcztcbiAgICB2YXIgdXNlcmlkID0gYXBwLmdsb2JhbERhdGEudXNlci51c2VySWRcbiAgICB0aGlzLnNldERhdGEoe3VzZXJpZDp1c2VyaWR9KVxuICAgIGRhYXR5LmdldFByb2R1Y3RTTih1c2VyaWQsMyxudWxsLHN1Y2Nlc3NGYSlcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZhKGRhdGEsIHNvdXJjZU9iail7XG4gICAgICAgICAgICB0aGlzdHkuc2V0RGF0YSh7c246ZGF0YS5kYXRhLnNufSlcbiAgICAgICAgfVxuICAgIGlmIChwYXJzZUludChvcHRpb25zLnR5cGVJZCkgIT09IDEpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGF0LnNldERhdGEoe1xuICAgICAgdmFsdWVJZDogb3B0aW9ucy52YWx1ZUlkXG4gICAgfSk7XG4gICAgdGhpcy5nZXRUb3BpYygpO1xuICB9LFxuICBnZXRUb3BpYzogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBkYWF0eS5Ub3BpY0RldGFpbCh0aGF0LmRhdGEudmFsdWVJZCxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsc291cmNlT2JqKXtcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIHRvcGljOiByZXMuZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBvbkNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgd3gubmF2aWdhdGVCYWNrKCk7XG4gIH0sXG4gIG9uUG9zdDogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgaGFzUGljdHVyZTtcbiAgICBsZXQgc3RhdGU7XG4gICAgLy8gY29uc29sZS5sb2codGhhdC5kYXRhLmZpbGVzKVxuICAgIGlmICghdGhpcy5kYXRhLmNvbnRlbnQpIHtcbiAgICAgIHRpcC5zaG93VG9hc3QoJ+ivt+Whq+WGmeivhOiuuicpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoYXQuZGF0YS5maWxlcy5sZW5ndGgsXCIxMTExMTFcIilcbiAgICAvLyByZXR1cm4gZmFsc2VcbiAgICBpZih0aGF0LmRhdGEuZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICAgIGhhc1BpY3R1cmUgPSAxXG4gICAgICAgIGRhYXR5LnVwbG9hZEZpbGUodGhhdC5kYXRhLmZpbGVzLDAsMCwwLHRoYXQuZGF0YS5maWxlcy5sZW5ndGgsdGhhdC5kYXRhLnNuLHRoYXQuZGF0YS51c2VyaWQsMTMsc3VjY2Vzc0ZheSlcbiAgICAgICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheSgpe1xuICAgICAgICAgICAgIHZhciBkYXRhID0gY2FjaGUuZ2V0U3luYyhudW15KVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCcyMjIyMjInKVxuICAgICAgICAgICAgICAvLyBzdGF0ZSA9IGRhdGFcbiAgICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKHRoYXQuZGF0YS5maWxlcy5sZW5ndGgsc3RhdGUsMzMzMzMzMzMpXG4gICAgICAgICAgICAgIC8vICBpZihzdGF0ZSA9PSB0aGF0LmRhdGEuZmlsZXMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn1wiKVxuICAgICAgICAgICAgICAvLyAgICAgIC8vICBwblR4dCgpXG4gICAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgLy8gc3RhdGUrK1xuICAgIH1lbHNle1xuICAgICAgICBoYXNQaWN0dXJlID0gMFxuICAgICAgICBwblR4dCgpXG4gICAgfVxuICAgIGZ1bmN0aW9uIHBuVHh0KCl7XG4gICAgICBkYWF0eS5Db21tZW50UG9zdCh0aGF0LmRhdGEudXNlcmlkLDEsdGhhdC5kYXRhLnZhbHVlSWQsdGhhdC5kYXRhLmNvbnRlbnQsdGhhdC5kYXRhLnN0YXIsaGFzUGljdHVyZSxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLHNvdXJjZU9iail7XG4gICAgICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+E6K665oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LDE1MDApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJpbmRJbnB1dFZhbHVlKGV2ZW50KSB7XG5cbiAgICBsZXQgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWU7XG5cbiAgICAvL+WIpOaWreaYr+WQpui2hei/hzE0MOS4quWtl+esplxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAxNDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgY29udGVudDogZXZlbnQuZGV0YWlsLnZhbHVlLFxuICAgIH0pXG4gIH0sXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLmmL7npLpcblxuICB9LFxuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLpmpDol49cblxuICB9LFxuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdouWFs+mXrVxuXG4gIH1cbn0iXX0=