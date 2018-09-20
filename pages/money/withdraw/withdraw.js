// pages/withdraw/withdraw.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alipayInfo:{},
    userInfo: null,
    isSending: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
  },

  // 判断是否绑定了支付宝
  getIsBindAlipay() {
    api.getIsBindAlipay({
      success: res => {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res)
          this.setData({
            alipayInfo: res.data
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.message,
            cancelText: '返回',
            confirmText: '去绑定',
            confirmColor: '#f35',
            success: e => {
              e.confirm ? wx.navigateTo({
                url: `../aboutAlipay/aboutAlipay?title=绑定支付宝&hide_mobile=${res.data.hide_mobile}`,
              }) : wx.navigateBack()
            }
          })
        }
      }
    })
  },

  submitForm(){
    this.setData({
      isSending: true
    })
    api.aliPayWithdraw({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res=>{
        if (res.data.success) {
          getApp().updateUserInfo().then(res => {
            this.setData({
              userInfo: res,
              isSending: false
            })
          })
          wx.showModal({
            title: '恭喜您',
            content: res.data.message,
            showCancel: false,
            confirmText: '知道了',
            confirmColor: '#f35'
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.message,
            showCancel: false,
            confirmText: '知道了',
            confirmColor: '#f35',
          })
          this.setData({
            isSending: false
          })
        }
      }
    })
  },

  changeAccount(){
    wx.navigateTo({
      url: `../aboutAlipay/aboutAlipay?title=修改支付宝&hide_mobile=${this.data.alipayInfo.hide_mobile}`,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getIsBindAlipay()
    getApp().updateUserInfo().then(res => {
      this.setData({
        userInfo: res
      })
    })
  }
})