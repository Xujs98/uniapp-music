
<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import url('/static/scss/reset.scss');
	@import url('/static/css/iconfont.css');
	

	/*每个页面公共css */
	uni-page-body,
	#app,
	page,
	body {
		height: 100%;
		font-size: 24rpx;
		background-color: #f3f4f8;
		overflow: hidden;
	}
</style>
