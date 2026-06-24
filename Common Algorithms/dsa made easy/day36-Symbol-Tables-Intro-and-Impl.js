// ============================================================
// DAY 36 — Symbol Tables: Intro & Implementation
// ============================================================
//
//  A Symbol Table (also called a Dictionary or Map) is a
//  key-value store that supports:
//
//    put(key, value)   — insert or update a key
//    get(key)          — retrieve value by key
//    delete(key)       — remove a key
//    contains(key)     — check if key exists
//    size()            — number of key-value pairs
//
//  Implementations & Complexity:
//
//  Impl                  put       get       delete    Space
//  ──────────────────────────────────────────────────────────
//  Unordered Array       O(n)      O(n)      O(n)      O(n)
//  Sorted Array          O(n)      O(log n)  O(n)      O(n)
//  Hash Table            O(1)*     O(1)*     O(1)*     O(n)
//  BST                   O(log n)  O(log n)  O(log n)  O(n)
//
//  * amortized average case
//
// ============================================================

// ============================================================
// DNS LOOKUP — Real-world Symbol Table Example
// ============================================================
//
//  When you type "google.com" in a browser, DNS resolves it
//  to an IP address using a symbol table:
//
//    Key (domain name)    Value (IP address)
//    ──────────────────────────────────────
//    "google.com"      →  "142.250.80.46"
//    "github.com"      →  "140.82.121.4"
//    "amazon.com"      →  "176.32.103.205"
//    "localhost"       →  "127.0.0.1"
//
//  put("google.com", "142.250.80.46")   → cache DNS record
//  get("google.com")                    → "142.250.80.46"
//  contains("unknown.xyz")              → false → query upstream
//  delete("google.com")                 → expire/evict cache entry
//
//  This is exactly how DNS resolvers cache lookups — a symbol
//  table keyed by domain name for fast resolution.
//
// ============================================================

// ============================================================
// IMPL 1 — Simple Array Symbol Table  (unordered)
// ============================================================
//
//  Internally: a flat array of [key, value] pairs.
//  No hash function — just a linear scan on every operation.
//
//  put("google.com", "142.250.80.46")
//    entries → [["google.com", "142.250.80.46"]]
//
//  put("github.com", "140.82.121.4")
//    entries → [["google.com", "142.250.80.46"],
//               ["github.com", "140.82.121.4"]]
//
//  get("github.com")
//    scan entries → found at index 1 → "140.82.121.4"
//
//  Complexity: put O(n)  get O(n)  delete O(n)
//
// ============================================================

class ArraySymbolTable {
	constructor() {
		this.entries = []  // [[key, value], ...]
	}

	put(key, value) {
		const pair = this.entries.find(([k]) => k === key)
		if (pair) pair[1] = value
		else this.entries.push([key, value])
	}

	get(key) {
		const pair = this.entries.find(([k]) => k === key)
		return pair ? pair[1] : undefined
	}

	delete(key) {
		const i = this.entries.findIndex(([k]) => k === key)
		if (i === -1) return false
		this.entries.splice(i, 1)
		return true
	}

	contains(key) {
		return this.get(key) !== undefined
	}

	size() {
		return this.entries.length
	}
}

// ============================================================
// DEMO — DNS Lookup Cache
// ============================================================

console.log('--- DNS Cache (Array Symbol Table) ---')

const dnsCache = new ArraySymbolTable()

dnsCache.put('google.com',  '142.250.80.46')
dnsCache.put('github.com',  '140.82.121.4')
dnsCache.put('amazon.com',  '176.32.103.205')
dnsCache.put('localhost',   '127.0.0.1')

console.log(dnsCache.get('google.com'))        // 142.250.80.46
console.log(dnsCache.get('github.com'))        // 140.82.121.4
console.log(dnsCache.contains('unknown.xyz'))  // false → query upstream DNS
console.log('size:', dnsCache.size())          // 4

dnsCache.delete('github.com')                  // expire cache entry
console.log(dnsCache.contains('github.com'))   // false
console.log('size after eviction:', dnsCache.size()) // 3

// Update existing record (IP changed)
dnsCache.put('google.com', '142.250.80.99')
console.log(dnsCache.get('google.com'))        // 142.250.80.99 (updated)

// ============================================================
// IMPL 2 — Ordered Array Symbol Table  (sorted by key)
// ============================================================
//
//  Internally: array of [key, value] pairs kept sorted by key.
//  put  → insert at correct sorted position     O(n)
//  get  → binary search on sorted keys          O(log n)
//  delete → find + splice                       O(n)
//  keys → return slice of sorted keys           O(n)
//
//  After each put, entries stay sorted:
//
//  put("google.com",  "142.250.80.46")
//  put("amazon.com",  "176.32.103.205")   ← inserted before google
//  put("localhost",   "127.0.0.1")        ← inserted after google
//  put("github.com",  "140.82.121.4")     ← inserted after amazon
//
//  entries → [["amazon.com",  "176.32.103.205"],
//             ["github.com",  "140.82.121.4"],
//             ["google.com",  "142.250.80.46"],
//             ["localhost",   "127.0.0.1"  ]]
//
//  get("github.com")  → binary search → index 1 → "140.82.121.4"
//
// ============================================================

class OrderedArraySymbolTable {
	constructor() {
		this.entries = []  // [[key, value], ...] sorted by key
	}

	// Binary search → returns index where key is or should be
	_rank(key) {
		let lo = 0, hi = this.entries.length - 1
		while (lo <= hi) {
			const mid = Math.floor((lo + hi) / 2)
			if      (this.entries[mid][0] < key) lo = mid + 1
			else if (this.entries[mid][0] > key) hi = mid - 1
			else return mid
		}
		return lo
	}

	put(key, value) {
		const i = this._rank(key)
		if (i < this.entries.length && this.entries[i][0] === key) {
			this.entries[i][1] = value  // update
		} else {
			this.entries.splice(i, 0, [key, value])  // insert in order
		}
	}

	get(key) {
		const i = this._rank(key)
		if (i < this.entries.length && this.entries[i][0] === key)
			return this.entries[i][1]
		return undefined
	}

	delete(key) {
		const i = this._rank(key)
		if (i >= this.entries.length || this.entries[i][0] !== key) return false
		this.entries.splice(i, 1)
		return true
	}

	contains(key) {
		return this.get(key) !== undefined
	}

	keys() {
		return this.entries.map(([k]) => k)
	}

	size() {
		return this.entries.length
	}
}

// ============================================================
// DEMO — DNS Registry (Ordered Array Symbol Table)
// ============================================================

console.log('\n--- DNS Registry (Ordered Array Symbol Table) ---')

const dnsOrdered = new OrderedArraySymbolTable()

dnsOrdered.put('google.com',  '142.250.80.46')
dnsOrdered.put('amazon.com',  '176.32.103.205')
dnsOrdered.put('localhost',   '127.0.0.1')
dnsOrdered.put('github.com',  '140.82.121.4')

console.log('sorted keys:', dnsOrdered.keys())
// ["amazon.com", "github.com", "google.com", "localhost"]

console.log(dnsOrdered.get('github.com'))        // 140.82.121.4  (binary search)
console.log(dnsOrdered.contains('unknown.xyz'))  // false
console.log('size:', dnsOrdered.size())          // 4

// Update
dnsOrdered.put('amazon.com', '205.251.242.103')
console.log(dnsOrdered.get('amazon.com'))        // 205.251.242.103 (updated)
console.log('sorted keys after update:', dnsOrdered.keys())
// order unchanged: ["amazon.com", "github.com", "google.com", "localhost"]

// Delete
dnsOrdered.delete('localhost')
console.log('sorted keys after delete:', dnsOrdered.keys())
// ["amazon.com", "github.com", "google.com"]

// ============================================================
// IMPL 3 — BST Symbol Table  (ordered, O(log n) avg all ops)
// ============================================================
//
//  Each node stores a key, value, left child, right child.
//  BST property: left.key < node.key < right.key
//
//  Advantage over Ordered Array:
//    put    O(log n) avg — no element shifting like splice
//    get    O(log n) avg — same as ordered array
//    delete O(log n) avg — no shifting
//
//  Inserting DNS records one by one:
//
//  put("google.com",  "142.250.80.46")  ← root
//  put("amazon.com",  "176.32.103.205") ← "amazon" < "google" → left
//  put("localhost",   "127.0.0.1")      ← "localhost" > "google" → right
//  put("github.com",  "140.82.121.4")   ← "github" < "google" → left,
//                                          "github" > "amazon" → amazon.right
//
//           "google.com"
//          /             \
//    "amazon.com"     "localhost"
//          \
//       "github.com"
//
//  get("github.com")
//    "github" < "google" → go left  (amazon)
//    "github" > "amazon" → go right (github) ✓ → "140.82.121.4"
//
//  delete("amazon.com")  ← has one right child (github)
//    replace amazon with its only child github
//
//           "google.com"
//          /             \
//    "github.com"     "localhost"
//
//  delete("google.com")  ← has two children
//    find in-order successor = min of right subtree = "localhost"
//    replace google's key/value with localhost, then delete localhost
//
//       "localhost"
//      /
//  "github.com"
//
//  keys() → in-order traversal → always alphabetical
//
//  Complexity: put O(log n)  get O(log n)  delete O(log n)  avg
//              O(n) worst case when inserts are already sorted
//
// ============================================================

class BSTNode {
	constructor(key, value) {
		this.key = key
		this.value = value
		this.left = this.right = null
	}
}

class BSTSymbolTable {
	constructor() {
		this.root = null
		this._size = 0
	}

	put(key, value) {
		this.root = this._put(this.root, key, value)
	}

	_put(node, key, value) {
		if (!node) { this._size++; return new BSTNode(key, value) }
		if      (key < node.key) node.left  = this._put(node.left,  key, value)
		else if (key > node.key) node.right = this._put(node.right, key, value)
		else node.value = value  // update existing key
		return node
	}

	get(key) {
		let node = this.root
		while (node) {
			if      (key < node.key) node = node.left
			else if (key > node.key) node = node.right
			else return node.value
		}
		return undefined
	}

	delete(key) {
		const before = this._size
		this.root = this._delete(this.root, key)
		return this._size < before
	}

	_delete(node, key) {
		if (!node) return null
		if      (key < node.key) node.left  = this._delete(node.left,  key)
		else if (key > node.key) node.right = this._delete(node.right, key)
		else {
			// 0 or 1 child — just return the surviving child
			if (!node.left)  { this._size--; return node.right }
			if (!node.right) { this._size--; return node.left  }
			// 2 children — replace with in-order successor (min of right subtree)
			const successor = this._min(node.right)
			node.key   = successor.key
			node.value = successor.value
			node.right = this._delete(node.right, successor.key)
		}
		return node
	}

	_min(node) {
		while (node.left) node = node.left
		return node
	}

	contains(key) {
		return this.get(key) !== undefined
	}

	// In-order traversal → keys in sorted (alphabetical) order
	keys() {
		const result = []
		const inorder = (node) => {
			if (!node) return
			inorder(node.left)
			result.push(node.key)
			inorder(node.right)
		}
		inorder(this.root)
		return result
	}

	size() { return this._size }
}

// ============================================================
// DEMO — DNS Registry (BST Symbol Table)
// ============================================================

console.log('\n--- DNS Registry (BST Symbol Table) ---')

const dnsBST = new BSTSymbolTable()

// Each put walks the tree and inserts at correct BST position
dnsBST.put('google.com',  '142.250.80.46')   // becomes root
dnsBST.put('amazon.com',  '176.32.103.205')  // amazon < google → left
dnsBST.put('localhost',   '127.0.0.1')       // localhost > google → right
dnsBST.put('github.com',  '140.82.121.4')    // github < google → left, github > amazon → amazon.right

// in-order traversal gives sorted keys for free
console.log('sorted keys:', dnsBST.keys())
// ["amazon.com", "github.com", "google.com", "localhost"]

// get walks left/right based on comparison — O(log n) avg
console.log(dnsBST.get('github.com'))        // 140.82.121.4
console.log(dnsBST.get('localhost'))         // 127.0.0.1
console.log(dnsBST.get('unknown.xyz'))       // undefined
console.log(dnsBST.contains('amazon.com'))   // true
console.log(dnsBST.contains('unknown.xyz'))  // false
console.log('size:', dnsBST.size())          // 4

// update — same key, new IP
dnsBST.put('google.com', '142.250.80.99')
console.log(dnsBST.get('google.com'))        // 142.250.80.99 (updated)
console.log('size unchanged:', dnsBST.size()) // 4

// delete node with ONE child (amazon has only right child: github)
//   amazon is removed, github slides up into its place
dnsBST.delete('amazon.com')
console.log('after delete amazon.com:', dnsBST.keys())
// ["github.com", "google.com", "localhost"]
console.log('size:', dnsBST.size())          // 3

// delete node with TWO children (google has left:github, right:localhost)
//   in-order successor = min of right subtree = "localhost"
//   google's key/value replaced with localhost, then localhost node removed
dnsBST.put('amazon.com', '176.32.103.205')  // re-add so google has two children again
console.log('before delete google.com:', dnsBST.keys())
// ["amazon.com", "github.com", "google.com", "localhost"]
dnsBST.delete('google.com')
console.log('after delete google.com:', dnsBST.keys())
// ["amazon.com", "github.com", "localhost"]  ← localhost replaced google
console.log('size:', dnsBST.size())          // 3

// ============================================================
// WHEN TO USE WHICH
// ============================================================
//
//  Unordered Array ST  → simple, small tables, insertion-heavy
//  Ordered Array ST    → fast O(log n) get, but O(n) put/delete
//                        good when reads >> writes
//  BST ST              → O(log n) avg for all ops + sorted keys
//                        best balance of read + write performance
//
// ============================================================
