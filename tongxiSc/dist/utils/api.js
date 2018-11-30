"use strict";

var indexUrls = require("./request.js");

// public final static int SUCCESS = 1; // 成功
// public final static int WARN = 2; // 后端提醒
//public final static int ERROR = 3; // 系统错误
// public final static int TOKEN_OUT = 4; // 登录超时

// var StorageApi = 'http://122.152.206.172:8081/os/storage/create';
// 云平台上线时使用
var domainy = "https://www.tongxikj.com";
// var domain="https://www.tongxikj.com/my-security";//正式域名
var domain = "https://www.tongxikj.com/test"; //测试域名
var versionStr = "/api/v1";
//获取小区数据
var _sitelist = domain + versionStr + "/estate/sitelist";
//获取小区设备
var _machineList = domain + versionStr + "/estate/machineList";
//获取洗车记录
var _washList = domain + versionStr + "/estate/washList";
//登录
var _logins = domain + versionStr + "/estate/login";
//我的
var _getUsers = domain + versionStr + "/estate/getUser";
//小区
var _sitelists = domain + versionStr + "/estate/sitelist";
//机器
var _machineLists = domain + versionStr + "/estate/machineList";
//我的收益
var _statistics = domain + versionStr + "/estate/statistics";
//洗车用户
var _washUsers = domain + versionStr + "/estate/washUser";
//提现明细
var _withdrawalsLists = domain + versionStr + "/estate/withdrawalsList";
//提现记录
var _addWithdrawals = domain + versionStr + "/estate/addWithdrawals";
//资讯
var _lists = domain + versionStr + "/info/list";
//首页顶部列表
var _taglists = domain + versionStr + "/info/taglist";
//修改密码
var _updatePasswords = domain + versionStr + "/estate/updatePassword";

module.exports = {
    sitelist: function sitelist(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_sitelist, params, sourceObj, successFun, failFun, completeFun);
    },

    machineList: function machineList(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_machineList, params, sourceObj, successFun, failFun, completeFun);
    },

    washList: function washList(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_washList, params, sourceObj, successFun, failFun, completeFun);
    },

    logins: function logins(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_logins, params, sourceObj, successFun, failFun, completeFun);
    },
    getUsers: function getUsers(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_getUsers, params, sourceObj, successFun, failFun, completeFun);
    },
    sitelists: function sitelists(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_sitelists, params, sourceObj, successFun, failFun, completeFun);
    },
    machineLists: function machineLists(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_machineLists, params, sourceObj, successFun, failFun, completeFun);
    },
    statistics: function statistics(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_statistics, params, sourceObj, successFun, failFun, completeFun);
    },
    washUsers: function washUsers(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_washUsers, params, sourceObj, successFun, failFun, completeFun);
    },
    withdrawalsLists: function withdrawalsLists(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_withdrawalsLists, params, sourceObj, successFun, failFun, completeFun);
    },
    addWithdrawals: function addWithdrawals(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_addWithdrawals, params, sourceObj, successFun, failFun, completeFun);
    },
    lists: function lists(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_lists, params, sourceObj, successFun, failFun, completeFun);
    },
    taglists: function taglists(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_taglists, params, sourceObj, successFun, failFun, completeFun);
    },
    updatePasswords: function updatePasswords(params, sourceObj, successFun, failFun, completeFun) {
        indexUrls.requestPostApi(_updatePasswords, params, sourceObj, successFun, failFun, completeFun);
    },
    domain: domain,
    domainy: domainy
    // IndexUrl: IndexUrl + '', //首页数据接口
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJpbmRleFVybHMiLCJyZXF1aXJlIiwiZG9tYWlueSIsImRvbWFpbiIsInZlcnNpb25TdHIiLCJzaXRlbGlzdCIsIm1hY2hpbmVMaXN0Iiwid2FzaExpc3QiLCJsb2dpbnMiLCJnZXRVc2VycyIsInNpdGVsaXN0cyIsIm1hY2hpbmVMaXN0cyIsInN0YXRpc3RpY3MiLCJ3YXNoVXNlcnMiLCJ3aXRoZHJhd2Fsc0xpc3RzIiwiYWRkV2l0aGRyYXdhbHMiLCJsaXN0cyIsInRhZ2xpc3RzIiwidXBkYXRlUGFzc3dvcmRzIiwibW9kdWxlIiwiZXhwb3J0cyIsInBhcmFtcyIsInNvdXJjZU9iaiIsInN1Y2Nlc3NGdW4iLCJmYWlsRnVuIiwiY29tcGxldGVGdW4iLCJyZXF1ZXN0UG9zdEFwaSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxZQUFZQyxRQUFRLGNBQVIsQ0FBbEI7O0FBRUM7QUFDQTtBQUNHO0FBQ0E7O0FBRUo7QUFDQTtBQUNBLElBQUlDLFVBQVUsMEJBQWQ7QUFDQTtBQUNBLElBQUlDLFNBQU8sK0JBQVgsQyxDQUEyQztBQUMzQyxJQUFJQyxhQUFXLFNBQWY7QUFDQTtBQUNBLElBQUlDLFlBQVdGLFNBQVFDLFVBQVIsR0FBbUIsa0JBQWxDO0FBQ0E7QUFDQSxJQUFJRSxlQUFjSCxTQUFRQyxVQUFSLEdBQW1CLHFCQUFyQztBQUNBO0FBQ0EsSUFBSUcsWUFBV0osU0FBUUMsVUFBUixHQUFtQixrQkFBbEM7QUFDQTtBQUNBLElBQUlJLFVBQVNMLFNBQVFDLFVBQVIsR0FBbUIsZUFBaEM7QUFDQTtBQUNBLElBQUlLLFlBQVdOLFNBQVFDLFVBQVIsR0FBbUIsaUJBQWxDO0FBQ0E7QUFDQSxJQUFJTSxhQUFZUCxTQUFRQyxVQUFSLEdBQW1CLGtCQUFuQztBQUNBO0FBQ0EsSUFBSU8sZ0JBQWVSLFNBQVFDLFVBQVIsR0FBbUIscUJBQXRDO0FBQ0E7QUFDQSxJQUFJUSxjQUFhVCxTQUFRQyxVQUFSLEdBQW1CLG9CQUFwQztB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RDtBQUNsRXpCLGtCQUFVMEIsY0FBVixDQUF5QlQsU0FBekIsRUFBbUNJLE1BQW5DLEVBQTJDQyxTQUEzQyxFQUFzREMsVUFBdEQsRUFBa0VDLE9BQWxFLEVBQTJFQyxXQUEzRTtBQUNILEtBMUNZO0FBMkNiUCxxQkFBZ0IseUJBQVNHLE1BQVQsRUFBaUJDLFNBQWpCLEVBQTRCQyxVQUE1QixFQUF3Q0MsT0FBeEMsRUFBaURDLFdBQWpELEVBQTZEO0FBQ3pFekIsa0JBQVUwQixjQUFWLENBQXlCUixnQkFBekIsRUFBMENHLE1BQTFDLEVBQWtEQyxTQUFsRCxFQUE2REMsVUFBN0QsRUFBeUVDLE9BQXpFLEVBQWtGQyxXQUFsRjtBQUNILEtBN0NZO0FBOENidEIsWUFBT0EsTUE5Q007QUErQ2JELGFBQVFBO0FBQ1I7QUFoRGEsQ0FBakIiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5kZXhVcmxzID0gcmVxdWlyZShcIi4uL3V0aWxzL3JlcXVlc3RcIilcclxuXHJcblx0Ly8gcHVibGljIGZpbmFsIHN0YXRpYyBpbnQgU1VDQ0VTUyA9IDE7IC8vIOaIkOWKn1xyXG5cdC8vIHB1YmxpYyBmaW5hbCBzdGF0aWMgaW50IFdBUk4gPSAyOyAvLyDlkI7nq6/mj5DphpJcclxuICAgIC8vcHVibGljIGZpbmFsIHN0YXRpYyBpbnQgRVJST1IgPSAzOyAvLyDns7vnu5/plJnor69cclxuICAgIC8vIHB1YmxpYyBmaW5hbCBzdGF0aWMgaW50IFRPS0VOX09VVCA9IDQ7IC8vIOeZu+W9lei2heaXtlxyXG4gICAgXHJcbi8vIHZhciBTdG9yYWdlQXBpID0gJ2h0dHA6Ly8xMjIuMTUyLjIwNi4xNzI6ODA4MS9vcy9zdG9yYWdlL2NyZWF0ZSc7XHJcbi8vIOS6keW5s+WPsOS4iue6v+aXtuS9v+eUqFxyXG52YXIgZG9tYWlueSA9IFwiaHR0cHM6Ly93d3cudG9uZ3hpa2ouY29tXCJcclxuLy8gdmFyIGRvbWFpbj1cImh0dHBzOi8vd3d3LnRvbmd4aWtqLmNvbS9teS1zZWN1cml0eVwiOy8v5q2j5byP5Z+f5ZCNXHJcbnZhciBkb21haW49XCJodHRwczovL3d3dy50b25neGlrai5jb20vdGVzdFwiOy8v5rWL6K+V5Z+f5ZCNXHJcbnZhciB2ZXJzaW9uU3RyPVwiL2FwaS92MVwiO1xyXG4vL+iOt+WPluWwj+WMuuaVsOaNrlxyXG52YXIgc2l0ZWxpc3QgPSBkb21haW4rIHZlcnNpb25TdHIrXCIvZXN0YXRlL3NpdGVsaXN0XCI7ICBcclxuLy/ojrflj5blsI/ljLrorr7lpIdcclxudmFyIG1hY2hpbmVMaXN0ID0gZG9tYWluKyB2ZXJzaW9uU3RyK1wiL2VzdGF0ZS9tYWNoaW5lTGlzdFwiOyAgXHJcbi8v6I635Y+W5rSX6L2m6K6w5b2VXHJcbnZhciB3YXNoTGlzdCA9IGRvbWFpbisgdmVyc2lvblN0citcIi9lc3RhdGUvd2FzaExpc3RcIjsgIFxyXG4vL+eZu+W9lVxyXG52YXIgbG9naW5zID0gZG9tYWluKyB2ZXJzaW9uU3RyK1wiL2VzdGF0ZS9sb2dpblwiXHJcbi8v5oiR55qEXHJcbnZhciBnZXRVc2VycyA9IGRvbWFpbisgdmVyc2lvblN0citcIi9lc3RhdGUvZ2V0VXNlclwiXHJcbi8v5bCP5Yy6XHJcbnZhciBzaXRlbGlzdHMgPSBkb21haW4rIHZlcnNpb25TdHIrXCIvZXN0YXRlL3NpdGVsaXN0XCJcclxuLy/mnLrlmahcclxudmFyIG1hY2hpbmVMaXN0cyA9IGRvbWFpbisgdmVyc2lvblN0citcIi9lc3RhdGUvbWFjaGluZUxpc3RcIlxyXG4vL+aIkeeahOaUtuebilxyXG52YXIgc3RhdGlzdGljcyA9IGRvbWFpbisgdmVyc2lvblN0citcIi9lc3RhdGUvc3RhdGlzdGljc1wiXHJcbi8v5rSX6L2m55So5oi3XHJcbnZhciB3YXNoVXNlcnMgPSBkb21haW4rIHZlcnNpb25TdHIrXCIvZXN0YXRlL3dhc2hVc2VyXCJcclxuLy/mj5DnjrDmmI7nu4ZcclxudmFyIHdpdGhkcmF3YWxzTGlzdHMgPSBkb21haW4rIHZlcnNpb25TdHIrXCIvZXN0YXRlL3dpdGhkcmF3YWxzTGlzdFwiXHJcbi8v5o+Q546w6K6w5b2VXHJcbnZhciBhZGRXaXRoZHJhd2FscyA9IGRvbWFpbisgdmVyc2lvblN0citcIi9lc3RhdGUvYWRkV2l0aGRyYXdhbHNcIlxyXG4vL+i1hOiur1xyXG52YXIgbGlzdHMgPSBkb21haW4rIHZlcnNpb25TdHIrXCIvaW5mby9saXN0XCJcclxuLy/pppbpobXpobbpg6jliJfooahcclxudmFyIHRhZ2xpc3RzID0gZG9tYWluKyB2ZXJzaW9uU3RyK1wiL2luZm8vdGFnbGlzdFwiXHJcbi8v5L+u5pS55a+G56CBXHJcbnZhciB1cGRhdGVQYXNzd29yZHMgPSBkb21haW4rIHZlcnNpb25TdHIrXCIvZXN0YXRlL3VwZGF0ZVBhc3N3b3JkXCJcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgc2l0ZWxpc3Q6ZnVuY3Rpb24ocGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKXtcclxuICAgICAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkoc2l0ZWxpc3QsIHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxuICAgIH0sXHJcblxyXG4gICAgbWFjaGluZUxpc3Q6ZnVuY3Rpb24ocGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKXtcclxuICAgICAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkobWFjaGluZUxpc3QsIHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxuICAgIH0sXHJcblxyXG4gICAgd2FzaExpc3Q6ZnVuY3Rpb24ocGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKXtcclxuICAgICAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkod2FzaExpc3QsIHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxuICAgIH0sXHJcblxyXG4gICAgbG9naW5zOmZ1bmN0aW9uKHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bil7XHJcbiAgICAgICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKGxvZ2lucywgcGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxyXG4gICAgfSxcclxuICAgIGdldFVzZXJzOmZ1bmN0aW9uKHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bil7XHJcbiAgICAgICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKGdldFVzZXJzLCBwYXJhbXMsIHNvdXJjZU9iaiwgc3VjY2Vzc0Z1biwgZmFpbEZ1biwgY29tcGxldGVGdW4pXHJcbiAgICB9LFxyXG4gICAgc2l0ZWxpc3RzOmZ1bmN0aW9uKHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bil7XHJcbiAgICAgICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHNpdGVsaXN0cywgcGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxyXG4gICAgfSxcclxuICAgIG1hY2hpbmVMaXN0czpmdW5jdGlvbihwYXJhbXMsIHNvdXJjZU9iaiwgc3VjY2Vzc0Z1biwgZmFpbEZ1biwgY29tcGxldGVGdW4pe1xyXG4gICAgICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaShtYWNoaW5lTGlzdHMsIHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxuICAgIH0sXHJcbiAgICBzdGF0aXN0aWNzOmZ1bmN0aW9uKHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bil7XHJcbiAgICAgICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHN0YXRpc3RpY3MsIHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxuICAgIH0sXHJcbiAgICB3YXNoVXNlcnM6ZnVuY3Rpb24ocGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKXtcclxuICAgICAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkod2FzaFVzZXJzLCBwYXJhbXMsIHNvdXJjZU9iaiwgc3VjY2Vzc0Z1biwgZmFpbEZ1biwgY29tcGxldGVGdW4pXHJcbiAgICB9LFxyXG4gICAgd2l0aGRyYXdhbHNMaXN0czpmdW5jdGlvbihwYXJhbXMsIHNvdXJjZU9iaiwgc3VjY2Vzc0Z1biwgZmFpbEZ1biwgY29tcGxldGVGdW4pe1xyXG4gICAgICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh3aXRoZHJhd2Fsc0xpc3RzLCBwYXJhbXMsIHNvdXJjZU9iaiwgc3VjY2Vzc0Z1biwgZmFpbEZ1biwgY29tcGxldGVGdW4pXHJcbiAgICB9LFxyXG4gICAgYWRkV2l0aGRyYXdhbHM6ZnVuY3Rpb24ocGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKXtcclxuICAgICAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkoYWRkV2l0aGRyYXdhbHMsIHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxuICAgIH0sXHJcbiAgICBsaXN0czpmdW5jdGlvbihwYXJhbXMsIHNvdXJjZU9iaiwgc3VjY2Vzc0Z1biwgZmFpbEZ1biwgY29tcGxldGVGdW4pe1xyXG4gICAgICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaShsaXN0cywgcGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxyXG4gICAgfSxcclxuICAgIHRhZ2xpc3RzOmZ1bmN0aW9uKHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bil7XHJcbiAgICAgICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHRhZ2xpc3RzLCBwYXJhbXMsIHNvdXJjZU9iaiwgc3VjY2Vzc0Z1biwgZmFpbEZ1biwgY29tcGxldGVGdW4pXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlUGFzc3dvcmRzOmZ1bmN0aW9uKHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bil7XHJcbiAgICAgICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVwZGF0ZVBhc3N3b3JkcywgcGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxyXG4gICAgfSxcclxuICAgIGRvbWFpbjpkb21haW4sXHJcbiAgICBkb21haW55OmRvbWFpbnlcclxuICAgIC8vIEluZGV4VXJsOiBJbmRleFVybCArICcnLCAvL+mmlumhteaVsOaNruaOpeWPo1xyXG59OyJdfQ==