/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (tree) {
	const hashMap = new Map()
	let left = 0,
		maxLen = 0
	for (let right = 0; right < tree.length; right++) {
		const rightFruit = tree[right]
		hashMap.set(rightFruit, hashMap.get(rightFruit) + 1 || 0)
		while (hashMap.size > 2) {
			const leftFruit = tree[left]
			if (hashMap.get(leftFruit) === 0) {
				hashMap.delete(leftFruit)
			} else {
				hashMap.set(leftFruit, hashMap.get(leftFruit) - 1)
			}
			left++
		}
		maxLen = Math.max(maxLen, right - left + 1)
	}
	return maxLen
}

// time: O(n)
// space: O(1) as there is a maximum of three types of fruits stored
