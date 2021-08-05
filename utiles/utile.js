/**
 * @description 洗牌算法
 * @author xujs
 */


/** */
function shuffle(source) {
    const arr = source.slice()
    for (let i = 0; i < arr.length; i++) {
        const j = _getRandomInt(i)
        _swap(arr, i, j)
    }
    return arr
}

// 随机一个整数值 0 -> max
function _getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}

// 交换
function _swap(arr, i, j) {
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
}


export {
    shuffle
}