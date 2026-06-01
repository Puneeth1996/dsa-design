// ============================================================
// DAY 32 — Bubble, Selection & Insertion Sort
// ============================================================
//
//  All three: O(n²) time, O(1) space, in-place
//
//  Property      Bubble         Selection      Insertion
//  ──────────────────────────────────────────────────────
//  Best Case     O(n) *         O(n²)          O(n) *
//  Worst Case    O(n²)          O(n²)          O(n²)
//  Stable        YES            NO             YES
//  Swaps         O(n²)          O(n) max n-1   O(n²) shifts
//  Adaptive      YES            NO             YES
//  Online        NO             NO             YES
//
//  * with early exit optimization
//  Online = can sort data as it arrives one item at a time
//
// ============================================================

// ============================================================
// BUBBLE SORT
// ============================================================
// Each pass bubbles the largest unsorted element to the end.
// After pass i, the last i elements are in their final place.
//
// [64, 34, 25, 12, 22]
//  Pass 1: 64 bubbles right → [34, 25, 12, 22, 64]
//  Pass 2: 34 bubbles right → [25, 12, 22, 34, 64]
//  Pass 3: 25 bubbles right → [12, 22, 25, 34, 64]
//  Done:                       [12, 22, 25, 34, 64] ✓
// ============================================================

function bubbleSort(arr) {
	const n = arr.length
	for (let pass = 0; pass < n - 1; pass++) {
		let swapped = false
		for (let i = 0; i < n - 1 - pass; i++) {
			if (arr[i] > arr[i + 1]) {
				;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
				swapped = true
			}
		}
		if (!swapped) break // already sorted — exit early
	}
	return arr
}

// ============================================================
// SELECTION SORT
// ============================================================
// Each pass finds the minimum in the unsorted section and
// places it at the sorted boundary. At most n-1 swaps total.
//
// [64, 25, 12, 22, 11]
//  Pass 1: min=11 → swap with 64 → [11, 25, 12, 22, 64]
//  Pass 2: min=12 → swap with 25 → [11, 12, 25, 22, 64]
//  Pass 3: min=22 → swap with 25 → [11, 12, 22, 25, 64]
//  Done:                            [11, 12, 22, 25, 64] ✓
// ============================================================

function selectionSort(arr) {
	const n = arr.length
	for (let boundary = 0; boundary < n - 1; boundary++) {
		let minIndex = boundary
		for (let i = boundary + 1; i < n; i++) {
			if (arr[i] < arr[minIndex]) minIndex = i
		}
		if (minIndex !== boundary);
		;[arr[boundary], arr[minIndex]] = [arr[minIndex], arr[boundary]]
	}
	return arr
}

// ============================================================
// INSERTION SORT
// ============================================================
// Pick each element and shift it left into its correct position
// among the already-sorted left portion. Uses shifts not swaps.
//
// [12, 11, 13, 5, 6]
//  Step 1: key=11 → shift 12 right    → [11, 12, 13, 5, 6]
//  Step 2: key=13 → no shift          → [11, 12, 13, 5, 6]
//  Step 3: key=5  → shift 13,12,11    → [5, 11, 12, 13, 6]
//  Step 4: key=6  → shift 13,12,11    → [5, 6, 11, 12, 13] ✓
// ============================================================

function insertionSort(arr) {
	for (let i = 1; i < arr.length; i++) {
		const key = arr[i] // element to place into sorted left part
		let j = i - 1
		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j] // shift right to make room
			j--
		}
		arr[j + 1] = key
	}
	return arr
}

// ============================================================
// DEMO
// ============================================================

console.log('--- Bubble Sort ---')
console.log(bubbleSort([64, 34, 25, 12, 22])) // [12, 22, 25, 34, 64]
console.log(bubbleSort([1, 2, 3, 4, 5])) // already sorted — 1 pass

console.log('\n--- Selection Sort ---')
console.log(selectionSort([64, 25, 12, 22, 11])) // [11, 12, 22, 25, 64]

console.log('\n--- Insertion Sort ---')
console.log(insertionSort([12, 11, 13, 5, 6])) // [5, 6, 11, 12, 13]

// ============================================================
// WHEN TO USE WHICH
// ============================================================
//
//  Bubble    → nearly sorted data, need stable sort
//  Selection → writes are expensive (flash/EEPROM), need k smallest
//  Insertion → online data stream, small arrays (Timsort uses it for n≤32)
//  None      → n > 1000, use Merge Sort or Quick Sort instead
//
// ============================================================
