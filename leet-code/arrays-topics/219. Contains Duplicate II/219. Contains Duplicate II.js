/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
	const indexMap = new Map()
	for (let index = 0; index < nums.length; ++index) {
		if (
			indexMap.has(nums[index]) &&
			indexMap.get(nums[index]) &&
			index - indexMap.get(nums[index]) <= k
		) {
			return true
		}
		indexMap.set(nums[index], index)
	}
	return false
}
