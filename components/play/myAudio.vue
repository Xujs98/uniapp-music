<template>
	<view  v-show="controls" class="myaudio" >
		<view class="info">
			<!-- 图像 -->
			<view class="pic">
				<image :src="currentSong.pic" mode="" :class="{imgRotate: playing}"></image>
			</view>
			<!-- 标题 -->
			<view class="title" @tap="startFullScreen">
				<text>{{currentSong.name}}-{{currentSong.artist}}</text>
			</view>
			<!-- 控制 -->
			<view class="control">
				<view class="iconfont size" :class="[ playing? 'icon-bofangzhong imgRotate' : 'icon-zanting']" @click="playClick"></view>
				<view class="iconfont icon-bofangduilie size"></view>
			</view>
		</view>
		<!-- 进度条&歌曲name -->
		<view class="progress-song">
			<progressBar :current="currentTime" :duration="duration"  :isTouchmove="false" :radius="5" :height="5"></progressBar>
		</view>
	</view>
</template>

<script>
	import progressBar from './progressBar'
	export default {
		data() {
			return {

			};
		},
		mounted() {
			// if (!this.$store.state.playing) return 
			// this.$audio.src = this.src
		},
		props: {
			controls: {
				type: Boolean,
				default: false
			},
			src: {
				type: String
			}
		},
		methods: {
			playClick() {
				if (this.$store.state.playing) {
					this.$audio.pause()
				}else {
					this.$audio.play()
				}
			},
			startFullScreen() {
				this.$store.commit('setFullScreen', true)
				this.$Goto.play()
			}
		},
		components: {
			progressBar
		},
		computed: {
			currentSong() {
				return this.$store.getters.currentSong
			},
			duration() {
				return parseInt(this.$store.state.duration)
			},
			currentTime() {
				console.log(parseInt(this.$store.state.currentTime))
				return parseInt(this.$store.state.currentTime)
			},
			playing() {
				return this.$store.state.playing
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myaudio {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100rpx;
		background-color: #f3f4f8;
		box-shadow: 1px -2px 8px 0px #ccc;
		.info {
			flex: 1;
			display: flex;
			align-items: center;
			padding: 0 30rpx 0 30rpx;
			box-sizing: border-box;
			.pic {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 70rpx;
				height: 70rpx;
				background-color: #fff;
				border-radius: 50%;
				image {
					width: 90%;
					height: 90%;
					border-radius: 50%;
				}
			}
			
			.title {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 70rpx;
				font-size: 12px;
			}
			
			.control {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 140rpx;
				height: 70rpx;
				.size {
					font-size: 25px;
				}
			}
		}
		.progress-song {
			width: 100%;
			height: 20rpx;
		}
		.imgRotate {
			animation: rotate 20s linear infinite;
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
</style>
