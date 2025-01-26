/**
 * // Definition for a QuadTree node.
 * function _Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {number[][]} grid
 * @return {_Node}
 */
function construct(grid) {
	return buildQuadTree(0, 0, grid.length - 1, grid[0].length - 1, grid)
}

function buildQuadTree(topRow, leftCol, bottomRow, rightCol, grid) {
	let zeroCount = 0,
		oneCount = 0

	// Checking each cell in the grid to determine if the current area is homogeneous
	for (let i = topRow; i <= bottomRow; ++i) {
		for (let j = leftCol; j <= rightCol; ++j) {
			if (grid[i][j] == 1) {
				oneCount = 1
			} else {
				zeroCount = 1
			}
		}
	}

	// If only zeros or ones are present, we have a leaf node
	const isLeaf = zeroCount === 0 || oneCount === 0
	// The value of the leaf node if it's homogeneous
	const val = isLeaf && oneCount === 1

	// Create a new quad tree node with the value and leaf status
	const node = {
		val,
		isLeaf,
		topLeft: null,
		topRight: null,
		bottomLeft: null,
		bottomRight: null,
	}

	// If the current area is not homogeneous, divide the area further into quadrants
	if (!isLeaf) {
		const midRow = Math.floor((topRow + bottomRow) / 2)
		const midCol = Math.floor((leftCol + rightCol) / 2)

		// Recursively build quad tree for each of the quadrants
		node.topLeft = buildQuadTree(topRow, leftCol, midRow, midCol, grid)
		node.topRight = buildQuadTree(topRow, midCol + 1, midRow, rightCol, grid)
		node.bottomLeft = buildQuadTree(
			midRow + 1,
			leftCol,
			bottomRow,
			midCol,
			grid
		)
		node.bottomRight = buildQuadTree(
			midRow + 1,
			midCol + 1,
			bottomRow,
			rightCol,
			grid
		)
	}

	// Return the newly created quad tree node
	return node
}

// Time complexity O(N^2 * logN)
