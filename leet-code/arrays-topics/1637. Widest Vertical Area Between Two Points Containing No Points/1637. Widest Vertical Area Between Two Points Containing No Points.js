/**
 * @param {number[][]} points
 * @return {number}
 */
var maxWidthOfVerticalArea = function (points) {
	points.sort((a, b) => a[0] - b[0])

	let maxWidth = 0

	for (let i = 1; i < points.length; i++) {
		let width = points[i][0] - points[i - 1][0]
		maxWidth = Math.max(maxWidth, width)
	}

	return maxWidth
}
// Time complexity: O(n∗log(n)) due to the sorting operation, where n is the number of points.
// Space complexity: O(1) as we use a constant amount of space for variables.
