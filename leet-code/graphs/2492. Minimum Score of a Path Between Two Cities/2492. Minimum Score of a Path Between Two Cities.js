/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function (nodeCount, edges) {
	const visited = new Array(nodeCount + 1).fill(false)
	const graph = Array.from({ length: nodeCount + 1 }, () => [])
	for (const [nodeFrom, nodeTo, value] of edges) {
		graph[nodeFrom].push([nodeTo, value])
		graph[nodeTo].push([nodeFrom, value])
	}
	let minimumScore = Infinity

	const depthFirstSearch = (currentNode) => {
		if (visited[currentNode]) {
			return
		}
		visited[currentNode] = true
		for (const [nextNode, edgeValue] of graph[currentNode]) {
			minimumScore = Math.min(minimumScore, edgeValue)
			depthFirstSearch(nextNode)
		}
	}
	depthFirstSearch(1)
	return minimumScore === Infinity ? -1 : minimumScore
}
