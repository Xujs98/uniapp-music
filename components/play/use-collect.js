// 收藏
import store from '../../store/index.js'
export default function useCollect() {
	const collectList = store.state.collectList
	
	function getCollectIocn(song) {
		return _isCollect(song)? 'red': ''
	}
	
	function toggleCollect() {
		
	}
	
	function _isCollect(song) {
		return collectList.findIndex(itme => item.id === song.id) > -1
	}
	
	return {
		getCollectIocn
	}
}