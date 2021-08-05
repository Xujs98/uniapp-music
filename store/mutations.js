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
    }
}


export default mutations