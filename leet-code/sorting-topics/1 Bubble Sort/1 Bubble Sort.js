// Time complexity O(n^2)
// Space complexity S(1)
// bubble sort is a stable sort algorithm
// Stable sortalgorithm previous arrangment is not changed with respect to relative positioning
function bubbleSort(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	return arr
}
