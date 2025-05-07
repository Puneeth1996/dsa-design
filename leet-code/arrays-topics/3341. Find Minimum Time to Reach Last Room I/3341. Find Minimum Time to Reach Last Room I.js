/**
 * @param {number[][]} moveTime
 * @return {number}
 */
var minTimeToReach = function (moveTime) {
	const n = moveTime.length
	const m = moveTime[0].length
	const best = Array.from({length: n}, () =>
		Array(m).fill(Number.MAX_SAFE_INTEGER)
	)
	best[0][0] = 0
	const dirs = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	]
	const helper = (x, y, currentTime) => {
		if (x === n - 1 && y === m - 1) return
		for (const [dx, dy] of dirs) {
			const nx = x + dx
			const ny = y + dy
			if (nx >= 0 && ny >= 0 && ny < m && nx < n) {
				const timeNeeded =
					currentTime + 1 + Math.max(0, moveTime[nx][ny] - currentTime)
				if (timeNeeded < best[nx][ny]) {
					best[nx][ny] = timeNeeded
					helper(nx, ny, timeNeeded)
				}
			}
		}
	}
	helper(0, 0, 0)
	return best[n - 1][m - 1]
}
// Time O(n m log(mn))
// space O(mn)
