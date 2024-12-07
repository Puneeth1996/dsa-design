/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function (edges) {
	for (let num of edges[0]) {
		if (edges[1].includes(num)) {
			return num
		}
	}
}
