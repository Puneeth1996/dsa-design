/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function (nums, k, x) {
	n = nums.length
	answer = []

	function freq_object(inputArray) {
		const counts = {}

		for (const num of inputArray) {
			counts[num] = counts[num] ? counts[num] + 1 : 1
		}

		return counts
	}

	function sort_frequency(frequency_input_array) {
		soretable_freq = []
		for (var element in frequency_input_array) {
			soretable_freq.push([element, frequency_input_array[element]])
		}

		soreted_elements_by_value = soretable_freq.sort((a, b) => b[0] - a[0])

		soreted_elements_by_value_and_frequency = soreted_elements_by_value.sort(
			(a, b) => b[1] - a[1]
		)
		// if there are multiple number with same frequency
		// than choose the one that has highest value
		return soreted_elements_by_value_and_frequency
	}

	for (let i = 0; i < n - k + 1; i++) {
		subarry = nums.slice(i, i + k)
		frequency_map = freq_object(subarry)
		soretred_elements = sort_frequency(frequency_map)

		top_x_sum = 0
		count = 0
		for (elm in soretred_elements) {
			if (count < x) {
				top_x_sum =
					top_x_sum + soretred_elements[elm][0] * soretred_elements[elm][1]
				count = count + 1
			} else {
				break
			}
		}
		answer.push(top_x_sum)
	}
	return answer
}

// findXSum([1,1,2,2,3,4,2,3], 6, 2)
