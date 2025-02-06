/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var checkIfPrerequisite = function (numCourses, prerequisites, queries) {
	// Initialize the adjacency matrix
	const isPrerequisite = Array.from({ length: numCourses }, () =>
		Array(numCourses).fill(false)
	)

	// Populate the direct prerequisites
	for (const [a, b] of prerequisites) {
		isPrerequisite[a][b] = true
	}

	// Floyd-Warshall algorithm to compute transitive closure
	for (let k = 0; k < numCourses; k++) {
		for (let i = 0; i < numCourses; i++) {
			for (let j = 0; j < numCourses; j++) {
				if (isPrerequisite[i][k] && isPrerequisite[k][j]) {
					isPrerequisite[i][j] = true
				}
			}
		}
	}

	// Answer the queries
	return queries.map(([u, v]) => isPrerequisite[u][v])
}
