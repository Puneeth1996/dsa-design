/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var colorTheGrid = function (m, n) {
	const MOD = 1e9 + 7

	// Generate all valid column states
	const states = []
	const generate = (curr = []) => {
		if (curr.length === m) {
			states.push([...curr])
			return
		}
		for (let color = 0; color < 3; color++) {
			if (curr.length === 0 || curr[curr.length - 1] !== color) {
				curr.push(color)
				generate(curr)
				curr.pop()
			}
		}
	}
	generate()

	// Encode each state as a string
	const stateStrs = states.map((state) => state.join(''))

	// Precompute valid transitions
	const compatible = new Map()
	for (let a of stateStrs) {
		compatible.set(a, [])
		for (let b of stateStrs) {
			let ok = true
			for (let i = 0; i < m; i++) {
				if (a[i] === b[i]) {
					ok = false
					break
				}
			}
			if (ok) compatible.get(a).push(b)
		}
	}

	// Initialize DP
	let dp = new Map()
	for (let s of stateStrs) dp.set(s, 1)

	// DP over columns
	for (let col = 1; col < n; col++) {
		let newDp = new Map()
		for (let curr of stateStrs) {
			let total = 0
			for (let prev of compatible.get(curr)) {
				total = (total + dp.get(prev)) % MOD
			}
			newDp.set(curr, total)
		}
		dp = newDp
	}

	// Sum all possibilities
	let result = 0
	for (let val of dp.values()) {
		result = (result + val) % MOD
	}
	return result
}
