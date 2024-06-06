/**
 * @param {string} s
 * @return {number}
 */
// Slinding window concept
// Explanation
// Here the we are having left and right pointer and seen hash table
// we keep iterating through the string of characters
// once we see a repeating character
// we move the start new character index
// with comparasion of max value between start and the seen[char]
// we also calaculate if we need to update the max length of string as we iterate through string
// with formula => max is comparision betwenn current max value and iterator index minus start
// and update the characters occuring in the string in the hash table

// Time complexity - O(n) -> we are traversing through all the string characters once
// Space complexity- O(m) -> we are considering the unique characters in the string
// const maxLength =function(string){
//     let max =0;
//     let start =0;
//     const seen = {};
//     for(let i=0;i<string.length;i++){
//         const char = string[i];
//         // abcbdef
//         //  1 3
//         if(char in seen){
//             start = Math.max(start,seen[char]+1);
//         }
//         max = Math.max(max,i-start+1);
//         //make an entry into hash table if its not there
//         seen[char]=i;
//     }
//     return max;
// }

// maxLength('pqbrstbuvwvxy');

var lengthOfLongestSubstring = function (string) {
	let max = 0
	let start = 0
	const seen = {}
	for (let i = 0; i < string.length; i++) {
		const char = string[i]
		if (char in seen) {
			start = Math.max(start, seen[char] + 1)
		}
		max = Math.max(max, i - start + 1)
		//make an entry into hash table if its not there
		seen[char] = i
	}
	return max
}
