class MaxBinaryHeap {
	constructor() {
		this.heap = []
	}
	buildHeap(array) {
		let length = array.length
		let lastParent = Math.floor(length / 2) - 1
		for (let i = lastParent; i >= 0; i--) {
			this.bubbleDown(array, i)
		}
		this.heap = array
		return this
	}
	bubbleDown(array, idx) {
		const length = array.length
		const current = array[idx]
		while (true) {
			let leftChildIdx = 2 * idx + 1
			let rightChildIdx = 2 * idx + 2
			let leftChild, rightChild
			let largest = null
			if (leftChildIdx < length) {
				leftChild = array[leftChildIdx]
				if (leftChild > current) {
					largest = leftChildIdx
				}
			}
			if (rightChildIdx < length) {
				rightChild = array[rightChildIdx]
				if (
					(largest === null && rightChild > current) ||
					(largest !== null && rightChild > leftChild)
				) {
					largest = rightChildIdx
				}
			}
			if (largest === null) break
			//else swap
			array[idx] = array[largest]
			array[largest] = current
			idx = largest
		}
	}
	//[10]
	extractMax() {
		const maximumValue = this.heap[0]
		const last = this.heap.pop()
		if (this.heap.length > 0) {
			this.heap[0] = last
			this.bubbleDown(this.heap, 0)
		}
		return maximumValue
	}
	insert(value) {
		this.heap.push(value)
		this.bubbleUp()
		return this
	}
	bubbleUp() {
		let idx = this.heap.length - 1
		const value = this.heap[idx]
		while (idx > 0) {
			const parentIdx = Math.floor((idx - 1) / 2)
			const parentValue = this.heap[parentIdx]
			if (value <= parentValue) break
			this.heap[parentIdx] = value
			this.heap[idx] = parentValue
			idx = parentIdx
		}
	}
	peak() {
		return this.heap[0]
	}
}

let heap = new MaxBinaryHeap()
heap.buildHeap([4, 7, 3, 0, 9, 3, 2, 6])
