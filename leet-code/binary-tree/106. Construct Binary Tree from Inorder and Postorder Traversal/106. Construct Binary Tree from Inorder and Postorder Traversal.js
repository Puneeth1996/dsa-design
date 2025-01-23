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
	const n = inorder.length
	const d = {}
	for (let i = 0; i < n; i++) {
		d[inorder[i]] = i
	}
	const dfs = (i, j, n) => {
		if (n <= 0) {
			return null
		}
		const v = postorder[j + n - 1]
		const k = d[v]
		const l = dfs(i, j, k - i)
		const r = dfs(k + 1, j + k - i, n - 1 - (k - i))
		return new TreeNode(v, l, r)
	}
	return dfs(0, 0, n)
}
