/**
 * @description 得到dom元素
 * @author xujs
 **/
 
 // 等到全部元素
 function selectAll(el) {
	 return new Promise((resolve, reject) => {
		const theNodes = uni.createSelectorQuery().selectAll(el)
		theNodes.boundingClientRect(data => {
			resolve(data)
		}).exec(ex => reject(ex))
	 })
 }
 
 // 得到元素
 function select(el) {
	 return new Promise((resolve, reject) => {
	 		const theNodes = uni.createSelectorQuery().select(el)
	 		theNodes.boundingClientRect(data => {
	 			resolve(data)
	 		}).exec(ex => reject(ex))
	 })
 }
 
 export {
	 selectAll,
	 select
 }