/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function (nums) {
	let maxOR = 0
	for (let num of nums) maxOR |= num
	const backTrack = (index, currentOR) => {
		if (index === nums.length) return currentOR === maxOR ? 1 : 0
		if (currentOR === maxOR) return 1 << (nums.length - index)
		return (
			backTrack(index + 1, currentOR) +
			backTrack(index + 1, currentOR + nums[index])
		)
	}
	return backTrack(0, 0)
}
// Time complexity O(N^2)
// Space comlexity O(n)
