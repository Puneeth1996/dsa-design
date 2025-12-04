/**
 * Generate all subsequences (subsets of characters, order preserved).
 * Uses backtracking (include / exclude).
 *
 * Time complexity: O(n * 2^n) — explained below
 * Space complexity: O(n) recursion depth + output size O(n * 2^n)
 */

function generateSubsequences(str) {
	const subsequences = []

	function buildSubsequence(position, current) {
		const indent = '  '.repeat(position)

		console.log(`${indent}Enter: position=${position}, current='${current}'`)

		// Base case
		if (position === str.length) {
			console.log(`${indent}Add subsequence -> '${current}'`)
			subsequences.push(current)
			console.log(`${indent}Return\n`)
			return
		}

		const char = str[position]

		// EXCLUDE
		console.log(`${indent}Skip '${char}'`)
		buildSubsequence(position + 1, current)

		// INCLUDE
		console.log(`${indent}Take '${char}' -> '${current + char}'`)
		buildSubsequence(position + 1, current + char)

		console.log(
			`${indent}Return from position=${position}, current='${current}'\n`
		)
	}

	buildSubsequence(0, '')
	return subsequences
}

// Example run
const input = 'abc'
console.log('Input:', input, '\n')
const result = generateSubsequences(input)
console.log('All subsequences:', result)
