<template>
  <div>
    <text style="background-color:#ccc;padding:10px;width:100px;font-size:28px" @click="postMessage4()">点我动起</text>

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
  import httpBuildQuery from 'http-build-query'
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
        show:'red',
        document_id: 1,
        device_id: 12
      }
    },
    methods:{
      postMessage4() {
        let vm = this
        var sensors = [{"sensor_name":"s1","standard_value":12,"warning_value":234,"primary":1},{"sensor_name":"s2","standard_value":52,"warning_value":70,"primary":0},{"sensor_name":"s3","standard_value":53,"warning_value":70,"primary":0},{"sensor_name":"s4","standard_value":54,"warning_value":70,"primary":0}]
        var token = "02ada227b7254e1703d1d2e5d9a7df41"
        var postData = "document_id="+vm.document_id+"&&device_id="+vm.device_id+"&&sensor_config="+JSON.stringify(sensors)+"&&token="+token
        console.log(postData)
        stream.fetch({
          method: 'POST',
          type: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          // url: 'http://localhost/json.php',
          url: vm.serverApi +'/document/bind.json', //前面的部分
          body: postData
        },function (res){
          console.log(res)
        })
      },
      postMessage3 () {
        let vm = this
        var postData = "document_id="+vm.document_id
        stream.fetch({
          method: 'POST',
          type: 'json',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded' 
          },
          url: vm.serverApi +'/document/getSensorConfig.json', //前面的部分
          body: postData
        }, function(res){
          console.log("res: "+JSON.stringify(res))
          console.log("1")
          console.log("res.data"+res.data)
          console.log("res.data.ret: "+res.data.ret)
          console.log("2")
          // console.log("res: "+JSON.stringify(res))
          // // vm.sensors = []
          // console.log("res.data.ret: "+res.data.ret)
          // var data = JSON.parse(res.data.data)
          // for (var i=0 ; i<data.length;i++) {
          //   console.log(i)
          //   console.log("item: "+data[i].sensor_name)
            // vm.sensors.push({
            //   name: res.data.data[i].sensor_name,
            //   realTimeVal: 1,
            //   stdVal: standard_value,
            //   warningVal: warning_value,
            //   isPrimary: Boolean(primary),
            //   isCurrent: true,
            // })
          // }
          vm.sensors = res.data.data
        })
      },
      postMessage () {
        // this.show = this.show === 'red'?'blue':'red'

        var totalData=  [{"data":[{"channelNum":0,"pressure":13,"pressureState":64},{"channelNum":1,"pressure":16776700,"pressureState":65}],"time":1501558058},{"data":[{"channelNum":0,"pressure":12,"pressureState":64},{"channelNum":1,"pressure":16776699,"pressureState":65}],"time":1501558558}]
        console.log(totalData)
        // var postData = 'device_id=12&&data='+JSON.stringify(totalData)
        var postData = {
          device_id: 12,
          data: totalData
        }
        console.log("postData: "+JSON.stringify(postData))
        stream.fetch({
          method: 'POST',
          type: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          // url: 'https://app-test1.baichengyiliao.com/main.php/jf/measure/upload.json', //前面的部分
          url: 'http://localhost/json.php',
          body: httpBuildQuery(postData)
        }, function(res){

        })
      },
      postMessage2() {
        let vm = this
        var postData = "document_id="+1;
        console.log("postData: "+postData)
        stream.fetch({
          method: 'POST',
          type: 'json',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded' 
          },
          url: vm.serverApi +'/measure/count.json', //前面的部分
          body: postData
        }, function(res){
          console.log(res)
          console.log(1)
          var key = "2017-08-02"
          console.log(res.data.data.day[key])      
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