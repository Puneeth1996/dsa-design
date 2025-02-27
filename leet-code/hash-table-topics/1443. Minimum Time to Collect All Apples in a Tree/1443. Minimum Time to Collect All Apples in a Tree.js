/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
var minTime = function (n, edges, hasApple) {
	let children = new Array(n)
	for (let i = 0; i < n; i++) {
		children[i] = new Array()
	}
	for (let edge of edges) {
		children[edge[0]].push(edge[1])
		children[edge[1]].push(edge[0])
	}

	let res = 0
	let dfs = function (node, parent) {
		let val = false
		for (let child of children[node]) {
			if (child === parent) continue
			res++
			let bol = dfs(child, node)
			if (bol) res++
			else res--
			val = val || bol
		}
		if (hasApple[node]) return true
		return val
	}
	dfs(0)
	return res
}

// Complexity Time complexity: O(n) Space complexity: O(n)
