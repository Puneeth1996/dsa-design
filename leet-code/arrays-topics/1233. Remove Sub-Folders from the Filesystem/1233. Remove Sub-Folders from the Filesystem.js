/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function (folder) {
	// Sort folder paths lexicographically
	folder.sort()

	const result = []
	for (let f of folder) {
		// Check if it's a subfolder of the last one in result
		if (
			result.length === 0 ||
			!f.startsWith(result[result.length - 1] + '/')
		) {
			result.push(f)
		}
	}
	return result
}
// Time complexity Sort folders O(n log n) & Prefix check O(n * L)
// Space complexity O(n) for the result array
