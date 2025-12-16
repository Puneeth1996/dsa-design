// ===============================
// Node Definition
// ===============================
class Node {
	constructor(value) {
		this.value = value
		this.prev = null
		this.next = null
	}
}

// ===============================
// Doubly Linked List
// ===============================
class DoublyLinkedList {
	constructor() {
		this.head = null
		this.tail = null
		this.length = 0
	}

	// ===============================
	// Insert Operations
	// ===============================

	insertAtHead(value) {
		const newNode = new Node(value)

		if (!this.head) {
			this.head = this.tail = newNode
		} else {
			newNode.next = this.head
			this.head.prev = newNode
			this.head = newNode
		}

		this.length++
	}

	insertAtTail(value) {
		const newNode = new Node(value)

		if (!this.tail) {
			this.head = this.tail = newNode
		} else {
			this.tail.next = newNode
			newNode.prev = this.tail
			this.tail = newNode
		}

		this.length++
	}

	insertAt(index, value) {
		if (index < 0 || index > this.length) {
			console.log('Invalid index')
			return
		}

		if (index === 0) return this.insertAtHead(value)
		if (index === this.length) return this.insertAtTail(value)

		let curr = this.head
		for (let i = 0; i < index - 1; i++) {
			curr = curr.next
		}

		const newNode = new Node(value)
		newNode.next = curr.next
		newNode.prev = curr
		curr.next.prev = newNode
		curr.next = newNode

		this.length++
	}

	// ===============================
	// Delete Operations
	// ===============================

	deleteHead() {
		if (!this.head) return

		if (this.head === this.tail) {
			this.head = this.tail = null
		} else {
			this.head = this.head.next
			this.head.prev = null
		}

		this.length--
	}

	deleteTail() {
		if (!this.tail) return

		if (this.head === this.tail) {
			this.head = this.tail = null
		} else {
			this.tail = this.tail.prev
			this.tail.next = null
		}

		this.length--
	}

	deleteByValue(value) {
		if (!this.head) return

		let curr = this.head

		while (curr) {
			if (curr.value === value) {
				if (curr === this.head) return this.deleteHead()
				if (curr === this.tail) return this.deleteTail()

				curr.prev.next = curr.next
				curr.next.prev = curr.prev

				this.length--
				return
			}
			curr = curr.next
		}
	}

	deleteAt(index) {
		if (index < 0 || index >= this.length) {
			console.log('Invalid index')
			return
		}

		if (index === 0) return this.deleteHead()
		if (index === this.length - 1) return this.deleteTail()

		let curr = this.head
		for (let i = 0; i < index; i++) {
			curr = curr.next
		}

		curr.prev.next = curr.next
		curr.next.prev = curr.prev

		this.length--
	}

	// ===============================
	// Search
	// ===============================

	search(value) {
		let curr = this.head

		while (curr) {
			if (curr.value === value) return true
			curr = curr.next
		}

		return false
	}

	// ===============================
	// Traversal
	// ===============================

	traverseForward() {
		let curr = this.head
		let result = []

		while (curr) {
			result.push(curr.value)
			curr = curr.next
		}

		console.log('Forward :', result.join(' <-> '))
	}

	traverseBackward() {
		let curr = this.tail
		let result = []

		while (curr) {
			result.push(curr.value)
			curr = curr.prev
		}

		console.log('Backward:', result.join(' <-> '))
	}

	// ===============================
	// Utility
	// ===============================

	size() {
		return this.length
	}

	isEmpty() {
		return this.length === 0
	}

	clear() {
		this.head = this.tail = null
		this.length = 0
	}
}

// ===============================
// Demo / Test
// ===============================

const dll = new DoublyLinkedList()

dll.insertAtHead(10)
dll.insertAtHead(5)
dll.insertAtTail(20)
dll.insertAtTail(30)
dll.insertAt(2, 15)

dll.traverseForward() // 5 <-> 10 <-> 15 <-> 20 <-> 30
dll.traverseBackward() // 30 <-> 20 <-> 15 <-> 10 <-> 5

console.log(dll.search(15)) // true
console.log(dll.search(100)) // false

dll.deleteByValue(15)
dll.traverseForward() // 5 <-> 10 <-> 20 <-> 30

dll.deleteAt(1)
dll.traverseForward() // 5 <-> 20 <-> 30

dll.deleteHead()
dll.deleteTail()
dll.traverseForward() // 20

console.log('Size:', dll.size()) // 1

// Time & Space Summary Table
// Operation	Time	Space
// Insert Head	O(1)	O(1)
// Insert Tail	O(1)	O(1)
// Insert at Index	O(n)	O(1)
// Delete Head	O(1)	O(1)
// Delete Tail	O(1)	O(1)
// Delete by Value	O(n)	O(1)
// Search	O(n)	O(1)
// Traverse	O(n)	O(1)
