"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apis = require("../../utils/api2.js");
var dates = require("../../utils/dateutils.js");
exports.default = Page({
  data: {
    "__code__": {
      readme: ""
    },

    washnumber: [],
    offset: 0,
    limit: 10,
    topList: '',
    num: 1,
    bshs: '',
    imgUrl: ''
  },
  paging: function paging(amge) {
    var _this = this;
    apis.prolist(_this.data.bshs, 1, '', '', _this.data.limit, _this.data.offset, 0, successFa);
    // apis.prolist({offset:_this.data.offset,limit:_this.data.limit,tagCode:_this.data.bshs},1,successFa, null, null);
    function successFa(data, sourceObj) {
      console.log(data, 8888);
      var offsets = _this.data.offset + _this.data.limit;
      for (var i = 0; i < data.data.length; i++) {
        _this.data.washnumber.push(data.data[i]);
      }
      _this.setData({ washnumber: _this.data.washnumber, offset: offsets });
    }
  },
  onLoad: function onLoad(option) {
    var app = getApp();
    var theys = this;
    var imgUrl = app.globalData.imgUrl;
    console.log('imgUrl', imgUrl, app.globalData.imgUrl);
    apis.taglist(1, 1, 0, successFa);
    function successFa(data, sourceObj) {
      console.log(data, 4444);
      var datass = data.data;
      var listss = [];
      var datasss = { common: "全部", colors: "#E94A69", texColor: "#fff", I_b: 0, tagCode: "" };
      listss.push(datasss);
      for (var i = 0; i < datass.length; i++) {
        // console.log(datass[i],2222)
        datass[i].colors = "";
        datass[i].texColor = "#E94A69";
        datass[i].I_b = datass[i].uid;
        datass[i].common = datass[i].tagValue;
        listss.push(datass[i]);
      }
      theys.setData({ topList: listss, imgUrl: imgUrl });
    }
  },
  onShow: function onShow() {
    var listss = this.data.topList;
    this.onPullDownRefresh();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.setData({ washnumber: [], offset: 0 });
    this.paging();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function onReachBottom() {
    this.paging();
  },
  bigImg: function bigImg(e) {
    var src = e.currentTarget.dataset.src;
    var srcs = e.currentTarget.dataset.srcs;
    var urls = srcs.fileList;
    var imgArr = [];
    for (var i = 0; i < urls.length; i++) {
      imgArr[i] = urls[i].fileUrl;
    }
    wx.previewImage({
      current: src, // 褰撳墠鏄剧ず鍥剧墖鐨刪ttp閾炬帴
      urls: imgArr // 闇€瑕侀瑙堢殑鍥剧墖http閾炬帴鍒楄〃
    });
  },
  topClick: function topClick(e) {
    var listss = this.data.topList;
    var I_bs = e.currentTarget.dataset.i_bs;
    var bshs = e.currentTarget.dataset.bsh;
    this.setData({ bshs: bshs });
    for (var i = 0; i < listss.length; i++) {
      if (listss[i].I_b == I_bs) {
        listss[i].colors = "#E94A69";
        listss[i].texColor = "#fff";
      } else {
        listss[i].colors = "#FFF";
        listss[i].texColor = "#E94A69";
      }
    }
    this.onPullDownRefresh();
    this.setData({ topList: listss });
  },
  newty: function newty(e) {
    var mewtimes = dates.getDate(e.currentTarget.dataset.zcoty.createTime);
    if (e.currentTarget.dataset.zcoty.infoType == 4) {
      wx.navigateTo({
        url: "../outPage/outpage?inur=" + e.currentTarget.dataset.zcoty.webUrl + "&timew=" + mewtimes
      });
    } else {
      wx.navigateTo({
        url: "../newsDetail/newsDetail?teeny=" + e.currentTarget.dataset.zcoty
      });
    }
  },
  costy: function costy() {
    wx.navigateTo({
      url: "../release/release"
    });
  },
  temble: function temble(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number
    });
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '洗车用同洗',
      path: '/pages/home/index'
    };
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJhcGlzIiwicmVxdWlyZSIsImRhdGVzIiwiZGF0YSIsIndhc2hudW1iZXIiLCJvZmZzZXQiLCJsaW1pdCIsInRvcExpc3QiLCJudW0iLCJic2hzIiwiaW1nVXJsIiwicGFnaW5nIiwiYW1nZSIsIl90aGlzIiwicHJvbGlzdCIsInN1Y2Nlc3NGYSIsInNvdXJjZU9iaiIsImNvbnNvbGUiLCJsb2ciLCJvZmZzZXRzIiwiaSIsImxlbmd0aCIsInB1c2giLCJzZXREYXRhIiwib25Mb2FkIiwib3B0aW9uIiwiYXBwIiwiZ2V0QXBwIiwidGhleXMiLCJnbG9iYWxEYXRhIiwidGFnbGlzdCIsImRhdGFzcyIsImxpc3RzcyIsImRhdGFzc3MiLCJjb21tb24iLCJjb2xvcnMiLCJ0ZXhDb2xvciIsIklfYiIsInRhZ0NvZGUiLCJ1aWQiLCJ0YWdWYWx1ZSIsIm9uU2hvdyIsIm9uUHVsbERvd25SZWZyZXNoIiwid3giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbSIsImJpZ0ltZyIsImUiLCJzcmMiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInNyY3MiLCJ1cmxzIiwiZmlsZUxpc3QiLCJpbWdBcnIiLCJmaWxlVXJsIiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsInRvcENsaWNrIiwiSV9icyIsImlfYnMiLCJic2giLCJuZXd0eSIsIm1ld3RpbWVzIiwiZ2V0RGF0ZSIsInpjb3R5IiwiY3JlYXRlVGltZSIsImluZm9UeXBlIiwibmF2aWdhdGVUbyIsInVybCIsIndlYlVybCIsImNvc3R5IiwidGVtYmxlIiwibWFrZVBob25lQ2FsbCIsInBob25lTnVtYmVyIiwibnVtYmVyIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsT0FBUUMsUUFBUSxxQkFBUixDQUFaO0FBQ0EsSUFBSUMsUUFBU0QsUUFBUSwwQkFBUixDQUFiOztBQVlFRSxRQUFN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eUI7QUFEcEIsS0FBakI7QUFHSCxHO0FBQ0FDLHFCQUFtQiw2QkFBVztBQUM3QixXQUFPO0FBQ0xDLGFBQU8sT0FERjtBQUVMQyxZQUFNO0FBRkQsS0FBUDtBQUlEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcGlzID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGkyLmpzXCIpXG52YXIgZGF0ZXMgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2RhdGV1dGlscy5qc1wiKVxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LWE6K6vJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAnd3hjLWxpc3QnOiAnQG1pbnVpL3d4Yy1saXN0JyxcbiAgICAgICAnd3hjLWlucHV0JzogJ0BtaW51aS93eGMtaW5wdXQnLFxuICAgICAgICd3eGMtZWxpcCc6ICdAbWludWkvd3hjLWVsaXAnLFxuICAgICAgICd3eGMtcGFuZWwnOiAnQG1pbnVpL3d4Yy1wYW5lbCcsXG4gICAgICAgJ3d4Yy1hYm5vcic6ICdAbWludWkvd3hjLWFibm9yJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgICB3YXNobnVtYmVyOltdLFxuICAgICBvZmZzZXQ6MCxcbiAgICAgbGltaXQ6MTAsXG4gICAgIHRvcExpc3Q6JycsXG4gICAgIG51bToxLFxuICAgICBic2hzOicnLFxuICAgICBpbWdVcmw6JydcbiAgIH0sXG4gICBwYWdpbmc6ZnVuY3Rpb24oYW1nZSl7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGFwaXMucHJvbGlzdChfdGhpcy5kYXRhLmJzaHMsMSwnJywnJyxfdGhpcy5kYXRhLmxpbWl0LF90aGlzLmRhdGEub2Zmc2V0LDAsIHN1Y2Nlc3NGYSkgXG4gICAvLyBhcGlzLnByb2xpc3Qoe29mZnNldDpfdGhpcy5kYXRhLm9mZnNldCxsaW1pdDpfdGhpcy5kYXRhLmxpbWl0LHRhZ0NvZGU6X3RoaXMuZGF0YS5ic2hzfSwxLHN1Y2Nlc3NGYSwgbnVsbCwgbnVsbCk7XG4gICAgZnVuY3Rpb24gc3VjY2Vzc0ZhKGRhdGEsIHNvdXJjZU9iail7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhLDg4ODgpXG4gICAgICAgICAgY29uc3Qgb2Zmc2V0cyA9IF90aGlzLmRhdGEub2Zmc2V0K190aGlzLmRhdGEubGltaXQ7XG4gICAgICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0YS5kYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgIF90aGlzLmRhdGEud2FzaG51bWJlci5wdXNoKGRhdGEuZGF0YVtpXSlcbiAgICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLnNldERhdGEoe3dhc2hudW1iZXI6X3RoaXMuZGF0YS53YXNobnVtYmVyLG9mZnNldDpvZmZzZXRzfSlcbiAgICAgICAgIH1cbiAgIH0sXG4gICBvbkxvYWQ6ZnVuY3Rpb24ob3B0aW9uKXtcbiAgICAgICAgbGV0IGFwcCA9IGdldEFwcCgpO1xuICAgICAgICBjb25zdCB0aGV5cyA9IHRoaXM7XG4gICAgICAgIGxldCBpbWdVcmw9YXBwLmdsb2JhbERhdGEuaW1nVXJsO1xuICAgICAgICBjb25zb2xlLmxvZygnaW1nVXJsJyxpbWdVcmwsYXBwLmdsb2JhbERhdGEuaW1nVXJsKTtcbiAgICAgICAgYXBpcy50YWdsaXN0KDEsMSwwLHN1Y2Nlc3NGYSlcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZhKGRhdGEsIHNvdXJjZU9iail7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSw0NDQ0KVxuICAgICAgICAgICAgICAgICB2YXIgZGF0YXNzID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgICB2YXIgbGlzdHNzID0gW11cbiAgICAgICAgICAgICAgICAgdmFyIGRhdGFzc3MgPSB7Y29tbW9uOlwi5YWo6YOoXCIsY29sb3JzOlwiI0U5NEE2OVwiLHRleENvbG9yOlwiI2ZmZlwiLElfYjowLHRhZ0NvZGU6XCJcIn1cbiAgICAgICAgICAgICAgICAgbGlzdHNzLnB1c2goZGF0YXNzcykgXG4gICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0YXNzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YXNzW2ldLDIyMjIpXG4gICAgICAgICAgICAgICAgICBkYXRhc3NbaV0uY29sb3JzID0gXCJcIlxuICAgICAgICAgICAgICAgICAgZGF0YXNzW2ldLnRleENvbG9yID0gXCIjRTk0QTY5XCJcbiAgICAgICAgICAgICAgICAgIGRhdGFzc1tpXS5JX2IgPSBkYXRhc3NbaV0udWlkXG4gICAgICAgICAgICAgICAgICBkYXRhc3NbaV0uY29tbW9uID0gZGF0YXNzW2ldLnRhZ1ZhbHVlXG4gICAgICAgICAgICAgICAgICBsaXN0c3MucHVzaChkYXRhc3NbaV0pIFxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIHRoZXlzLnNldERhdGEoe3RvcExpc3Q6bGlzdHNzLGltZ1VybDppbWdVcmx9KVxuICAgICAgICAgfVxuICAgIH0sXG4gICBvblNob3c6ZnVuY3Rpb24oKXtcbiAgICAgdmFyIGxpc3RzcyA9IHRoaXMuZGF0YS50b3BMaXN0O1xuICAgICAgIHRoaXMub25QdWxsRG93blJlZnJlc2goKVxuICAgIH0sXG4gICBvblB1bGxEb3duUmVmcmVzaDpmdW5jdGlvbigpe1xuICAgICB0aGlzLnNldERhdGEoe3dhc2hudW1iZXI6W10sb2Zmc2V0OjB9KVxuICAgICB0aGlzLnBhZ2luZygpXG4gICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgIH0sXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucGFnaW5nKClcbiAgfSxcbiAgYmlnSW1nOmZ1bmN0aW9uKGUpe1xuICAgIHZhciBzcmMgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zcmM7XG4gICAgdmFyIHNyY3MgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zcmNzO1xuICAgIHZhciB1cmxzPXNyY3MuZmlsZUxpc3Q7IFxuICAgIHZhciBpbWdBcnI9W107XG4gICAgIGZvcih2YXIgaT0wO2k8dXJscy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgaW1nQXJyW2ldPXVybHNbaV0uZmlsZVVybFxuICAgICB9XG4gICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgICAgY3VycmVudDogc3JjLCAvLyDopLDmkrPloqDpj4TliafjgZrpjaXliaflopbpkKjliKp0dHDplr7ngqzluLRcbiAgICAgICAgdXJsczogaW1nQXJyIC8vIOmXh+KCrOeRleS+gO6VqeeRmeWgouaukemNpeWJp+Wilmh0dHDplr7ngqzluLTpjZLmpYTjgINcbiAgICAgICAgfSlcbiAgICAgICB9LFxuICAgdG9wQ2xpY2s6ZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBsaXN0c3MgPSB0aGlzLmRhdGEudG9wTGlzdDtcbiAgICAgICAgdmFyIElfYnMgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pX2JzO1xuICAgICAgICB2YXIgYnNocyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmJzaDtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtic2hzOmJzaHN9KVxuICAgICAgICBmb3IodmFyIGk9MDtpPGxpc3Rzcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihsaXN0c3NbaV0uSV9iID09IElfYnMpe1xuICAgICAgICAgICAgICBsaXN0c3NbaV0uY29sb3JzPVwiI0U5NEE2OVwiO1xuICAgICAgICAgICAgICBsaXN0c3NbaV0udGV4Q29sb3I9XCIjZmZmXCI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgbGlzdHNzW2ldLmNvbG9ycz1cIiNGRkZcIjtcbiAgICAgICAgICAgICAgbGlzdHNzW2ldLnRleENvbG9yPVwiI0U5NEE2OVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgdGhpcy5vblB1bGxEb3duUmVmcmVzaCgpXG4gICAgICAgdGhpcy5zZXREYXRhKHt0b3BMaXN0Omxpc3Rzc30pXG4gIH0sXG4gIG5ld3R5OmZ1bmN0aW9uIG5ld3R5KGUpe1xuICAgIHZhciBtZXd0aW1lcyA9IGRhdGVzLmdldERhdGUoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuemNvdHkuY3JlYXRlVGltZSlcbiAgICBpZihlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC56Y290eS5pbmZvVHlwZSA9PSA0KXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgdXJsOiBcIi4uL291dFBhZ2Uvb3V0cGFnZT9pbnVyPVwiK2UuY3VycmVudFRhcmdldC5kYXRhc2V0Lnpjb3R5LndlYlVybCtcIiZ0aW1ldz1cIittZXd0aW1lc1xuICAgIH0pXG4gICAgfWVsc2V7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogXCIuLi9uZXdzRGV0YWlsL25ld3NEZXRhaWw/dGVlbnk9XCIrZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuemNvdHlcbiAgICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGNvc3R5OmZ1bmN0aW9uIGNvc3R5KCl7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IFwiLi4vcmVsZWFzZS9yZWxlYXNlXCJcbiAgICAgICAgfSlcbiAgfSxcbiAgdGVtYmxlOmZ1bmN0aW9uIHRlbWJsZShlKXtcbiAgICAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgcGhvbmVOdW1iZXI6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm51bWJlcixcbiAgICB9KVxuICB9LFxuICAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+a0l+i9pueUqOWQjOa0lycsXG4gICAgICBwYXRoOiAnL3BhZ2VzL2hvbWUvaW5kZXgnXG4gICAgfVxuICB9XG4gIFxufSJdfQ==