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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
	const serializationCounts = new Map()
	const result = []

	/**
	 * A depth-first search function that serializes the tree as it traverses,
	 * and records the frequency of each serialization.
	 * @param node - The current node being processed.
	 * @returns - A string that uniquely represents the subtree rooted at the current node.
	 */
	function dfs(node) {
		// Base case for a null node.
		if (node == null) {
			return '#'
		}
		// Serialization for non-null node: value, left subtree serialization, right subtree serialization.
		const serialization = `${node.val},${dfs(node.left)},${dfs(node.right)}`
		// Update frequency count or set to 1 if seeing this serialization for the first time.
		serializationCounts.set(
			serialization,
			(serializationCounts.get(serialization) ?? 0) + 1
		)
		// If the serialization count is exactly 2, add the node to the results.
		if (serializationCounts.get(serialization) === 2) {
			result.push(node)
		}
		return serialization
	}

	// Invoke the dfs function starting from the root to fill in the results.
	dfs(root)

	// Return the filled results array.
	return result
}
// time complexity for visiting all nodes in the tree is O(N)
// space complexity of the solution is O(N^2
