// class Node {
// 	constructor(value) {
// 		this.value = value
// 		this.next = null
// 	}
// }

// class SinglyLinkedList {
// 	constructor() {
// 		this.head = null
// 		this.tail = null
// 		this.size = 0
// 	}
// 	get(index) {
// 		if (index < 0 || index >= this.size) return -1
// 		let counter = 0
// 		let current = this.head
// 		while (counter !== index) {
// 			current = current.next
// 			counter++
// 		}
// 		return current
// 	}
// 	addAtHead(value) {
// 		const node = new Node(value)
// 		if (!this.head) {
// 			this.head = node
// 			this.tail = node
// 		} else {
// 			node.next = this.head
// 			this.head = node
// 		}
// 		this.size++
// 		return this
// 	}
// 	addAtTail(value) {
// 		const node = new Node(value)
// 		if (!this.head) {
// 			this.head = node
// 			this.tail = node
// 		} else {
// 			this.tail.next = node
// 			this.tail = node
// 		}
// 		this.size++
// 		return this
// 	}
// 	addAtIndex(index, value) {
// 		if (index < 0 || index > this.size) return 'invalid index'
// 		if (index === this.size) return this.addAtTail(value)
// 		if (index === 0) return this.addAtHead(value)
// 		const node = new Node(value) // 1->2->3->null   1->5->2->3->null
// 		let prev = this.get(index - 1)
// 		let temp = prev.next
// 		prev.next = node
// 		node.next = temp
// 		this.size++
// 		return this
// 	}
// 	deleteAtIndex(index) {
// 		if (index < 0 || index >= this.size) return 'invalid index'
// 		//return the node that we are deleting
// 		if (index === 0) {
// 			//delete head
// 			let temp = this.head
// 			this.head = temp.next
// 			this.size--
// 			if (this.size === 0) {
// 				this.tail = null
// 			}
// 			return temp
// 		}
// 		if (index === this.size - 1) {
// 			//delete tail
// 			let oldTail = this.tail // 1->2->null
// 			let newTail = this.get(index - 1)
// 			this.tail = newTail
// 			newTail.next = null
// 			this.size--
// 			// dont need to check if size = 0
// 			return oldTail
// 		}
// 		//delete another node
// 		// 1->2->3->null
// 		let prev = this.get(index - 1)
// 		let deletedNode = prev.next
// 		prev.next = deletedNode.next
// 		this.size--
// 		return deletedNode
// 	}
// }

// const sl = new SinglyLinkedList()
// sl.addAtHead(1)
// sl.addAtTail(2)
// sl.addAtIndex(2, 3)

// Sumary of time complexity
// get(index) T(index)
// addAtHead(value) T(1)
// addAtTail(value) T(1)
// addAtIndex(index,value) T(index)
// deleteAtIndex(index,value) T(index)

// class Node {
// 	constructor(value) {
// 		this.value = value
// 		this.next = null
// 	}
// }

// var MyLinkedList = function () {
// 	this.head = null
// 	this.tail = null
// 	this.size = 0
// }

// /**
//  * @param {number} index
//  * @return {number}
//  */
// MyLinkedList.prototype.get = function (index) {
// 	if (index < 0 || index >= this.size) return -1
// 	let counter = 0
// 	let current = this.head
// 	while (counter !== index) {
// 		current = current.next
// 		counter++
// 	}
// 	return current
// }

// /**
//  * @param {number} val
//  * @return {void}
//  */
// MyLinkedList.prototype.addAtHead = function (value) {
// 	const node = new Node(value)
// 	if (!this.head) {
// 		this.head = node
// 		this.tail = node
// 	} else {
// 		node.next = this.head
// 		this.head = node
// 	}
// 	this.size++
// 	return this
// }

// /**
//  * @param {number} val
//  * @return {void}
//  */
// MyLinkedList.prototype.addAtTail = function (value) {
// 	const node = new Node(value)
// 	if (!this.head) {
// 		this.head = node
// 		this.tail = node
// 	} else {
// 		this.tail.next = node
// 		this.tail = node
// 	}
// 	this.size++
// 	return this
// }

// /**
//  * @param {number} index
//  * @param {number} val
//  * @return {void}
//  */
// MyLinkedList.prototype.addAtIndex = function (index, value) {
// 	if (index < 0 || index > this.size) return 'invalid index'
// 	if (index === this.size) return this.addAtTail(value)
// 	if (index === 0) return this.addAtHead(value)
// 	const node = new Node(value) // 1->2->3->null   1->5->2->3->null
// 	let prev = this.get(index - 1)
// 	let temp = prev.next
// 	prev.next = node
// 	node.next = temp
// 	this.size++
// 	return this
// }

// /**
//  * @param {number} index
//  * @return {void}
//  */
// MyLinkedList.prototype.deleteAtIndex = function (index) {
// 	if (index < 0 || index >= this.size) return 'invalid index'
// 	//return the node that we are deleting
// 	if (index === 0) {
// 		//delete head
// 		let temp = this.head
// 		this.head = temp.next
// 		this.size--
// 		if (this.size === 0) {
// 			this.tail = null
// 		}
// 		return temp
// 	}
// 	if (index === this.size - 1) {
// 		//delete tail
// 		let oldTail = this.tail // 1->2->null
// 		let newTail = this.get(index - 1)
// 		this.tail = newTail
// 		newTail.next = null
// 		this.size--
// 		// dont need to check if size = 0
// 		return oldTail
// 	}
// 	//delete another node
// 	// 1->2->3->null
// 	let prev = this.get(index - 1)
// 	let deletedNode = prev.next
// 	prev.next = deletedNode.next
// 	this.size--
// 	return deletedNode
// }

// /**
//  * Your MyLinkedList object will be instantiated and called as such:
//  * var obj = new MyLinkedList()
//  * var param_1 = obj.get(index)
//  * obj.addAtHead(val)
//  * obj.addAtTail(val)
//  * obj.addAtIndex(index,val)
//  * obj.deleteAtIndex(index)
//  */

// Solution from github /iCherya/leetCode/blob/main/algorithms/707-Design-Linked-List.js
// eslint-disable-next-line no-redeclare
class Node {
	constructor(val) {
		this.val = val
		this.next = null
	}
}

class MyLinkedList {
	constructor(head) {
		this.head = head
		this.tail = null
		this.size = 0
	}

	/**
	 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
	 * @param {number} index
	 * @return {number}
	 */
	get(index) {
		if (index >= this.size || index < 0) return -1

		let idx = 0
		let current = this.head

		while (current) {
			if (idx === index) return current.val

			current = current.next
			idx++
		}
	}

	/**
	 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
	 * @param {number} val
	 * @return {void}
	 */
	addAtHead(val) {
		const node = new Node(val)

		if (this.head) {
			node.next = this.head
			this.head = node
		} else {
			this.head = node
			this.tail = this.head
		}

		this.size++
	}

	/**
	 * Append a node of value val to the last element of the linked list.
	 * @param {number} val
	 * @return {void}
	 */
	addAtTail(val) {
		const node = new Node(val)

		if (this.tail) this.tail.next = node
		else this.head = node

		this.tail = node
		this.size++
	}

	/**
	 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
	 * @param {number} index
	 * @param {number} val
	 * @return {void}
	 */
	addAtIndex(index, val) {
		if (index > this.size) return

		if (index === this.size) {
			this.addAtTail(val)
			return
		}

		if (index === 0) {
			this.addAtHead(val)
			return
		}

		let idx = 0
		let current = this.head

		while (current) {
			if (idx === index - 1) {
				const node = new Node(val)

				node.next = current.next
				current.next = node

				this.size++
				return
			}

			current = current.next
			idx++
		}
	}

	/**
	 * Delete the index-th node in the linked list, if the index is valid.
	 * @param {number} index
	 * @return {void}
	 */
	deleteAtIndex(index) {
		if (index >= this.size || index < 0) return

		if (index === 0) {
			this.head = this.head.next
			this.size--

			if (this.size === 0) this.tail = null
			return
		}

		let idx = 0
		let current = this.head

		while (current) {
			if (idx === index - 1) {
				current.next = current.next.next ? current.next.next : null

				if (!current.next) {
					this.tail = current
				}

				this.size--
				return
			}

			current = current.next
			idx++
		}
	}
}
