/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
	const m = matrix.length
	const n = matrix[0].length

	let firstRowZero = false
	let firstColZero = false

	// Step 1: Check if first row and col need to be zero
	for (let i = 0; i < m; i++) {
		if (matrix[i][0] === 0) firstColZero = true
	}

	for (let j = 0; j < n; j++) {
		if (matrix[0][j] === 0) firstRowZero = true
	}

	// Step 2: Use first row and col to mark zeros
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			if (matrix[i][j] === 0) {
				matrix[i][0] = 0
				matrix[0][j] = 0
			}
		}
	}

	// Step 3: Zero out marked rows and cols
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			if (matrix[i][0] === 0 || matrix[0][j] === 0) {
				matrix[i][j] = 0
			}
		}
	}

	// Step 4: Zero out first row and col if needed
	if (firstRowZero) {
		for (let j = 0; j < n; j++) matrix[0][j] = 0
	}

	if (firstColZero) {
		for (let i = 0; i < m; i++) matrix[i][0] = 0
	}
}

// Below is for m+n Space Complexity
// var setZeroes = function(matrix) {
//     const m = matrix.length;
//     const n = matrix[0].length;
//     const rows = new Array(m).fill(false);
//     const cols = new Array(n).fill(false);

//     // First pass: record rows and cols to be zeroed
//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             if (matrix[i][j] === 0) {
//                 rows[i] = true;
//                 cols[j] = true;
//             }
//         }
//     }

//     // Second pass: set zeros
//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             if (rows[i] || cols[j]) {
//                 matrix[i][j] = 0;
//             }
//         }
//     }
// };

// this is of m*n space complexity
// var setZeroes = function(matrix) {
//     const m = matrix.length;
//     const n = matrix[0].length;

//     // Step 1: Copy original matrix
//     const result = matrix.map(row => row.slice());

//     // Step 2: Process 0s in original matrix
//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             if (matrix[i][j] === 0) {
//                 // Set row i to 0 in result
//                 for (let col = 0; col < n; col++) {
//                     result[i][col] = 0;
//                 }
//                 // Set column j to 0 in result
//                 for (let row = 0; row < m; row++) {
//                     result[row][j] = 0;
//                 }
//             }
//         }
//     }

//     // Step 3: Copy back to original matrix (in-place)
//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             matrix[i][j] = result[i][j];
//         }
//     }
// };
