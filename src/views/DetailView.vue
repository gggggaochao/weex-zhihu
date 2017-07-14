<template>
  <div>
    <img class="ladybird" v-on:click="jumpTo()" src="https://www.buzhizhe.cn/static/images/ladybird_graphic_logo.png" />
    <text class="mytext">This is detail page</text>
    <text class="mytext">{{ msg }}</text>
    <!-- <input class="myinput" v-model="msg" placeholder="edit me" /> -->
    <div class="input_control">
      <input class="myinput" v-model="msg" placeholder="edit me" />
    </div>
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
  .input_control{
    width:350px;
    margin-left: 200px;
    margin-top: 20px;
  }
  .myinput {
    border-width: 1px;
    border-style: solid;
    border-color: black;
    text-align: center;
  }
</style>

<script>
  export default {
    data () {
      return {
        msg: "我是被绑定的数据"
      }
    },
    methods: {
      changeMsg () {
        // this.msg = "Ladybird"
      },
      jumpTo () {
        this.jump("/home")
      }
    }
  }
</script>

