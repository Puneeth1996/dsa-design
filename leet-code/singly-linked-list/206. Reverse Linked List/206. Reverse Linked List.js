// Time Complexity - O(n) traverse through the singly linkedlist
// Space Complexity - S(1) No Extra space is needed

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

const head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)

function reverseList(head) {
	let prev = null
	let current = head
	while (current) {
		let next = current.next
		current.next = prev
		prev = current
		current = next
	}
	return prev
}
console.log(reverseList(head))
