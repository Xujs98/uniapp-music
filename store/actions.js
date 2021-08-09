/**
 * @description 异步
 * @author xujs
 */
import { PLAY_MODE } from '../conf/constant'
import { shuffle } from '../utiles/utile'

// 选择播放列表
function selectPlay({ commit }, { list, index }) {
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', list)
    commit('setCurrentIndex', index)
}

// 添加播放序列
function AddPlayList({ commit },song) {
	commit('setPlayMode', PLAY_MODE.sequence)
	commit('setPlayingState', true)
	commit('addPlayList', song)
}

// 播放当前歌曲
function selectPlaySong( { commit }, song) {
	commit('setPlayMode', PLAY_MODE.sequence)
	commit('setPlayingState', true)
	commit('setFullScreen', true)
	commit('selectCurrentPlaySong', song)
	commit('setCurrentIndex', 0)
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

// 播放模式切换
function changeMode({ commit, state, getters }, mode) {
	const currentId = getters.currentSong.id
	if (mode === PLAY_MODE.random) {
		commit('setPlayList', shuffle(state.playList))
	} else  {
		commit('setPlayList', state.playList)
	}
	const index = state.playList.findIndex(song => song.id === currentId)
	commit('setCurrentIndex', index)
	commit('setPlayMode', mode)
}

export {
    selectPlay,
	randomPlay,
	selectPlaySong,
	AddPlayList,
	changeMode
} 