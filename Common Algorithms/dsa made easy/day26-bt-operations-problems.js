// Day 26 Binary tree Problems
// Different operations and related problems in binary tree
// -----------------------------------------------------------------------------
// Binary Tree problems: statements, explanations, implementations
// Note: All functions assume the simple `TreeNode` defined earlier (value,left,right).

class TreeNode {
	constructor(value, left = null, right = null) {
		this.value = value
		this.left = left
		this.right = right
	}
}

// Helper function to print tree structure (level-by-level)
function printTree(root) {
	if (!root) {
		console.log('(Empty Tree)')
		return
	}
	const queue = [{node: root, depth: 0, prefix: ''}]
	const depthMap = new Map()

	while (queue.length) {
		const {node, depth} = queue.shift()
		if (!depthMap.has(depth)) depthMap.set(depth, [])
		depthMap.get(depth).push(node.value)

		if (node.left) queue.push({node: node.left, depth: depth + 1})
		if (node.right) queue.push({node: node.right, depth: depth + 1})
	}

	console.log('Tree Structure (level by level):')
	for (let d = 0; d < depthMap.size; d++) {
		const indent = ' '.repeat(d * 4)
		console.log(`Level ${d}: ${indent}[${depthMap.get(d).join(', ')}]`)
	}
}

// 1) Finding maximum value in a binary tree
// Problem: Given the root of a binary tree (not necessarily a BST), return the
// maximum value stored in any node.
// Idea / Explanation: Perform a depth-first traversal (recursive or iterative)
// and keep track of the maximum seen value. This visits every node once.
// Time: O(n). Space: O(h) recursion stack (worst-case O(n)).
function findMax(root) {
	if (!root) return -Infinity
	const leftMax = findMax(root.left)
	const rightMax = findMax(root.right)
	return Math.max(root.value, leftMax, rightMax)
}

// Driver for findMax
// Tree d1_a:
//        3
//       / \
//      1   5
const d1_a = new TreeNode(3, new TreeNode(1), new TreeNode(5))
// Tree d1_b (larger):
//           50
//          /  \
//        30    100
//       /  \    /  \
//      10  40  80  120
const d1_b = new TreeNode(
	50,
	new TreeNode(30, new TreeNode(10), new TreeNode(40)),
	new TreeNode(100, new TreeNode(80), new TreeNode(120)),
)
console.log('findMax d1_a ->', findMax(d1_a)) // 5
console.log('findMax d1_b ->', findMax(d1_b)) // 120

// 2) Searching for an element in a binary tree
// Problem: Return true if a node with given value exists in the tree.
// Idea: Use DFS (recursive) or BFS. BFS is often preferred for shallow targets.
// Time: O(n), Space: O(h) or O(w) for BFS.
function containsValue(root, target) {
	if (!root) return false
	if (root.value === target) return true
	return containsValue(root.left, target) || containsValue(root.right, target)
}

// Driver for containsValue
// Tree d2 (larger):
//           8
//          / \
//         3   10
//        / \   / \
//       1   5  9  12
//      /
//     0
const d2 = new TreeNode(
	8,
	new TreeNode(3, new TreeNode(1, new TreeNode(0), null), new TreeNode(5)),
	new TreeNode(10, new TreeNode(9), new TreeNode(12)),
)
console.log('containsValue d2 (5) ->', containsValue(d2, 5)) // true
console.log('containsValue d2 (7) ->', containsValue(d2, 7)) // false
console.log('containsValue d2 (0) ->', containsValue(d2, 0)) // true

// 3) Insert element into a binary tree (fill level-order)
// Problem: Insert a node with `value` into the first available position when
// traversing the tree in level-order (commonly used for complete binary tree
// insertion when tree is not a BST). Returns the (possibly new) root.
// Idea: Use a queue to find the first node with a missing child and attach.
// Time: O(n) in worst case (to find the spot), Space: O(n) for queue.
function insertIntoBinaryTree(root, value) {
	const newNode = new TreeNode(value)
	if (!root) return newNode
	const queue = [root]
	while (queue.length) {
		const node = queue.shift()
		if (!node.left) {
			node.left = newNode
			return root
		} else queue.push(node.left)
		if (!node.right) {
			node.right = newNode
			return root
		} else queue.push(node.right)
	}
	return root
}

// Driver for insertIntoBinaryTree
// Tree d3_root (before):
//        1
//       / \
//      2   3
//     / \
//    4   5
const d3_root = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), new TreeNode(5)),
	new TreeNode(3),
)
console.log('\n=== INSERTION EXAMPLE ===')
console.log('Before insert size:', sizeOfTree(d3_root)) // 5
printTree(d3_root)

console.log('\n--- Inserting value 6 ---')
insertIntoBinaryTree(d3_root, 6)
console.log('After first insert (6) size:', sizeOfTree(d3_root)) // 6
printTree(d3_root)

console.log('\n--- Inserting value 7 ---')
insertIntoBinaryTree(d3_root, 7)
console.log('After second insert (7) size:', sizeOfTree(d3_root)) // 7
printTree(d3_root)

// 4) Size of binary tree (number of nodes)
// Problem: Return count of nodes in the tree.
// Idea: Recursively sum sizes of left and right subtrees plus one.
// Time: O(n), Space: O(h).
function sizeOfTree(root) {
	if (!root) return 0
	return 1 + sizeOfTree(root.left) + sizeOfTree(root.right)
}

// Driver for sizeOfTree
// Tree d4_a:
//      1
//     / \
//    2   3
//   /
//  4
const d4_a = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), null),
	new TreeNode(3),
)
// Tree d4_b (larger):
//         10
//        /  \
//       5    15
//      / \   / \
//     2   7 12  20
const d4_b = new TreeNode(
	10,
	new TreeNode(5, new TreeNode(2), new TreeNode(7)),
	new TreeNode(15, new TreeNode(12), new TreeNode(20)),
)
console.log('sizeOfTree d4_a ->', sizeOfTree(d4_a)) // 4
console.log('sizeOfTree d4_b ->', sizeOfTree(d4_b)) // 7

// 5) Delete a node from a binary tree (not BST)
// Problem: Delete the first node found with a given value. For a general
// binary tree deletion (to maintain shape), replace the target node's value
// with the deepest-rightmost node's value and remove that deepest node.
// Idea: Use level-order to find target node and deepest node; then delete deepest.
// Time: O(n), Space: O(n).
function deleteFromBinaryTree(root, value) {
	if (!root) return null
	if (!root.left && !root.right) {
		if (root.value === value) return null
		return root
	}

	let targetNode = null
	let deepestNode = null
	const queue = [root]
	while (queue.length) {
		const node = queue.shift()
		if (node.value === value) targetNode = node
		deepestNode = node
		if (node.left) queue.push(node.left)
		if (node.right) queue.push(node.right)
	}

	if (targetNode) {
		// copy deepest node value to target, then remove deepest node
		targetNode.value = deepestNode.value
		// remove deepestNode
		const q2 = [root]
		while (q2.length) {
			const node = q2.shift()
			if (node.left) {
				if (node.left === deepestNode) {
					node.left = null
					break
				} else q2.push(node.left)
			}
			if (node.right) {
				if (node.right === deepestNode) {
					node.right = null
					break
				} else q2.push(node.right)
			}
		}
	}
	return root
}

// Driver for deleteFromBinaryTree
// Tree d5_root (before delete):
//         1
//        / \
//       2   3
//      / \
//     4   5
const d5_root = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), new TreeNode(5)),
	new TreeNode(3),
)
console.log('\n=== DELETION EXAMPLE ===')
console.log('Before delete size:', sizeOfTree(d5_root)) // 5
printTree(d5_root)

console.log('\n--- Deleting node with value 2 ---')
deleteFromBinaryTree(d5_root, 2)
console.log('After delete (node 2) size:', sizeOfTree(d5_root)) // 4
printTree(d5_root)

console.log('\n--- Attempting to delete non-existing node 99 ---')
deleteFromBinaryTree(d5_root, 99)
console.log('After deleting non-existing size:', sizeOfTree(d5_root)) // 4
printTree(d5_root)

// now remove the root itself
console.log('\n--- Deleting the root node (value 1) ---')
deleteFromBinaryTree(d5_root, 1)
console.log('After deleting root, size:', sizeOfTree(d5_root))
printTree(d5_root)

// 6) Height of binary tree (number of nodes in longest path)
// Problem: Return height measured in nodes. A single-node tree has height 1.
// Idea: height = 1 + max(height(left), height(right)).
// Time: O(n), Space: O(h).
function height(root) {
	if (!root) return 0
	return 1 + Math.max(height(root.left), height(root.right))
}

// Driver for height
// Tree d6_a:
//      1
const d6_a = new TreeNode(1)
// Tree d6_b (larger):
//       1
//      /
//     2
//    /
//   3
//  /
// 4
const d6_b = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null),
	null,
)
// Tree d6_c (balanced):
//         5
//        / \
//       3   7
//      / \ / \
//     1  4 6  8
const d6_c = new TreeNode(
	5,
	new TreeNode(3, new TreeNode(1), new TreeNode(4)),
	new TreeNode(7, new TreeNode(6), new TreeNode(8)),
)
console.log('height d6_a ->', height(d6_a)) // 1
console.log('height d6_b (skewed) ->', height(d6_b)) // 4
console.log('height d6_c (balanced) ->', height(d6_c)) // 3

// 7) Depth of a node (distance from root)
// Problem: Given `target`, return number of edges from root to the node.
// If not found, return -1.
// Idea: BFS tracking level is simplest and returns depth in edges.
function depthOfNode(root, target) {
	if (!root) return -1
	const queue = [{node: root, depth: 0}]
	while (queue.length) {
		const {node, depth} = queue.shift()
		if (node.value === target) return depth
		if (node.left) queue.push({node: node.left, depth: depth + 1})
		if (node.right) queue.push({node: node.right, depth: depth + 1})
	}
	return -1
}

// Driver for depthOfNode
// Tree d7_root (larger):
//         1
//        / \
//       2   3
//      / \
//     4   5
//    /
//   6
const d7_root = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4, new TreeNode(6), null), new TreeNode(5)),
	new TreeNode(3),
)
console.log('depthOfNode d7 (6) ->', depthOfNode(d7_root, 6)) // 3
console.log('depthOfNode d7 (5) ->', depthOfNode(d7_root, 5)) // 2
console.log('depthOfNode d7 (99) ->', depthOfNode(d7_root, 99)) // -1

// 8) Print all leaf nodes (return array)
// Problem: Collect all leaf node values (nodes with no children).
// Idea: DFS and collect when node.left and node.right are null.
function getLeafNodes(root) {
	const leaves = []
	function dfs(n) {
		if (!n) return
		if (!n.left && !n.right) {
			leaves.push(n.value)
			return
		}
		dfs(n.left)
		dfs(n.right)
	}
	dfs(root)
	return leaves
}

// Driver for getLeafNodes
// Tree d8_a:
//      1
//     / \
//    2   3
const d8_a = new TreeNode(1, new TreeNode(2), new TreeNode(3))
// Tree d8_b (larger):
//       1
//      / \
//     2   3
//    / \   \
//   4   5   6
//      /
//     7
const d8_b = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(7), null)),
	new TreeNode(3, null, new TreeNode(6)),
)
console.log('getLeafNodes d8_a ->', getLeafNodes(d8_a)) // [2,3]
console.log('getLeafNodes d8_b ->', getLeafNodes(d8_b)) // [4,7,6]

// 9) Half nodes (nodes with exactly one child)
// Problem: Return list of node values that have exactly one child.
// Idea: DFS and test whether XOR of child presence is true.
function getHalfNodes(root) {
	const half = []
	function dfs(n) {
		if (!n) return
		const hasLeft = !!n.left
		const hasRight = !!n.right
		if (hasLeft !== hasRight) half.push(n.value)
		dfs(n.left)
		dfs(n.right)
	}
	dfs(root)
	return half
}

// Driver for getHalfNodes
// Tree d9_a (half nodes at 2):
//       1
//      / \
//     2   3
//    /
//   4
const d9_a = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), null),
	new TreeNode(3),
)
// Tree d9_b (larger, half nodes at 3):
//       1
//      / \
//     2   3
//    / \   \
//   4   5   6
//        \
//         7
const d9_b = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), new TreeNode(5, null, new TreeNode(7))),
	new TreeNode(3, null, new TreeNode(6)),
)
console.log('getHalfNodes d9_a ->', getHalfNodes(d9_a)) // [2]
console.log('getHalfNodes d9_b ->', getHalfNodes(d9_b)) // [3,5]

// 10) Level that has maximum sum in binary tree
// Problem: Return the level index (0-based) that has maximum sum and the sum.
// Idea: BFS level-order, accumulate sums per level and track max.
function maxSumLevel(root) {
	if (!root) return {level: -1, sum: 0}
	const queue = [root]
	let level = 0
	let best = {level: 0, sum: -Infinity}
	while (queue.length) {
		const sz = queue.length
		let levelSum = 0
		for (let i = 0; i < sz; i++) {
			const node = queue.shift()
			levelSum += node.value
			if (node.left) queue.push(node.left)
			if (node.right) queue.push(node.right)
		}
		if (levelSum > best.sum) best = {level, sum: levelSum}
		level++
	}
	return best
}

// Driver for maxSumLevel
// Tree d10_a:
//      1
//     / \
//    2   3
const d10_a = new TreeNode(1, new TreeNode(2), new TreeNode(3))
// Tree d10_b (larger):
//         5
//        / \
//       2   4
//      /|   |\
//     7 1   8 6
const d10_b = new TreeNode(
	5,
	new TreeNode(2, new TreeNode(7), new TreeNode(1)),
	new TreeNode(4, new TreeNode(8), new TreeNode(6)),
)
// Tree d10_c (maximize level 1):
//         1
//        / \
//       10  20
//       /|   |\
//      2 3  4 5
const d10_c = new TreeNode(
	1,
	new TreeNode(10, new TreeNode(2), new TreeNode(3)),
	new TreeNode(20, new TreeNode(4), new TreeNode(5)),
)
console.log('maxSumLevel d10_a ->', maxSumLevel(d10_a)) // level 1, sum 5
console.log('maxSumLevel d10_b ->', maxSumLevel(d10_b)) // level 2, sum 22
console.log('maxSumLevel d10_c ->', maxSumLevel(d10_c)) // level 1, sum 30

// 11) Print all root to leaf paths (return array of arrays)
// Problem: Return all paths from root to each leaf as arrays of values.
// Idea: DFS with a path stack; when reaching a leaf push copy of path.
function getRootToLeafPathsBT(root) {
	const result = []
	const path = []
	function dfs(n) {
		if (!n) return
		path.push(n.value)
		if (!n.left && !n.right) result.push(Array.from(path))
		else {
			dfs(n.left)
			dfs(n.right)
		}
		path.pop()
	}
	dfs(root)
	return result
}

// Driver for getRootToLeafPathsBT
// Tree d11 (larger):
//         1
//        / \
//       2   3
//      / \
//     4   5
const d11 = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), new TreeNode(5)),
	new TreeNode(3),
)
console.log('getRootToLeafPathsBT d11 ->', getRootToLeafPathsBT(d11)) // [[1,2,4],[1,2,5],[1,3]]

// 12) Convert tree to its mirror
// Problem: Transform tree in-place so that left and right children are swapped
// for every node. This produces the mirror image of the tree.
// Idea: Postorder recursion, swap children at each node.
function mirrorTree(root) {
	if (!root) return null
	const leftMirror = mirrorTree(root.left)
	const rightMirror = mirrorTree(root.right)
	root.left = rightMirror
	root.right = leftMirror
	return root
}

// Driver for mirrorTree
// Tree d12_src:
//      1
//     / \
//    2   3
const d12_src = new TreeNode(1, new TreeNode(2), new TreeNode(3))
// Tree d12_copy (to be mirrored, larger):
//        1
//       / \
//      2   3
//     / \
//    4   5
const d12_copy = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), new TreeNode(5)),
	new TreeNode(3),
)
mirrorTree(d12_copy)
console.log(
	'mirrorTree applied. original leaves:',
	getLeafNodes(d12_src),
	'mirrored leaves:',
	getLeafNodes(d12_copy),
)

// 13) Check if two input binary trees are mirrors of each other
// Problem: Given roots r1 and r2, return true if r1 is mirror of r2.
// Idea: Recursively check r1.left vs r2.right and r1.right vs r2.left and values equal.
function areMirrors(r1, r2) {
	if (!r1 && !r2) return true
	if (!r1 || !r2) return false
	if (r1.value !== r2.value) return false
	return areMirrors(r1.left, r2.right) && areMirrors(r1.right, r2.left)
}

// Driver for areMirrors
// Tree d13_a:
//      1
//     / \
//    2   3
const d13_a = new TreeNode(1, new TreeNode(2), new TreeNode(3))
// Tree d13_b (mirror of d13_a):
//      1
//     / \
//    3   2
const d13_b = new TreeNode(1, new TreeNode(3), new TreeNode(2))
// Tree d13_c (not mirror):
//      1
//     / \
//    2   3
const d13_c = new TreeNode(1, new TreeNode(2), new TreeNode(3))
console.log('areMirrors d13_a,d13_b ->', areMirrors(d13_a, d13_b)) // true
console.log('areMirrors d13_a,d13_c ->', areMirrors(d13_a, d13_c)) // false

// 14) Construct binary tree from inorder + preorder (and from inorder + level-order)
// Problem: Given traversal arrays, reconstruct the original binary tree.
// Explanation (preorder+inorder): The first element of preorder is root. Locate
// it in inorder to find left and right subtree sizes. Recurse accordingly.
// Time: O(n) if map used to index inorder; Space: O(n).
function buildTreeFromPreIn(preorder, inorder) {
	if (
		!preorder.length ||
		!inorder.length ||
		preorder.length !== inorder.length
	)
		return null
	const inorderIndex = new Map()
	inorder.forEach((val, idx) => inorderIndex.set(val, idx))
	let preIndex = 0

	function build(inLeft, inRight) {
		if (inLeft > inRight) return null
		const rootVal = preorder[preIndex++]
		const root = new TreeNode(rootVal)
		const index = inorderIndex.get(rootVal)
		root.left = build(inLeft, index - 1)
		root.right = build(index + 1, inRight)
		return root
	}

	return build(0, inorder.length - 1)
}

// Driver for buildTreeFromPreIn
// Pre:  [1,2,4,5,3]
// In:   [4,2,5,1,3]
// Tree structure:
//      1
//     / \
//    2   3
//   / \
//  4   5
const d14_pre = [1, 2, 4, 5, 3]
const d14_in = [4, 2, 5, 1, 3]
const d14_tree = buildTreeFromPreIn(d14_pre, d14_in)
console.log('\n=== BUILD FROM PRE+INORDER ===')
console.log('buildTreeFromPreIn size ->', sizeOfTree(d14_tree)) // 5
console.log('buildTreeFromPreIn root value ->', d14_tree.value) // 1
console.log('buildTreeFromPreIn leaves ->', getLeafNodes(d14_tree)) // [4,5,3]
printTree(d14_tree)

// Construct from inorder + level-order
// Idea: Level-order gives root first. Partition inorder into left/right. To
// build left and right level arrays, filter level-order preserving order.
// This approach is O(n^2) in naive form, but acceptable for moderate sizes.
function buildTreeFromInLevel(inorder, levelorder) {
	if (
		!inorder.length ||
		!levelorder.length ||
		inorder.length !== levelorder.length
	)
		return null

	function build(inLeft, inRight, levelArr) {
		if (inLeft > inRight) return null
		// first element of levelArr that exists in inorder[inLeft..inRight] is root
		let rootVal = null
		let rootIndex = -1
		for (const val of levelArr) {
			const idx = inorder.indexOf(val)
			if (idx >= inLeft && idx <= inRight) {
				rootVal = val
				rootIndex = idx
				break
			}
		}
		if (rootVal === null) return null
		const root = new TreeNode(rootVal)
		// build level arrays for left and right
		const leftLevel = []
		const rightLevel = []
		for (const val of levelArr) {
			const idx = inorder.indexOf(val)
			if (idx >= inLeft && idx < rootIndex) leftLevel.push(val)
			else if (idx > rootIndex && idx <= inRight) rightLevel.push(val)
		}
		root.left = build(inLeft, rootIndex - 1, leftLevel)
		root.right = build(rootIndex + 1, inRight, rightLevel)
		return root
	}

	return build(0, inorder.length - 1, levelorder)
}

// Driver for buildTreeFromInLevel
// In:    [4,2,5,1,3]
// Level: [1,2,3,4,5]
// Tree structure:
//      1
//     / \
//    2   3
//   / \
//  4   5
const d15_in = [4, 2, 5, 1, 3]
const d15_level = [1, 2, 3, 4, 5]
const d15_tree = buildTreeFromInLevel(d15_in, d15_level)
console.log('\n=== BUILD FROM INORDER+LEVEL ===')
console.log('buildTreeFromInLevel size ->', sizeOfTree(d15_tree)) // 5
console.log('buildTreeFromInLevel root value ->', d15_tree.value) // 1
console.log('buildTreeFromInLevel leaves ->', getLeafNodes(d15_tree)) // [4,5,3]
printTree(d15_tree)

// 15) Print all ancestor nodes for a given node value
// Problem: Return list of ancestors (from parent up to root) for the node that
// has the given value. If node not found, return empty array.
// Idea: Find path from root to node via DFS; the path minus the node are ancestors.
function getAncestors(root, target) {
	const path = []
	function dfs(n) {
		if (!n) return false
		if (n.value === target) return true
		path.push(n.value)
		if (dfs(n.left) || dfs(n.right)) return true
		path.pop()
		return false
	}
	const found = dfs(root)
	if (!found) return []
	return path // path contains ancestors from root down to parent
}

// Driver for getAncestors
// Tree d16_root (larger):
//       1
//      / \
//     2   3
//    / \
//   4   5
const d16_root = new TreeNode(
	1,
	new TreeNode(2, new TreeNode(4), new TreeNode(5)),
	new TreeNode(3),
)
console.log('getAncestors d16 (5) ->', getAncestors(d16_root, 5)) // [1,2]
console.log('getAncestors d16 (3) ->', getAncestors(d16_root, 3)) // [1]
console.log('getAncestors d16 (1) ->', getAncestors(d16_root, 1)) // []

// ------------------ Driver / Example usage (summary)
// Small example tree and a few console logs demonstrating functions
const exampleRoot = new TreeNode(
	10,
	new TreeNode(5, new TreeNode(2), new TreeNode(7)),
	new TreeNode(15, null, new TreeNode(20)),
)

console.log('Example tree size:', sizeOfTree(exampleRoot))
console.log('Maximum value in tree:', findMax(exampleRoot))
console.log('Leaf nodes:', getLeafNodes(exampleRoot))

// Export all new functions for potential testing/usage
if (typeof module !== 'undefined' && module.exports) {
	Object.assign(module.exports, {
		findMax,
		containsValue,
		insertIntoBinaryTree,
		sizeOfTree,
		deleteFromBinaryTree,
		height,
		depthOfNode,
		getLeafNodes,
		getHalfNodes,
		maxSumLevel,
		getRootToLeafPathsBT,
		mirrorTree,
		areMirrors,
		buildTreeFromPreIn,
		buildTreeFromInLevel,
		getAncestors,
	})
}
