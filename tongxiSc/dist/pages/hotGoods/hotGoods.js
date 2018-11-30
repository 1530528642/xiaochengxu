'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
exports.default = Page({
  data: {
    bannerInfo: {
      'imgUrl': '',
      'name': ''
    },
    categoryFilter: false,
    filterCategory: [],
    goodsList: [],
    categoryId: 0,
    currentSortType: 'default',
    currentSort: 'add_time',
    currentSortOrder: 'desc',
    offset: 0,
    limit: 10
  },
  getBanner: function getBanner() {
    var that = this;
    daaty.GoodsHot(null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        bannerInfo: res.data.bannerInfo
      });
    }
  },
  getCategoryList: function getCategoryList() {
    var that = this;
  },
  getGoodsList: function getGoodsList() {
    var that = this;
    daaty.GoodsList('', '', '', '', true, that.data.currentSortOrder, that.data.currentSort, that.data.offset, that.data.limit, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        goodsList: res.data.goodsList,
        filterCategory: res.data.filterCategoryList
      });
    }
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getBanner();
    this.getGoodsList();
  },
  onReady: function onReady() {
    // 页面渲染完成
  },
  onShow: function onShow() {
    // 页面显示

  },
  onHide: function onHide() {
    // 页面隐藏

  },
  onUnload: function onUnload() {
    // 页面关闭

  },
  openSortFilter: function openSortFilter(event) {
    var currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          categoryFilter: !this.data.categoryFilter,
          currentSortType: 'category',
          currentSort: 'add_time',
          currentSortOrder: 'desc'
        });
        break;
      case 'priceSort':
        var tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        this.setData({
          currentSortType: 'price',
          currentSort: 'retail_price',
          currentSortOrder: tmpSortOrder,
          categoryFilter: false
        });

        this.getGoodsList();
        break;
      default:
        //综合排序
        this.setData({
          currentSortType: 'default',
          currentSort: 'add_time',
          currentSortOrder: 'desc',
          categoryFilter: false,
          categoryId: 0
        });
        this.getGoodsList();
    }
  },
  selectCategory: function selectCategory(event) {
    var currentIndex = event.target.dataset.categoryIndex;
    this.setData({
      'categoryFilter': false,
      'categoryId': this.data.filterCategory[currentIndex].id
    });
    this.getGoodsList();
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdEdvb2RzLnd4cCJdLCJuYW1lcyI6WyJkYWF0eSIsInJlcXVpcmUiLCJkYXRhIiwiYmFubmVySW5mbyIsImNhdGVnb3J5RmlsdGVyIiwiZmlsdGVyQ2F0ZWdvcnkiLCJnb29kc0xpc3QiLCJjYXRlZ29yeUlkIiwiY3VycmVudFNvcnRUeXBlIiwiY3VycmVudFNvcnQiLCJjdXJyZW50U29ydE9yZGVyIiwib2Zmc2V0IiwibGltaXQiLCJnZXRCYW5uZXIiLCJ0aGF0IiwiR29vZHNIb3QiLCJzdWNjZXNzRmF5IiwicmVzIiwic291cmNlT2JqIiwic2V0RGF0YSIsImdldENhdGVnb3J5TGlzdCIsImdldEdvb2RzTGlzdCIsIkdvb2RzTGlzdCIsImZpbHRlckNhdGVnb3J5TGlzdCIsIm9uTG9hZCIsIm9wdGlvbnMiLCJvblJlYWR5Iiwib25TaG93Iiwib25IaWRlIiwib25VbmxvYWQiLCJvcGVuU29ydEZpbHRlciIsImV2ZW50IiwiY3VycmVudElkIiwiY3VycmVudFRhcmdldCIsImlkIiwidG1wU29ydE9yZGVyIiwic2VsZWN0Q2F0ZWdvcnkiLCJjdXJyZW50SW5kZXgiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY2F0ZWdvcnlJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxRQUFTQyxRQUFRLHFCQUFSLENBQWY7O0FBTUVDLFFBQU07QUFDSkMsZ0JBQVk7QUFDVixnQkFBVSxFQURBO0FBRVYsY0FBUTtBQUZFLEtBRFI7QUFLSkMsb0JBQWdCLEtBTFo7QUFNSkMsb0JBQWdCLEVBTlo7QUFPSkMsZUFBVyxFQVBQO0FBUUpDLGdCQUFZLENBUlI7QUFTSkMscUJBQWlCLFNBVGI7QUFVSkMsaUJBQWEsVUFWVDtBQVdKQyxzQkFBa0IsTUFYZDtBQVlKQyxZQUFRLENBWko7QUFhSkMsV0FBTztBQWJILEc7QUFlTkMsYUFBVyxxQkFBWTtBQUNyQixRQUFJQyxPQUFPLElBQVg7QUFDQWQsVUFBTWUsUUFBTixDQUFlLElBQWYsRUFBb0JDLFVBQXBCO0FBQ0MsYUFBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQ2hDSixXQUFLSyxPQUFMLENBQWE7QUFDWGhCLG9CQUFZYyxJQUFJZixJQUFKLENBQVNDO0FBRFYsT0FBYjtBQUdGO0FBQ0gsRztBQUNEaUIsbUJBQWlCLDJCQUFVO0FBQ3pCLFFBQUlOLE9BQU8sSUFBWDtBQUNELEc7QUFDRE8sZ0JBQWMsd0JBQVc7QUFDdkIsUUFBSVAsT0FBTyxJQUFYO0FBQ0pkLFVBQU1zQixTQUFOLENBQWdCLEVBQWhCLEVBQW1CLEVBQW5CLEVBQXNCLEVBQXRCLEVBQXlCLEVBQXpCLEVBQTRCLElBQTVCLEVBQWlDUixLQUFLWixJQUFMLENBQVVRLGdCQUEzQyxFQUE0REksS0FBS1osSUFBTCxDQUFVTyxXQUF0RSxFQUFrRkssS0FBS1osSUFBTCxDQUFVUyxNQUE1RixFQUFtR0csS0FBS1osSUFBTCxDQUFVVSxLQUE3RyxFQUFtSCxJQUFuSCxFQUF3SEksVUFBeEg7QUFDSyxhQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsU0FBekIsRUFBbUM7QUFDaENKLFdBQUtLLE9BQUwsQ0FBYTtBQUNUYixtQkFBV1csSUFBSWYsSUFBSixDQUFTSSxTQURYO0FBRVRELHdCQUFnQlksSUFBSWYsSUFBSixDQUFTcUI7QUFGaEIsT0FBYjtBQUlGO0FBQ0gsRztBQUNEQyxVQUFRLGdCQUFVQyxPQUFWLEVBQW1CO0FBQ3pCO0FBQ0EsU0FBS1osU0FBTDtBQUNBLFNBQUtRLFlBQUw7QUFDRCxHO0FBQ0RLLFdBQVMsbUJBQVk7QUFDbkI7QUFDRCxHO0FBQ0RDLFVBQVEsa0JBQVk7QUFDbEI7O0FBRUQsRztBQUNEQyxVQUFRLGtCQUFZO0FBQ2xCOztBQUVELEc7QUFDREMsWUFBVSxvQkFBWTtBQUNwQjs7QUFFRCxHO0FBQ0RDLGtCQUFnQix3QkFBVUMsS0FBVixFQUFpQjtBQUMvQixRQUFJQyxZQUFZRCxNQUFNRSxhQUFOLENBQW9CQyxFQUFwQztBQUNBLFlBQVFGLFNBQVI7QUFDRSxXQUFLLGdCQUFMO0FBQ0UsYUFBS2IsT0FBTCxDQUFhO0FBQ1hmLDBCQUFnQixDQUFDLEtBQUtGLElBQUwsQ0FBVUUsY0FEaEI7QUFFWEksMkJBQWlCLFVBRk47QUFHWEMsdUJBQWEsVUFIRjtBQUlYQyw0QkFBa0I7QUFKUCxTQUFiO0FBTUE7QUFDRixXQUFLLFdBQUw7QUFDRSxZQUFJeUIsZUFBZSxLQUFuQjtBQUNBLFlBQUksS0FBS2pDLElBQUwsQ0FBVVEsZ0JBQVYsSUFBOEIsS0FBbEMsRUFBeUM7QUFDdkN5Qix5QkFBZSxNQUFmO0FBQ0Q7QUFDRCxhQUFLaEIsT0FBTCxDQUFhO0FBQ1hYLDJCQUFpQixPQUROO0FBRVhDLHVCQUFhLGNBRkY7QUFHWEMsNEJBQWtCeUIsWUFIUDtBQUlYL0IsMEJBQWdCO0FBSkwsU0FBYjs7QUFPQSxhQUFLaUIsWUFBTDtBQUNBO0FBQ0Y7QUFDRTtBQUNBLGFBQUtGLE9BQUwsQ0FBYTtBQUNYWCwyQkFBaUIsU0FETjtBQUVYQyx1QkFBYSxVQUZGO0FBR1hDLDRCQUFrQixNQUhQO0FBSVhOLDBCQUFnQixLQUpMO0FBS1hHLHNCQUFZO0FBTEQsU0FBYjtBQU9BLGFBQUtjLFlBQUw7QUFoQ0o7QUFrQ0QsRztBQUNEZSxrQkFBZ0Isd0JBQVNMLEtBQVQsRUFBZTtBQUM3QixRQUFJTSxlQUFlTixNQUFNTyxNQUFOLENBQWFDLE9BQWIsQ0FBcUJDLGFBQXhDO0FBQ0EsU0FBS3JCLE9BQUwsQ0FBYTtBQUNYLHdCQUFrQixLQURQO0FBRVgsb0JBQWMsS0FBS2pCLElBQUwsQ0FBVUcsY0FBVixDQUF5QmdDLFlBQXpCLEVBQXVDSDtBQUYxQyxLQUFiO0FBSUEsU0FBS2IsWUFBTDtBQUNEIiwiZmlsZSI6ImhvdEdvb2RzLnd4cCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhYXR5ID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGkyLmpzXCIpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkurrmsJTmjqjojZAnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgZGF0YToge1xuICAgIGJhbm5lckluZm86IHtcbiAgICAgICdpbWdVcmwnOiAnJyxcbiAgICAgICduYW1lJzogJydcbiAgICB9LFxuICAgIGNhdGVnb3J5RmlsdGVyOiBmYWxzZSxcbiAgICBmaWx0ZXJDYXRlZ29yeTogW10sXG4gICAgZ29vZHNMaXN0OiBbXSxcbiAgICBjYXRlZ29yeUlkOiAwLFxuICAgIGN1cnJlbnRTb3J0VHlwZTogJ2RlZmF1bHQnLFxuICAgIGN1cnJlbnRTb3J0OiAnYWRkX3RpbWUnLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6ICdkZXNjJyxcbiAgICBvZmZzZXQ6IDAsXG4gICAgbGltaXQ6IDEwXG4gIH0sXG4gIGdldEJhbm5lcjogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBkYWF0eS5Hb29kc0hvdChudWxsLHN1Y2Nlc3NGYXkpXG4gICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIGJhbm5lckluZm86IHJlcy5kYXRhLmJhbm5lckluZm8sXG4gICAgICAgIH0pO1xuICAgICB9XG4gIH0sXG4gIGdldENhdGVnb3J5TGlzdDogZnVuY3Rpb24oKXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gIH0sXG4gIGdldEdvb2RzTGlzdDogZnVuY3Rpb24gKCl7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuZGFhdHkuR29vZHNMaXN0KCcnLCcnLCcnLCcnLHRydWUsdGhhdC5kYXRhLmN1cnJlbnRTb3J0T3JkZXIsdGhhdC5kYXRhLmN1cnJlbnRTb3J0LHRoYXQuZGF0YS5vZmZzZXQsdGhhdC5kYXRhLmxpbWl0LG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBnb29kc0xpc3Q6IHJlcy5kYXRhLmdvb2RzTGlzdCxcbiAgICAgICAgICAgIGZpbHRlckNhdGVnb3J5OiByZXMuZGF0YS5maWx0ZXJDYXRlZ29yeUxpc3RcbiAgICAgICAgICB9KTtcbiAgICAgfVxuICB9LFxuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgLy8g6aG16Z2i5Yid5aeL5YyWIG9wdGlvbnPkuLrpobXpnaLot7PovazmiYDluKbmnaXnmoTlj4LmlbBcbiAgICB0aGlzLmdldEJhbm5lcigpO1xuICAgIHRoaXMuZ2V0R29vZHNMaXN0KCk7XG4gIH0sXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLmuLLmn5PlrozmiJBcbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i5pi+56S6XG5cbiAgfSxcbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i6ZqQ6JePXG5cbiAgfSxcbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLlhbPpl61cblxuICB9LFxuICBvcGVuU29ydEZpbHRlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IGN1cnJlbnRJZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuaWQ7XG4gICAgc3dpdGNoIChjdXJyZW50SWQpIHtcbiAgICAgIGNhc2UgJ2NhdGVnb3J5RmlsdGVyJzpcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBjYXRlZ29yeUZpbHRlcjogIXRoaXMuZGF0YS5jYXRlZ29yeUZpbHRlcixcbiAgICAgICAgICBjdXJyZW50U29ydFR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgY3VycmVudFNvcnQ6ICdhZGRfdGltZScsXG4gICAgICAgICAgY3VycmVudFNvcnRPcmRlcjogJ2Rlc2MnXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ByaWNlU29ydCc6XG4gICAgICAgIGxldCB0bXBTb3J0T3JkZXIgPSAnYXNjJztcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5jdXJyZW50U29ydE9yZGVyID09ICdhc2MnKSB7XG4gICAgICAgICAgdG1wU29ydE9yZGVyID0gJ2Rlc2MnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgY3VycmVudFNvcnRUeXBlOiAncHJpY2UnLFxuICAgICAgICAgIGN1cnJlbnRTb3J0OiAncmV0YWlsX3ByaWNlJyxcbiAgICAgICAgICBjdXJyZW50U29ydE9yZGVyOiB0bXBTb3J0T3JkZXIsXG4gICAgICAgICAgY2F0ZWdvcnlGaWx0ZXI6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ2V0R29vZHNMaXN0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy/nu7zlkIjmjpLluo9cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBjdXJyZW50U29ydFR5cGU6ICdkZWZhdWx0JyxcbiAgICAgICAgICBjdXJyZW50U29ydDogJ2FkZF90aW1lJyxcbiAgICAgICAgICBjdXJyZW50U29ydE9yZGVyOiAnZGVzYycsXG4gICAgICAgICAgY2F0ZWdvcnlGaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgIGNhdGVnb3J5SWQ6IDAsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldEdvb2RzTGlzdCgpO1xuICAgIH1cbiAgfSxcbiAgc2VsZWN0Q2F0ZWdvcnk6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuY2F0ZWdvcnlJbmRleDtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJ2NhdGVnb3J5RmlsdGVyJzogZmFsc2UsXG4gICAgICAnY2F0ZWdvcnlJZCc6IHRoaXMuZGF0YS5maWx0ZXJDYXRlZ29yeVtjdXJyZW50SW5kZXhdLmlkXG4gICAgfSk7XG4gICAgdGhpcy5nZXRHb29kc0xpc3QoKTtcbiAgfVxufSJdfQ==