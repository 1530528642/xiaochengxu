// 提示

// 显示消息提示框
const showToast = (title, icon = 'none', callback = () => {}) => {
    wx.showToast({
        title: title,
        icon: icon,
        duration: 2000,
        mask: false,
        success: callback
    });

}

// 显示模态弹窗
const showModal = (title, content, callback = () => {}) => {
    wx.showModal({
        title: title,
        content: content,
        showCancel: false,
        success: callback
    });
}

// 显示模态弹窗
const showModalcencll = (title, content, callback = () => {}) => {
    wx.showModal({
        title: title,
        content: content,
        showCancel: true,
        success: callback
    });

}


module.exports = {
    showToast: showToast,
    showModal: showModal,
    showModalcencll:showModalcencll
}