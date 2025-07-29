/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number}
 */
var minimumScore = function (nums, edges) {
	const n = nums.length
	const graph = Array.from({length: n}, () => [])
	for (const [u, v] of edges) {
		graph[u].push(v)
		graph[v].push(u)
	}
	const xor = Array(n).fill(0)
	const childer = Array.from({length: n}, () => new Set())
	const dfs = (node, parent) => {
		xor[node] = nums[node]
		for (const neighbor of graph[node]) {
			if (neighbor === parent) continue
			dfs(neighbor, node)
			xor[node] ^= xor[neighbor]
			childer[node].add(neighbor)
			for (let des of childer[neighbor]) {
				childer[node].add(des)
			}
		}
	}
	dfs(0, -1)
	const total = xor[0]
	const m = edges.length
	let minScore = Infinity
	for (let i = 0; i < m - 1; i++) {
		for (let j = i + 1; j < m; j++) {
			let [a, b] = edges[i]
			if (childer[a].has[b]) [a, b] = [b, a]
			let [c, d] = edges[j]
			if (childer[c].has[d]) [c, d] = [d, c]
			let parts
			if (childer[a].has[c]) {
				parts = [xor[c], xor[a] ^ xor[c], total ^ xor[a]]
			} else if (childer[c].has[a]) {
				parts = [xor[a], xor[c] ^ xor[a], total ^ xor[c]]
			} else {
				parts = [xor[a], xor[c] ^ xor[a], total ^ xor[c]]
			}
			const diff = Math.max(...parts) - Math.min(...parts)
			minScore = Math.min(minScore, diff)
		}
	}
	return minScore
}
