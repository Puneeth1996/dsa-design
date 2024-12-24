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
// const middleNode = function (head) {
//     let newHead = head;
//     let length = 0;
//     while (newHead) {
//       length++;
//       newHead = newHead.next;
//     }

//     let midpoint = Math.floor(length / 2) + 1;

//     while (midpoint > 1) {
//       head = head.next;
//       midpoint--;
//     }

//     return head;
//   };

const middleNode = function (head) {
	let slow = head
	let fast = head

	while (fast && fast.next) {
		slow = slow.next
		fast = fast.next.next
	}

	return slow
}
