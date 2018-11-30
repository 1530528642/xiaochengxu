'use strict';

// 提示

// 显示消息提示框
var showToast = function showToast(title) {
    var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    wx.showToast({
        title: title,
        icon: icon,
        duration: 2000,
        mask: false,
        success: callback
    });
};

// 显示模态弹窗
var showModal = function showModal(title, content) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    wx.showModal({
        title: title,
        content: content,
        showCancel: false,
        success: callback
    });
};

// 显示模态弹窗
var showModalcencll = function showModalcencll(title, content) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    wx.showModal({
        title: title,
        content: content,
        showCancel: true,
        success: callback
    });
};

module.exports = {
    showToast: showToast,
    showModal: showModal,
    showModalcencll: showModalcencll
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpcC5qcyJdLCJuYW1lcyI6WyJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJjYWxsYmFjayIsInd4IiwiZHVyYXRpb24iLCJtYXNrIiwic3VjY2VzcyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic2hvd01vZGFsY2VuY2xsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBLElBQU1BLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxLQUFELEVBQStDO0FBQUEsUUFBdkNDLElBQXVDLHVFQUFoQyxNQUFnQztBQUFBLFFBQXhCQyxRQUF3Qix1RUFBYixZQUFNLENBQUUsQ0FBSzs7QUFDN0RDLE9BQUdKLFNBQUgsQ0FBYTtBQUNUQyxlQUFPQSxLQURFO0FBRVRDLGNBQU1BLElBRkc7QUFHVEcsa0JBQVUsSUFIRDtBQUlUQyxjQUFNLEtBSkc7QUFLVEMsaUJBQVNKO0FBTEEsS0FBYjtBQVFILENBVEQ7O0FBV0E7QUFDQSxJQUFNSyxZQUFZLFNBQVpBLFNBQVksQ0FBQ1AsS0FBRCxFQUFRUSxPQUFSLEVBQXlDO0FBQUEsUUFBeEJOLFFBQXdCLHVFQUFiLFlBQU0sQ0FBRSxDQUFLOztBQUN2REMsT0FBR0ksU0FBSCxDQUFhO0FBQ1RQLGVBQU9BLEtBREU7QUFFVFEsaUJBQVNBLE9BRkE7QUFHVEMsb0JBQVksS0FISDtBQUlUSCxpQkFBU0o7QUFKQSxLQUFiO0FBTUgsQ0FQRDs7QUFTQTtBQUNBLElBQU1RLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ1YsS0FBRCxFQUFRUSxPQUFSLEVBQXlDO0FBQUEsUUFBeEJOLFFBQXdCLHVFQUFiLFlBQU0sQ0FBRSxDQUFLOztBQUM3REMsT0FBR0ksU0FBSCxDQUFhO0FBQ1RQLGVBQU9BLEtBREU7QUFFVFEsaUJBQVNBLE9BRkE7QUFHVEMsb0JBQVksSUFISDtBQUlUSCxpQkFBU0o7QUFKQSxLQUFiO0FBT0gsQ0FSRDs7QUFXQVMsT0FBT0MsT0FBUCxHQUFpQjtBQUNiYixlQUFXQSxTQURFO0FBRWJRLGVBQVdBLFNBRkU7QUFHYkcscUJBQWdCQTtBQUhILENBQWpCIiwiZmlsZSI6InRpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOaPkOekulxyXG5cclxuLy8g5pi+56S65raI5oGv5o+Q56S65qGGXHJcbmNvbnN0IHNob3dUb2FzdCA9ICh0aXRsZSwgaWNvbiA9ICdub25lJywgY2FsbGJhY2sgPSAoKSA9PiB7fSkgPT4ge1xyXG4gICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgaWNvbjogaWNvbixcclxuICAgICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgICBtYXNrOiBmYWxzZSxcclxuICAgICAgICBzdWNjZXNzOiBjYWxsYmFja1xyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4vLyDmmL7npLrmqKHmgIHlvLnnqpdcclxuY29uc3Qgc2hvd01vZGFsID0gKHRpdGxlLCBjb250ZW50LCBjYWxsYmFjayA9ICgpID0+IHt9KSA9PiB7XHJcbiAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrXHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8g5pi+56S65qih5oCB5by556qXXHJcbmNvbnN0IHNob3dNb2RhbGNlbmNsbCA9ICh0aXRsZSwgY29udGVudCwgY2FsbGJhY2sgPSAoKSA9PiB7fSkgPT4ge1xyXG4gICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgY29udGVudDogY29udGVudCxcclxuICAgICAgICBzaG93Q2FuY2VsOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHNob3dUb2FzdDogc2hvd1RvYXN0LFxyXG4gICAgc2hvd01vZGFsOiBzaG93TW9kYWwsXHJcbiAgICBzaG93TW9kYWxjZW5jbGw6c2hvd01vZGFsY2VuY2xsXHJcbn0iXX0=