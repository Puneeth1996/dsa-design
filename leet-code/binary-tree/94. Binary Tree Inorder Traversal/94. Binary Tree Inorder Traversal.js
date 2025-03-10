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
// Recursive way
var inorderTraversal = function (root) {
	const ans = []
	const dfs = (root) => {
		if (!root) {
			return
		}
		dfs(root.left)
		ans.push(root.val)
		dfs(root.right)
	}
	dfs(root)
	return ans
}
// Stack Implementaiton which is non recursive way
var inorderTraversal = function (root) {
	const stk = []
	const ans = []
	while (root || stk.length > 0) {
		if (root) {
			stk.push(root)
			root = root.left
		} else {
			root = stk.pop()
			ans.push(root.val)
			root = root.right
		}
	}
	return ans
}
