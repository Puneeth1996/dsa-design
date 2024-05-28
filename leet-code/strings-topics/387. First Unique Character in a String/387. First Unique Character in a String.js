/**
 * @param {string} s
 * @return {number}
 */

// Brute force method
// Time complexity - O(n^2)
// Space complexity- O(1) we are not storing any value
// function findNonRepeatingCharacter(string){
//     let repeat;
//     for(let i=0;i<string.length;i++){
//         repeat = false;
//         for(let j=0;j<string.length;j++){
//             if(string[i]===string[j] && i!==j){
//                 repeat=true;
//             }
//         }
//         if(repeat === false){
//             return i;
//         }
//     }
//     return null;
// }

// a='a123412a';
// console.log(findNonRepeatingCharacter(a));

// Optimal solution
// Time complexity - O(n) -> n+n = 2n ,ie for looping through charcters
// and creating the hash tablebut we can ignore constant

// Space complexity- O(1) we are not storing any value

// function findNonReaptingCharacter(string){
//     const hashTable = {};
//     for(let i=0;i<string.length;i++){
//         if(string[i] in hashTable){
//             hashTable[string[i]]++;
//         } else{
//             hashTable[string[i]]=1;
//         }
//     }
//     for(let i=0;i<string.length;i++){
//         if(hashTable[string[i]]===1){
//             return i;
//         }
//     }
//     return null;
// }
var firstUniqChar = function (string) {
	const hashTable = {}
	for (let i = 0; i < string.length; i++) {
		if (string[i] in hashTable) {
			hashTable[string[i]]++
		} else {
			hashTable[string[i]] = 1
		}
	}
	for (let i = 0; i < string.length; i++) {
		if (hashTable[string[i]] === 1) {
			return i
		}
	}
	return -1
}
