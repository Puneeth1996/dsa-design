/**
 * @param {number[]} nums
 * @return {number}
 */
var countCompleteSubarrays = function(nums) {
    const totalDistinct = new Set(nums).size;
    let n = nums.length, count = 0;

    for (let i = 0; i < n; i++) {
        const seen = new Set();
        for (let j = i; j < n; j++) {
            seen.add(nums[j]);
            if (seen.size === totalDistinct) {
                count += n - j;
                break;
            }
        }
    }

    return count;
};

// Time Complexity: O(n^2)
// Space Complexity: O(n) for the set to store distinct elements
// The above code uses a nested loop to iterate through all possible subarrays of the input array nums.