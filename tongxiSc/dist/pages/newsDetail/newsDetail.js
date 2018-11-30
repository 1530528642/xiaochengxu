'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    toView: '',
    almety: false,
    aloky: true
  },
  // onLoad:function(){
  //   this.setData({aloky:true})
  // },
  scrollToViewFn: function scrollToViewFn(e) {
    var _id = e.currentTarget.dataset.isy;
    console.log(this.data.toView, _id, 1111);
    // this.setData({toView:_id,almety:true})
    this.setData({ aloky: true, almety: true });
    console.log(this.data.aloky);
  },

  almey: function almey() {
    this.setData({ almety: false });
  },
  formSubmit: function formSubmit(e) {
    console.log(e, 222);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3NEZXRhaWwud3hwIl0sIm5hbWVzIjpbImRhdGEiLCJ0b1ZpZXciLCJhbG1ldHkiLCJhbG9reSIsInNjcm9sbFRvVmlld0ZuIiwiZSIsIl9pZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaXN5IiwiY29uc29sZSIsImxvZyIsInNldERhdGEiLCJhbG1leSIsImZvcm1TdWJtaXQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtFQSxRQUFNO0FBQ0pDLFlBQU8sRUFESDtBQUVKQyxZQUFPLEtBRkg7QUFHSkMsV0FBTTtBQUhGLEc7QUFLTjtBQUNBO0FBQ0E7QUFDQUMsZ0IsMEJBQWVDLEMsRUFBRztBQUNoQixRQUFJQyxNQUFNRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsR0FBbEM7QUFDQUMsWUFBUUMsR0FBUixDQUFZLEtBQUtYLElBQUwsQ0FBVUMsTUFBdEIsRUFBNkJLLEdBQTdCLEVBQWlDLElBQWpDO0FBQ0E7QUFDQSxTQUFLTSxPQUFMLENBQWEsRUFBQ1QsT0FBTSxJQUFQLEVBQVlELFFBQU8sSUFBbkIsRUFBYjtBQUNBUSxZQUFRQyxHQUFSLENBQVksS0FBS1gsSUFBTCxDQUFVRyxLQUF0QjtBQUNELEc7O0FBQ0RVLFNBQU0saUJBQVU7QUFDZCxTQUFLRCxPQUFMLENBQWEsRUFBQ1YsUUFBTyxLQUFSLEVBQWI7QUFDRCxHO0FBQ0RZLGNBQVksb0JBQVNULENBQVQsRUFBWTtBQUN0QkssWUFBUUMsR0FBUixDQUFZTixDQUFaLEVBQWMsR0FBZDtBQUNEIiwiZmlsZSI6Im5ld3NEZXRhaWwud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K+m5oOFJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICB0b1ZpZXc6JycsXG4gICAgYWxtZXR5OmZhbHNlLFxuICAgIGFsb2t5OnRydWVcbiAgfSxcbiAgLy8gb25Mb2FkOmZ1bmN0aW9uKCl7XG4gIC8vICAgdGhpcy5zZXREYXRhKHthbG9reTp0cnVlfSlcbiAgLy8gfSxcbiAgc2Nyb2xsVG9WaWV3Rm4oZSkge1xuICAgIHZhciBfaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pc3k7XG4gICAgY29uc29sZS5sb2codGhpcy5kYXRhLnRvVmlldyxfaWQsMTExMSlcbiAgICAvLyB0aGlzLnNldERhdGEoe3RvVmlldzpfaWQsYWxtZXR5OnRydWV9KVxuICAgIHRoaXMuc2V0RGF0YSh7YWxva3k6dHJ1ZSxhbG1ldHk6dHJ1ZX0pXG4gICAgY29uc29sZS5sb2codGhpcy5kYXRhLmFsb2t5KVxuICB9LFxuICBhbG1leTpmdW5jdGlvbigpe1xuICAgIHRoaXMuc2V0RGF0YSh7YWxtZXR5OmZhbHNlfSlcbiAgfSxcbiAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkgeyAgXG4gICAgY29uc29sZS5sb2coZSwyMjIpXG4gIH1cbn0iXX0=