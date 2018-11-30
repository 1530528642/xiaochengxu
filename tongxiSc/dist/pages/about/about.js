'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  onLoad: function onLoad(option) {
    // var msg=option.a
    // console.log(msg)
    //   this.setData({
    //     msgs:msg
    // })
  },
  data: {
    // msgs:"",
    wechatInfo: {
      image: 'https://s10.mogucdn.com/mlcdn/c45406/180108_888g0d26e23h9j8fc9e3bd7j3e85h_430x430.jpg_320x999.jpg'
    },
    weApps: [{
      'title': '蘑菇街女装精选',
      'qrcode': 'https://s10.mogucdn.com/mlcdn/c45406/171109_75kgh1k6f0dl7hf67325bcl2dld4c_430x430.jpg'
    }, {
      'title': '小店微商城',
      'qrcode': 'https://s10.mogucdn.com/mlcdn/c45406/171109_113k5be6hfhld22lg5cabi6d6fi43_430x430.jpg'
    }, {
      'title': '超级购物台',
      'qrcode': 'https://s10.mogucdn.com/mlcdn/c45406/171109_43acl29a9lcidekhbjafjbke2d8a3_430x430.jpg'
    }, {
      'title': '全球爆款折扣商城',
      'qrcode': 'https://s10.mogucdn.com/mlcdn/c45406/171130_8blh9b4819cg9li85icg2jgbl6038_344x344.png'
    }, {
      'title': '蘑菇生活优选',
      'qrcode': 'https://s10.mogucdn.com/mlcdn/c45406/171109_39c1aah1j1hela8i4j9lh34d9gf55_344x344.jpg'
    }, {
      'title': '大福利',
      'qrcode': 'https://s11.mogucdn.com/mlcdn/c45406/171117_6438akf0gi8h6idecjai8kiiefchj_344x344.jpg'
    }, {
      'title': '美丽联合钱包',
      'qrcode': 'https://s11.mogucdn.com/mlcdn/c45406/171108_53bgfeid8c9jecaahcgfia3f85fkk_1280x1280.jpg'
    }, {
      'title': '蘑客联盟',
      'qrcode': 'https://s10.mogucdn.com/mlcdn/c45406/171120_269dc6kh9g67e03dfhkgbjh70d91d_258x258.jpg'
    }]
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '团队介绍 - MinUI小程序组件库',
      path: '/pages/about/index'
    };
  },
  onWechatImage: function onWechatImage(e) {
    var image = e.currentTarget.dataset.image;
    wx.previewImage({
      current: image,
      urls: [image]
    });
  },
  onImageTap: function onImageTap(param) {
    wx.previewImage({
      current: this.data.weApps[param.currentTarget.id].qrcode,
      urls: [this.data.weApps[param.currentTarget.id].qrcode]
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0Lnd4cCJdLCJuYW1lcyI6WyJvbkxvYWQiLCJvcHRpb24iLCJkYXRhIiwid2VjaGF0SW5mbyIsImltYWdlIiwid2VBcHBzIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsInBhdGgiLCJvbldlY2hhdEltYWdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid3giLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsIm9uSW1hZ2VUYXAiLCJwYXJhbSIsImlkIiwicXJjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFNSUEsVUFBTyxnQkFBU0MsTUFBVCxFQUFnQjtBQUNyQjtBQUNBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0MsRztBQUNEQyxRQUFNO0FBQ0o7QUFDQUMsZ0JBQVk7QUFDVkMsYUFBTztBQURHLEtBRlI7QUFLSkMsWUFBUSxDQUNOO0FBQ0UsZUFBUyxTQURYO0FBRUUsZ0JBQVU7QUFGWixLQURNLEVBS047QUFDRSxlQUFTLE9BRFg7QUFFRSxnQkFBVTtBQUZaLEtBTE0sRUFTTjtBQUNFLGVBQVMsT0FEWDtBQUVFLGdCQUFVO0FBRlosS0FUTSxFQWFOO0FBQ0UsZUFBUyxVQURYO0FBRUUsZ0JBQVU7QUFGWixLQWJNLEVBaUJOO0FBQ0UsZUFBUyxRQURYO0FBRUUsZ0JBQVU7QUFGWixLQWpCTSxFQXFCTjtBQUNFLGVBQVMsS0FEWDtBQUVFLGdCQUFVO0FBRlosS0FyQk0sRUF5Qk47QUFDRSxlQUFTLFFBRFg7QUFFRSxnQkFBVTtBQUZaLEtBekJNLEVBNkJOO0FBQ0UsZUFBUyxNQURYO0FBRUUsZ0JBQVU7QUFGWixLQTdCTTtBQUxKLEc7QUF3Q05DLHFCQUFtQiw2QkFBWTtBQUM3QixXQUFPO0FBQ0xDLGFBQU8sb0JBREY7QUFFTEMsWUFBTTtBQUZELEtBQVA7QUFJRCxHO0FBQ0RDLGUseUJBQWNDLEMsRUFBRztBQUNmLFFBQUlOLFFBQVFNLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCUixLQUFwQztBQUNBUyxPQUFHQyxZQUFILENBQWdCO0FBQ2RDLGVBQVNYLEtBREs7QUFFZFksWUFBTSxDQUFDWixLQUFEO0FBRlEsS0FBaEI7QUFJRCxHO0FBQ0RhLFksc0JBQVdDLEssRUFBTztBQUNoQkwsT0FBR0MsWUFBSCxDQUFnQjtBQUNkQyxlQUFTLEtBQUtiLElBQUwsQ0FBVUcsTUFBVixDQUFpQmEsTUFBTVAsYUFBTixDQUFvQlEsRUFBckMsRUFBeUNDLE1BRHBDO0FBRWRKLFlBQU0sQ0FBQyxLQUFLZCxJQUFMLENBQVVHLE1BQVYsQ0FBaUJhLE1BQU1QLGFBQU4sQ0FBb0JRLEVBQXJDLEVBQXlDQyxNQUExQztBQUZRLEtBQWhCO0FBSUQiLCJmaWxlIjoiYWJvdXQud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29uZmlnOiB7XHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6ZnVuY3Rpb24ob3B0aW9uKXtcclxuICAgICAgLy8gdmFyIG1zZz1vcHRpb24uYVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhtc2cpXHJcbiAgICAvLyAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAvLyAgICAgbXNnczptc2dcclxuICAgIC8vIH0pXHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAvLyBtc2dzOlwiXCIsXHJcbiAgICAgIHdlY2hhdEluZm86IHtcclxuICAgICAgICBpbWFnZTogJ2h0dHBzOi8vczEwLm1vZ3VjZG4uY29tL21sY2RuL2M0NTQwNi8xODAxMDhfODg4ZzBkMjZlMjNoOWo4ZmM5ZTNiZDdqM2U4NWhfNDMweDQzMC5qcGdfMzIweDk5OS5qcGcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHdlQXBwczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICd0aXRsZSc6ICfomJHoj4fooZflpbPoo4Xnsr7pgIknLFxyXG4gICAgICAgICAgJ3FyY29kZSc6ICdodHRwczovL3MxMC5tb2d1Y2RuLmNvbS9tbGNkbi9jNDU0MDYvMTcxMTA5Xzc1a2doMWs2ZjBkbDdoZjY3MzI1YmNsMmRsZDRjXzQzMHg0MzAuanBnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3RpdGxlJzogJ+Wwj+W6l+W+ruWVhuWfjicsXHJcbiAgICAgICAgICAncXJjb2RlJzogJ2h0dHBzOi8vczEwLm1vZ3VjZG4uY29tL21sY2RuL2M0NTQwNi8xNzExMDlfMTEzazViZTZoZmhsZDIybGc1Y2FiaTZkNmZpNDNfNDMweDQzMC5qcGcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAndGl0bGUnOiAn6LaF57qn6LSt54mp5Y+wJyxcclxuICAgICAgICAgICdxcmNvZGUnOiAnaHR0cHM6Ly9zMTAubW9ndWNkbi5jb20vbWxjZG4vYzQ1NDA2LzE3MTEwOV80M2FjbDI5YTlsY2lkZWtoYmphZmpia2UyZDhhM180MzB4NDMwLmpwZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICd0aXRsZSc6ICflhajnkIPniIbmrL7mipjmiaPllYbln44nLFxyXG4gICAgICAgICAgJ3FyY29kZSc6ICdodHRwczovL3MxMC5tb2d1Y2RuLmNvbS9tbGNkbi9jNDU0MDYvMTcxMTMwXzhibGg5YjQ4MTljZzlsaTg1aWNnMmpnYmw2MDM4XzM0NHgzNDQucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3RpdGxlJzogJ+iYkeiPh+eUn+a0u+S8mOmAiScsXHJcbiAgICAgICAgICAncXJjb2RlJzogJ2h0dHBzOi8vczEwLm1vZ3VjZG4uY29tL21sY2RuL2M0NTQwNi8xNzExMDlfMzljMWFhaDFqMWhlbGE4aTRqOWxoMzRkOWdmNTVfMzQ0eDM0NC5qcGcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAndGl0bGUnOiAn5aSn56aP5YipJyxcclxuICAgICAgICAgICdxcmNvZGUnOiAnaHR0cHM6Ly9zMTEubW9ndWNkbi5jb20vbWxjZG4vYzQ1NDA2LzE3MTExN182NDM4YWtmMGdpOGg2aWRlY2phaThraWllZmNoal8zNDR4MzQ0LmpwZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICd0aXRsZSc6ICfnvo7kuL3ogZTlkIjpkrHljIUnLFxyXG4gICAgICAgICAgJ3FyY29kZSc6ICdodHRwczovL3MxMS5tb2d1Y2RuLmNvbS9tbGNkbi9jNDU0MDYvMTcxMTA4XzUzYmdmZWlkOGM5amVjYWFoY2dmaWEzZjg1ZmtrXzEyODB4MTI4MC5qcGcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAndGl0bGUnOiAn6JiR5a6i6IGU55ufJyxcclxuICAgICAgICAgICdxcmNvZGUnOiAnaHR0cHM6Ly9zMTAubW9ndWNkbi5jb20vbWxjZG4vYzQ1NDA2LzE3MTEyMF8yNjlkYzZraDlnNjdlMDNkZmhrZ2JqaDcwZDkxZF8yNTh4MjU4LmpwZydcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiAn5Zui6Zif5LuL57uNIC0gTWluVUnlsI/nqIvluo/nu4Tku7blupMnLFxyXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvYWJvdXQvaW5kZXgnXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbldlY2hhdEltYWdlKGUpIHtcclxuICAgICAgbGV0IGltYWdlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW1hZ2VcclxuICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICBjdXJyZW50OiBpbWFnZSxcclxuICAgICAgICB1cmxzOiBbaW1hZ2VdXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgb25JbWFnZVRhcChwYXJhbSkge1xyXG4gICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgIGN1cnJlbnQ6IHRoaXMuZGF0YS53ZUFwcHNbcGFyYW0uY3VycmVudFRhcmdldC5pZF0ucXJjb2RlLFxyXG4gICAgICAgIHVybHM6IFt0aGlzLmRhdGEud2VBcHBzW3BhcmFtLmN1cnJlbnRUYXJnZXQuaWRdLnFyY29kZV1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9Il19