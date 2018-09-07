// pages/album/album.js
import api from '../../api/api.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverImg: '',   //封面
    nextPage: 1,    //下一页
    albumId: 0,     //专辑id
    albumList:[],    //专辑数据
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    this.setData({
      coverImg: opt.cover_img,
      albumId: opt.id,
      userInfo: app.globalData.userInfo
    })
    wx.setNavigationBarTitle({
      title: opt.album_title
    });
    this.getAlbumData()
  },

  //数据
  getAlbumData() {
    api.getAlbumList({
      data: {
        id: this.data.albumId,
        page: this.data.nextPage
      },
      success: res => {
        if (res.data.success){
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            albumList: this.data.albumList.concat(res.data.result.articals),
            nextPage: nextPage
          })
        }else{
          this.nextPage = false
        }
      }
    })
  },

  // 去详情页
  goDetail(option) {
    let opt = option.currentTarget.dataset;
    switch (opt.type) {
      case 1:
        wx.navigateTo({
          url: `/pages/detail/detail?id=${opt.id}`,
        })
        break;
      case 6:
        wx.navigateTo({
          url: `/pages/album/album?id=${opt.id}&album_title=${opt.album.album_title}&cover_img=${opt.album.album_cover_img}`,
        })
        break;
    }
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
    this.data.nextPage ? this.getAlbumData():''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})