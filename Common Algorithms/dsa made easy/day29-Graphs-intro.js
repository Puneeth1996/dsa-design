// day29-Graphs-intro.js
// Graphs refresher (as requested): definitions, complexity, JS implementation, dry run, problems, recursion warm-up.

// 1. Graph definition
// A graph G = (V, E) where
//   V: set of vertices (nodes)
//   E: set of edges (connections between nodes)
// Edges can be directed (u -> v) or undirected (u <-> v).
// Weighted graphs add a numeric cost to each edge.

// 2. Graph vs Tree
// - Tree is a special connected acyclic undirected graph with n nodes and n-1 edges.
// - Graph may be connected/disconnected, cyclic, directed, weighted, etc.
// - In tree, each node has exactly one parent (except root); in graph, multiple parents possible.

// 2.5 Bipartite Graphs (Easy Explanation)
// A bipartite graph is like dividing people into two groups where:
// - Group A: People who like cats
// - Group B: People who like dogs
// - Edges: Friendships between people who like different animals
//
// Key idea: You can color the graph with just 2 colors so that:
// - No two adjacent nodes (connected by edge) have the same color
// - All nodes in one "side" get one color, other "side" gets the other color
//
// Real examples:
// - Boys and Girls (friendships between different genders)
// - Jobs and Workers (worker can do certain jobs)
// - Courses and Students (student enrolled in courses)
//
// Why important:
// - Many real-world problems can be modeled as bipartite graphs
// - Easier to solve certain problems (like matching)
// - Can detect if a graph has "conflicts" or "odd cycles"

// 3. Representations
// 3.1 Adjacency Matrix
//   - space: O(n^2)
//   - edge check: O(1)
//   - iterate neighbors: O(n)
// 3.2 Adjacency List
//   - space: O(n + m) where m = |E|
//   - edge check: O(deg(v))
//   - iterate neighbors: O(deg(v))

// 4. JS implementations

class GraphMatrix {
	constructor(n, directed = false) {
		this.n = n
		this.directed = directed
		this.mat = Array.from({length: n}, () => Array(n).fill(0))
	}

	addEdge(u, v, w = 1) {
		if (u < 0 || v < 0 || u >= this.n || v >= this.n) return
		this.mat[u][v] = w
		if (!this.directed) this.mat[v][u] = w
	}

	hasEdge(u, v) {
		if (u < 0 || v < 0 || u >= this.n || v >= this.n) return false
		return this.mat[u][v] !== 0
	}

	neighbors(u) {
		if (u < 0 || u >= this.n) return []
		const out = []
		for (let v = 0; v < this.n; v++) {
			if (this.mat[u][v] !== 0) out.push(v)
		}
		return out
	}
}

class GraphList {
	constructor(n, directed = false) {
		this.n = n
		this.directed = directed
		this.adj = Array.from({length: n}, () => [])
	}

	addEdge(u, v, w = 1) {
		if (u < 0 || v < 0 || u >= this.n || v >= this.n) return
		this.adj[u].push({node: v, weight: w})
		if (!this.directed) this.adj[v].push({node: u, weight: w})
	}

	neighbors(u) {
		return (this.adj[u] || []).map((edge) => edge.node)
	}

	hasEdge(u, v) {
		return (this.adj[u] || []).some((edge) => edge.node === v)
	}
}

// 5. Dry run example
// Graph nodes 0..4, edges: 0-1, 0-2, 1-2, 1-3, 3-4 (undirected)

function buildSampleGraph() {
	const g = new GraphList(5, false)
	;[
		[0, 1],
		[0, 2],
		[1, 2],
		[1, 3],
		[3, 4],
	].forEach(([u, v]) => g.addEdge(u, v))
	return g
}

function printGraph(g) {
	for (let i = 0; i < g.n; i++) {
		console.log(`${i}: [${g.neighbors(i).join(', ')}]`)
	}
}

// 6. Graph practice

// 6.1 Count connected components (undirected)
function countComponents(n, edges) {
	const g = new GraphList(n, false)
	for (const [u, v] of edges) g.addEdge(u, v)
	const visited = Array(n).fill(false)
	let count = 0

	function dfs(u) {
		visited[u] = true
		for (const v of g.neighbors(u)) {
			if (!visited[v]) dfs(v)
		}
	}

	for (let i = 0; i < n; i++) {
		if (!visited[i]) {
			count++
			dfs(i)
		}
	}
	return count
}

// 6.2 Cycle detection (undirected)
function hasCycleUndirected(n, edges) {
	const g = new GraphList(n, false)
	for (const [u, v] of edges) g.addEdge(u, v)
	const visited = Array(n).fill(false)

	function dfs(u, parent) {
		visited[u] = true
		for (const v of g.neighbors(u)) {
			if (!visited[v]) {
				if (dfs(v, u)) return true
			} else if (v !== parent) {
				return true
			}
		}
		return false
	}

	for (let i = 0; i < n; i++) {
		if (!visited[i] && dfs(i, -1)) return true
	}
	return false
}

// 6.3 BFS shortest path (unweighted)
function bfsShortestPath(n, edges, start) {
	const g = new GraphList(n, false)
	for (const [u, v] of edges) g.addEdge(u, v)

	const dist = Array(n).fill(-1)
	const q = []
	dist[start] = 0
	q.push(start)

	while (q.length) {
		const u = q.shift()
		if (g.neighbors(u).length === 0) continue
		for (const v of g.neighbors(u)) {
			if (dist[v] === -1) {
				dist[v] = dist[u] + 1
				q.push(v)
			}
		}
	}
	return dist
}

// 6.4 Bipartite check (undirected)
function isBipartite(n, edges) {
	const g = new GraphList(n, false)
	for (const [u, v] of edges) g.addEdge(u, v)
	const color = Array(n).fill(0) // 0=uncolored, 1/-1

	function dfs(u, c) {
		color[u] = c
		for (const v of g.neighbors(u)) {
			if (color[v] === 0 && !dfs(v, -c)) return false
			if (color[v] === c) return false
		}
		return true
	}

	for (let i = 0; i < n; i++) {
		if (color[i] === 0 && !dfs(i, 1)) return false
	}
	return true
}

// 7. Recursion refresher (before BFS/DFS)
// Recursion has:
//   1. base case
//   2. recursive call to smaller subproblem

function factorial(n) {
	if (n <= 1) return 1
	return n * factorial(n - 1)
}

function fibonacci(n) {
	if (n <= 1) return n
	return fibonacci(n - 1) + fibonacci(n - 2)
}

// Tree example: sum of values in binary tree object
function sumTree(node) {
	if (!node) return 0
	return node.val + sumTree(node.left) + sumTree(node.right)
}

// Why recursion matters for graph DFS:
// - DFS naturally explores node and neighbor subtrees recursively.
// - function call stack tracks path; we can avoid manual stack in recursive code.
// - can still use an explicit stack (iterative DFS) but recursion is cleaner for learning.

// 8. Example run (uncomment to test in browser/Node.js)

// Browser-friendly driver code
function runGraphDemo() {
	// Build sample graph
	console.log(
		'📊 Building sample graph (nodes 0-4, edges: 0-1,0-2,1-2,1-3,3-4)',
	)
	const g1 = buildSampleGraph()
	console.log('Graph structure:')
	printGraph(g1)
	console.log('')

	// Test connected components
	const edges = [
		[0, 1],
		[0, 2],
		[1, 2],
		[1, 3],
		[3, 4],
	]
	console.log('🔗 Connected Components Test:')
	console.log(`Input: ${edges.length} edges, ${5} nodes`)
	const components = countComponents(5, edges)
	console.log(`Result: ${components} connected component(s)\n`)

	// Test cycle detection
	console.log('🔄 Cycle Detection Test:')
	console.log(`Input: same graph with cycle (0-1-2-0)`)
	const hasCycle = hasCycleUndirected(5, edges)
	console.log(`Result: ${hasCycle ? 'Cycle detected ✅' : 'No cycle ❌'}\n`)

	// Test bipartite check
	console.log('🎨 Bipartite Check Test:')
	console.log(`Input: same graph (has odd cycle, not bipartite)`)
	const isBip = isBipartite(5, edges)
	console.log(`Result: ${isBip ? 'Bipartite ✅' : 'Not bipartite ❌'}\n`)

	// Test BFS shortest path
	console.log('🛣️  BFS Shortest Path Test:')
	console.log(`Input: start from node 0`)
	const distances = bfsShortestPath(5, edges, 0)
	console.log(`Distances from node 0: [${distances.join(', ')}]`)
	console.log(`(Node 4 is at distance ${distances[4]})\n`)

	// Recursion examples
	console.log('🔁 Recursion Examples:')
	console.log(`Factorial(5) = ${factorial(5)}`)
	console.log(`Fibonacci(6) = ${fibonacci(6)}`)

	// Tree sum example
	const sampleTree = {
		val: 1,
		left: {val: 2, left: null, right: null},
		right: {val: 3, left: {val: 4, left: null, right: null}, right: null},
	}
	console.log(`Tree sum: ${sumTree(sampleTree)} (1+2+3+4=10)\n`)

	console.log('✨ Demo complete! Ready for BFS/DFS class.')
}

// Auto-run in browser (if in browser environment)
if (typeof window !== 'undefined') {
	console.log('🌐 Running in browser - call runGraphDemo() in console')
	window.runGraphDemo = runGraphDemo
} else {
	// Auto-run in Node.js
	runGraphDemo()
}

// 9. Complexity summary (for quick recall):
// - adjacency matrix: O(n^2) space, O(1) edge test
// - adjacency list: O(n+m) space, O(deg(v)) edge test
// - DFS/BFS through adjacency list: O(n + m) time (best for sparse graphs)

// 10. Mini practice problems
// - count connected components (done)
// - detect cycle in undirected (done)
// - bipartite check (done)
// - shortest path unweighted (done)
// - convert edge list to list/matrix, graph traversal orders

// End of graph intro file.
