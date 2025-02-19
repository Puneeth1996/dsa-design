/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
	function privateDeleteNode(currentNode, key) {
		if (currentNode === null) return null
		if (key < currentNode.val) {
			currentNode.left = privateDeleteNode(currentNode.left, key)
		} else if (key > currentNode.val) {
			currentNode.right = privateDeleteNode(currentNode.right, key)
		}
		// The key is found so will need to handle four scenarios to delete the node
		else {
			// SC1: Deleting a leaf node;
			if (currentNode.left === null && currentNode.right === null) {
				return null
			}
			// SC2: Deleting a node which has nodes on the right side;
			else if (currentNode.left === null) {
				currentNode = currentNode.right
			}
			// SC3: Deleting a node which has nodes on the left side;
			else if (currentNode.right === null) {
				currentNode = currentNode.left
			}
			// SC4: Deleting a node which has nodes on both the sides;
			else {
				// Find the minimum value of the subtree and update the tree;
				let subTreeMinValue = minValue(currentNode.right)
				currentNode.val = subTreeMinValue

				// Deleting the duplicate node in the subTree
				currentNode.right = privateDeleteNode(
					currentNode.right,
					subTreeMinValue
				)
			}
		}
		// Always return the currentNode after the else is executed
		return currentNode
	}
	// Helper method to find the minimum value of a subTree
	function minValue(currentNode) {
		while (currentNode.left !== null) {
			currentNode = currentNode.left
		}
		return currentNode.val
	}
	// Update the root node when the root is deleted;
	// Handles the edge case when the root node is to be deleted;
	root = privateDeleteNode(root, key)

	return root
}
// Complexity Time complexity: 0(N) Space complexity: 0(H)
