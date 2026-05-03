// Prim's Algorithm for Minimum Spanning Tree (MST)
//
// Explanation:
// Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.
// It starts from an arbitrary vertex and grows the MST by adding the smallest edge that connects a vertex in the MST to a vertex outside the MST.
// This process continues until all vertices are included in the MST.
//
// Key components:
// - Priority Queue (PQ): Used to always select the next vertex with the smallest edge weight connecting it to the MST.
// - Visited array: Tracks which vertices are already in the MST.
// - Key array: Stores the minimum weight to connect each vertex to the MST.
// - Parent array: Keeps track of the MST structure.
//
// Time Complexity: O((V + E) log V) where V is the number of vertices and E is the number of edges.
//   - Each vertex is added to the PQ once, and each edge is considered once.
//   - PQ operations (insert/extract) take O(log V) time.
// Space Complexity: O(V + E)
//   - Adjacency list: O(V + E)
//   - PQ, visited, key, parent arrays: O(V)
//
// Implementation uses a simple Priority Queue class for demonstration.
// In production, consider using a more efficient heap implementation.

class PriorityQueue {
	constructor() {
		this.queue = []
	}

	enqueue(item, priority) {
		this.queue.push({item, priority})
		this.queue.sort((a, b) => a.priority - b.priority)
	}

	dequeue() {
		return this.queue.shift()
	}

	isEmpty() {
		return this.queue.length === 0
	}

	size() {
		return this.queue.length
	}
}

function primMST(graph) {
	const V = graph.length
	const key = new Array(V).fill(Infinity)
	const parent = new Array(V).fill(-1)
	const visited = new Array(V).fill(false)
	const pq = new PriorityQueue()

	// Start from vertex 0
	key[0] = 0
	pq.enqueue(0, 0)

	while (!pq.isEmpty()) {
		const {item: u} = pq.dequeue()

		if (visited[u]) continue
		visited[u] = true

		// Update all adjacent vertices of u
		for (const [v, weight] of graph[u]) {
			if (!visited[v] && weight < key[v]) {
				key[v] = weight
				parent[v] = u
				pq.enqueue(v, weight)
			}
		}
	}

	return {parent, key}
}

function printMST(parent, graph) {
	console.log('Edge \tWeight')
	let totalWeight = 0
	for (let i = 1; i < parent.length; i++) {
		if (parent[i] !== -1) {
			// Find the weight of the edge
			const edge = graph[parent[i]].find(([v]) => v === i)
			if (edge) {
				console.log(`${parent[i]} - ${i} \t${edge[1]}`)
				totalWeight += edge[1]
			}
		}
	}
	console.log(`Total MST Weight: ${totalWeight}`)
}

// Driver Code
// Example graph represented as adjacency list: [[ [to, weight], ... ], ...]
// This represents a graph with 5 vertices (0-4) and their connections with weights.
const graph = [
	[
		[1, 2],
		[3, 6],
	], // 0 -> 1:2, 3:6
	[
		[0, 2],
		[2, 3],
		[3, 8],
		[4, 5],
	], // 1 -> 0:2, 2:3, 3:8, 4:5
	[
		[1, 3],
		[4, 7],
	], // 2 -> 1:3, 4:7
	[
		[0, 6],
		[1, 8],
	], // 3 -> 0:6, 1:8
	[
		[1, 5],
		[2, 7],
	], // 4 -> 1:5, 2:7
]

console.log("Prim's Algorithm - Minimum Spanning Tree")
const {parent} = primMST(graph)
printMST(parent, graph)
