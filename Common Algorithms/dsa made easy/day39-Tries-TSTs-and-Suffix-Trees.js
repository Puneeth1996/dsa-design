/**
 * DAY 39 — TRIES, TSTs, AND SUFFIX TREES
 * ======================================
 *
 * This file covers:
 * - Trie (prefix tree)
 * - Ternary Search Tree (TST)
 * - Suffix trie / suffix tree idea
 *
 * These structures are useful for:
 * - autocomplete
 * - dictionary lookup
 * - prefix search
 * - pattern search in strings
 */

/**
 * TRIE (PREFIX TREE)
 * ------------------
 * A trie stores characters in a tree form, which makes prefix-based
 * operations very fast.
 */
class TrieNode {
	constructor() {
		this.children = new Map()
		this.isEndOfWord = false
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode()
	}

	insert(word) {
		let current = this.root
		for (const ch of word) {
			if (!current.children.has(ch)) {
				current.children.set(ch, new TrieNode())
			}
			current = current.children.get(ch)
		}
		current.isEndOfWord = true
	}

	search(word) {
		let current = this.root
		for (const ch of word) {
			if (!current.children.has(ch)) {
				return false
			}
			current = current.children.get(ch)
		}
		return current.isEndOfWord
	}

	startsWith(prefix) {
		let current = this.root
		for (const ch of prefix) {
			if (!current.children.has(ch)) {
				return false
			}
			current = current.children.get(ch)
		}
		return true
	}

	display() {
		console.log('Trie contents:')
		const words = []
		const dfs = (node, prefix) => {
			if (node.isEndOfWord) {
				words.push(prefix)
			}
			for (const [char, child] of node.children.entries()) {
				dfs(child, prefix + char)
			}
		}
		dfs(this.root, '')
		console.log(words)
	}
}

/**
 * TERNARY SEARCH TREE (TST)
 * -------------------------
 * A TST is a space-efficient trie-like structure where each node stores
 * one character and three child links: left, middle, right.
 */
class TSTNode {
	constructor(char) {
		this.char = char
		this.left = null
		this.mid = null
		this.right = null
		this.isEndOfWord = false
	}
}

class TernarySearchTree {
	constructor() {
		this.root = null
	}

	insert(word) {
		this.root = this._insert(this.root, word, 0)
	}

	_insert(node, word, index) {
		if (node === null) {
			node = new TSTNode(word[index])
		}

		if (word[index] < node.char) {
			node.left = this._insert(node.left, word, index)
		} else if (word[index] > node.char) {
			node.right = this._insert(node.right, word, index)
		} else if (index < word.length - 1) {
			node.mid = this._insert(node.mid, word, index + 1)
		} else {
			node.isEndOfWord = true
		}

		return node
	}

	search(word) {
		return this._search(this.root, word, 0)
	}

	_search(node, word, index) {
		if (node === null) {
			return false
		}

		if (word[index] < node.char) {
			return this._search(node.left, word, index)
		} else if (word[index] > node.char) {
			return this._search(node.right, word, index)
		} else if (index < word.length - 1) {
			return this._search(node.mid, word, index + 1)
		} else {
			return node.isEndOfWord
		}
	}

	startsWith(prefix) {
		let node = this.root
		for (let i = 0; i < prefix.length; i++) {
			while (node !== null && prefix[i] < node.char) {
				node = node.left
			}
			while (node !== null && prefix[i] > node.char) {
				node = node.right
			}
			if (node === null || node.char !== prefix[i]) {
				return false
			}
			node = node.mid
		}
		return true
	}
}

/**
 * SUFFIX TREE / SUFFIX TRIE IDEA
 * ------------------------------
 * A suffix tree stores all suffixes of a string in a compressed or
 * uncompressed tree structure. The basic idea is very similar to a trie.
 *
 * For learning, this implementation builds a suffix trie by inserting
 * every suffix of the text.
 */
class SuffixTrieNode {
	constructor() {
		this.children = new Map()
		this.isEndOfWord = false
	}
}

class SuffixTrie {
	constructor() {
		this.root = new SuffixTrieNode()
	}

	insert(word) {
		let current = this.root
		for (const ch of word) {
			if (!current.children.has(ch)) {
				current.children.set(ch, new SuffixTrieNode())
			}
			current = current.children.get(ch)
		}
		current.isEndOfWord = true
	}

	buildFrom(text) {
		// This helps build all suffixes of the given text.
		// Example: for "google", it inserts:
		// "google", "oogle", "ogle", "gle", "le", "e"
		// Each suffix becomes a path in the suffix trie.
		for (let i = 0; i < text.length; i++) {
			this.insert(text.slice(i))
		}
		return this
	}

	contains(word) {
		let current = this.root
		for (const ch of word) {
			if (!current.children.has(ch)) {
				return false
			}
			current = current.children.get(ch)
		}
		return current.isEndOfWord
	}
}

/**
 * DEMO / EXAMPLES
 * ---------------
 */
console.log('=== TRIE DEMO ===')
// Example trie structure for words: "apple", "app", "banana"
//
// root
// ├── a
// │   └── p
// │       ├── p
// │       │   └── (end)
// │       └── l
// │           └── e
// │               └── (end)
// └── b
//     └── a
//         └── n
//             └── a
//                 └── n
//                     └── a
//                         └── (end)
//
// This shows how common prefixes are shared.
const trie = new Trie()
trie.insert('apple')
trie.insert('app')
trie.insert('banana')
console.log('search apple ->', trie.search('apple'))
console.log('search apricot ->', trie.search('apricot'))
console.log('startsWith app ->', trie.startsWith('app'))
trie.display()

console.log('\n=== TST DEMO ===')
// Example TST structure for words: "cat", "car", "dog"
//
//        c
//       / \
//      a   d
//     / \   \
//    r   t   o
//   / \     \
//  (end) (end) g
//
// In a TST, each node stores one character and uses left/middle/right links.
// "cat" and "car" share the common prefix "ca".
const tst = new TernarySearchTree()
tst.insert('cat')
tst.insert('car')
tst.insert('dog')
console.log('search cat ->', tst.search('cat'))
console.log('search car ->', tst.search('car'))
console.log('search cod ->', tst.search('cod'))
console.log('startsWith do ->', tst.startsWith('do'))

console.log('\n=== SUFFIX TRIE DEMO ===')
// Example suffix trie idea for text: "banana"
// Suffixes inserted are: "banana", "anana", "nana", "ana", "na", "a"
//
// root
// └── b
//     └── a
//         └── n
//             └── a
//                 └── n
//                     └── a
//
// Each path from the root represents one suffix of the string.
const suffixTrie = new SuffixTrie().buildFrom('banana')
console.log('contains ana ->', suffixTrie.contains('ana'))
console.log('contains nana ->', suffixTrie.contains('nana'))
console.log('contains xyz ->', suffixTrie.contains('xyz'))

const googleSuffixTrie = new SuffixTrie().buildFrom('google')
console.log('contains og ->', googleSuffixTrie.contains('og'))
console.log('contains gle ->', googleSuffixTrie.contains('gle'))
console.log('contains microsoft ->', googleSuffixTrie.contains('microsoft'))

/**
 * IMPORTANT NOTES
 * --------------
 * - Trie: simple and fast, excellent for prefix searches.
 * - TST: compact version of trie, often good for memory.
 * - Suffix tree: powerful for substring / pattern matching.
 *   Full compressed suffix trees are more advanced than this demo.
 */
