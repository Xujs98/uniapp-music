/**
 * @description 异步
 * @author xujs
 */
import { PLAY_MODE } from '../conf/constant'
import { shuffle } from '../utiles/utile'

// 选择播放
function selectPlay({ commit }, { list, index }) {
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', list)
    commit('setCurrentIndex', index)
}

// 随机播放
function randomPlay({ commit }, list) {
	commit('setPlayMode', PLAY_MODE.random)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', shuffle(list))
    commit('setCurrentIndex', 0)
}

export {
    selectPlay,
	randomPlay
} 