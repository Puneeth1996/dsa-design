/*
Binary Tree — concise reference and quick examples

Definition
 - A binary tree is a hierarchical data structure where each node has at most two children: `left` and `right`.

Key terms
 - `Node`: container for a value and up to two child pointers.
 - `Root`: topmost node of the tree.
 - `Leaf`: node with no children.
 - `Parent` / `Child` / `Sibling`: family relationships between nodes.
 - `Edge`: link between parent and child.
 - `Depth` (level): number of edges from the root to a node.
 - `Height` of a node: number of edges on the longest path from the node down to a leaf.

Useful properties
 - Max nodes at level L (0-indexed): 2^L
 - Max nodes in a binary tree of height h: 2^(h+1) - 1
 - In-order traversal of a Binary Search Tree (BST) visits values in sorted order.

Common tree types (quick):
 - Full / Proper: every node has 0 or 2 children.
 - Perfect: all internal nodes have two children and all leaves are at the same level.
 - Complete: all levels filled except possibly the last, which is filled left-to-right.
 - Balanced: heights of left/right subtrees differ by at most 1 for every node (e.g., AVL trees).
 - Skewed / Degenerate: each node has only one child (behaves like a linked list).

Traversals (overview)
 - Depth-first: Preorder (root-left-right), Inorder (left-root-right), Postorder (left-right-root).
 - Breadth-first: Level-order (use a queue).

Complexity notes
 - Traversing all nodes: O(n) time; recursion/stack space O(h) where h is tree height.
 - Search/insert/delete costs depend on balance: O(h). Balanced trees aim for h = O(log n).

When to use
 - BSTs for ordered lookups, heaps for priority queues, expression trees for parsing/evaluation, and trees for representing hierarchical data.

This file contains a simple `TreeNode`, a function to collect root-to-leaf paths, and a helper to print them.
*/

// Simple binary tree node
class TreeNode {
	constructor(value, left = null, right = null) {
		this.value = value
		this.left = left
		this.right = right
	}
}

// Return all root-to-leaf paths as arrays of values
function getRootToLeafPaths(root) {
	const result = []

	function dfs(node, path) {
		if (!node) return
		path.push(node.value)

		if (!node.left && !node.right) {
			result.push(Array.from(path))
		} else {
			dfs(node.left, path)
			dfs(node.right, path)
		}

		path.pop()
	}

	dfs(root, [])
	return result
}

// Example usage
// Tree:
//       1
//      / \
//     2   3
//    / \   \
//   4   5   6

const exampleRoot = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), new TreeNode(5)),
	new TreeNode(3, null, new TreeNode(6)),
)

// Helper that prints each root->leaf path in a readable format.
function printRootToLeafPaths(root) {
	const paths = getRootToLeafPaths(root)
	if (!paths || paths.length === 0) {
		console.log('(no paths)')
		return
	}

	paths.forEach((p) => console.log(p.join(' → ')))
}

console.log('Root -> Leaf paths (printed):')
printRootToLeafPaths(exampleRoot)

// console.log('\nRoot -> Leaf paths (returned):')
// const paths = getRootToLeafPaths(exampleRoot)
// paths.forEach((p) => console.log(p.join(' → ')))

// Export functions if used in module systems
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {TreeNode, printRootToLeafPaths, getRootToLeafPaths}
}
