/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 */
var FindSumPairs = function (nums1, nums2) {
	this.num1 = nums1
	this.num2 = nums2
	this.map = new Map()
	for (let n of nums2) {
		this.map.set(n, (this.map.get(n) || 0) + 1)
	}
}

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
FindSumPairs.prototype.add = function (index, val) {
	let old = this.num2[index]
	this.map.set(old, this.map.get(old) - 1)
	this.num2[index] += val
	this.map.set(this.num2[index], (this.map.get(this.num2[index]) || 0) + 1)
}

/**
 * @param {number} tot
 * @return {number}
 */
FindSumPairs.prototype.count = function (tot) {
	let count = 0
	for (let n of this.num1) {
		count += this.map.get(tot - n) || 0
	}
	return count
}

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */

// Constructor	O(m) (m = nums2.length)	O(m) (for map)
// add(index,val)	O(1)	O(1)
// count(total)	O(n) (n = nums1.length)	O(1)
