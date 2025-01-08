/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
	let pointerS = S.length - 1
	let pointerT = T.length - 1

	while (pointerS >= 0 || pointerT >= 0) {
		let skipS = 0
		while (pointerS >= 0) {
			if (S[pointerS] === '#') {
				skipS++
			} else if (skipS > 0) {
				skipS--
			} else {
				break
			}
			pointerS--
		}

		let skipT = 0

		while (pointerT >= 0) {
			if (T[pointerT] === '#') {
				skipT++
			} else if (skipT > 0) {
				skipT--
			} else {
				break
			}
			pointerT--
		}

		if (pointerS >= 0 && pointerT >= 0 && S[pointerS] !== T[pointerT]) {
			return false
		}

		if (pointerS >= 0 !== pointerT >= 0) {
			return false
		}

		pointerS--
		pointerT--
	}

	return true
}
