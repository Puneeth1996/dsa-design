/**
 * @param {string[][]} paths
 * @return {string[][]}
 */
var deleteDuplicateFolder = function (paths) {
	const Trie = function () {
		this.children = new Map()
		this.serial = ''
		this.deleted = false
	}

	const root = new Trie()

	// Step 1: Build the Trie
	for (const path of paths) {
		let node = root
		for (const folder of path) {
			if (!node.children.has(folder)) {
				node.children.set(folder, new Trie())
			}
			node = node.children.get(folder)
		}
	}

	const serialMap = new Map()

	// Step 2: Serialize each subtree
	const serialize = (node) => {
		if (!node.children.size) {
			return ''
		}

		let serialArr = []

		for (const [name, child] of [...node.children.entries()].sort()) {
			const childSerial = serialize(child)
			serialArr.push(name + '(' + childSerial + ')')
		}

		node.serial = serialArr.join('')

		if (serialMap.has(node.serial)) {
			// Mark both current and original as deleted
			node.deleted = true
			serialMap.get(node.serial).deleted = true
		} else {
			serialMap.set(node.serial, node)
		}

		return node.serial
	}

	serialize(root)

	// Step 3: DFS to collect valid paths
	const result = []

	const dfs = (node, path) => {
		for (const [name, child] of node.children) {
			if (!child.deleted) {
				const newPath = [...path, name]
				result.push(newPath)
				dfs(child, newPath)
			}
		}
	}

	dfs(root, [])

	return result
}
// Time Complexity:
// Building Trie:
// Each path inserts O(L) folders, total O(N * L), where:

// N = number of paths,

// L = average path length.

// Serializing Trie:
// Visits each node once → O(total nodes) = O(N * L)

// DFS to collect paths:
// Again O(N * L)

//  Total Time Complexity: O(N * L * log C)

// log C from sorting child entries at each node (C = number of children)

//  Space Complexity:
// Trie Storage: O(N * L)

// Serialization Map: O(N)

// Recursion Stack + Result Array: O(N * L)

//  Total Space Complexity: O(N * L)
