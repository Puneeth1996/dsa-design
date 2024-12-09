/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
var canBeEqual = function (target, arr) {
	target.sort()
	arr.sort()
	return target.every((x, i) => x === arr[i])
}
