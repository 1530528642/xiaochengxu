"use strict";

// http 请求

// 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
var set = function set(key, data) {
    wx.setStorage({
        key: key,
        data: data
    });
};

// 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
var setSync = function setSync(key, data) {
    try {
        wx.setStorageSync(key, data);
    } catch (e) {
        console.log(e);
    }
};

// 从本地缓存中异步获取指定 key 对应的内容。
var get = function get(key, callback) {
    wx.getStorage({
        key: key,
        success: callback
    });
};

// 从本地缓存中同步获取指定 key 对应的内容。
var getSync = function getSync(key) {
    try {
        return wx.getStorageSync(key);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    set: set,
    setSync: setSync,
    get: get,
    getSync: getSync
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhY2hlLmpzIl0sIm5hbWVzIjpbInNldCIsImtleSIsImRhdGEiLCJ3eCIsInNldFN0b3JhZ2UiLCJzZXRTeW5jIiwic2V0U3RvcmFnZVN5bmMiLCJlIiwiY29uc29sZSIsImxvZyIsImdldCIsImNhbGxiYWNrIiwiZ2V0U3RvcmFnZSIsInN1Y2Nlc3MiLCJnZXRTeW5jIiwiZ2V0U3RvcmFnZVN5bmMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0EsSUFBTUEsTUFBTSxTQUFOQSxHQUFNLENBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQ3ZCQyxPQUFHQyxVQUFILENBQWM7QUFDVkgsYUFBS0EsR0FESztBQUVWQyxjQUFNQTtBQUZJLEtBQWQ7QUFJSCxDQUxEOztBQU9BO0FBQ0EsSUFBTUcsVUFBVSxTQUFWQSxPQUFVLENBQUNKLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQzNCLFFBQUk7QUFDQUMsV0FBR0csY0FBSCxDQUFrQkwsR0FBbEIsRUFBdUJDLElBQXZCO0FBQ0gsS0FGRCxDQUVFLE9BQU9LLENBQVAsRUFBVTtBQUNSQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0g7QUFDSixDQU5EOztBQVFBO0FBQ0EsSUFBTUcsTUFBTSxTQUFOQSxHQUFNLENBQUNULEdBQUQsRUFBTVUsUUFBTixFQUFtQjtBQUMzQlIsT0FBR1MsVUFBSCxDQUFjO0FBQ1ZYLGFBQUtBLEdBREs7QUFFVlksaUJBQVNGO0FBRkMsS0FBZDtBQUlILENBTEQ7O0FBT0E7QUFDQSxJQUFNRyxVQUFVLFNBQVZBLE9BQVUsQ0FBQ2IsR0FBRCxFQUFTO0FBQ3JCLFFBQUk7QUFDQSxlQUFPRSxHQUFHWSxjQUFILENBQWtCZCxHQUFsQixDQUFQO0FBQ0gsS0FGRCxDQUVFLE9BQU9NLENBQVAsRUFBVTtBQUNSQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0g7QUFDSixDQU5EOztBQVFBUyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JqQixTQUFLQSxHQURRO0FBRWJLLGFBQVNBLE9BRkk7QUFHYkssU0FBS0EsR0FIUTtBQUliSSxhQUFTQTtBQUpJLENBQWpCIiwiZmlsZSI6ImNhY2hlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaHR0cCDor7fmsYJcblxuLy8g5bCG5pWw5o2u5a2Y5YKo5Zyo5pys5Zyw57yT5a2Y5Lit5oyH5a6a55qEIGtleSDkuK3vvIzkvJropobnm5bmjonljp/mnaXor6Uga2V5IOWvueW6lOeahOWGheWuue+8jOi/meaYr+S4gOS4quW8guatpeaOpeWPo1xuY29uc3Qgc2V0ID0gKGtleSwgZGF0YSkgPT4ge1xuICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG59XG5cbi8vIOWwhiBkYXRhIOWtmOWCqOWcqOacrOWcsOe8k+WtmOS4reaMh+WumueahCBrZXkg5Lit77yM5Lya6KaG55uW5o6J5Y6f5p2l6K+lIGtleSDlr7nlupTnmoTlhoXlrrnvvIzov5nmmK/kuIDkuKrlkIzmraXmjqXlj6PjgIJcbmNvbnN0IHNldFN5bmMgPSAoa2V5LCBkYXRhKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoa2V5LCBkYXRhKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxufVxuXG4vLyDku47mnKzlnLDnvJPlrZjkuK3lvILmraXojrflj5bmjIflrpoga2V5IOWvueW6lOeahOWGheWuueOAglxuY29uc3QgZ2V0ID0gKGtleSwgY2FsbGJhY2spID0+IHtcbiAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrXG4gICAgfSlcbn1cblxuLy8g5LuO5pys5Zyw57yT5a2Y5Lit5ZCM5q2l6I635Y+W5oyH5a6aIGtleSDlr7nlupTnmoTlhoXlrrnjgIJcbmNvbnN0IGdldFN5bmMgPSAoa2V5KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHd4LmdldFN0b3JhZ2VTeW5jKGtleSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNldDogc2V0LFxuICAgIHNldFN5bmM6IHNldFN5bmMsXG4gICAgZ2V0OiBnZXQsXG4gICAgZ2V0U3luYzogZ2V0U3luY1xufSJdfQ==