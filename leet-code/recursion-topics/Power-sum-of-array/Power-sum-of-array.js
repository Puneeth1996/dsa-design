// Time complexity - O(n) - number of elements in the main and all sub array
// Space complexity- O(D) - max Depth of the call stack in recursive function at once

function powerSum(array, power = 1) {
	let sum = 0
	for (const element of array) {
		if (Array.isArray(element)) {
			sum += powerSum(element, power + 1)
		} else {
			sum += element
		}
	}
	return Math.pow(sum, power)
}

array = [1, 2, [4, 1]]
console.log(powerSum(array))
