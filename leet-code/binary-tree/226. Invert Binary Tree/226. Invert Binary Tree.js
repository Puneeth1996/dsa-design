class Node {
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
	}
}

class BinaryTree {
	constructor() {
		this.root = null
	}
	insert(array) {
		if (array.length === 0) return
		let i = 0
		//if root is null
		if (!this.root) {
			if (array[0] === null) return
			else {
				let node = new Node(array[0])
				this.root = node
				i++
				if (i === array.length) return this
			}
		}
		//insert elements
		const queue = [this.root]
		while (queue.length) {
			let current = queue.shift()
			//left
			if (!current.left) {
				if (array[i] !== null) {
					let node = new Node(array[i])
					current.left = node
				}
				i++
				if (i === array.length) return this
			}
			if (current.left) queue.push(current.left)
			//right
			if (!current.right) {
				if (array[i] !== null) {
					let node = new Node(array[i])
					current.right = node
				}
				i++
				if (i === array.length) return this
			}
			if (current.right) queue.push(current.right)
		}
	}
}

const invertIterative = function (root) {
	if (root === null) return
	const queue = [root]
	while (queue.length) {
		const current = queue.shift()
		let temp = current.right
		current.right = current.left
		current.left = temp
		if (current.left) queue.push(current.left)
		if (current.right) queue.push(current.right)
	}
	return root
}
// T(o)
// S(max depth)
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
 * @return {TreeNode}
 */
var invertTree = function (node) {
	if (node === null) return node

	//swap
	const temp = node.left
	node.left = node.right
	node.right = temp

	invertTree(node.left)
	invertTree(node.right)
	return node
}

const tree = new BinaryTree()
tree.insert([1, 2, 3, 4, null, null, 5, 6, null, 7])

//invertIterative(tree.root);
invertRecursive(tree.root)
