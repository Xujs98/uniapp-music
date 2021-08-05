<template>
	<view v-show="is_loading" @click="switch_loading" class="modal">
		<view class="tips">
			<view class="loading">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</view>
			<view class="title"> 
				{{ message }}
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
			switch_loading() {
				this.$store.commit('switch_loading')
			}
		},
		computed: {
			is_loading() {
				return this.$store.state.loading
			},
			message() {
				return this.$store.state.loading_msg
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, 0.4);
	  z-index: 999;
	}
	.modal .tips {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 400rpx;
	  height: 300rpx;
	  margin-top: -200rpx;
	  background-color: #fff;
	  border-radius: 5px;
	}
	.loading {
	  width: 150px;
	  height: 25px;
	
	}
	.loading span {
	  display: inline-block;
	  width: 25px;
	  height: 100%;
	  margin-right: 5px;
	  border-radius: 50%;
	  background: lightgreen;
	  animation: load 1.04s ease infinite;
	}
	.loading span:last-child {
	  margin-right: 0px;
	}
	.title {
	  width: 150px;
	  height: 40px;
	  margin-top: 10px;
	  text-align: center;
	  line-height: 40px;
	  color: #333;
	}
	
	@keyframes load {
	  0% {
	    opacity: 1;
	  }
	  100% {
	    opacity: 0;
	  }
	}
	.loading span:nth-child(1) {
	  animation-delay: 0.13s;
	}
	.loading span:nth-child(2) {
	  animation-delay: 0.26s;
	}
	.loading span:nth-child(3) {
	  animation-delay: 0.39s;
	}
	.loading span:nth-child(4) {
	  animation-delay: 0.52s;
	}
	.loading span:nth-child(5) {
	  animation-delay: 0.65s;
	}
</style>
