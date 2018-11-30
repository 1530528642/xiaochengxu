'use strict';

// 导航

// Tip
// 1: wx.navigateTo 和 wx.redirectTo 不允许跳转到 tabbar 页面，只能用 wx.switchTab 跳转到 tabbar 页面

// 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面
var navigateTo = function navigateTo(url, obj) {
    wx.navigateTo({
        url: handleUrl(url, obj)
    });
};

// 关闭当前页面，跳转到应用内的某个页面
var redirectTo = function redirectTo(url, obj) {
    wx.redirectTo({
        url: url
    });
};

// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
var switchTab = function switchTab(url) {
    wx.switchTab({
        url: url
    });
};

// 处理 url
var handleUrl = function handleUrl(url, obj) {
    if (obj) {
        url = url + '?';
        for (var key in obj) {
            obj[key] = encodeURIComponent(obj[key]);
            url += key + '=' + obj[key] + '&';
        }
        return url = url.substring(0, url.length - 1);
    }
    return url;
};

// 关闭当前页面，返回上一页面或多级页面
var navigateBack = function navigateBack(delta) {
    wx.navigateBack({
        delta: delta
    });
};

module.exports = {
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    switchTab: switchTab,
    navigateBack: navigateBack
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci5qcyJdLCJuYW1lcyI6WyJuYXZpZ2F0ZVRvIiwidXJsIiwib2JqIiwid3giLCJoYW5kbGVVcmwiLCJyZWRpcmVjdFRvIiwic3dpdGNoVGFiIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic3Vic3RyaW5nIiwibGVuZ3RoIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFNQSxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDN0JDLE9BQUdILFVBQUgsQ0FBYztBQUNWQyxhQUFLRyxVQUFVSCxHQUFWLEVBQWVDLEdBQWY7QUFESyxLQUFkO0FBR0gsQ0FKRDs7QUFNQTtBQUNBLElBQU1HLGFBQWEsU0FBYkEsVUFBYSxDQUFDSixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUM3QkMsT0FBR0UsVUFBSCxDQUFjO0FBQ1ZKLGFBQUtBO0FBREssS0FBZDtBQUdILENBSkQ7O0FBTUE7QUFDQSxJQUFNSyxZQUFZLFNBQVpBLFNBQVksQ0FBQ0wsR0FBRCxFQUFTO0FBQ3ZCRSxPQUFHRyxTQUFILENBQWE7QUFDVEwsYUFBS0E7QUFESSxLQUFiO0FBR0gsQ0FKRDs7QUFNQTtBQUNBLElBQU1HLFlBQVksU0FBWkEsU0FBWSxDQUFDSCxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUM1QixRQUFJQSxHQUFKLEVBQVM7QUFDTEQsY0FBTUEsTUFBTSxHQUFaO0FBQ0EsYUFBSyxJQUFJTSxHQUFULElBQWdCTCxHQUFoQixFQUFxQjtBQUNqQkEsZ0JBQUlLLEdBQUosSUFBV0MsbUJBQW1CTixJQUFJSyxHQUFKLENBQW5CLENBQVg7QUFDQU4sbUJBQU9NLE1BQU0sR0FBTixHQUFZTCxJQUFJSyxHQUFKLENBQVosR0FBdUIsR0FBOUI7QUFDSDtBQUNELGVBQU9OLE1BQU1BLElBQUlRLFNBQUosQ0FBYyxDQUFkLEVBQWlCUixJQUFJUyxNQUFKLEdBQWEsQ0FBOUIsQ0FBYjtBQUNIO0FBQ0QsV0FBT1QsR0FBUDtBQUNILENBVkQ7O0FBWUE7QUFDQSxJQUFNVSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsS0FBRCxFQUFXO0FBQzVCVCxPQUFHUSxZQUFILENBQWdCO0FBQ1pDLGVBQU9BO0FBREssS0FBaEI7QUFHSCxDQUpEOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JkLGdCQUFZQSxVQURDO0FBRWJLLGdCQUFZQSxVQUZDO0FBR2JDLGVBQVdBLFNBSEU7QUFJYkssa0JBQWNBO0FBSkQsQ0FBakIiLCJmaWxlIjoibmF2aWdhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5a+86IiqXG5cbi8vIFRpcFxuLy8gMTogd3gubmF2aWdhdGVUbyDlkowgd3gucmVkaXJlY3RUbyDkuI3lhYHorrjot7PovazliLAgdGFiYmFyIOmhtemdou+8jOWPquiDveeUqCB3eC5zd2l0Y2hUYWIg6Lez6L2s5YiwIHRhYmJhciDpobXpnaJcblxuLy8g5L+d55WZ5b2T5YmN6aG16Z2i77yM6Lez6L2s5Yiw5bqU55So5YaF55qE5p+Q5Liq6aG16Z2i77yM5L2/55Sod3gubmF2aWdhdGVCYWNr5Y+v5Lul6L+U5Zue5Yiw5Y6f6aG16Z2iXG5jb25zdCBuYXZpZ2F0ZVRvID0gKHVybCwgb2JqKSA9PiB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogaGFuZGxlVXJsKHVybCwgb2JqKVxuICAgIH0pXG59XG5cbi8vIOWFs+mXreW9k+WJjemhtemdou+8jOi3s+i9rOWIsOW6lOeUqOWGheeahOafkOS4qumhtemdolxuY29uc3QgcmVkaXJlY3RUbyA9ICh1cmwsIG9iaikgPT4ge1xuICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IHVybFxuICAgIH0pXG59XG5cbi8vIOi3s+i9rOWIsCB0YWJCYXIg6aG16Z2i77yM5bm25YWz6Zet5YW25LuW5omA5pyJ6Z2eIHRhYkJhciDpobXpnaJcbmNvbnN0IHN3aXRjaFRhYiA9ICh1cmwpID0+IHtcbiAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICB1cmw6IHVybFxuICAgIH0pXG59XG5cbi8vIOWkhOeQhiB1cmxcbmNvbnN0IGhhbmRsZVVybCA9ICh1cmwsIG9iaikgPT4ge1xuICAgIGlmIChvYmopIHtcbiAgICAgICAgdXJsID0gdXJsICsgJz8nO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSk7XG4gICAgICAgICAgICB1cmwgKz0ga2V5ICsgJz0nICsgb2JqW2tleV0gKyAnJic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xufVxuXG4vLyDlhbPpl63lvZPliY3pobXpnaLvvIzov5Tlm57kuIrkuIDpobXpnaLmiJblpJrnuqfpobXpnaJcbmNvbnN0IG5hdmlnYXRlQmFjayA9IChkZWx0YSkgPT4ge1xuICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgIGRlbHRhOiBkZWx0YVxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5hdmlnYXRlVG86IG5hdmlnYXRlVG8sXG4gICAgcmVkaXJlY3RUbzogcmVkaXJlY3RUbyxcbiAgICBzd2l0Y2hUYWI6IHN3aXRjaFRhYixcbiAgICBuYXZpZ2F0ZUJhY2s6IG5hdmlnYXRlQmFja1xufSJdfQ==