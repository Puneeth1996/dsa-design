/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
	let slow = head
	let fast = head

	while (fast && fast.next) {
		fast = fast.next.next
		slow = slow.next
	}

	// Reverse the second half of the linked list, starting from the slow pointer.
	let prev = null
	while (slow) {
		const next = slow.next
		slow.next = prev
		prev = slow
		slow = next
	}

	// The 'prev' pointer now points to the head of the reversed second half of the list. 'head' points to the beginning of the first half.

	// Initialize 'maxSum' to keep track of the maximum twin sum.
	let maxSum = 0

	// Iterate through both halves of the list.
	let left = head
	let right = prev

	// Calculate the twin sum by adding values of 'left' and 'right' pointers and update 'maxSum' if a larger sum is found.
	while (left && right) {
		maxSum = Math.max(maxSum, left.val + right.val)
		left = left.next
		right = right.next
	}

	// Return the maximum twin sum after traversing the entire list.
	return maxSum
}
// Time complexity  O(n)
// Space complexity S(1)
// The idea of this problem is
// we have slow and fast pointer slow goes 1 step and fast goes 2 steps
// Knowing that the linked list given is always even
// The fast pointer on reaching the last element would have the slow pointer to point at half-th node
// Now once we reverse the half direction of the linked in which is pointed by slow pointer
// we run through the 1st half and reversed 2nd half of linked list and find the twin sum
