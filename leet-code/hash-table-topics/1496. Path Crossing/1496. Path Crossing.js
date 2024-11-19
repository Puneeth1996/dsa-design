/**
 * @param {string} path
 * @return {boolean}
 */
var isPathCrossing = function (path) {
	let position = [0, 0]
	const visited = new Set()
	visited.add(position.toString())

	for (const direction of path) {
		switch (direction) {
			case 'N':
				position[0]++
				break
			case 'S':
				position[0]--
				break
			case 'E':
				position[1]++
				break
			case 'W':
				position[1]--
				break
		}

		const positionKey = position.toString()
		if (visited.has(positionKey)) {
			return true
		}
		visited.add(positionKey)
	}
	return false
}
// isPathCrossing("NES")
// Time Complexity O(n) as all the strings need to be traversed
// Space Comleexity S(n) as string characters are stored in set
