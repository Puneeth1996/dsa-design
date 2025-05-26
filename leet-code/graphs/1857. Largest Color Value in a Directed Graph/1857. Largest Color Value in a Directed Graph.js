/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
var largestPathValue = function (colors, edges) {
	const n = colors.length
	const graph = Array.from({length: n}, () => [])
	const indegree = new Array(n).fill(0)
	for (const [u, v] of edges) {
		graph[u].push(v)
		indegree[v]++
	}
	const queue = []
	const count = Array.from({length: n}, () => new Array(26).fill(0))
	for (let i = 0; i < n; i++) {
		if (indegree[i] === 0) queue.push(i)
	}
	let maxCount = 0
	let visited = 0
	while (queue.length > 0) {
		const node = queue.shift()
		visited++
		const colorIndex = colors.charCodeAt(node) - 97
		count[node][colorIndex]++
		maxCount = Math.max(maxCount, count[node][colorIndex])
		for (const nei of graph[node]) {
			for (let i = 0; i < 26; i++) {
				count[nei][i] = Math.max(count[nei][i], count[node][i])
			}
			indegree[nei]--
			if (indegree[nei] === 0) queue.push(nei)
		}
	}
	return visited === n ? maxCount : -1
}
