/**
 * @param {number[]} gifts
 * @param {number} k
 * @return {number}
 */
var pickGifts = function (gifts, k) {
	const pq = new MaxPriorityQueue()
	gifts.forEach((v) => pq.enqueue(v))
	while (k--) {
		let v = pq.dequeue().element
		v = Math.floor(Math.sqrt(v))
		pq.enqueue(v)
	}
	let ans = 0
	while (!pq.isEmpty()) {
		ans += pq.dequeue().element
	}
	return ans
}

// For getting the max element in array is heap with O(1)
