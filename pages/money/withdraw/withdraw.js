// pages/withdraw/withdraw.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
        if (!res.data.success) {
          return res.data
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getIsBindAlipay()
  }
})