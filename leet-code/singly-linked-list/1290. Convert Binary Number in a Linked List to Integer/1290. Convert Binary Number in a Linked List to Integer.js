/**
 * Definition for singly-linked list:
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function (head) {
	let result = 0
	while (head !== null) {
		result = result * 2 + head.val // Shift left and add current bit --> result = (result << 1) | head.val;
		head = head.next
	}
	return result
}
// Time	O(n)	You visit each node once
// Space	O(1)	Constant space — only result is used
