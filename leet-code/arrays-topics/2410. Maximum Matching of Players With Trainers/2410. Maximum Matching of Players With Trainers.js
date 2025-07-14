/**
 * @param {number[]} players
 * @param {number[]} trainers
 * @return {number}
 */
var matchPlayersAndTrainers = function (players, trainers) {
	players.sort((a, b) => a - b)
	trainers.sort((a, b) => a - b)

	let i = 0,
		j = 0,
		matches = 0
	while (i < players.length && j < trainers.length) {
		if (players[i] <= trainers[j]) {
			++matches
			++i
		}
		++j
	}
	return matches
}
// Time Complexity:
// Sorting trainers: O(m log m), where m = trainers.length
// Matching loop: O(n + m)
// Total: O(n log n + m log m)
// Space Complexity:Total: O(1) (assuming in-place sort)
