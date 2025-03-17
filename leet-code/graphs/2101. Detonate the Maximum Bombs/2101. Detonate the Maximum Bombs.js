/**
 * @param {number[][]} bombs
 * @return {number}
 */
var maximumDetonation = function (bombs) {
	const n = bombs.length
	let map = new Map()
	// For every bomb build list of affected bombs
	for (let i = 0; i < n; i++) {
		map.set(i, [])
		for (let j = 0; j < n; j++) {
			if (i === j) {
				continue
			}
			let b1 = bombs[i]
			let b2 = bombs[j]
			if (willDetonateBomb(b1[0], b1[1], b1[2], b2[0], b2[1], b2[2])) {
				const a = map.get(i)
				a.push(j)
			}
		}
	}

	let max = 0
	// run BFS for every bomb
	for (let i = 0; i < bombs.length; i++) {
		const queue = [i]
		const visited = new Set()

		while (queue.length) {
			let current = queue.shift()

			if (!visited.has(current)) {
				visited.add(current)
				const ch = map.get(current)

				ch.forEach((c) => {
					if (!visited.has(c)) {
						queue.push(c)
					}
				})
			}
		}

		max = Math.max(visited.size, max)
	}

	return max
}

function willDetonateBomb(x1, y1, r1, x2, y2, r2) {
	let distSq = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
	let radSq = r1 * r1
	if (distSq <= radSq) return true
	return false
}
