/**
 * @param {string} s
 * @param {number} k
 * @param {character} fill
 * @return {string[]}
 */
var divideString = function (s, k, fill) {
	let result = []
	for (let i = 0; i < s.length; i = i + k) {
		let chunk = s.slice(i, i + k)
		if (chunk.length < k) chunk += fill.repeat(k - chunk.length)
		result.push(chunk)
	}
	return result
}
