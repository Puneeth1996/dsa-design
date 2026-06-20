// ============================================================
// DAY 34 — Shell Sort, Heap Sort & Linear Sorting Algorithms
// ============================================================
//
//  Property       Shell Sort     Heap Sort      Counting   Bucket     Radix
//  ──────────────────────────────────────────────────────────────────────────
//  Best Case      O(n log n)     O(n log n)     O(n+k)     O(n+k)     O(nk)
//  Avg Case       O(n log² n)    O(n log n)     O(n+k)     O(n+k)     O(nk)
//  Worst Case     O(n log² n)    O(n log n)     O(n+k)     O(n²)      O(nk)
//  Space          O(1)           O(1)           O(k)       O(n+k)     O(n+k)
//  Stable         NO             NO             YES        YES*       YES
//  In-Place       YES            YES            NO         NO         NO
//
//  k = range of values, * stable only if inner sort is stable
//  Linear sorts skip comparisons — they sort by digit/frequency
//
// ============================================================

// ============================================================
// SHELL SORT
// ============================================================
// An improved insertion sort. Instead of shifting one step at
// a time, compare elements gap positions apart. Shrink gap each
// pass until gap=1 (final insertion sort on nearly-sorted data).
//
// [23, 12, 1, 8, 34, 54, 2, 3]   gap sequence: n/2 → n/4 → 1
//
//  gap=4: compare pairs 4 apart
//    (23,34) ok  (12,54) ok  (1,2) ok  (8,3) swap
//    → [23, 12, 1, 3, 34, 54, 2, 8]
//
//  gap=2: insertion sort with step 2
//    col0: [23,1,34,2]  → [1,2,23,34]
//    col1: [12,3,54,8]  → [3,8,12,54]
//    → [1, 3, 2, 8, 23, 12, 34, 54]
//
//  gap=1: final insertion sort (almost sorted — very few shifts)
//    → [1, 2, 3, 8, 12, 23, 34, 54] ✓
// ============================================================

function shellSort(arr) {
	let gap = Math.floor(arr.length / 2)
	while (gap > 0) {
		for (let i = gap; i < arr.length; i++) {
			const key = arr[i]
			let j = i
			while (j >= gap && arr[j - gap] > key) {
				arr[j] = arr[j - gap]
				j -= gap
			}
			arr[j] = key
		}
		gap = Math.floor(gap / 2)
	}
	return arr
}

// ============================================================
// HEAP SORT  (using Min-Heap)
// ============================================================
// Min-Heap property: parent ≤ both children.
// Array representation: parent at i, children at 2i+1 and 2i+2.
//
// Strategy: build a min-heap, then extract-min n times.
// Each extract-min gives the next smallest element in O(log n).
//
// [4, 10, 3, 5, 1]
//
//  BUILD MIN-HEAP (heapify from last parent upward)
//  last parent = Math.floor(5/2) - 1 = 1
//  heapify(i=1): children 10,5 vs 10 → no swap
//  heapify(i=0): children 4 vs 3(i=2) → swap 4↔3
//    after: [3, 10, 4, 5, 1]
//    sink 4 down: children 4 vs ? → leaf, stop
//  bubble 1 up: [1, 10, 4, 5, 3] → min-heap ✓
//
//  EXTRACT-MIN PHASE
//  Extract 1  → swap root↔last → heap=[10,5,4,3] → [1]
//  Extract 3  → swap root↔last → heap=[10,5,4]   → [1,3]
//  Extract 4  → swap root↔last → heap=[10,5]      → [1,3,4]
//  Extract 5  → swap root↔last → heap=[10]         → [1,3,4,5]
//  Extract 10 →                                    → [1,3,4,5,10] ✓
// ============================================================

class MinHeap {
	constructor() {
		this.heap = []
	}

	push(val) {
		this.heap.push(val)
		this._bubbleUp(this.heap.length - 1)
	}

	pop() {
		const min = this.heap[0]
		const last = this.heap.pop()
		if (this.heap.length > 0) {
			this.heap[0] = last
			this._sinkDown(0)
		}
		return min
	}

	_bubbleUp(i) {
		while (i > 0) {
			const parent = Math.floor((i - 1) / 2)
			if (this.heap[parent] <= this.heap[i]) break
			;[this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]]
			i = parent
		}
	}

	_sinkDown(i) {
		const n = this.heap.length
		while (true) {
			let smallest = i
			const l = 2 * i + 1
			const r = 2 * i + 2
			if (l < n && this.heap[l] < this.heap[smallest]) smallest = l
			if (r < n && this.heap[r] < this.heap[smallest]) smallest = r
			if (smallest === i) break
			;[this.heap[i], this.heap[smallest]] = [
				this.heap[smallest],
				this.heap[i],
			]
			i = smallest
		}
	}
}

function heapSort(arr) {
	const h = new MinHeap()
	for (const val of arr) h.push(val)
	return arr.map(() => h.pop()) // extract-min n times
}

// ============================================================
// COUNTING SORT
// ============================================================
// Count occurrences of each value, then reconstruct the array.
// Works only on non-negative integers within a known range k.
//
// [4, 2, 2, 8, 3, 3, 1]   k = max = 8
//
//  COUNT:  index  0  1  2  3  4  5  6  7  8
//          count  0  1  2  2  1  0  0  0  1
//
//  RECONSTRUCT: walk count array, output each index count times
//    index 1 → one   2
//    index 2 → two   2s
//    index 3 → two   3s
//    index 4 → one   4
//    index 8 → one   8
//    → [1, 2, 2, 3, 3, 4, 8] ✓
// ============================================================

function countingSort(arr) {
	var max = Math.max.apply(null, arr)
	var count = new Array(max + 1).fill(0)
	for (var v = 0; v < arr.length; v++) count[arr[v]]++
	var result = []
	for (var i = 0; i <= max; i++) {
		while (count[i]-- > 0) result.push(i)
	}
	return result
}

// ============================================================
// BUCKET SORT
// ============================================================
// Distribute elements into buckets covering equal value ranges,
// sort each bucket (insertion sort), then concatenate all buckets.
// Best for uniformly distributed floats in [0, 1).
//
// [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12]  n=8 buckets
//
//  DISTRIBUTE (bucket = Math.floor(val * n))
//  bucket 0: [0.17, 0.12]
//  bucket 1: [0.17] → already in bucket 0... (simplified)
//  bucket 1: [0.12, 0.17]   bucket 2: [0.21, 0.26]
//  bucket 3: [0.39]         bucket 7: [0.72, 0.78]
//  bucket 9: [0.94]
//
//  SORT each bucket (each is small → insertion sort is fast)
//
//  CONCATENATE → [0.12, 0.17, 0.21, 0.26, 0.39, 0.72, 0.78, 0.94] ✓
// ============================================================

function bucketSort(arr, bucketCount = arr.length) {
	const max = Math.max(...arr)
	const min = Math.min(...arr)
	const range = max - min || 1
	const buckets = Array.from({length: bucketCount}, () => [])

	for (const val of arr) {
		const idx = Math.min(
			Math.floor(((val - min) / range) * bucketCount),
			bucketCount - 1,
		)
		buckets[idx].push(val)
	}

	return buckets.flatMap((b) => b.sort((a, b) => a - b))
}

// ============================================================
// RADIX SORT  (LSD — Least Significant Digit first)
// ============================================================
// Sort by digit position from rightmost to leftmost.
// Uses counting sort as a stable subroutine for each digit pass.
//
// [170, 45, 75, 90, 802, 24, 2, 66]
//
//  Pass 1 (ones digit):
//    170→0  90→0  802→2  2→2  24→4  45→5  75→5  66→6
//    → [170, 90, 802, 2, 24, 45, 75, 66]
//
//  Pass 2 (tens digit):
//    802→0  2→0  24→2  45→4  66→6  170→7  75→7  90→9
//    → [802, 2, 24, 45, 66, 170, 75, 90]
//
//  Pass 3 (hundreds digit):
//    2→0  24→0  45→0  66→0  75→0  90→0  170→1  802→8
//    → [2, 24, 45, 66, 75, 90, 170, 802] ✓
// ============================================================

function radixSort(arr) {
	const max = Math.max(...arr)
	let exp = 1
	while (Math.floor(max / exp) > 0) {
		arr = countByDigit(arr, exp)
		exp *= 10
	}
	return arr
}

function countByDigit(arr, exp) {
	const output = new Array(arr.length)
	const count = new Array(10).fill(0)

	for (const val of arr) count[Math.floor(val / exp) % 10]++
	for (let i = 1; i < 10; i++) count[i] += count[i - 1] // prefix sum
	for (let i = arr.length - 1; i >= 0; i--) {
		const digit = Math.floor(arr[i] / exp) % 10
		output[--count[digit]] = arr[i]
	}
	return output
}

// ============================================================
// DEMO
// ============================================================

console.log('--- Shell Sort ---')
console.log(shellSort([23, 12, 1, 8, 34, 54, 2, 3])) // [1, 2, 3, 8, 12, 23, 34, 54]

console.log('\n--- Heap Sort (Min-Heap) ---')
console.log(heapSort([4, 10, 3, 5, 1])) // [1, 3, 4, 5, 10]

console.log('\n--- Counting Sort ---')
console.log(countingSort([4, 2, 2, 8, 3, 3, 1])) // [1, 2, 2, 3, 3, 4, 8]

console.log('\n--- Bucket Sort ---')
console.log(bucketSort([0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12])) // sorted floats

console.log('\n--- Radix Sort ---')
console.log(radixSort([170, 45, 75, 90, 802, 24, 2, 66])) // [2, 24, 45, 66, 75, 90, 170, 802]

// ============================================================
// WHEN TO USE WHICH
// ============================================================
//
//  Shell Sort    → better than insertion for medium arrays,
//                  no extra space, good for embedded systems
//  Heap Sort     → need guaranteed O(n log n) + O(1) space,
//                  not cache-friendly so slower than quick/merge in practice
//  Counting Sort → integers in small range k, age/score bucketing
//  Bucket Sort   → uniformly distributed floats, parallel-friendly
//  Radix Sort    → fixed-length integers/strings, stable & linear,
//                  great for large datasets (phone numbers, IDs)
//
// ============================================================
