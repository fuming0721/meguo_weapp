// pages/bindCode/bindCode.js
import api from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showClearBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  formSubmit(e) {
    api.bindInvitationCode({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        invitation_code: e.detail.value.input
      },
      success: res => {
        if (res.data.success){
          getApp().updateUserInfo()
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            mask: true,
            success: () => {
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/my/my',
                })
              }, 2000)
            }
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon:'none',
            duration: 2000,
            mask: true
          })
        }
      }
    })
  },
  bindinput(e) {
    let haveValue = false;
    if (e.detail.cursor > 0) {
      haveValue = true
    } else {
      haveValue = false
    }
    this.setData({
      showClearBtn: haveValue
    })
  },
  formReset(e) {
    this.setData({
      showClearBtn: false
    })
  }
})