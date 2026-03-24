
// ============================================================
// EXPRESSION TREES — Complete Guide
// ============================================================
//
// DEFINITION:
//   An Expression Tree is a binary tree where:
//   - LEAF nodes hold OPERANDS (numbers or variables)
//   - INTERNAL nodes hold OPERATORS (+, -, *, /, ^)
//   The tree structure encodes operator precedence and
//   associativity without needing parentheses.
//
// WHY EXPRESSION TREES?
//   - Compilers use them to represent and evaluate expressions
//   - Easy to evaluate, differentiate, or simplify expressions
//   - Inorder traversal  → infix  (with parentheses)
//   - Preorder traversal → prefix (Polish notation)
//   - Postorder traversal→ postfix (Reverse Polish Notation)
//
// ============================================================
// VISUAL — Expression: (3 + 4) * (5 - 2)
// ============================================================
//
//            *           ← root (last operation performed)
//           / \
//          +   -         ← sub-expressions
//         / \ / \
//        3  4 5  2       ← operands (leaves)
//
//   Postorder (evaluate bottom-up): 3 4 + 5 2 - *
//   Preorder  (prefix):             * + 3 4 - 5 2
//   Inorder   (infix):              ((3+4)*(5-2))
//
// ============================================================
// ANOTHER EXAMPLE — Expression: a * b + c / d
// ============================================================
//
//            +
//           / \
//          *   /
//         / \ / \
//        a  b c  d
//
//   Operator precedence is BAKED INTO the tree structure.
//   * and / are lower in the tree than + because they bind
//   tighter — they are evaluated first (bottom-up).
//
// ============================================================
// HOW TO BUILD FROM POSTFIX (easiest approach)
// ============================================================
//
//   Postfix: 3 4 + 5 2 - *
//
//   Algorithm (use a stack):
//   - If token is OPERAND  → push new node onto stack
//   - If token is OPERATOR → pop two nodes (right then left),
//     make them children of a new operator node, push result
//
//   Step-by-step:
//   Token  Stack
//   3      [3]
//   4      [3, 4]
//   +      pop 4(right), pop 3(left) → (+,3,4)     → [(+,3,4)]
//   5      [(+,3,4), 5]
//   2      [(+,3,4), 5, 2]
//   -      pop 2(right), pop 5(left) → (-,5,2)     → [(+,3,4),(-,5,2)]
//   *      pop (-,5,2)(right), pop (+,3,4)(left)   → [(*,(+,3,4),(-,5,2))]
//
//   Result:
//            *
//           / \
//          +   -
//         / \ / \
//        3  4 5  2   ✓
//
// ============================================================
// EVALUATION (Postorder traversal)
// ============================================================
//
//   evaluate(node):
//     if leaf → return node.val
//     L = evaluate(node.left)
//     R = evaluate(node.right)
//     return applyOperator(node.val, L, R)
//
//   For (*,(+,3,4),(-,5,2)):
//     evaluate(+) = 3 + 4 = 7
//     evaluate(-) = 5 - 2 = 3
//     evaluate(*) = 7 * 3 = 21  ✓
//
// ============================================================
// EXPRESSION TREE IMPLEMENTATION
// ============================================================

class ExprNode {
	constructor(val) {
		this.val = val // operator ('+','-','*','/') or operand
		this.left = null
		this.right = null
	}
}

const OPERATORS = new Set(['+', '-', '*', '/', '^'])

// ----------------------------------------------------------
// BUILD from postfix token array
// e.g. ['3','4','+','5','2','-','*']
// ----------------------------------------------------------
// Time: O(n)  Space: O(n)
// ----------------------------------------------------------
function buildFromPostfix(tokens) {
	const stack = []
	for (const token of tokens) {
		const node = new ExprNode(token)
		if (OPERATORS.has(token)) {
			node.right = stack.pop() // right operand popped first
			node.left = stack.pop()
		}
		stack.push(node)
	}
	return stack[0]
}

// ----------------------------------------------------------
// BUILD from infix string — respects precedence & parentheses
// Supports: + - * / ^ and parentheses
// e.g. "3 + 4 * 5 - 2"  or  "(3+4)*(5-2)"
// ----------------------------------------------------------
// Algorithm: Two-stack (operator stack + node stack)
// Time: O(n)  Space: O(n)
// ----------------------------------------------------------
function buildFromInfix(expr) {
	const precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
	const nodes = [] // operand/subtree stack
	const ops = [] // operator stack

	function applyOp() {
		const op = ops.pop()
		const right = nodes.pop()
		const left = nodes.pop()
		const node = new ExprNode(op)
		node.left = left
		node.right = right
		nodes.push(node)
	}

	const tokens = expr.match(/\d+(\.\d+)?|[a-zA-Z]+|[+\-*/^()]/g) || []

	for (const token of tokens) {
		if (token === '(') {
			ops.push(token)
		} else if (token === ')') {
			while (ops.at(-1) !== '(') applyOp()
			ops.pop()
		} else if (OPERATORS.has(token)) {
			const rightAssoc = token === '^'
			while (
				ops.length &&
				ops.at(-1) !== '(' &&
				OPERATORS.has(ops.at(-1)) &&
				(rightAssoc
					? precedence[ops.at(-1)] > precedence[token]
					: precedence[ops.at(-1)] >= precedence[token])
			)
				applyOp()
			ops.push(token)
		} else {
			nodes.push(new ExprNode(isNaN(token) ? token : Number(token)))
		}
	}
	while (ops.length) applyOp()
	return nodes[0]
}

// ----------------------------------------------------------
// EVALUATE — numeric operands only
// ----------------------------------------------------------
// Time: O(n)  Space: O(h)
// ----------------------------------------------------------
function evaluate(node) {
	if (!node) return 0
	if (!OPERATORS.has(node.val)) return Number(node.val)
	const L = evaluate(node.left)
	const R = evaluate(node.right)
	switch (node.val) {
		case '+':
			return L + R
		case '-':
			return L - R
		case '*':
			return L * R
		case '/':
			return L / R
		case '^':
			return Math.pow(L, R)
	}
}

// ----------------------------------------------------------
// TRAVERSALS — recover expression strings
// ----------------------------------------------------------

// Inorder → fully parenthesized infix (unambiguous)
function toInfix(node) {
	if (!node) return ''
	if (!OPERATORS.has(node.val)) return String(node.val)
	return `(${toInfix(node.left)}${node.val}${toInfix(node.right)})`
}

// Preorder → prefix / Polish notation
function toPrefix(node) {
	if (!node) return ''
	if (!OPERATORS.has(node.val)) return String(node.val)
	return `${node.val} ${toPrefix(node.left)} ${toPrefix(node.right)}`
}

// Postorder → postfix / Reverse Polish Notation
function toPostfix(node) {
	if (!node) return ''
	if (!OPERATORS.has(node.val)) return String(node.val)
	return `${toPostfix(node.left)} ${toPostfix(node.right)} ${node.val}`
}

// ============================================================
// DEMO — Expression Trees
// ============================================================

console.log('=== EXPRESSION TREE DEMO ===')

// --- Build from postfix ---
console.log('\n-- Build from postfix: (3+4)*(5-2) --')
const exprPostfix = buildFromPostfix(['3', '4', '+', '5', '2', '-', '*'])
console.log('Infix  :', toInfix(exprPostfix)) // ((3+4)*(5-2))
console.log('Prefix :', toPrefix(exprPostfix)) // * + 3 4 - 5 2
console.log('Postfix:', toPostfix(exprPostfix)) // 3 4 + 5 2 - *
console.log('Result :', evaluate(exprPostfix)) // 21

// --- Infix respects precedence ---
console.log("\n-- Build from infix: '3 + 4 * 5 - 2' --")
const exprInfix1 = buildFromInfix('3 + 4 * 5 - 2')
console.log('Infix  :', toInfix(exprInfix1)) // ((3+(4*5))-2)
console.log('Result :', evaluate(exprInfix1)) // 21

// --- Parentheses override precedence ---
console.log("\n-- Build from infix: '(3 + 4) * (5 - 2)' --")
const exprInfix2 = buildFromInfix('(3 + 4) * (5 - 2)')
console.log('Infix  :', toInfix(exprInfix2)) // ((3+4)*(5-2))
console.log('Result :', evaluate(exprInfix2)) // 21

// --- Right-associative exponentiation: 2^3^2 = 2^(3^2) = 512 ---
console.log("\n-- Build from infix: '2 ^ 3 ^ 2' (right-assoc) --")
const exprPow = buildFromInfix('2 ^ 3 ^ 2')
console.log('Infix  :', toInfix(exprPow)) // (2^(3^2))
console.log('Result :', evaluate(exprPow)) // 512

// --- Variable expression (structure only, no evaluation) ---
console.log("\n-- Build from infix: 'a * b + c / d' --")
const exprVar = buildFromInfix('a * b + c / d')
console.log('Infix  :', toInfix(exprVar)) // ((a*b)+(c/d))
console.log('Prefix :', toPrefix(exprVar)) // + * a b / c d
console.log('Postfix:', toPostfix(exprVar)) // a b * c d / +

// ============================================================
// EXPRESSION TREE — COMPLEXITY SUMMARY
// ============================================================
//
//  Operation                    Time    Space
//  ──────────────────────────────────────────
//  Build from postfix           O(n)    O(n)
//  Build from infix             O(n)    O(n)
//  Evaluate                     O(n)    O(h)
//  Infix / Prefix / Postfix     O(n)    O(h)
//
//  n = number of tokens, h = height of tree
//  Balanced expression: h = O(log n)
//  Deeply nested expression: h = O(n)
//
// ============================================================
// TRAVERSAL → NOTATION QUICK REFERENCE
// ============================================================
//
//  Traversal    Notation    Example for (3+4)*(5-2)
//  ──────────────────────────────────────────────────
//  Inorder      Infix       ((3+4)*(5-2))
//  Preorder     Prefix      * + 3 4 - 5 2
//  Postorder    Postfix     3 4 + 5 2 - *
//
//  Postfix used by: stack-based calculators, JVM bytecode
//  Prefix used by: LISP  (* (+ 3 4) (- 5 2))
//
// ============================================================





// ============================================================
// AVL TREE — Complete Guide
// ============================================================
//
// DEFINITION:
//   An AVL tree is a self-balancing Binary Search Tree where
//   the height difference between the left and right subtree
//   of EVERY node is at most 1. This difference is called the
//   "Balance Factor".
//
//   Balance Factor (BF) = height(leftSubtree) - height(rightSubtree)
//   Valid BF values: -1, 0, +1
//   If BF becomes -2 or +2 → tree is unbalanced → rotate to fix
//
// WHY AVL?
//   A plain BST can degrade to O(n) if you insert sorted data:
//     Insert 10, 20, 30, 40 → becomes a right-skewed linked list
//   AVL guarantees O(log n) for insert, search, delete always.
//
// GENERAL PROPERTIES:
//   - Height of AVL with n nodes: h = O(log n)
//   - Min nodes in AVL of height h: N(h) = N(h-1) + N(h-2) + 1
//   - Every AVL tree is a valid BST
//   - After every insert/delete, balance factors are rechecked
//     bottom-up and rotations are applied if needed
//   - At most ONE rotation (single or double) needed per insert
//
// ============================================================
// BALANCE FACTOR VISUAL
// ============================================================
//
//   Node with BF = 0 (perfectly balanced):
//        30  [BF=0]
//       /  \
//      20   40
//
//   Node with BF = +1 (left is taller by 1 — still OK):
//        30  [BF=+1]
//       /
//      20
//
//   Node with BF = -1 (right is taller by 1 — still OK):
//        30  [BF=-1]
//          \
//           40
//
//   Node with BF = +2 (LEFT-HEAVY — UNBALANCED → rotate right):
//        30  [BF=+2]  ← violation!
//       /
//      20
//     /
//    10
//
//   Node with BF = -2 (RIGHT-HEAVY — UNBALANCED → rotate left):
//        10  [BF=-2]  ← violation!
//          \
//           20
//             \
//              30
//
// ============================================================
// THE 4 ROTATIONS — When and Why
// ============================================================
//
// There are exactly 4 imbalance cases, each fixed by a rotation:
//
//  Case          | BF at unbalanced node | BF at child | Fix
//  ──────────────────────────────────────────────────────────
//  Left-Left     | +2                    | +1 or 0     | Right Rotate
//  Right-Right   | -2                    | -1 or 0     | Left Rotate
//  Left-Right    | +2                    | -1          | Left Rotate child, then Right Rotate
//  Right-Left    | -2                    | +1          | Right Rotate child, then Left Rotate
//
// ============================================================

// ============================================================
// ROTATION 1: RIGHT ROTATION (Left-Left Case)
// ============================================================
//
// WHEN: A node becomes LEFT-HEAVY (BF = +2) and its LEFT child
//       is also LEFT-HEAVY or balanced (BF = +1 or 0).
//       This happens when you insert into the LEFT subtree of
//       the LEFT child.
//
// EXAMPLE: Insert 30, 20, 10 into an AVL tree
//
//   Step 1: Insert 30
//        30 [BF=0]   ← balanced
//
//   Step 2: Insert 20
//        30 [BF=+1]  ← still OK
//       /
//      20 [BF=0]
//
//   Step 3: Insert 10
//        30 [BF=+2]  ← VIOLATION! Left-Left case
//       /
//      20 [BF=+1]
//     /
//    10 [BF=0]
//
//   FIX: Right Rotate around 30
//
//   HOW RIGHT ROTATION WORKS:
//     - The LEFT child (20) becomes the new root
//     - The old root (30) becomes the RIGHT child of 20
//     - 20's old RIGHT child (if any) becomes LEFT child of 30
//
//   Before:          After Right Rotate:
//        30               20
//       /                /  \
//      20               10   30
//     /
//    10
//
//   All BFs are now 0 — tree is balanced!
//
// ============================================================

function rotateRight(y) {
	//      y                x
	//     / \             /   \
	//    x   T3   →     T1     y
	//   / \                   / \
	//  T1  T2               T2   T3
	const x = y.left
	const T2 = x.right
	x.right = y // x takes y's place, y goes right
	y.left = T2 // y's left is now x's old right subtree
	y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right))
	x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right))
	return x // x is the new root of this subtree
}

// ============================================================
// ROTATION 2: LEFT ROTATION (Right-Right Case)
// ============================================================
//
// WHEN: A node becomes RIGHT-HEAVY (BF = -2) and its RIGHT child
//       is also RIGHT-HEAVY or balanced (BF = -1 or 0).
//       This happens when you insert into the RIGHT subtree of
//       the RIGHT child.
//
// EXAMPLE: Insert 10, 20, 30 into an AVL tree
//
//   Step 1: Insert 10
//        10 [BF=0]   ← balanced
//
//   Step 2: Insert 20
//        10 [BF=-1]  ← still OK
//          \
//           20 [BF=0]
//
//   Step 3: Insert 30
//        10 [BF=-2]  ← VIOLATION! Right-Right case
//          \
//           20 [BF=-1]
//             \
//              30 [BF=0]
//
//   FIX: Left Rotate around 10
//
//   HOW LEFT ROTATION WORKS:
//     - The RIGHT child (20) becomes the new root
//     - The old root (10) becomes the LEFT child of 20
//     - 20's old LEFT child (if any) becomes RIGHT child of 10
//
//   Before:          After Left Rotate:
//        10               20
//          \             /  \
//           20          10   30
//             \
//              30
//
//   All BFs are now 0 — tree is balanced!
//
// ============================================================

function rotateLeft(x) {
	//    x                  y
	//   / \               /   \
	//  T1   y    →       x     T3
	//      / \          / \
	//     T2  T3       T1  T2
	const y = x.right
	const T2 = y.left
	y.left = x // y takes x's place, x goes left
	x.right = T2 // x's right is now y's old left subtree
	x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right))
	y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right))
	return y // y is the new root of this subtree
}

// ============================================================
// ROTATION 3: LEFT-RIGHT ROTATION (Left-Right Case)
// ============================================================
//
// WHEN: A node becomes LEFT-HEAVY (BF = +2) but its LEFT child
//       is RIGHT-HEAVY (BF = -1).
//       This happens when you insert into the RIGHT subtree of
//       the LEFT child. A single right rotation won't fix it.
//
// EXAMPLE: Insert 30, 10, 20 into an AVL tree
//
//   Step 1: Insert 30
//        30 [BF=0]
//
//   Step 2: Insert 10
//        30 [BF=+1]
//       /
//      10 [BF=0]
//
//   Step 3: Insert 20
//        30 [BF=+2]  ← VIOLATION! Left-Right case
//       /
//      10 [BF=-1]    ← left child is RIGHT-heavy
//        \
//         20 [BF=0]
//
//   FIX: Two steps
//   STEP A — Left Rotate the LEFT child (10):
//        30
//       /
//      20            ← 20 comes up
//     /
//    10              ← 10 goes down-left
//
//   Now it looks like a Left-Left case!
//
//   STEP B — Right Rotate the unbalanced node (30):
//        20
//       /  \
//      10   30
//
//   All BFs are now 0 — tree is balanced!
//
// ============================================================

// ============================================================
// ROTATION 4: RIGHT-LEFT ROTATION (Right-Left Case)
// ============================================================
//
// WHEN: A node becomes RIGHT-HEAVY (BF = -2) but its RIGHT child
//       is LEFT-HEAVY (BF = +1).
//       This happens when you insert into the LEFT subtree of
//       the RIGHT child.
//
// EXAMPLE: Insert 10, 30, 20 into an AVL tree
//
//   Step 1: Insert 10
//        10 [BF=0]
//
//   Step 2: Insert 30
//        10 [BF=-1]
//          \
//           30 [BF=0]
//
//   Step 3: Insert 20
//        10 [BF=-2]  ← VIOLATION! Right-Left case
//          \
//           30 [BF=+1]  ← right child is LEFT-heavy
//          /
//         20 [BF=0]
//
//   FIX: Two steps
//   STEP A — Right Rotate the RIGHT child (30):
//        10
//          \
//           20        ← 20 comes up
//             \
//              30     ← 30 goes down-right
//
//   Now it looks like a Right-Right case!
//
//   STEP B — Left Rotate the unbalanced node (10):
//        20
//       /  \
//      10   30
//
//   All BFs are now 0 — tree is balanced!
//
// ============================================================

// ============================================================
// AVL NODE & HELPER FUNCTIONS
// ============================================================

class AVLNode {
	constructor(val) {
		this.val = val
		this.left = null
		this.right = null
		this.height = 1 // new node starts at height 1
	}
}

function getHeight(node) {
	return node ? node.height : 0
}

function getBalanceFactor(node) {
	return node ? getHeight(node.left) - getHeight(node.right) : 0
}

// ============================================================
// AVL TREE CLASS
// ============================================================

class AVLTree {
	constructor() {
		this.root = null
	}

	// ----------------------------------------------------------
	// INSERT
	// ----------------------------------------------------------
	// Logic:
	//   1. Insert like a normal BST
	//   2. Update height of current node going back up
	//   3. Check balance factor — if ±2, apply the right rotation
	//
	// Time:  O(log n) — tree is always balanced
	// Space: O(log n) — call stack height
	// ----------------------------------------------------------
	insert(val) {
		this.root = this._insert(this.root, val)
	}

	_insert(node, val) {
		// Step 1: Normal BST insert
		if (!node) return new AVLNode(val)
		if (val < node.val) node.left = this._insert(node.left, val)
		else if (val > node.val) node.right = this._insert(node.right, val)
		else return node // duplicates ignored

		// Step 2: Update height
		node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right))

		// Step 3: Get balance factor and rotate if needed
		return this._rebalance(node, val)
	}

	_rebalance(node, val) {
		const bf = getBalanceFactor(node)

		// LEFT-LEFT: inserted into left subtree of left child
		if (bf > 1 && val < node.left.val) return rotateRight(node)

		// RIGHT-RIGHT: inserted into right subtree of right child
		if (bf < -1 && val > node.right.val) return rotateLeft(node)

		// LEFT-RIGHT: inserted into right subtree of left child
		if (bf > 1 && val > node.left.val) {
			node.left = rotateLeft(node.left) // Step A
			return rotateRight(node) // Step B
		}

		// RIGHT-LEFT: inserted into left subtree of right child
		if (bf < -1 && val < node.right.val) {
			node.right = rotateRight(node.right) // Step A
			return rotateLeft(node) // Step B
		}

		return node // already balanced
	}

	// ----------------------------------------------------------
	// SEARCH — same as BST, AVL is always balanced so O(log n)
	// ----------------------------------------------------------
	// Time: O(log n)  Space: O(1)
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
	// DELETE
	// ----------------------------------------------------------
	// Logic:
	//   1. Delete like a normal BST (3 cases)
	//   2. Update height going back up
	//   3. Rebalance using balance factor
	//
	// Time:  O(log n)
	// Space: O(log n)
	// ----------------------------------------------------------
	delete(val) {
		this.root = this._delete(this.root, val)
	}

	_delete(node, val) {
		if (!node) return null

		// Step 1: BST delete
		if (val < node.val) node.left = this._delete(node.left, val)
		else if (val > node.val) node.right = this._delete(node.right, val)
		else {
			if (!node.left) return node.right
			if (!node.right) return node.left
			// Two children: replace with inorder successor
			let successor = node.right
			while (successor.left) successor = successor.left
			node.val = successor.val
			node.right = this._delete(node.right, successor.val)
		}

		// Step 2: Update height
		node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right))

		// Step 3: Rebalance
		const bf = getBalanceFactor(node)

		if (bf > 1 && getBalanceFactor(node.left) >= 0)
			// Left-Left
			return rotateRight(node)
		if (bf > 1 && getBalanceFactor(node.left) < 0) {
			// Left-Right
			node.left = rotateLeft(node.left)
			return rotateRight(node)
		}
		if (bf < -1 && getBalanceFactor(node.right) <= 0)
			// Right-Right
			return rotateLeft(node)
		if (bf < -1 && getBalanceFactor(node.right) > 0) {
			// Right-Left
			node.right = rotateRight(node.right)
			return rotateLeft(node)
		}

		return node
	}

	inorder(node = this.root, res = []) {
		if (!node) return res
		this.inorder(node.left, res)
		res.push(node.val)
		this.inorder(node.right, res)
		return res
	}

	// Print balance factors of all nodes (for debugging)
	printBF(node = this.root) {
		if (!node) return
		this.printBF(node.left)
		console.log(
			`Node ${node.val}: BF=${getBalanceFactor(node)}, height=${node.height}`,
		)
		this.printBF(node.right)
	}
}

// ============================================================
// DEMO — All 4 Rotation Cases
// ============================================================

console.log('\n=== AVL TREE DEMO ===')

// --- Right Rotation (Left-Left Case) ---
console.log('\n-- Right Rotation (Left-Left): Insert 30, 20, 10 --')
// Without AVL: 30 → 20 → 10 (skewed left)
// With AVL:    rotates right → 20 becomes root
const avl1 = new AVLTree()
;[30, 20, 10].forEach((v) => avl1.insert(v))
console.log('Inorder:', avl1.inorder()) // [10, 20, 30]
console.log('Root:', avl1.root.val) // 20 (was 30 before rotation)
avl1.printBF()

// --- Left Rotation (Right-Right Case) ---
console.log('\n-- Left Rotation (Right-Right): Insert 10, 20, 30 --')
// Without AVL: 10 → 20 → 30 (skewed right)
// With AVL:    rotates left → 20 becomes root
const avl2 = new AVLTree()
;[10, 20, 30].forEach((v) => avl2.insert(v))
console.log('Inorder:', avl2.inorder()) // [10, 20, 30]
console.log('Root:', avl2.root.val) // 20 (was 10 before rotation)
avl2.printBF()

// --- Left-Right Rotation ---
console.log('\n-- Left-Right Rotation: Insert 30, 10, 20 --')
// Without AVL: 30 left-heavy, left child 10 right-heavy
// With AVL:    left rotate 10 → right rotate 30 → 20 becomes root
const avl3 = new AVLTree()
;[30, 10, 20].forEach((v) => avl3.insert(v))
console.log('Inorder:', avl3.inorder()) // [10, 20, 30]
console.log('Root:', avl3.root.val) // 20
avl3.printBF()

// --- Right-Left Rotation ---
console.log('\n-- Right-Left Rotation: Insert 10, 30, 20 --')
// Without AVL: 10 right-heavy, right child 30 left-heavy
// With AVL:    right rotate 30 → left rotate 10 → 20 becomes root
const avl4 = new AVLTree()
;[10, 30, 20].forEach((v) => avl4.insert(v))
console.log('Inorder:', avl4.inorder()) // [10, 20, 30]
console.log('Root:', avl4.root.val) // 20
avl4.printBF()

// --- Larger AVL tree (4 levels) ---
console.log('\n-- AVL with many inserts (would skew in plain BST) --')
// Inserting sorted data — plain BST becomes O(n), AVL stays O(log n)
const avl5 = new AVLTree()
;[10, 20, 30, 40, 50, 60, 70].forEach((v) => avl5.insert(v))
console.log('Inorder:', avl5.inorder()) // [10,20,30,40,50,60,70]
console.log('Root:', avl5.root.val) // 40 (balanced mid-point)
console.log('Height:', avl5.root.height) // 3 (log2(7) ≈ 3)
avl5.printBF()

// --- Delete from AVL ---
console.log('\n-- AVL Delete (rebalances after deletion) --')
avl5.delete(10)
console.log('After deleting 10:', avl5.inorder())
avl5.printBF()

// ============================================================
// AVL vs BST COMPARISON
// ============================================================
//
//  Property            Plain BST           AVL Tree
//  ──────────────────────────────────────────────────────────
//  Insert              O(h)                O(log n) always
//  Search              O(h)                O(log n) always
//  Delete              O(h)                O(log n) always
//  Height (worst)      O(n) skewed         O(log n) guaranteed
//  Balance Factor      Not maintained      Always -1, 0, or +1
//  Rotations           None                Up to 1 per insert
//  Extra storage       None                Height per node
//  Best for            Random data         Frequent lookups
//
//  h = height (O(log n) if balanced, O(n) if skewed)
//
// ============================================================
// ROTATION DECISION QUICK REFERENCE
// ============================================================
//
//  BF of           BF of
//  unbalanced node  its child    Case          Fix
//  ──────────────────────────────────────────────────────────
//  +2               +1 or 0      Left-Left     rotateRight(node)
//  -2               -1 or 0      Right-Right   rotateLeft(node)
//  +2               -1           Left-Right    rotateLeft(left)
//                                              then rotateRight(node)
//  -2               +1           Right-Left    rotateRight(right)
//                                              then rotateLeft(node)
//
// ============================================================

// ============================================================
// RED-BLACK TREE — Complete Guide
// ============================================================
//
// DEFINITION:
//   A Red-Black Tree is a self-balancing BST where every node
//   carries an extra bit: COLOR (RED or BLACK).
//   It enforces 5 invariants to keep the tree "approximately
//   balanced" — height is always O(log n).
//
// THE 5 RED-BLACK PROPERTIES:
//   1. Every node is RED or BLACK.
//   2. The ROOT is always BLACK.
//   3. Every NULL leaf (sentinel) is BLACK.
//   4. If a node is RED, both its children are BLACK.
//      (No two consecutive RED nodes on any path.)
//   5. Every path from a node to any of its NULL descendants
//      has the SAME number of BLACK nodes.
//      This count is called "Black-Height" (bh).
//
// WHY RED-BLACK?
//   - AVL is strictly balanced → more rotations on insert/delete
//   - Red-Black is "loosely balanced" → fewer rotations overall
//   - Preferred in practice: Linux kernel, Java TreeMap,
//     C++ std::map, std::set all use Red-Black Trees
//   - Guarantees: worst-case O(log n) for insert, search, delete
//
// HEIGHT GUARANTEE:
//   The longest path (alternating RED-BLACK) is at most
//   2× the shortest path (all BLACK).
//   So height h ≤ 2 * log2(n+1)  →  O(log n)
//
// ============================================================
// COLOR RULES VISUAL
// ============================================================
//
//   Valid Red-Black Tree (B=Black, R=Red):
//
//           10 [B]          ← root is always BLACK
//          /    \
//        5 [R]  15 [R]      ← red nodes have black children
//       / \     / \
//     3[B] 7[B] 12[B] 20[B] ← all leaves at same black-height
//
//   Black-Height = 2 (counting blacks from root to NULL,
//                     not counting root itself)
//
//   INVALID — Two consecutive REDs (violates property 4):
//           10 [B]
//          /
//        5 [R]
//       /
//     3 [R]   ← RED child of RED parent → VIOLATION!
//
//   INVALID — Unequal black-heights (violates property 5):
//           10 [B]
//          /    \
//        5 [B]  15 [B]
//       /
//     3 [B]     ← left path has bh=3, right path has bh=2 → VIOLATION!
//
// ============================================================
// INSERT — Cases and Fixes
// ============================================================
//
// RULE: New nodes are always inserted as RED.
//       (Inserting BLACK would immediately break property 5.)
//
// After inserting RED, check for violations and fix:
//
//  Case 0: Tree is empty → insert as BLACK root. Done.
//
//  Case 1: Parent is BLACK → no violation. Done.
//          (RED child under BLACK parent is always fine.)
//
//  Case 2: Parent is RED, Uncle is also RED → RECOLOR
//          - Color parent BLACK
//          - Color uncle BLACK
//          - Color grandparent RED
//          - Move up to grandparent and recheck
//
//  Case 3: Parent is RED, Uncle is BLACK → ROTATE + RECOLOR
//          (4 sub-cases, same as AVL rotations)
//
// ============================================================
// INSERT EXAMPLE — Step by Step
// ============================================================
//
// Insert: 10, 20, 30, 15, 25
//
// Step 1: Insert 10
//   10 [R] → root must be BLACK → recolor
//   10 [B]
//
// Step 2: Insert 20
//   Parent (10) is BLACK → no violation
//        10 [B]
//          \
//          20 [R]
//
// Step 3: Insert 30
//   Parent (20) is RED, Uncle (NULL) is BLACK → Right-Right case
//   → Left Rotate around 10, recolor
//
//   Before:              After Left Rotate + Recolor:
//        10 [B]                20 [B]
//          \                  /    \
//          20 [R]           10 [R]  30 [R]
//            \
//            30 [R]
//
// Step 4: Insert 15
//   Parent (10) is RED, Uncle (30) is RED → RECOLOR (Case 2)
//   - Color 10 BLACK, color 30 BLACK, color 20 RED
//   - 20 is root → recolor back to BLACK
//
//        20 [B]
//       /    \
//     10 [B]  30 [B]
//       \
//       15 [R]
//
// Step 5: Insert 25
//   Parent (30) is BLACK → no violation
//        20 [B]
//       /    \
//     10 [B]  30 [B]
//       \     /
//       15[R] 25[R]
//
// ============================================================
// THE 4 ROTATION CASES (same structure as AVL)
// ============================================================
//
//  Case          | Situation                    | Fix
//  ──────────────────────────────────────────────────────────
//  Left-Left     | P=RED, U=BLACK, new node     | Right Rotate grandparent
//                | is left child of left parent | swap colors of P and GP
//  Right-Right   | P=RED, U=BLACK, new node     | Left Rotate grandparent
//                | is right child of right parent| swap colors of P and GP
//  Left-Right    | P=RED, U=BLACK, new node     | Left Rotate parent,
//                | is right child of left parent | then Right Rotate GP
//  Right-Left    | P=RED, U=BLACK, new node     | Right Rotate parent,
//                | is left child of right parent | then Left Rotate GP
//
//  (P = parent, U = uncle, GP = grandparent)
//
// ============================================================
// RED-BLACK vs AVL COMPARISON
// ============================================================
//
//  Property            AVL Tree            Red-Black Tree
//  ──────────────────────────────────────────────────────────
//  Balance             Strict (BF ≤ 1)     Loose (bh balanced)
//  Height              ≤ 1.44 log n        ≤ 2 log n
//  Insert rotations    ≤ 2                 ≤ 2
//  Delete rotations    O(log n)            ≤ 3
//  Search speed        Slightly faster     Slightly slower
//  Insert/Delete speed Slightly slower     Slightly faster
//  Extra storage       Height per node     1 bit color per node
//  Best for            Read-heavy          Write-heavy
//  Used in             Databases           OS schedulers, STL
//
// ============================================================
// RED-BLACK TREE IMPLEMENTATION
// ============================================================

const RED = 'RED'
const BLACK = 'BLACK'

class RBNode {
	constructor(val) {
		this.val = val
		this.left = null
		this.right = null
		this.parent = null
		this.color = RED // new nodes always start RED
	}
}

class RedBlackTree {
	constructor() {
		// Sentinel NULL node — all leaves point to this
		this.NIL = new RBNode(null)
		this.NIL.color = BLACK
		this.root = this.NIL
	}

	// ----------------------------------------------------------
	// ROTATIONS (same mechanics as AVL, but also fix parent ptrs)
	// ----------------------------------------------------------
	_rotateLeft(x) {
		//    x                y
		//   / \             /   \
		//  T1   y    →     x     T3
		//      / \        / \
		//     T2  T3     T1  T2
		const y = x.right
		x.right = y.left
		if (y.left !== this.NIL) y.left.parent = x
		y.parent = x.parent
		if (!x.parent) this.root = y
		else if (x === x.parent.left) x.parent.left = y
		else x.parent.right = y
		y.left = x
		x.parent = y
	}

	_rotateRight(y) {
		//      y                x
		//     / \             /   \
		//    x   T3   →     T1     y
		//   / \                   / \
		//  T1  T2               T2   T3
		const x = y.left
		y.left = x.right
		if (x.right !== this.NIL) x.right.parent = y
		x.parent = y.parent
		if (!y.parent) this.root = x
		else if (y === y.parent.left) y.parent.left = x
		else y.parent.right = x
		x.right = y
		y.parent = x
	}

	// ----------------------------------------------------------
	// INSERT
	// ----------------------------------------------------------
	// Time: O(log n)  Space: O(log n)
	// ----------------------------------------------------------
	insert(val) {
		const node = new RBNode(val)
		node.left = this.NIL
		node.right = this.NIL

		// Step 1: Normal BST insert
		let parent = null
		let cur = this.root
		while (cur !== this.NIL) {
			parent = cur
			if (val < cur.val) cur = cur.left
			else if (val > cur.val) cur = cur.right
			else return // duplicate
		}
		node.parent = parent
		if (!parent) this.root = node
		else if (val < parent.val) parent.left = node
		else parent.right = node

		// Step 2: Fix Red-Black violations
		this._fixInsert(node)
	}

	_fixInsert(z) {
		// Keep fixing while parent is RED (violation of property 4)
		while (z.parent && z.parent.color === RED) {
			if (z.parent === z.parent.parent.left) {
				const uncle = z.parent.parent.right

				if (uncle.color === RED) {
					// Case 2: Uncle is RED → recolor
					z.parent.color = BLACK
					uncle.color = BLACK
					z.parent.parent.color = RED
					z = z.parent.parent // move up
				} else {
					if (z === z.parent.right) {
						// Case 3a: Left-Right → rotate parent left first
						z = z.parent
						this._rotateLeft(z)
					}
					// Case 3b: Left-Left → rotate grandparent right
					z.parent.color = BLACK
					z.parent.parent.color = RED
					this._rotateRight(z.parent.parent)
				}
			} else {
				// Mirror: parent is right child of grandparent
				const uncle = z.parent.parent.left

				if (uncle.color === RED) {
					// Case 2 mirror: Uncle is RED → recolor
					z.parent.color = BLACK
					uncle.color = BLACK
					z.parent.parent.color = RED
					z = z.parent.parent
				} else {
					if (z === z.parent.left) {
						// Case 3a mirror: Right-Left → rotate parent right first
						z = z.parent
						this._rotateRight(z)
					}
					// Case 3b mirror: Right-Right → rotate grandparent left
					z.parent.color = BLACK
					z.parent.parent.color = RED
					this._rotateLeft(z.parent.parent)
				}
			}
		}
		this.root.color = BLACK // property 2: root is always BLACK
	}

	// ----------------------------------------------------------
	// SEARCH — same as BST
	// ----------------------------------------------------------
	// Time: O(log n)  Space: O(1)
	// ----------------------------------------------------------
	search(val) {
		let cur = this.root
		while (cur !== this.NIL) {
			if (val === cur.val) return cur
			cur = val < cur.val ? cur.left : cur.right
		}
		return null
	}

	inorder(node = this.root, res = []) {
		if (node === this.NIL) return res
		this.inorder(node.left, res)
		res.push(`${node.val}(${node.color[0]})`) // e.g. "20(B)"
		this.inorder(node.right, res)
		return res
	}
}

// ============================================================
// DEMO — Red-Black Tree
// ============================================================

console.log('\n=== RED-BLACK TREE DEMO ===')

const rbt = new RedBlackTree()
;[10, 20, 30, 15, 25, 5, 1].forEach((v) => rbt.insert(v))

console.log('Inorder (val(color)):', rbt.inorder())
// Each node shows value and B/R color
// Root is always B (Black)

console.log('Root:', rbt.root.val, rbt.root.color) // BLACK
console.log('Search 15:', rbt.search(15)?.val) // 15
console.log('Search 99:', rbt.search(99)) // null

// Verify no two consecutive REDs
function verifyRB(node, NIL) {
	if (node === NIL) return {valid: true, bh: 0}
	if (node.color === RED) {
		if (node.left.color === RED || node.right.color === RED)
			return {valid: false, bh: 0} // consecutive REDs
	}
	const left = verifyRB(node.left, NIL)
	const right = verifyRB(node.right, NIL)
	if (!left.valid || !right.valid || left.bh !== right.bh)
		return {valid: false, bh: 0}
	return {valid: true, bh: left.bh + (node.color === BLACK ? 1 : 0)}
}
const check = verifyRB(rbt.root, rbt.NIL)
console.log('Valid Red-Black Tree:', check.valid) // true
console.log('Black-Height:', check.bh)

// ============================================================
// B-TREE — Complete Guide
// ============================================================
//
// DEFINITION:
//   A B-Tree of order m (also called "minimum degree t") is a
//   self-balancing search tree where each node can hold
//   MULTIPLE keys and have MULTIPLE children.
//   It is designed for systems that read/write large blocks
//   of data (disk, databases, file systems).
//
// WHY B-TREE?
//   - BST/AVL/RB trees store 1 key per node → deep trees
//   - Deep trees = many disk reads (each node = 1 disk block)
//   - B-Tree stores many keys per node → WIDE, SHALLOW tree
//   - Fewer disk reads → much faster for databases/file systems
//   - Used in: MySQL InnoDB, PostgreSQL, SQLite, NTFS, ext4
//
// B-TREE OF ORDER m (Knuth definition):
//   - Every node has at most m children
//   - Every non-root node has at least ⌈m/2⌉ children
//   - Root has at least 2 children (if not a leaf)
//   - All leaves are at the SAME level
//   - A node with k children has exactly k-1 keys
//
// B-TREE WITH MINIMUM DEGREE t (CLRS definition — used here):
//   - Every node has at most 2t-1 keys (and 2t children)
//   - Every non-root node has at least t-1 keys (and t children)
//   - Root has at least 1 key
//   - All leaves are at the same depth
//
// ============================================================
// B-TREE STRUCTURE VISUAL (t=2, so 1-3 keys per node)
// ============================================================
//
//   Insert: 10, 20, 30, 40, 50, 60, 70, 80, 90
//
//   After inserting 10, 20, 30 (node full at 3 keys):
//   [10 | 20 | 30]
//
//   Insert 40 → node has 4 keys → SPLIT at median (20):
//   Median 20 goes UP, left [10] and right [30, 40] become children
//
//          [20]
//         /    \
//       [10]  [30|40]
//
//   Insert 50:
//          [20]
//         /    \
//       [10]  [30|40|50]
//
//   Insert 60 → right child full → split at 40:
//   40 goes up to parent:
//          [20|40]
//         /   |   \
//       [10] [30] [50|60]
//
//   Insert 70, 80:
//          [20|40]
//         /   |   \
//       [10] [30] [50|60|70|80]  ← wait, max is 3 keys (2t-1=3)
//
//   Insert 70 → [50|60|70] (full)
//   Insert 80 → split [50|60|70] at 60, 60 goes up:
//          [20|40|60]
//         /   |   |   \
//       [10] [30] [50] [70|80]
//
//   Insert 90:
//          [20|40|60]
//         /   |   |   \
//       [10] [30] [50] [70|80|90]
//
//   Final B-Tree (t=2):
//          [20|40|60]
//         /   |   |   \
//       [10] [30] [50] [70|80|90]
//
//   All leaves at same level ✓
//   Each node has 1-3 keys ✓
//   Root has 3 keys, 4 children ✓
//
// ============================================================
// B-TREE OPERATIONS
// ============================================================
//
// SEARCH:
//   At each node, binary search among keys.
//   If key found → return. If key < keys[i] → go to child[i].
//   Time: O(log n) — but each "step" reads a whole disk block
//
// INSERT:
//   1. Find the correct leaf (like BST search)
//   2. Insert key into leaf
//   3. If leaf overflows (has 2t keys) → SPLIT:
//      - Median key moves UP to parent
//      - Left half stays, right half becomes new sibling
//   4. If parent overflows → split parent too (propagate up)
//   5. If root splits → new root is created (tree grows UP)
//
// DELETE:
//   More complex — 3 cases:
//   Case 1: Key in leaf → just remove
//   Case 2: Key in internal node → replace with inorder
//           predecessor/successor (from a leaf), then delete from leaf
//   Case 3: Key in internal node, child has only t-1 keys →
//           "fix" child first (borrow from sibling or merge)
//
// ============================================================
// B-TREE IMPLEMENTATION (minimum degree t)
// ============================================================

class BTreeNode {
	constructor(isLeaf = true) {
		this.keys = [] // sorted array of keys
		this.children = [] // array of child BTreeNodes
		this.isLeaf = isLeaf
	}
}

class BTree {
	constructor(t = 2) {
		this.t = t // minimum degree (each node has t-1 to 2t-1 keys)
		this.root = new BTreeNode(true)
	}

	// ----------------------------------------------------------
	// SEARCH
	// ----------------------------------------------------------
	// Time: O(log n)  Space: O(1)
	// ----------------------------------------------------------
	search(val, node = this.root) {
		let i = 0
		while (i < node.keys.length && val > node.keys[i]) i++
		if (i < node.keys.length && val === node.keys[i]) return node
		if (node.isLeaf) return null
		return this.search(val, node.children[i])
	}

	// ----------------------------------------------------------
	// INSERT
	// ----------------------------------------------------------
	// Time: O(log n)  Space: O(log n)
	// ----------------------------------------------------------
	insert(val) {
		const root = this.root
		if (root.keys.length === 2 * this.t - 1) {
			// Root is full → split root → tree grows taller
			const newRoot = new BTreeNode(false)
			newRoot.children.push(this.root)
			this._splitChild(newRoot, 0)
			this.root = newRoot
		}
		this._insertNonFull(this.root, val)
	}

	_insertNonFull(node, val) {
		let i = node.keys.length - 1
		if (node.isLeaf) {
			// Insert into sorted position in leaf
			node.keys.push(null)
			while (i >= 0 && val < node.keys[i]) {
				node.keys[i + 1] = node.keys[i]
				i--
			}
			node.keys[i + 1] = val
		} else {
			// Find correct child to descend into
			while (i >= 0 && val < node.keys[i]) i--
			i++
			if (node.children[i].keys.length === 2 * this.t - 1) {
				// Child is full → split it first
				this._splitChild(node, i)
				if (val > node.keys[i]) i++
			}
			this._insertNonFull(node.children[i], val)
		}
	}

	_splitChild(parent, i) {
		// Split parent.children[i] (which is full) into two nodes
		// Median key moves up to parent
		const t = this.t
		const fullChild = parent.children[i]
		const newChild = new BTreeNode(fullChild.isLeaf)

		// Median key goes up to parent
		const medianKey = fullChild.keys[t - 1]

		// Right half of keys go to newChild
		newChild.keys = fullChild.keys.splice(t) // keys after median
		fullChild.keys.pop() // remove median from fullChild

		// Right half of children go to newChild (if not leaf)
		if (!fullChild.isLeaf) {
			newChild.children = fullChild.children.splice(t)
		}

		// Insert median into parent and newChild into parent's children
		parent.keys.splice(i, 0, medianKey)
		parent.children.splice(i + 1, 0, newChild)
	}

	// Inorder traversal to verify sorted order
	inorder(node = this.root, res = []) {
		if (!node) return res
		for (let i = 0; i < node.keys.length; i++) {
			if (!node.isLeaf) this.inorder(node.children[i], res)
			res.push(node.keys[i])
		}
		if (!node.isLeaf) this.inorder(node.children[node.keys.length], res)
		return res
	}

	// Print tree structure level by level
	printTree() {
		const queue = [{node: this.root, level: 0}]
		let curLevel = 0
		let line = ''
		while (queue.length) {
			const {node, level} = queue.shift()
			if (level > curLevel) {
				console.log(line)
				line = ''
				curLevel = level
			}
			line += `[${node.keys.join('|')}] `
			if (!node.isLeaf)
				node.children.forEach((c) =>
					queue.push({node: c, level: level + 1}),
				)
		}
		if (line) console.log(line)
	}
}

// ============================================================
// DEMO — B-Tree
// ============================================================

console.log('\n=== B-TREE DEMO (t=2, max 3 keys per node) ===')

const bt = new BTree(2) // t=2: each node holds 1 to 3 keys
;[10, 20, 30, 40, 50, 60, 70, 80, 90].forEach((v) => bt.insert(v))

console.log('Inorder:', bt.inorder()) // [10,20,...,90]
console.log('\nTree structure (level by level):')
bt.printTree()
// Level 0: [40]
// Level 1: [20] [60|80]
// Level 2: [10] [30] [50] [70] [90]

console.log('\nSearch 60:', bt.search(60) ? 'Found' : 'Not found') // Found
console.log('Search 55:', bt.search(55) ? 'Found' : 'Not found') // Not found

// Insert more to trigger more splits
const bt2 = new BTree(2)
;[3, 7, 1, 5, 11, 17, 13, 2, 12, 16].forEach((v) => bt2.insert(v))
console.log('\nB-Tree with [3,7,1,5,11,17,13,2,12,16]:')
console.log('Inorder:', bt2.inorder())
bt2.printTree()

// ============================================================
// B-TREE vs B+ TREE (common variant)
// ============================================================
//
//  Property            B-Tree              B+ Tree
//  ──────────────────────────────────────────────────────────
//  Data storage        All nodes           Only leaf nodes
//  Leaf linking        No                  Leaves linked as list
//  Range queries       Slower              Fast (scan leaves)
//  Duplicate keys      No                  Keys repeated in leaves
//  Used in             General purpose     Databases (MySQL, Postgres)
//
//  B+ Tree leaf structure:
//  [10]->[20]->[30]->[40]->[50]  ← linked list of leaves
//  Allows fast range scan: "find all keys between 20 and 40"
//
// ============================================================
// TREE VARIANTS — QUICK COMPARISON
// ============================================================
//
//  Tree Type    Balance       Keys/Node  Best Use Case
//  ──────────────────────────────────────────────────────────
//  BST          None          1          Simple lookups (random data)
//  AVL          Strict        1          Read-heavy, in-memory
//  Red-Black    Loose         1          Write-heavy, OS/STL
//  B-Tree       Always        Many       Disk-based (databases, FS)
//  B+ Tree      Always        Many       Range queries (databases)
//  Trie         N/A           Char       String prefix search
//  Segment Tree N/A           Range      Range queries on arrays
//
//  All guarantee O(log n) search.
//  Choice depends on: read/write ratio, data location (RAM vs disk),
//  and whether range queries are needed.
//
// ============================================================

// ============================================================
// SPLAY TREE — Complete Guide
// ============================================================
//
// DEFINITION:
//   A Splay Tree is a self-adjusting BST where every accessed
//   node is moved to the ROOT via a sequence of rotations
//   called "splaying". No extra balance info (height/color)
//   is stored — the tree restructures itself based on access
//   patterns.
//
// WHY SPLAY TREE?
//   - Recently accessed nodes stay near the root → fast re-access
//   - Amortized O(log n) for all operations (not worst-case)
//   - Great for caches, LRU-like workloads, non-uniform access
//   - Simpler to implement than AVL or Red-Black
//   - Used in: GCC's memory allocator, Windows NT cache manager
//
// KEY IDEA — TEMPORAL LOCALITY:
//   If you access key 42 repeatedly, it stays at the root.
//   The 80/20 rule: 80% of accesses hit 20% of keys →
//   splay tree naturally caches the hot 20% near the root.
//
// AMORTIZED ANALYSIS:
//   Individual operations can be O(n) in worst case (skewed tree)
//   but any sequence of m operations on n nodes costs O(m log n)
//   total → amortized O(log n) per operation.
//
// ============================================================
// THE 3 SPLAY CASES (Zig, Zig-Zig, Zig-Zag)
// ============================================================
//
// To splay node x to the root, apply one of these cases
// repeatedly until x is the root:
//
// ─────────────────────────────────────────────────────────
// CASE 1: ZIG (x's parent is the root)
// ─────────────────────────────────────────────────────────
//   x is left child → Right Rotate parent
//   x is right child → Left Rotate parent
//
//   Before (x is left child of root p):
//        p
//       / \
//      x   C
//     / \
//    A   B
//
//   After Right Rotate(p):
//        x
//       / \
//      A   p
//         / \
//        B   C
//
// ─────────────────────────────────────────────────────────
// CASE 2: ZIG-ZIG (x and parent are both left OR both right)
// ─────────────────────────────────────────────────────────
//   Both left children → Rotate grandparent first, then parent
//   (This is different from AVL! AVL rotates bottom-up,
//    Splay rotates top-down in zig-zig)
//
//   Before (x is left child of p, p is left child of g):
//        g
//       / \
//      p   D
//     / \
//    x   C
//   / \
//  A   B
//
//   Step 1: Right Rotate(g):
//        p
//       / \
//      x   g
//     / \ / \
//    A  B C  D
//
//   Step 2: Right Rotate(p):
//        x
//       / \
//      A   p
//         / \
//        B   g
//           / \
//          C   D
//
// ─────────────────────────────────────────────────────────
// CASE 3: ZIG-ZAG (x and parent are opposite children)
// ─────────────────────────────────────────────────────────
//   x is right child of left parent (or left child of right parent)
//   → Same as AVL Left-Right / Right-Left double rotation
//
//   Before (x is right child of p, p is left child of g):
//        g
//       / \
//      p   D
//     / \
//    A   x
//       / \
//      B   C
//
//   Step 1: Left Rotate(p):
//        g
//       / \
//      x   D
//     / \
//    p   C
//   / \
//  A   B
//
//   Step 2: Right Rotate(g):
//        x
//       / \
//      p   g
//     / \ / \
//    A  B C  D
//
// ============================================================
// SPLAY TREE IMPLEMENTATION
// ============================================================

class SplayNode {
	constructor(val) {
		this.val = val
		this.left = null
		this.right = null
	}
}

class SplayTree {
	constructor() {
		this.root = null
	}

	// ----------------------------------------------------------
	// SPLAY — Move node with given val to root
	// ----------------------------------------------------------
	// Uses top-down splaying (efficient, no parent pointers needed)
	// Time: O(log n) amortized
	// ----------------------------------------------------------
	_splay(root, val) {
		if (!root || root.val === val) return root

		// Left subtree case
		if (val < root.val) {
			if (!root.left) return root

			if (val < root.left.val) {
				// Zig-Zig (left-left): splay x to root of left-left subtree
				root.left.left = this._splay(root.left.left, val)
				root = this._rotateRight(root) // rotate grandparent
			} else if (val > root.left.val) {
				// Zig-Zag (left-right): splay x to root of left-right subtree
				root.left.right = this._splay(root.left.right, val)
				if (root.left.right) root.left = this._rotateLeft(root.left)
			}
			return root.left ? this._rotateRight(root) : root
		}

		// Right subtree case
		else {
			if (!root.right) return root

			if (val > root.right.val) {
				// Zig-Zig (right-right)
				root.right.right = this._splay(root.right.right, val)
				root = this._rotateLeft(root)
			} else if (val < root.right.val) {
				// Zig-Zag (right-left)
				root.right.left = this._splay(root.right.left, val)
				if (root.right.left) root.right = this._rotateRight(root.right)
			}
			return root.right ? this._rotateLeft(root) : root
		}
	}

	_rotateRight(y) {
		const x = y.left
		y.left = x.right
		x.right = y
		return x
	}

	_rotateLeft(x) {
		const y = x.right
		x.right = y.left
		y.left = x
		return y
	}

	// ----------------------------------------------------------
	// SEARCH — splay the node to root, then check
	// ----------------------------------------------------------
	// Time: O(log n) amortized
	// ----------------------------------------------------------
	search(val) {
		this.root = this._splay(this.root, val)
		return this.root && this.root.val === val ? this.root : null
	}

	// ----------------------------------------------------------
	// INSERT — splay closest node, then attach new root
	// ----------------------------------------------------------
	// Time: O(log n) amortized
	// ----------------------------------------------------------
	insert(val) {
		if (!this.root) {
			this.root = new SplayNode(val)
			return
		}
		this.root = this._splay(this.root, val)
		if (this.root.val === val) return // duplicate

		const node = new SplayNode(val)
		if (val < this.root.val) {
			// new node becomes root, old root goes right
			node.right = this.root
			node.left = this.root.left
			this.root.left = null
		} else {
			// new node becomes root, old root goes left
			node.left = this.root
			node.right = this.root.right
			this.root.right = null
		}
		this.root = node
	}

	// ----------------------------------------------------------
	// DELETE — splay the node to root, then merge subtrees
	// ----------------------------------------------------------
	// Time: O(log n) amortized
	// ----------------------------------------------------------
	delete(val) {
		if (!this.root) return
		this.root = this._splay(this.root, val)
		if (this.root.val !== val) return // not found

		if (!this.root.left) {
			this.root = this.root.right
		} else {
			// Splay max of left subtree to left subtree root
			const rightTree = this.root.right
			this.root = this._splay(this.root.left, val)
			this.root.right = rightTree // attach right subtree
		}
	}

	inorder(node = this.root, res = []) {
		if (!node) return res
		this.inorder(node.left, res)
		res.push(node.val)
		this.inorder(node.right, res)
		return res
	}
}

// ============================================================
// DEMO — Splay Tree
// ============================================================

console.log('\n=== SPLAY TREE DEMO ===')

const splay = new SplayTree()
;[10, 20, 30, 40, 50].forEach((v) => splay.insert(v))
console.log('Inorder after inserts:', splay.inorder()) // [10,20,30,40,50]

// Access 10 — it should move to root (temporal locality)
splay.search(10)
console.log('Root after searching 10:', splay.root.val) // 10

// Access 50 — it should move to root
splay.search(50)
console.log('Root after searching 50:', splay.root.val) // 50

// Delete 30
splay.delete(30)
console.log('Inorder after deleting 30:', splay.inorder()) // [10,20,40,50]

// Repeated access pattern — 20 accessed 3 times
splay.search(20)
splay.search(20)
splay.search(20)
console.log('Root after 3x access of 20:', splay.root.val) // 20 (cached at root)

// ============================================================
// SPLAY TREE COMPLEXITY SUMMARY
// ============================================================
//
//  Operation    Amortized    Worst Case
//  ──────────────────────────────────────
//  Search       O(log n)     O(n)
//  Insert       O(log n)     O(n)
//  Delete       O(log n)     O(n)
//  Space        O(n)         O(n)
//
//  No extra storage per node (no height, no color)
//  Best when: access pattern has temporal locality
//  Worst when: access pattern is adversarial (alternating extremes)
//
// ============================================================
// SPLAY vs AVL vs RED-BLACK
// ============================================================
//
//  Property          Splay         AVL           Red-Black
//  ──────────────────────────────────────────────────────────
//  Balance           Amortized     Strict        Loose
//  Worst-case op     O(n)          O(log n)      O(log n)
//  Amortized op      O(log n)      O(log n)      O(log n)
//  Extra storage     None          Height        1-bit color
//  Cache behavior    Excellent     None          None
//  Implementation    Simple        Medium        Complex
//  Best for          Hot-key cache Lookups       Writes
//
// ============================================================

// ============================================================
// AUGMENTED TREES — Complete Guide
// ============================================================
//
// DEFINITION:
//   An Augmented Tree is any BST (BST, AVL, Red-Black, etc.)
//   where each node stores EXTRA INFORMATION beyond just the key.
//   This extra info is derived from the subtree rooted at that
//   node and is updated during insert/delete/rotate.
//
// WHY AUGMENT?
//   Standard BST answers: "Is key X in the tree?"
//   Augmented BST answers: "How many keys are ≤ X?" or
//   "What is the k-th smallest key?" or
//   "Do any intervals overlap with [a, b]?"
//   These would take O(n) without augmentation, but O(log n) with it.
//
// THE AUGMENTATION PRINCIPLE (CLRS):
//   You can augment a Red-Black tree with extra info if:
//   1. The info at a node can be computed from the node's key
//      and the info stored in its children.
//   2. The info can be updated in O(1) during rotations.
//   If both hold → all operations remain O(log n).
//
// ============================================================
// TWO CLASSIC AUGMENTED TREES
// ============================================================
//
// 1. ORDER-STATISTICS TREE — answers rank/select queries
// 2. INTERVAL TREE — answers interval overlap queries
//
// ============================================================

// ============================================================
// AUGMENTED TREE 1: ORDER-STATISTICS TREE
// ============================================================
//
// EXTRA INFO: Each node stores `size` = number of nodes in
//             its subtree (including itself).
//
//   size(node) = size(node.left) + size(node.right) + 1
//   size(null) = 0
//
// VISUAL:
//
//              20 [size=5]
//             /           \
//         10 [size=2]    30 [size=2]
//        /                  \
//     5 [size=1]           40 [size=1]
//
// OPERATIONS ENABLED:
//
//   OS-SELECT(k): Find the k-th smallest element
//     - Let r = size(node.left) + 1  (rank of current node)
//     - If k == r → return node
//     - If k < r  → recurse left
//     - If k > r  → recurse right with k = k - r
//
//   OS-RANK(x): Find the rank (position) of node x
//     - Start with rank = size(x.left) + 1
//     - Walk up to root, adding left subtree sizes when going right
//
// EXAMPLE:
//   OS-SELECT(3) on the tree above:
//   At 20: r = size(10) + 1 = 2 + 1 = 3 → k == r → return 20 ✓
//
//   OS-SELECT(1):
//   At 20: r=3, k=1 < 3 → go left to 10
//   At 10: r = size(5) + 1 = 1 + 1 = 2, k=1 < 2 → go left to 5
//   At 5:  r = 0 + 1 = 1, k=1 == 1 → return 5 ✓
//
// ============================================================

class OSNode {
	constructor(val) {
		this.val = val
		this.left = null
		this.right = null
		this.size = 1 // subtree size (augmented field)
	}
}

class OrderStatisticsTree {
	constructor() {
		this.root = null
	}

	_size(node) {
		return node ? node.size : 0
	}

	_updateSize(node) {
		if (node) node.size = 1 + this._size(node.left) + this._size(node.right)
	}

	// Standard BST insert + update sizes on the way back up
	insert(val) {
		this.root = this._insert(this.root, val)
	}

	_insert(node, val) {
		if (!node) return new OSNode(val)
		if (val < node.val) node.left = this._insert(node.left, val)
		else if (val > node.val) node.right = this._insert(node.right, val)
		this._updateSize(node)
		return node
	}

	// ----------------------------------------------------------
	// OS-SELECT: Find k-th smallest (1-indexed)
	// ----------------------------------------------------------
	// Time: O(log n) if balanced, O(n) worst case
	// ----------------------------------------------------------
	select(k) {
		return this._select(this.root, k)
	}

	_select(node, k) {
		if (!node) return null
		const r = this._size(node.left) + 1 // rank of current node
		if (k === r) return node.val
		if (k < r) return this._select(node.left, k)
		return this._select(node.right, k - r)
	}

	// ----------------------------------------------------------
	// OS-RANK: Find rank of a given value (how many keys ≤ val)
	// ----------------------------------------------------------
	// Time: O(log n) if balanced
	// ----------------------------------------------------------
	rank(val) {
		let rank = 0
		let node = this.root
		while (node) {
			if (val < node.val) {
				node = node.left
			} else if (val > node.val) {
				rank += this._size(node.left) + 1
				node = node.right
			} else {
				rank += this._size(node.left) + 1
				break
			}
		}
		return rank
	}

	inorder(node = this.root, res = []) {
		if (!node) return res
		this.inorder(node.left, res)
		res.push(`${node.val}[sz=${node.size}]`)
		this.inorder(node.right, res)
		return res
	}
}

// ============================================================
// DEMO — Order-Statistics Tree
// ============================================================

console.log('\n=== ORDER-STATISTICS TREE DEMO ===')

const ost = new OrderStatisticsTree()
;[20, 10, 30, 5, 40].forEach((v) => ost.insert(v))

console.log('Inorder (with sizes):', ost.inorder())
// [5[sz=1], 10[sz=2], 20[sz=5], 30[sz=2], 40[sz=1]]

console.log('1st smallest:', ost.select(1)) // 5
console.log('2nd smallest:', ost.select(2)) // 10
console.log('3rd smallest:', ost.select(3)) // 20
console.log('5th smallest:', ost.select(5)) // 40

console.log('Rank of 5:', ost.rank(5)) // 1
console.log('Rank of 20:', ost.rank(20)) // 3
console.log('Rank of 40:', ost.rank(40)) // 5

// ============================================================
// AUGMENTED TREE 2: INTERVAL TREE
// ============================================================
//
// PROBLEM: Given a set of intervals, quickly find if any
//          interval overlaps with a query interval [lo, hi].
//
// EXTRA INFO: Each node stores an interval [low, high] as key,
//             and `maxEnd` = maximum `high` value in its subtree.
//
//   maxEnd(node) = max(node.high, maxEnd(left), maxEnd(right))
//   maxEnd(null) = -Infinity
//
// BST KEY: Intervals are ordered by their `low` value.
//
// VISUAL (intervals as [low, high]):
//
//              [15,23] maxEnd=23
//             /                \
//        [6,10] maxEnd=20    [17,19] maxEnd=20
//       /          \                    \
//   [5,11]       [8,9]              [19,20]
//   maxEnd=11   maxEnd=9            maxEnd=20
//
// OVERLAP QUERY [lo, hi]:
//   Two intervals [a,b] and [c,d] overlap if a ≤ d AND c ≤ b
//
//   ALGORITHM at each node:
//   1. If current interval overlaps [lo, hi] → return it
//   2. If left child exists AND left.maxEnd >= lo → go left
//      (there MIGHT be an overlap in left subtree)
//   3. Otherwise → go right
//
//   WHY THIS WORKS:
//   If left.maxEnd < lo, no interval in left subtree can reach lo,
//   so no overlap is possible there → safely skip left subtree.
//
// ============================================================

class IntervalNode {
	constructor(low, high) {
		this.low = low
		this.high = high
		this.maxEnd = high // augmented: max high in subtree
		this.left = null
		this.right = null
	}
}

class IntervalTree {
	constructor() {
		this.root = null
	}

	_maxEnd(node) {
		return node ? node.maxEnd : -Infinity
	}

	_updateMaxEnd(node) {
		if (node)
			node.maxEnd = Math.max(
				node.high,
				this._maxEnd(node.left),
				this._maxEnd(node.right),
			)
	}

	// Insert interval [low, high], BST ordered by low
	insert(low, high) {
		this.root = this._insert(this.root, low, high)
	}

	_insert(node, low, high) {
		if (!node) return new IntervalNode(low, high)
		if (low < node.low) node.left = this._insert(node.left, low, high)
		else node.right = this._insert(node.right, low, high)
		this._updateMaxEnd(node) // update maxEnd on the way back up
		return node
	}

	// ----------------------------------------------------------
	// OVERLAP SEARCH: Find any interval overlapping [lo, hi]
	// ----------------------------------------------------------
	// Time: O(log n) for one result (if tree is balanced)
	// ----------------------------------------------------------
	findOverlap(lo, hi) {
		return this._findOverlap(this.root, lo, hi)
	}

	_findOverlap(node, lo, hi) {
		if (!node) return null

		// Check if current interval overlaps [lo, hi]
		if (node.low <= hi && lo <= node.high) return [node.low, node.high] // overlap found

		// Go left if left subtree might have an overlap
		if (node.left && node.left.maxEnd >= lo)
			return this._findOverlap(node.left, lo, hi)

		// Otherwise go right
		return this._findOverlap(node.right, lo, hi)
	}

	// Find ALL overlapping intervals
	findAllOverlaps(lo, hi, node = this.root, res = []) {
		if (!node) return res
		if (node.low <= hi && lo <= node.high) res.push([node.low, node.high])
		if (node.left && node.left.maxEnd >= lo)
			this.findAllOverlaps(lo, hi, node.left, res)
		if (node.right && node.right.maxEnd >= lo)
			this.findAllOverlaps(lo, hi, node.right, res)
		return res
	}

	inorder(node = this.root, res = []) {
		if (!node) return res
		this.inorder(node.left, res)
		res.push(`[${node.low},${node.high}](max=${node.maxEnd})`)
		this.inorder(node.right, res)
		return res
	}
}

// ============================================================
// DEMO — Interval Tree
// ============================================================

console.log('\n=== INTERVAL TREE DEMO ===')

const it = new IntervalTree()
;[
	[15, 23],
	[6, 10],
	[17, 19],
	[5, 11],
	[8, 9],
	[19, 20],
].forEach(([l, h]) => it.insert(l, h))

console.log('Inorder (with maxEnd):', it.inorder())

console.log('\nOverlap queries:')
console.log('Any overlap with [14,16]:', it.findOverlap(14, 16)) // [15,23]
console.log('Any overlap with [12,14]:', it.findOverlap(12, 14)) // null (no overlap)
console.log('Any overlap with [7,9]:', it.findOverlap(7, 9)) // [6,10] or [5,11] or [8,9]

console.log('\nAll overlaps with [7,20]:', it.findAllOverlaps(7, 20))
// [[6,10],[5,11],[8,9],[15,23],[17,19],[19,20]] — all overlap [7,20]

// ============================================================
// AUGMENTED TREES — COMPLEXITY SUMMARY
// ============================================================
//
//  Tree Type           Extra Field    Query Enabled         Time
//  ──────────────────────────────────────────────────────────────
//  Order-Statistics    size           k-th smallest         O(log n)
//                                     rank of element       O(log n)
//  Interval Tree       maxEnd         overlap query         O(log n)
//                                     all overlaps          O(k log n)
//
//  All augmented operations maintain O(log n) because:
//  - Extra field is updated in O(1) per node during insert/rotate
//  - Tree height stays O(log n) (if base tree is balanced)
//
// ============================================================
// AUGMENTATION PRINCIPLE — WHEN CAN YOU AUGMENT?
// ============================================================
//
//  You can augment a balanced BST with field f if:
//  f(node) = g(node.key, f(node.left), f(node.right))
//
//  Examples:
//  - size(node)   = 1 + size(left) + size(right)          ✓
//  - maxEnd(node) = max(high, maxEnd(left), maxEnd(right)) ✓
//  - sum(node)    = node.val + sum(left) + sum(right)      ✓
//  - min(node)    = min(node.val, min(left), min(right))   ✓
//
//  If f satisfies this, rotations only need O(1) updates
//  → all operations stay O(log n).
//
// ============================================================
