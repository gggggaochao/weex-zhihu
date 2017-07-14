<template>
  <div>
    <img class="ladybird" v-on:click="jumpTo()" src="https://www.buzhizhe.cn/static/images/ladybird_graphic_logo.png" />
    <text class="mytext">This is {{ msg }} page</text>
  </div>
</template>

<style scoped>
  .ladybird {
    width: 400px;
    height: 200px;
    margin-left: 175px;
  }
  .mytext {
    text-align: center;
  }
</style>

<script>
  export default {
    data () {
      return {
        msg: "home"
      }
    },
    methods: {
      changeMsg () {
        // this.msg = "Ladybird"
      },
      jumpTo () {
        this.jump("/detail")
      }
    }
  }
</script>
