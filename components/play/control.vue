<template>
	<view class="control">
		<!-- 上一首 -->
		<view class="btn" @click="prev" :class="{ active: start_active}" >
			<view class="iconfont icon-shangyishou" ></view>
		</view>
		<!-- 播放/暂停 -->
		<view class="btn_play" :class="{ active: play_active}" @click="btn_play">
			<view class="iconfont icon-play--filled--alt" :class="[isPlay? 'icon-pause--filled':'icon-play--filled--alt'  ]"></view>
		</view>
		<!-- 下一首 -->
		<view class="btn" :class="{ active: next_active}" @click="next">
			<view class="iconfont icon-xiayishou"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				start_active: false,
				play_active: false,
				next_active: false,
			};
		},
		methods: {
			// 上一首
			prev() {
				const list = this.playList
				if (!list.length) return 
				if (list.length === 1) {
					this.loop()
				} else {
					let index = this.currentIndex - 1
					if (index === -1) {
						index = list.length - 1
					}
					this.$store.commit('setCurrentIndex', index)
					this.$audio.play()
				}
				
				this.setTimeoutFun('start_active')
			},
			// 播放/暂停
			btn_play() {
				if (this.$store.state.playing) {
					this.$audio.pause()
				} else {
					this.$audio.play()
				}
				
				this.setTimeoutFun('play_active')
			},
			// 下一首
			next() {
				const list = this.playList
				if(!list.length) return 
				if (list.length === 1) {
					this.loop()
					return 
				} 
				let index = this.currentIndex + 1
				if (index === list.length) {
					index = 0
				}
				this.$store.commit('setCurrentIndex', index)
				this.$audio.play()
				this.setTimeoutFun('next_active')
			},
			// 定时
			setTimeoutFun(btn) {
				this[btn] = true
				setTimeout(() => {
					this[btn] = false
				}, 300)
			},
			// 循环
			loop() {
				// 设置当前播放进度	
				this.$audio.seek(0)
				this.$audio.play()
			}
		},
		computed: {
			isPlay() {
				return this.$store.state.playing
			},
			currentIndex() {
				return this.$store.state.currentIndex
			},
			playList() {
				return this.$store.state.playList
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	
	.active {
		transform: scale(1.1);
		transition: all .3s ease 0s;
	}
	
	// @keyframes click() {
	// 	0% {
	// 		transform: scale(1.5);
	// 	}
	// 	100% {
	// 		transform: scale(1);
	// 	}
		
	// }
}
</style>
