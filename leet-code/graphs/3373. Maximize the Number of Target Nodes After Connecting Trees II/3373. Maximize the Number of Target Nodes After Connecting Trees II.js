/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2) {
	const buildGraph = (edges, n) => {
		const graph = Array.from({length: n}, () => [])
		for (const [u, v] of edges) {
			graph[u].push(v)
			graph[v].push(u)
		}
		return graph
	}
	const dfs = (graph, node, parent, level, parity, count) => {
		parity[node] = level % 2
		count[level % 2]++
		for (const neighbor of graph[node]) {
			if (neighbor !== parent) {
				dfs(graph, neighbor, node, level + 1, parity, count)
			}
		}
	}
	const n = edges1.length + 1
	const m = edges2.length + 1
	const graph1 = buildGraph(edges1, n)
	const graph2 = buildGraph(edges2, m)
	const parity1 = Array(n).fill(0)
	const count1 = [0, 0]
	dfs(graph1, 0, -1, 0, parity1, count1) // DFS on Tree A
	const parity2 = Array(m).fill(0)
	const count2 = [0, 0]
	dfs(graph2, 0, -1, 0, parity2, count2) // DFS on Tree B
	const maxCountB = Math.max(count2[0], count2[1])
	const result = []
	for (let i = 0; i < n; i++) {
		const p = parity1[i] // 0 for even, 1 for odd
		result.push(count1[p] + maxCountB)
	}
	return result
}
// Time: O(n + m) Space: O(n + m)
