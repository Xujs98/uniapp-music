import store from '../store/index.js'

const audio = uni.getBackgroundAudioManager()



// 背景音频播放事件
audio.onPlay(() => {
	store.commit('setPlayingState', true)
	store.commit('setDuration', audio.duration)
	audio.Interval = setInterval(() => {
		store.commit('setCurrentTime', audio.currentTime)
	}, 800)
})

// 背景音频暂停事件
audio.onPause(() => {
	clearInterval(audio.Interval)
	store.commit('setPlayingState', false)
})
// 背景音频停止事件
audio.onStop(() => {
	clearInterval(audio.Interval)
	store.commit('setPlayingState', false)
})
// 背景音频播放进度更新事件
audio.onTimeUpdate(() => {

})

// 自然播放完毕
audio.onEnded(() => {
	const list = store.state.playList
	if (list.length === 1) {
		loop()
	} else {
		let index = store.state.currentIndex + 1
		if (index === list.length) {
			index = 0
		}
		store.commit('setCurrentIndex', index)
		
	}
	
})

// 循环播放
function loop() {
	audio.seek(0)
	audio.play()
}

// 播放错误
audio.onError((error) => {
	console.log(error)
})

export default audio