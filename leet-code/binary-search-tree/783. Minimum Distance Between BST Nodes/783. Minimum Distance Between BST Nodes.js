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
 * @return {number}
 */

// Definition for a binary tree node.
class TreeNode {
	val
	left
	right

	constructor(val = 0, left = null, right = null) {
		this.val = val
		this.left = left
		this.right = right
	}
}

const INFINITY = Number.MAX_SAFE_INTEGER

let minDifference

let previousValue

function minDiffInBST(root) {
	minDifference = INFINITY
	previousValue = -INFINITY

	inOrderTraversal(root)

	return minDifference
}

function inOrderTraversal(node) {
	if (node === null) return

	inOrderTraversal(node.left)

	if (previousValue !== -INFINITY) {
		minDifference = Math.min(minDifference, Math.abs(node.val - previousValue))
	}

	previousValue = node.val

	inOrderTraversal(node.right)
}
