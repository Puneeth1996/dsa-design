/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
var smallestEquivalentString = function (s1, s2, baseStr) {
	const graph = {}
	for (let i = 0; i < 26; i++) {
		const ch = String.fromCharCode(97 + i)
		graph[ch] = new Set()
	}
	for (let i = 0; i < s1.length; i++) {
		graph[s1[i]].add(s2[i])
		graph[s2[i]].add(s1[i])
	}

	const visted = new Set()
	const charmap = {}

	function dfs(node, component) {
		visted.add(node)
		component.push(node)
		for (const nieghbor of graph[node]) {
			if (!visted.has(nieghbor)) {
				dfs(nieghbor, component)
			}
		}
	}

	for (let i = 0; i < 26; i++) {
		const ch = String.fromCharCode(97 + i)
		if (!visted.has(ch)) {
			const component = []
			dfs(ch, component)
			const smallest = component.sort()[0]
			for (const c of component) {
				charmap[c] = smallest
			}
		}
	}

	let result = ''
	for (let ch of baseStr) {
		result = result + charmap[ch] || ch
	}
	return result
}
