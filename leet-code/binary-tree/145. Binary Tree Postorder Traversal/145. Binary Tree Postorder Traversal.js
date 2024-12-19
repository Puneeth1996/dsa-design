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
var postorderTraversal = function (root) {
	let result = []

	const traverse = (node) => {
		if (node === null) return null
		if (node.left) traverse(node.left)
		if (node.right) traverse(node.right)
		result.push(node.val)
	}

	traverse(root)
	return result
}

// Iterative approach 56ms faster than 100% and 33.9MB less than ~13.19% (honestly just server variance)
var postorderTraversal = function (root) {
	let result = []
	let stack = []

	if (root === null) return result

	stack.push(root)

	while (stack.length > 0) {
		let node = stack[stack.length - 1]

		if (node.left === null && node.right === null) {
			let node = stack.pop()
			result.push(node.val)
		} else {
			if (node.right != null) {
				stack.push(node.right)
				node.right = null
			}
			if (node.left != null) {
				stack.push(node.left)
				node.left = null
			}
		}
	}

	return result
}
