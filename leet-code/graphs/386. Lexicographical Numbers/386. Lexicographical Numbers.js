/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function (n) {
	const result = []

	function dfs(curr) {
		if (curr > n) return
		result.push(curr)
		for (let i = 0; i <= 9; i++) {
			const next = curr * 10 + i
			if (next > n) break
			dfs(next)
		}
	}

	for (let i = 1; i <= 9; i++) {
		dfs(i)
	}

	return result
}
