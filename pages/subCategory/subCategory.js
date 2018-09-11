// pages/subCategory/subCategory.js
import api from '../../api/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    cid: 0,
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
    subCategoryGoodsList: [], //分类商品
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
    wx.setNavigationBarTitle({
      title: options.title,
    });
    this.setData({
      id: options.id,
      userInfo: getApp().globalData.userInfo
    })
    this.getSubCategoryGoodsData()
  },

  //nav切换
  changeChannel(opt) {
    if (opt.currentTarget.dataset.channel != this.data.sortCannel) {
      this.setData({
        sortCannel: opt.currentTarget.dataset.channel,
        nextPage: 1, //goodslist下一页
        subCategoryGoodsList: [], //分类商品
      })
      this.getSubCategoryGoodsData()
    }
  },

  // 获取二级分类商品
  getSubCategoryGoodsData() {
    api.getGoodsList({
      data: {
        cid: this.data.id,
        channel: this.data.sortCannel,
        page: this.data.nextPage
      },
      success: res => {
        let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
        this.setData({
          subCategoryGoodsList: this.data.subCategoryGoodsList.concat(res.data.result.articals),
          nextPage: nextPage
        })
        wx.hideToast()
      }
    })
  },

  // 跳转到详情页
  goDetail(option) {
    switch (option.currentTarget.dataset.type) {
      case 1:
        wx.navigateTo({
          url: `/pages/detail/detail?id=${option.currentTarget.dataset.id}`,
        })
        break;
      case 6:
        wx.navigateTo({
          url: `小编说`,
        })
        break;
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.nextPage ? this.getSubCategoryGoodsData() : ''
  }
})