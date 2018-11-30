'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
exports.default = Page({
  data: {
    brandList: [],
    offset: 0,
    limit: 10,
    totalPages: 1
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getBrandList();
  },
  getBrandList: function getBrandList() {
    wx.showLoading({
      title: '加载中...'
    });
    var that = this;
    daaty.BrandList(that.data.offset, that.data.limit, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        brandList: that.data.brandList.concat(res.data.brandList),
        totalPages: res.data.totalPages
      });
    }
    wx.hideLoading();
  },
  onReachBottom: function onReachBottom() {
    if (this.data.totalPages > this.data.offset) {
      this.setData({
        offset: this.data.offset + 1
      });
    } else {
      return false;
    }

    this.getBrandList();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyYW5kLnd4cCJdLCJuYW1lcyI6WyJkYWF0eSIsInJlcXVpcmUiLCJkYXRhIiwiYnJhbmRMaXN0Iiwib2Zmc2V0IiwibGltaXQiLCJ0b3RhbFBhZ2VzIiwib25Mb2FkIiwib3B0aW9ucyIsImdldEJyYW5kTGlzdCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInRoYXQiLCJCcmFuZExpc3QiLCJzdWNjZXNzRmF5IiwicmVzIiwic291cmNlT2JqIiwic2V0RGF0YSIsImNvbmNhdCIsImhpZGVMb2FkaW5nIiwib25SZWFjaEJvdHRvbSIsIm9uUmVhZHkiLCJvblNob3ciLCJvbkhpZGUiLCJvblVubG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxRQUFTQyxRQUFRLHFCQUFSLENBQWY7O0FBTUdDLFFBQU07QUFDTEMsZUFBVyxFQUROO0FBRUxDLFlBQVEsQ0FGSDtBQUdMQyxXQUFPLEVBSEY7QUFJTEMsZ0JBQVk7QUFKUCxHO0FBTVBDLFVBQVEsZ0JBQVVDLE9BQVYsRUFBbUI7QUFDekI7QUFDQSxTQUFLQyxZQUFMO0FBQ0QsRztBQUNEQSxnQkFBYyx3QkFBWTtBQUN4QkMsT0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGFBQU87QUFETSxLQUFmO0FBR0EsUUFBSUMsT0FBTyxJQUFYO0FBQ0NiLFVBQU1jLFNBQU4sQ0FBZ0JELEtBQUtYLElBQUwsQ0FBVUUsTUFBMUIsRUFBaUNTLEtBQUtYLElBQUwsQ0FBVUcsS0FBM0MsRUFBaUQsSUFBakQsRUFBc0RVLFVBQXREO0FBQ0EsYUFBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQ2hDSixXQUFLSyxPQUFMLENBQWE7QUFDUGYsbUJBQVdVLEtBQUtYLElBQUwsQ0FBVUMsU0FBVixDQUFvQmdCLE1BQXBCLENBQTJCSCxJQUFJZCxJQUFKLENBQVNDLFNBQXBDLENBREo7QUFFUEcsb0JBQVlVLElBQUlkLElBQUosQ0FBU0k7QUFGZCxPQUFiO0FBSUc7QUFDREksT0FBR1UsV0FBSDtBQUNKLEc7QUFDSkMsZSwyQkFBZ0I7QUFDZCxRQUFJLEtBQUtuQixJQUFMLENBQVVJLFVBQVYsR0FBdUIsS0FBS0osSUFBTCxDQUFVRSxNQUFyQyxFQUE2QztBQUMzQyxXQUFLYyxPQUFMLENBQWE7QUFDWGQsZ0JBQVEsS0FBS0YsSUFBTCxDQUFVRSxNQUFWLEdBQW1CO0FBRGhCLE9BQWI7QUFHRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFLSyxZQUFMO0FBQ0QsRzs7QUFDRGEsV0FBUyxtQkFBWSxDQUVwQixDO0FBQ0RDLFVBQVEsa0JBQVk7QUFDbEI7O0FBRUQsRztBQUNEQyxVQUFRLGtCQUFZO0FBQ2xCOztBQUVELEc7QUFDREMsWUFBVSxvQkFBWTtBQUNwQjs7QUFFRCIsImZpbGUiOiJicmFuZC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYWF0eSA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYXBpMi5qc1wiKVxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZOB54mM5YiX6KGoJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XG4gIH0sXG4gICBkYXRhOiB7XG4gICAgYnJhbmRMaXN0OiBbXSxcbiAgICBvZmZzZXQ6IDAsXG4gICAgbGltaXQ6IDEwLFxuICAgIHRvdGFsUGFnZXM6IDFcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIC8vIOmhtemdouWIneWni+WMliBvcHRpb25z5Li66aG16Z2i6Lez6L2s5omA5bim5p2l55qE5Y+C5pWwXG4gICAgdGhpcy5nZXRCcmFuZExpc3QoKTtcbiAgfSxcbiAgZ2V0QnJhbmRMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nLFxuICAgIH0pO1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgZGFhdHkuQnJhbmRMaXN0KHRoYXQuZGF0YS5vZmZzZXQsdGhhdC5kYXRhLmxpbWl0LG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIGJyYW5kTGlzdDogdGhhdC5kYXRhLmJyYW5kTGlzdC5jb25jYXQocmVzLmRhdGEuYnJhbmRMaXN0KSxcbiAgICAgICAgICAgICAgdG90YWxQYWdlczogcmVzLmRhdGEudG90YWxQYWdlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgIH0sXG4gIG9uUmVhY2hCb3R0b20gKCl7XG4gICAgaWYgKHRoaXMuZGF0YS50b3RhbFBhZ2VzID4gdGhpcy5kYXRhLm9mZnNldCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgb2Zmc2V0OiB0aGlzLmRhdGEub2Zmc2V0ICsgMVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmdldEJyYW5kTGlzdCgpO1xuICB9LFxuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i5pi+56S6XG5cbiAgfSxcbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i6ZqQ6JePXG5cbiAgfSxcbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLlhbPpl61cblxuICB9XG59Il19