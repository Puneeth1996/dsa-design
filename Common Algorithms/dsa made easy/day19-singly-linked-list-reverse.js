class SLLNode {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class SinglyLinkedList {
	constructor() {
		this.head = null
	}

	insert(value) {
		const node = new SLLNode(value)
		if (!this.head) {
			this.head = node
			return
		}

		let curr = this.head
		while (curr.next) curr = curr.next
		curr.next = node
	}

	print() {
		let curr = this.head
		let result = []
		while (curr) {
			result.push(curr.value)
			curr = curr.next
		}
		console.log(result.join(' -> '))
	}
	// Time O(n) Space O(1)
	reverseIterative() {
		let previous = null
		let current = this.head

		while (current) {
			let nextNode = current.next // Store next before breaking link
			current.next = previous     // Reverse the link
			previous = current          // Move previous forward
			current = nextNode          // Move current forward
		}

		this.head = previous // Update head to the last node
	}
	// Time O(n) Space O(n) due to recursion stack
	reverseRecursive(node = this.head) {
		// Base case: empty list or single node
		if (!node || !node.next) {
			this.head = node
			return node
		}

		// Recursively reverse the rest of the list
		let newHead = this.reverseRecursive(node.next)

		// Reverse: make next node point back to current, then break forward link
		node.next.next = node
		node.next = null

		return newHead
	}
}

const sll = new SinglyLinkedList()
;[1, 2, 3, 4, 5].forEach((v) => sll.insert(v))

sll.print() // 1 -> 2 -> 3 -> 4 -> 5
sll.reverseIterative()
sll.print() // 5 -> 4 -> 3 -> 2 -> 1
sll.reverseRecursive()
sll.print() // 1 -> 2 -> 3 -> 4 -> 5
