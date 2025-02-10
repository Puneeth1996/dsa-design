/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
	let m = obstacleGrid.length,
		n = obstacleGrid[0].length

	if (obstacleGrid[0][0] == 1 || obstacleGrid[m - 1][n - 1] == 1) return 0

	obstacleGrid[0][0] = 10

	for (let i = 0; i < m; i++) {
		for (let x = 0; x < n; x++) {
			if (x + 1 < n && obstacleGrid[i][x] % 10 == 0) {
				obstacleGrid[i][x + 1] += obstacleGrid[i][x]
			}
			if (i + 1 < m && obstacleGrid[i][x] % 10 == 0) {
				obstacleGrid[i + 1][x] += obstacleGrid[i][x]
			}
		}
	}
	return obstacleGrid[m - 1][n - 1] / 10
}
