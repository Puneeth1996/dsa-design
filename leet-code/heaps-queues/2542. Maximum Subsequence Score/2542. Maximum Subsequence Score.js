/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */

class MinHeap {
	constructor() {
		this.heap = []
	}

	insertEleAndShift(ele) {
		this.heap.push(ele)

		let i = this.heap.length

		while (i > 1) {
			let p = Math.floor(i / 2)

			if (this.heap[p - 1] > this.heap[i - 1]) {
				;[this.heap[p - 1], this.heap[i - 1]] = [
					this.heap[i - 1],
					this.heap[p - 1],
				]

				i = p
			} else {
				return
			}
		}
	}

	heapify() {
		let i = 1

		while (i < this.heap.length) {
			let l = 2 * i
			let r = 2 * i + 1
			let si = i

			if (this.heap[l - 1] < this.heap[i - 1]) {
				si = l
			}
			if (this.heap[r - 1] < this.heap[si - 1]) {
				si = r
			}

			if (si != i) {
				;[this.heap[i - 1], this.heap[si - 1]] = [
					this.heap[si - 1],
					this.heap[i - 1],
				]
				i = si
			} else {
				return
			}
		}
	}

	popMin() {
		let l = this.heap.length
		;[this.heap[0], this.heap[l - 1]] = [this.heap[l - 1], this.heap[0]]
		let ele = this.heap.pop()
		this.heapify()
		return ele
	}
}

var maxScore = function (a, b, k) {
	const arr = []

	for (let i = 0; i < a.length; i++) {
		arr.push([a[i], b[i]])
	}

	arr.sort((x, y) => y[1] - x[1])

	let minHeap = new MinHeap()

	let res = 0
	let sum = 0

	for (let i = 0; i < arr.length; i++) {
		sum += arr[i][0]
		minHeap.insertEleAndShift(arr[i][0])

		if (minHeap.heap.length > k) {
			let min = minHeap.popMin()
			sum -= min
		}

		if (minHeap.heap.length == k) {
			let score = sum * arr[i][1]
			res = Math.max(res, score)
		}
	}

	return res
}
// Time Complexity: O(n log(k)) Space Complexity: O(k)
