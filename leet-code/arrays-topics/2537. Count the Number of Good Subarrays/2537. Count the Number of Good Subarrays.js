/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countGood = function (nums, k) {
	let freq = new Map()
	let left = 0
	let pairCount = 0
	let goodSubarrays = 0

	for (let right = 0; right < nums.length; right++) {
		pairCount += freq.get(nums[right]) || 0
		freq.set(nums[right], (freq.get(nums[right]) || 0) + 1)

		while (pairCount >= k) {
			goodSubarrays += nums.length - right
			let leftNum = nums[left++]
			freq.set(leftNum, freq.get(leftNum) - 1)
			pairCount -= freq.get(leftNum)
		}
	}

	return goodSubarrays
}
// Time complexity: O(n)
// Space complexity: O(n)
