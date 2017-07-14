<template>
  <div>
    <scroller class="scroller" append="tree" offset-accuracy="10" @scroll="scrollHandler">
      <image class="image" src="https://gw.alicdn.com/tps/TB1dzanMVXXXXXQXVXXXXXXXXXX-573-412.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1p9CCMVXXXXa_XFXXXXXXXXXX-450-340.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1zpSiMVXXXXchXFXXXXXXXXXX-448-338.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1EuGIMVXXXXcoXpXXXXXXXXXX-452-337.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1dzanMVXXXXXQXVXXXXXXXXXX-573-412.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1p9CCMVXXXXa_XFXXXXXXXXXX-450-340.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1zpSiMVXXXXchXFXXXXXXXXXX-448-338.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1EuGIMVXXXXcoXpXXXXXXXXXX-452-337.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1dzanMVXXXXXQXVXXXXXXXXXX-573-412.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1p9CCMVXXXXa_XFXXXXXXXXXX-450-340.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1zpSiMVXXXXchXFXXXXXXXXXX-448-338.png"></image>
      <image class="image" src="https://gw.alicdn.com/tps/TB1EuGIMVXXXXcoXpXXXXXXXXXX-452-337.png"></image>
    </scroller> 
    <text class = "event-cnt">{{eventCnt}}</text>
    <text class = "hint">{{hint}}</text>
  </div>
</template>

<script>
  export default  {
    data () {
      return {
        eventCnt: 0,
        hint:"start",
      }
    },
    methods: {
      scrollHandler: function(e) {
        console.log("here")
        var nowCnt = this.eventCnt + 1;
        this.eventCnt = nowCnt;
        this.offsetX = e.contentOffset.x;
        this.offsetY = e.contentOffset.y;
        this.hint = "scroll event count:" + this.eventCnt + " offsetX:" + this.offsetX + " offsetY:" +this.offsetY;
      }
    }
  };
</script>

<style scoped>
  .body {
    background-color: #ffffff;
  }
  .image {
    width:600px;
    background-color:#FFFFDF;
    height:400px;
  }
  .scroller {
    width: 600px;
    height:800px;
  }

  .hint {
    position: absolute;
    width: 750px;
    height: 150px;
    top: 900px;
    left: 0px;
  }
  .event-cnt {
    position: absolute;
    width: 750px;
    height: 150px;
    top: 1050px;
    left: 0px;
  }
</style>

