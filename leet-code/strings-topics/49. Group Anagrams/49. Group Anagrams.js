/**
 * @param {string[]} strs
 * @return {string[][]}
 */

// Time complexity - O(n) -> s number of string and to sort s string nlogn
// time complexity of hash table operations is constant

// Space complexity- O(m) -> Creating array of s number strings
// and output array is s number of strings
// and hash table we creating key with value of array sorted which is s number of string

var groupAnagrams = function (strings) {
	const sorted = strings.map((x) => x.split('').sort().join('')) // key
	const ht = {}
	//hash table - key sorted array and values - strings array
	for (let i = 0; i < strings.length; i++) {
		if (!ht[sorted[i]]) ht[sorted[i]] = [strings[i]]
		else ht[sorted[i]].push(strings[i])
	}
	return Object.values(ht)
}
