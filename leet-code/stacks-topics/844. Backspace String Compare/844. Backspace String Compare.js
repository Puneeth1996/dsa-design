/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

function nextValidChar(str, index) {
	let backspaceSkips = 0
	while (index >= 0) {
		if (str[index] === '#') {
			backspaceSkips++
		} else if (backspaceSkips > 0) {
			backspaceSkips--
		} else {
			break
		}
		index--
	}
	return index
}

var backspaceCompare = function (S, T) {
	let pointerS = S.length - 1
	let pointerT = T.length - 1

	while (pointerS >= 0 || pointerT >= 0) {
		pointerS = nextValidChar(S, pointerS)
		pointerT = nextValidChar(T, pointerT)
		charS = pointerS >= 0 ? S[pointerS] : ''
		charT = pointerT >= 0 ? T[pointerT] : ''
		if (charS !== charT) {
			return false
		}
		pointerS--
		pointerT--
	}

	return true
}
