//method 1

// Time complexity - O(2^n)
// Space complexity- O(n) we are needing store function call stack on recursive calls

// function fibonacci(n) {
// 	if (n <= 1) return n
// 	else return fibonacci(n - 1) + fibonacci(n - 2)
// }

// //0,1,1,2,3,5,8,13,21....

// console.log(fibonacci(1))

//method2
// Recurrsion and store
// memorization is on techniques in dynamic programming where we store repeated value
//
// Time complexity - O(n)
// Space complexity- O(n) we are needing store function call stack on recursive calls

// function fibonacci(n){
//     const ht ={0:0,1:1};
//     if(n in ht){
//         return ht[n];
//     }else{
//         ht[n]=fibonacci(n-1)+fibonacci(n-2);
//         return ht[n];
//     }
// }

// //0,1,1,2,3,5,8,13,21....

// console.log(fibonacci(5));

//method 3 - Iterative method
//
// Time complexity - O(n)
// Space complexity- O(1) we are storing 3 values

// function fibonacci(n){
//     if(n<=1) return n;
//     let counter =1;
//     let prev = 0;
//     let curr=1;
//     let next;
//     while(counter<n){
//         next = prev+curr;
//         prev =curr;
//         curr = next;
//         counter++;
//     }
//     return curr;
// }

// //0,1,1,2,3,5,8,13,21....

// console.log(fibonacci(8));

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
	if (n <= 1) return n
	let counter = 1
	let prev = 0
	let curr = 1
	let next
	while (counter < n) {
		next = prev + curr
		prev = curr
		curr = next
		counter++
	}
	return curr
}
