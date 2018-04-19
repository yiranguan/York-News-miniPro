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
        selectLine: 'selected-line'
      }, 
      {
        text: '国际',
        type: 'gj',
        select: '',
        selectLine: ''
      },
      {
        text: '财经',
        type: 'cj',
        select: '',
        selectLine: ''
      },
      {
        text: '娱乐',
        type: 'yl',
        select: '',
        selectLine: ''
      },
      {
        text: '军事',
        type: 'js',
        select: '',
        selectLine: ''
      },
      {
        text: '体育',
        type: 'ty',
        select: '',
        selectLine: ''
      },
      {
        text: '其他',
        type: 'other',
        select: '',
        selectLine: ''
      }
    ],

    newTypePicURL: '/images/gn-pic.jpg',

    newsList: [
      {
      "id": 1519631218506,
      "title": "外媒称香港回归15年打破“经济将死”预言,尝试多行文本溢出，尝试多行文本溢出，尝试多行文本溢出，",
      "date": "2012-07-01",
      "source": "中国新闻网",
      "firstImage": "http://img1.gtimg.com/news/pics/hv1/38/85/1076/69988613.jpg"
      },
      {
        "id": 1519631218506,
        "title": "外媒称香港回归15年打破“经济将死”预言",
        "date": "2012-07-01",
        "source": "中国新闻网",
        "firstImage": "http://img1.gtimg.com/news/pics/hv1/38/85/1076/69988613.jpg"
      },
      {
        "id": 1519631218506,
        "title": "外媒称香港回归15年打破“经济将死”预言",
        "date": "2012-07-01",
        "source": "中国新闻网",
        "firstImage": "http://img1.gtimg.com/news/pics/hv1/38/85/1076/69988613.jpg"
      },
      {
        "id": 1519631218506,
        "title": "外媒称香港回归15年打破“经济将死”预言",
        "date": "2012-07-01",
        "source": "中国新闻网",
        "firstImage": "http://img1.gtimg.com/news/pics/hv1/38/85/1076/69988613.jpg"
      },
    ],
  },

  onLoad(){
    this.getList(TYPEINDEX, LISTINDEX)
  },

  onNewsTypeTap(event){

  },

  onNewstap(event){

  },

  contentTouchStart(){

  },

  contentTouchEnd(){

  },

  contentTouchMove(){

  },

  onPullDownRefresh(){

  },

  onReachBottom(){

  },

  getList(typeIndex, listIndex){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: { 'type': this.data.newsType[typeIndex].type },
      success:res => {
        let result = res.data.result
        let newsList = [] 
        console.log('newsListDataIs: ', result)
        for (let i=0; i<listIndex; i++) {
          newsList.push(
            result[i]
          )
        }
        console.log('The newList will rending is :', newsList)
        this.setData({
          newsList: newsList
        })
      },
    })
  }

})
