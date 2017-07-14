<template>
  <scroller>
    <div class="title-content">
      <div>        
        <image class="title-img" :src="imgUrl"></image>
        <div class="title-blank"></div>
      </div>
      <div class="img-filter"></div>
      <div class="div-title">
        <text class="title-text">{{content.title}}</text>
      </div>  
    </div>
    <div class="paragraph" v-for="item in body">
      <text class="paragraph-text" v-if="!item.img">{{item.content}}</text>
      <image class="paragraph-img" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.img.src" v-else></image>
    </div>
    <div class="title-bar">
      <div class="button-back" @click="jump('/list')">
        <text class="iconfont">&#xe602;</text>
      </div>
      <div class="button-share">
        <text class="iconfont2">&#xe6d9;</text>
      </div>
      <div class="button-star">
        <text class="iconfont2">&#xe655;</text>
      </div>
      <div class="button-comment">
        <text class="iconfont2">&#xe60b;</text>
        <text class="text-number"> 26</text>
      </div>
      <div class="button-like">
        <text class="iconfont2">&#xe600;</text>
        <text class="text-number"> 161</text>
      </div>
    </div>
  </scroller>
</template>

<style scoped>
  .paragraph {
    padding-top: 40px;
    padding-right: 40px;
    padding-bottom: 0;
    padding-left: 40px;
  }
  .paragraph-text {
    font-size: 40px;
  }
  .paragraph-img {
    height: 450px;
    width: 670px;
  }
  .iconfont {
    font-family: iconfont;
    font-size: 30px;
    font-style: normal;
    color: #fff;
  }
  .iconfont2{
    font-family: iconfont;
    font-size: 40px;
    font-style: normal;
    color: #fff;
  }
  .title-content {
    width: 750px;
    height: 560px;
  }
  .title-blank {
    position: absolute;
    top: 0px;
    width: 750px;
    height: 100px;
    background-color: #fff;
  }
  .title-img {
    width: 750px;
    height: 560px;
    margin-left: 0px;
    resize: cover;
  }
  .img-filter {
    position: absolute;
    top: 100px;
    width: 750px;
    height: 460px;
    background-image: linear-gradient(to top,#000,#fff);
    opacity: 0.5;
  }
  .title-bar {
    position: fixed;
    top: 0;
    background-color: #089fea;
    width: 750px;
    height: 100px;
    flex-direction: row;
  }
  .div-title {
    width: 750px;
    height: 140px;    
    position: absolute;
    bottom: 5px;
    padding-bottom: 40px;
    padding-left: 40px;
    padding-right: 40px;
  }
  .title-text {
    color: #fff;   
    font-weight: bold;
    font-size: 42px;
  }
  .button-back {
    width: 120px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .button-share {
    width: 120px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 120px;
  }
  .button-star {
    width: 120px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .button-comment {
    width: 120px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
  .button-like {
    width: 120px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
  .text-number {
    color: #fff;
  }
</style>

<script>
  var stream = weex.requireModule('stream')

  export default {
    data () {
      return {
        id: '',
        content: {},
        body: [],
        imgUrl:'',
        webUrl: '',
      }
    },
    mounted: function () {
      var domModule=weex.requireModule("dom");
      domModule.addRule('fontFace',{
        'fontFamily': 'iconfont',
        'src': "url(\'http://at.alicdn.com/t/font_12wygbl2afm3g14i.ttf\')"
      })
    },
    created: function() {
      var vm = this
      vm.id = vm.$route.params.id
      var url = "https://www.buzhizhe.cn/api/detail.php?id="
      var prefix = "http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl="
      stream.fetch({
        method: 'GET',
        url: url + vm.id,
        type:'json',
        body: ''
      }, function(res) {
        if(res){
          vm.content = res.data
          vm.imgUrl = prefix + vm.content.image
          console.log(vm.imgUrl)
          vm.body = vm.transform(vm.content.body)
        } else {
          vm.message = "无数据"
        }
      })
    },
    methods: {
      transform: function (html){
        var arr = html.match(/<p.*?>(.*?)<.*?\/p>/g);
        if (!arr || !arr.length) return;
        var templateArr = [];
        for (var i = 0; i < arr.length; i++) {
          var obj = {
            content: '',
            style: {},
            img: false
          };
          //处理外层p的align
          if(/<p.*align="(\w+)".*>/.test(arr[i])) {
            obj.style.textAlign = /<p.*?align="(\w+)".*?>/.exec(arr[i])[1];
          }
          var inner = /<p.*?>(.*)<\/p>/.exec(arr[i])[1];
          if (!inner.length) continue;
          if(/<img.*?\/>/.test(inner)) {
            //处理图
            obj.img = true;
            obj.img = {
              // style: /style="(.+?)"/.exec(inner)[1],
              src: /src="(.+?)"/.exec(inner)[1]
            };
          }
          else {
            if (/<strong.*?>(.*)<\/strong>/.test(inner)){
              obj.style.fontWeight = 'bold';
              obj.content = contentHandler(/<strong.*?>(.*)<\/strong>/.exec(inner)[1]);
            } else {
              obj.content = contentHandler(inner);
            }
          }
          templateArr.push(obj);
        }
        return templateArr;
        function contentHandler(str) {
          var str2 = str.replace(/&nbsp;/g, '')
          var str2 = str2.replace(/&rdquo;/g, '”')
          var str2 = str2.replace(/&ldquo;/g, '“')
          var str2 = str2.replace(/&mdash;/g, '—')
          var str2 = str2.replace(/&hellip;/g, '…')
          var str2 = str2.replace(/&curren;/g, '¤')
          var str2 = str2.replace(/&middot;/g, '·')
          var str2 = str2.replace(/<.*?>/g, '')
          return str2
        }
      }
    }
  }
</script>