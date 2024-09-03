/**
 * @param {string[]} patterns
 * @param {string} word
 * @return {number}
 */
const numOfStrings = (patterns, word) =>
	patterns.filter((pattern) => word.includes(pattern)).length
