/**
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
var buyChoco = function (prices, money) {
	prices.sort((a, b) => a - b)
	const totalCostOfCheapestTwo = prices[0] + prices[1]
	return money < totalCostOfCheapestTwo ? money : money - totalCostOfCheapestTwo
}
// Aproach 1 : Sorting take O(n Logn) space complexity is O(1)
// Approach 2: without sorting picking the first and second smallest number is O(n * n) &  space complexity is O(1)
