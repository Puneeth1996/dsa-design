/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
	let last = -1,
		seclast = -1
	let lastCount = 0,
		curr = 0,
		max = 0
	for (let fruit of fruits) {
		if (fruit === last || fruit === seclast) curr++
		else curr = lastCount + 1
		if (fruit === last) lastCount++
		else {
			lastCount = 1
			seclast = last
			last = fruit
		}
		max = Math.max(max, curr)
	}
	return max
}
// Time O(n)
// Space O(1)
