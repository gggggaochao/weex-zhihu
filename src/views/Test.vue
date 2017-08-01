<template>
  <div>
    <text style="background-color:#ccc;padding:10px;width:100px;font-size:28px" @click="postMessage()">点我动起</text>

    <transition enter-class="slide-fade-enter" mode="out-in" @enter="enter" @leave="leave">
      <div class="square" :style="{backgroundColor:show}" :key="show">
        <text class="text">{{show}}</text>
      </div>
    </transition>

  </div>
</template>

<style>
  .text {
    font-size: 50px;
  }
  .square{
    width:400px;height:400px;
    justify-content: center;
    align-items:center;
  }

  .slide-fade-enter{
  transform: translateX(40px);
  opacity: 0;
}

</style>

<script>
  const animation = weex.requireModule('animation')
  const stream = weex.requireModule('stream')

  function slider (action, el, callback = () => {}) {
    const x = action === 'out' ? '40px' : '0'
    animation.transition(el, {
      styles: {
        transform: 'translateX('+ x +')',
        opacity: action === 'out' ? 0 : 1
      },
      duration: 500,
      timingFunction: 'ease-' + action,
      delay: 0
    }, callback)
  }

  export default {
    data () {
      return {
        show:'red'
      }
    },
    methods:{
      postMessage () {
        // this.show = this.show === 'red'?'blue':'red'

        var totalData=  [{"data":[{"channelNum":0,"pressure":13,"pressureState":64},{"channelNum":1,"pressure":16776700,"pressureState":65}],"time":1501558058},{"data":[{"channelNum":0,"pressure":12,"pressureState":64},{"channelNum":1,"pressure":16776699,"pressureState":65}],"time":1501558558}]
        console.log(totalData)
        var postData = 'device_id=12&&data='+JSON.stringify(totalData)
        console.log(postData)
        stream.fetch({
          method: 'POST',
          type: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          url: 'https://app-test1.baichengyiliao.com/main.php/jf/measure/upload.json', //前面的部分
          // url: 'http://127.0.0.1/json.php',
          body: postData
        }, function(res){
          console.log(res)
          console.log(res.data)
          console.log(res.data == "success")
          console.log(res.data.data == "success")

        })
      },
      enter: function (el, done) {
        slider('in', el.__vue__, done)
      },
      leave: function (el, done) {
        slider('out', el.__vue__, done)
      },
    }
  }
</script>