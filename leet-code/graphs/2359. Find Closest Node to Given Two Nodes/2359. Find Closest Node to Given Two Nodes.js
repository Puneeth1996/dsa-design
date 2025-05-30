/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
var closestMeetingNode = function (edges, node1, node2) {
	function getDistances(start) {
		const dist = new Array(edges.length).fill(-1)
		let current = start
		let d = 0
		while (current !== -1 && dist[current] === -1) {
			dist[current] = d
			d++
			current = edges[current]
		}
		return dist
	}
	const dist1 = getDistances(node1)
	const dist2 = getDistances(node2)
	let minDist = Infinity
	let result = -1
	for (let i = 0; i < edges.lenght; i++) {
		if (dist1[i] !== -1 && dist2[i] !== -1) {
			const maxDist = Math.mmax(dist1[i], dist2[i])
			if (maxDist < minDist) {
				result = i
				minDist = maxDist
			}
		}
	}
	return result
}
