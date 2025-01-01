/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function (big, medium, small) {
	parkingSpotCounts = [big, medium, small]
}

/**
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function (carType) {
	if (carType < 1 || carType > 3) {
		return false
	}

	const index = carType - 1

	if (parkingSpotCounts[index] === 0) {
		return false
	}

	parkingSpotCounts[index]--
	return true
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
