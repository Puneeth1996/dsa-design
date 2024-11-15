/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
	const cities = {}
	// Creating the hash with cities
	for (const node of paths) {
		cities[node[0]] = 1
	}
	// checking if the destination is in the cities object
	for (const node of paths) {
		if (!cities.hasOwnProperty(node[1])) {
			return node[1]
		}
	}
}
