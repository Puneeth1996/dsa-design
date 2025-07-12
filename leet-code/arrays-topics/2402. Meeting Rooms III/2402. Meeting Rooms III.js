/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function (n, meetings) {
	meetings.sort((a, b) => a[0] - b[0])

	const available = Array.from({length: n}, (_, i) => i)
	// Min-heap for occupied rooms [endTime, roomId]
	const occupied = []
	const counts = Array(n).fill(0)

	// Helper heap operations
	const pushAvail = (room) => {
		available.push(room)
		available.sort((a, b) => a - b)
	}
	const popAvail = () => available.shift()
	const pushOcc = (pair) => {
		occupied.push(pair)
		occupied.sort((a, b) => a[0] - b[0] || a[1] - b[1])
	}
	const popOcc = () => occupied.shift()

	for (const [start, end] of meetings) {
		// Free rooms whose meetings ended before or at 'start'
		while (occupied.length && occupied[0][0] <= start) {
			pushAvail(popOcc()[1])
		}

		let roomId, actualEnd

		if (available.length) {
			roomId = popAvail()
			actualEnd = end
		} else {
			const [earliestEnd, rId] = popOcc()
			const duration = end - start
			roomId = rId
			actualEnd = earliestEnd + duration
		}

		counts[roomId]++
		pushOcc([actualEnd, roomId])
	}

	return counts.indexOf(Math.max(...counts))
}

// Time Complexity:
// - Sorting meetings: O(m log m), where m = number of meetings
// - For each meeting: heap operations (push/pop/sort): O(log n) per operation, overall O(m log n)
// - Total: O(m log m + m log n)

// Space Complexity:
// - available list: O(n)
// - occupied list: O(n)
// - counts array: O(n)
// - Total: O(n)
