/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSubmat = function (mat) {
	const rows = mat.length
	const cols = mat[0].length
	let total = 0
	const height = Array(cols).fill(0) // histogram heights per column
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			height[c] = mat[r][c] === 1 ? height[c] + 1 : 0
		}
		const rightEndCount = Array(cols).fill(0)
		const stack = []
		for (let c = 0; c < cols; c++) {
			while (stack.length && height[stack[stack.length - 1]] >= height[c]) {
				stack.pop()
			}
			if (stack.length > 0) {
				const prev = stack[stack.length - 1] // previous smaller height
				rightEndCount[c] = rightEndCount[prev] + height[c] * (c - prev)
			} else {
				rightEndCount[c] = height[c] * (c + 1)
			}
			stack.push(c)
			total += rightEndCount[c]
		}
	}

	return total
}

// Time complexity: O (R∗C)
// Space complexity: O (N)
