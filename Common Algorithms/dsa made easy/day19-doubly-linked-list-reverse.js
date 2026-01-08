class DLLNode {
	constructor(value) {
		this.value = value
		this.prev = null
		this.next = null
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null
	}

	insert(value) {
		const node = new DLLNode(value)
		if (!this.head) {
			this.head = node
			return
		}

		let curr = this.head
		while (curr.next) curr = curr.next

		curr.next = node
		node.prev = curr
	}

	print() {
		let curr = this.head
		let result = []
		while (curr) {
			result.push(curr.value)
			curr = curr.next
		}
		console.log(result.join(' <-> '))
	}
	// Time O(n) Space O(1)
	reverseIterative() {
		let current = this.head
		let previousNode = null

		while (current) {
			// Swap prev and next pointers
			previousNode = current.prev
			current.prev = current.next
			current.next = previousNode

			// Move to next node (which is now in prev due to swap)
			current = current.prev
		}

		// Update head to the last processed node
		if (previousNode) this.head = previousNode.prev
	}
	// Time O(n) Space O(n) due to recursion stack
	reverseRecursive(node = this.head) {
		if (!node) return null

		// Swap prev and next pointers for current node
		let originalPrev = node.prev
		node.prev = node.next
		node.next = originalPrev

		// If this is the last node (no prev after swap), update head
		if (!node.prev) {
			this.head = node
			return
		}

		// Recursively process the next node (now in prev)
		this.reverseRecursive(node.prev)
	}
}

const dll = new DoublyLinkedList()
;[10, 20, 30, 40].forEach((v) => dll.insert(v))

dll.print() // 10 <-> 20 <-> 30 <-> 40
dll.reverseIterative()
dll.print() // 40 <-> 30 <-> 20 <-> 10
dll.reverseRecursive()
dll.print() // 10 <-> 20 <-> 30 <-> 40
