/**
 * @param {number[][]} moveTime
 * @return {number}
 */
class MinHeap {
	constructor() {
		this.heap = []
	}

	push(item) {
		this.heap.push(item)
		this._siftUp()
	}

	pop() {
		if (this.size() === 0) return null
		const top = this.heap[0]
		const end = this.heap.pop()
		if (this.size() > 0) {
			this.heap[0] = end
			this._siftDown()
		}
		return top
	}

	size() {
		return this.heap.length
	}

	_siftUp() {
		let idx = this.heap.length - 1
		const element = this.heap[idx]
		while (idx > 0) {
			let parentIdx = Math.floor((idx - 1) / 2)
			let parent = this.heap[parentIdx]
			if (element[0] >= parent[0]) break
			this.heap[idx] = parent
			idx = parentIdx
		}
		this.heap[idx] = element
	}

	_siftDown() {
		let idx = 0
		const length = this.heap.length
		const element = this.heap[0]
		while (true) {
			let leftIdx = 2 * idx + 1
			let rightIdx = 2 * idx + 2
			let swap = null

			if (leftIdx < length) {
				if (this.heap[leftIdx][0] < element[0]) {
					swap = leftIdx
				}
			}

			if (rightIdx < length) {
				if (
					(swap === null && this.heap[rightIdx][0] < element[0]) ||
					(swap !== null && this.heap[rightIdx][0] < this.heap[leftIdx][0])
				) {
					swap = rightIdx
				}
			}

			if (swap === null) break
			this.heap[idx] = this.heap[swap]
			idx = swap
		}
		this.heap[idx] = element
	}
}

function minTimeToReach(moveTime) {
	const m = moveTime.length
	const n = moveTime[0].length
	const dirs = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	]
	const dist = Array.from({length: m}, () => Array(n).fill(Infinity))
	const heap = new MinHeap()
	dist[0][0] = 0
	heap.push([0, 0, 0]) // [time, x, y]

	while (heap.size() > 0) {
		const [time, x, y] = heap.pop()
		if (x === m - 1 && y === n - 1) return time
		if (time > dist[x][y]) continue

		for (const [dx, dy] of dirs) {
			const nx = x + dx
			const ny = y + dy
			if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue

			const waitTime = Math.max(moveTime[nx][ny], time)
			const moveCost = ((x + y) % 2) + 1
			const newTime = waitTime + moveCost

			if (newTime < dist[nx][ny]) {
				dist[nx][ny] = newTime
				heap.push([newTime, nx, ny])
			}
		}
	}

	return -1
}
