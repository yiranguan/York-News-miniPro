let TYPEINDEX = 0 // 新闻种类在this.data.newsType数组中的位置
let LISTINDEX = 7 // 加载新闻列表的数量
let TOUCHTIMES = 0 // 记录当前分类下，滑动的次数
let TOUCHDOT = 0  // 滑动触摸开始位置
let INTERVAL = '' // 滑动行为持续的时间
let FLAG_HD = true // 防止页面加载完成之前，再次执行滑动

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
    newTypePicURL: '/images/gn-pic.jpg',
    newsList: [],
  },

  onLoad() {
    this.getList(TYPEINDEX, LISTINDEX)
  },
  // 下方方法：点击分类，实现分类文字、标题图片的变化，以及不同列表的渲染
  onNewsTypeTap(event){
    console.log(event)
    LISTINDEX = 7
    TYPEINDEX = event.currentTarget.dataset.type
    this.setNewsTypeStyle()
    this.getList(TYPEINDEX, LISTINDEX)
  },

  onNewstap(event){

  },

  contentTouchStart(){

  },

  contentTouchEnd(){

  },

  contentTouchMove(){

  },
  // 下拉刷新
  onPullDownRefresh(){
    LISTINDEX = 7
    this.getList(TYPEINDEX, LISTINDEX,() => {
      wx.stopPullDownRefresh()
    })
  },
  // 触底加载
  onReachBottom(){
    LISTINDEX += 7
    this.getList(TYPEINDEX, LISTINDEX)
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
        console.log('Callback is: ', callback)
        callback && callback()
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

})
