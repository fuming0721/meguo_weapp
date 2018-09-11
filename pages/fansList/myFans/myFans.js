// pages/fansList/fansList.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansNav: ['全部粉丝', '我的粉丝', '推荐粉丝'],
    fansNavIndex: 0,
    fansList: [],
    nextPage: 1,
    haveFans: true,
    isFirst: true     //是否是第一层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyfansList()
  },

  navChange(e) {
    let paramsData = e.currentTarget.dataset
    this.setData({
      fansNavIndex: paramsData.index,
      fansList: [],
      nextPage: 1
    });
    this.getMyfansList()
  },

  // 获取数据
  getMyfansList() {
    api.myFansList({
      data: {
        type: this.data.fansNavIndex,
        page: this.data.nextPage
      },
      success: res=>{
        console.log(res)
        if (res.data.success) {
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            fansList: this.data.fansList.concat(res.data.result.lists),
            nextPage: nextPage,
            haveFans: true
          })
        } else {
          this.setData({
            haveFans: false
          })
        }
      }
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
    this.data.nextPage ? this.getMyfansList() : ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})