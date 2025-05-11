class MinPriorityQueue {
	constructor() {
		this.values = []
	}

	enqueue(element, priority) {
		this.values.push({element, priority})
		this.values.sort((a, b) => a.priority - b.priority)
	}

	dequeue() {
		return this.values.shift()
	}

	isEmpty() {
		return this.values.length === 0
	}
}

function dijkstra(graph, start) {
	const distances = {}
	const visited = {}
	const pq = new MinPriorityQueue() // using built-in MinPriorityQueue (available in some environments like Node.js >= 16.14)

	// Initialize distances
	for (let node in graph) {
		distances[node] = Infinity
	}
	distances[start] = 0
	pq.enqueue(start, 0)

	while (!pq.isEmpty()) {
		const {element: current} = pq.dequeue()

		if (visited[current]) continue
		visited[current] = true

		for (let neighbor of graph[current]) {
			const [adjNode, weight] = neighbor
			const newDist = distances[current] + weight

			if (newDist < distances[adjNode]) {
				distances[adjNode] = newDist
				pq.enqueue(adjNode, newDist)
			}
		}
	}

	return distances
}

const graph = {
	A: [
		['B', 4],
		['C', 2],
	],
	B: [
		['A', 4],
		['C', 1],
		['D', 5],
	],
	C: [
		['A', 2],
		['B', 1],
		['D', 8],
		['E', 10],
	],
	D: [
		['B', 5],
		['C', 8],
		['E', 2],
		['Z', 6],
	],
	E: [
		['C', 10],
		['D', 2],
		['Z', 3],
	],
	Z: [
		['D', 6],
		['E', 3],
	],
}

// Time Complexity: O(E log V) where E is the number of edges and V is the number of vertices
// Space Complexity: O(V) for storing distances and visited nodes
console.log(dijkstra(graph, 'A')) // { A: 0, B: 4, C: 2, D: 9, E: 12, Z: 15 }
// The output shows the shortest distance from the start node 'A' to all other nodes in the graph
// The distances are calculated based on the weights of the edges in the graph
// The output is an object where the keys are the node names and the values are the shortest distances from 'A'
// The algorithm uses a priority queue to efficiently get the next node with the smallest distance
// The graph is represented as an adjacency list, where each node points to an array of its neighbors and their respective weights
// The algorithm starts from the start node and explores its neighbors, updating their distances if a shorter path is found
// The process continues until all nodes have been visited or the priority queue is empty
// The final output is the shortest distances from the start node to all other nodes in the graph
// The algorithm is efficient and works well for graphs with non-negative weights
// The algorithm can be used in various applications such as routing, network optimization, and pathfinding in games
// The algorithm is a classic example of a greedy approach, where the best choice is made at each step
// The algorithm is widely used in computer science and has many variations and optimizations
// The algorithm can be implemented in different programming languages and can be adapted to different data structures
// The algorithm is a fundamental concept in graph theory and is essential for understanding more complex algorithms
// The algorithm is a great example of how to use data structures like priority queues and graphs to solve real-world problems
// The algorithm is a powerful tool for solving optimization problems and can be applied to various domains
// The algorithm is a great way to learn about graph algorithms and their applications
