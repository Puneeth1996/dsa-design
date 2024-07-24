/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// Time  Complexity = O(n) of the order of longer linkedlist
// Space Complexity = O(n) size of the longer linkedList
var addTwoNumbers = function (l1, l2) {}

// class Node {
// 	constructor(value) {
// 		this.value = value
// 		this.next = null
// 	}
// }

// class LinkedList {
// 	constructor() {
// 		this.head = null
// 		this.tail = null
// 		this.size = 0
// 	}
// 	addAtTail(value) {
// 		const node = new Node(value)
// 		if (!this.head) {
// 			this.head = node
// 			this.tail = this.head
// 		} else {
// 			this.tail.next = node
// 			this.tail = node
// 		}
// 		this.size++
// 		return this
// 	}
// }

// const add2Numbers = function (l1, l2) {
// 	let carryForward = 0
// 	const results = new LinkedList()
// 	while (l1 || l2 || carryForward) {
// 		let l1Value = l1 ? l1.value : 0
// 		let l2Value = l2 ? l2.value : 0
// 		let sum = l1Value + l2Value + carryForward
// 		let nodeValueInResult = sum % 10
// 		results.addAtTail(nodeValueInResult)
// 		carryForward = Math.floor(sum / 10)
// 		l1 = l1 ? l1.next : null
// 		l2 = l2 ? l2.next : null
// 	}
// 	return results
// }

// const n1 = new LinkedList()
// const n2 = new LinkedList()
// //540 + 723 = 1263
// n1.addAtTail(0)
// n1.addAtTail(4)
// n1.addAtTail(5)

// n2.addAtTail(3)
// n2.addAtTail(2)
// n2.addAtTail(7)

// add2Numbers(n1.head, n2.head)

// Solution From https://github.com/iCherya/leetCode/blob/main/algorithms/2-Add-Two-Numbers.js
/* global ListNode */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
	const head = new ListNode(0)
	let carry = 0,
		sum = 0,
		now = head,
		a = l1,
		b = l2

	while (a !== null || b !== null) {
		sum = (a ? a.val : 0) + (b ? b.val : 0) + carry
		carry = Math.floor(sum / 10)
		now.next = new ListNode(sum % 10)
		now = now.next
		a = a ? a.next : null
		b = b ? b.next : null
	}

	if (carry) now.next = new ListNode(carry)

	return head.next
}
