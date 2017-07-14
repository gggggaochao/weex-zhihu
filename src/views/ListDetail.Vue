<template>
  <list>
    <div>
      <img class="title-img" :src="imgUrl" />
      <text class="title">{{content.title}}</text>
    </div>
    <div>
      <text class="hello" v-for="item in body">{{item.content}}</text>
    </div>
    <!-- <text>{{body}}</text> -->
    <div class="title-bar">
      <a class="button-back" @click="jump('/list')">
        <text class="iconfont">&#xe602;</text>
      </a>
      <a class="button-share" @click="jump('/list')">
        <text class="iconfont2">&#xe6d9;</text>
      </a>
      <a class="button-star" @click="jump('/list')">
        <text class="iconfont2">&#xe655;</text>
      </a>
      <a class="button-comment" @click="jump('/list')">
        <text class="iconfont2">&#xe60b;</text>
        <text class="text-number"> 26</text>
      </a>
      <a class="button-like" @click="jump('/list')">
        <text class="iconfont2">&#xe600;</text>
        <text class="text-number"> 161</text>
      </a>
    </div>
  </list>
</template>

<style scoped>
  /*@font-face {
    font-family: 'iconfont';
    src: url('https://at.alicdn.com/t/font_12wygbl2afm3g14i.eot');
    src: url('https://at.alicdn.com/t/font_12wygbl2afm3g14i.eot?#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_12wygbl2afm3g14i.woff') format('woff'),
    url('https://at.alicdn.com/t/font_12wygbl2afm3g14i.ttf') format('truetype'),
    url('https://at.alicdn.com/t/font_12wygbl2afm3g14i.svg#iconfont') format('svg');
  }*/
  .iconfont{
    font-family:"iconfont" !important;
    font-size:30px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
  }
  .iconfont2{
    font-family: "iconfont" !important;
    font-size: 40px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
  }
  .title-img {
    width: 750px;
    height: 560px;
    margin-left: 0px;
  }
  .title-bar {
    position: fixed;
    top: 0;
    background-color: #089fea;
    width: 750px;
    height: 100px;
    flex-direction: row;
  }
  .title-link {
    position: absolute;
    background-color: #fff;
    width: 750px;
    height: 124px;
    padding: 0 20px 0 32px;
  }
  .title-logo {
    width: 112px;
    height: 88px;
    margin-top: 14px;
  }
  .title {
    color: #fff;
    position: absolute;
    bottom: 5px;
    font-weight: bold;
    font-size: 42px;
    margin:40px 0;
    padding:0 40px !important; 
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
  }
  .button-like {
    width: 120px;
    height: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
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
        webUrl: ''
      }
    },
    created: function() {
      var vm = this
      // vm.id = vm.$route.query.id
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
          var str2 = str.replace(/&nbsp;/g, '');
          return str2.replace(/<.*?>/g, '');
        }
      }

    }
  }
</script>