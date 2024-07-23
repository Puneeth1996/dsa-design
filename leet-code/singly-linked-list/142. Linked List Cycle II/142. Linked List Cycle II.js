/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
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

var detectCycle = function (head) {
	if (!head) return null
	if (!head.next) return null

	let hare = head
	let tortoise = head
	while (hare && hare.next) {
		hare = hare.next.next
		tortoise = tortoise.next
		if (hare === tortoise) break
	}
	if (hare !== tortoise) return null
	// find where cycle begins
	let pointer = head
	while (pointer !== tortoise) {
		pointer = pointer.next
		tortoise = tortoise.next
	}
	return tortoise
}

// brute force method with hashtable for tracking visted nodes
// Time Complexity - O(n) -> should traverse the linkedlist
// Space Complexity - o(n) -> Hash table should be created which stores values of the linkedlist

// Floyd tortoise and haire algorithm
// Two pointers one is haire and tortoise
// Haire Pointer moves two steps and tortoise is going to move one steps each time
// If there is a cycle in the linkedlist than haire and tortoise pointers meet
// finding where the cycle begins, we need to move the tortoise pointer once the both pointers are meet

// Time Complexity - O(n) -> Tortoise pointer is going to go one step through the linkedlist
// Space complexity - O(1) as no extra space is used

// You can understand sepratly on where the cycle begins,
// The head to cycle point and meeting point to cycle point

// class Node {
// 	constructor(value) {
// 		this.value = value
// 		this.next = null
// 	}
// }

// const checkLoop = function (head) {
// 	if (!head) return null
// 	if (!head.next) return null

// 	let hare = head
// 	let tortoise = head
// 	while (hare && hare.next) {
// 		hare = hare.next.next
// 		tortoise = tortoise.next
// 		if (hare === tortoise) break
// 	}
// 	if (hare !== tortoise) return null
// 	// find where cycle begins
// 	let pointer = head
// 	while (pointer !== tortoise) {
// 		pointer = pointer.next
// 		tortoise = tortoise.next
// 	}
// 	return tortoise
// }
