/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
	const s = new Set(nums1)
	return [...new Set(nums2.filter((x) => s.has(x)))]
}

// Space complexity m + n its length of the nums1 and nums2
