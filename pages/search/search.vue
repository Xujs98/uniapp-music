<template>
	<view class="search_body">
		<view class="header">
			<view class="inp">
				<input type="text" value="" placeholder="歌曲/歌单/歌手" v-model="searchInfo" focus/>
			</view>
			<text @click="searchClick">搜索</text>
		</view>
		<view class="body">
			<view class="item" v-show="musicData.length != 0">
				<h2>单曲</h2>
				<view class="song">
					<view class="songinfo" v-for="(itme, index) in musicData.data" :key="index" @click="songClick(itme)">
						<text class="name">{{ itme.name }}</text>
						<text class="artist">{{ itme.artist }}</text>
					</view>
				</view>
			</view>
		</view>
		<loading></loading>
		<my-audio :src="audioSrc" :controls="!fullScreen"></my-audio>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				searchInfo: '',
				musicData: [],
				audioSrc: '',
				audioImg: '',
				audioName: '',
				author: '',
				poster: '',
			};
		},
		onShow() {
			// let pagearr = getCurrentPages()
			// let currentPage = pagearr[pagearr.length - 1]
			// console.log(currentPage.options)
			// this.musicName = currentPage.options.name
		},
		methods: {
			// 搜索被点击
			async searchClick() {
				const { data: res } = await this.$http.get('http://192.168.0.105:3000/api/private/g1/music/search', {
					name: this.searchInfo,
					page: 1
				})
				this.musicData = res.data
			},
			// 歌曲被点击
			async songClick(item) {
				const {data: res} = await this.$http.get('http://192.168.0.105:3000/api/private/g1/music/song', {
					id: item.id,
					artist: item.name,
					album: item.ablum
				})
				if (res.status !== 200) {
					uni.showToast({
						title: res.message,
						duration: 2000,
						icon: 'error'
					})
					return 
				}
				this.selectPlaySong(res.data)
				// 跳转
				this.$Goto.play(res.data, true)
			},
			...mapActions(['selectPlaySong'])
		},
		computed: {
			currentSong() {
				return this.$store.getters.currentSong
			},
			fullScreen() {
				return this.$store.state.fullScreen
			},
		},
		watch: {
			currentSong: {
				handler(newSong) {
					if (!newSong.id || !newSong.url) return 
					this.audioSrc = newSong.url
				},
				immediate: true,
				deep: true
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search_body {
		height: auto;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.header {
			position: relative;
			width: 100%;
			height: 120rpx;
			background-color: #fff;
			.inp {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 50%;
				bottom: 10rpx;
				width: 500rpx;
				height: 50rpx;
				background-color: #f5f5f5;
				border-radius: 50px;
				transform: translateX(-50%);
				
				input {
					width: 90%;
					height: 80%;
					padding-left: 40rpx;
					background: url("/static/images/search.png") no-repeat;
					background-size: 32rpx 32rpx;
					background-position: left center;
					box-sizing: border-box;
				}
			}
			text {
				position: absolute;
				top: 50%;
				right: 20rpx;
				transform: translateX(-50%);
				margin-top: 5rpx;
			}
		}
		.body {
			flex: 1;
			.item {
				display: flex;
				flex-direction: column;
				width: 92%;
				margin: 10px auto;
				background-color: #fff;
				border-radius: 5px;
				
				h2 {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					padding-left: 20rpx;
					font-weight: bold;
					border-bottom: 1px solid #f5f5f5;
					box-sizing: border-box;
				}
				
				.song {
					flex: 1;
					.songinfo {
						display: flex;
						flex-direction: column;
						padding-left: 20rpx;
						box-sizing: border-box;
						border-bottom: 1px solid #F5F5F5;
						text {
							line-height: 150%;
						}
						.name {
							color: #0099ff
						}
						.artist {
							color: #ccc;
						}
					}
				}
				
			}
		}
	}
</style>
