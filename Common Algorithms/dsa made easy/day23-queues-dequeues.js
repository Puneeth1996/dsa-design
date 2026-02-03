// Queue using Array
class QueueArrayOptimized {
	constructor() {
		this.queue = {}
		this.frontIndex = 0
		this.rearIndex = 0
	}

	enqueue(value) {
		this.queue[this.rearIndex] = value
		this.rearIndex++
	}

	dequeue() {
		if (this.isEmpty()) return null

		// return this.queue.shift();    // O(n) ❌
		// Using shift() is O(n) because elements are re-indexed.

		const value = this.queue[this.frontIndex]
		delete this.queue[this.frontIndex]
		this.frontIndex++
		return value
	}

	front() {
		return this.isEmpty() ? null : this.queue[this.frontIndex]
	}

	isEmpty() {
		return this.frontIndex === this.rearIndex
	}

	size() {
		return this.rearIndex - this.frontIndex
	}
}
// Complexity
// Operation	Time
// enqueue	O(1)
// dequeue	O(1)
// space	O(n)

// Queue using Array (Simple Implementation with slice)
class QueueArray {
	constructor() {
		this.queue = []
	}

	enqueue(value) {
		this.queue.push(value) // O(1)
	}

	dequeue() {
		if (this.isEmpty()) return null
		const removed = this.queue[0]
		this.queue = this.queue.slice(1) // O(n) - creates new array
		return removed
	}

	front() {
		return this.isEmpty() ? null : this.queue[0]
	}

	isEmpty() {
		return this.queue.length === 0
	}

	size() {
		return this.queue.length
	}
}
// Complexity
// Operation	Time
// enqueue	O(1)
// dequeue	O(n) - slice creates new array
// space	O(n)

// Queue using Linked List
class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class QueueLinkedList {
	constructor() {
		this.front = null
		this.rear = null
		this.length = 0
	}

	enqueue(value) {
		const newNode = new Node(value)

		if (this.isEmpty()) {
			this.front = this.rear = newNode
		} else {
			this.rear.next = newNode
			this.rear = newNode
		}
		this.length++
	}

	dequeue() {
		if (this.isEmpty()) return null

		const removed = this.front
		this.front = this.front.next

		if (!this.front) {
			this.rear = null
		}

		this.length--
		return removed.value
	}

	peek() {
		return this.isEmpty() ? null : this.front.value
	}

	isEmpty() {
		return this.length === 0
	}

	size() {
		return this.length
	}
}
// Complexity
// Operation	Time
// enqueue	O(1)
// dequeue	O(1)
// space	O(n)

// Driver Code - Testing Queue Implementations
console.log('=== QueueArray Testing ===')
const qArray = new QueueArray()
qArray.enqueue(10)
qArray.enqueue(20)
qArray.enqueue(30)
console.log('Front:', qArray.front()) // 10
console.log('Size:', qArray.size()) // 3
console.log('Dequeue:', qArray.dequeue()) // 10
console.log('Front:', qArray.front()) // 10
console.log('Size:', qArray.size()) // 2

console.log('\n=== QueueLinkedList Testing ===')
const qLL = new QueueLinkedList()
qLL.enqueue(100)
qLL.enqueue(200)
qLL.enqueue(300)
console.log('Peek:', qLL.peek()) // 100
console.log('Size:', qLL.size()) // 3
console.log('Dequeue:', qLL.dequeue()) // 100
console.log('Peek:', qLL.peek()) // 100
console.log('Size:', qLL.size()) // 2
console.log('Empty?', qLL.isEmpty()) // false

// Circular Queue Implementation (Array)
class CircularQueue {
	constructor(capacity) {
		this.queue = new Array(capacity)
		this.capacity = capacity
		this.front = -1
		this.rear = -1
	}

	isFull() {
		return (this.rear + 1) % this.capacity === this.front
	}

	isEmpty() {
		return this.front === -1
	}

	enqueue(value) {
		if (this.isFull()) {
			console.log('Queue Overflow')
			return
		}

		if (this.isEmpty()) {
			this.front = 0
		}

		this.rear = (this.rear + 1) % this.capacity
		this.queue[this.rear] = value
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log('Queue Underflow')
			return null
		}

		const removed = this.queue[this.front]

		if (this.front === this.rear) {
			this.front = this.rear = -1
		} else {
			this.front = (this.front + 1) % this.capacity
		}

		return removed
	}

	peek() {
		return this.isEmpty() ? null : this.queue[this.front]
	}
}

// Operation	Time
// enqueue	O(1)
// dequeue	O(1)
// space	O(n)

// Driver Code - Testing CircularQueue
console.log('\n=== CircularQueue Testing ===')
const cq = new CircularQueue(3)
cq.enqueue(10)
cq.enqueue(20)
cq.enqueue(30)
console.log('Peek:', cq.peek()) // 10
console.log('Dequeue:', cq.dequeue()) // 10
cq.enqueue(40)
console.log('Peek:', cq.peek()) // 20

// Deque Implementation (Optimized Object)
class Deque {
	constructor() {
		this.items = {}
		this.front = 0
		this.rear = 0
	}

	isEmpty() {
		return this.front === this.rear
	}

	addFront(value) {
		if (this.front > 0) {
			this.front--
			this.items[this.front] = value
		} else {
			// shift everything right
			for (let i = this.rear; i > this.front; i--) {
				this.items[i] = this.items[i - 1]
			}
			this.items[this.front] = value
			this.rear++
		}
	}

	addRear(value) {
		this.items[this.rear] = value
		this.rear++
	}

	removeFront() {
		if (this.isEmpty()) return null

		const value = this.items[this.front]
		delete this.items[this.front]
		this.front++
		return value
	}

	removeRear() {
		if (this.isEmpty()) return null

		this.rear--
		const value = this.items[this.rear]
		delete this.items[this.rear]
		return value
	}

	peekFront() {
		return this.isEmpty() ? null : this.items[this.front]
	}

	peekRear() {
		return this.isEmpty() ? null : this.items[this.rear - 1]
	}
}

// Operation	Time
// addFront	O(1)*
// addRear	O(1)
// removeFront	O(1)
// removeRear	O(1)
// space	O(n)

// Worst case addFront = O(n) due to shifting (mention in interview)

// Driver Code - Testing Deque
console.log('\n=== Deque Testing ===')
const deque = new Deque()
deque.addRear(10)
deque.addRear(20)
deque.addFront(5)
console.log('Front:', deque.peekFront()) // 5
console.log('Rear:', deque.peekRear()) // 20
console.log('Remove Front:', deque.removeFront()) // 5
console.log('Remove Rear:', deque.removeRear()) // 20

// Priority Queue (Min Priority – Simple Array)
class PriorityQueue {
	constructor() {
		this.queue = []
	}

	enqueue(value, priority) {
		const element = {value, priority}
		let inserted = false

		for (let i = 0; i < this.queue.length; i++) {
			if (priority < this.queue[i].priority) {
				this.queue.splice(i, 0, element)
				inserted = true
				break
			}
		}

		if (!inserted) {
			this.queue.push(element)
		}
	}

	dequeue() {
		if (this.isEmpty()) return null
		return this.queue.shift()
	}

	peek() {
		return this.isEmpty() ? null : this.queue[0]
	}

	isEmpty() {
		return this.queue.length === 0
	}
}

// Operation	Time
// enqueue	O(n)
// dequeue	O(1)
// space	O(n)

// Driver Code - Testing PriorityQueue
console.log('\n=== PriorityQueue Testing ===')
const pq = new PriorityQueue()
pq.enqueue('task1', 3)
pq.enqueue('task2', 1)
pq.enqueue('task3', 2)
console.log('Peek:', pq.peek()) // {value: 'task2', priority: 1}
console.log('Dequeue:', pq.dequeue()) // {value: 'task2', priority: 1}
console.log('Peek:', pq.peek()) // {value: 'task3', priority: 2}

// Priority Queue (Heap – Interview Preferred)
// Min Heap Implementation
class MinHeap {
	constructor() {
		this.heap = []
	}

	getParent(i) {
		return Math.floor((i - 1) / 2)
	}
	getLeft(i) {
		return 2 * i + 1
	}
	getRight(i) {
		return 2 * i + 2
	}

	insert(value) {
		this.heap.push(value)
		this.heapifyUp()
	}

	heapifyUp() {
		let index = this.heap.length - 1
		while (index > 0 && this.heap[this.getParent(index)] > this.heap[index]) {
			;[this.heap[index], this.heap[this.getParent(index)]] = [
				this.heap[this.getParent(index)],
				this.heap[index],
			]
			index = this.getParent(index)
		}
	}

	extractMin() {
		if (this.heap.length === 0) return null
		if (this.heap.length === 1) return this.heap.pop()

		const min = this.heap[0]
		this.heap[0] = this.heap.pop()
		this.heapifyDown(0)
		return min
	}

	heapifyDown(index) {
		let smallest = index
		const left = this.getLeft(index)
		const right = this.getRight(index)

		if (left < this.heap.length && this.heap[left] < this.heap[smallest])
			smallest = left

		if (right < this.heap.length && this.heap[right] < this.heap[smallest])
			smallest = right

		if (smallest !== index) {
			;[this.heap[index], this.heap[smallest]] = [
				this.heap[smallest],
				this.heap[index],
			]
			this.heapifyDown(smallest)
		}
	}
}

// Operation	Time
// insert	O(log n)
// extractMin	O(log n)
// space	O(n)

// Driver Code - Testing MinHeap
console.log('\n=== MinHeap Testing ===')
const heap = new MinHeap()
heap.insert(10)
heap.insert(5)
heap.insert(20)
heap.insert(3)
console.log('Heap:', heap.heap) // [3, 5, 20, 10]
console.log('Extract Min:', heap.extractMin()) // 3
console.log('Extract Min:', heap.extractMin()) // 5
console.log('Heap:', heap.heap) // [10, 20]

// Comparison of Queue Implementations

/*
QUEUE TYPE COMPARISON:

1. REGULAR QUEUE (Array/LinkedList)
   - FIFO: First In, First Out
   - Operations: enqueue(rear), dequeue(front)
   - Use Cases: Task scheduling, BFS traversal
   - Time: O(1) enqueue/dequeue

2. CIRCULAR QUEUE
   - Fixed size with wraparound
   - Efficient memory usage (no wasted space)
   - Operations: enqueue, dequeue with modulo arithmetic
   - Use Cases: Buffer systems, streaming data
   - Time: O(1) all operations
   - Space: O(k) where k is capacity

3. DEQUE (Double-Ended Queue)
   - Insert/remove from both ends
   - Operations: addFront, addRear, removeFront, removeRear
   - Use Cases: Sliding window problems, palindrome checking
   - Time: O(1) all operations (worst case O(n) for addFront)
   - More flexible than regular queue

4. PRIORITY QUEUE
   - Elements have priority values
   - Higher priority elements dequeued first
   - Two implementations:
     a) Array-based: O(n) enqueue, O(1) dequeue
     b) Heap-based: O(log n) enqueue/dequeue
   - Use Cases: Dijkstra's algorithm, task scheduling, A* search
   - Heap implementation preferred for interviews

CHOOSING THE RIGHT QUEUE:
- Regular Queue: Standard FIFO operations
- Circular Queue: Fixed memory, continuous operations
- Deque: Need access to both ends
- Priority Queue: Elements need ordering by importance
*/

// 1 BFS (Breadth First Search)
// A) BFS in Graph

// Given a graph, traverse all vertices level by level starting from a source node.

//  Code (Adjacency List)
function bfsGraph(graph, start) {
	const visited = new Set()
	const queue = []

	queue.push(start)
	visited.add(start)

	while (queue.length > 0) {
		const node = queue.shift()
		console.log(node)

		for (let neighbor of graph[node]) {
			if (!visited.has(neighbor)) {
				visited.add(neighbor)
				queue.push(neighbor)
			}
		}
	}
}

// Driver Code - Testing BFS Graph
console.log('\n=== BFS Graph Testing ===')
const graph = {
	A: ['B', 'C'],
	B: ['D', 'E'],
	C: ['F'],
	D: [],
	E: [],
	F: [],
}

bfsGraph(graph, 'A') // Output: A B C D E F

// Metric	Value
// Time	O(V + E)
// Space	O(V)

// B) BFS in Binary Tree

// Traverse a binary tree level by level.

function levelOrder(root) {
	if (!root) return

	const queue = [root]

	while (queue.length > 0) {
		const node = queue.shift()
		console.log(node.val)

		if (node.left) queue.push(node.left)
		if (node.right) queue.push(node.right)
	}
}

// Metric	Value
// Time	O(n)
// Space	O(n)

// 2 Sliding Window Maximum (Deque)

// Given an array and window size k, find maximum in each window.

// Input: [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]

function maxSlidingWindow(nums, k) {
	const deque = []
	const result = []

	for (let i = 0; i < nums.length; i++) {
		// Remove out-of-window elements
		if (deque.length && deque[0] === i - k) {
			deque.shift()
		}

		// Remove smaller elements
		while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
			deque.pop()
		}

		deque.push(i)

		if (i >= k - 1) {
			result.push(nums[deque[0]])
		}
	}

	return result
}

// Metric	Value
// Time	O(n)
// Space	O(k)

// 3 First Non-Repeating Character in a Stream
// Given a stream of characters, find first non-repeating after each insertion.

// Input: a a b c
// Output: a - b b

function firstNonRepeating(stream) {
	const freq = {}
	const queue = []
	const result = []

	for (let ch of stream) {
		freq[ch] = (freq[ch] || 0) + 1
		queue.push(ch)

		while (queue.length && freq[queue[0]] > 1) {
			queue.shift()
		}

		result.push(queue.length ? queue[0] : '-')
	}

	return result
}

// Metric	Value
// Time	O(n)
// Space	O(n)

// 4 Implement Stack Using Queue

// Implement LIFO stack using queue operations only.

class StackUsingQueue {
	constructor() {
		this.q = []
	}

	push(x) {
		this.q.push(x)
		let size = this.q.length

		while (size > 1) {
			this.q.push(this.q.shift())
			size--
		}
	}

	pop() {
		return this.q.shift()
	}

	top() {
		return this.q[0]
	}

	isEmpty() {
		return this.q.length === 0
	}
}

// Operation	Time
// push	O(n)
// pop	O(1)
// space	O(n)

// 5 Generate Binary Numbers from 1 to N

// Generate binary representations of numbers from 1 to N.

// Input: 5
// Output: 1 10 11 100 101

// Use queue

// BFS-style binary generation

function generateBinary(n) {
	const queue = []
	const result = []

	queue.push('1')

	for (let i = 0; i < n; i++) {
		const curr = queue.shift()
		result.push(curr)

		queue.push(curr + '0')
		queue.push(curr + '1')
	}

	return result
}

// Metric	Value
// Time	O(n)
// Space	O(n)
/*
UNDERSTANDING ARRAY SHIFT() - WHY IT'S O(n):

Array.shift() removes the first element and shifts all remaining elements left.

VISUAL EXAMPLE:
Initial array: [10, 20, 30, 40, 50]
                ↑   ↑   ↑   ↑   ↑
               [0] [1] [2] [3] [4]

After arr.shift():
Step 1: Remove element at index 0 (value: 10)
Step 2: Shift all elements left by one position
        [20, 30, 40, 50, undefined]
         ↑   ↑   ↑   ↑
        [0] [1] [2] [3]

Final result: [20, 30, 40, 50]
              ↑   ↑   ↑   ↑
             [0] [1] [2] [3]

WHY O(n) TIME COMPLEXITY:
- Must move n-1 elements to new positions
- Each element copy/move is O(1)
- Total: O(1) × (n-1) = O(n)

BETTER ALTERNATIVES FOR QUEUES:
1. Use object with front/rear pointers (O(1))
2. Use linked list (O(1))
3. Use circular buffer (O(1))

WHEN TO USE SHIFT():
- Small arrays (< 100 elements)
- Infrequent operations
- Code simplicity over performance

AVOID SHIFT() FOR:
- Large datasets
- Frequent queue operations
- Performance-critical applications
*/
/*
ARRAY SHIFT() AND UNSHIFT() - DETAILED EXPLANATION:

=== SHIFT() - Remove from Front ===
Removes first element and shifts all remaining elements left.

VISUAL EXAMPLE:
arr = [10, 20, 30, 40, 50]
       ↑   ↑   ↑   ↑   ↑
      [0] [1] [2] [3] [4]

arr.shift() // Returns 10
Step 1: Save first element (10)
Step 2: Move each element left by 1 position
        20 → index 0
        30 → index 1  
        40 → index 2
        50 → index 3

Result: [20, 30, 40, 50]
         ↑   ↑   ↑   ↑
        [0] [1] [2] [3]

=== UNSHIFT() - Add to Front ===
Adds element(s) to beginning and shifts existing elements right.

VISUAL EXAMPLE:
arr = [20, 30, 40]
       ↑   ↑   ↑
      [0] [1] [2]

arr.unshift(10) // Returns new length: 4
Step 1: Shift all elements right by 1 position
        40 → index 3
        30 → index 2
        20 → index 1
Step 2: Insert new element at index 0
        10 → index 0

Result: [10, 20, 30, 40]
         ↑   ↑   ↑   ↑
        [0] [1] [2] [3]

=== TIME COMPLEXITY ANALYSIS ===
SHIFT():   O(n) - Must move n-1 elements left
UNSHIFT(): O(n) - Must move n elements right
PUSH():    O(1) - Add to end, no shifting needed
POP():     O(1) - Remove from end, no shifting needed

=== PERFORMANCE COMPARISON ===
Operation    | Time | Reason
-------------|------|---------------------------
push()       | O(1) | Add to end
pop()        | O(1) | Remove from end
unshift()    | O(n) | Shift all elements right
shift()      | O(n) | Shift all elements left

=== WHEN TO AVOID SHIFT/UNSHIFT ===
❌ Large arrays (>1000 elements)
❌ Frequent front operations
❌ Performance-critical code
❌ Queue/Stack implementations

=== BETTER ALTERNATIVES ===
✅ Use objects with pointers: {0: val, 1: val, front: 0, rear: 2}
✅ Use linked lists for dynamic sizing
✅ Use circular buffers for fixed size
✅ Use deque libraries for double-ended operations

=== PRACTICAL EXAMPLE ===
// Inefficient Queue (O(n) dequeue)
class SlowQueue {
    constructor() { this.items = [] }
    enqueue(x) { this.items.push(x) }      // O(1)
    dequeue() { return this.items.shift() } // O(n) ❌
}

// Efficient Queue (O(1) dequeue)
class FastQueue {
    constructor() { this.items = {}; this.front = 0; this.rear = 0 }
    enqueue(x) { this.items[this.rear++] = x }        // O(1)
    dequeue() { 
        const val = this.items[this.front]
        delete this.items[this.front++]
        return val
    } // O(1) ✅
}
*/
