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



export default audio