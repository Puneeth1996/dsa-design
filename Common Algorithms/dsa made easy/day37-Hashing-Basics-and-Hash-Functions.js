/**
 * =====================================================
 * HASH TABLES - KEY CONCEPTS
 * =====================================================
 *
 * WHAT IS HASHING?
 * ---------------
 * Hashing is a technique that maps data of arbitrary size to fixed-size values
 * (hash codes/indices). It's the foundation of hash tables - one of the most
 * important and efficient data structures in computer science.
 *
 * WHY DO WE NEED HASHING?
 * -----------------------
 * 1. FAST LOOKUPS: O(1) average time complexity for search, insert, and delete
 * 2. KEY-VALUE MAPPING: Direct mapping between keys and their storage location
 * 3. EFFICIENT STORAGE: Avoids expensive comparisons like in arrays/linked lists (O(n))
 * 4. DATA DEDUPLICATION: Quickly check if data already exists
 * 5. CACHING: Essential for cache implementations (e.g., browser caches)
 *
 * HASH TABLE CORE IDEA
 * --------------------
 * 1. Array-based storage with direct indexing via a hash function
 * 2. Hash function converts a key into an array index
 * 3. Key-value pairs are stored at the computed index
 * 4. Collisions are handled via chaining or open addressing
 *
 * WHAT MAKES A GOOD HASH FUNCTION?
 * --------------------------------
 * A good hash function should have these five properties:
 *
 * 1. DETERMINISTIC - Same input always produces same output
 * 2. FAST COMPUTATION - O(1) time complexity
 * 3. UNIFORM DISTRIBUTION - Spreads keys evenly across the table
 * 4. LOW COLLISION RATE - Minimizes two keys hashing to same index
 * 5. AVALANCHE EFFECT - Small input changes cause large output changes
 *
 * Example: For a bad hash function, all keys starting with 'A' would go to
 * the same index, creating many collisions. Good functions distribute evenly.
 * =====================================================
 */

/**
 * DIVISION HASH FUNCTION
 * =====================
 * One of the simplest hash functions using the modulo operator.
 *
 * Advantages:
 * - Extremely fast computation
 * - Simple to implement
 * - Works well when keys are uniformly distributed
 *
 * Limitations:
 * - Only works with numeric keys (requires conversion for strings)
 * - Can produce clustering if size has small prime factors
 * - Size should ideally be a prime number to reduce collisions
 * - Poor distribution for patterns (e.g., keys that are multiples of size)
 *
 * When to use: Numeric keys with good distribution, small data sets
 * When to avoid: String keys, large datasets, non-uniform key distributions
 *
 * Example: divisionHash(123, 10) = 123 % 10 = 3
 *          divisionHash(125, 10) = 125 % 10 = 5
 */
function divisionHash(key, size) {
	return key % size
}

/**
 * STRING HASH FUNCTION (Polynomial Rolling Hash)
 * ==============================================
 * Converts string keys to numeric hashes using polynomial accumulation.
 *
 * Why use 31? (The magic number)
 * -----------------------------
 * 31 is a common choice because:
 * 1. It's prime - reduces collisions when combined with modulo
 * 2. Good distribution for ASCII/Unicode strings
 * 3. Prime numbers help minimize patterns and collisions
 * 4. 31 * hash can be optimized by compiler to (hash << 5) - hash
 *
 * Why take modulo each iteration?
 * ------------------------------
 * Prevents integer overflow (hash grows exponentially with string length)
 * Hash values stay within [0, size-1], avoiding memory issues
 * Maintains O(1) memory usage regardless of input size
 *
 * Examples:
 * stringHash("cat", 100) = (('c'*31 + 'a')*31 + 't') % 100
 *                         = ((99*31 + 97)*31 + 116) % 100
 *
 * Even small string changes produce different hashes:
 * "cat" vs "bat" differ by 2 characters, hash values significantly different
 */
function stringHash(key, size) {
	let hash = 0
	for (let i = 0; i < key.length; i++) {
		// Polynomial rolling: multiply current hash by 31, add character code
		// Then take modulo to keep numbers manageable
		hash = (hash * 31 + key.charCodeAt(i)) % size
	}
	return hash
}

function hashMapWithCollisions(entries, size) {
	const table = Array.from({length: size}, () => [])

	entries.forEach(({key, value}) => {
		const index =
			typeof key === 'number'
				? divisionHash(key, size)
				: stringHash(String(key), size)
		const bucket = table[index]

		if (bucket.length > 0) {
			console.log(
				`Collision at index ${index}:`,
				bucket.map((entry) => entry.key),
			)
		}

		bucket.push({key, value})
		console.log(
			`Inserted { key: ${JSON.stringify(key)}, value: ${JSON.stringify(value)} } at index ${index}`,
		)
	})

	return table
}

function printHashMap(table) {
	table.forEach((bucket, index) => {
		if (bucket.length === 0) {
			console.log(`bucket[${index}] -> empty`)
		} else {
			console.log(`bucket[${index}] ->`, bucket)
		}
	})
}

// Drive code examples
console.log('divisionHash(123, 10) =>', divisionHash(123, 10))
console.log('divisionHash(125, 10) =>', divisionHash(125, 10))
console.log('stringHash("cat", 100) =>', stringHash('cat', 100))
console.log('stringHash("bat", 100) =>', stringHash('bat', 100))
console.log('stringHash("hello", 1000) =>', stringHash('hello', 1000))

const hashEntries = [
	{key: 3, value: 'first'},
	{key: 13, value: 'second'},
	{key: 23, value: 'third'},
	{key: 7, value: 'fourth'},
	{key: 'cat', value: 'meow'},
	{key: 'tac', value: 'purr'},
]

const hashTable = hashMapWithCollisions(hashEntries, 10)
console.log('Final hash table:')
printHashMap(hashTable)

/**
 * COMPARISON OF HASH FUNCTIONS
 * ============================
 *
 * COLLISION HANDLING STRATEGIES:
 * -----------------------------
 * 1. Chaining: Each bucket stores a linked list of colliding entries
 * 2. Open Addressing: Find next available slot (linear/quadratic probing)
 * 3. Robin Hood Hashing: Balanced placement to minimize worst-case lookups
 * 4. Cuckoo Hashing: Uses two hash functions for guaranteed O(1) lookups
 *
 * SPACE-TIME TRADEOFFS:
 * --------------------
 * - Larger table size = fewer collisions but more memory usage
 * - Load factor = n/size (entries/buckets) should be <= 0.75 for optimal performance
 * - When load factor exceeds threshold, rehashing (resizing) is triggered
 *
 * REAL-WORLD APPLICATIONS:
 * -----------------------
 * - Database indexing (primary keys, unique constraints)
 * - Caches (Redis, Memcached, browser caches)
 * - Symbol tables in compilers/interpreters
 * - Blockchain (cryptographic hashing for blocks)
 * - Password storage (with additional security measures)
 * - DNS resolution, network routing tables
 * - Plagiarism detection (hash of documents)
 */
