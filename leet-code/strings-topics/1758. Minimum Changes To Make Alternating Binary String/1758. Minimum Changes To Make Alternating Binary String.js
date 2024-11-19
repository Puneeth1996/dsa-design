/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function (s) {
	const n = s.length
	let starts_with_0 = 0 // 010101...
	let starts_with_1 = 0 // 101010...

	for (let i = 0; i < n; i++) {
		if (i % 2 === 0) {
			//Even part
			if (s[i] === '0') starts_with_1++
			else starts_with_0++
		} else {
			if (s[i] === '1') starts_with_1++
			else starts_with_0++
		}
	}
	return Math.min(starts_with_0, starts_with_1)
}
// Time Complexity O(n) as all the string characters need to be traversed
// Space Comleexity S(1) no additional space is utilized
//Approach 2 : calaculate starts_with_0 and we can calaculate the starts_with_1
// starts_with_1 = length of string - starts_with_0
