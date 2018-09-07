// pages/category/category.js
import api from '../../api/api.js';
const sysInfo = getApp().globalData.sysInfo
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, // 分类id
    allIconArr: [], // 二级分类图标
    afterIconArr: [], //处理后的图标arr
    showMore: false, //超过8个图标显示展开按钮
    showminus: false, //关闭按钮
    sortname: [{ //nav
      name: '默认',
      channel: 5
    }, {
      name: '最新',
      channel: 2
    }, {
      name: '价格',
      channel: 3
    }, {
      name: '销量',
      channel: 4
    }],
    sortCannel: 5, //nav当前选中项
    nextPage: 1, //goodslist下一页
    categoryGoodsList: [], //分类商品
    pageScreenHeight: app.globalData.sysInfo.screenHeight,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });
    this.setData({
      id: options.id,
      userInfo: app.globalData.userInfo
    })
    this.getSubCategoryIcon();
    this.getCategoryGoodsData()
  },

  // 获取二级分类的图标
  getSubCategoryIcon() {
    api.getSubCategoryIcon({
      data: {
        cid: this.data.id
      },
      success: res => {
        wx.setNavigationBarTitle({
          title: res.data.currentCate
        });
        // 处理分类图标超过8个
        if (res.data.subCate.length > 8) {
          this.setData({
            allIconArr: res.data.subCate,
          })
          this.hideSomeIcon()
        } else {
          this.setData({
            afterIconArr: res.data.subCate,
            showMore: false
          })
        }
      }
    })
  },

  // 跳转到二级分类
  toCategory(opt) {
    let params = opt.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/subCategory/subCategory?id=${params.sub_id}&title=${params.sub_title}`,
    })
  },

  // 隐藏多余的分类图标
  hideSomeIcon() {
    this.setData({
      afterIconArr: this.data.allIconArr.slice(0, 7),
      showMore: true,
      showminus: false
    })
  },

  // 显示全部图标
  showAllIcon() {
    this.setData({
      afterIconArr: this.data.allIconArr,
      showMore: false,
      showminus: true
    })
  },

  //nav切换
  changeChannel(opt) {
    if (opt.currentTarget.dataset.channel != this.data.sortCannel) {
      this.setData({
        sortCannel: opt.currentTarget.dataset.channel,
        nextPage: 1, //goodslist下一页
        categoryGoodsList: [], //分类商品
      })
      this.getCategoryGoodsData()
    }
  },

  //获取分类商品
  getCategoryGoodsData() {
    api.getGoodsList({
      data: {
        cid: this.data.id,
        channel: this.data.sortCannel,
        page: this.data.nextPage
      },
      success: res => {
        let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
        this.setData({
          categoryGoodsList: this.data.categoryGoodsList.concat(res.data.result.articals),
          nextPage: nextPage
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
    this.data.nextPage ? this.getCategoryGoodsData() : ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})