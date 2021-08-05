import loading from '../components/loading/js/loading.js'
const request = {
	get(url, data) {
		return new Promise((resolve, reject) => {
			loading.show()
			uni.request({
				url,
				data,
				method: 'GET',
				success(res) {
					resolve(res)
				},
				fail(error) {
					reject(error)
				},
				complete() {
					loading.hidden()
				}
			})
		})
	},
	post(url, data) {
		

		
		return new Promise((resolve, reject) => {
			loading.show()
			uni.request({
				url,
				data,
				method: 'GET',
				success(res) {
					resolve(res)
				},
				fail(error) {
					reject(error)
				},
				complete() {
					loading.hidden()
				}
			})
		})
	},
	req(page) {
		return new Promise((resolve, reject) => {
			uni.request({
				...page,
				success(res) {
					resolve(res)
				},
				fail(error) {
					reject(error)
				},
				complete() {
					loading.hidden()
				}
			})
		})
	}
}

export default request
