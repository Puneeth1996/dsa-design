/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var countGoodTriplets = function (arr, a, b, c) {
	let goodTriplets = 0
	const length = arr.length

	for (let i = 0; i < length; i++) {
		for (let j = i + 1; j < length; j++) {
			if (Math.abs(arr[i] - arr[j]) <= a) {
				for (let k = j + 1; k < length; k++) {
					if (
						Math.abs(arr[j] - arr[k]) <= b &&
						Math.abs(arr[i] - arr[k]) <= c
					) {
						goodTriplets++
					}
				}
			}
		}
	}

	return goodTriplets
}

// Time Complexity: O(n^3) Space Complexity: O(1)
