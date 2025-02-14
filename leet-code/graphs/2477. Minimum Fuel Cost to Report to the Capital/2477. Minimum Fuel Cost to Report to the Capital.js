/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
var minimumFuelCost = function (roads, seats) {
	// Create adjacency list for the graph representation of roads
	const numNodes = roads.length + 1
	const adjacencyList = Array.from({ length: numNodes }, () => [])

	for (const [source, destination] of roads) {
		adjacencyList[source].push(destination)
		adjacencyList[destination].push(source)
	}

	// Perform DFS to calculate fuel and car requirements
	const calculateFuelAndCars = function (currentNode, visited) {
		const childrenData = []
		const nodeData = {
			fuel: 0,
			cars: 0,
			passengers: 0,
		}

		// Explore all children of the current node
		for (const neighbor of adjacencyList[currentNode]) {
			if (visited.has(neighbor)) continue // Avoid revisiting nodes again and again (infinite loop)

			visited.add(neighbor)
			childrenData.push(calculateFuelAndCars(neighbor, visited))
			visited.delete(neighbor)
		}

		// Process the current node based on its children
		if (childrenData.length === 0 && currentNode !== 0) {
			// Leaf node (not the capital)
			Object.assign(nodeData, {
				fuel: 1,
				cars: 1,
				passengers: 1,
			})
		} else {
			let totalCars = 0,
				totalPassengers = 1

			for (const { fuel, cars, passengers } of childrenData) {
				nodeData.fuel += fuel
				totalPassengers += passengers
				totalCars += cars
			}

			// Determine the number of cars required based on seat capacity
			totalCars = Math.ceil(totalPassengers / seats)

			nodeData.passengers = totalPassengers
			nodeData.cars = totalCars

			// If not the capital, add fuel cost for the current node
			if (currentNode !== 0) {
				nodeData.fuel += totalCars
			}
		}

		return nodeData
	}

	// Start DFS from the capital (node 0)
	const { fuel } = calculateFuelAndCars(0, new Set([0]))
	return fuel
}
