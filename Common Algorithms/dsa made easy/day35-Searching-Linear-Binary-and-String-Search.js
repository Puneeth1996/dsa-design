// ============================================================
// DAY 35 — Searching: Linear, Binary & String Search
// ============================================================
//
//  Algorithm         Best      Avg        Worst     Space
//  ──────────────────────────────────────────────────────────
//  Linear Search     O(1)      O(n)       O(n)      O(1)
//  Binary Search     O(1)      O(log n)   O(log n)  O(1) iter
//  Naive String      O(1)      O(nm)      O(nm)     O(1)
//
//  n = array/text length, m = pattern length
//  Binary Search requires a sorted array
//
// ============================================================

// ============================================================
// LINEAR SEARCH
// ============================================================
// Scan each element one by one until target is found.
// Works on unsorted arrays. Returns index or -1.
//
// arr = [10, 25, 7, 42, 3, 18]   target = 42
//
//  i=0  arr[0]=10 ≠ 42 → continue
//  i=1  arr[1]=25 ≠ 42 → continue
//  i=2  arr[2]=7  ≠ 42 → continue
//  i=3  arr[3]=42 = 42 → return 3 ✓
// ============================================================

function linearSearch(arr, target) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === target) return i
	}
	return -1
}

// Variant: find ALL occurrences
function linearSearchAll(arr, target) {
	const indices = []
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === target) indices.push(i)
	}
	return indices
}

// ============================================================
// BINARY SEARCH  (iterative)
// ============================================================
// Requires sorted array. Each step halves the search space
// by comparing target with the middle element.
//
// arr = [3, 7, 10, 18, 25, 42, 55, 68]   target = 25
//
//  low=0  high=7  mid=3  arr[3]=18 < 25 → low = mid+1 = 4
//  low=4  high=7  mid=5  arr[5]=42 > 25 → high = mid-1 = 4
//  low=4  high=4  mid=4  arr[4]=25 = 25 → return 4 ✓
//
// Each step eliminates half → O(log n) comparisons
// ============================================================

function binarySearch(arr, target) {
	let low = 0
	let high = arr.length - 1
	while (low <= high) {
		const mid = Math.floor((low + high) / 2)
		if (arr[mid] === target) return mid
		if (arr[mid] < target) low = mid + 1
		else high = mid - 1
	}
	return -1
}

// Variant: recursive binary search
function binarySearchRecursive(arr, target, low = 0, high = arr.length - 1) {
	if (low > high) return -1
	const mid = Math.floor((low + high) / 2)
	if (arr[mid] === target) return mid
	if (arr[mid] < target)
		return binarySearchRecursive(arr, target, mid + 1, high)
	return binarySearchRecursive(arr, target, low, mid - 1)
}

// ============================================================
// NAIVE STRING SEARCH
// ============================================================
// Slide the pattern over the text one character at a time.
// At each position, check if pattern matches.
//
// text    = "AABAACAADAABAABA"
// pattern = "AABA"
//
//  pos=0  text[0..3]="AABA" = "AABA" → match at 0 ✓
//  pos=1  text[1..4]="ABAA" ≠ "AABA" → skip
//  pos=2  text[2..5]="BAAC" ≠ "AABA" → skip
//  ...
//  pos=9  text[9..12]="AABA" = "AABA" → match at 9 ✓
//  pos=12 text[12..15]="AABA" = "AABA" → match at 12 ✓
//
//  matches at indices → [0, 9, 12]
// ============================================================

function naiveStringSearch(text, pattern) {
	const matches = []
	const n = text.length
	const m = pattern.length
	for (let i = 0; i <= n - m; i++) {
		let j = 0
		while (j < m && text[i + j] === pattern[j]) j++
		if (j === m) matches.push(i)
	}
	return matches
}

// ============================================================
// DEMO
// ============================================================

console.log('--- Linear Search ---')
console.log(linearSearch([10, 25, 7, 42, 3, 18], 42)) // 3
console.log(linearSearch([10, 25, 7, 42, 3, 18], 99)) // -1
console.log(linearSearchAll([5, 3, 7, 3, 9, 3], 3)) // [1, 3, 5]

console.log('\n--- Binary Search ---')
console.log(binarySearch([3, 7, 10, 18, 25, 42, 55, 68], 25)) // 4
console.log(binarySearch([3, 7, 10, 18, 25, 42, 55, 68], 10)) // 2
console.log(binarySearchRecursive([3, 7, 10, 18, 25, 42, 55, 68], 55)) // 6
console.log(binarySearch([3, 7, 10, 18, 25, 42, 55, 68], 99)) // -1

console.log('\n--- Naive String Search ---')
console.log(naiveStringSearch('AABAACAADAABAABA', 'AABA')) // [0, 9, 12]

// ============================================================
// WHEN TO USE WHICH
// ============================================================
//
//  Linear Search   → unsorted/small arrays, one-off lookups
//  Binary Search   → sorted arrays, repeated lookups (O(log n))
//  Naive String    → short pattern or text, simple to implement
//
// ============================================================
