/**
 * @description getters 计算数据
 * @author xujs
 */


/**
 * 计算当前播放歌曲
 * @param {state} state state
 * @returns 
 */
const currentSong = (state) => {
    return state.playList[state.currentIndex] || []
}


export {
    currentSong
}