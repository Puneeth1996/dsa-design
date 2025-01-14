/**
 * @param {string} s
 * @return {number}
 */
var partitionString = function (s) {
	const uniqueChars = new Set()
	let partitionCount = 1
	for (const char of s) {
		if (uniqueChars.has(char)) {
			partitionCount++
			uniqueChars.clear()
		}
		uniqueChars.add(char)
	}

	return partitionCount
}
