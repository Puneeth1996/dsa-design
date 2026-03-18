// ============================================================
// BINARY SEARCH TREE (BST) - Complete Guide
// ============================================================
// BST Property: left < root < right (at every node)
//
// Example BST used throughout:
//
//          7          <- Level 1 (root)
//         / \
//        4   9        <- Level 2
//       / \
//      2   5          <- Level 3
//
//   BST property check:
//   - 4 < 7 (left of root) ✓     9 > 7 (right of root) ✓
//   - 2 < 4 (left of 4)   ✓     5 > 4 (right of 4)    ✓
// ============================================================

class Node {
	constructor(val) {
		this.val = val
		this.left = null
		this.right = null
	}
}

class BST {
	constructor() {
		this.root = null
	}

	// ----------------------------------------------------------
	// INSERT
	// ----------------------------------------------------------
	// Logic: If val < node go left, if val > node go right.
	//        Insert at the null spot found.
	//
	// Time:  O(h) — h = height. O(log n) balanced, O(n) skewed
	// Space: O(h) call stack for recursion
	// ----------------------------------------------------------
	insert(val) {
		const node = new Node(val)
		if (!this.root) {
			this.root = node
			return this
		}
		let cur = this.root
		while (true) {
			if (val === cur.val) return this // duplicates ignored
			if (val < cur.val) {
				if (!cur.left) {
					cur.left = node
					return this
				}
				cur = cur.left
			} else {
				if (!cur.right) {
					cur.right = node
					return this
				}
				cur = cur.right
			}
		}
	}

	// ----------------------------------------------------------
	// SEARCH
	// ----------------------------------------------------------
	// Logic: Compare val with current node, go left or right.
	//        Return node if found, null otherwise.
	//
	// Time:  O(h) — O(log n) balanced, O(n) skewed
	// Space: O(1) iterative
	// ----------------------------------------------------------
	search(val) {
		let cur = this.root
		while (cur) {
			if (val === cur.val) return cur
			cur = val < cur.val ? cur.left : cur.right
		}
		return null
	}

	// ----------------------------------------------------------
	// DELETE — 3 Cases
	// ----------------------------------------------------------
	// Case 1: Leaf node (no children)  → just remove it
	// Case 2: One child                → replace node with child
	// Case 3: Two children             → replace with inorder
	//         successor (smallest in right subtree), then delete
	//         that successor from right subtree
	//
	// Time:  O(h)
	// Space: O(h) call stack
	// ----------------------------------------------------------
	delete(val) {
		this.root = this._deleteNode(this.root, val)
	}

	_deleteNode(node, val) {
		if (!node) return null

		if (val < node.val) {
			node.left = this._deleteNode(node.left, val)
		} else if (val > node.val) {
			node.right = this._deleteNode(node.right, val)
		} else {
			// Case 1: Leaf node
			if (!node.left && !node.right) return null

			// Case 2: One child
			if (!node.left) return node.right
			if (!node.right) return node.left

			// Case 3: Two children — find inorder successor
			let successor = node.right
			while (successor.left) successor = successor.left
			node.val = successor.val
			node.right = this._deleteNode(node.right, successor.val)
		}
		return node
	}

	// Helper: inorder print to verify BST
	inorder(node = this.root, result = []) {
		if (!node) return result
		this.inorder(node.left, result)
		result.push(node.val)
		this.inorder(node.right, result)
		return result
	}
}

// ------ Build the example BST ------
//
//      7
//     / \
//    4   9
//   / \
//  2   5
//
const bst = new BST()
;[7, 4, 9, 2, 5].forEach((v) => bst.insert(v))

console.log('=== INSERT ===')
console.log('Inorder after building:', bst.inorder()) // [2, 4, 5, 7, 9]

console.log('\n=== SEARCH ===')
console.log('Search 4:', bst.search(4))   // Node { val: 4, ... }
console.log('Search 6:', bst.search(6))   // null

console.log('\n=== DELETE ===')
// Case 1: Delete leaf node 2
bst.delete(2)
console.log('After deleting leaf 2:', bst.inorder())       // [4, 5, 7, 9]

// Case 2: Delete node with one child — 4 (only right child 5 remains after 2 removed)
bst.delete(4)
console.log('After deleting one-child node 4:', bst.inorder()) // [5, 7, 9]

// Case 3: Rebuild and delete node with two children — 4 (has left:2, right:5)
const bst2 = new BST()
;[7, 4, 9, 2, 5].forEach((v) => bst2.insert(v))
bst2.delete(4)
console.log('After deleting two-children node 4:', bst2.inorder()) // [2, 5, 7, 9]

// ============================================================
// BST TYPES
// ============================================================
//
// BALANCED BST
//   Height difference between left and right subtree of any
//   node is at most 1. Guarantees O(log n) operations.
//   Example: AVL Tree, Red-Black Tree
//
//        50
//       /  \
//      30   70
//     / \   / \
//    20  40 60  80
//
// FULL BST (Full Binary Tree)
//   Every node has 0 or 2 children. No node has exactly 1 child.
//
//        50
//       /  \
//      30   70
//     / \
//    20  40
//
// COMPLETE BST (Complete Binary Tree)
//   All levels are fully filled except possibly the last,
//   which is filled from left to right.
//
//        50
//       /  \
//      30   70
//     / \  /
//    20  40 60
//
// PERFECT BST (Perfect Binary Tree)
//   All internal nodes have 2 children AND all leaves are at
//   the same level. A perfect BST with height h has 2^h - 1 nodes.
//
//        50
//       /  \
//      30   70
//     / \  / \
//    20 40 60 80
//
// ============================================================

// ============================================================
// BST PROBLEMS
// ============================================================

// ----------------------------------------------------------
// 1. SEARCH IN BST (LeetCode 700)
// ----------------------------------------------------------
// Time: O(h)  Space: O(1)
// ----------------------------------------------------------
function searchBST(root, val) {
	while (root) {
		if (val === root.val) return root
		root = val < root.val ? root.left : root.right
	}
	return null
}

// ----------------------------------------------------------
// 2. INSERT INTO BST (LeetCode 701)
// ----------------------------------------------------------
// Time: O(h)  Space: O(h)
// ----------------------------------------------------------
function insertIntoBST(root, val) {
	if (!root) return new Node(val)
	if (val < root.val) root.left = insertIntoBST(root.left, val)
	else root.right = insertIntoBST(root.right, val)
	return root
}

// ----------------------------------------------------------
// 3. VALIDATE BST (LeetCode 98)
// ----------------------------------------------------------
// Logic: Each node must be within (min, max) bounds.
//        Left subtree: max bound = current node val
//        Right subtree: min bound = current node val
//
// Time: O(n)  Space: O(h)
// ----------------------------------------------------------
function isValidBST(root, min = -Infinity, max = Infinity) {
	if (!root) return true
	if (root.val <= min || root.val >= max) return false
	return (
		isValidBST(root.left, min, root.val) &&
		isValidBST(root.right, root.val, max)
	)
}

// ----------------------------------------------------------
// 4. LOWEST COMMON ANCESTOR IN BST (LeetCode 235)
// ----------------------------------------------------------
// Logic: If both p and q are less than root → go left
//        If both p and q are greater than root → go right
//        Otherwise root is the LCA (split point)
//
// Time: O(h)  Space: O(1)
// ----------------------------------------------------------
function lowestCommonAncestor(root, p, q) {
	while (root) {
		if (p.val < root.val && q.val < root.val) root = root.left
		else if (p.val > root.val && q.val > root.val) root = root.right
		else return root
	}
	return null
}

// ----------------------------------------------------------
// 5. INORDER SUCCESSOR IN BST
// ----------------------------------------------------------
// Logic: Inorder successor = smallest node GREATER than p.
//        If p has right subtree → leftmost node in right subtree
//        Otherwise → last ancestor where we went left
//
// Tree:      7
//           / \
//          4   9
//         / \
//        2   5
//
// Inorder: [2, 4, 5, 7, 9]
// successor(4) = 5   (next in inorder)
// successor(5) = 7   (go up, last left-turn ancestor)
// successor(9) = null (no node greater than 9)
//
// Time: O(h)  Space: O(1)
// ----------------------------------------------------------
function inorderSuccessor(root, p) {
	let successor = null
	while (root) {
		if (p.val < root.val) {
			successor = root // potential successor
			root = root.left
		} else {
			root = root.right
		}
	}
	return successor
}

// ----------------------------------------------------------
// 5b. INORDER PREDECESSOR IN BST
// ----------------------------------------------------------
// Logic: Inorder predecessor = largest node SMALLER than p.
//        If p has left subtree → rightmost node in left subtree
//        Otherwise → last ancestor where we went right
//
// Inorder: [2, 4, 5, 7, 9]
// predecessor(4) = 2   (rightmost of left subtree)
// predecessor(7) = 5   (go up, last right-turn ancestor)
// predecessor(2) = null (no node smaller than 2)
//
// Time: O(h)  Space: O(1)
// ----------------------------------------------------------
function inorderPredecessor(root, p) {
	let predecessor = null
	while (root) {
		if (p.val > root.val) {
			predecessor = root // potential predecessor
			root = root.right
		} else {
			root = root.left
		}
	}
	return predecessor
}

// ----------------------------------------------------------
// 6. RANGE SUM IN BST (LeetCode 938)
// ----------------------------------------------------------
// Logic: Only recurse into subtrees that can contain values
//        in [low, high]. Prune left if root.val <= low,
//        prune right if root.val >= high.
//
// Time: O(n)  Space: O(h)
// ----------------------------------------------------------
function rangeSumBST(root, low, high) {
	if (!root) return 0
	let sum = 0
	if (root.val >= low && root.val <= high) sum += root.val
	if (root.val > low) sum += rangeSumBST(root.left, low, high)
	if (root.val < high) sum += rangeSumBST(root.right, low, high)
	return sum
}

// ----------------------------------------------------------
// 7. CONVERT SORTED ARRAY TO BST (LeetCode 108)
// ----------------------------------------------------------
// Logic: Pick middle element as root (ensures balanced tree).
//        Recursively do the same for left and right halves.
//
// Time: O(n)  Space: O(log n) call stack
// ----------------------------------------------------------
function sortedArrayToBST(nums) {
	if (!nums.length) return null
	const mid = Math.floor(nums.length / 2)
	const node = new Node(nums[mid])
	node.left = sortedArrayToBST(nums.slice(0, mid))
	node.right = sortedArrayToBST(nums.slice(mid + 1))
	return node
}

// ============================================================
// DEMO — Search, Insert, Delete, Predecessor, Successor
// ============================================================
//
// Working tree:
//
//      7
//     / \
//    4   9
//   / \
//  2   5
//
// Inorder: [2, 4, 5, 7, 9]
// ============================================================

const tree = new BST()
;[7, 4, 9, 2, 5].forEach((v) => tree.insert(v))

// --- SEARCH ---
console.log('\n=== SEARCH ===')
// Walk: 4 < 7 → go left → found 4
console.log('Search 4:', tree.search(4)?.val)  // 4
// Walk: 6 < 7 → left → 6 > 4 → right → 6 > 5 → right → null
console.log('Search 6:', tree.search(6))       // null

// --- INSERT ---
console.log('\n=== INSERT ===')
// Insert 6: 6 < 7 → left → 6 > 4 → right → 6 > 5 → right → place here
//      7
//     / \
//    4   9
//   / \
//  2   5
//       \
//        6   ← inserted
tree.insert(6)
console.log('After inserting 6:', tree.inorder()) // [2, 4, 5, 6, 7, 9]

// --- DELETE ---
console.log('\n=== DELETE ===')
// Case 1 — leaf: delete 6 (no children → just remove)
tree.delete(6)
console.log('Delete leaf 6:', tree.inorder())              // [2, 4, 5, 7, 9]

// Case 2 — one child: delete 2 (leaf after this, but let's use 9 which has no children)
// Actually delete 2 (leaf) then show 4 has one child (5)
tree.delete(2)
// Now 4 has only right child 5
// delete 4 → replaced by its only child 5
tree.delete(4)
console.log('Delete one-child node 4:', tree.inorder())    // [5, 7, 9]

// Case 3 — two children: rebuild, delete 4 (has left:2, right:5)
const tree2 = new BST()
;[7, 4, 9, 2, 5].forEach((v) => tree2.insert(v))
// delete 4 → inorder successor is 5 → replace 4 with 5, remove 5 from right
tree2.delete(4)
console.log('Delete two-children node 4:', tree2.inorder()) // [2, 5, 7, 9]

// --- INORDER SUCCESSOR & PREDECESSOR ---
// Rebuild fresh tree for clarity
const tree3 = new BST()
;[7, 4, 9, 2, 5].forEach((v) => tree3.insert(v))
// Inorder: [2, 4, 5, 7, 9]

console.log('\n=== INORDER SUCCESSOR ===')
// successor(2) → next greater = 4
console.log('Successor of 2:', inorderSuccessor(tree3.root, tree3.search(2))?.val)  // 4
// successor(4) → has right subtree, leftmost of right = 5
console.log('Successor of 4:', inorderSuccessor(tree3.root, tree3.search(4))?.val)  // 5
// successor(5) → no right subtree, last left-turn ancestor = 7
console.log('Successor of 5:', inorderSuccessor(tree3.root, tree3.search(5))?.val)  // 7
// successor(9) → largest node, no successor
console.log('Successor of 9:', inorderSuccessor(tree3.root, tree3.search(9)))       // null

console.log('\n=== INORDER PREDECESSOR ===')
// predecessor(9) → prev smaller = 7
console.log('Predecessor of 9:', inorderPredecessor(tree3.root, tree3.search(9))?.val) // 7
// predecessor(7) → has left subtree, rightmost of left = 5
console.log('Predecessor of 7:', inorderPredecessor(tree3.root, tree3.search(7))?.val) // 5
// predecessor(4) → has left subtree, rightmost of left = 2
console.log('Predecessor of 4:', inorderPredecessor(tree3.root, tree3.search(4))?.val) // 2
// predecessor(2) → smallest node, no predecessor
console.log('Predecessor of 2:', inorderPredecessor(tree3.root, tree3.search(2)))      // null

// ============================================================
// COMPLEXITY SUMMARY
// ============================================================
//
//  Operation              Balanced BST    Skewed BST (worst)
//  ─────────────────────────────────────────────────────────
//  Insert                 O(log n)        O(n)
//  Search                 O(log n)        O(n)
//  Delete                 O(log n)        O(n)
//  Validate BST           O(n)            O(n)
//  LCA                    O(log n)        O(n)
//  Inorder Successor      O(log n)        O(n)
//  Range Sum              O(n)            O(n)
//  Sorted Array to BST    O(n)            O(n)
//
//  Space (all recursive)  O(log n)        O(n)  [call stack]
//  Space (iterative)      O(1)            O(1)
// ============================================================
