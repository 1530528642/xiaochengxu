'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
exports.default = Page({
  data: {
    id: 0,
    brand: {},
    goodsList: [],
    offset: 0,
    limit: 100
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      id: parseInt(options.id)
    });
    this.getBrand();
  },
  getBrand: function getBrand() {
    var that = this;
    daaty.BrandDetail(that.data.id, null, successFay);
    function successFay(res, sourceObj) {
      // if (res.errno === 0) {
      that.setData({
        brand: res.data.brand
      });

      that.getGoodsList();
      // }
    }
  },
  getGoodsList: function getGoodsList() {
    var that = this;
    daaty.GoodsList('', that.data.id, '', '', '', that.data.offset, that.data.limit, null, successFay);
    function successFay(res, sourceObj) {
      // if (res.errno === 0) {
      that.setData({
        goodsList: res.data.goodsList
      });
      // }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyYW5kRGV0YWlsLnd4cCJdLCJuYW1lcyI6WyJkYWF0eSIsInJlcXVpcmUiLCJkYXRhIiwiaWQiLCJicmFuZCIsImdvb2RzTGlzdCIsIm9mZnNldCIsImxpbWl0Iiwib25Mb2FkIiwib3B0aW9ucyIsInRoYXQiLCJzZXREYXRhIiwicGFyc2VJbnQiLCJnZXRCcmFuZCIsIkJyYW5kRGV0YWlsIiwic3VjY2Vzc0ZheSIsInJlcyIsInNvdXJjZU9iaiIsImdldEdvb2RzTGlzdCIsIkdvb2RzTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxRQUFTQyxRQUFRLHFCQUFSLENBQWY7O0FBTUdDLFFBQU07QUFDTEMsUUFBSSxDQURDO0FBRUxDLFdBQU8sRUFGRjtBQUdMQyxlQUFXLEVBSE47QUFJTEMsWUFBUSxDQUpIO0FBS0xDLFdBQU87QUFMRixHO0FBT1BDLFVBQVEsZ0JBQVVDLE9BQVYsRUFBbUI7QUFDekI7QUFDQSxRQUFJQyxPQUFPLElBQVg7QUFDQUEsU0FBS0MsT0FBTCxDQUFhO0FBQ1hSLFVBQUlTLFNBQVNILFFBQVFOLEVBQWpCO0FBRE8sS0FBYjtBQUdBLFNBQUtVLFFBQUw7QUFDRCxHO0FBQ0RBLFlBQVUsb0JBQVk7QUFDcEIsUUFBSUgsT0FBTyxJQUFYO0FBQ0FWLFVBQU1jLFdBQU4sQ0FBa0JKLEtBQUtSLElBQUwsQ0FBVUMsRUFBNUIsRUFBK0IsSUFBL0IsRUFBb0NZLFVBQXBDO0FBQ0MsYUFBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQ2xDO0FBQ0VQLFdBQUtDLE9BQUwsQ0FBYTtBQUNYUCxlQUFPWSxJQUFJZCxJQUFKLENBQVNFO0FBREwsT0FBYjs7QUFJQU0sV0FBS1EsWUFBTDtBQUNGO0FBQ0Q7QUFDRixHO0FBQ0RBLGMsMEJBQWU7QUFDYixRQUFJUixPQUFPLElBQVg7QUFDQVYsVUFBTW1CLFNBQU4sQ0FBZ0IsRUFBaEIsRUFBbUJULEtBQUtSLElBQUwsQ0FBVUMsRUFBN0IsRUFBZ0MsRUFBaEMsRUFBbUMsRUFBbkMsRUFBc0MsRUFBdEMsRUFBeUNPLEtBQUtSLElBQUwsQ0FBVUksTUFBbkQsRUFBMERJLEtBQUtSLElBQUwsQ0FBVUssS0FBcEUsRUFBMEUsSUFBMUUsRUFBK0VRLFVBQS9FO0FBQ0MsYUFBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQ2hDO0FBQ0VQLFdBQUtDLE9BQUwsQ0FBYTtBQUNYTixtQkFBV1csSUFBSWQsSUFBSixDQUFTRztBQURULE9BQWI7QUFHRjtBQUNGO0FBQ0giLCJmaWxlIjoiYnJhbmREZXRhaWwud3hwIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGFhdHkgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaTIuanNcIilcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WTgeeJjOWVhuivpuaDhScsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7fVxuICB9LFxuICAgZGF0YToge1xuICAgIGlkOiAwLFxuICAgIGJyYW5kOiB7fSxcbiAgICBnb29kc0xpc3Q6IFtdLFxuICAgIG9mZnNldDogMCxcbiAgICBsaW1pdDogMTAwXG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAvLyDpobXpnaLliJ3lp4vljJYgb3B0aW9uc+S4uumhtemdoui3s+i9rOaJgOW4puadpeeahOWPguaVsFxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGF0LnNldERhdGEoe1xuICAgICAgaWQ6IHBhcnNlSW50KG9wdGlvbnMuaWQpXG4gICAgfSk7XG4gICAgdGhpcy5nZXRCcmFuZCgpO1xuICB9LFxuICBnZXRCcmFuZDogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBkYWF0eS5CcmFuZERldGFpbCh0aGF0LmRhdGEuaWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICAgIC8vIGlmIChyZXMuZXJybm8gPT09IDApIHtcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBicmFuZDogcmVzLmRhdGEuYnJhbmRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhhdC5nZXRHb29kc0xpc3QoKTtcbiAgICAgIC8vIH1cbiAgICB9XG4gIH0sXG4gIGdldEdvb2RzTGlzdCgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgZGFhdHkuR29vZHNMaXN0KCcnLHRoYXQuZGF0YS5pZCwnJywnJywnJyx0aGF0LmRhdGEub2Zmc2V0LHRoYXQuZGF0YS5saW1pdCxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAvLyBpZiAocmVzLmVycm5vID09PSAwKSB7XG4gICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgIGdvb2RzTGlzdDogcmVzLmRhdGEuZ29vZHNMaXN0XG4gICAgICAgICAgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgfVxuICB9XG59Il19