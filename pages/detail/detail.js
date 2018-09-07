// pages/detail/detail.js
import api from '../../api/api.js';
import utils from '../../utils/util.js';
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
    goodsImgArr: [], //打开更多的图片的arr
    newGoodsListArr: [], //新品推荐的数据
    nextPage: 1, //新品推荐的下一页
    flagNum: 0, //新品推荐的时间戳
    toIndex: '', //scroll-view定位到id
    loading: false, //限制滑到底部时会请求多次
    isLiked: false, //是否已经点赞
    isCollect: false, //是否已经收藏
    sellerInfo: {}, //卖家信息
    sellerIconWidth: 0, //卖家信用图标宽度
    sellerIconHeight: 0, //卖家信用图标高度
    sellerIcon: '', //卖家信用图标url
    animationData: {}, //淘口令弹窗动画
    backTopAnimation: {}, //返回顶部按钮动画
    taokouling: "获取中...", // 淘口令
    canShare: false, //能否分享
    backHomePosition: sysInfo.screenHeight * 0.2, //返回首页的按钮位置
    userInfo: null
  },

  // 生命周期函数--监听页面加载
  onLoad(options) {
    this.setData({
      flagNum: Math.random().toString(36).substr(2),
      userInfo: getApp().globalData.userInfo,
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });
    this.getGoodsDetailData(options.id);
    this.getDetailNewGoods();
    this.getLikeAndCollectionInfo(options.id);

    // 获取本地足迹
    wx.getStorage({
      key: 'footArr',
      success: res => {
        this.setData({
          footArr: res.data
        })
      },
    })
  },

  // 获取详情页有关信息
  getGoodsDetailData(id) {
    api.getGoodsDetail({
      data: {
        id: id
      },
      success: (res) => {
        this.setData({
          goodsData: res.data,
          flag: true,
          canShare: true
        })
        wx.setNavigationBarTitle({
          title: this.data.goodsData.title
        })
        wx.hideToast();
        // 本地存储
        utils.setFootprints(res.data.id)
      }
    })
  },


  // 详情页点击获取更多图片
  loadMoreImg() {
    this.setData({
      isLoading: true,
    })
    api.getDetailMoreImg({
      data: {
        data: "{item_num_id=" + this.data.goodsData.threadsGoods.num_iid + "}"
      },
      success: (res) => {
        let imgData = res.data.slice(10, res.data.length - 1);
        this.setData({
          goodsImgArr: JSON.parse(imgData).data.images,
          isLoading: false,
          showMore: true
        })
      }
    })
  },

  // 关闭详情页打开的更多的图片
  closeMore() {
    this.setData({
      goodsImgArr: [],
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

  //获取点赞和收藏状态
  getLikeAndCollectionInfo(id) {
    api.getDetailLikeInfo({
      data: {
        id: id
      },
      success: (res) => {
        let sellerIcon = '';
        if (res.data.seller) {
          switch (res.data.seller.credit_level) {
            case 1:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB2Lj08k8mWBuNkSndVXXcsApXa-62752115.gif'
              break
            case 2:
              sellerIcon = 'https://img.alicdn.com/imgextra/i2/62752115/TB2xZxKk2iSBuNkSnhJXXbDcpXa-62752115.gif'
              break
            case 3:
              sellerIcon = 'https://img.alicdn.com/imgextra/i1/62752115/TB2cP48k8mWBuNkSndVXXcsApXa-62752115.gif'
              break
            case 4:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB2_wcvtmBYBeNjy0FeXXbnmFXa-62752115.gif'
              break
            case 5:
              sellerIcon = 'https://img.alicdn.com/imgextra/i2/62752115/TB2zNCAk98YBeNkSnb4XXaevFXa-62752115.gif'
              break
            case 6:
              sellerIcon = 'https://img.alicdn.com/imgextra/i2/62752115/TB2dZO_thSYBuNjSsphXXbGvVXa-62752115.gif'
              break
            case 7:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB2EslKk2iSBuNkSnhJXXbDcpXa-62752115.gif'
              break
            case 8:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB2PtGutgmTBuNjy1XbXXaMrVXa-62752115.gif'
              break
            case 9:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB2cozhtbuWBuNjSszgXXb8jVXa-62752115.gif'
              break
            case 10:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB26.v6tkSWBuNjSszdXXbeSpXa-62752115.gif'
              break
            case 11:
              sellerIcon = 'https://img.alicdn.com/imgextra/i4/62752115/TB2tZCStkKWBuNjy1zjXXcOypXa-62752115.gif'
              break
            case 12:
              sellerIcon = 'https://img.alicdn.com/imgextra/i4/62752115/TB2oUz6tkSWBuNjSszdXXbeSpXa-62752115.gif'
              break
            case 13:
              sellerIcon = 'https://img.alicdn.com/imgextra/i1/62752115/TB27057tbGYBuNjy0FoXXciBFXa-62752115.gif'
              break
            case 14:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB28Yvrtb1YBuNjSszhXXcUsFXa-62752115.gif'
              break
            case 15:
              sellerIcon = 'https://img.alicdn.com/imgextra/i4/62752115/TB2nRLuteOSBuNjy0FdXXbDnVXa-62752115.gif'
              break
            case 16:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB2CRQMtmtYBeNjSspkXXbU8VXa-62752115.gif'
              break
            case 17:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB2YS6GthSYBuNjSspjXXX73VXa-62752115.gif'
              break
            case 18:
              sellerIcon = 'https://img.alicdn.com/imgextra/i3/62752115/TB2qBqYtXGWBuNjy0FbXXb4sXXa-62752115.gif'
              break
            case 19:
              sellerIcon = 'https://img.alicdn.com/imgextra/i1/62752115/TB2LefutXuWBuNjSspnXXX1NVXa-62752115.gif'
              break
            case 20:
              sellerIcon = 'https://img.alicdn.com/imgextra/i1/62752115/TB2obDKteuSBuNjy1XcXXcYjFXa-62752115.gif'
              break
          }
        }

        this.setData({
          isLiked: res.data.is_vote,
          isCollect: res.data.is_favorite,
          sellerInfo: res.data.seller,
          sellerIcon: sellerIcon
        })
      }
    })
  },

  // 点赞
  prosLike() {
    api.prosLike({
      data: {
        tid: this.data.goodsData.id
      },
      success: (res) => {
        if (res.data.success) {
          wx.showToast({
            icon: 'success',
            title: res.data.message,
            duration: 2000
          })
          this.setData({
            isLiked: true
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
            duration: 2000
          })
          this.setData({
            isLiked: false
          })
        }
      }
    })
  },

  // 监听图片加载
  imageLoad(e) {
    this.setData({
      sellerIconWidth: e.detail.width,
      sellerIconHeight: e.detail.height
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
    api.getTaokouling({
      data: {
        id: this.data.goodsData.id
      },
      success: res => {
        console.log(res.data)
        this.setData({
          taokouling: res.data.data.model
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
      imageUrl: this.data.goodsData.thread_img,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})