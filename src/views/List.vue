<template>
  <div>   
    <list class="scroll">
      <cell>
        <slider class="slider" interval="4500" auto-play="true">
          <div class="slider-frame" v-for="item in imageList">
            <image class="slider-image" resize="cover" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item"></image>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </cell>
      <cell class="small-title">
        <div class="small-title-div">
          <text class="small-title-text">今日热闻</text>
        </div>
      </cell>
      <cell class="cell" v-for="item in rows"  @click="jumpToDetail(item.id)">
        <div class="cell-div">
          <div class="cell-div-content">
            <div class="cell-div-content-left">
              <text class="cell-div-content-left-text">{{item.title}}</text>
            </div>
            <div class="cell-div-content-right">
              <img class="cell-div-content-right-img" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.images[0]"/>
            </div>
            <!-- <div class="cell-div-content-left">
              <img class="list-img" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.images[0]"/>
            </div>
            <div class="list-right">
              <text class="item-title">{{item.id}}</text>
              <text class="item-title">{{item.title}}</text>
            </div> -->
          </div>
        </div>       
      </cell>
    </list>
    <div class="title-bar">
      <div class="button-sidebar">
        <text class='icon'>&#xe641;</text>
      </div>
      <div class="title-others">
        <text class="title-text">首页</text>
        <div class="message-and-option">
          <div class="button-message">
            <text class="icon">&#xe6e1;</text>
          </div>
          <div class="button-option">
            <text class="icon">&#xe648;</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .cell {
    width: 750px;
    height: 250px;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    background-color: #f3f3f3;
  }
  .cell-div {
    width: 710px;
    height: 230px;
    background-color: #fff;
    border-radius: 10px;
    display:flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding-top: 30px; 
  }
  .cell-div-content {
    width: 630px;
    height: 140px;
    display: flex;
    flex-direction: row;
  }
  .cell-div-content-left {
    flex: 5;
  }
  .cell-div-content-left-text {
    font-size: 40px;
    text-overflow: ellipsis;
  }
  .cell-div-content-right {
    flex: 2;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .cell-div-content-right-img {
    width: 150px;
    height: 140px;
  }
  .small-title {
    width: 750px;
    height: 75px;
    background-color: #f3f3f3;
  }
  .small-title-div {
    width: 150px;
    height: 75px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    background-color: #f3f3f3;
  }
  .small-title-text {
    font-size: 30px;
  }
  .scroller {
    margin-top: 100px;
  }
  .slider-image {
    width: 750px;
    height: 460px;
  }
  .slider {
    width: 750px;
    height: 460px;
  }
  .slider-frame {
    width: 750px;
    height: 460px;
    position: relative;
  }
  .indicator {
    item-color: green;
    item-selected-color: red;
    item-size: 3;
    position: absolute;
    top: 350px;
  }
  .button-test {
    position: fixed;
    top: 500px;
    width: 100px;
    height: 100px;
    background-color: red;
  }
  .icon{
    font-family: iconfont;
    font-size: 30px;
    color: #fff;
  }
  .title-bar {
    position: fixed;
    top: 0;
    background-color: #089fea;
    width: 750px;
    height: 100px;
    flex-direction: row;
    display: flex;
  }
  .button-sidebar {
    width: 120px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .title-others {
    width: 630px;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
  }
  .message-and-option {
    width: 170px;
    height: 100px;
    display: flex;
    flex-direction: row;
  }
  .button-message {
    width: 120px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .button-option {
    width: 50px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .title-text {
    color: #fff;
    margin-left: 20px;
    font-weight: bold;
  }
</style>

<script>
  var stream = weex.requireModule('stream')

  export default {
    data () {
      return {
        rows:[],
        message: 'none',
        imageList: ["https://pic4.zhimg.com/v2-2a7159cf4ef9cc60ffc0698283f6de23.jpg",
        "https://pic2.zhimg.com/v2-7f92f053b865246328037575ce5cb02d.jpg",
        "https://pic2.zhimg.com/v2-850ae640073ad2803f3543dbc4397ad5.jpg"],
      }
    },
    init: function () {

    },
    mounted: function () {
      var domModule=weex.requireModule("dom")
      domModule.addRule('fontFace',{
        'fontFamily': 'iconfont',
        'src': "url(\'http://at.alicdn.com/t/font_12wygbl2afm3g14i.ttf\')"
      })
    },
    created: function () {
      var url = "https://news-at.zhihu.com/api/4/news/latest"
      // var url = "https://www.buzhizhe.cn/api/api.php"
      this.renderData(url)
    },
    methods: {
      renderData: function (url) {
        var self = this
        stream.fetch({
          method: 'GET',
          url: url,
          type:'json',
          body: ''
        }, function(res) {
          if(res.data){
            // console.log("the result is"+res.stories);
            self.rows = res.data.stories
          } else {
            console.log("无数据")
            self.message = "无数据"
          }
        })
      },
      jumpToDetail: function (passageId) {
        this.$router.push({ name: '/listDetail', params: { id: passageId }})
        // this.$router.push({path: '/listDetail',query: { id: passageId }})
      },

    }
  }
</script>