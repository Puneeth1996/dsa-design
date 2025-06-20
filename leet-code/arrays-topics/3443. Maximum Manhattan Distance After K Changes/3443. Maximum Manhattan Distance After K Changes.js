/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxDistance = function (s, k) {
	const directions = [
		['N', 'E'],
		['N', 'W'],
		['S', 'E'],
		['S', 'W'],
	]
	let maxDist = 0

	for (const [d1, d2] of directions) {
		let curr = 0,
			rem = k
		for (const ch of s) {
			if (ch === d1 || ch === d2) {
				curr++
			} else {
				if (rem > 0) {
					rem--
					curr++
				} else {
					curr--
				}
			}
			maxDist = Math.max(maxDist, curr)
		}
	}
	return maxDist
}
// Time complexity is O(n) where n is the length of the string s.
// Space complexity is O(1) since we are using a constant amount of space for variables.
