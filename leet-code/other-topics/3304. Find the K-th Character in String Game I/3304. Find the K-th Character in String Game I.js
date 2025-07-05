/**
 * @param {number} k
 * @return {character}
 */
var kthCharacter = function (k) {
	let sb = ['a']
	while (sb.length < k) {
		const size = sb.length
		for (let i = 0; i < size; i++) {
			const nextChar = String.fromCharCode(
				'a'.charCodeAt(0) +
					((sb[i].charCodeAt(0) - 'a'.charCodeAt(0) + 1) % 26)
			)
			sb.push(nextChar)
		}
	}
	return sb[k - 1]
}
// Time Complexity: O(k) as we generate characters until we reach the k-th character
// Space Complexity: O(k) as we store the characters in an array
