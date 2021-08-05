<template>
	<view  v-show="controls" class="myaudio">
		总时间: {{ durationTime }} | 当前时间： {{ currentTime }}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				durationTime: 0,
				currentTime: 0
			};
		},
		mounted() {
			this.$audio.src = this.src
		},
		props: {
			controls: {
				type: Boolean,
				default: true
			},
			src: {
				type: String
			}
		}
	}
</script>

<style lang="scss" >
	.myaudio {
		background: #4CD964;
	}
</style>
