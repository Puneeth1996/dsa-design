/**
 * @param {number[]} basket1
 * @param {number[]} basket2
 * @return {number}
 */
var minCost = function (basket1, basket2) {
	const count = new Map()
	let globalMin = Infinity

	for (let i = 0; i < basket1.length; i++) {
		count.set(basket1[i], (count.get(basket1[i]) || 0) + 1)
		count.set(basket2[i], (count.get(basket2[i]) || 0) - 1)
		globalMin = Math.min(globalMin, basket1[i], basket2[i])
	}

	const excess = []

	for (let [key, val] of count.entries()) {
		if (val % 2 !== 0) return -1
		for (let i = 0; i < Math.abs(val) / 2; i++) {
			excess.push(key)
		}
	}

	excess.sort((a, b) => a - b)
	let cost = 0

	for (let i = 0; i < excess.length / 2; i++) {
		cost += Math.min(excess[i], 2 * globalMin)
	}

	return cost
}

// Time complexity: O(nlogn) — due to sorting the excess list.
// Space complexity: O(n) — for hashmap and excess list.
