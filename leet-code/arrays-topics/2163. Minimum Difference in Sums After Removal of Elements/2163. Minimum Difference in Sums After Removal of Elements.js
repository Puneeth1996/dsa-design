/**
 * @param {number[]} nums
 * @return {number}
 */

const minimumDifference = (nums) => {
	const heapify = (heap, idx, size) => {
		while (
			2 * idx + 2 < size &&
			(heap[idx] > heap[2 * idx + 1] || heap[idx] > heap[2 * idx + 2])
		) {
			let child = 2 * idx + 1
			if (heap[child] > heap[child + 1]) child++
			const temp = heap[child]
			heap[child] = heap[idx]
			heap[idx] = temp
			idx = child
		}
		if (2 * idx + 2 !== size) return
		if (heap[idx] > heap[2 * idx + 1]) {
			const temp = heap[2 * idx + 1]
			heap[2 * idx + 1] = heap[idx]
			heap[idx] = temp
		}
	}

	const buildHeap = (arr, size) => {
		for (let i = Math.floor((size - 2) / 2); i >= 0; i--) {
			heapify(arr, i, size)
		}
		return arr
	}

	const replaceRoot = (heap, size, newVal) => {
		const removed = heap[0]
		heap[0] = newVal
		heapify(heap, 0, size)
		return removed
	}

	const len = nums.length / 3

	const leftHeap = buildHeap(
		nums.slice(0, len).map((x) => -x),
		len
	)
	const leftSum = Array(len + 1)
	leftSum[0] = leftHeap.reduce((sum, val) => sum - val, 0)

	for (let i = 1; i <= len; i++) {
		const current = nums[len - 1 + i]
		if (current < -leftHeap[0]) {
			const removed = -replaceRoot(leftHeap, len, -current)
			leftSum[i] = leftSum[i - 1] + current - removed
		} else {
			leftSum[i] = leftSum[i - 1]
		}
	}

	const rightHeap = buildHeap(nums.slice(2 * len), len)
	const rightSum = Array(len + 1).fill(0)
	rightSum[len] = rightHeap.reduce((sum, val) => sum + val, 0)

	for (let i = 1; i <= len; i++) {
		const current = nums[2 * len - i]
		if (current > rightHeap[0]) {
			const removed = replaceRoot(rightHeap, len, current)
			rightSum[len - i] = rightSum[len - i + 1] - removed + current
		} else {
			rightSum[len - i] = rightSum[len - i + 1]
		}
	}

	let minDiff = Number.MAX_VALUE
	for (let i = 0; i <= len; i++) {
		minDiff = Math.min(minDiff, leftSum[i] - rightSum[i])
	}

	return minDiff
}

/*
Time Complexity:
- Building each heap: O(n), where n = nums.length / 3
- For both left and right parts, iterating and updating heaps: O(n log n)
- Final loop for minDiff: O(n)
- Total: O(n log n), where n = nums.length / 3

Space Complexity:
- Heaps and sum arrays: O(n)
- Total: O(n)
*/
