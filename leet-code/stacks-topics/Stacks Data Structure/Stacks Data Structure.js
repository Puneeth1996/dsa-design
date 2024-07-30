// stacks & ques are done with Arrays
// Push and pop are T(1) and O(1) is constant time & space
// Enque and deque for ques
class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}
//LIFO
//add at beg
//remove from the beg
class Stack {
	constructor() {
		this.first = null
		this.last = null
		this.size = 0
	}
	addAtBeginning(value) {
		const node = new Node(value)
		if (!this.first) {
			this.first = node
			this.last = node
		} else {
			let temp = this.first
			this.first = node
			this.first.next = temp
		}
		this.size++
		return this
	}
	removeFromBeginning() {
		if (!this.first) return null
		let temp = this.first
		this.first = this.first.next
		this.size--
		if (this.size === 0) {
			this.last = null
		}
		return temp
	}
}

const stack = new Stack()
