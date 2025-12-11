class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class LinkedList {
	constructor() {
		this.head = null
	}

	traverse() {
		let curr = this.head
		while (curr) {
			console.log(curr.value)
			curr = curr.next
		}
	}

	search(target) {
		let curr = this.head
		while (curr) {
			if (curr.value === target) return true
			curr = curr.next
		}
		return false
	}

	insertAtStart(value) {
		const newNode = new Node(value)
		newNode.next = this.head
		this.head = newNode
	}

	insertAtEnd(value) {
		const newNode = new Node(value)
		if (!this.head) {
			this.head = newNode
			return
		}
		let curr = this.head
		while (curr.next) curr = curr.next
		curr.next = newNode
	}

	insertAtPosition(value, position) {
		if (position === 1) return this.insertAtStart(value)

		const newNode = new Node(value)
		let curr = this.head
		let count = 1

		while (curr && count < position - 1) {
			curr = curr.next
			count++
		}

		if (!curr) throw new Error('Position out of bounds')

		newNode.next = curr.next
		curr.next = newNode
	}

	deleteAtStart() {
		if (!this.head) return
		this.head = this.head.next
	}

	deleteAtEnd() {
		if (!this.head) return

		if (!this.head.next) {
			this.head = null
			return
		}

		let curr = this.head
		while (curr.next.next) curr = curr.next
		curr.next = null
	}

	deleteAtPosition(position) {
		if (position === 1) return this.deleteAtStart()

		let curr = this.head
		let count = 1

		while (curr && count < position - 1) {
			curr = curr.next
			count++
		}

		if (!curr || !curr.next) throw new Error('Position out of bounds')

		curr.next = curr.next.next
	}

	countNodes() {
		let count = 0
		let curr = this.head
		while (curr) {
			count++
			curr = curr.next
		}
		return count
	}

	reverse() {
		let prev = null
		let curr = this.head

		while (curr) {
			let nextNode = curr.next
			curr.next = prev

			prev = curr
			curr = nextNode
		}

		this.head = prev
	}
}

// ----- Using the LinkedList -----

const list = new LinkedList()

// Insert at start
list.insertAtStart(30)
list.insertAtStart(20)
list.insertAtStart(10)

console.log('After inserting at start:')
list.traverse() // 10 → 20 → 30

// Insert at end
list.insertAtEnd(40)
list.insertAtEnd(50)

console.log('After inserting at end:')
list.traverse() // 10 → 20 → 30 → 40 → 50

// Insert at a position
list.insertAtPosition(25, 3)
// position 3 means: after 10,20 insert 25

console.log('After inserting 25 at position 3:')
list.traverse() // 10 → 20 → 25 → 30 → 40 → 50

// Search
console.log('Search 30:', list.search(30)) // true
console.log('Search 99:', list.search(99)) // false

// Delete at start
list.deleteAtStart()
console.log('After deleting at start:')
list.traverse() // 20 → 25 → 30 → 40 → 50

// Delete at end
list.deleteAtEnd()
console.log('After deleting at end:')
list.traverse() // 20 → 25 → 30 → 40

// Delete at a position
list.deleteAtPosition(2)
// remove 25 (2nd position)

console.log('After deleting element at position 2:')
list.traverse() // 20 → 30 → 40

// Count nodes
console.log('Total nodes:', list.countNodes()) // 3

// Reverse the list
list.reverse()
console.log('After reversing:')
list.traverse() // 40 → 30 → 20
