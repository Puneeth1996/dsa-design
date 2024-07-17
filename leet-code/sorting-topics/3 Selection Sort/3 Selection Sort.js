// Time complexity O(n^2)
// Space complexity S(1)
//  This is lesser comparsion than bubble sort which does comparisions every time
const selectionSort = function (arr) {
	for (let i = 0; i < arr.length; i++) {
		let lowest = i
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[lowest]) {
				lowest = j
			}
		}
		if (lowest !== i) {
			// Swap
			;[arr[i], arr[lowest]] = [arr[lowest], arr[i]]
		}
	}
	return arr
}
selectionSort([4, 3, 1, 5])
