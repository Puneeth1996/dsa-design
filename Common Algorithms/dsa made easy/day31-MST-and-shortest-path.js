// day31-MST-and-shortest-path.js
// Minimum Spanning Tree (MST) and Shortest Path algorithms

class WeightedGraph {
	constructor(n, directed = false) {
		this.n = n
		this.directed = directed
		this.adj = Array.from({length: n}, () => [])
	}

	addEdge(from, to, weight = 1) {
		if (from < 0 || to < 0 || from >= this.n || to >= this.n) return
		this.adj[from].push({node: to, weight})
		if (!this.directed) this.adj[to].push({node: from, weight})
	}

	neighbors(node) {
		return this.adj[node] || []
	}
}

// ============================================================
// PRIM'S ALGORITHM
// Greedy — grows MST from a start node by always picking
// the minimum weight edge that connects a node in the MST
// to a node outside the MST.
// Uses MinHeap priority queue for O((V + E) log V) time.
// Time: O((V + E) log V)  Space: O(V)
// ============================================================
function primMST(graph, start = 0) {
	// minEdgeWeight[i] = smallest edge weight to connect node i into the MST
	// starts as Infinity (not yet reachable) for all nodes except start
	const minEdgeWeight = Array(graph.n).fill(Infinity)

	// parent[i] = which MST node we connected node i from
	// used to reconstruct the MST edges at the end
	const parent = Array(graph.n).fill(-1)

	// inMST[i] = true once node i has been added to the MST permanently
	const inMST = Array(graph.n).fill(false)

	// priority queue — always gives the cheapest node to add to the MST next
	const pq = new MinHeap()

	// seed with start node at cost 0 (starting node costs nothing to add)
	minEdgeWeight[start] = 0
	pq.push({node: start, dist: 0})

	// --- WHILE LOOP: keep adding the cheapest reachable node to the MST ---
	while (pq.size > 0) {
		// STEP 1: Pick the node with the smallest connecting edge — greedy choice
		// This node is the cheapest to add to the MST right now
		const {node: currentNode} = pq.pop()

		// stale entry — this node was already added to the MST via a cheaper edge
		if (inMST[currentNode]) continue

		// permanently add currentNode to the MST
		inMST[currentNode] = true

		// STEP 2: Relax all edges from currentNode to its neighbors
		// If we found a cheaper way to reach a neighbor, update and push to queue
		for (const edge of graph.neighbors(currentNode)) {
			const neighborNode = edge.node
			const edgeWeight = edge.weight
			if (!inMST[neighborNode] && edgeWeight < minEdgeWeight[neighborNode]) {
				minEdgeWeight[neighborNode] = edgeWeight // cheaper edge found
				parent[neighborNode] = currentNode // came from currentNode
				pq.push({node: neighborNode, dist: edgeWeight})
			}
		}
	}

	// Collect MST edges from parent array
	// parent[i] = MST node that node i connects back to
	// minEdgeWeight[i] = weight of that connecting edge
	const mstEdges = []
	let totalWeight = 0
	for (let node = 0; node < graph.n; node++) {
		if (parent[node] !== -1) {
			mstEdges.push({
				from: parent[node],
				to: node,
				weight: minEdgeWeight[node],
			})
			totalWeight += minEdgeWeight[node]
		}
	}

	return {mstEdges, totalWeight}
}

// ============================================================
// KRUSKAL'S ALGORITHM
// Greedy — sorts all edges by weight, adds each edge if it
// doesn't form a cycle (uses Union-Find to detect cycles).
// Time: O(E log E)  Space: O(V)
// ============================================================
class UnionFind {
	constructor(n) {
		this.parent = Array.from({length: n}, (_, idx) => idx)
		this.rank = Array(n).fill(0)
	}

	find(x) {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x])
		}
		return this.parent[x]
	}

	union(x, y) {
		x = this.find(x)
		y = this.find(y)
		if (x === y) return false

		if (this.rank[x] < this.rank[y]) {
			this.parent[x] = y
		} else if (this.rank[x] > this.rank[y]) {
			this.parent[y] = x
		} else {
			this.parent[y] = x
			this.rank[x]++
		}
		return true
	}
}

function kruskalMST(graph) {
	const allEdges = []
	for (let fromNode = 0; fromNode < graph.n; fromNode++) {
		for (const edge of graph.neighbors(fromNode)) {
			const toNode = edge.node
			const edgeWeight = edge.weight
			if (fromNode < toNode || graph.directed) {
				allEdges.push({from: fromNode, to: toNode, weight: edgeWeight})
			}
		}
	}

	allEdges.sort((a, b) => a.weight - b.weight)

	const unionFind = new UnionFind(graph.n)
	const mstEdges = []
	let totalWeight = 0

	for (const edge of allEdges) {
		if (unionFind.union(edge.from, edge.to)) {
			mstEdges.push(edge)
			totalWeight += edge.weight
		}
	}

	return {mstEdges, totalWeight}
}

// ============================================================
// BFS SHORTEST PATH (Unweighted)
// Each edge has equal weight of 1. BFS naturally finds the
// fewest-hops path first.
// Time: O(V + E)  Space: O(V)
// ============================================================
function shortestPathUnweighted(graph, source) {
	const dist = Array(graph.n).fill(Infinity)
	const previous = Array(graph.n).fill(-1)
	const queue = []

	dist[source] = 0
	queue.push(source)

	while (queue.length > 0) {
		const currentNode = queue.shift()
		for (const edge of graph.neighbors(currentNode)) {
			const neighborNode = edge.node
			if (dist[neighborNode] === Infinity) {
				dist[neighborNode] = dist[currentNode] + 1
				previous[neighborNode] = currentNode
				queue.push(neighborNode)
			}
		}
	}

	return {dist, previous}
}

// ============================================================
// MIN-HEAP PRIORITY QUEUE
// Used by Dijkstra to always pop the node with the smallest
// known distance in O(log V) instead of O(V) linear scan.
//
// Each entry: { node, dist }
// Parent of index i  : Math.floor((i - 1) / 2)
// Left child of i    : 2 * i + 1
// Right child of i   : 2 * i + 2
// ============================================================
class MinHeap {
	constructor() {
		this.heap = []
	}

	get size() {
		return this.heap.length
	}

	// Add new entry and bubble it up to restore heap order
	push(entry) {
		this.heap.push(entry)
		this._bubbleUp(this.heap.length - 1)
	}

	// Remove and return the entry with the smallest dist
	pop() {
		const top = this.heap[0]
		const last = this.heap.pop()
		// move last element to root, then sink it down
		if (this.heap.length > 0) {
			this.heap[0] = last
			this._sinkDown(0)
		}
		return top
	}

	// Swap entry at index i upward until parent is smaller
	_bubbleUp(i) {
		while (i > 0) {
			const parent = Math.floor((i - 1) / 2)
			if (this.heap[parent].dist <= this.heap[i].dist) break
			;[this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]]
			i = parent
		}
	}

	// Swap entry at index i downward until both children are larger
	_sinkDown(i) {
		while (true) {
			const left = 2 * i + 1
			const right = 2 * i + 2
			let smallest = i

			if (
				left < this.heap.length &&
				this.heap[left].dist < this.heap[smallest].dist
			)
				smallest = left
			if (
				right < this.heap.length &&
				this.heap[right].dist < this.heap[smallest].dist
			)
				smallest = right

			if (smallest === i) break
			;[this.heap[smallest], this.heap[i]] = [
				this.heap[i],
				this.heap[smallest],
			]
			i = smallest
		}
	}
}

// ============================================================
// DIJKSTRA'S ALGORITHM (Weighted, non-negative edges)
// Uses a MinHeap priority queue so each pop is O(log V)
// instead of a O(V) linear scan.
// Time: O((V + E) log V)  Space: O(V)
// ============================================================
function dijkstra(graph, source) {
	// dist[i] = shortest known distance from source to node i
	// starts as Infinity (unreachable) for all nodes except source
	const dist = Array(graph.n).fill(Infinity)

	// visited[i] = true once node i has been finalized
	// (its shortest distance will never change again)
	const visited = Array(graph.n).fill(false)

	// previous[i] = which node we came from to reach node i
	// used later by reconstructPath() to trace the full path
	const previous = Array(graph.n).fill(-1)

	// priority queue — always gives the unvisited node with smallest dist
	const pq = new MinHeap()

	// source costs 0 to reach itself — seed the priority queue
	dist[source] = 0
	pq.push({node: source, dist: 0})

	// --- WHILE LOOP: process until no reachable unvisited nodes remain ---
	while (pq.size > 0) {
		// STEP 1: Pop the node with the smallest known distance — O(log V)
		// Greedy choice: closest unfinalized node cannot be improved further
		// (no negative edges), so we lock it in permanently
		const {node: currentNode, dist: currentDist} = pq.pop()

		// stale entry — a shorter path to currentNode was already finalized
		// (heap may hold outdated entries after a relaxation update)
		if (visited[currentNode]) continue

		// mark currentNode as finalized
		visited[currentNode] = true

		// STEP 2: Relax all edges going out from currentNode
		// "Relaxing" means: is the path through currentNode shorter
		// than the best path we know to neighborNode so far?
		for (const edge of graph.neighbors(currentNode)) {
			const neighborNode = edge.node
			const edgeWeight = edge.weight

			// skip already finalized neighbors
			if (visited[neighborNode]) continue

			const newDistance = currentDist + edgeWeight

			// found a shorter path — update dist and push new entry to heap
			if (newDistance < dist[neighborNode]) {
				dist[neighborNode] = newDistance
				previous[neighborNode] = currentNode // came from currentNode
				pq.push({node: neighborNode, dist: newDistance})
			}
		}
	}

	// dist[i]     = shortest distance from source to every node i
	// previous[i] = the node before i on the shortest path from source
	return {dist, previous}
}

function reconstructPath(previous, target) {
	const path = []
	let current = target
	while (current !== -1) {
		path.push(current)
		current = previous[current]
	}
	return path.reverse()
}

// ============================================================
// EXAMPLES
// ============================================================

function exampleMST() {
	// Graph:
	//     0
	//    / \
	//  2/   \6
	//  /     \
	// 1---3---3
	//  \5 |8 /
	//   \ |  /7
	//    \| /
	//     4
	// Edges: 0-1(2), 0-3(6), 1-2(3), 1-3(8), 1-4(5), 2-4(7), 3-4(9)

	const graph = new WeightedGraph(5)
	graph.addEdge(0, 1, 2)
	graph.addEdge(0, 3, 6)
	graph.addEdge(1, 2, 3)
	graph.addEdge(1, 3, 8)
	graph.addEdge(1, 4, 5)
	graph.addEdge(2, 4, 7)
	graph.addEdge(3, 4, 9)

	console.log('Prim MST:', primMST(graph))
	console.log('Kruskal MST:', kruskalMST(graph))
}

function exampleUnweightedShortestPath() {
	// Graph (unweighted, each edge = distance 1):
	//     0
	//    / \
	//   1   2
	//    \ /
	//     3
	//     |
	//     4
	//     |
	//     5
	// Shortest path 0->5: distance 4

	const graph = new WeightedGraph(6)
	graph.addEdge(0, 1)
	graph.addEdge(0, 2)
	graph.addEdge(1, 3)
	graph.addEdge(2, 3)
	graph.addEdge(3, 4)
	graph.addEdge(4, 5)

	const result = shortestPathUnweighted(graph, 0)
	console.log('Unweighted dist:', result.dist)
	console.log('Unweighted path to 5:', reconstructPath(result.previous, 5))
}

function exampleWeightedShortestPath() {
	// Graph (weighted, directed):
	//   0 --7--> 1
	//   |       /|
	//   9      10 15
	//   |     /   |
	//   v    v    v
	//   2 --11--> 3 --6--> 4
	//   |                  ^
	//   2                  |
	//   v                  9
	//   5 ----------------/
	// Start: 0, Target: 4

	const graph = new WeightedGraph(6, true)
	graph.addEdge(0, 1, 7)
	graph.addEdge(0, 2, 9)
	graph.addEdge(0, 5, 14)
	graph.addEdge(1, 2, 10)
	graph.addEdge(1, 3, 15)
	graph.addEdge(2, 3, 11)
	graph.addEdge(2, 5, 2)
	graph.addEdge(3, 4, 6)
	graph.addEdge(4, 5, 9)

	const dijkstraResult = dijkstra(graph, 0)
	console.log('Dijkstra dist:', dijkstraResult.dist)
	console.log(
		'Dijkstra path to 4:',
		reconstructPath(dijkstraResult.previous, 4),
	)
}

function exampleUnweightedSocialNetwork() {
	// Social network: degrees of separation
	// 0=You, 1-4=Friends, 5-7=Friends of Friends, 8-9=Targets
	//
	//       1---2
	//      /     \
	//     0       4
	//      \     /
	//       3---/
	//      / \ / \
	//     5   6   7
	//      \ | \ /
	//        8  9

	console.log('\n--- Unweighted Social Network (Degrees of Separation) ---')
	const graph = new WeightedGraph(10)
	graph.addEdge(0, 1)
	graph.addEdge(0, 3)
	graph.addEdge(1, 2)
	graph.addEdge(1, 4)
	graph.addEdge(3, 2)
	graph.addEdge(3, 4)
	graph.addEdge(2, 4)
	graph.addEdge(3, 5)
	graph.addEdge(4, 6)
	graph.addEdge(4, 7)
	graph.addEdge(5, 8)
	graph.addEdge(6, 8)
	graph.addEdge(6, 9)
	graph.addEdge(7, 9)

	const result = shortestPathUnweighted(graph, 0)
	console.log('Degrees of separation from You (0):', result.dist)
	console.log(
		'Shortest path to person 8:',
		reconstructPath(result.previous, 8),
	)
	console.log('Degrees of separation to 8:', result.dist[8])
}

function exampleCityNetwork() {
	// Flight network between cities (directed, weighted by cost)
	// 0=NYC, 1=LA, 2=Chicago, 3=Miami, 4=Seattle, 5=Boston
	//
	//        NYC(0)
	//       / |  \
	//    50/  |200 \40
	//     /   |     \
	//   LA(1) |    Boston(5)
	//   100\  |
	//       \ |
	//      Chicago(2)
	//       /  \
	//    150/   \150
	//     /       \
	//  Miami(3)  Seattle(4)

	console.log('\n--- City Network (Flight Routes) ---')
	const graph = new WeightedGraph(6, true)
	graph.addEdge(0, 1, 50) // NYC to LA
	graph.addEdge(0, 2, 200) // NYC to Chicago
	graph.addEdge(0, 5, 40) // NYC to Boston
	graph.addEdge(1, 2, 100) // LA to Chicago
	graph.addEdge(2, 3, 150) // Chicago to Miami
	graph.addEdge(2, 4, 150) // Chicago to Seattle
	graph.addEdge(3, 0, 30) // Miami to NYC
	graph.addEdge(3, 5, 200) // Miami to Boston

	const result = dijkstra(graph, 0)
	console.log('Cheapest flight costs from NYC:', result.dist)
	console.log('Route to Miami:', reconstructPath(result.previous, 3))
	console.log('Route to Seattle:', reconstructPath(result.previous, 4))
}

if (typeof require !== 'undefined' && require.main === module) {
	exampleMST()
	exampleUnweightedShortestPath()
	exampleWeightedShortestPath()
	exampleUnweightedSocialNetwork()
	exampleCityNetwork()
}
