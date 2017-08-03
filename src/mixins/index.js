export default {
  data: function(){
		return {
			serverApi: 'http://vvzpbtoi6xwnwgbjgkfasl9xqmhc1zau.oneitfarm.com/JFServer/webroot/main.php'
		}
	},
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    }
  }
}
