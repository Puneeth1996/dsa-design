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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
	let result = []

	while (root !== null) {
		if (root.left === null) {
			result.push(root.val)
			root = root.right
		} else {
			let predecessor = root.left
			while (predecessor.right !== null && predecessor.right !== root) {
				predecessor = predecessor.right
			}
			if (predecessor.right === null) {
				result.push(root.val)
				predecessor.right = root
				root = root.left
			} else {
				predecessor.right = null
				root = root.right
			}
		}
	}

	return result
}
