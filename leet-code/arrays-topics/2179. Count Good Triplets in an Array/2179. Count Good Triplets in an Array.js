/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var goodTriplets = function (nums1, nums2) {
	const n = nums1.length
	const pos = new Array(n)

	// Get the position of each number in nums2
	nums2.forEach((val, idx) => (pos[val] = idx))

	// Map nums1 using position info from nums2
	const mapped = nums1.map((val) => pos[val])

	const BIT = new Array(n + 2).fill(0) // Yes, 1-indexed again 🙄

	const update = (bit, i, val) => {
		while (i < bit.length) {
			bit[i] += val
			i += i & -i
		}
	}

	const query = (bit, i) => {
		let res = 0
		while (i > 0) {
			res += bit[i]
			i -= i & -i
		}
		return res
	}

	const left = new Array(n).fill(0)
	for (let i = 0; i < n; i++) {
		left[i] = query(BIT, mapped[i])
		update(BIT, mapped[i] + 1, 1)
	}

	const right = new Array(n).fill(0)
	BIT.fill(0) // Reset before reverse pass

	for (let i = n - 1; i >= 0; i--) {
		right[i] = query(BIT, n) - query(BIT, mapped[i] + 1)
		update(BIT, mapped[i] + 1, 1)
	}

	// Multiply the powers of left and right – like a true Nakama combo
	return left.reduce((acc, l, i) => acc + l * right[i], 0)
}
