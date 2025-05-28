/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @param {number} k
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2, k) {
	// Helper function to build adjacency list
	const buildList = (edges) => {
		const adj = new Array(edges.length + 1).fill(0).map(() => [])
		for (const [u, v] of edges) {
			adj[u].push(v)
			adj[v].push(u)
		}
		return adj
	}

	// Helper function for DFS
	const dfs = (adj, u, p, k) => {
		if (k < 0) return 0
		let cnt = 1
		for (const v of adj[u]) {
			if (v !== p) cnt += dfs(adj, v, u, k - 1)
		}
		return cnt
	}

	const adj1 = buildList(edges1)
	const adj2 = buildList(edges2)

	const n = adj1.length
	const m = adj2.length
	let maxiB = 0

	for (let i = 0; i < m; i++) {
		maxiB = Math.max(maxiB, dfs(adj2, i, -1, k - 1))
	}

	const res = []
	for (let i = 0; i < n; i++) {
		res.push(dfs(adj1, i, -1, k) + maxiB)
	}

	return res
}
