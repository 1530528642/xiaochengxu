'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
exports.default = Page({
  data: {
    bts: '',
    uids: ''
  },
  onLoad: function onLoad(options) {
    console.log(options);
    this.setData({ bts: options.a, uids: options.uisy });
  },
  formSubmit: function formSubmit(e) {
    console.log(e.detail.value.infos, 3333);
    if (this.data.bts == 1) {
      var successFa = function successFa(data, sourceObj) {
        // console.log(data,8799)
      };

      daaty.addGroup(e.detail.value.infos, 5, 0, successFa);
    } else {
      var _successFa = function _successFa(data, sourceObj) {
        // console.log(data,8799)
      };

      console.log(this.data.uids, 87887);
      daaty.updateGroup(this.data.uids, e.detail.value.infos, 5, 0, _successFa);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld2ZpbC53eHAiXSwibmFtZXMiOlsiZGFhdHkiLCJyZXF1aXJlIiwiZGF0YSIsImJ0cyIsInVpZHMiLCJvbkxvYWQiLCJvcHRpb25zIiwiY29uc29sZSIsImxvZyIsInNldERhdGEiLCJhIiwidWlzeSIsImZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJpbmZvcyIsInN1Y2Nlc3NGYSIsInNvdXJjZU9iaiIsImFkZEdyb3VwIiwidXBkYXRlR3JvdXAiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBU0MsUUFBUSxxQkFBUixDQUFiOztBQU1FQyxRQUFNO0FBQ0pDLFNBQUksRUFEQTtBQUVKQyxVQUFLO0FBRkQsRztBQUlOQyxVQUFPLGdCQUFTQyxPQUFULEVBQWlCO0FBQ3BCQyxZQUFRQyxHQUFSLENBQVlGLE9BQVo7QUFDQSxTQUFLRyxPQUFMLENBQWEsRUFBQ04sS0FBSUcsUUFBUUksQ0FBYixFQUFlTixNQUFLRSxRQUFRSyxJQUE1QixFQUFiO0FBQ0gsRztBQUNEQyxjQUFXLG9CQUFTQyxDQUFULEVBQVc7QUFDcEJOLFlBQVFDLEdBQVIsQ0FBWUssRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVDLEtBQTNCLEVBQWlDLElBQWpDO0FBQ0EsUUFBRyxLQUFLZCxJQUFMLENBQVVDLEdBQVYsSUFBaUIsQ0FBcEIsRUFBc0I7QUFBQSxVQUVUYyxTQUZTLEdBRWxCLFNBQVNBLFNBQVQsQ0FBbUJmLElBQW5CLEVBQXlCZ0IsU0FBekIsRUFBbUM7QUFDakM7QUFDRCxPQUppQjs7QUFDcEJsQixZQUFNbUIsUUFBTixDQUFlTixFQUFFQyxNQUFGLENBQVNDLEtBQVQsQ0FBZUMsS0FBOUIsRUFBb0MsQ0FBcEMsRUFBc0MsQ0FBdEMsRUFBd0NDLFNBQXhDO0FBSUQsS0FMRCxNQUtLO0FBQUEsVUFHUUEsVUFIUixHQUdELFNBQVNBLFVBQVQsQ0FBbUJmLElBQW5CLEVBQXlCZ0IsU0FBekIsRUFBbUM7QUFDakM7QUFDRCxPQUxBOztBQUNIWCxjQUFRQyxHQUFSLENBQVksS0FBS04sSUFBTCxDQUFVRSxJQUF0QixFQUEyQixLQUEzQjtBQUNBSixZQUFNb0IsV0FBTixDQUFrQixLQUFLbEIsSUFBTCxDQUFVRSxJQUE1QixFQUFpQ1MsRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVDLEtBQWhELEVBQXNELENBQXRELEVBQXdELENBQXhELEVBQTBEQyxVQUExRDtBQUlEO0FBRUYiLCJmaWxlIjoibmV3ZmlsLnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBkYWF0eSA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYXBpMi5qc1wiKVxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5paw5bu65YiX6KGoJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBidHM6JycsXG4gICAgdWlkczonJ1xuICB9LFxuICBvbkxvYWQ6ZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICBjb25zb2xlLmxvZyhvcHRpb25zKVxuICAgICAgdGhpcy5zZXREYXRhKHtidHM6b3B0aW9ucy5hLHVpZHM6b3B0aW9ucy51aXN5fSlcbiAgfSxcbiAgZm9ybVN1Ym1pdDpmdW5jdGlvbihlKXtcbiAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZS5pbmZvcywzMzMzKVxuICAgIGlmKHRoaXMuZGF0YS5idHMgPT0gMSl7XG4gICAgICBkYWF0eS5hZGRHcm91cChlLmRldGFpbC52YWx1ZS5pbmZvcyw1LDAsc3VjY2Vzc0ZhKVxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzRmEoZGF0YSwgc291cmNlT2JqKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLDg3OTkpXG4gICAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS51aWRzLDg3ODg3KVxuICAgICAgZGFhdHkudXBkYXRlR3JvdXAodGhpcy5kYXRhLnVpZHMsZS5kZXRhaWwudmFsdWUuaW5mb3MsNSwwLHN1Y2Nlc3NGYSlcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZhKGRhdGEsIHNvdXJjZU9iail7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSw4Nzk5KVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICB9XG59Il19