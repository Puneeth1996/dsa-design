// Time Complexity o(n)
// Space Complexity o(1)

class Node {
	constructor(value) {
		this.val = value
		this.next = null
	}
}

const head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(2)
head.next.next.next = new Node(3)
head.next.next.next.next = new Node('a')
head.next.next.next.next.next = new Node('a')
//1->2->-2->3->'a'->'a'->null

function removeDupes(head) {
	let curr = head
	while (curr) {
		let nextDistinctVal = curr.next
		while (nextDistinctVal !== null && curr.val === nextDistinctVal.val) {
			nextDistinctVal = nextDistinctVal.next
		}
		curr.next = nextDistinctVal
		curr = nextDistinctVal
	}
	return head
}

removeDupes(head)
