/**
 * @param {string} s
 * @return {boolean}
 */
const checkString = (s) => {
	const lastAIdx = s.lastIndexOf('a')
	const firstBIdx = s.indexOf('b')

	if (lastAIdx === -1 || firstBIdx === -1) return true
	return firstBIdx > lastAIdx
}
