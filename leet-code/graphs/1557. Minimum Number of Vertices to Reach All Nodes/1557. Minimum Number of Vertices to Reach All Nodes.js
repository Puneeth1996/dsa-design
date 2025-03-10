/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findSmallestSetOfVertices = function (n, edges) {
	let map = new Array(n)
	let ans = []

	for (let [index, value] of edges) {
		map[value] = 1
	}

	for (let i = 0; i < n; i++) {
		if (!map[i]) ans.push(i)
	}

	return ans
}

// The solution approach is about getting the vertices where there is no incomming node
// That is in other words there is only outgoing node
