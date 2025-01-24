/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
function buildTree(inorder, postorder) {
	if (postorder.length === 0) {
		return null
	}

	// The last element in postorder traversal is the root node's value.
	const rootValue = postorder[postorder.length - 1]
	// Find the index of the root value in the inorder traversal.
	const rootIndexInInorder = inorder.indexOf(rootValue)

	// Construct the root node of the tree.
	const rootNode = new TreeNode(
		rootValue,
		// Recursively build the left subtree from the left part of inorder and postorder arrays.
		buildTree(
			inorder.slice(0, rootIndexInInorder),
			postorder.slice(0, rootIndexInInorder)
		),
		// Recursively build the right subtree from the right part of inorder and postorder arrays, excluding the last element of postorder.
		buildTree(
			inorder.slice(rootIndexInInorder + 1),
			postorder.slice(rootIndexInInorder, postorder.length - 1)
		)
	)

	// Return the root node of the reconstructed tree.
	return rootNode
}
// Time Complexity O(n^2)
