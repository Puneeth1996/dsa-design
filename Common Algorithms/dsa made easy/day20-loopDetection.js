class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}
// Time: O(n), Space: O(n)
function detectLoopUsingHash(head) {
	const visited = new Set()
	let current = head

	while (current !== null) {
		// If node already visited, loop found
		if (visited.has(current)) {
			return true
		}

		visited.add(current)
		current = current.next
	}

	// Reached null → no loop
	return false
}
// Time: O(n), Space: O(1)
function detectLoopUsingFloyd(head) {
	let slow = head
	let fast = head

	while (fast !== null && fast.next !== null) {
		slow = slow.next // move 1 step
		fast = fast.next.next // move 2 steps

		if (slow === fast) {
			return true // loop detected
		}
	}

	return false // no loop
}
// Creating linked list: 1 → 2 → 3 → 4 → 2 (loop)

const head = new Node(1)
const second = new Node(2)
const third = new Node(3)
const fourth = new Node(4)

head.next = second
second.next = third
third.next = fourth
fourth.next = second // loop here

console.log(detectLoopUsingHash(head)) // true
console.log(detectLoopUsingFloyd(head)) // true
