// Time - O(1)
// Space - O(n)

class MyQueue {
	constructor() {
		this.inStack = []
		this.outStack = []
	}
	push(val) {
		this.inStack.push(val)
	}
	pop() {
		if (!this.outStack.length) {
			while (this.inStack.length) {
				this.outStack.push(this.inStack.pop())
			}
		}
		return this.outStack.pop()
	}
	peek() {
		if (!this.outStack.length) {
			while (this.inStack.length) {
				this.outStack.push(this.inStack.pop())
			}
		}
		return this.outStack[this.outStack.length - 1]
	}
	empty() {
		let inStackLength = this.inStack.length
		let outStackLength = this.outStack.length
		// if both are 0, then return true
		return !inStackLength && !outStackLength
	}
}

const q = new MyQueue()
