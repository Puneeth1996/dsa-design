/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// Effeciten solution
// Time complexity - O(n)
// Space complexity- O(n) because we are inserting n items to the hashtable

var isIsomorphic = function (s, t) {
	if (s.length !== t.length) return false
	const sHash = {}
	const tHash = {}
	for (let i = 0; i < s.length; i++) {
		let charS = s[i]
		let charT = t[i]
		if (!sHash[charS]) sHash[charS] = charT
		if (!tHash[charT]) tHash[charT] = charS
		if (sHash[charS] !== charT || tHash[charT] !== charS) return false
	}
	return true
}
