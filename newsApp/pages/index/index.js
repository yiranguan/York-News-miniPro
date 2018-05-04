let TYPEINDEX = 0 // 新闻种类在this.data.newsType数组中的位置
let LISTINDEX = 7 // 加载新闻列表的数量
let TOUCHDOT = 0  // 滑动触摸开始位置
let INTERVAL = '' // 滑动行为持续的时间

Page({
  data:{
    newsType:[
      {
        text: '国内',
        type: 'gn',
        select: 'selected',
        selectLine: 'selected-line',
        code:0
      }, 
      {
        text: '国际',
        type: 'gj',
        select: '',
        selectLine: '',
        code: 1
      },
      {
        text: '财经',
        type: 'cj',
        select: '',
        selectLine: '',
        code: 2
      },
      {
        text: '娱乐',
        type: 'yl',
        select: '',
        selectLine: '',
        code: 3
      },
      {
        text: '军事',
        type: 'js',
        select: '',
        selectLine: '',
        code: 4
      },
      {
        text: '体育',
        type: 'ty',
        select: '',
        selectLine: '',
        code: 5
      },
      {
        text: '其他',
        type: 'other',
        select: '',
        selectLine: '',
        code: 6
      }
    ],
    tryTemplate:{
      newTypePicURL: '/images/gn-pic.jpg',
      newsList: [],
    },
    newTypePicURL: '/images/gn-pic.jpg',
    newsList: [],
    animationData: {}
  },

  onLoad() {
    this.getList(TYPEINDEX, LISTINDEX)
    wx.showLoading({
      title: '加载中',
    })
  },
  // 下方方法：点击分类，实现分类文字、标题图片的变化，以及不同列表的渲染
  onNewsTypeTap(event){
    LISTINDEX = 7
    TYPEINDEX = event.currentTarget.dataset.type
    this.setNewsTypeChangeAnimation()
    this.setNewsTypeStyle()
    this.getList(TYPEINDEX, LISTINDEX)
    wx.showLoading({
      title: '加载中',
    })
  },

  onShow(){
    clearInterval(INTERVAL);
  },

  onNewsTap(event) {
    let id = event.currentTarget.dataset.type
    let newsType = this.data.newsType[TYPEINDEX].type
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&type=' + newsType
    })
  },

  contentTouchStart(event){
    TOUCHDOT = event.touches[0].pageX // 获取触摸时的原点
    // 使用js计时器记录时间    
    INTERVAL = setInterval(() => {}, 100)
  },

  contentTouchEnd(event){
    let touchMove = event.changedTouches[0].pageX
    // 向左滑动   
    if (touchMove - TOUCHDOT <= -100) {
      if (TYPEINDEX<6){
        LISTINDEX = 7
        TYPEINDEX += 1
        this.setNewsTypeStyle()
        this.getList(TYPEINDEX, LISTINDEX)
        wx.showLoading({
          title: '加载中',
        })
      }
      
    }
    // 向右滑动   
    if (touchMove - TOUCHDOT >= 100) {
      if (TYPEINDEX > 0) {
        LISTINDEX = 7
        TYPEINDEX -= 1
        this.setNewsTypeStyle()
        this.getList(TYPEINDEX, LISTINDEX)
        wx.showLoading({
          title: '加载中',
        })
      }
    }
    clearInterval(INTERVAL); // 清除setInterval
  },
  // 下拉刷新
  onPullDownRefresh(){
    LISTINDEX = 7
    this.getList(TYPEINDEX, LISTINDEX,() => {
      wx.stopPullDownRefresh()
    })
    wx.showLoading({
      title: '加载中',
    })
  },
  // 触底加载
  onReachBottom(){
    LISTINDEX += 7
    this.getList(TYPEINDEX, LISTINDEX)
    wx.showLoading({
      title: '加载中',
    })
  },
  // 下方getList()方法用来获取数据并设置data
  getList(typeIndex, listIndex, callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: { 'type': this.data.newsType[typeIndex].type },
      success:res => {
        let result = res.data.result
        this.setNewsListData(result, listIndex)
      },
      fail:res => {
        wx.showToast({
          title: '尴尬了，页面加载失败',
        })
      },
      complete:() => {
        callback && callback()
        wx.hideLoading();
      }
    })
  },
  // 下方setNewsListData(result, listIndex)方法，用来设置data，渲染页面
  setNewsListData(result, listIndex){
    let newsList = []
    let listLength = 0
    if(listIndex > result.length){
      listLength = result.length
    }else{
      listLength = listIndex
    } 
    for (let i = 0; i < listLength; i++) {
      let content = result[i]
      content.date = content.date.slice(0,10)
      newsList.push(
        content
      )
    }
    this.setData({
      newsList: newsList
    })
  },
  // 下方方法实现分类文字效果、标题图片的变化
  setNewsTypeStyle(){
    let newsType = []
    for (let i = 0; i < 7; i++) {
      let content = this.data.newsType[i]
      content.select = ''
      content.selectLine = ''
      newsType.push(content)
    }
    newsType[TYPEINDEX].select = 'selected'
    newsType[TYPEINDEX].selectLine = 'selected-line'
    this.setData({
      newsType: newsType,
      newTypePicURL: '/images/' + newsType[TYPEINDEX].type + '-pic.jpg'
    })
  },

  setNewsTypeChangeAnimation(){
    let animation = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 200,
      timingFunction: 'ease',
      delay:0
    })
    this.animation = animation
    this.animation.scale(1.3, 1.3).step()
    this.animation.scale(1, 1).step()
    this.setData({
      animationData: this.animation.export()
    })
  },

})
