/**
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents = function (events) {
	events.sort((a, b) => a[1] - b[1])

	const maxDay = events.at(-1)[1]
	const nextDay = new Array(maxDay + 2).fill(0).map((_, i) => i)

	const search = (day) => {
		if (nextDay[day] !== day) nextDay[day] = search(nextDay[day])
		return nextDay[day]
	}

	let count = 0

	for (const evt of events) {
		const start = evt[0]
		const end = evt[1]
		const day = search(start)
		if (day <= end) {
			count++
			nextDay[day] = search(day + 1)
		}
	}

	return count
}
// Time Complexity: O(n log n) for sorting the events, where n is the number of events.
// Space Complexity: O(n) for the nextDay array, where n is the number of days.
