"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
var app = getApp();
var tip = require("../../utils/tip.js");
var cache = require("../../utils/cache.js");
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
      }
    });
  },
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
    var thisty = this;
    var userid = app.globalData.user.userId;
    thisty.setData({
      valueId: options.valueId
    });
    console.log(options);
    this.setData({ userid: userid });
    daaty.getProductSN(userid, 3, null, successFa);
    function successFa(data, sourceObj) {
      thisty.setData({ sn: data.data.sn });
    }
    if (parseInt(options.typeId) !== 1) {
      return;
    }

    var that = this;
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
    var state = 0;
    var newurl = [];
    if (!this.data.content) {
      tip.showToast('请填写评论');
      return false;
    }

    if (that.data.files.length > 0) {
      var successFay = function successFay(res, sourceObj) {
        state++;
        var numarr = res.data.replace("\"", "").replace("\"", "");
        newurl.push(numarr);
        if (state == that.data.files.length) {
          pyim(newurl);
        }
      };

      hasPicture = 1;
      daaty.uploadFile(that.data.files, 0, 0, 0, that.data.files.length, that.data.sn, that.data.userid, 13, successFay);
    } else {
      hasPicture = 0;
      pyim();
    }
    function pyim(dara) {
      if (dara == undefined) {
        dara = '';
      }
      daaty.CommentPost(that.data.userid, 1, that.data.valueId, that.data.content, that.data.star, hasPicture, dara, null, successFay);
      function successFay(res, sourceObj) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcGljQ29tbWVudFBvc3Qud3hwIl0sIm5hbWVzIjpbImRhYXR5IiwicmVxdWlyZSIsImFwcCIsImdldEFwcCIsInRpcCIsImNhY2hlIiwiZGF0YSIsInZhbHVlSWQiLCJ0b3BpYyIsImNvbnRlbnQiLCJzdGFycyIsInN0YXIiLCJzdGFyVGV4dCIsImhhc1BpY3R1cmUiLCJwaWNVcmxzIiwiZmlsZXMiLCJjaG9vc2VJbWFnZSIsImUiLCJsZW5ndGgiLCJzaG93VG9hc3QiLCJ0aGF0Iiwid3giLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJzZXREYXRhIiwiY29uY2F0IiwidGVtcEZpbGVQYXRocyIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJ1cmxzIiwic2VsZWN0UmF0ZXIiLCJkYXRhc2V0Iiwib25Mb2FkIiwib3B0aW9ucyIsInRoaXN0eSIsInVzZXJpZCIsImdsb2JhbERhdGEiLCJ1c2VyIiwidXNlcklkIiwiY29uc29sZSIsImxvZyIsImdldFByb2R1Y3RTTiIsInN1Y2Nlc3NGYSIsInNvdXJjZU9iaiIsInNuIiwicGFyc2VJbnQiLCJ0eXBlSWQiLCJnZXRUb3BpYyIsIlRvcGljRGV0YWlsIiwic3VjY2Vzc0ZheSIsIm9uQ2xvc2UiLCJuYXZpZ2F0ZUJhY2siLCJvblBvc3QiLCJzdGF0ZSIsIm5ld3VybCIsIm51bWFyciIsInJlcGxhY2UiLCJwdXNoIiwicHlpbSIsInVwbG9hZEZpbGUiLCJkYXJhIiwidW5kZWZpbmVkIiwiQ29tbWVudFBvc3QiLCJ0aXRsZSIsImNvbXBsZXRlIiwic2V0VGltZW91dCIsImJpbmRJbnB1dFZhbHVlIiwiZXZlbnQiLCJ2YWx1ZSIsImRldGFpbCIsIm9uUmVhZHkiLCJvblNob3ciLCJvbkhpZGUiLCJvblVubG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxRQUFTQyxRQUFRLHFCQUFSLENBQWY7QUFDQSxJQUFNQyxNQUFN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QU4sQ0FBYUQ7QUFEWCxLQUFiO0FBR0QsRzs7QUFDREUsV0FBUyxtQkFBWSxDQUVwQixDO0FBQ0RDLFVBQVEsa0JBQVk7QUFDbEI7O0FBRUQsRztBQUNEQyxVQUFRLGtCQUFZO0FBQ2xCOztBQUVELEc7QUFDREMsWUFBVSxvQkFBWTtBQUNwQjs7QUFFRCIsImZpbGUiOiJ0b3BpY0NvbW1lbnRQb3N0Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhYXR5ID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGkyLmpzXCIpXG5jb25zdCBhcHAgPSBnZXRBcHAoKVxudmFyIHRpcCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy90aXAuanNcIilcbmNvbnN0IGNhY2hlID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2NhY2hlLmpzXCIpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfor4TorronLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgIGRhdGE6IHtcbiAgICB2YWx1ZUlkOiAwLFxuICAgIHRvcGljOiB7fSxcbiAgICBjb250ZW50OiAnJyxcbiAgICBzdGFyczogWzAsIDEsIDIsIDMsIDRdLFxuICAgIHN0YXI6IDUsXG4gICAgc3RhclRleHQ6ICfljYHliIbmu6HmhI8nLFxuICAgIGhhc1BpY3R1cmU6IGZhbHNlLFxuICAgIHBpY1VybHM6IFtdLFxuICAgIGZpbGVzOiBbXVxuICB9LFxuICBjaG9vc2VJbWFnZTogZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAodGhpcy5kYXRhLmZpbGVzLmxlbmd0aCA+PSA1KSB7XG4gICAgICB0aXAuc2hvd1RvYXN0KCflj6rog73kuIrkvKDkupTlvKDlm77niYcnKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICBjb3VudDogNSxcbiAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgZmlsZXM6IHRoYXQuZGF0YS5maWxlcy5jb25jYXQocmVzLnRlbXBGaWxlUGF0aHMpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIHByZXZpZXdJbWFnZTogZnVuY3Rpb24gKGUpIHtcbiAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgY3VycmVudDogZS5jdXJyZW50VGFyZ2V0LmlkLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXG4gICAgICB1cmxzOiB0aGlzLmRhdGEuZmlsZXMgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxuICAgIH0pXG4gIH0sXG4gIHNlbGVjdFJhdGVyOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzdGFyID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuc3RhciArIDE7XG4gICAgdmFyIHN0YXJUZXh0O1xuICAgIGlmIChzdGFyID09IDEpIHtcbiAgICAgIHN0YXJUZXh0ID0gJ+W+iOW3ric7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXIgPT0gMikge1xuICAgICAgc3RhclRleHQgPSAn5LiN5aSq5ruh5oSPJztcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhciA9PSAzKSB7XG4gICAgICBzdGFyVGV4dCA9ICfmu6HmhI8nO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdGFyID09IDQpIHtcbiAgICAgIHN0YXJUZXh0ID0gJ+avlOi+g+a7oeaEjyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhclRleHQgPSAn5Y2B5YiG5ruh5oSPJ1xuICAgIH1cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc3Rhcjogc3RhcixcbiAgICAgIHN0YXJUZXh0OiBzdGFyVGV4dFxuICAgIH0pXG5cbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciB0aGlzdHkgPSB0aGlzO1xuICAgIHZhciB1c2VyaWQgPSBhcHAuZ2xvYmFsRGF0YS51c2VyLnVzZXJJZFxuICAgIHRoaXN0eS5zZXREYXRhKHtcbiAgICAgIHZhbHVlSWQ6IG9wdGlvbnMudmFsdWVJZFxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpXG4gICAgdGhpcy5zZXREYXRhKHt1c2VyaWQ6dXNlcmlkfSlcbiAgICBkYWF0eS5nZXRQcm9kdWN0U04odXNlcmlkLDMsbnVsbCxzdWNjZXNzRmEpXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgdGhpc3R5LnNldERhdGEoe3NuOmRhdGEuZGF0YS5zbn0pXG4gICAgICAgIH1cbiAgICBpZiAocGFyc2VJbnQob3B0aW9ucy50eXBlSWQpICE9PSAxKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5nZXRUb3BpYygpO1xuICB9LFxuICBnZXRUb3BpYzogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBkYWF0eS5Ub3BpY0RldGFpbCh0aGF0LmRhdGEudmFsdWVJZCxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsc291cmNlT2JqKXtcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIHRvcGljOiByZXMuZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBvbkNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgd3gubmF2aWdhdGVCYWNrKCk7XG4gIH0sXG4gIG9uUG9zdDogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgaGFzUGljdHVyZTtcbiAgICBsZXQgc3RhdGUgPSAwO1xuICAgIGxldCBuZXd1cmwgPSBbXVxuICAgIGlmICghdGhpcy5kYXRhLmNvbnRlbnQpIHtcbiAgICAgIHRpcC5zaG93VG9hc3QoJ+ivt+Whq+WGmeivhOiuuicpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGlmKHRoYXQuZGF0YS5maWxlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgaGFzUGljdHVyZSA9IDFcbiAgICAgICAgZGFhdHkudXBsb2FkRmlsZSh0aGF0LmRhdGEuZmlsZXMsMCwwLDAsdGhhdC5kYXRhLmZpbGVzLmxlbmd0aCx0aGF0LmRhdGEuc24sdGhhdC5kYXRhLnVzZXJpZCwxMyxzdWNjZXNzRmF5KVxuICAgICAgICAgICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICAgICAgICAgIHN0YXRlKytcbiAgICAgICAgICAgIHZhciBudW1hcnIgPSByZXMuZGF0YS5yZXBsYWNlKFwiXFxcIlwiLFwiXCIpLnJlcGxhY2UoXCJcXFwiXCIsXCJcIik7XG4gICAgICAgICAgICAgIG5ld3VybC5wdXNoKG51bWFycilcbiAgICAgICAgICAgICAgIGlmKHN0YXRlID09IHRoYXQuZGF0YS5maWxlcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBweWltKG5ld3VybClcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgICBoYXNQaWN0dXJlID0gMFxuICAgICAgICBweWltKClcbiAgICB9XG4gICBmdW5jdGlvbiBweWltKGRhcmEpe1xuICAgICBpZihkYXJhID09IHVuZGVmaW5lZCl7XG4gICAgICAgIGRhcmEgID0gJydcbiAgICAgfVxuICAgICAgZGFhdHkuQ29tbWVudFBvc3QodGhhdC5kYXRhLnVzZXJpZCwxLHRoYXQuZGF0YS52YWx1ZUlkLHRoYXQuZGF0YS5jb250ZW50LHRoYXQuZGF0YS5zdGFyLGhhc1BpY3R1cmUsZGFyYSxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLHNvdXJjZU9iail7XG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor4TorrrmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sMTUwMClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgIH1cbiAgIH1cbiAgfSxcbiAgYmluZElucHV0VmFsdWUoZXZlbnQpIHtcblxuICAgIGxldCB2YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZTtcblxuICAgIC8v5Yik5pat5piv5ZCm6LaF6L+HMTQw5Liq5a2X56ymXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDE0MCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBjb250ZW50OiBldmVudC5kZXRhaWwudmFsdWUsXG4gICAgfSlcbiAgfSxcbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdouaYvuekulxuXG4gIH0sXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdoumakOiXj1xuXG4gIH0sXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i5YWz6ZetXG5cbiAgfVxufSJdfQ==