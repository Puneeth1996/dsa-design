/**
 * @param {number[]} arr
 * @return {boolean}
 */
var threeConsecutiveOdds = function (arr) {
	let count = 0
	for (let num of arr) {
		if (num % 2 !== 0) {
			count++
			if (count === 3) {
				return true
			}
		} else {
			count = 0
		}
	}
	return false
}

// var threeConsecutiveOdds = function(arr) {
//     for (let i = 0; i <= arr.length - 3; i++) {
//         if (arr[i] % 2 === 1 && arr[i+1] % 2 === 1 && arr[i+2] % 2 === 1) {
//             return true;
//         }
//     }
//     return false;
// };
