'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  onLoad: function onLoad(option) {
    console.log(option);
    this.setData({
      title: option.a
    });
  },

  data: {
    image: 'https://s10.mogucdn.com/p2/161213/upload_76h1c5hjc8heecjehlfgekjdl2ki0_514x260.png',
    title: '',
    tip: '洗车用同洗',
    button: '返回主页'
  },
  onAbnorTap: function onAbnorTap() {
    wx.reLaunch({
      url: '../home/index'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFibm9ybWFsLnd4cCJdLCJuYW1lcyI6WyJvbkxvYWQiLCJvcHRpb24iLCJjb25zb2xlIiwibG9nIiwic2V0RGF0YSIsInRpdGxlIiwiYSIsImRhdGEiLCJpbWFnZSIsInRpcCIsImJ1dHRvbiIsIm9uQWJub3JUYXAiLCJ3eCIsInJlTGF1bmNoIiwidXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDTUEsVUFBUSxnQkFBU0MsTUFBVCxFQUFnQjtBQUN4QkMsWUFBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0MsU0FBS0csT0FBTCxDQUFhO0FBQ2RDLGFBQU9KLE9BQU9LO0FBREEsS0FBYjtBQUdGLEc7O0FBTURDLFFBQU07QUFDSkMsV0FBTyxvRkFESDtBQUVKSCxXQUFPLEVBRkg7QUFHSkksU0FBSyxPQUhEO0FBSUpDLFlBQVE7QUFKSixHO0FBTUpDLFksd0JBQWE7QUFDYkMsT0FBR0MsUUFBSCxDQUFZO0FBQ1ZDLFdBQUs7QUFESyxLQUFaO0FBR0QiLCJmaWxlIjoiYWJub3JtYWwud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAgICAgb25Mb2FkOiBmdW5jdGlvbihvcHRpb24pe1xuICAgICAgY29uc29sZS5sb2cob3B0aW9uKVxuICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0aXRsZTogb3B0aW9uLmFcbiAgICAgICB9KVxuICAgIH0sXG4gICAgY29uZmlnOiB7XG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtYWJub3InOiAnQG1pbnVpL3d4Yy1hYm5vcidcbiAgICAgIH1cbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIGltYWdlOiAnaHR0cHM6Ly9zMTAubW9ndWNkbi5jb20vcDIvMTYxMjEzL3VwbG9hZF83NmgxYzVoamM4aGVlY2plaGxmZ2VramRsMmtpMF81MTR4MjYwLnBuZycsXG4gICAgICB0aXRsZTogJycsXG4gICAgICB0aXA6ICfmtJfovabnlKjlkIzmtJcnLFxuICAgICAgYnV0dG9uOiAn6L+U5Zue5Li76aG1J1xuICAgIH0sXG4gICAgICBvbkFibm9yVGFwKCkge1xuICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICB1cmw6ICcuLi9ob21lL2luZGV4J1xuICAgICAgfSlcbiAgICB9XG4gICAgfSJdfQ==