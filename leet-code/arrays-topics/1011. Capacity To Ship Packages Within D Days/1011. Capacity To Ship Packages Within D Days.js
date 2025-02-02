/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
	// Initialize the lower and upper bounds for the binary search
	let lowerBound = 0
	let upperBound = 0

	// Calculate the initial bounds for the capacity of the ship
	for (const weight of weights) {
		lowerBound = Math.max(lowerBound, weight) // The ship's capacity must be at least as much as the heaviest package
		upperBound += weight // The maximum capacity is the sum of all weights, i.e., shipping all at once
	}

	// Function to determine if it's possible to ship all packages within 'days' given a maximum capacity 'maxCapacity'
	const canShipInDays = (maxCapacity) => {
		let currentWeightSum = 0 // Current total weight in the current shipment
		let requiredDays = 1 // Start with 1 day, the minimum possible

		for (const weight of weights) {
			currentWeightSum += weight

			// If adding the current weight exceeds max capacity, need a new shipment (next day)
			if (currentWeightSum > maxCapacity) {
				currentWeightSum = weight // Reset the currentWeightSum with the current weight as the start for the next day
				++requiredDays // Increment the day counter as we move to the next day
			}
		}

		// Return true if the number of required days is less than or equal to the given days, false otherwise
		return requiredDays <= days
	}

	// Perform a binary search to find the minimum capacity needed to ship within 'days'
	while (lowerBound < upperBound) {
		const midCapacity = Math.floor((lowerBound + upperBound) / 2) // Mid-point of the current bounds

		// If it's possible to ship with this capacity, reduce the upper bound to midCapacity
		if (canShipInDays(midCapacity)) {
			upperBound = midCapacity
		} else {
			// Otherwise, increase the lower bound just above midCapacity
			lowerBound = midCapacity + 1
		}
	}

	// The lower bound at the end of the binary search will be the minimum capacity needed to meet the requirement
	return lowerBound
}
