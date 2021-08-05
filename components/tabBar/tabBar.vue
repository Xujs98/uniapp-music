<template>
	<view class="body_bar">
		<!-- home -->
		<view class="nav" @click="tabClick(tabData[0].id)">
			<image :src="tabData[0].url[tabData[0].isShow? 1: 0]" mode=""></image>
			<text :style="{color: tabData[0].isShow? '#2c2c2c' : '#8a8a8a'}">{{ tabData[0].name }}</text>
		</view>
		<!-- 播放器 -->
		<view class="nav_music_progress">
			<view class="third">
				<view class="second"></view>
				<view class="first"></view>
			</view>
		</view>
		<!-- 我的 -->
		<view class="nav" @click="tabClick(tabData[1].id)">
			<image :src="tabData[1].url[tabData[1].isShow? 1: 0]" mode=""></image>
			<text :style="{color: tabData[1].isShow? '#2c2c2c' : '#8a8a8a'}">{{ tabData[1].name }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabData: [{
						id: 0,
						name: '首页',
						path: 'index',
						url: ['/static/images/tabBar/index.png', '/static/images/tabBar/index_select.png'],
						isShow: true
					},
					{
						id: 1,
						name: '我的',
						path: 'index',
						url: ['/static/images/tabBar/me.png', '/static/images/tabBar/me_select.png'],
						isShow: false
					}
				]
			};
		},
		async mounted() {

		},
		methods: {
			tabClick(e) {
				this.tabData.forEach(item => {
					item.isShow = false
				})
				this.tabData[e].isShow = true
				this.$emit('barClick', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body_bar {
		display: flex;
		height: 150rpx;
		width: calc(100vw);
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		background-color: #fff;
		box-shadow: 1px -2px 8px 0px #ccc;
		color: #8a8a8a;

		.nav {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 5rpx;
			}
		}

		// 播放器
		.nav_music_progress {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			// 进度条
			.third {
				position: relative;
				width: 90rpx;
				height: 90rpx;
				background-image: url("/static/images/me.png");
				background-size: 100% 100%;
				border-radius: 100%;
				animation: autoRotate 10s linear infinite;
			}
		}
	}
	@keyframes autoRotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
