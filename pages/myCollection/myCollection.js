// pages/myCollection/myCollection.js
import api from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveCollection: true,
    collectionList: [],
    nextPage: 1,
    nowDate: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCollectionList()
  },

//获取我的收藏数据
  getMyCollectionList () {
    api.myCollectionList({
      data:{
        page: this.data.nextPage
      },
      success: res => {
        if (res.data.success){
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            collectionList: this.data.collectionList.concat(res.data.result.lists),
            nextPage: nextPage,
            haveCollection: true
          })
        }else{
          this.setData({
            haveCollection: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      nowDate: parseInt(new Date().getTime() / 1000)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.nextPage ? this.getMyCollectionList() : ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})