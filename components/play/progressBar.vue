<template>
	<view class="progressbar_main">
		<view class="progressbar_main">
			<!-- 未选中 -->
			<view 
				class="progress_backgroundColor" 
				id="progress" 
				@click="progressClick($event)"
				:style="{
					height: height + 'rpx', 
					backgroundColor: progressNotSelectBgColor,
				}"
			>
				<!-- 选中 -->
				<view class="actionColor" 
				:style="{
					width:  currentWidth + 'px' ,
					background: progressSelectBgColor
					
				}"
				
				>
					<!-- 小圆点 -->
					<view class="garden" 
						v-if="isRadius"
						@touchstart="progressStart" 
						@touchmove="progressMove" 
						@touchend="progressEnd"
						:style="{
							border: radius + 'rpx solid #fff', 
							width: radius + 'rpx', 
							height: radius + 'rpx',
							backgroundColor: radiusBgColor
						}"
					>
						<view class="time" v-show="isTouchTime && look ">{{ touchTime | time}}</view>
					</view>
					
				</view>
			</view>
			<view class="time_info" v-if="isInfo">
				<text class="start">{{ current | time }}</text>
				<text class="end">{{ duration | time }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		select
	} from '../../utiles/querySelect'
	export default {
		data() {
			return {
				gardenW: 0,
				progress: {},
				power: 0,
				paddingLelf: 0,
				startX: 0,
				pageX: 0,
				look: false,
				progressWidth: 0,
				currentTime: 0,
			};
		},
		async mounted() {
			this.currentTime = this.current
			this.gardenW = uni.upx2px(10)
			this.progress = await select('#progress')
			this.paddingLelf = this.progress.left
			this.power = this.progress.width / this.duration
			
		},
		props: {
			// 当前进度
			current: {
				type: Number,
				default: 0
			},
			// 音效时长
			duration: {
				type: Number,
				default: 1
			},
			// 是否显示时间
			isInfo: {
				type: Boolean,
				default: false
			},
			// 是否显示拖拽时间
			isTouchTime: {
				type: Boolean,
				default: false,
			},
			// 是否允许操作进度条
			isTouchmove: {
				type: Boolean,
				default: true
			},
			// 小圆点大小
			radius: {
				type: Number,
				default: 10
			},
			// 进度条高度
			height: {
				type: Number,
				default: 10
			},
			// 进度条未选中背景颜色
			progressNotSelectBgColor: {
				type: String,
				default: '#dfe2e9'
			},
			// 进度条选中颜色
			progressSelectBgColor: {
				type: String,
				default: 'linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%)'
			},
			// 小圆点背景颜色
			radiusBgColor: {
				type: String,
				default: '#736EFE'
			},
			isRadius: {
				type: Boolean,
				default: true
			} 
		},
		methods: {
			progressClick(e) {
				if (!this.isTouchmove) return 
				const current = parseInt((e.touches[0].pageX - this.paddingLelf) / (this.progress.width / this.duration))
				this.$emit('currentChange', current)
			},
			progressStart(e) {
				if (!this.isTouchmove) return 
				// this.startX = e.touches[0].pageX
				// console.log(e.touches[0].pageX)
				this.look = true
			},
			progressMove(e) {
				if (!this.look || !this.isTouchmove) return
				let pageX = e.touches[0].pageX - this.gardenW
				if(pageX < 0) {
					pageX = 0
				} else if (pageX > this.progress.width) {
					pageX = this.progress.width
				}
				this.pageX = pageX
			},
			progressEnd() {
				if (!this.isTouchmove) return 
				this.look = false
				let current = parseInt(this.pageX / (this.progress.width / this.duration))
				this.$emit('currentChange', current)
			}
		},
		computed: {
			currentWidth: {
				get() {
					if (this.look) {
						return this.pageX 
					}
					return this.current * (this.progress.width / this.duration) + 10 || 10
				}
				
			},
			touchTime() {
				return parseInt(this.pageX / (this.progress.width / this.duration))
			}
		}
	}
</script>

<style lang="scss">
	.progressbar_main {
		position: relative;
		width: 100%;
		height: 100%;

		// 未选中
		.progress_backgroundColor {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 92%;
			height: 10rpx;
			background-color: #dfe2e9;
			// border-top: 1px solid #e7e7e7;
			// border-bottom: 1px solid #efefef;
			border-radius: 100px;
			box-sizing: border-box;
			transform: translate(-50%, -50%);
			box-shadow: inset 1px 1px 1px rgba(0, 0, 0, .1);


			// 选中
			.actionColor {
				position: relative;
				width: calc(500rpx + 10rpx);
				height: 100%;
				max-width: calc(100% + 10rpx);
				background: linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%);
				border-radius: 100px;

				// 小圆点
				.garden {
					position: absolute;
					right: 0;
					top: 50%;
					width: 10rpx;
					height: 10rpx;
					background-color: #736EFE;
					border-radius: 100px;
					border: 10rpx solid #fff;
					transform: translateY(-50%);
					// animation: isShadom 1s infinite forwards;
					box-shadow: 0px 0px 15px 0px #736EFE;
					
					// 浮动时间
					.time {
						position: absolute;
						top: -100rpx;
						left: 50%;
						width: 100rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						background: rgba(111,222,333,.5);
						border-radius: 5px;
						transform: translateX(-50%);
						color: #f9f9f9;
					}
				}
				
				
			}

		}

		// 时间信息
		.time_info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 90%;
			height: 30rpx;
			transform: translateX(-50%);
			font-size: 12px;
			color: #888;
		}

		// 小圆点动画
		@keyframes isShadom {
			0% {
				box-shadow: 0px 0px 3px 0px #fff;
			}

			100% {
				box-shadow: 0px 0px 15px 0px #736EFE;
			}
		}

	}
</style>
