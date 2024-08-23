// T(o)
// S(max depth)
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

const diamterBinaryTree = function (root) {
	if (!root) return 0
	let maxDiamter = 0
	const dfs = function (node) {
		if (!node) return -1
		let leftHeight = dfs(node.left)
		let rightHeight = dfs(node.right)
		let diamter = leftHeight + rightHeight + 1 + 1
		maxDiamter = Math.max(maxDiamter, diamter)
		return Math.max(leftHeight, rightHeight) + 1
	}
	dfs(root)
	return maxDiamter
}

const tree = new BinaryTree()
tree.insert([1, 3, 2, 7, 4, null, null, 8, null, null, 5, 9, null, null, 6])
diamterBinaryTree(tree.root)
