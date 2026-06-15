// ============================================================
// DAY 33 — Merge Sort & Quick Sort
// ============================================================
//
//  Property      Merge Sort        Quick Sort
//  ──────────────────────────────────────────────────────────
//  Best Case     O(n log n)        O(n log n)
//  Avg Case      O(n log n)        O(n log n)
//  Worst Case    O(n log n)        O(n²) — bad pivot choice
//  Space         O(n)              O(log n) call stack
//  Stable        YES               NO
//  In-Place      NO                YES (in-place partition)
//  Adaptive      NO                NO
//
//  Merge Sort  → guaranteed O(n log n), great for linked lists
//  Quick Sort  → faster in practice (cache-friendly), in-place
//
// ============================================================

// ============================================================
// MERGE SORT
// ============================================================
// Divide: split array in half recursively until size 1.
// Conquer: merge two sorted halves into one sorted array.
//
// [38, 27, 43, 3, 15]
//
//  SPLIT PHASE (top-down)
//  [38, 27, 43, 3, 15]
//  ├── [38, 27]                     ├── [43, 3, 15]
//  │   ├── [38]                     │   ├── [43]
//  │   └── [27]                     │   └── [3, 15]
//  │                                │       ├── [3]
//  │                                │       └── [15]
//
//  MERGE PHASE (bottom-up)
//  [38] + [27]   → [27, 38]
//  [3]  + [15]   → [3, 15]
//  [43] + [3,15] → [3, 15, 43]
//  [27,38] + [3,15,43]
//    compare 27 vs 3  → take 3   → [3]
//    compare 27 vs 15 → take 15  → [3, 15]
//    compare 27 vs 43 → take 27  → [3, 15, 27]
//    compare 38 vs 43 → take 38  → [3, 15, 27, 38]
//    leftover  43                → [3, 15, 27, 38, 43] ✓
// ============================================================

function mergeSort(arr) {
	if (arr.length <= 1) return arr

	const mid = Math.floor(arr.length / 2)
	const left = mergeSort(arr.slice(0, mid))
	const right = mergeSort(arr.slice(mid))

	return merge(left, right)
}

function merge(left, right) {
	const result = []
	let l = 0,
		r = 0
	while (l < left.length && r < right.length) {
		result.push(left[l] <= right[r] ? left[l++] : right[r++])
	}
	return result.concat(left.slice(l), right.slice(r))
}

// ============================================================
// QUICK SORT
// ============================================================
// Pick a pivot, partition: smaller elements left, larger right.
// Recursively sort each partition. Pivot ends in final position.
//
// [10, 80, 30, 90, 40, 50, 70]   pivot = 70 (last element)
//
//  PARTITION (i = boundary of ≤pivot zone, j = scanner)
//  i=-1  j=0  arr[j]=10 ≤ 70 → i=0  swap(0,0) → [10, 80, 30, 90, 40, 50, 70]
//  i=0   j=1  arr[j]=80 > 70 → skip      → [10, 80, 30, 90, 40, 50, 70]
//  i=0   j=2  arr[j]=30 ≤ 70 → i=1  swap(1,2) → [10, 30, 80, 90, 40, 50, 70]
//  i=1   j=3  arr[j]=90 > 70 → skip      → [10, 30, 80, 90, 40, 50, 70]
//  i=1   j=4  arr[j]=40 ≤ 70 → i=2  swap(2,4) → [10, 30, 40, 90, 80, 50, 70]
//  i=2   j=5  arr[j]=50 ≤ 70 → i=3  swap(3,5) → [10, 30, 40, 50, 80, 90, 70]
//  place pivot → swap(i+1=4, high=6)      → [10, 30, 40, 50, 70, 90, 80]
//                                                          ↑ pivot at index 4
//
//  RECURSE
//  Left  [10, 30, 40, 50] → already in order, pivot placements sort it
//  Right [90, 80] → pivot=80, swap → [80, 90]
//
//  RESULT → [10, 30, 40, 50, 70, 80, 90] ✓
// ============================================================

function quickSort(arr, low = 0, high = arr.length - 1) {
	if (low < high) {
		const pi = partition(arr, low, high)
		quickSort(arr, low, pi - 1)
		quickSort(arr, pi + 1, high)
	}
	return arr
}

// Lomuto partition — pivot = last element
function partition(arr, low, high) {
	const pivot = arr[high]
	let i = low - 1 // boundary of elements smaller than pivot
	for (let j = low; j < high; j++) {
		if (arr[j] <= pivot) {
			i++
			;[arr[i], arr[j]] = [arr[j], arr[i]]
		}
	}
	;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]] // place pivot
	return i + 1
}

// ============================================================
// DEMO
// ============================================================

console.log('--- Merge Sort ---')
console.log(mergeSort([38, 27, 43, 3])) // [3, 27, 38, 43]
console.log(mergeSort([5, 2, 4, 6, 1, 3])) // [1, 2, 3, 4, 5, 6]

console.log('\n--- Quick Sort ---')
console.log(quickSort([10, 80, 30, 90, 40, 50, 70])) // [10, 30, 40, 50, 70, 80, 90]
console.log(quickSort([3, 6, 8, 10, 1, 2, 1])) // [1, 1, 2, 3, 6, 8, 10]

// ============================================================
// WHEN TO USE WHICH
// ============================================================
//
//  Merge Sort  → need guaranteed O(n log n), stable sort,
//                sorting linked lists, external sort (disk data)
//  Quick Sort  → general-purpose in-memory sort, cache-friendly,
//                slightly faster in practice when pivot is decent
//  Worst-case guard → use 3-way partition or random pivot to
//                     avoid O(n²) on sorted/reverse-sorted input
//
// ============================================================
