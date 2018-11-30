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
    daaty.GoodsNew(null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        bannerInfo: res.data.bannerInfo
      });
    }
  },
  getGoodsList: function getGoodsList() {
    var that = this;
    daaty.GoodsList('', '', '', true, '', that.data.currentSortOrder, that.data.currentSort, that.data.offset, that.data.limit, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        goodsList: res.data.goodsList,
        filterCategory: res.data.filterCategoryList
      });
    }
    // util.request(api.GoodsList, { isNew: true, page: that.data.page, size: that.data.size, order: that.data.currentSortOrder, sort: that.data.currentSort, categoryId: that.data.categoryId })
    //   .then(function (res) {
    //     if (res.errno === 0) {
    //      
    //     }
    //   });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0dvb2RzLnd4cCJdLCJuYW1lcyI6WyJkYWF0eSIsInJlcXVpcmUiLCJkYXRhIiwiYmFubmVySW5mbyIsImNhdGVnb3J5RmlsdGVyIiwiZmlsdGVyQ2F0ZWdvcnkiLCJnb29kc0xpc3QiLCJjYXRlZ29yeUlkIiwiY3VycmVudFNvcnRUeXBlIiwiY3VycmVudFNvcnQiLCJjdXJyZW50U29ydE9yZGVyIiwib2Zmc2V0IiwibGltaXQiLCJnZXRCYW5uZXIiLCJ0aGF0IiwiR29vZHNOZXciLCJzdWNjZXNzRmF5IiwicmVzIiwic291cmNlT2JqIiwic2V0RGF0YSIsImdldEdvb2RzTGlzdCIsIkdvb2RzTGlzdCIsImZpbHRlckNhdGVnb3J5TGlzdCIsIm9uTG9hZCIsIm9wdGlvbnMiLCJvblJlYWR5Iiwib25TaG93Iiwib25IaWRlIiwib25VbmxvYWQiLCJvcGVuU29ydEZpbHRlciIsImV2ZW50IiwiY3VycmVudElkIiwiY3VycmVudFRhcmdldCIsImlkIiwidG1wU29ydE9yZGVyIiwic2VsZWN0Q2F0ZWdvcnkiLCJjdXJyZW50SW5kZXgiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY2F0ZWdvcnlJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxRQUFTQyxRQUFRLHFCQUFSLENBQWY7O0FBTUVDLFFBQU07QUFDSkMsZ0JBQVk7QUFDVixnQkFBVSxFQURBO0FBRVYsY0FBUTtBQUZFLEtBRFI7QUFLSkMsb0JBQWdCLEtBTFo7QUFNSkMsb0JBQWdCLEVBTlo7QUFPSkMsZUFBVyxFQVBQO0FBUUpDLGdCQUFZLENBUlI7QUFTSkMscUJBQWlCLFNBVGI7QUFVSkMsaUJBQWEsVUFWVDtBQVdKQyxzQkFBa0IsTUFYZDtBQVlKQyxZQUFRLENBWko7QUFhSkMsV0FBTztBQWJILEc7QUFlTkMsYUFBVyxxQkFBWTtBQUNyQixRQUFJQyxPQUFPLElBQVg7QUFDQ2QsVUFBTWUsUUFBTixDQUFlLElBQWYsRUFBb0JDLFVBQXBCO0FBQ0EsYUFBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQ2hDSixXQUFLSyxPQUFMLENBQWE7QUFDUGhCLG9CQUFZYyxJQUFJZixJQUFKLENBQVNDO0FBRGQsT0FBYjtBQUdGO0FBQ0gsRztBQUNEaUIsZ0JBQWMsd0JBQVc7QUFDdkIsUUFBSU4sT0FBTyxJQUFYO0FBQ0NkLFVBQU1xQixTQUFOLENBQWdCLEVBQWhCLEVBQW1CLEVBQW5CLEVBQXNCLEVBQXRCLEVBQXlCLElBQXpCLEVBQThCLEVBQTlCLEVBQWlDUCxLQUFLWixJQUFMLENBQVVRLGdCQUEzQyxFQUE0REksS0FBS1osSUFBTCxDQUFVTyxXQUF0RSxFQUFrRkssS0FBS1osSUFBTCxDQUFVUyxNQUE1RixFQUFtR0csS0FBS1osSUFBTCxDQUFVVSxLQUE3RyxFQUFtSCxJQUFuSCxFQUF3SEksVUFBeEg7QUFDQSxhQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsU0FBekIsRUFBbUM7QUFDOUJKLFdBQUtLLE9BQUwsQ0FBYTtBQUNYYixtQkFBV1csSUFBSWYsSUFBSixDQUFTSSxTQURUO0FBRVhELHdCQUFnQlksSUFBSWYsSUFBSixDQUFTb0I7QUFGZCxPQUFiO0FBSUo7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxHO0FBQ0RDLFVBQVEsZ0JBQVVDLE9BQVYsRUFBbUI7QUFDekI7QUFDQSxTQUFLWCxTQUFMO0FBQ0EsU0FBS08sWUFBTDtBQUNELEc7QUFDREssV0FBUyxtQkFBWTtBQUNuQjtBQUNELEc7QUFDREMsVUFBUSxrQkFBWTtBQUNsQjs7QUFFRCxHO0FBQ0RDLFVBQVEsa0JBQVk7QUFDbEI7O0FBRUQsRztBQUNEQyxZQUFVLG9CQUFZO0FBQ3BCOztBQUVELEc7QUFDREMsa0JBQWdCLHdCQUFVQyxLQUFWLEVBQWlCO0FBQy9CLFFBQUlDLFlBQVlELE1BQU1FLGFBQU4sQ0FBb0JDLEVBQXBDO0FBQ0EsWUFBUUYsU0FBUjtBQUNFLFdBQUssZ0JBQUw7QUFDRSxhQUFLWixPQUFMLENBQWE7QUFDWGYsMEJBQWdCLENBQUMsS0FBS0YsSUFBTCxDQUFVRSxjQURoQjtBQUVYSSwyQkFBaUIsVUFGTjtBQUdYQyx1QkFBYSxVQUhGO0FBSVhDLDRCQUFrQjtBQUpQLFNBQWI7QUFNQTtBQUNGLFdBQUssV0FBTDtBQUNFLFlBQUl3QixlQUFlLEtBQW5CO0FBQ0EsWUFBSSxLQUFLaEMsSUFBTCxDQUFVUSxnQkFBVixJQUE4QixLQUFsQyxFQUF5QztBQUN2Q3dCLHlCQUFlLE1BQWY7QUFDRDtBQUNELGFBQUtmLE9BQUwsQ0FBYTtBQUNYWCwyQkFBaUIsT0FETjtBQUVYQyx1QkFBYSxjQUZGO0FBR1hDLDRCQUFrQndCLFlBSFA7QUFJWDlCLDBCQUFnQjtBQUpMLFNBQWI7O0FBT0EsYUFBS2dCLFlBQUw7QUFDQTtBQUNGO0FBQ0U7QUFDQSxhQUFLRCxPQUFMLENBQWE7QUFDWFgsMkJBQWlCLFNBRE47QUFFWEMsdUJBQWEsVUFGRjtBQUdYQyw0QkFBa0IsTUFIUDtBQUlYTiwwQkFBZ0IsS0FKTDtBQUtYRyxzQkFBWTtBQUxELFNBQWI7QUFPQSxhQUFLYSxZQUFMO0FBaENKO0FBa0NELEc7QUFDRGUsa0JBQWdCLHdCQUFVTCxLQUFWLEVBQWlCO0FBQy9CLFFBQUlNLGVBQWVOLE1BQU1PLE1BQU4sQ0FBYUMsT0FBYixDQUFxQkMsYUFBeEM7QUFDQSxTQUFLcEIsT0FBTCxDQUFhO0FBQ1gsd0JBQWtCLEtBRFA7QUFFWCxvQkFBYyxLQUFLakIsSUFBTCxDQUFVRyxjQUFWLENBQXlCK0IsWUFBekIsRUFBdUNIO0FBRjFDLEtBQWI7QUFJQSxTQUFLYixZQUFMO0FBRUQiLCJmaWxlIjoibmV3R29vZHMud3hwIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGFhdHkgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaTIuanNcIilcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWsOWTgemmluWPkScsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7fVxuICB9LFxuICBkYXRhOiB7XG4gICAgYmFubmVySW5mbzoge1xuICAgICAgJ2ltZ1VybCc6ICcnLFxuICAgICAgJ25hbWUnOiAnJ1xuICAgIH0sXG4gICAgY2F0ZWdvcnlGaWx0ZXI6IGZhbHNlLFxuICAgIGZpbHRlckNhdGVnb3J5OiBbXSxcbiAgICBnb29kc0xpc3Q6IFtdLFxuICAgIGNhdGVnb3J5SWQ6IDAsXG4gICAgY3VycmVudFNvcnRUeXBlOiAnZGVmYXVsdCcsXG4gICAgY3VycmVudFNvcnQ6ICdhZGRfdGltZScsXG4gICAgY3VycmVudFNvcnRPcmRlcjogJ2Rlc2MnLFxuICAgIG9mZnNldDogMCxcbiAgICBsaW1pdDogMTBcbiAgfSxcbiAgZ2V0QmFubmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICBkYWF0eS5Hb29kc05ldyhudWxsLHN1Y2Nlc3NGYXkpXG4gICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICBiYW5uZXJJbmZvOiByZXMuZGF0YS5iYW5uZXJJbmZvLFxuICAgICAgICAgICAgfSk7XG4gICAgIH1cbiAgfSxcbiAgZ2V0R29vZHNMaXN0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgIGRhYXR5Lkdvb2RzTGlzdCgnJywnJywnJyx0cnVlLCcnLHRoYXQuZGF0YS5jdXJyZW50U29ydE9yZGVyLHRoYXQuZGF0YS5jdXJyZW50U29ydCx0aGF0LmRhdGEub2Zmc2V0LHRoYXQuZGF0YS5saW1pdCxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBnb29kc0xpc3Q6IHJlcy5kYXRhLmdvb2RzTGlzdCxcbiAgICAgICAgICAgIGZpbHRlckNhdGVnb3J5OiByZXMuZGF0YS5maWx0ZXJDYXRlZ29yeUxpc3RcbiAgICAgICAgICB9KTtcbiAgICAgfVxuICAgIC8vIHV0aWwucmVxdWVzdChhcGkuR29vZHNMaXN0LCB7IGlzTmV3OiB0cnVlLCBwYWdlOiB0aGF0LmRhdGEucGFnZSwgc2l6ZTogdGhhdC5kYXRhLnNpemUsIG9yZGVyOiB0aGF0LmRhdGEuY3VycmVudFNvcnRPcmRlciwgc29ydDogdGhhdC5kYXRhLmN1cnJlbnRTb3J0LCBjYXRlZ29yeUlkOiB0aGF0LmRhdGEuY2F0ZWdvcnlJZCB9KVxuICAgIC8vICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgIC8vICAgICBpZiAocmVzLmVycm5vID09PSAwKSB7XG4gICAgLy8gICAgICBcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSk7XG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAvLyDpobXpnaLliJ3lp4vljJYgb3B0aW9uc+S4uumhtemdoui3s+i9rOaJgOW4puadpeeahOWPguaVsFxuICAgIHRoaXMuZ2V0QmFubmVyKCk7XG4gICAgdGhpcy5nZXRHb29kc0xpc3QoKTtcbiAgfSxcbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdoua4suafk+WujOaIkFxuICB9LFxuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLmmL7npLpcblxuICB9LFxuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLpmpDol49cblxuICB9LFxuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdouWFs+mXrVxuXG4gIH0sXG4gIG9wZW5Tb3J0RmlsdGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgY3VycmVudElkID0gZXZlbnQuY3VycmVudFRhcmdldC5pZDtcbiAgICBzd2l0Y2ggKGN1cnJlbnRJZCkge1xuICAgICAgY2FzZSAnY2F0ZWdvcnlGaWx0ZXInOlxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGNhdGVnb3J5RmlsdGVyOiAhdGhpcy5kYXRhLmNhdGVnb3J5RmlsdGVyLFxuICAgICAgICAgIGN1cnJlbnRTb3J0VHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgICBjdXJyZW50U29ydDogJ2FkZF90aW1lJyxcbiAgICAgICAgICBjdXJyZW50U29ydE9yZGVyOiAnZGVzYydcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJpY2VTb3J0JzpcbiAgICAgICAgbGV0IHRtcFNvcnRPcmRlciA9ICdhc2MnO1xuICAgICAgICBpZiAodGhpcy5kYXRhLmN1cnJlbnRTb3J0T3JkZXIgPT0gJ2FzYycpIHtcbiAgICAgICAgICB0bXBTb3J0T3JkZXIgPSAnZGVzYyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBjdXJyZW50U29ydFR5cGU6ICdwcmljZScsXG4gICAgICAgICAgY3VycmVudFNvcnQ6ICdyZXRhaWxfcHJpY2UnLFxuICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI6IHRtcFNvcnRPcmRlcixcbiAgICAgICAgICBjYXRlZ29yeUZpbHRlcjogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nZXRHb29kc0xpc3QoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvL+e7vOWQiOaOkuW6j1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGN1cnJlbnRTb3J0VHlwZTogJ2RlZmF1bHQnLFxuICAgICAgICAgIGN1cnJlbnRTb3J0OiAnYWRkX3RpbWUnLFxuICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI6ICdkZXNjJyxcbiAgICAgICAgICBjYXRlZ29yeUZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgY2F0ZWdvcnlJZDogMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRHb29kc0xpc3QoKTtcbiAgICB9XG4gIH0sXG4gIHNlbGVjdENhdGVnb3J5OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuY2F0ZWdvcnlJbmRleDtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJ2NhdGVnb3J5RmlsdGVyJzogZmFsc2UsXG4gICAgICAnY2F0ZWdvcnlJZCc6IHRoaXMuZGF0YS5maWx0ZXJDYXRlZ29yeVtjdXJyZW50SW5kZXhdLmlkXG4gICAgfSk7XG4gICAgdGhpcy5nZXRHb29kc0xpc3QoKTtcblxuICB9XG59Il19