// Time complexity O(n^2)
// Space complexity S(1)

const insertionSort = function (arr) {
	for (let i = 1; i < arr.length; i++) {
		let currentValue = arr[i]
		let j
		for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
			arr[j + 1] = arr[j]
		}
		arr[j + 1] = currentValue
	}
	return arr
}

insertionSort([4, 3, 2, 1])
