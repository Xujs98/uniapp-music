/**
 * @description 定义常量
 * @author xujs
 */

const PLAY_MODE = {
    // 顺序播放
    sequence: 0,
	// 循环播放
	loop: 1,
    // 随机播放
    random: 2,

}

const PLAY_URL_TYPE = {
	// MP3
	mp3: 'url',
	// flac
	flac: 'url_flac'
}

export {
    PLAY_MODE,
	PLAY_URL_TYPE
}