class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class CircularLinkedList {
	constructor() {
		this.head = null
		this.size = 0
	}

	// 1 Insert at Beginning — O(n)
	insertAtBeginning(value) {
		const newNode = new Node(value)

		if (!this.head) {
			newNode.next = newNode
			this.head = newNode
		} else {
			let tail = this.head
			while (tail.next !== this.head) {
				tail = tail.next
			}
			newNode.next = this.head
			tail.next = newNode
			this.head = newNode
		}

		this.size++
		console.log(`Inserted ${value} at beginning`)
	}

	// 2 Insert at End — O(n)
	insertAtEnd(value) {
		const newNode = new Node(value)

		if (!this.head) {
			newNode.next = newNode
			this.head = newNode
		} else {
			let tail = this.head
			while (tail.next !== this.head) {
				tail = tail.next
			}
			tail.next = newNode
			newNode.next = this.head
		}

		this.size++
		console.log(`Inserted ${value} at end`)
	}

	// 3 Insert at Position — O(n)
	insertAtPosition(value, position) {
		if (position < 0 || position > this.size) {
			console.log('Invalid position')
			return
		}

		if (position === 0) {
			this.insertAtBeginning(value)
			return
		}

		const newNode = new Node(value)
		let curr = this.head

		for (let i = 0; i < position - 1; i++) {
			curr = curr.next
		}

		newNode.next = curr.next
		curr.next = newNode
		this.size++

		console.log(`Inserted ${value} at position ${position}`)
	}

	// 4 Delete from Beginning — O(n)
	deleteFromBeginning() {
		if (!this.head) {
			console.log('List is empty')
			return
		}

		if (this.head.next === this.head) {
			console.log(`Deleted ${this.head.value}`)
			this.head = null
		} else {
			let tail = this.head
			while (tail.next !== this.head) {
				tail = tail.next
			}
			console.log(`Deleted ${this.head.value}`)
			tail.next = this.head.next
			this.head = this.head.next
		}

		this.size--
	}

	// 5 Delete from End — O(n)
	deleteFromEnd() {
		if (!this.head) {
			console.log('List is empty')
			return
		}

		if (this.head.next === this.head) {
			console.log(`Deleted ${this.head.value}`)
			this.head = null
		} else {
			let curr = this.head
			let prev = null

			while (curr.next !== this.head) {
				prev = curr
				curr = curr.next
			}

			console.log(`Deleted ${curr.value}`)
			prev.next = this.head
		}

		this.size--
	}

	// 6 Delete by Value — O(n)
	deleteByValue(value) {
		if (!this.head) {
			console.log('List is empty')
			return
		}

		let curr = this.head
		let prev = null

		do {
			if (curr.value === value) {
				if (prev === null) {
					this.deleteFromBeginning()
				} else {
					prev.next = curr.next
					console.log(`Deleted ${value}`)
					this.size--
				}
				return
			}
			prev = curr
			curr = curr.next
		} while (curr !== this.head)

		console.log('Value not found')
	}

	// 7 Search — O(n)
	search(value) {
		if (!this.head) return false

		let curr = this.head
		do {
			if (curr.value === value) return true
			curr = curr.next
		} while (curr !== this.head)

		return false
	}

	// 8 Display — O(n)
	display() {
		if (!this.head) {
			console.log('List is empty')
			return
		}

		let curr = this.head
		let result = []

		do {
			result.push(curr.value)
			curr = curr.next
		} while (curr !== this.head)

		console.log(result.join(' → '), '→ back to head')
	}

	// 9 Size — O(1)
	getSize() {
		return this.size
	}
}

const cll = new CircularLinkedList()

cll.insertAtBeginning(10)
cll.insertAtEnd(20)
cll.insertAtEnd(30)
cll.insertAtBeginning(5)
cll.insertAtPosition(15, 2)

cll.display()

console.log('Search 20:', cll.search(20))
console.log('Search 100:', cll.search(100))

cll.deleteFromBeginning()
cll.deleteFromEnd()
cll.deleteByValue(15)

cll.display()
console.log('Size:', cll.getSize())
