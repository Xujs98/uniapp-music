<template>
	<view class="play">
		<view class="header">
			<!-- 返回 -->
			<view class="btn">
				<view class="img" @click="retreat">
					<view class="iconfont icon-xiangxia"></view>
				</view>
				
			</view>
			<!-- 标题 -->
			<view class="title">
				<text class="name">
					{{ currentSong.name }}
				</text>
				<text class="artist">
					{{ currentSong.artist }}
				</text>
			</view>
			<!-- 报错 -->
			<view class="btn">
				<view class="img">
					<view class="iconfont icon-shizijiahao3"></view>
				</view>
				
			</view>
		</view>
		
		<!-- body区 -->
		<view class="lyric">
			<!-- 旋转图片 -->
			<view class="play_tx">
				<image :src="currentSong.pic" mode=""  :class="{ imgRotate: playing}"></image>
			</view>
			<!-- 歌词区 -->
			<view class="song_lyric">
				<!-- 歌词 -->
				<view class="content">
					这里显示歌词
				</view>
				<!-- 按钮 -->
				<view class="btns">
					<!-- 分享 -->
					<view class="lyric_btn">
						<view class="iconfont icon-share-fill"></view>
					</view>
					<!-- 收藏 -->
					<view class="lyric_btn">
						<view class="iconfont icon-shoucang"></view>
					</view>
					<!-- 功能 -->
					<view class="lyric_btn">
						<view class="iconfont icon-dian"></view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 进度条 -->
		<view class="progressbar">
			<progressBar :current="currentTime" :duration="duration" @currentChange="currentChange" isInfo isTouchTime ></progressBar>
		</view>
		
		<!-- 控制台 -->
		<view class="control">
			<control></control>
		</view>
		
		<!-- 播放模式 -->
		<view class="playmode">
			<view class="info">
				<!-- 模式 -->
				<view class="mode iconfont icon-suijibofang iconfontSize" :class="[modeIcon]" @click="changePlayMode">
					
				</view>
				<!-- 评论 -->
				<view class="comment">
					{{ 0}} 评论
				</view>
				<!-- 播放列表 -->
				<view class="playlist iconfont icon-bofangliebiao iconfontSize">
					
				</view>
			</view>
		</view>
		<!-- <my-audio :src="audioSrc"></my-audio> -->
	</view>
</template>

<script>
	import progressBar from './progressBar'
	import control from './control'
	import { PLAY_MODE } from '../../conf/constant.js'
	import { mapActions } from 'vuex'
	export default {
		
		data() {
			return {
				audioSrc: ''
			}
		},
		onLoad(option) {
			if(!this.$store.state.playing) return 
			this.$audio.src = this.currentSong.url
		},
		onBackPress() {
			this.$store.commit('setFullScreen', false)
		},
		// 方法
		methods: {
			currentChange(time) {
				this.$audio.seek(time)
				this.$audio.play()
			},
			// 后退
			retreat() {
				uni.navigateBack()
				this.$store.commit('setFullScreen', false)
			},
			// 切换播放模式
			changePlayMode() {
				let mode = (this.playMode + 1) % 3
				this.changeMode(mode)
			},
			
			...mapActions(['changeMode'])
		},
		// 注册组件
		components: {
			progressBar,
			control
		},
		// 计算属性
		computed: {
			// 播放器全屏状态
			fullScreen() {
				return this.$store.fullScreen
			},
			// 播放状态
			playing() {
				return this.$store.state.playing
			},
			// 歌曲信息
			currentSong() {
				return this.$store.getters.currentSong
			},
			// 歌曲时长
			duration() {
				return parseInt(this.$store.state.duration)
			},
			// 歌曲当前进度
			currentTime() {
				return parseInt(this.$store.state.currentTime)
			},
			// 播放模式
			playMode() {
				return this.$store.state.playMode
			},
			// 播放模式icon
			modeIcon() {
				const playMode = this.playMode
				return playMode === PLAY_MODE.sequence? 'icon-shunxubofang' : playMode === PLAY_MODE.random? 'icon-suijibofang' : 'icon-danquxunhuan'
				
			}
		},
		// 监听
		watch: {
			currentSong: {
				handler(newSong) {
					if (!newSong.id || !newSong.url) return
					this.$audio.src = newSong.url
				},
				immediate: true,
				deep: true
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.play {
		display: flex;
		flex-direction: column;
		width: 92%;
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		// 头部
		.header {
			display: flex;
			align-items: flex-end;
			width: 100%;
			height: 130rpx;
			// background-color: #55ffff;
			color: $fontColor-8;
			
			// 按钮
			.btn {
				display: flex;
				justify-content: center;
				align-items: flex-end;
				width: 100rpx;
				height: 100rpx;
				.img {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 64rpx;
					height: 64rpx;
					background-color: $f9;
					border-radius: 10px;
					/* border: 1px solid #fff; */
					box-shadow: $btn_shadom;
					image {
						width: 38rpx;
						height: 38rpx;
					}
				}
			}
			
			// 标题
			.title {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
				box-sizing: border-box;
				.name {
					font-size: 16px;
					font-weight: bold;
					margin-bottom: 5px;
					color: #000;
				}
				.artist {
					color: $fontColor-8;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					
				}
				
			}
			
		}
		
		// 歌词区
		.lyric {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-top: 5px;
			
			.play_tx {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				// background-color: #000;
				image {
					width: 300rpx;
					height: 300rpx;
					border-radius: 50%;
					animation: ripple  1.2s linear infinite;
				}
				.imgRotate {
					animation: rotate 20s linear infinite, ripple 1.2s linear infinite;
				}
			}
			
			.song_lyric {
				flex: 1;
				display: flex;
				
				//歌词内容
				.content {
					flex: 1;

				}
				// 按钮
				.btns {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					width: 150rpx;
					height: 100%;
					color: $fontColor-8;
					.lyric_btn {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 80rpx;
						height: 80rpx;
						background-color: $f9;
						border-radius: 10px;
						/* border: 1px solid #fff; */
						box-shadow: $btn_shadom;
						image {
							width: 38rpx;
							height: 38rpx;
						}
					}
					
				}
			}
			
			
			
			// 动画
			@keyframes ripple {
				0% {
					box-shadow: 0 0 0 0 rgba(143, 143, 143, 0.1), 0 0 0 20px rgba(143, 143, 143, 0.1), 0 0 0 40px rgba(143, 143, 143, 0.1), 0 0 0 60px rgba(143, 143, 143, 0.1); 
				}
				100% {
					box-shadow: 0 0 0 20px rgba(230,230,250,0.1), 0 0 0 40px rgba(230,230,250,0.1), 0 0 0 60px rgba(230,230,250,0.1), 0 0 0 70px rgba(230,230,250,0);
				}
			}
			@keyframes rotate {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		}
		
		// 进度条
		.progressbar {
			width: 100%;
			height: 100rpx;
			// .progressbar_main {
			// 	position: relative;
			// 	width: 100%;
			// 	height: 100%;
				
				
				
				
			// 	// 未选中
			// 	.progress_backgroundColor {
			// 		position: absolute;
			// 		left: 50%;
			// 		top: 50%;
			// 		width: 92%;
			// 		height: 10rpx;
			// 		background-color: #dfe2e9;
			// 		// border-top: 1px solid #e7e7e7;
			// 		// border-bottom: 1px solid #efefef;
			// 		border-radius: 100px;
			// 		box-sizing: border-box;
			// 		transform: translate(-50%, -50%);
			// 		box-shadow: inset 1px 1px 1px rgba(0, 0, 0, .1);

					
			// 		// 选中
			// 		.actionColor {
			// 			position: relative;
			// 			width: calc(500rpx + 10rpx);
			// 			height: 100%;
			// 			max-width: calc(100% + 10rpx);
			// 			background: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);
			// 			border-radius: 100px;
			// 			// 小圆点
			// 			.garden {
			// 				position: absolute;
			// 				right: 0;
			// 				top: 50%;
			// 				width: 10rpx;
			// 				height: 10rpx;
			// 				background-color: #736EFE;
			// 				border-radius: 100px;
			// 				border: 10rpx solid #fff;
			// 				transform: translateY(-50%);
			// 				// animation: isShadom 1s infinite forwards;
			// 				box-shadow: 0px 0px 15px 0px #736EFE;
							
			// 			}
			// 		}
					
			// 	}
				
			// 	// 时间信息
			// 	.time_info {
			// 		display: flex;
			// 		align-items: center;
			// 		justify-content: space-between;
			// 		position: absolute;
			// 		bottom: 0;
			// 		left: 50%;
			// 		width: 90%;
			// 		height: 30rpx;
			// 		transform: translateX(-50%);
			// 		font-size: 12px;
			// 		color: #888;
			// 	}
				
			// 	// 小圆点动画
			// 	@keyframes isShadom {
			// 		0% {
			// 			box-shadow: 0px 0px 3px 0px #fff;
			// 		}
			// 		100% {
			// 			box-shadow: 0px 0px 15px 0px #736EFE;
			// 		}
			// 	}
				
			// }
		}
		
		// 控制台
		.control {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 200rpx;
			
			.iconfont {
				font-size: 25px;
				color: #333333;
			}
			
			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 110rpx;
				height: 110rpx;
				background-color: $f9;
				border-radius: 100px;
				box-shadow: $btn_shadom;
			}
			
			.btn_play {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 140rpx;
				height: 140rpx;
				background-color: $f9;
				border-radius: 100px;
				box-shadow: $btn_shadom;
				
			}
		}
		
		// 播放模式
		.playmode {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 80rpx;
			
			.iconfontSize {
				font-size: 20px;
			}
			
			.info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 92%;
				height: 100%;
				color: $fontColor-8;
			}
		}
		
	}
</style>
