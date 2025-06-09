/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function(n, k) {
    let prefix = 1;
    k = k - 1; // Because we start with 1 already

    const countSteps = (n, prefix) => {
        let steps = 0;
        let first = prefix;
        let last = prefix;

        while (first <= n) {
            steps += Math.min(n, last) - first + 1;
            first *= 10;
            last = last * 10 + 9;
        }

        return steps;
    };

    while (k > 0) {
        let steps = countSteps(n, prefix);
        if (k >= steps) {
            k -= steps;
            prefix += 1;
        } else {
            prefix *= 10;
            k -= 1;
        }
    }

    return prefix;
};