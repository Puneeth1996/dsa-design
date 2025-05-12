// Priority Queue (min-heap-like)
class PriorityQueue {
	constructor() {
		this.queue = []
	}

	enqueue(value, priority) {
		this.queue.push({value, priority})
		this.queue.sort((a, b) => a.priority - b.priority)
	}

	dequeue() {
		return this.queue.shift()
	}

	isEmpty() {
		return this.queue.length === 0
	}
}

function dijkstra(graph, start, end) {
	const distances = {}
	const previous = {}
	const pq = new PriorityQueue()
	for (let node in graph) {
		distances[node] = node === start ? 0 : Infinity
		previous[node] = null
		pq.enqueue(node, distances[node])
	}
	while (!pq.isEmpty()) {
		const {value: current} = pq.dequeue()
		if (current === end) {
			const path = []
			let temp = current
			while (temp) {
				path.unshift(temp)
				temp = previous[temp]
			}
			return {path, distance: distances[end]}
		}
		for (let neighbor in graph[current]) {
			const weight = graph[current][neighbor]
			const canditate = distances[current] + weight
			if (canditate < distances[neighbor]) {
				distances[neighbor] = canditate
				previous[neighbor] = current
				pq.enqueue(neighbor, canditate)
			}
		}
	}
	return {path: [], distance: Infinity}
}

const graph = {
	A: {B: 2, C: 4},
	B: {A: 2, C: 1, D: 7},
	C: {A: 4, B: 1, E: 3},
	D: {B: 7, E: 1},
	E: {C: 3, D: 1},
}

const result = dijkstra(graph, 'A', 'E')

console.log('Shortest Path:', result.path) // ['A', 'B', 'C', 'E']
console.log('Total Distance:', result.distance) // 6
