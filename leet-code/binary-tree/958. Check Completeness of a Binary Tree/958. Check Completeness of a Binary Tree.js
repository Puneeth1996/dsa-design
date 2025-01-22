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
 * @return {boolean}
 */
var isCompleteTree = function (root) {
	if (!root) {
		return true
	}

	const nodeQueue = [root]

	let foundNull = false

	while (nodeQueue.length > 0) {
		const currentNode = nodeQueue.shift()

		if (!currentNode) {
			foundNull = true
		} else {
			if (foundNull) {
				return false
			}
			nodeQueue.push(currentNode.left)
			nodeQueue.push(currentNode.right)
		}
	}

	return true
}
// Time complexity O(n)
