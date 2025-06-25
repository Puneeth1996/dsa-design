/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var kthSmallestProduct = function (nums1, nums2, k) {
	nums1.sort((a, b) => a - b)
	nums2.sort((a, b) => a - b)

	let left = -1e10,
		right = 1e10

	const countPairs = (x) => {
		let count = 0

		for (let a of nums1) {
			if (a === 0) {
				if (x >= 0) count += nums2.length
				// If x < 0 and a=0, product is 0 > x → skip
			} else if (a > 0) {
				// Count j such that a * nums2[j] <= x → nums2[j] <= x / a
				let l = 0,
					r = nums2.length
				while (l < r) {
					let m = Math.floor((l + r) / 2)
					if (a * nums2[m] <= x) l = m + 1
					else r = m
				}
				count += l
			} else {
				// a < 0
				// Count j such that a * nums2[j] <= x → nums2[j] >= x / a
				let l = 0,
					r = nums2.length
				while (l < r) {
					let m = Math.floor((l + r) / 2)
					if (a * nums2[m] <= x) r = m
					else l = m + 1
				}
				count += nums2.length - l
			}
		}
		return count
	}

	// Binary search over possible products
	while (left < right) {
		const mid = Math.floor((left + right) / 2)
		const count = countPairs(mid)
		if (count >= k) {
			right = mid
		} else {
			left = mid + 1
		}
	}
	return left
}
