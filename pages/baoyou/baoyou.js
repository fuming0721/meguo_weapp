// pages/baoyou/baoyou.js
import api from '../../api/api.js';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wHeight: 0, //window的高度
    adList: [ //顶部广告
      {
        picUrl: 'https://img.alicdn.com/imgextra/i2/62752115/TB2t5vNxbGYBuNjy0FoXXciBFXa-62752115.png',
        path: 'subCategory/subCategory?cid=10&id=114&title=袜类配件',
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i4/62752115/TB2bt2fxgaTBuNjSszfXXXgfpXa-62752115.png',
        path: 'subCategory/subCategory?cid=49&id=56&title=新鲜水果'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i4/62752115/TB24sHKxeuSBuNjSsplXXbe8pXa-62752115.png',
        path: 'subCategory/subCategory?cid=62&id=66&title=数码配件'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i4/62752115/TB2rLQBxbSYBuNjSspfXXcZCpXa-62752115.png',
        path: 'subCategory/subCategory?cid=3&id=121&title=女士鞋靴'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i1/62752115/TB22nEfxkOWBuNjSsppXXXPgpXa-62752115.png',
        path: 'category/category?id=1&title=女装'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i3/62752115/TB245nNxbGYBuNjy0FoXXciBFXa-62752115.png',
        path: 'subCategory/subCategory?cid=3&id=123&title=女士包包'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i2/62752115/TB2XvCBoZyYBuNkSnfoXXcWgVXa-62752115.png',
        path: 'category/category?id=2&title=男装'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i3/62752115/TB2OaoexkCWBuNjy0FaXXXUlXXa-62752115.png',
        path: 'subCategory/subCategory?cid=12&id=14&title=彩妆产品'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i3/62752115/TB2xjehxDJYBeNjy1zeXXahzVXa-62752115.png',
        path: 'subCategory/subCategory?cid=92&id=95&title=绿植花卉'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i4/62752115/TB22tPfxgaTBuNjSszfXXXgfpXa-62752115.png',
        path: 'subCategory/subCategory?cid=49&id=50&title=休闲零食'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i3/62752115/TB272oXxb1YBuNjSszhXXcUsFXa-62752115.png',
        path: 'subCategory/subCategory?cid=37&id=38&title=居家日用'
      },
      {
        picUrl: 'https://img.alicdn.com/imgextra/i2/62752115/TB2i54kxqmWBuNjy1XaXXXCbXXa-62752115.png',
        path: 'subCategory/subCategory?cid=57&id=59&title=生活电器'
      },
    ],
    randomADlist: [], //随机出4个不重复的广告
    navActiveIndex: 1, // 包邮页nav 的index
    navList: [{ //  nav的内容
        name: '精选',
        index: 1
      },
      {
        name: '9块9',
        index: 2
      },
      {
        name: '19块9',
        index: 3
      },
      {
        name: '29块9',
        index: 4
      },
      {
        name: '39块9',
        index: 5
      }
    ],
    nextPage: 1, //goodslist的下一页
    goodsListArr: [], //goodsList数组
    haveMore: true, //goodsList能否翻页
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
    this.getGoodsList()
    this.setData({
      randomADlist: this.getRandom({
        'arr': this.data.adList,
        'range': 6
      }),
      userInfo: app.globalData.userInfo,
      wHeight: app.globalData.sysInfo.windowHeight
    })
  },

  // nav点击
  changeNav(opt) {
    this.setData({
      navActiveIndex: opt.currentTarget.dataset.index,
      nextPage: 1,
      goodsListArr: []
    });
    this.getGoodsList()
  },

  // 随机出4个不同的图片
  getRandom(opt) {
    let range = opt.range;
    //防止超过数组的长度
    range = range > opt.arr.length ? opt.arr.length : range;
    var newArray = [].concat(opt.arr), //拷贝原数组进行操作就不会破坏原数组
      valArray = [];
    for (var n = 0; n < range; n++) {
      var r = Math.floor(Math.random() * (newArray.length));
      valArray.push(newArray[r]);
      //在原数组删掉，然后在下轮循环中就可以避免重复获取
      newArray.splice(r, 1);
    }
    return valArray;
  },

  // 获取goodsList数据
  getGoodsList() {
    api.getGoodsList({
      data: {
        channel: 1,
        price: this.data.navActiveIndex,
        page: this.data.nextPage
      },
      success: res => {
        let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
        let haveMoreData = nextPage == 'false' ? false : true;
        this.setData({
          goodsListArr: this.data.goodsListArr.concat(res.data.result.articals),
          nextPage: nextPage,
          haveMore: haveMoreData
        })
        wx.hideToast()
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
    this.setData({
      userInfo: app.globalData.userInfo
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

  // 点击活动图片跳转到分类页
  toSubCategory(opt) {
    wx.navigateTo({
      url: `/pages/${opt.currentTarget.dataset.path}`,
      complete: () => {
        setTimeout(()=>{
          this.setData({
            randomADlist: this.getRandom({
              'arr': this.data.adList,
              'range': 6
            })
          })
        },400)
      }
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
  onReachBottom: function() {
    this.data.haveMore ? this.getGoodsList() : ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})