class MinHeap {
	constructor() {
		this.heap = []
	}
	push(val) {
		this.heap.push(val)
		this._bubbleUp()
	}
	pop() {
		const top = this.top()
		const last = this.heap.pop()
		if (this.heap.length) {
			this.heap[0] = last
			this._bubbleDown()
		}
		return top
	}
	top() {
		return this.heap[0]
	}
	size() {
		return this.heap.length
	}
	_bubbleUp() {
		let i = this.heap.length - 1
		while (i > 0) {
			let p = Math.floor((i - 1) / 2)
			if (this.heap[i] >= this.heap[p]) break
			;[this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]]
			i = p
		}
	}
	_bubbleDown() {
		let i = 0
		const n = this.heap.length
		while (true) {
			let l = 2 * i + 1,
				r = 2 * i + 2,
				smallest = i
			if (l < n && this.heap[l] < this.heap[smallest]) smallest = l
			if (r < n && this.heap[r] < this.heap[smallest]) smallest = r
			if (smallest === i) break
			;[this.heap[i], this.heap[smallest]] = [
				this.heap[smallest],
				this.heap[i],
			]
			i = smallest
		}
	}
}

class MaxHeap {
	constructor() {
		this.heap = []
	}
	push(val) {
		this.heap.push(val)
		this._bubbleUp()
	}
	pop() {
		const top = this.top()
		const last = this.heap.pop()
		if (this.heap.length) {
			this.heap[0] = last
			this._bubbleDown()
		}
		return top
	}
	top() {
		return this.heap[0]
	}
	size() {
		return this.heap.length
	}
	_bubbleUp() {
		let i = this.heap.length - 1
		while (i > 0) {
			let p = Math.floor((i - 1) / 2)
			if (this.heap[i] <= this.heap[p]) break
			;[this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]]
			i = p
		}
	}
	_bubbleDown() {
		let i = 0
		const n = this.heap.length
		while (true) {
			let l = 2 * i + 1,
				r = 2 * i + 2,
				largest = i
			if (l < n && this.heap[l] > this.heap[largest]) largest = l
			if (r < n && this.heap[r] > this.heap[largest]) largest = r
			if (largest === i) break
			;[this.heap[i], this.heap[largest]] = [
				this.heap[largest],
				this.heap[i],
			]
			i = largest
		}
	}
}

var maxRemoval = function (nums, queries) {
	const n = nums.length
	queries.sort((a, b) => a[0] - b[0])

	const maxHeap = new MaxHeap()
	const minHeap = new MinHeap()

	let qIdx = 0,
		used = 0

	for (let i = 0; i < n; i++) {
		// Push all queries starting at or before index i
		while (qIdx < queries.length && queries[n][0] <= i) {
			maxHeap.push(queries[qIdx][1])
			qIdx++
		}

		// Remove expired queries from minHeap
		while (minHeap.size() && minHeap.top() < i) {
			minHeap.pop()
		}

		// Add queries until we have enough to reduce nums[i]
		while (minHeap.size() < nums[i]) {
			// No more queries can cover this index
			if (!maxHeap.size() || maxHeap.top() < i) return -1

			const end = maxHeap.pop()
			minHeap.push(end)
			used++
		}
	}

	return queries.length - used
}
