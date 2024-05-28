/**
 * @param {string} s
 * @return {boolean}
 */

// method 1
// Time complexity - O(n^2) -> we going throuh each character and then creating new copy of string
// Space complexity- O(n) we are creating new string
// function isPalindromeCheck(string){
//     let newStringtoCompare ='';
//     for(let i=string.length-1;i>=0;i--){
//         newStringtoCompare+=string[i];
//     }
//     if(newStringtoCompare===string) return true;
//      else return false;
// }

// method 2
// Time complexity - O(n) -> we going throuh each character and then creating new copy of string
// appending items to string is an o(n) time complexity so we are doing this for n character of the string
// Space complexity- O(n) we are creating new string
// function isPalindromeCheck(string){
//     let newStringtoCompare =[];
//     for(let i=string.length-1;i>=0;i--){
//         newStringtoCompare.push(string[i]);
//     }
//     if(newStringtoCompare.join('')===string) return true;
//      else return false;
// }

// method 3
// Time complexity - O(n) -> we are traversing through the array once
// Space complexity- O(1) we are not creating any new variable
// function isPalindromecheck(string){
//     let i =0;
//     let j= string.length -1;
//     while(i<=j){
//         if(string[i]!==string[j]) return false;
//         else{
//             i++;
//             j--;
//         }
//     }
//     return true;
// }

var isPalindrome = function (string) {
	let i = 0
	let j = string.length - 1
	while (i <= j) {
		if (string[i] !== string[j]) return false
		else {
			i++
			j--
		}
	}
	return true
}
