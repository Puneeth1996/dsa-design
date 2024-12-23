class MyHashMap {
	data
	constructor() {
		this.data = new Array(10 ** 6 + 1).fill(-1)
	}

	put(key, value) {
		this.data[key] = value
	}

	get(key) {
		return this.data[key]
	}

	remove(key) {
		this.data[key] = -1
	}
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
