/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
	const pos = new Map()
	for (let i = 0; i < arr2.length; ++i) {
		pos.set(arr2[i], i)
	}
	const arr = []
	for (const x of arr1) {
		const j = pos.get(x) ?? arr2.length
		arr.push([j, x])
	}
	arr.sort((a, b) => a[0] - b[0] || a[1] - b[1])
	return arr.map((a) => a[1])
}
