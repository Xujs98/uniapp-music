import store from '../../../store/index.js'
export default {
	show() {
		store.commit('switch_loading', true)
	},
	hidden() {
		store.commit('switch_loading', false)
		// store.commit('switch_loading', false)
	},
	message(val = 'Loading') {
		store.commit('switch_loading', true)
		store.commit('msg_loading', val)
	}
}
