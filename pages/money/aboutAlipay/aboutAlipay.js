// pages/money/aboutAlipay/aboutAlipay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide_mobile: '',  //电话号码
    name: '', //真实姓名
    nameIsOk: false,   //真实姓名ok
    alipayNum: '',      //支付宝账号
    alipayNumIsOk: false,  //支付宝账号ok
    code: '',  //验证码   
    codeIsOk: false,  //验证码ok
    disabledGetCode: true  //禁用获取验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    wx.setNavigationBarTitle({
      title: opt.title,
    })
    this.setData({
      hide_mobile: opt.hide_mobile.toString()
    })
  },

  // 监听真实姓名的输入
  nameInput(e){
    this.setData({
      name: e.detail.value
    })
  },
  
  // 监听支付宝账号的输入
  alipayNumInput(e) {
    this.setData({
      alipayNum: e.detail.value
    })
  },

  // 监听验证码的输入
  codeInput(e) {
    this.setData({
      code: e.detail.value
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})