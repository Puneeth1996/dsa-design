/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
	// Create a map to efficiently find the index of values in the inorder array.
	const indexMap = new Map()
	const nodeCount = inorder.length

	// Fill the map with the element as the key and index as the value.
	for (let i = 0; i < nodeCount; ++i) {
		indexMap.set(inorder[i], i)
	}

	/**
	 * Recursive helper function to construct the binary tree.
	 *
	 * @param {number} preStart - The current index in the preorder array.
	 * @param {number} inStart - The current index in the inorder array.
	 * @param {number} size - The number of nodes to consider for the current subtree.
	 * @return {TreeNode | null} The constructed subtree's root node.
	 */
	const buildSubTree = (preStart, inStart, size) => {
		// Base case: if there are no elements to construct the subtree, return null.
		if (size <= 0) {
			return null
		}

		// Retrieve the root value of the current subtree from the preorder array.
		const rootValue = preorder[preStart]
		// Find the index of the root value in the inorder array.
		const rootIndex = indexMap.get(rootValue) ? indexMap.get(rootValue) : 0

		// Calculate the left subtree size.
		const leftSize = rootIndex - inStart

		// Recursively construct the left subtree.
		const leftSubtree = buildSubTree(preStart + 1, inStart, leftSize)
		// Recursively construct the right subtree.
		const rightSubtree = buildSubTree(
			preStart + 1 + leftSize,
			rootIndex + 1,
			size - 1 - leftSize
		)

		// Create the root node with the constructed left and right subtrees.
		return new TreeNode(rootValue, leftSubtree, rightSubtree)
	}

	// Start building the tree from the beginning of preorder and inorder arrays.
	return buildSubTree(0, 0, nodeCount)
}
