// day30-Graphs-traversal-dfs&bfs.js
// Graph Traversal: DFS, BFS, Cycle Detection, and Topological Sort
// Learning guide for understanding graph algorithms with examples

// 1. Graph Definition
// A graph G = (V, E) where
//   V: set of vertices (nodes)
//   E: set of edges (connections between nodes)
// Edges can be directed (u -> v) or undirected (u <-> v).
// Weighted graphs add a numeric cost to each edge.

// 2. Graph Representations
// 2.1 Adjacency Matrix
//   - Space: O(n^2)
//   - Edge check: O(1)
//   - Iterate neighbors: O(n)
// 2.2 Adjacency List
//   - Space: O(n + m) where m = |E|
//   - Edge check: O(deg(v))
//   - Iterate neighbors: O(deg(v))

// 3. Graph Implementations in JavaScript

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

// 4. Graph Traversal Algorithms

// 4.1 Depth-First Search (DFS)
// DFS explores as far as possible along each branch before backtracking
// Uses recursion or stack, visits nodes in depth-first order

function dfsTraversal(graph, start, visited = new Set()) {
	console.log(`Visiting node: ${start}`)
	visited.add(start)

	for (const neighbor of graph.neighbors(start)) {
		if (!visited.has(neighbor)) {
			dfsTraversal(graph, neighbor, visited)
		}
	}
}

// Iterative DFS using stack
function dfsIterative(graph, start) {
	const visited = new Set()
	const stack = [start]

	while (stack.length > 0) {
		const node = stack.pop()
		if (!visited.has(node)) {
			visited.add(node)
			console.log(`Visiting node: ${node}`)

			// Add unvisited neighbors to stack
			for (const neighbor of graph.neighbors(node)) {
				if (!visited.has(neighbor)) {
					stack.push(neighbor)
				}
			}
		}
	}
}

// 4.2 Breadth-First Search (BFS)
// BFS explores all neighbors at the current depth before moving to next depth
// Uses queue, visits nodes in breadth-first order (level order)

function bfsTraversal(graph, start) {
	const visited = new Set()
	const queue = [start]
	visited.add(start)

	while (queue.length > 0) {
		const node = queue.shift()
		console.log(`Visiting node: ${node}`)

		for (const neighbor of graph.neighbors(node)) {
			if (!visited.has(neighbor)) {
				visited.add(neighbor)
				queue.push(neighbor)
			}
		}
	}
}

// 5. Cycle Detection

// 5.1 Cycle Detection in Undirected Graphs
// A cycle exists if we encounter a visited node that is not the parent

function hasCycleUndirected(graph) {
	const visited = new Set()

	function dfs(node, parent) {
		visited.add(node)

		for (const neighbor of graph.neighbors(node)) {
			if (!visited.has(neighbor)) {
				if (dfs(neighbor, node)) return true
			} else if (neighbor !== parent) {
				return true // Cycle detected
			}
		}
		return false
	}

	for (let i = 0; i < graph.n; i++) {
		if (!visited.has(i) && dfs(i, -1)) {
			return true
		}
	}
	return false
}

// 5.2 Cycle Detection in Directed Graphs
// Uses three states: not visited (0), visiting (1), visited (2)
// If we encounter a node in visiting state, there's a cycle

function hasCycleDirected(graph) {
	const states = Array(graph.n).fill(0) // 0: not visited, 1: visiting, 2: visited

	function dfs(node) {
		states[node] = 1 // Mark as visiting

		for (const neighbor of graph.neighbors(node)) {
			if (states[neighbor] === 1) return true // Cycle detected
			if (states[neighbor] === 0 && dfs(neighbor)) return true
		}

		states[node] = 2 // Mark as visited
		return false
	}

	for (let i = 0; i < graph.n; i++) {
		if (states[i] === 0 && dfs(i)) {
			return true
		}
	}
	return false
}

// 6. Topological Sort
// Linear ordering of vertices such that for every directed edge u->v, u comes before v
// Only possible for Directed Acyclic Graphs (DAGs)

function topologicalSort(graph) {
	const visited = new Set()
	const stack = []

	function dfs(node) {
		visited.add(node)

		for (const neighbor of graph.neighbors(node)) {
			if (!visited.has(neighbor)) {
				dfs(neighbor)
			}
		}

		stack.push(node) // Add to stack after processing all neighbors
	}

	for (let i = 0; i < graph.n; i++) {
		if (!visited.has(i)) {
			dfs(i)
		}
	}

	return stack.reverse() // Reverse to get correct order
}

// Kahn's Algorithm for Topological Sort (BFS-based)
function topologicalSortKahn(graph) {
	const indegree = Array(graph.n).fill(0)

	// Calculate indegrees
	for (let i = 0; i < graph.n; i++) {
		for (const neighbor of graph.neighbors(i)) {
			indegree[neighbor]++
		}
	}

	const queue = []
	for (let i = 0; i < graph.n; i++) {
		if (indegree[i] === 0) queue.push(i)
	}

	const result = []

	while (queue.length > 0) {
		const node = queue.shift()
		result.push(node)

		for (const neighbor of graph.neighbors(node)) {
			indegree[neighbor]--
			if (indegree[neighbor] === 0) {
				queue.push(neighbor)
			}
		}
	}

	// If result doesn't include all nodes, there's a cycle
	if (result.length !== graph.n) {
		throw new Error('Graph has a cycle, topological sort not possible')
	}

	return result
}

// 7. Example Usage and Demonstrations

function buildTraversalExample() {
	// Undirected graph for traversal examples
	const g = new GraphList(6, false)
	g.addEdge(0, 1)
	g.addEdge(0, 2)
	g.addEdge(1, 3)
	g.addEdge(1, 4)
	g.addEdge(2, 5)
	return g
}

function buildCycleExampleUndirected() {
	// Graph with cycle: 0-1-2-0
	const g = new GraphList(4, false)
	g.addEdge(0, 1)
	g.addEdge(1, 2)
	g.addEdge(2, 0)
	g.addEdge(2, 3)
	return g
}

function buildCycleExampleDirected() {
	// Graph with cycle: 0->1->2->0
	const g = new GraphList(4, true)
	g.addEdge(0, 1)
	g.addEdge(1, 2)
	g.addEdge(2, 0)
	g.addEdge(0, 3)
	return g
}

function buildDAGExample() {
	// DAG for topological sort: 0->1->2, 0->3->2, 4->2, 4->5
	const g = new GraphList(6, true)
	g.addEdge(0, 1)
	g.addEdge(1, 2)
	g.addEdge(0, 3)
	g.addEdge(3, 2)
	g.addEdge(4, 2)
	g.addEdge(4, 5)
	return g
}

function runTraversalDemo() {
	console.log('=== Graph Traversal Demo ===\n')

	// Build example graph
	const graph = buildTraversalExample()
	console.log('Graph structure (undirected):')
	for (let i = 0; i < graph.n; i++) {
		console.log(`${i}: [${graph.neighbors(i).join(', ')}]`)
	}
	console.log()

	// DFS Recursive
	console.log('DFS Recursive traversal starting from node 0:')
	dfsTraversal(graph, 0)
	console.log()

	// DFS Iterative
	console.log('DFS Iterative traversal starting from node 0:')
	dfsIterative(graph, 0)
	console.log()

	// BFS
	console.log('BFS traversal starting from node 0:')
	bfsTraversal(graph, 0)
	console.log()

	// Cycle Detection
	console.log('=== Cycle Detection Demo ===\n')

	const cycleGraph = buildCycleExampleUndirected()
	console.log('Undirected graph with cycle (0-1-2-0):')
	console.log(`Has cycle: ${hasCycleUndirected(cycleGraph)}\n`)

	const acyclicGraph = buildTraversalExample()
	console.log('Undirected graph without cycle:')
	console.log(`Has cycle: ${hasCycleUndirected(acyclicGraph)}\n`)

	const directedCycleGraph = buildCycleExampleDirected()
	console.log('Directed graph with cycle (0->1->2->0):')
	console.log(`Has cycle: ${hasCycleDirected(directedCycleGraph)}\n`)

	// Topological Sort
	console.log('=== Topological Sort Demo ===\n')

	const dag = buildDAGExample()
	console.log('DAG for topological sort:')
	for (let i = 0; i < dag.n; i++) {
		console.log(`${i}: [${dag.neighbors(i).join(', ')}]`)
	}
	console.log()

	try {
		const topoOrder = topologicalSort(dag)
		console.log(`Topological order (DFS): [${topoOrder.join(', ')}]`)

		const topoOrderKahn = topologicalSortKahn(dag)
		console.log(`Topological order (Kahn's): [${topoOrderKahn.join(', ')}]`)
	} catch (error) {
		console.log(`Error: ${error.message}`)
	}

	console.log('\n=== Demo Complete ===')
}

// Run the demo
runTraversalDemo()

// 8. Key Concepts Summary
// - DFS: Stack-based, explores depth-first, good for path finding
// - BFS: Queue-based, explores breadth-first, good for shortest paths in unweighted graphs
// - Cycle Detection:
//   * Undirected: Check for back edges to non-parent nodes
//   * Directed: Use three-color marking (white/gray/black)
// - Topological Sort: Only for DAGs, ordering with dependencies
// - Time Complexity: O(V + E) for all these algorithms with adjacency list

// 9. Practice Problems
// - Implement DFS and BFS for graphs
// - Detect cycles in directed and undirected graphs
// - Perform topological sort and handle cycles
// - Find shortest paths using BFS
// - Solve problems like course scheduling, dependency resolution
