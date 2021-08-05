<template>
	<view class="body_home">
		<view class="header">
			<view class="search" @click="searchClick" >
				<image src="/static/images/search.png" mode=""></image>
				<text>搜索:歌曲/歌手</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			searchClick() {
				uni.navigateTo({
					url: '/pages/search/search',
					animationType: 'slide-in-left',
					fail(err) {
						console.log(err)
					}
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.body_home {
		width: 100%;
		height: 100%;
		
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
				bottom: 10rpx;
				width: 350rpx;
				height: 50rpx;
				background-color: #f8f8f8;
				// border-top: 1px solid #e7e7e7;
				// border-bottom: 1px solid #efefef;
				border-radius: 100px;
				color: #8a8a8a;
				transform: translateX(-50%);
				box-shadow: inset 1px 1px 2px 0px #ccc;
				overflow: visible;
				
				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
