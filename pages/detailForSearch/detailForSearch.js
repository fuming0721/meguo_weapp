// pages/detail/detail.js
import api from '../../api/api.js';
const sysInfo = getApp().globalData.sysInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false, //页面是否显示
    isScroll: true, //Scrollview能否滑动
    goodsData: {}, //商品详情数据
    isLoading: false, //查看详情图片的加载中
    showMore: false, //是否已经打开了更多图片
    newGoodsListArr: [], //新品推荐的数据
    nextPage: 1, //新品推荐的下一页
    flagNum: 0, //新品推荐的时间戳
    toIndex: '', //scroll-view定位到id
    loading: false, //限制滑到底部时会请求多次
    animationData: {}, //淘口令弹窗动画
    backTopAnimation: {}, //返回顶部按钮动画
    taokouling: "获取中...", // 淘口令
    id: 0, //从搜索页传过来的id
    couponamount: 0, //从搜索页传过来的优惠券金额 
    couponTotalCount: 0, // 从搜索页传过来的优惠券数量
    canShare: false, //能否分享
    backHomePosition: sysInfo.screenHeight * 0.2 //返回首页的按钮位置
  },

  // 生命周期函数--监听页面加载
  onLoad(opt) {
    console.log(opt)
    this.setData({
      flagNum: Math.random().toString(36).substr(2),
      id: opt.id,
      couponamount: Number(opt.couponamount),
      couponTotalCount: Number(opt.couponTotalCount)
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });

    this.getGoodsDetailData();
    this.getDetailNewGoods();
  },

  // 获取详情页有关信息
  getGoodsDetailData() {
    api.getTBgoodsList({
      data: {
        num_iid: this.data.id
      },
      success: (res) => {
        if (res.data.success) {
          this.setData({
            goodsData: res.data.result,
            flag: true,
            canShare: true
          })
          wx.setNavigationBarTitle({
            title: res.data.result.title
          })
        } else {
          wx.showModal({
            title: '糟了',
            content: res.data.message,
            showCancel: false,
            confirmText:'返回',
            confirmColor: '#f35',
            success: res=>{
              res.confirm? wx.navigateBack(): ''
            }
          })
        }
        wx.hideToast()
      }
    })
  },

  // 详情页点击获取更多图片
  loadMoreImg() {
    this.setData({
      isLoading: true,
    })

    setTimeout(() => {
      this.setData({
        isLoading: false,
        showMore: true
      })
    }, 400)
  },

  // 关闭详情页打开的更多的图片
  closeMore() {
    this.setData({
      isLoading: false,
      showMore: false,
      toIndex: 'detail_content'
    })
  },

  // 获取详情页新品推荐数据
  getDetailNewGoods() {
    this.setData({
      loading: false
    })
    api.getDetailNewGoods({
      data: {
        page: this.data.nextPage,
        flag: this.data.flagNum
      },
      success: (res) => {
        this.setData({
          newGoodsListArr: this.data.newGoodsListArr.concat(res.data.result.list),
          nextPage: res.data.result.pagination.nextPage,
          loading: true
        })
      }
    })
  },

  // 本页面打开商品
  goDetail(option) {
    wx.redirectTo({
      url: `/pages/detail/detail?id=${option.currentTarget.dataset.id}`,
    })
  },

  // 滑动到底部加载更多数据
  scrolltolower() {
    if (this.data.loading && this.data.nextPage) {
      this.getDetailNewGoods();
    }
  },

  // 返回顶部
  backToTop() {
    this.setData({
      toIndex: 'detail_top'
    })
  },

  // sscroll-view页面滑动
  myScroll(opt) {
    if (opt.detail.scrollTop >= 500) {
      this.animation.translate(0, -sysInfo.screenHeight * 0.18).step({
        duration: 500
      })
    } else {
      this.animation.translate(0, 0).step({
        duration: 500
      })
    }
    this.setData({
      backTopAnimation: this.animation.export(),
    })
  },


  // 打开淘口令弹窗
  showTaokouling() {
    this.getTaokouling();
    this.animation.translate(-sysInfo.screenWidth, 0).step({
      duration: 200
    })
    this.setData({
      animationData: this.animation.export(),
      isScroll: false
    })
  },

  // 关闭淘口令弹窗
  closeTaokouling() {
    this.animation.translate(0, 0).step({
      duration: 200
    })
    this.setData({
      animationData: this.animation.export(),
      isScroll: true
    })
  },

  // 获取淘口令
  getTaokouling() {
    api.getCoupnTaokouling({
      data: {
        id: this.data.id,
        type: this.data.couponTotalCount == 0 ? 1 : 2
      },
      success: res => {
        console.log(res.data)
        this.setData({
          taokouling: res.data.tkl
        })
      }
    })
  },

  // 复制淘口令到剪切板
  copyTKL() {
    wx.setClipboardData({
      data: this.data.taokouling,
      success: function(res) {
        console.log(res)
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
  onShow() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: this.data.goodsData.title,
      path: `/pages/detail/detail?id=${this.data.goodsData.id}`,
      imageUrl: this.data.goodsData.pict_url,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})