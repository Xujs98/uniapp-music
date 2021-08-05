/**
 * @description 页面跳转
 * @author xujs
 */

const Goto = {
	play(data, animationDuration = 300) {
		let url = '/components/play/play'
		url += (url.indexOf('?') < 0? '?' : '&') + _param(data)
		uni.navigateTo({
			url,
			animationType: 'slide-in-bottom',
			animationDuration
		})
	},
	GoTo(url, data, animation = 'pop-in', animationDuration = 300) {
		url += (url.indexOf('?') < 0? '?' : '&') + _param(data)
		uni.navigateTo({
			url,
			animation,
			animationDuration
		})
	}
}

// 格式化传参
function _param(data) {
	let url = ''
	for ( let k in data) {
		let val = data[k] !== undefined ? data[k] : ''
		url += '&' + k + '=' + encodeURIComponent(val)
	}
	return url? url.substring(1) : ''
}

export default Goto