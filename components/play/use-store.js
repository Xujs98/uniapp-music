// save / remove

// 插入
function _inerArray(arr, val, compare, maxLen) {
	const index = arr.findIndex(compare)
	if (index > -1) return 
	arr.unshift(val)
	// 限制存储数量
	if (maxLen && maxLen < arr.length) {
		arr.pop()
	}
}

// 删除
function _deleteFromArr(arr, compare) {
	const index = arr.findIndex(compare)
	if (index  > -1) {
		arr.splice(index, 1)
	}
}

// 保存
function save(item, key, compare, maxLen) {
	const itmes = uni.getStorageSync(key) || []
	_inerArray(itmes, item, compare, maxLen)
	uni.setStorage({
		key,
		data: itmes
	})
	return itmes
}

// 移除
function remove(key, compare) {
	const items = uni.getStorageSync(key) || []
	_deleteFromArr(items, compare)
	uni.setStorage({
		key,
		data: items
	})
	return items
}

export {
	save,
	remove
}