//index.js
import api from '../../api/api.js';
import muneList from '../../utils/menuIcon.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImgArr: [], //banner数据
    menuNavList: [], //二级分类目录
    homeCheapList: [], //首页9.9包邮
    editorSayList: [], //首页小编种草
    featuredList: [], //首页今日精选,
    featuredNestpage: 1, //首页今日精选的下一页数,
    haveMore: true, //首页今日精选能否翻页
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });
    app.updateUserInfo().then(res=>{
      this.setData({
        userInfo: res
      })
    })
    this.getBannerImg();
    this.sliceMenuNav();
    this.getCheapList();
    this.getEditorSayList();
    this.getFeaturedList();
    
  },
  // 跳转到二级分类
  toCategory(opt) {
    wx.navigateTo({
      url: `/pages/category/category?id=${opt.currentTarget.dataset.cate_id}`,
    })
  },
  /**
   * 获取bannerSwiper图片
   */
  getBannerImg() {
    api.getBannerImg({
      success: (res) => {
        this.setData({
          bannerImgArr: res.data
        })
      }
    })
  },

  /**
   * 处理首页二级目录list
   */
  sliceMenuNav() {
    let arr = muneList.filter((item, index) => {
      return (index < 9)
    })
    this.setData({
      menuNavList: arr
    });
  },

  /**
   * 获取首页9.9包邮list
   */
  getCheapList() {
    api.getGoodsList({
      data: {
        channel: 6
      },
      success: (res) => {
        this.setData({
          homeCheapList: res.data.threads
        })
      }
    })
  },

  /**
   * 获取首页小编种草list
   */
  getEditorSayList() {
    api.getEditorSayList({
      data: {
        type: 1
      },
      success: (res) => {
        this.setData({
          editorSayList: res.data.result.threads
        })
      }
    })
  },

  /**
   * 获取首页今日精选list
   */
  getFeaturedList() {
    api.getGoodsList({
      data: {
        channel: 5,
        cid: 0,
        page: this.data.featuredNestpage
      },
      success: (res) => {
        let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
        let haveMoreData = nextPage == 'false' ? false : true;
        this.setData({
          featuredList: this.data.featuredList.concat(res.data.result.articals),
          featuredNestpage: nextPage,
          haveMore: haveMoreData
        })
        wx.hideToast()
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
    this.setData({
      userInfo: app.globalData.userInfo
    })
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
  onReachBottom() {
    this.data.haveMore ? this.getFeaturedList() : ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '聚多多优惠',
      path: `/pages/index/index`,
      imageUrl: '',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})