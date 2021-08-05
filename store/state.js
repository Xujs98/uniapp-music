/**
 * @description state 数据
 * @author xujs
 */

import { PLAY_MODE } from '../conf/constant'

const state = {
    // loading 参数
    loading: false,
	loading_msg: 'Loading',

    // 顺序播放列表
    sequenceList: [],
    // 播放列表
    playList: [],
    // 播放状态
    playing: false,
    // 播放模式 默认：顺序播放
    playMode: PLAY_MODE.sequence,
    // 当前播放歌曲索引
    currentIndex: 0,
    // 播放器状态
    fullScreen: true,
	// 播放进度
	currentTime: 0,
	// 音效长度
	duration: 0,

}
export default state