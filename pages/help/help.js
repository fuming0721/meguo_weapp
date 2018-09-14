// pages/help/help.js
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpMenu: [], //左侧目录
    helpNavList: [],  //右侧导航
    currentMenu: 0   //当前目录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHelpMenu()
  },

  // 获取左侧目录
  getHelpMenu() {
    wx.showLoading({
      title: '加载中...',
    })
    api.getHelpMenu({
      success: res => {
        if (res.data.success) {
          this.setData({
            helpMenu: res.data.result,
            currentMenu: res.data.result[0].id
          })
          this.getHelpNav(res.data.result[0].id)
        }
      }
    })
  },

  // 获取左侧内容list
  getHelpNav(cid) {
    api.getHelpNav({
      data: {
        cid: cid
      },
      success: res => {
        this.setData({
          helpNavList: res.data.result
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },

  // 左侧目录change
  menuChange(e){
    let id = e.currentTarget.dataset.id
    wx.showNavigationBarLoading()
    this.setData({
      currentMenu: id
    })
    this.getHelpNav(id)
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