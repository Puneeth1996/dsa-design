/*
Tree Traversals — implementations and quick examples

Includes recursive and iterative versions of:
 - Preorder (root, left, right)
 - Inorder  (left, root, right)
 - Postorder(left, right, root)
 - Level-order (BFS)

Each traversal returns an array of visited node values.
*/

class TreeNode {
	constructor(value, left = null, right = null) {
		this.value = value
		this.left = left
		this.right = right
	}
}

// Recursive traversals ----------------------------------------------------
// Preorder (recursive)
// Time: O(n) — visits every node once.
// Space: O(h) recursion stack (h = tree height). Output array uses O(n).
// Worst-case space: O(n) for skewed trees.
function preorder(root) {
	const out = []
	function dfs(n) {
		if (!n) return
		out.push(n.value)
		dfs(n.left)
		dfs(n.right)
	}
	dfs(root)
	return out
}

// Inorder (recursive)
// Time: O(n) — visits every node once.
// Space: O(h) recursion stack. Output array uses O(n).
// Worst-case space: O(n) for skewed trees.
function inorder(root) {
	const out = []
	function dfs(n) {
		if (!n) return
		dfs(n.left)
		out.push(n.value)
		dfs(n.right)
	}
	dfs(root)
	return out
}

// Postorder (recursive)
// Time: O(n) — visits every node once.
// Space: O(h) recursion stack. Output array uses O(n).
// Worst-case space: O(n) for skewed trees.
function postorder(root) {
	const out = []
	function dfs(n) {
		if (!n) return
		dfs(n.left)
		dfs(n.right)
		out.push(n.value)
	}
	dfs(root)
	return out
}

// Iterative traversals ---------------------------------------------------
// Preorder (iterative)
// Time: O(n) — each node pushed/popped at most once.
// Space: O(h) stack for traversal (worst-case O(n) for skewed trees). Output array uses O(n).
function preorderIterative(root) {
	if (!root) return []
	const stack = [root]
	const out = []
	while (stack.length) {
		const node = stack.pop()
		out.push(node.value)
		if (node.right) stack.push(node.right)
		if (node.left) stack.push(node.left)
	}
	return out
}

// Inorder (iterative)
// Time: O(n) — each node visited once.
// Space: O(h) stack for traversal (worst-case O(n) for skewed trees). Output array uses O(n).
function inorderIterative(root) {
	const out = []
	const stack = []
	let curr = root
	while (curr || stack.length) {
		while (curr) {
			stack.push(curr)
			curr = curr.left
		}
		curr = stack.pop()
		out.push(curr.value)
		curr = curr.right
	}
	return out
}

// Postorder (iterative, two-stack method)
// Time: O(n) — each node pushed/popped a constant number of times.
// Space: O(n) due to two stacks in worst case. Output array uses O(n).
function postorderIterative(root) {
	// Using two stacks method
	if (!root) return []
	const s1 = [root]
	const s2 = []
	while (s1.length) {
		const n = s1.pop()
		s2.push(n)
		if (n.left) s1.push(n.left)
		if (n.right) s1.push(n.right)
	}
	return s2.reverse().map((n) => n.value)
}

// Level-order (BFS)
// Time: O(n) — each node is enqueued and dequeued once.
// Space: O(w) where w is max width of the tree (worst-case O(n)). Output array uses O(n).
function levelOrder(root) {
	const out = []
	if (!root) return out
	const q = [root]
	while (q.length) {
		const n = q.shift()
		out.push(n.value)
		if (n.left) q.push(n.left)
		if (n.right) q.push(n.right)
	}
	return out
}

// Example tree
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

console.log('Preorder (recursive):', preorder(exampleRoot))
console.log('Preorder (iterative):', preorderIterative(exampleRoot))
console.log('Inorder (recursive):', inorder(exampleRoot))
console.log('Inorder (iterative):', inorderIterative(exampleRoot))
console.log('Postorder (recursive):', postorder(exampleRoot))
console.log('Postorder (iterative):', postorderIterative(exampleRoot))
console.log('Level-order (BFS):', levelOrder(exampleRoot))

// -----------------------------------------------------------------------------
// N-ary (generic) tree: concept and a simple traversal example
// - Definition: each node holds an array of children (0..k children). Not limited
//   to two children like a binary tree.
// - Use-cases: file system / directory trees, DOM, organization charts, game trees.
// - Traversals: generalize preorder/postorder by iterating over the children array.
// - Complexity (visiting all nodes): Time O(n), Space O(h) recursion stack (h = height).
//   Output array requires O(n) space as well.

class NaryNode {
	constructor(value, children = []) {
		this.value = value
		this.children = children
	}
}

// Preorder for N-ary tree (root, then children left-to-right)
function preorderNary(root) {
	const out = []
	function dfs(n) {
		if (!n) return
		out.push(n.value)
		for (const c of n.children) dfs(c)
	}
	dfs(root)
	return out
}

// Level-order (BFS) for N-ary tree
// Time: O(n) — each node enqueued and dequeued once.
// Space: O(w) where w is max width of the tree.
function levelOrderNary(root) {
	const out = []
	if (!root) return out
	const q = [root]
	while (q.length) {
		const n = q.shift()
		out.push(n.value)
		for (const c of n.children) {
			if (c) q.push(c)
		}
	}
	return out
}

// Example N-ary tree (expanded with more nodes)
//           A
//       /   |   \
//      B    C    D
//     / \  / \   |
//    G  H E  F   K
//        / \
//       I   J
const nRoot = new NaryNode('A', [
	new NaryNode('B', [new NaryNode('G'), new NaryNode('H')]),
	new NaryNode('C', [
		new NaryNode('E'),
		new NaryNode('F', [new NaryNode('I'), new NaryNode('J')]),
	]),
	new NaryNode('D', [new NaryNode('K')]),
])

console.log('N-ary preorder (example):', preorderNary(nRoot))
console.log('N-ary level-order (example):', levelOrderNary(nRoot))
