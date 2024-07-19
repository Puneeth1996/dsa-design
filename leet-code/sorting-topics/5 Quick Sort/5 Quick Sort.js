// there would be a pivot element and recursively sort on both the left and right of the pivot
// Quick sort is a stable sort algorithm
// Stable sortalgorithm previous arrangment is not changed with respect to relative positioning
// Time complexity O(n^*logn) best case and worst case
// Space complexity S(n)

//Quick Sort - Recursively QS lower sized
// middle - pivot
function swap(array, i, j) {
	let temp = array[i]
	array[i] = array[j]
	array[j] = temp
}

function partition(array, start = 0, end = array.length - 1) {
	let middle = Math.floor((start + end) / 2)
	swap(array, start, middle)

	let pivot = array[start]
	let i = start + 1
	let j = end

	while (i <= j) {
		while (array[i] <= pivot) {
			i++
		}
		while (array[j] > pivot) {
			j--
		}
		if (i < j) {
			swap(array, i, j)
		}
	}
	swap(array, start, j)
	return j
}

// 1,2,3,4,5
//3,2,1,4,5

function quickSort(array, start = 0, end = array.length - 1) {
	while (start < end) {
		let pivotIdx = partition(array, start, end)
		//Recursively call Quick Sort on lower sized subarray
		if (pivotIdx - start < end - pivotIdx) {
			quickSort(array, start, pivotIdx - 1)
			start = pivotIdx + 1
		} else {
			quickSort(array, pivotIdx + 1, end)
			end = pivotIdx - 1
		}
	}
}

/*function quickSort(array,start=0,end=array.length-1){
    if(start<end){
        let pivotIdx = partition(array,start,end);
        quickSort(array,start,pivotIdx-1);
        quickSort(array,pivotIdx+1,end);
    }
    return array;
} */

// _ _ _ P _ _

array = [3, 1, 2, 4]
quickSort(array)
console.log(array)

//1,2,3,4

// Recursively lower Sub array Space O(log n) ; log 4 = 2
// Call Recursively on both sides Space O(n) n=4
