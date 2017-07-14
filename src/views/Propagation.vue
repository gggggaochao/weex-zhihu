<template>
	<div class="root" @click="rootClick" bubble="true">
		<div>
			<text style="font-size: 40px;">{{rootText}}</text>
		</div>
		<div class="outer" @click="parentClick">
			<div>
				<text style="font-size: 40px;">{{parentText}}</text>
			</div>
			<text class="inner" @click="click">{{innerText}}</text>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				innerText: 'click me',
				parentText: '',
				rootText: ''
			}
		},
		methods: {
			click: function(e) {
				this.innerText = 'inner bubble'
				console.log(this.innerText)
				e.stopPropagation()
			},
			parentClick: function(e) {
				this.parentText = 'parent bubble'
				console.log(this.parentText)
				// e.stopPropagation()
			},
			rootClick: function(e) {
				this.rootText = 'root bubble'
				console.log(this.rootText)
        // e.stopPropagation()
      }
    }
  }
</script>
<style scoped>
	.inner {
		font-size: 40px;
		text-align: center;
		background-color: #7a9b1b;
		padding: 40px;
	}
	.outer {
		font-size: 40px;
		text-align: center;
		background-color: #9b7a1b;
		padding: 120px;
	}
	.root {
		font-size: 40px;
		text-align: center;
		background-color: #7a1b9b;
		padding: 80px;
	}
</style>