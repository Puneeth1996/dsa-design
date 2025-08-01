/**
 * @param {number[]} arr
 * @return {number}
 */
var subarrayBitwiseORs = function (arr) {
	let res = new Set()
	let cur = new Set()

	for (let num of arr) {
		let next = new Set()
		next.add(num)
		for (let x of cur) {
			next.add(x | num)
		}
		cur = next
		for (let x of cur) res.add(x)
	}

	return res.size
}

// Time complexity: O(n⋅logM), where M is the maximum element in arr.
// Each number can create at most logM new OR values due to the number of bits.
// Space complexity: O(n⋅logM), to store all possible OR results.
