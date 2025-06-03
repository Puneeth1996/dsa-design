/**
 * @param {number[]} status
 * @param {number[]} candies
 * @param {number[][]} keys
 * @param {number[][]} containedBoxes
 * @param {number[]} initialBoxes
 * @return {number}
 */
var maxCandies = function (
	status,
	candies,
	keys,
	containedBoxes,
	initialBoxes
) {
	const n = status.length
	const seen = new Array(n).fill(false) // To avoid reprocessing a box
	const hasBox = new Array(n).fill(false)
	const hasKey = new Array(n).fill(false)
	const queue = []
	// Initialize: we have these boxes
	for (const box of initialBoxes) {
		hasBox[box] = true
		if (status[box] === 1) {
			queue.push(box)
			seen[box] = true
		}
	}
	let totalCandies = 0
	while (queue.length) {
		const box = queue.shift()
		totalCandies += candies[box]
		// Store any new keys
		for (const key of keys[box]) {
			hasKey[key] = true
			if (hasBox[key] && !seen[key]) {
				queue.push(key)
				seen[key] = true
			}
		}
		// Store any contained boxes
		for (const newBox of containedBoxes[box]) {
			hasBox[newBox] = true
			if ((status[newBox] === 1 || hasKey[newBox]) && !seen[newBox]) {
				queue.push(newBox)
				seen[newBox] = true
			}
		}
	}
	return totalCandies
}
// Time Complexity: O(n + total keys + total containedBoxes)  Space Complexity: O(n)
