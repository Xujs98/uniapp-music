import Vue from 'vue'
import App from './App' 
import store from './store/index.js'
// import Loading from './components/loading/loading.vue'
import MeLoading from './components/loading/loading.vue'
import loading from './components/loading/js/loading.js'
import request from 'service/request.js'
import goTo from './utiles/goTo.js'
import MyAudio from './components/play/myAudio.vue'
import audio from './audio/myaudio.js'

// 全局过滤器
Vue.filter('time', (val) => {
	if(val === 5832) return '00:00'
	const sixty = 60
	let hour = _frames(parseInt(val / sixty / sixty))
	let minute = _frames(parseInt(val / sixty))
	let second = _frames(parseInt(val % sixty))
	return hour >= 1? hour + ':' + (minute) + ':' + (second ) : (minute ) + ':' + (second)
})
function _frames(val) {
	if (val > 59) {
		return 0
	}  else if (val < 10) {
		return '0' + val
	} else {
		return val
	}
}


// 导入全局样式
// import './static/scss/index.scss'
Vue.config.productionTip = false
// 挂载
Vue.prototype.$store = store
Vue.prototype.$Goto = goTo
Vue.prototype.$audio = audio

Vue.prototype.$loading = loading
Vue.prototype.$http = request
// 全局组件
Vue.component('loading', MeLoading)
Vue.component('myAudio', MyAudio)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
