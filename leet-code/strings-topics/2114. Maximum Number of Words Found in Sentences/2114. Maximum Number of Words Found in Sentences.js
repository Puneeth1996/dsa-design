/**
 * @param {string[]} sentences
 * @return {number}
 */
const mostWordsFound = (sentences) =>
	Math.max(...sentences.map((sentence) => sentence.split(' ').length))
