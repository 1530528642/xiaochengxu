"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
var tip = require("../../utils/tip.js");
// data-uids={{item.uid}}
exports.default = Page({
  data: {
    dasylist: '', //所有数据
    uids: '' //删除返回列表uid
  },
  onShow: function onShow() {
    var thery = this;
    daaty.groupList(5, 0, successFa);
    function successFa(data, sourceObj) {
      // console.log(data,1232)
      thery.setData({ dasylist: data.data });
    }
  },
  delete: function _delete() {
    //删除
    var thiy = this;
    if (thiy.data.uids == '') {
      // console.log(88555)
      return false;
    }
    // tip.showModal("确认删除该分组")
    daaty.delGroup(thiy.data.uids, 5, 0, successFa);
    function successFa(data, sourceObj) {
      // console.log(data,8799)
      thery.setData({ dasylist: data.data });
    }
  },
  listclik: function listclik() {
    // console.log(e)
    // console.log(1111)
  },
  add: function add() {
    //添加
    wx.navigateTo({
      url: '../newfil/newfil?a=1'
    });
  },
  ubdata: function ubdata() {
    wx.navigateTo({
      url: '../newfil/newfil?a=2' + "&uisy=" + this.data.uids
    });
  },
  radiocliovk: function radiocliovk(e) {
    this.setData({ uids: e.currentTarget.dataset.uids });
    // console.log(e.currentTarget.dataset.uids)
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbmFnZS53eHAiXSwibmFtZXMiOlsiZGFhdHkiLCJyZXF1aXJlIiwidGlwIiwiZGF0YSIsImRhc3lsaXN0IiwidWlkcyIsIm9uU2hvdyIsInRoZXJ5IiwiZ3JvdXBMaXN0Iiwic3VjY2Vzc0ZhIiwic291cmNlT2JqIiwic2V0RGF0YSIsImRlbGV0ZSIsInRoaXkiLCJkZWxHcm91cCIsImxpc3RjbGlrIiwiYWRkIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidWJkYXRhIiwicmFkaW9jbGlvdmsiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBU0MsUUFBUSxxQkFBUixDQUFiO0FBQ0UsSUFBSUMsTUFBTUQsUUFBUSxvQkFBUixDQUFWO0FBQ0E7O0FBTUFFLFFBQU07QUFDSkMsY0FBUyxFQURMLEVBQ1E7QUFDWkMsVUFBSyxFQUZELENBRUs7QUFGTCxHO0FBSU5DLFVBQU8sa0JBQVU7QUFDZixRQUFJQyxRQUFRLElBQVo7QUFDQVAsVUFBTVEsU0FBTixDQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQkMsU0FBcEI7QUFDQSxhQUFTQSxTQUFULENBQW1CTixJQUFuQixFQUF5Qk8sU0FBekIsRUFBbUM7QUFDakM7QUFDQUgsWUFBTUksT0FBTixDQUFjLEVBQUNQLFVBQVNELEtBQUtBLElBQWYsRUFBZDtBQUNEO0FBQ0YsRztBQUNEUyxVQUFPLG1CQUFVO0FBQUk7QUFDbkIsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBR0EsS0FBS1YsSUFBTCxDQUFVRSxJQUFWLElBQWtCLEVBQXJCLEVBQXdCO0FBQ3RCO0FBQ0MsYUFBTyxLQUFQO0FBQ0Y7QUFDRDtBQUNBTCxVQUFNYyxRQUFOLENBQWVELEtBQUtWLElBQUwsQ0FBVUUsSUFBekIsRUFBOEIsQ0FBOUIsRUFBZ0MsQ0FBaEMsRUFBa0NJLFNBQWxDO0FBQ0EsYUFBU0EsU0FBVCxDQUFtQk4sSUFBbkIsRUFBeUJPLFNBQXpCLEVBQW1DO0FBQ2pDO0FBQ0FILFlBQU1JLE9BQU4sQ0FBYyxFQUFDUCxVQUFTRCxLQUFLQSxJQUFmLEVBQWQ7QUFDRDtBQUNGLEc7QUFDRFksWUFBUyxvQkFBVTtBQUNmO0FBQ0E7QUFDSCxHO0FBQ0RDLE9BQUksZUFBVTtBQUFHO0FBQ2hCQyxPQUFHQyxVQUFILENBQWM7QUFDWEMsV0FBSTtBQURPLEtBQWQ7QUFHQSxHO0FBQ0RDLFVBQU8sa0JBQVU7QUFDZEgsT0FBR0MsVUFBSCxDQUFjO0FBQ2JDLFdBQUkseUJBQXVCLFFBQXZCLEdBQWdDLEtBQUtoQixJQUFMLENBQVVFO0FBRGpDLEtBQWQ7QUFHRixHO0FBQ0RnQixlQUFZLHFCQUFTQyxDQUFULEVBQVc7QUFDckIsU0FBS1gsT0FBTCxDQUFhLEVBQUNOLE1BQUtpQixFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3Qm5CLElBQTlCLEVBQWI7QUFDQTtBQUNEIiwiZmlsZSI6Im1hbmFnZS53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGFhdHkgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaTIuanNcIilcbiAgdmFyIHRpcCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy90aXAuanNcIilcbiAgLy8gZGF0YS11aWRzPXt7aXRlbS51aWR9fVxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn566h55CGJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBkYXN5bGlzdDonJywvL+aJgOacieaVsOaNrlxuICAgIHVpZHM6JycgIC8v5Yig6Zmk6L+U5Zue5YiX6KGodWlkXG4gIH0sXG4gIG9uU2hvdzpmdW5jdGlvbigpe1xuICAgIHZhciB0aGVyeSA9IHRoaXNcbiAgICBkYWF0eS5ncm91cExpc3QoNSwwLHN1Y2Nlc3NGYSlcbiAgICBmdW5jdGlvbiBzdWNjZXNzRmEoZGF0YSwgc291cmNlT2JqKXtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEsMTIzMilcbiAgICAgIHRoZXJ5LnNldERhdGEoe2Rhc3lsaXN0OmRhdGEuZGF0YX0pXG4gICAgfVxuICB9LFxuICBkZWxldGU6ZnVuY3Rpb24oKXsgICAvL+WIoOmZpFxuICAgIHZhciB0aGl5ID0gdGhpcztcbiAgICBpZih0aGl5LmRhdGEudWlkcyA9PSAnJyl7XG4gICAgICAvLyBjb25zb2xlLmxvZyg4ODU1NSlcbiAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgLy8gdGlwLnNob3dNb2RhbChcIuehruiupOWIoOmZpOivpeWIhue7hFwiKVxuICAgIGRhYXR5LmRlbEdyb3VwKHRoaXkuZGF0YS51aWRzLDUsMCxzdWNjZXNzRmEpXG4gICAgZnVuY3Rpb24gc3VjY2Vzc0ZhKGRhdGEsIHNvdXJjZU9iail7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLDg3OTkpXG4gICAgICB0aGVyeS5zZXREYXRhKHtkYXN5bGlzdDpkYXRhLmRhdGF9KVxuICAgIH1cbiAgfSxcbiAgbGlzdGNsaWs6ZnVuY3Rpb24oKXtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGUpXG4gICAgICAvLyBjb25zb2xlLmxvZygxMTExKVxuICB9LFxuICBhZGQ6ZnVuY3Rpb24oKXsgIC8v5re75YqgXG4gICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDonLi4vbmV3ZmlsL25ld2ZpbD9hPTEnXG4gICAgfSlcbiAgfSxcbiAgdWJkYXRhOmZ1bmN0aW9uKCl7XG4gICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOicuLi9uZXdmaWwvbmV3ZmlsP2E9MicrXCImdWlzeT1cIit0aGlzLmRhdGEudWlkc1xuICAgIH0pXG4gIH0sXG4gIHJhZGlvY2xpb3ZrOmZ1bmN0aW9uKGUpe1xuICAgIHRoaXMuc2V0RGF0YSh7dWlkczplLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51aWRzfSlcbiAgICAvLyBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51aWRzKVxuICB9XG59Il19