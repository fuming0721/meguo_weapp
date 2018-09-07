// pages/orderTrack/orderTrack.js
import api from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e) {
    api.orderTrack({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        trade_id: e.detail.value.input
      },
      success: res => {
        if (res.data.success) {
          wx.showModal({
            title: '恭喜您',
            content: '您已成功提交，订单明细与领取的金币数量详见粉丝订单。',
            confirmText: '前往查看',
            confirmColor: "#f35",
            cancelText: '知道了',
            success: res => {
              res.confirm ? wx.navigateTo({
                url: '/pages/fansOrder/fansOrder',
              }) : ''
            }
          })
        } else {
          switch (res.data.code) {
            case 1:
              this.failPopups(`${res.data.message},   *该订单号不属于通过本APP去淘宝购物产生的订单，无法获得金币噢*`);
              break;
            case 2:
              this.failPopups('本订单号已领取过金币了，请勿重复提交，谢谢合作。');
              break;
            case 3:
              this.failPopups('订单号已过了领取金币的最大期限，请勿再提交。（金币领取期限为：下单后10分钟至30天内）');
              break;
          }
        }
      }
    })
  },
  failPopups(content) {
    wx.showModal({
      title: '温馨提示',
      content: content,
      confirmText: '知道了',
      confirmColor: "#f35",
      showCancel: false
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})