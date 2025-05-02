/**
 * @param {number[]} tokens
 * @param {number} power
 * @return {number}
 */
var bagOfTokensScore = function (tokens, power) {
	// Sort the tokens in ascending order to optimize the strategy.
	tokens.sort((a, b) => a - b)

	let score = 0 // Initialize the score to 0.
	let resPower = power // Initialize the remaining power.

	// Continue the game until there are tokens left to play.
	while (tokens.length !== 0) {
		// Calculate the power after playing the leftmost token face-up.
		const flipLeft = resPower - tokens[0]

		// Check if there's only one token left and playing it face-up would result in negative power.
		if (tokens.length === 1 && flipLeft < 0) {
			break
		}

		// If playing face-up is possible, update the power, score, and remove the token from the front.
		if (flipLeft >= 0) {
			resPower = flipLeft
			score += 1
			tokens.shift()
		}
		// If playing face-up is not possible but there's a score, play a token face-down. ( description )
		else if (score >= 1) {
			resPower += tokens.pop()
			score -= 1
		} else {
			// If neither face-up nor face-down moves are possible, break;
			break
		}
	}

	// Return the score achieved.
	return score
}
// Time complexity: O(nlogn) Space complexity: O(1)
