/**
 * @description mutations 突变/事件
 * @author xujs
 */



const mutations = {
    // loading 事件
    switch_loading(state, tf) {
		state.loading = tf
        // if (tf) {
        //     state.loading = tf
        // } else {
        //     state.loading = !state.loading
        // }
    },
    msg_loading(state, val) {
        state.loading_msg = val
    },

    
    // 修改播放状态
    setPlayingState(state, playing) {
        state.playing = playing
    },
    // 设置顺序播放列表
    setSequenceList(state, list) {
        state.sequenceList = list
    },
    // 设置播放列表
    setPlayList(state, list) {
        state.playList = list
    },
	// 添加至播放列表
	addPlayList(state, song) {
		state.playList.push(song)
	},
	// 播放当前歌曲
	selectCurrentPlaySong(state, song) {
		state.playList.unshift(song)
	},
	
    // 设置播放模式
    setPlayMode(state, mode) {
        state.playMode = mode
    },
    // 设置当前播放索引
    setCurrentIndex(state, index) {
        state.currentIndex = index
    },
    // 设置播放器状态
    setFullScreen(state, isFullScreen) {
        state.fullScreen = isFullScreen
    },
	// 设置当前播放进度
	setCurrentTime(state, time) {
		state.currentTime = time
	},
	// 设置音效长度
	setDuration(state, time) {
		state.duration = time
	},
	// 设置收藏列表
	setCollectList(state, list) {
		state.collectList = list
	}
}


export default mutations