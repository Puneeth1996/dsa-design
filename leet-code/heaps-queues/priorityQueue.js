class Node {
	constructor(value, priority) {
		this.value = value
		this.priority = priority
	}
}

class PriorityQueue {
	constructor() {
		this.data = []
	}
	enqueue(value, priority) {
		let node = new Node(value, priority)
		this.data.push(node)
		this.bubbleUp()
		return this
	}
	bubbleUp() {
		let idx = this.data.length - 1
		const element = this.data[idx]
		while (idx > 0) {
			let parentIdx = Math.floor((idx - 1) / 2)
			let parent = this.data[parentIdx]
			if (element.priority >= parent.priority) break
			this.data[idx] = parent
			this.data[parentIdx] = element
			idx = parentIdx
		}
	}
	// [{"Job1",2}]
	dequeue() {
		const min = this.data[0]
		const last = this.data.pop()
		if (this.data.length > 0) {
			this.data[0] = last
			this.bubbleDown()
		}
		return min
	}
	bubbleDown() {
		let idx = 0
		let length = this.data.length
		let element = this.data[0]
		while (true) {
			let leftChildIdx = 2 * idx + 1
			let rightChildIdx = 2 * idx + 2
			let leftChild, rightChild
			let smallest = null
			if (leftChildIdx < length) {
				leftChild = this.data[leftChildIdx]
				if (leftChild.priority < element.priority) {
					smallest = leftChildIdx
				}
			}
			if (rightChildIdx < length) {
				rightChild = this.data[rightChildIdx]
				if (
					(smallest === null && rightChild.priority < element.priority) ||
					(smallest !== null && rightChild.priority < leftChild.priority)
				) {
					smallest = rightChildIdx
				}
			}
			if (smallest === null) break
			this.data[idx] = this.data[smallest]
			this.data[smallest] = element
			idx = smallest
		}
	}
}

let priorQueue = new PriorityQueue()
priorQueue.enqueue('Job1', 3)
priorQueue.enqueue('Job2', 4)
priorQueue.enqueue('Job3', 1)
priorQueue.enqueue('Job4', 2)
priorQueue.enqueue('Job5', 1)
//     1
//   1   3
//  4 2
