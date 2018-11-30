"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pathds = require("../../utils/navigator.js");
var app = getApp();
exports.default = Page({
  data: {
    texts: "至少5个字",
    min: 5, //最少字数
    max: 30, //最多字数 (根据自己需求改变) 
    val: ''
  },
  onLoad: function onLoad(options) {
    // console.log(decodeURIComponent(options.emy))
    var num = decodeURIComponent(options.emy);
    if (num == 1) {
      this.setData({ placeholder: "请输入您的个性签名" });
    } else {
      this.setData({ placeholder: "请输入标签" });
    }
    this.setData({ ales: num });
  },
  //字数限制  
  inputs: function inputs(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min) this.setData({
      texts: "加油，够5个字可以得20积分哦"
    });else if (len > this.data.min) this.setData({
      texts: " "
    });

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },

  formSubmit: function formSubmit(e) {
    // console.log(e.detail.value)
    if (this.data.ales == 1) {
      app.globalData.txt = e.detail.value.txtrea + "--1";
    } else {
      app.globalData.txt = e.detail.value.txtrea + "--2";
    }
    pathds.navigateBack(1);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHR4dC53eHAiXSwibmFtZXMiOlsicGF0aGRzIiwicmVxdWlyZSIsImFwcCIsImdldEFwcCIsImRhdGEiLCJ0ZXh0cyIsIm1pbiIsIm1heCIsInZhbCIsIm9uTG9hZCIsIm9wdGlvbnMiLCJudW0iLCJkZWNvZGVVUklDb21wb25lbnQiLCJlbXkiLCJzZXREYXRhIiwicGxhY2Vob2xkZXIiLCJhbGVzIiwiaW5wdXRzIiwiZSIsInZhbHVlIiwiZGV0YWlsIiwibGVuIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJjdXJyZW50V29yZE51bWJlciIsImZvcm1TdWJtaXQiLCJnbG9iYWxEYXRhIiwidHh0IiwidHh0cmVhIiwibmF2aWdhdGVCYWNrIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUlBLFNBQVVDLFFBQVEsMEJBQVIsQ0FBZDtBQUNBLElBQUlDLE1BQU1DLFFBQVY7O0FBTUVDLFFBQU07QUFDSkMsV0FBTSxPQURGO0FBRUpDLFNBQUksQ0FGQSxFQUVFO0FBQ05DLFNBQUssRUFIRCxFQUdLO0FBQ1RDLFNBQUk7QUFKQSxHO0FBTU5DLFVBQU8sZ0JBQVNDLE9BQVQsRUFBaUI7QUFDdEI7QUFDQSxRQUFJQyxNQUFNQyxtQkFBbUJGLFFBQVFHLEdBQTNCLENBQVY7QUFDQSxRQUFHRixPQUFPLENBQVYsRUFBWTtBQUNSLFdBQUtHLE9BQUwsQ0FBYSxFQUFDQyxhQUFZLFdBQWIsRUFBYjtBQUNILEtBRkQsTUFFSztBQUNILFdBQUtELE9BQUwsQ0FBYSxFQUFDQyxhQUFZLE9BQWIsRUFBYjtBQUNEO0FBQ0QsU0FBS0QsT0FBTCxDQUFhLEVBQUNFLE1BQUtMLEdBQU4sRUFBYjtBQUNELEc7QUFDRDtBQUNBTSxVQUFRLGdCQUFVQyxDQUFWLEVBQWE7QUFDbkI7QUFDQSxRQUFJQyxRQUFRRCxFQUFFRSxNQUFGLENBQVNELEtBQXJCO0FBQ0E7QUFDQSxRQUFJRSxNQUFNQyxTQUFTSCxNQUFNSSxNQUFmLENBQVY7O0FBRUE7QUFDQSxRQUFHRixPQUFPLEtBQUtqQixJQUFMLENBQVVFLEdBQXBCLEVBQ0ksS0FBS1EsT0FBTCxDQUFhO0FBQ1hULGFBQU87QUFESSxLQUFiLEVBREosS0FJSyxJQUFHZ0IsTUFBTSxLQUFLakIsSUFBTCxDQUFVRSxHQUFuQixFQUNMLEtBQUtRLE9BQUwsQ0FBYTtBQUNYVCxhQUFPO0FBREksS0FBYjs7QUFJQTtBQUNBLFFBQUdnQixNQUFNLEtBQUtqQixJQUFMLENBQVVHLEdBQW5CLEVBQXdCO0FBQ3BCO0FBQ0EsU0FBS08sT0FBTCxDQUFhO0FBQ1ZVLHlCQUFtQkgsR0FEVCxDQUNhO0FBRGIsS0FBYjtBQUdMLEc7O0FBRURJLGNBQVksb0JBQVNQLENBQVQsRUFBWTtBQUNwQjtBQUNBLFFBQUcsS0FBS2QsSUFBTCxDQUFVWSxJQUFWLElBQWtCLENBQXJCLEVBQXVCO0FBQ3JCZCxVQUFJd0IsVUFBSixDQUFlQyxHQUFmLEdBQXFCVCxFQUFFRSxNQUFGLENBQVNELEtBQVQsQ0FBZVMsTUFBZixHQUFzQixLQUEzQztBQUNELEtBRkQsTUFFSztBQUNIMUIsVUFBSXdCLFVBQUosQ0FBZUMsR0FBZixHQUFxQlQsRUFBRUUsTUFBRixDQUFTRCxLQUFULENBQWVTLE1BQWYsR0FBc0IsS0FBM0M7QUFDRDtBQUNENUIsV0FBTzZCLFlBQVAsQ0FBb0IsQ0FBcEI7QUFDRCIsImZpbGUiOiJhZGR0eHQud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHBhdGhkcyA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvbmF2aWdhdG9yLmpzXCIpXG52YXIgYXBwID0gZ2V0QXBwKCk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvJbovpHmlofmnKwnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgZGF0YToge1xuICAgIHRleHRzOlwi6Iez5bCRNeS4quWtl1wiLFxuICAgIG1pbjo1LC8v5pyA5bCR5a2X5pWwXG4gICAgbWF4OiAzMCwgLy/mnIDlpJrlrZfmlbAgKOagueaNruiHquW3semcgOaxguaUueWPmCkgXG4gICAgdmFsOicnXG4gIH0sXG4gIG9uTG9hZDpmdW5jdGlvbihvcHRpb25zKXtcbiAgICAvLyBjb25zb2xlLmxvZyhkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5lbXkpKVxuICAgIHZhciBudW0gPSBkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5lbXkpXG4gICAgaWYobnVtID09IDEpe1xuICAgICAgICB0aGlzLnNldERhdGEoe3BsYWNlaG9sZGVyOlwi6K+36L6T5YWl5oKo55qE5Liq5oCn562+5ZCNXCJ9KVxuICAgIH1lbHNle1xuICAgICAgdGhpcy5zZXREYXRhKHtwbGFjZWhvbGRlcjpcIuivt+i+k+WFpeagh+etvlwifSlcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHthbGVzOm51bX0pXG4gIH0sXG4gIC8v5a2X5pWw6ZmQ5Yi2ICBcbiAgaW5wdXRzOiBmdW5jdGlvbiAoZSkge1xuICAgIC8vIOiOt+WPlui+k+WFpeahhueahOWGheWuuVxuICAgIHZhciB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgIC8vIOiOt+WPlui+k+WFpeahhuWGheWuueeahOmVv+W6plxuICAgIHZhciBsZW4gPSBwYXJzZUludCh2YWx1ZS5sZW5ndGgpO1xuIFxuICAgIC8v5pyA5bCR5a2X5pWw6ZmQ5Yi2XG4gICAgaWYobGVuIDw9IHRoaXMuZGF0YS5taW4pIFxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHRleHRzOiBcIuWKoOayue+8jOWknzXkuKrlrZflj6/ku6XlvpcyMOenr+WIhuWTplwiXG4gICAgICAgIH0pXG4gICAgZWxzZSBpZihsZW4gPiB0aGlzLmRhdGEubWluKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0ZXh0czogXCIgXCJcbiAgICB9KVxuIFxuICAgIC8v5pyA5aSa5a2X5pWw6ZmQ5Yi2XG4gICAgaWYobGVuID4gdGhpcy5kYXRhLm1heCkgcmV0dXJuO1xuICAgICAgICAvLyDlvZPovpPlhaXmoYblhoXlrrnnmoTplb/luqblpKfkuo7mnIDlpKfplb/luqbpmZDliLbvvIhtYXgp5pe277yM57uI5q2ic2V0RGF0YSgp55qE5omn6KGMXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgIGN1cnJlbnRXb3JkTnVtYmVyOiBsZW4gLy/lvZPliY3lrZfmlbAgIFxuICAgICAgICB9KTtcbiAgfSxcbiBcbiAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpXG4gICAgICBpZih0aGlzLmRhdGEuYWxlcyA9PSAxKXtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudHh0ID0gZS5kZXRhaWwudmFsdWUudHh0cmVhK1wiLS0xXCJcbiAgICAgIH1lbHNle1xuICAgICAgICBhcHAuZ2xvYmFsRGF0YS50eHQgPSBlLmRldGFpbC52YWx1ZS50eHRyZWErXCItLTJcIlxuICAgICAgfVxuICAgICAgcGF0aGRzLm5hdmlnYXRlQmFjaygxKVxuICAgIH1cbn0iXX0=