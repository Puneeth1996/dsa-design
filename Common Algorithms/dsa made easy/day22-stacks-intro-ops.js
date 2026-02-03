class StackArray {
	constructor() {
		this.stack = []
	}

	push(value) {
		this.stack.push(value) // O(1)
	}

	pop() {
		if (this.isEmpty()) return 'Stack Underflow'
		return this.stack.pop() // O(1)
	}

	peek() {
		return this.isEmpty() ? 'Empty Stack' : this.stack[this.stack.length - 1]
	}

	isEmpty() {
		return this.stack.length === 0
	}

	size() {
		return this.stack.length
	}
}
// Operation	Time
// push	O(1)*
// pop	O(1)
// peek	O(1)
// space	O(n)

// Usage Examples
const stack = new StackArray()

// Basic operations
stack.push(10)
stack.push(20)
stack.push(30)
console.log(stack.peek()) // 30
console.log(stack.pop()) // 30
console.log(stack.size()) // 2

// Practical example: Balanced parentheses
function isBalanced(str) {
	const stack = new StackArray()
	for (let char of str) {
		if (char === '(') stack.push(char)
		else if (char === ')') {
			if (stack.isEmpty()) return false
			stack.pop()
		}
	}
	return stack.isEmpty()
}

console.log(isBalanced('(())')) // true
console.log(isBalanced('(()')) // false

class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class StackLinkedList {
	constructor() {
		this.top = null
		this.size = 0
	}

	push(value) {
		const newNode = new Node(value)
		newNode.next = this.top
		this.top = newNode
		this.size++
	}

	pop() {
		if (this.isEmpty()) return 'Stack Underflow'
		const popped = this.top.value
		this.top = this.top.next
		this.size--
		return popped
	}

	peek() {
		return this.isEmpty() ? 'Empty Stack' : this.top.value
	}

	isEmpty() {
		return this.top === null
	}
}
// Operation	Time
// push	O(1)
// pop	O(1)
// peek	O(1)
// space	O(n)

// Usage Examples
const stackLL = new StackLinkedList()

// Basic operations
stackLL.push(100)
stackLL.push(200)
stackLL.push(300)
console.log(stackLL.peek()) // 300
console.log(stackLL.pop()) // 300
console.log(stackLL.size) // 2

// Practical example: Undo/Redo functionality
function undoRedoSystem() {
	const undoStack = new StackLinkedList()
	const redoStack = new StackLinkedList()
	let currentState = 'initial'

	function execute(action) {
		undoStack.push(currentState)
		redoStack = new StackLinkedList() // Clear redo on new action
		currentState = action
		console.log(`Current: ${action}`)
	}

	function undo() {
		if (!undoStack.isEmpty()) {
			redoStack.push(currentState)
			currentState = undoStack.pop()
			console.log(`Undo to: ${currentState}`)
		}
	}

	function redo() {
		if (!redoStack.isEmpty()) {
			undoStack.push(currentState)
			currentState = redoStack.pop()
			console.log(`Redo to: ${currentState}`)
		}
	}

	return {execute, undo, redo}
}

const editor = undoRedoSystem()
editor.execute('typed hello') // Current: typed hello
editor.execute('added space') // Current: added space
editor.execute('typed world') // Current: typed world
editor.undo() // Undo to: added space
editor.undo() // Undo to: typed hello
editor.redo() // Redo to: added space
editor.redo() // Redo to: typed world
// More Stack Examples

// 1. Enhanced Balanced Parentheses (multiple bracket types)
/*
PROBLEM: Enhanced Balanced Parentheses
Given a string with multiple bracket types (), [], {}, check if they are balanced.
Balanced means: every opening bracket has matching closing bracket in correct order.

SOLUTION APPROACH:
1. Use stack to track opening brackets
2. For opening brackets: push to stack
3. For closing brackets: check if it matches top of stack
4. String is balanced if stack is empty at end

Time: O(n), Space: O(n)
*/
function isBalancedBrackets(str) {
	const stack = new StackArray()
	const pairs = {'(': ')', '[': ']', '{': '}'}

	for (let char of str) {
		if (pairs[char]) {
			stack.push(char)
		} else if (Object.values(pairs).includes(char)) {
			if (stack.isEmpty() || pairs[stack.pop()] !== char) {
				return false
			}
		}
	}
	return stack.isEmpty()
}

console.log(isBalancedBrackets('({[]})')) // true
console.log(isBalancedBrackets('([)]')) // false
console.log(isBalancedBrackets('{[()]}')) // true

// 2. Infix to Postfix Conversion
/*
PROBLEM: Infix to Postfix Conversion
Convert mathematical expression from infix (a+b*c) to postfix (abc*+) notation.
Postfix eliminates need for parentheses and follows operator precedence.

SOLUTION APPROACH:
1. Scan infix left to right
2. Operands: add directly to output
3. Operators: pop higher/equal precedence operators first, then push current
4. '(': push to stack
5. ')': pop until '(' found
6. End: pop all remaining operators

Time: O(n), Space: O(n)
*/
function infixToPostfix(infix) {
	const stack = new StackArray()
	const precedence = {'+': 1, '-': 1, '*': 2, '/': 2}
	let postfix = ''

	for (let char of infix) {
		if (/[a-zA-Z0-9]/.test(char)) {
			postfix += char
		} else if (char === '(') {
			stack.push(char)
		} else if (char === ')') {
			while (!stack.isEmpty() && stack.peek() !== '(') {
				postfix += stack.pop()
			}
			stack.pop() // Remove '('
		} else if (precedence[char]) {
			while (
				!stack.isEmpty() &&
				precedence[stack.peek()] >= precedence[char]
			) {
				postfix += stack.pop()
			}
			stack.push(char)
		}
	}

	while (!stack.isEmpty()) {
		postfix += stack.pop()
	}

	return postfix
}

console.log(infixToPostfix('a+b*c')) // abc*+
console.log(infixToPostfix('(a+b)*c')) // ab+c*
console.log(infixToPostfix('a+b*c-d')) // abc*+d-

// 3. Evaluate Postfix Expression
/*
PROBLEM: Evaluate Postfix Expression
Evaluate a postfix expression like "23*4+" which equals 10.
In postfix: operators come after operands, no parentheses needed.

SOLUTION APPROACH:
1. Scan postfix left to right
2. Operands: push to stack
3. Operators: pop two operands, apply operation, push result back
4. Final result is the only element left in stack

Time: O(n), Space: O(n)
*/
function evaluatePostfix(postfix) {
	const stack = new StackArray()

	for (let char of postfix) {
		if (/\d/.test(char)) {
			stack.push(parseInt(char))
		} else {
			const b = stack.pop()
			const a = stack.pop()
			switch (char) {
				case '+':
					stack.push(a + b)
					break
				case '-':
					stack.push(a - b)
					break
				case '*':
					stack.push(a * b)
					break
				case '/':
					stack.push(Math.floor(a / b))
					break
			}
		}
	}

	return stack.pop()
}

console.log(evaluatePostfix('23*4+')) // 10 (2*3+4)
console.log(evaluatePostfix('52-3*')) // 9 ((5-2)*3)
console.log(evaluatePostfix('123*+')) // 7 (1+2*3)
// 4. Min Stack - Stack that tracks minimum element in O(1)
// Uses auxiliary stack to maintain minimum at each level
/*
PROBLEM: Min Stack
Design a stack that supports push, pop, top, and retrieving minimum element in O(1) time.
All operations must be constant time, including getting the minimum.

SOLUTION APPROACH:
1. Use auxiliary stack to track minimum at each level
2. When pushing: store current minimum in minStack
3. When popping: remove from both stacks simultaneously
4. getMin() returns top of minStack

Time: O(1) all operations, Space: O(n)
*/
class MinStack {
	constructor() {
		this.stack = []
		this.minStack = [] // Tracks minimum at each level
	}

	push(value) {
		this.stack.push(value)
		// Push current min (either new value or previous min)
		const currentMin =
			this.minStack.length === 0 ? value : Math.min(value, this.getMin())
		this.minStack.push(currentMin)
	}

	pop() {
		if (this.stack.length === 0) return null
		this.minStack.pop()
		return this.stack.pop()
	}

	top() {
		return this.stack.length === 0 ? null : this.stack[this.stack.length - 1]
	}

	getMin() {
		return this.minStack.length === 0
			? null
			: this.minStack[this.minStack.length - 1]
	}
}

// Usage: Track minimum in stock prices
const minStack = new MinStack()
minStack.push(100) // Min: 100
minStack.push(80) // Min: 80
minStack.push(120) // Min: 80
console.log(minStack.getMin()) // 80
minStack.pop() // Remove 120, Min still: 80
console.log(minStack.getMin()) // 80
minStack.pop() // Remove 80, Min now: 100
console.log(minStack.getMin()) // 100

// 5. Monotonic Stack - Maintains elements in sorted order
// Used for "next greater/smaller element" problems
/*
PROBLEM: Next Greater Element
For each element in array, find the next greater element to its right.
Return -1 if no greater element exists.

SOLUTION APPROACH:
1. Use decreasing monotonic stack (stores indices)
2. For each element: pop smaller elements (they found their answer)
3. Current element becomes the "next greater" for popped elements
4. Push current index to maintain decreasing order

Time: O(n), Space: O(n)
*/
function nextGreaterElements(arr) {
	const result = new Array(arr.length).fill(-1)
	const stack = [] // Stores indices, maintains decreasing order

	for (let i = 0; i < arr.length; i++) {
		// Pop elements smaller than current (they found their next greater)
		while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
			const index = stack.pop()
			result[index] = arr[i]
		}
		stack.push(i) // Push current index
	}

	return result
}

// Usage: Find next greater element for each position
console.log(nextGreaterElements([4, 5, 2, 25])) // [5, 25, 25, -1]
console.log(nextGreaterElements([13, 7, 6, 12])) // [-1, 12, 12, -1]

// Daily temperatures problem using monotonic stack
/*
PROBLEM: Daily Temperatures
Given daily temperatures, return array where each element represents
how many days you have to wait for a warmer temperature.
Return 0 if no warmer day exists.

SOLUTION APPROACH:
1. Use decreasing monotonic stack of indices
2. For each day: pop cooler days (they found their warmer day)
3. Calculate waiting days as current_index - popped_index
4. Push current day index to stack

Time: O(n), Space: O(n)
*/
function dailyTemperatures(temperatures) {
	const result = new Array(temperatures.length).fill(0)
	const stack = [] // Decreasing monotonic stack of indices

	for (let i = 0; i < temperatures.length; i++) {
		// Find all previous days that are cooler than today
		while (
			stack.length > 0 &&
			temperatures[stack[stack.length - 1]] < temperatures[i]
		) {
			const prevDay = stack.pop()
			result[prevDay] = i - prevDay // Days to wait
		}
		stack.push(i)
	}

	return result
}

// Usage: Days to wait for warmer temperature
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])) // [1, 1, 4, 2, 1, 1, 0, 0]
