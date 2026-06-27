/**
 * DAY 38 — COLLISION RESOLUTION
 * =============================
 *
 * This file compares collision resolution techniques:
 * - Direct chaining (also called separate chaining)
 * - Open addressing
 *   - Linear probing
 *   - Quadratic probing
 *   - Double hashing
 *
 * It also explains load factor and how each strategy behaves.
 */

/**
 * LOAD FACTOR
 * -----------
 * load factor = number of entries / number of buckets
 *
 * - In separate chaining, it measures average bucket length.
 * - In open addressing, it measures table occupancy.
 *
 * Good rules of thumb:
 * - Separate chaining: keep load factor <= 1 or 0.75 for low collision cost.
 * - Open addressing: keep load factor <= 0.5 to 0.7 for good performance.
 *
 * When load factor increases:
 * - More collisions happen.
 * - Separate chaining makes bucket lists longer.
 * - Open addressing requires more probes to find an empty slot.
 */

function loadFactor(entryCount, bucketCount) {
	return entryCount / bucketCount
}

/**
 * SEPARATE CHAINING
 * -----------------
 * Each bucket is a list of entries.
 * When collisions happen, the colliding entry is appended to the bucket.
 *
 * Pros:
 * - Simple to implement
 * - Easy deletion
 * - Performance degrades gracefully
 *
 * Cons:
 * - Extra memory for buckets/lists
 * - Slower when load factor grows very large
 */
class ChainingHashTable {
	constructor(size) {
		this.size = size
		this.buckets = Array.from({length: size}, () => [])
	}

	_hash(key) {
		return Number(key) % this.size
	}

	insert(key, value) {
		const index = this._hash(key)
		const bucket = this.buckets[index]
		const existing = bucket.find((entry) => entry.key === key)

		if (existing) {
			existing.value = value
			console.log(`Updated key=${key} at bucket ${index}`)
			return
		}

		if (bucket.length > 0) {
			console.log(
				`Chaining collision at index ${index}: existing keys = ${bucket.map((item) => item.key).join(', ')}`,
			)
		}

		bucket.push({key, value})
		console.log(
			`Inserted { key: ${key}, value: ${value} } into bucket ${index}`,
		)
	}

	search(key) {
		const index = this._hash(key)
		const bucket = this.buckets[index]
		const entry = bucket.find((item) => item.key === key)
		console.log(
			`Search key=${key} in bucket ${index} =>`,
			entry || 'not found',
		)
		return entry || null
	}

	delete(key) {
		const index = this._hash(key)
		const bucket = this.buckets[index]
		const initialLength = bucket.length
		this.buckets[index] = bucket.filter((item) => item.key !== key)
		if (this.buckets[index].length < initialLength) {
			console.log(`Deleted key=${key} from bucket ${index}`)
			return true
		}
		console.log(`Key=${key} not found in bucket ${index}`)
		return false
	}

	display() {
		this.buckets.forEach((bucket, i) => {
			if (bucket.length === 0) {
				console.log(`bucket[${i}] -> empty`)
			} else {
				console.log(`bucket[${i}] ->`, bucket)
			}
		})
	}
}

/**
 * OPEN ADDRESSING
 * ----------------
 * Uses the table itself to resolve collisions by searching for another slot.
 * There is no separate list per bucket.
 *
 * Probing strategies implemented here:
 * - Linear probing: index + 1, index + 2, ...
 * - Quadratic probing: index + 1^2, index + 2^2, ...
 * - Double hashing: index + step * secondHash(key), repeated.
 */
class LinearProbingHashTable {
	constructor(size) {
		this.size = size
		this.table = Array.from({length: size}, () => null)
	}

	_hash(key) {
		return Number(key) % this.size
	}

	insert(key, value) {
		let index = this._hash(key)
		let step = 0
		while (this.table[index] !== null) {
			console.log(
				`Linear probing collision at index ${index} for key=${key}`,
			)
			step += 1
			index = (index + 1) % this.size
			if (step >= this.size) {
				throw new Error('Hash table is full')
			}
		}
		this.table[index] = {key, value}
		console.log(
			`Linear probing inserted { key: ${key}, value: ${value} } at index ${index}`,
		)
	}

	search(key) {
		let index = this._hash(key)
		let step = 0
		while (this.table[index] !== null && this.table[index].key !== key) {
			step += 1
			index = (index + 1) % this.size
			if (step >= this.size) {
				break
			}
		}
		const entry =
			this.table[index] && this.table[index].key === key
				? this.table[index]
				: null
		console.log(`Search key=${key} =>`, entry || 'not found')
		return entry
	}

	display() {
		this.table.forEach((entry, i) => {
			if (entry === null) {
				console.log(`slot[${i}] -> empty`)
			} else {
				console.log(`slot[${i}] ->`, entry)
			}
		})
	}
}

class QuadraticProbingHashTable {
	constructor(size) {
		this.size = size
		this.table = Array.from({length: size}, () => null)
	}

	_hash(key) {
		return Number(key) % this.size
	}

	insert(key, value) {
		const baseIndex = this._hash(key)
		let index = baseIndex
		let step = 0
		while (this.table[index] !== null) {
			console.log(
				`Quadratic probing collision at index ${index} for key=${key}, step=${step}`,
			)
			step += 1
			index = (baseIndex + step * step) % this.size
			if (step >= this.size) {
				throw new Error('Hash table is full')
			}
		}
		this.table[index] = {key, value}
		console.log(
			`Quadratic probing inserted { key: ${key}, value: ${value} } at index ${index}`,
		)
	}

	search(key) {
		const baseIndex = this._hash(key)
		let index = baseIndex
		let step = 0
		while (this.table[index] !== null && this.table[index].key !== key) {
			step += 1
			index = (baseIndex + step * step) % this.size
			if (step >= this.size) {
				break
			}
		}
		const entry =
			this.table[index] && this.table[index].key === key
				? this.table[index]
				: null
		console.log(`Search key=${key} =>`, entry || 'not found')
		return entry
	}

	display() {
		this.table.forEach((entry, i) => {
			if (entry === null) {
				console.log(`slot[${i}] -> empty`)
			} else {
				console.log(`slot[${i}] ->`, entry)
			}
		})
	}
}

class DoubleHashingHashTable {
	constructor(size) {
		this.size = size
		this.table = Array.from({length: size}, () => null)
	}

	_hash(key) {
		return Number(key) % this.size
	}

	_prevPrimeBelow(n) {
		for (let candidate = n - 1; candidate >= 2; candidate -= 1) {
			let isPrime = true
			for (let divisor = 2; divisor * divisor <= candidate; divisor += 1) {
				if (candidate % divisor === 0) {
					isPrime = false
					break
				}
			}
			if (isPrime) {
				return candidate
			}
		}
		return 2
	}

	_secondHash(key) {
		const prime = this._prevPrimeBelow(this.size)
		return prime - (Number(key) % prime)
	}

	_probeIndex(baseIndex, step, stepSize) {
		return (baseIndex + step * stepSize) % this.size
	}

	insert(key, value) {
		const baseIndex = this._hash(key)
		const stepSize = this._secondHash(key)
		let index = baseIndex
		let step = 0
		while (this.table[index] !== null) {
			console.log(
				`Double hashing collision at index ${index} for key=${key}, step=${step}, stepSize=${stepSize}`,
			)
			step += 1
			index = this._probeIndex(baseIndex, step, stepSize)
			if (step >= this.size) {
				throw new Error('Hash table is full')
			}
		}
		this.table[index] = {key, value}
		console.log(
			`Double hashing inserted { key: ${key}, value: ${value} } at index ${index}`,
		)
	}

	search(key) {
		const baseIndex = this._hash(key)
		const stepSize = this._secondHash(key)
		let index = baseIndex
		let step = 0
		while (this.table[index] !== null && this.table[index].key !== key) {
			step += 1
			index = this._probeIndex(baseIndex, step, stepSize)
			if (step >= this.size) {
				break
			}
		}
		const entry =
			this.table[index] && this.table[index].key === key
				? this.table[index]
				: null
		console.log(`Search key=${key} =>`, entry || 'not found')
		return entry
	}

	display() {
		this.table.forEach((entry, i) => {
			if (entry === null) {
				console.log(`slot[${i}] -> empty`)
			} else {
				console.log(`slot[${i}] ->`, entry)
			}
		})
	}
}

// Example usage and comparison logs
console.log('--- Load Factor ---')
console.log('loadFactor(5, 10) =', loadFactor(5, 10))
console.log('loadFactor(8, 10) =', loadFactor(8, 10))
console.log('loadFactor(12, 10) =', loadFactor(12, 10))

console.log('\n--- Separate Chaining ---')
const chainingTable = new ChainingHashTable(10)
;[18, 41, 22, 44, 59, 32, 31, 73].forEach((key, index) =>
	chainingTable.insert(key, `value${index + 1}`),
)
chainingTable.display()
chainingTable.search(44)
chainingTable.delete(22)
chainingTable.display()

console.log('\n--- Open Addressing: Linear Probing ---')
const linearTable = new LinearProbingHashTable(10)
;[3, 13, 23, 4].forEach((key, index) =>
	linearTable.insert(key, `value${index + 1}`),
)
linearTable.display()
linearTable.search(23)

console.log('\n--- Open Addressing: Quadratic Probing ---')
const quadraticTable = new QuadraticProbingHashTable(10)
;[3, 13, 23, 4].forEach((key, index) =>
	quadraticTable.insert(key, `value${index + 1}`),
)
quadraticTable.display()
quadraticTable.search(23)

console.log('\n--- Open Addressing: Double Hashing ---')
const doubleHashTable = new DoubleHashingHashTable(10)
;[3, 13, 23, 4].forEach((key, index) =>
	doubleHashTable.insert(key, `value${index + 1}`),
)
doubleHashTable.display()
doubleHashTable.search(23)

/**
 * SUMMARY
 * -------
 * separate chaining:
 * - Uses linked buckets.
 * - Collisions are stored in bucket lists.
 * - Good when load factor can be > 1.
 *
 * open addressing:
 * - Stores everything in the array itself.
 * - Uses probes to find empty slots.
 * - Works best at low load factor.
 *
 * linear probing:
 * - Simple: next sequential slot.
 * - Can cause clustering (many consecutive filled slots).
 *
 * quadratic probing:
 * - Jumps by square offsets.
 * - Reduces clustering but still depends on the table size.
 *
 * double hashing:
 * - Uses a second hash to compute probe steps.
 * - Reduces primary clustering and improves probe distribution.
 */
