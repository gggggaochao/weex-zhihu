<template>
  <div>
    <list class="list">
      <cell class="row" v-for="item in rows"  @click="jumpToDetail(item.id)">
        <div class="list-cell">
          <div class="list-left">
            <img class="list-img" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.images[0]"/>
          </div>
          <div class="list-right">
            <text class="item-title">{{item.id}}</text>
            <text class="item-title">{{item.title}}</text>
          </div>
        </div>
      </cell>
    </list>
    <div class="title-bar">
      <a class="button-sidebar">
        <text class="icon">&#xe641;</text>
      </a>
      <div class="title-others">
        <text class="title-text">首页</text>
        <div class="message-and-option">
          <a class="button-message">
            <text class="icon">&#xe6e1;</text>
          </a>
          <a class="button-option">
            <text class="icon">&#xe648;</text>
          </a>
        </div>
      </div>
    </div>

    <div class="button-test">
      <text class="icon" style="color:#000">1&#xe641;</text>
    </div>
  </div>
</template>

<style scoped>
  .button-test {
    position: fixed;
    top: 500px;
    width: 100px;
    height: 100px;
    background-color: red;
  }
  .icon{
    font-family:"iconfont" !important;
    font-size:30px;
    font-style:normal;
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
  .list {
    margin-top: 100px;
  }
  .list-cell {
    width: 750px;
    height: 100px;
    display:flex;
    flex-direction: row;
  }
  .list-img {
    width: 70px;
    height: 70px;
    margin-left: 0px;
  }
  .list-left {

  }
  .list-right {
    display:flex;
    flex-direction: column;
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
    width: 120px;
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
        message: 'none'
      }
    },
    init: function () {
      
    },
    mounted: function () {
      var domModule=weex.requireModule("dom");
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