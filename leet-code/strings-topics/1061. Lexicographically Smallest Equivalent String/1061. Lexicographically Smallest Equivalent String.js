/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
var smallestEquivalentString = function (s1, s2, baseStr) {
	const graph = Array.from({length: 26}, () => [])
	// Build graph of equivalences
	for (let i = 0; i < s1.length; i++) {
		const u = s1.charCodeAt(i) - 97
		const v = s2.charCodeAt(i) - 97
		graph[u].push(v)
		graph[v].push(u)
	}
	const visited = new Array(26).fill(false)
	const componentMap = Array(26)
		.fill(0)
		.map((_, idx) => String.fromCharCode(idx + 97))

	const dfs = (node, component) => {
		visited[node] = true
		component.push(node)
		for (const neighbor of graph[node]) {
			if (!visited[neighbor]) {
				dfs(neighbor, component)
			}
		}
	}
	// For each connected component, assign the smallest char to all
	for (let i = 0; i < 26; i++) {
		if (!visited[i]) {
			const component = []
			dfs(i, component)
			const smallest = Math.min(...component)
			for (const node of component) {
				componentMap[node] = String.fromCharCode(smallest + 97)
			}
		}
	}
	// Transform baseStr using componentMap
	let result = ''
	for (const ch of baseStr) {
		result += componentMap[ch.charCodeAt(0) - 97]
	}
	return result
}
