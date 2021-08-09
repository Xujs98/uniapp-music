<template>
	<view class="search_body">
		<view class="header">
			<view class="inp">
				<input type="text" confirm-type="搜索"  placeholder="歌曲/歌单/歌手" v-model="searchInfo" focus @confirm="searchClick"/>
				<!-- 清空 -->
				<view class="empty" v-show="searchInfo.length !== 0" @click="searchInfo = ''">
					<view class="iconfont icon-cha"></view>
				</view>
			</view>
			<text @click="retreat">取消</text>
		</view>
		<view class="body">
			<scroll-view scroll-y >
				<view class="item" v-show="musicData.length != 0">
					<h2>单曲</h2>
					<view class="song">

						<view class="songinfo" v-for="(itme, index) in musicData.data" :key="index" >
							<!-- 添加歌曲 -->
							<view class="song_add" @click="songAdd(itme)">
								<view class="iconfont icon-jia"></view>
							</view>
							<!-- 歌曲名称 -->
							<view class="song_title" @click="songClick(itme)">
								<text class="name">{{ itme.name }}</text>
								<text class="artist">{{ itme.artist }}</text>
							</view>
							<!-- 操作 -->
							<view class="song_msg">
								<view class="iconfont icon-dian"></view>
							</view>
						</view>
					</view>
					<text class="refresh">下拉加载更多...</text>
				</view>
			</scroll-view>
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
					page: 1,
					limit: 20
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
				this.$Goto.play(res.data)
			},
			// 后退
			retreat() {
				uni.navigateBack()
			},
			// 添加歌曲
			async songAdd(item) {
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
				this.AddPlayList(res.data)
				uni.showToast({
					title: '添加成功',
					duration: 2000
				})
				console.log(this.$store.state.playList)
			},
			...mapActions(['selectPlaySong', 'AddPlayList'])
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
				left: 10rpx;
				bottom: 10rpx;
				width: 80%;
				height: 50rpx;
				background-color: #f8f8f8;
				border-radius: 50px;
				box-shadow: inset 1px 1px 2px 0px #ccc;
				
				input {

					width: 90%;
					height: 80%;
					padding-left: 40rpx;
					background: url("/static/images/search.png") no-repeat;
					background-size: 24rpx 24rpx;
					background-position: left center;
					box-sizing: border-box;
				}
				.empty {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					right: 10rpx;
					width: 50rpx;
					height: 50rpx;
					.iconfont {
						font-size: 16px;
					}
				}
			}
			text {
				position: absolute;
				bottom: 25rpx;
				right: 50rpx;
			}
		}
		.body {
			flex: 1;
			height: calc(100vh - 220rpx);
			scroll-view {
				width: 100%;
				height: 100%;
				.item {
					display: flex;
					flex-direction: column;
					width: 92%;
					margin: 10px auto;
					background-color: #fff;
					border-radius: 5px;
					
					// 下拉刷新
					.refresh {
						padding: 10px;
						text-align: center;
						color: #ccc;
					}
					
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
							box-sizing: border-box;
							border-bottom: 1px solid #F5F5F5;
							.song_add {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 60rpx;
								height: 60rpx;
								.iconfont {
									font-size: 18px;
									
								}
							}
							.song_title {
								flex: 1;
								display: flex;
								flex-direction: column;
								.name {
									color: #0099ff
								}
								.artist {
									color: #ccc;
									font-size: 12px;
								}
							}
							.song_msg {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 60rpx;
								height: 60rpx;
								transform: rotate(90deg)
							}
							text {
								line-height: 150%;
							}

						}
					}
					
				}
			}
		}
	}
</style>
