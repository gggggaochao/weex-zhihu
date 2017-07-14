<template>
  <scroller style='align-items:center'>
    <div style='margin-top:20px'>
      <text style="color:red;font-size:50px">only support font for ttf and woff</text>
    </div>
    <div>
      <text style='font-family:iconfont4;font-size:100; margin-top:50px'>&#xe631;&#xe630;&#xe627;&#xe63e;&#xe649;&#xe641;&#xe643;</text>
    </div> 
  </scroller> 
</template>
<style scoped>
  .title4 {
    color: red;
    font-size: 36;
    font-family: iconfont4;
  }
</style>

<script>
  module.exports = {
    mounted: function() {

      var domModule = weex.requireModule('dom');
     
      domModule.addRule('fontFace', {
        'fontFamily': "iconfont4",
        'src': "url('http://at.alicdn.com/t/font_zn5b3jswpofuhaor.ttf')"
      });
    }
  }
</script>