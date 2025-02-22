/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
var closestMeetingNode = function (edges, node1, node2) {
	let n = edges.length
	let map1 = new Array(n).fill(-1)
	let map2 = new Array(n).fill(-1)
	map1[node1] = 0
	map2[node2] = 0

	while (edges[node1] != -1 && map1[edges[node1]] == -1) {
		map1[edges[node1]] = map1[node1] + 1
		node1 = edges[node1]
	}
	while (edges[node2] != -1 && map2[edges[node2]] == -1) {
		map2[edges[node2]] = map2[node2] + 1
		node2 = edges[node2]
	}

	let res = n,
		node = -1
	for (let i = 0; i < n; i++) {
		if (map1[i] == -1 || map2[i] == -1) continue
		let val = Math.max(map1[i], map2[i])
		if (res > val) {
			res = val
			node = i
		}
	}
	return node
}

// Complexity Time complexity:O(n) Space complexity:O(n)
