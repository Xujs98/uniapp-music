<template>
	<view class="control">
		<!-- 上一首 -->
		<view class="btn" @click="btn_start" :class="{ active: start_active}" >
			<view class="iconfont icon-shangyishou" ></view>
		</view>
		<!-- 播放/暂停 -->
		<view class="btn_play" :class="{ active: play_active}" @click="btn_play">
			<view class="iconfont icon-play--filled--alt" :class="[isPlay? 'icon-pause--filled':'icon-play--filled--alt'  ]"></view>
		</view>
		<!-- 下一首 -->
		<view class="btn" :class="{ active: next_active}" @click="btn_next">
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
			btn_start() {
				this.start_active = true
				setTimeout(() => {
					this.start_active = false
				}, 300)
			},
			btn_play() {
				if (this.$store.state.playing) {
					this.$audio.pause()
				} else {
					this.$audio.play()
				}
				this.play_active = true
				setTimeout(() => {
					this.play_active = false
				}, 300)
			},
			btn_next() {
				
				this.next_active = true
				setTimeout(() => {
					this.next_active = false
				}, 300)
			}
		},
		computed: {
			isPlay() {
				return this.$store.state.playing
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
