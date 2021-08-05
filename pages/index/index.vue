<template>
	<view class="content" ref="ba">
		<view class="page">
			<Home v-if="index === 0" />
			<Me v-if="index === 1" />
		</view>
		<view class="bar">
			<tab-bar @barClick="navClick" ></tab-bar>
		</view>
		
	</view>
</template>

<script>
	import TabBar from '../../components/tabBar/tabBar'
	import Home from '../../pages/home/home'
	import Me from '../../pages/me/me'
	import MeLoading from '../../components/loading/loading'
	export default {
		// name: "主页面1",
		components: {
			TabBar,
			Home,
			Me,
			MeLoading
		},
		data() {
			return {
				index: 0
			}
		},
		onLoad(e) {
			
		},
		async mounted() {
			// this.$loading.show()
		},
		methods: {
			navClick(index) {
				this.index = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.page {
			flex: 1;
			width: 100%;
		}
		
		// 顶部栏
		.header {
			position: relative;
			width: 100%;
			height: 120rpx;
			background-color: #fff;
			
			// 搜索
			.search {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: 50%;
				bottom: 5rpx;
				width: 500rpx;
				height: 60rpx;
				background-color: #f5f5f5;
				border-radius: 100px;
				color: #8a8a8a;
				transform: translateX(-50%);
				// box-sizing: border-box;
				
				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}
		}
		
		// 导航栏
		.bar {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 150rpx;
			// background-color: #fff;
			
			.tabBar {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100rpx;
				height: 100rpx;
				z-index: 9;
				
				image {
					width: 64rpx;
					height: 64rpx;
					margin-bottom: 3px;
				}
				
			}
			
		}
	}
</style>
